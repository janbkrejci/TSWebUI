class TSWindow extends HTMLElement {
  static MIN_WIDTH = 200;
  static MIN_HEIGHT = 100;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = {
      minimized: false,
      maximized: false,
      width: 400,
      height: 300,
      top: 100,
      left: 100,
      dragging: false,
      resizing: false,
      resizeDir: null,
      offsetX: 0,
      offsetY: 0,
    };

    this.lastDragUpdate = 0; // pro throttling dragování
    this._restore = {}; // pro uložení pozice/rozměru

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          z-index: 1000;
          display: block;
        }
        .window {
          position: fixed;
          top: 100px;
          left: 100px;
          width: 400px;
          height: 300px;
          background: #f5f5f7;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          overflow: hidden;
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          font-family: 'sl-sans', sans-serif;
          opacity: 0; /* Skryté při startu */
          transition: width 0.1s, height 0.1s, top 0.1s, left 0.1s, opacity 0.2s;
        }
        .window.dragging,
        .window.resizing {
          transition: none !important;
        }
        .window.closed {
          display: none;
        }
        .window.minimized {
          height: 32px !important;
          width: auto !important;
          min-width: 80px !important;
          max-width: 400px !important;
          /* šířka bude nastavena JS */
        }
        .window.minimized .content {
          display: none;
        }
        .titlebar {
          height: 32px;
          background: linear-gradient(to bottom, #e0e0e0, #c0c0c0);
          display: flex;
          align-items: center;
          padding: 0 8px;
          cursor: move;
          user-select: none;
          -webkit-user-select: none;
          width: 100%;
          box-sizing: border-box;
        }
        .window-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
          display: inline-block;
        }
        .buttons {
          display: flex;
          gap: 6px;
        }
        .btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 4px;
          border: 1px solid #bbb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .btn.close { background: #ff5f57; }
        .btn.min { background: #ffbd2e; }
        .btn.max { background: #28c940; }
        .btn:disabled,
        .btn.disabled {
          background: #ccc !important;
          cursor: not-allowed !important;
          opacity: 0.7;
        }
        .content {
          flex: 1;
          padding: 0;
          margin: 0;
          background: #fff;
          overflow: auto; /* zobrazí scrollbary při potřebě */
        }
        .resize-handle {
          position: absolute;
          background: transparent;
          z-index: 10;
          pointer-events: all;
        }
        .resize-handle.n { top: -8px; left: 16px; right: 16px; height: 16px; cursor: n-resize; }
        .resize-handle.s { bottom: -8px; left: 16px; right: 16px; height: 16px; cursor: s-resize; }
        .resize-handle.e { top: 16px; right: -8px; bottom: 16px; width: 16px; cursor: e-resize; }
        .resize-handle.w { top: 16px; left: -8px; bottom: 16px; width: 16px; cursor: w-resize; }
        .resize-handle.nw { top: -8px; left: -8px; width: 16px; height: 16px; cursor: nw-resize; }
        .resize-handle.ne { top: -8px; right: -8px; width: 16px; height: 16px; cursor: ne-resize; }
        .resize-handle.sw { bottom: -8px; left: -8px; width: 16px; height: 16px; cursor: sw-resize; }
        .resize-handle.se { bottom: -8px; right: -8px; width: 16px; height: 16px; cursor: se-resize; }
        .resize-handle.se { bottom: -8px; right: -8px; width: 16px; height: 16px; cursor: se-resize; }

        /* Dark Mode Support */
        :host-context(.sl-theme-dark) .window {
          box-shadow: none;
          background: #2e2e2e;
          border-color: #444;
          color: #fff;
        }
        :host-context(.sl-theme-dark) .titlebar {
          background: linear-gradient(to bottom, #444, #333);
          color: #eee;
          border-bottom: 1px solid #222;
        }
        :host-context(.sl-theme-dark) .content {
          background: #2e2e2e;
          color: #eee;
        }
      </style>
      <div class="window">
        <div class="titlebar">
          <div class="buttons">
            <div class="btn close" title="Zavřít"></div>
            <div class="btn min" title="Minimalizovat"></div>
            <div class="btn max" title="Maximalizovat"></div>
          </div>
          <span class="window-title" style="margin-left:8px;white-space:nowrap;"></span>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="resize-handle nw"></div>
        <div class="resize-handle n"></div>
        <div class="resize-handle ne"></div>
        <div class="resize-handle e"></div>
        <div class="resize-handle se"></div>
        <div class="resize-handle s"></div>
        <div class="resize-handle sw"></div>
        <div class="resize-handle w"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.windowEl = this.shadowRoot.querySelector('.window');
    this.titlebar = this.shadowRoot.querySelector('.titlebar');
    this.content = this.shadowRoot.querySelector('.content');
    this.btnClose = this.shadowRoot.querySelector('.btn.close');
    this.btnMin = this.shadowRoot.querySelector('.btn.min');
    this.btnMax = this.shadowRoot.querySelector('.btn.max');
    this.handles = this.shadowRoot.querySelectorAll('.resize-handle');

    this.shadowRoot.querySelector('.window-title').textContent =
      this.getAttribute('label') || 'Mac OS X Okno';

    this.updatePosition();

    this.titlebar.addEventListener('mousedown', this.onDragStart.bind(this));
    this.titlebar.addEventListener('dblclick', this.onMaximize.bind(this));
    this.btnClose.addEventListener('click', this.onClose.bind(this));
    this.btnMin.addEventListener('click', this.onMinimize.bind(this));
    this.btnMax.addEventListener('click', this.onMaximize.bind(this));
    this.handles.forEach(handle => {
      handle.addEventListener('mousedown', this.onResizeStart.bind(this));
    });

    const seHandle = this.shadowRoot.querySelector('.resize-handle.se');
    if (seHandle) {
      seHandle.addEventListener('dblclick', this.onAutoSize.bind(this));
    }

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));

    // kliknutí na okno přenese do popředí
    this.windowEl.addEventListener('mousedown', this.bringToFront.bind(this));

    // Automatické přizpůsobení velikosti při inicializaci (bez animace)
    requestAnimationFrame(() => {
      this.fitToContent(false);
      // Zobrazíme okno až po prvním přizpůsobení
      requestAnimationFrame(() => {
        this.windowEl.style.opacity = '1';
      });
    });
  }

  bringToFront() {
    // najdi nejvyšší z-index mezi všemi ts-window
    let maxZ = 1000;
    document.querySelectorAll('ts-window').forEach(el => {
      const z = parseInt(window.getComputedStyle(el).zIndex || 1000, 10);
      if (z > maxZ) maxZ = z;
    });
    this.style.zIndex = maxZ + 1;
  }

  updatePosition() {
    // Nastavení fixní šířky při minimalizaci: vždy 200px, label se ořízne
    if (this.state.minimized) {
      this.windowEl.classList.add('minimized');
      this.windowEl.style.width = '200px';
      this.windowEl.style.height = '32px';
      const buttons = this.shadowRoot.querySelector('.buttons');
      const label = this.shadowRoot.querySelector('.window-title');
      // nastav max-width na label, aby se ořízl s ellipsis
      label.style.maxWidth = (200 - buttons.offsetWidth - 32) + 'px';
    } else {
      this.windowEl.classList.remove('minimized');
      this.windowEl.style.width = this.state.width + 'px';
      this.windowEl.style.height = this.state.height + 'px';
      // obnov max-width labelu
      const label = this.shadowRoot.querySelector('.window-title');
      if (label) label.style.maxWidth = '100%';
    }

    this.windowEl.style.top = this.state.top + 'px';
    this.windowEl.style.left = this.state.left + 'px';

    this.windowEl.classList.toggle('maximized', this.state.maximized);

    // Deaktivace tlačítek podle stavu
    if (this.btnMin && this.btnMax) {
      if (this.state.minimized) {
        this.btnMax.classList.add('disabled');
        this.btnMax.setAttribute('disabled', 'disabled');
        this.btnMin.classList.remove('disabled');
        this.btnMin.removeAttribute('disabled');
      } else if (this.state.maximized) {
        this.btnMin.classList.add('disabled');
        this.btnMin.setAttribute('disabled', 'disabled');
        this.btnMax.classList.remove('disabled');
        this.btnMax.removeAttribute('disabled');
      } else {
        this.btnMin.classList.remove('disabled');
        this.btnMin.removeAttribute('disabled');
        this.btnMax.classList.remove('disabled');
        this.btnMax.removeAttribute('disabled');
      }
    }
  }

  onDragStart(e) {
    if (this.state.maximized) return;
    this.state.dragging = true;
    this.state.offsetX = e.clientX - this.state.left;
    this.state.offsetY = e.clientY - this.state.top;
    this.windowEl.classList.add('dragging');
    document.body.style.userSelect = 'none'; // zrychlení dragování
    e.preventDefault();
  }

  onMouseMove(e) {
    if (this.state.dragging) {
      this.state.left = e.clientX - this.state.offsetX;
      this.state.top = e.clientY - this.state.offsetY;

      if (!this.isDraggingFramePending) {
        requestAnimationFrame(() => {
          this.windowEl.style.top = this.state.top + 'px';
          this.windowEl.style.left = this.state.left + 'px';
          this.isDraggingFramePending = false;
        });
        this.isDraggingFramePending = true;
      }
    }
    if (this.state.resizing) {
      let minW = TSWindow.MIN_WIDTH, minH = TSWindow.MIN_HEIGHT;
      let maxW = window.innerWidth, maxH = window.innerHeight;
      let { resizeDir, startX, startY, startW, startH, startTop, startLeft } = this.state;
      let dx = e.clientX - startX;
      let dy = e.clientY - startY;
      let w = startW, h = startH, top = startTop, left = startLeft;

      // změna velikosti podle směru
      if (resizeDir && resizeDir.includes('e')) {
        w = Math.max(minW, Math.min(maxW, startW + dx));
      }
      if (resizeDir && resizeDir.includes('s')) {
        h = Math.max(minH, Math.min(maxH, startH + dy));
      }
      if (resizeDir && resizeDir.includes('w')) {
        w = Math.max(minW, Math.min(maxW, startW - dx));
        left = startLeft + dx;
        if (left < 0) {
          w += left;
          left = 0;
        }
      }
      if (resizeDir && resizeDir.includes('n')) {
        h = Math.max(minH, Math.min(maxH, startH - dy));
        top = startTop + dy;
        if (top < 0) {
          h += top;
          top = 0;
        }
      }
      this.state.width = w;
      this.state.height = h;
      this.state.top = top;
      this.state.left = left;
      this.updatePosition();
    }
  }

  onMouseUp(e) {
    if (this.state.dragging) {
      this.windowEl.classList.remove('dragging');
      // Synchronizujeme atributy s aktuální pozicí
      this.setAttribute('top', this.state.top);
      this.setAttribute('left', this.state.left);
    }
    if (this.state.resizing) {
      this.windowEl.classList.remove('resizing');
      // Synchronizujeme atributy s aktuální velikostí
      this.setAttribute('width', this.state.width);
      this.setAttribute('height', this.state.height);
    }
    this.state.dragging = false;
    this.state.resizing = false;
    document.body.style.userSelect = ''; // obnovit výběr
  }

  onResizeStart(e) {
    if (this.state.minimized || this.state.maximized) return;
    this.state.resizing = true;
    this.windowEl.classList.add('resizing');

    // najdi správný směrový className (n, s, e, w, nw, ne, sw, se)
    const dir = Array.from(e.target.classList).find(c =>
      ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'].includes(c)
    );
    this.state.resizeDir = dir;
    this.state.startX = e.clientX;
    this.state.startY = e.clientY;
    this.state.startW = this.state.width;
    this.state.startH = this.state.height;
    this.state.startTop = this.state.top;
    this.state.startLeft = this.state.left;
    e.preventDefault();
  }

  onAutoSize(e) {
    e.stopPropagation();
    this.fitToContent();
  }

  fitToContent(animate = true) {
    if (this.state.minimized || this.state.maximized) return;

    const originalWidth = this.windowEl.style.width;
    const originalHeight = this.windowEl.style.height;

    // Dočasně vypneme transition, pokud nechceme animovat (např. při startu)
    if (!animate) {
      this.windowEl.classList.add('resizing'); // vypne transition
    }

    this.windowEl.style.width = 'auto';
    this.windowEl.style.height = 'auto';

    let newW = this.windowEl.offsetWidth;
    let newH = this.windowEl.offsetHeight;

    // VŽDY vrátíme zpět původní hodnoty (resp. odstraníme 'auto'), 
    // aby updatePosition() na konci měla čistý stůl a aplikovala pixely.
    // Pokud tam necháme 'auto', tak nastavení style.width='200px' (pokud se nezměnilo od minula) 
    // nemusí 'auto' přepsat, pokud prohlížeč optimalizuje, nebo může dojít k jiným konfliktům.
    this.windowEl.style.width = originalWidth;
    this.windowEl.style.height = originalHeight;

    const style = getComputedStyle(this.windowEl);
    const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

    newW -= borderX;
    newH -= borderY;

    const minW = TSWindow.MIN_WIDTH, minH = TSWindow.MIN_HEIGHT;
    const maxW = window.innerWidth, maxH = window.innerHeight;

    // Pokud animujeme, vynutíme reflow
    if (animate) {
      this.windowEl.offsetHeight;
    } else {
      // I když neanimujeme, musíme vynutit reflow PŘED odebráním třídy resizing.
      // Jinak by prohlížeč mohl sloučit změnu stylu a odebrání třídy do jednoho vykreslení,
      // čímž by se transition opět zapnul a změna by se animovala.
      this.windowEl.offsetHeight;
      this.windowEl.classList.remove('resizing');
    }

    const finalW = Math.max(minW, Math.min(maxW, newW));
    const finalH = Math.max(minH, Math.min(maxH, newH));

    this.state.width = finalW;
    this.state.height = finalH;

    this.setAttribute('width', finalW);
    this.setAttribute('height', finalH);

    // Explicitně zavoláme updatePosition, abychom měli jistotu, že se vizuální styl aplikuje okamžitě
    this.updatePosition();
  }

  onClose() {
    this.close();
  }

  close() {
    this.remove();
  }

  centerOnScreen() {
    this.state.left = (window.innerWidth - this.state.width) / 2;
    this.state.top = (window.innerHeight - this.state.height) / 2;
    this.updatePosition();
  }

  minimize() {
    if (this.state.minimized || this.state.maximized) return;

    // Pokud nejsme maximalizovaní, uložíme pouze aktuální rozměry.
    // Důležité: Vytvoříme nový objekt a nepřebíráme staré properties (jako top/left z minulé maximalizace),
    // jinak by se při restore() okno přesunulo na starou pozici.
    this._restore = {
      width: Math.max(TSWindow.MIN_WIDTH, this.state.width),
      height: Math.max(TSWindow.MIN_HEIGHT, this.state.height)
    };

    this.state.minimized = true;
    this.state.maximized = false;
    this.updatePosition();
  }

  maximize() {
    if (this.state.maximized || this.state.minimized) return;

    // Uložíme kompletní stav
    this._restore = {
      top: this.state.top,
      left: this.state.left,
      width: Math.max(TSWindow.MIN_WIDTH, this.state.width),
      height: Math.max(TSWindow.MIN_HEIGHT, this.state.height)
    };
    this.state.maximized = true;
    this.state.minimized = false;
    this.state.top = 0;
    this.state.left = 0;
    this.state.width = window.innerWidth;
    this.state.height = window.innerHeight;
    this.updatePosition();
    this.bringToFront(); // Přesunout maximalizované okno do popředí
  }

  restore() {
    if (!this.state.minimized && !this.state.maximized) return;

    // Obnovení ze stavu
    if (this._restore) {
      if (this._restore.width !== undefined) this.state.width = Math.max(TSWindow.MIN_WIDTH, this._restore.width);
      if (this._restore.height !== undefined) this.state.height = Math.max(TSWindow.MIN_HEIGHT, this._restore.height);
      // Pozici obnovujeme pouze pokud jsme byli maximalizovaní (minimalizace pozici nemění)
      // Ale pokud jsme přešli Normal -> Max -> Min -> Restore, musíme obnovit i pozici.
      // Pro jistotu obnovíme vše, co máme uložené.
      if (this._restore.top !== undefined) this.state.top = this._restore.top;
      if (this._restore.left !== undefined) this.state.left = this._restore.left;
    }

    this.state.minimized = false;
    this.state.maximized = false;
    this.updatePosition();
  }

  sendToBack() {
    this.style.zIndex = 999; // Nastavíme z-index na hodnotu, která bude pod většinou oken
  }

  onMinimize() {
    if (this.state.closed) return;
    if (this.state.minimized) {
      this.restore();
    } else {
      this.minimize();
    }
  }

  onMaximize() {
    if (this.state.closed) return;
    if (this.state.maximized) {
      this.restore();
    } else {
      this.maximize();
    }
  }

  static get observedAttributes() {
    return ['label', 'width', 'height', 'top', 'left'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'label':
        if (this.shadowRoot) {
          const el = this.shadowRoot.querySelector('.window-title');
          if (el) el.textContent = newValue || 'Mac OS X Okno';
        }
        break;

      case 'width':
      case 'height':
      case 'top':
      case 'left':
        this.state[name] = parseInt(newValue, 10);
        this.updatePosition();
        break;
    }
  }
}

customElements.define('ts-window', TSWindow);
export { TSWindow };