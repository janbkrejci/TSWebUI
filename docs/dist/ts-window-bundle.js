class n extends HTMLElement{static MIN_WIDTH=200;static MIN_HEIGHT=100;constructor(){super(),this.attachShadow({mode:"open"}),this.state={minimized:!1,maximized:!1,width:400,height:300,top:100,left:100,dragging:!1,resizing:!1,resizeDir:null,offsetX:0,offsetY:0},this.lastDragUpdate=0,this._restore={},this.shadowRoot.innerHTML=`
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
    `}connectedCallback(){this.windowEl=this.shadowRoot.querySelector(".window"),this.titlebar=this.shadowRoot.querySelector(".titlebar"),this.content=this.shadowRoot.querySelector(".content"),this.btnClose=this.shadowRoot.querySelector(".btn.close"),this.btnMin=this.shadowRoot.querySelector(".btn.min"),this.btnMax=this.shadowRoot.querySelector(".btn.max"),this.handles=this.shadowRoot.querySelectorAll(".resize-handle"),this.shadowRoot.querySelector(".window-title").textContent=this.getAttribute("label")||"Mac OS X Okno",this.updatePosition(),this.titlebar.addEventListener("mousedown",this.onDragStart.bind(this)),this.titlebar.addEventListener("dblclick",this.onMaximize.bind(this)),this.btnClose.addEventListener("click",this.onClose.bind(this)),this.btnMin.addEventListener("click",this.onMinimize.bind(this)),this.btnMax.addEventListener("click",this.onMaximize.bind(this)),this.handles.forEach(i=>{i.addEventListener("mousedown",this.onResizeStart.bind(this))});const t=this.shadowRoot.querySelector(".resize-handle.se");t&&t.addEventListener("dblclick",this.onAutoSize.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this)),this.windowEl.addEventListener("mousedown",this.bringToFront.bind(this)),requestAnimationFrame(()=>{this.fitToContent(!1),requestAnimationFrame(()=>{this.windowEl.style.opacity="1"})})}bringToFront(){let t=1e3;document.querySelectorAll("ts-window").forEach(i=>{const e=parseInt(window.getComputedStyle(i).zIndex||1e3,10);e>t&&(t=e)}),this.style.zIndex=t+1}updatePosition(){if(this.state.minimized){this.windowEl.classList.add("minimized"),this.windowEl.style.width="200px",this.windowEl.style.height="32px";const t=this.shadowRoot.querySelector(".buttons"),i=this.shadowRoot.querySelector(".window-title");i.style.maxWidth=200-t.offsetWidth-32+"px"}else{this.windowEl.classList.remove("minimized"),this.windowEl.style.width=this.state.width+"px",this.windowEl.style.height=this.state.height+"px";const t=this.shadowRoot.querySelector(".window-title");t&&(t.style.maxWidth="100%")}this.windowEl.style.top=this.state.top+"px",this.windowEl.style.left=this.state.left+"px",this.windowEl.classList.toggle("maximized",this.state.maximized),this.btnMin&&this.btnMax&&(this.state.minimized?(this.btnMax.classList.add("disabled"),this.btnMax.setAttribute("disabled","disabled"),this.btnMin.classList.remove("disabled"),this.btnMin.removeAttribute("disabled")):this.state.maximized?(this.btnMin.classList.add("disabled"),this.btnMin.setAttribute("disabled","disabled"),this.btnMax.classList.remove("disabled"),this.btnMax.removeAttribute("disabled")):(this.btnMin.classList.remove("disabled"),this.btnMin.removeAttribute("disabled"),this.btnMax.classList.remove("disabled"),this.btnMax.removeAttribute("disabled")))}onDragStart(t){this.state.maximized||(this.state.dragging=!0,this.state.offsetX=t.clientX-this.state.left,this.state.offsetY=t.clientY-this.state.top,this.windowEl.classList.add("dragging"),document.body.style.userSelect="none",t.preventDefault())}onMouseMove(t){if(this.state.dragging&&(this.state.left=t.clientX-this.state.offsetX,this.state.top=t.clientY-this.state.offsetY,this.isDraggingFramePending||(requestAnimationFrame(()=>{this.windowEl.style.top=this.state.top+"px",this.windowEl.style.left=this.state.left+"px",this.isDraggingFramePending=!1}),this.isDraggingFramePending=!0)),this.state.resizing){let i=n.MIN_WIDTH,e=n.MIN_HEIGHT,o=window.innerWidth,d=window.innerHeight,{resizeDir:s,startX:x,startY:g,startW:r,startH:l,startTop:m,startLeft:p}=this.state,a=t.clientX-x,h=t.clientY-g,b=r,f=l,w=m,c=p;s&&s.includes("e")&&(b=Math.max(i,Math.min(o,r+a))),s&&s.includes("s")&&(f=Math.max(e,Math.min(d,l+h))),s&&s.includes("w")&&(b=Math.max(i,Math.min(o,r-a)),c=p+a,c<0&&(b+=c,c=0)),s&&s.includes("n")&&(f=Math.max(e,Math.min(d,l-h)),w=m+h,w<0&&(f+=w,w=0)),this.state.width=b,this.state.height=f,this.state.top=w,this.state.left=c,this.updatePosition()}}onMouseUp(t){this.state.dragging&&(this.windowEl.classList.remove("dragging"),this.setAttribute("top",this.state.top),this.setAttribute("left",this.state.left)),this.state.resizing&&(this.windowEl.classList.remove("resizing"),this.setAttribute("width",this.state.width),this.setAttribute("height",this.state.height)),this.state.dragging=!1,this.state.resizing=!1,document.body.style.userSelect=""}onResizeStart(t){if(this.state.minimized||this.state.maximized)return;this.state.resizing=!0,this.windowEl.classList.add("resizing");const i=Array.from(t.target.classList).find(e=>["n","s","e","w","nw","ne","sw","se"].includes(e));this.state.resizeDir=i,this.state.startX=t.clientX,this.state.startY=t.clientY,this.state.startW=this.state.width,this.state.startH=this.state.height,this.state.startTop=this.state.top,this.state.startLeft=this.state.left,t.preventDefault()}onAutoSize(t){t.stopPropagation(),this.fitToContent()}fitToContent(t=!0){if(this.state.minimized||this.state.maximized)return;const i=this.windowEl.style.width,e=this.windowEl.style.height;t||this.windowEl.classList.add("resizing"),this.windowEl.style.width="auto",this.windowEl.style.height="auto";let o=this.windowEl.offsetWidth,d=this.windowEl.offsetHeight;this.windowEl.style.width=i,this.windowEl.style.height=e;const s=getComputedStyle(this.windowEl),x=parseFloat(s.borderLeftWidth)+parseFloat(s.borderRightWidth),g=parseFloat(s.borderTopWidth)+parseFloat(s.borderBottomWidth);o-=x,d-=g;const r=n.MIN_WIDTH,l=n.MIN_HEIGHT,m=window.innerWidth,p=window.innerHeight;t?this.windowEl.offsetHeight:(this.windowEl.offsetHeight,this.windowEl.classList.remove("resizing"));const a=Math.max(r,Math.min(m,o)),h=Math.max(l,Math.min(p,d));this.state.width=a,this.state.height=h,this.setAttribute("width",a),this.setAttribute("height",h),this.updatePosition()}onClose(){this.close()}close(){this.remove()}centerOnScreen(){this.state.left=(window.innerWidth-this.state.width)/2,this.state.top=(window.innerHeight-this.state.height)/2,this.updatePosition()}minimize(){this.state.minimized||this.state.maximized||(this._restore={width:Math.max(n.MIN_WIDTH,this.state.width),height:Math.max(n.MIN_HEIGHT,this.state.height)},this.state.minimized=!0,this.state.maximized=!1,this.updatePosition())}maximize(){this.state.maximized||this.state.minimized||(this._restore={top:this.state.top,left:this.state.left,width:Math.max(n.MIN_WIDTH,this.state.width),height:Math.max(n.MIN_HEIGHT,this.state.height)},this.state.maximized=!0,this.state.minimized=!1,this.state.top=0,this.state.left=0,this.state.width=window.innerWidth,this.state.height=window.innerHeight,this.updatePosition(),this.bringToFront())}restore(){!this.state.minimized&&!this.state.maximized||(this._restore&&(this._restore.width!==void 0&&(this.state.width=Math.max(n.MIN_WIDTH,this._restore.width)),this._restore.height!==void 0&&(this.state.height=Math.max(n.MIN_HEIGHT,this._restore.height)),this._restore.top!==void 0&&(this.state.top=this._restore.top),this._restore.left!==void 0&&(this.state.left=this._restore.left)),this.state.minimized=!1,this.state.maximized=!1,this.updatePosition())}sendToBack(){this.style.zIndex=999}onMinimize(){this.state.closed||(this.state.minimized?this.restore():this.minimize())}onMaximize(){this.state.closed||(this.state.maximized?this.restore():this.maximize())}static get observedAttributes(){return["label","width","height","top","left"]}attributeChangedCallback(t,i,e){if(i!==e)switch(t){case"label":if(this.shadowRoot){const o=this.shadowRoot.querySelector(".window-title");o&&(o.textContent=e||"Mac OS X Okno")}break;case"width":case"height":case"top":case"left":this.state[t]=parseInt(e,10),this.updatePosition();break}}}customElements.define("ts-window",n);
