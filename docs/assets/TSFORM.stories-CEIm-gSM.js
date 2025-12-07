import"./ts-table-BYRwQNre.js";const zt=`<style>
    /* :not(:defined) {
        visibility: hidden;
    } */

    .base-container {
        background-color: var(--sl-color-neutral-0);
        color: var(--sl-color-neutral-1000);
        /* font-family: var(--sl-font-sans);
        padding: 0.5em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
    }
</style>
<div class="sl-theme-{{theme}} base-container">
    <ts-form id="form"></ts-form>
</div>`;class _t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.files=[],this.multiple=!1,this.accept="*",this.label="Nahrát soubory"}static get observedAttributes(){return["multiple","accept","label","value","error"]}attributeChangedCallback(t,e,r){t==="multiple"?this.multiple=r!==null&&r!=="false":t==="accept"?this.accept=r||"*":t==="label"?this.label=r:t==="value"||t==="error"&&(this.error=r,this.updateError()),this.hasRendered?t==="multiple"?this.updateUploadText():t==="label"&&this.render():this.render()}updateError(){this.errorContainer&&(this.errorContainer.textContent=this.error||"",this.errorContainer.style.display=this.error?"block":"none",this.error?this.classList.add("input-invalid"):this.classList.remove("input-invalid"))}connectedCallback(){this.render(),this.setupEventListeners(),this.updateError()}setupEventListeners(){this.addEventListener("dragover",t=>{t.preventDefault(),this.classList.add("drag-over")}),this.addEventListener("dragleave",t=>{t.preventDefault(),this.classList.remove("drag-over")}),this.addEventListener("drop",t=>{t.preventDefault(),this.classList.remove("drag-over"),t.dataTransfer.files&&t.dataTransfer.files.length>0&&this.handleFiles(t.dataTransfer.files)})}handleFiles(t){const e=Array.from(t);this.multiple?this.files=[...this.files,...e]:this.files=[e[0]],this.renderFileList(),this.dispatchChange()}removeFile(t){this.files.splice(t,1),this.renderFileList(),this.dispatchChange()}dispatchChange(){this.dispatchEvent(new CustomEvent("sl-change",{detail:{files:this.files},bubbles:!0,composed:!0}))}render(){if(this.hasRendered)return;this.hasRendered=!0,this.shadowRoot.innerHTML="";const t=document.createElement("style");t.textContent=`
            :host {
                display: block;
                font-family: var(--sl-font-sans);
            }
            .drop-zone {
                border: 2px dashed var(--sl-color-neutral-300);
                border-radius: var(--sl-border-radius-medium);
                padding: 2rem;
                text-align: center;
                cursor: pointer;
                transition: border-color 0.2s, background-color 0.2s;
                background: var(--sl-color-neutral-0);
            }
            .drop-zone:hover {
                border-color: var(--sl-color-primary-500);
                background: var(--sl-color-primary-50);
            }
            :host(.drag-over) .drop-zone {
                border-color: var(--sl-color-primary-600);
                background: var(--sl-color-primary-100);
            }
            :host(.input-invalid) .drop-zone {
                border-color: var(--sl-color-danger-500);
            }
            .file-upload-label {
                display: block;
                margin-bottom: var(--sl-spacing-2x-small);
                font-size: var(--sl-input-label-font-size-medium);
                font-weight: var(--sl-font-weight-semibold);
                color: var(--sl-input-label-color);
            }
            :host(.input-invalid) .file-upload-label {
                color: var(--sl-color-danger-700);
            }
            .error-message {
                color: var(--sl-color-danger-500);
                font-size: var(--sl-font-size-small);
                margin-top: var(--sl-spacing-2x-small);
                display: none;
            }
            .file-list:not(:empty) {
                margin-top: 1rem;
            }
            .file-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .file-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem;
                background: var(--sl-color-neutral-100);
                border-radius: var(--sl-border-radius-small);
                font-size: var(--sl-font-size-small);
            }
            .file-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                overflow: hidden;
            }
            .file-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .upload-icon {
                font-size: 2rem;
                color: var(--sl-color-neutral-400);
                margin-bottom: 0.5rem;
            }
            input[type="file"] {
                display: none;
            }
        `,this.shadowRoot.appendChild(t);const e=document.createElement("div"),r=document.createElement("input");r.type="file",r.multiple=this.multiple,r.accept=this.accept,r.addEventListener("change",c=>{c.target.files.length>0&&this.handleFiles(c.target.files),r.value=""});const a=document.createElement("div");if(a.className="drop-zone",a.innerHTML=`
            <div class="upload-icon">
                <sl-icon name="cloud-upload"></sl-icon>
            </div>
            <div>${this.label}</div>
            <div class="upload-text" style="font-size: 0.8em; color: var(--sl-color-neutral-500); margin-top: 0.25rem;">
                ${this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání"}
            </div>
        `,a.addEventListener("click",()=>r.click()),this.label){const c=document.createElement("label");c.textContent=this.label,c.className="file-upload-label",c.setAttribute("part","label"),e.appendChild(c)}const d=document.createElement("div");d.className="error-message",this.errorContainer=d;const p=document.createElement("div");p.className="file-list",this.fileListContainer=p,e.appendChild(r),e.appendChild(a),e.appendChild(d),e.appendChild(p),this.shadowRoot.appendChild(e),this.updateError(),this.renderFileList()}renderFileList(){this.fileListContainer&&(this.fileListContainer.innerHTML="",this.files.forEach((t,e)=>{const r=document.createElement("div");r.className="file-item";const a=document.createElement("div");a.className="file-info";const d=document.createElement("sl-icon");d.name="file-earmark";const p=document.createElement("span");p.className="file-name",p.textContent=t.name;const c=document.createElement("span");c.style.color="var(--sl-color-neutral-500)",c.textContent=`(${(t.size/1024).toFixed(1)} KB)`,a.appendChild(d),a.appendChild(p),a.appendChild(c);const h=document.createElement("sl-icon-button");h.name="x",h.label="Odstranit",h.addEventListener("click",A=>{A.stopPropagation(),this.removeFile(e)}),r.appendChild(a),r.appendChild(h),this.fileListContainer.appendChild(r)}))}updateUploadText(){const t=this.shadowRoot.querySelector(".upload-text");t&&(t.textContent=this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání");const e=this.shadowRoot.querySelector('input[type="file"]');e&&(e.multiple=this.multiple)}}customElements.define("ts-file-upload",_t);class jt extends HTMLElement{constructor(){super(),this.selectedItems=[],this.availableItems=[],this.mode="single",this.targetEntity="",this.displayFields=[],this.chipDisplayFields=[],this.valueField="id",this.label=""}static get observedAttributes(){return["mode","target-entity","display-fields","chip-display-fields","value-field","value","label","options"]}attributeChangedCallback(t,e,r){if(e!==r){if(t==="mode"&&(this.mode=r),t==="target-entity"&&(this.targetEntity=r),t==="display-fields")try{this.displayFields=JSON.parse(r)}catch{this.displayFields=[r]}if(t==="chip-display-fields")try{this.chipDisplayFields=JSON.parse(r)}catch{this.chipDisplayFields=[r]}if(t==="value-field"&&(this.valueField=r),t==="label"&&(this.label=r,this.render()),t==="options")try{this.availableItems=JSON.parse(r),this.updateSelectedFromValue()}catch(a){console.error("Failed to parse options for relationship picker:",a),this.availableItems=[]}t==="value"&&this.updateSelectedFromValue()}}updateSelectedFromValue(){const t=this.getAttribute("value");if(!t)return;let e;try{e=JSON.parse(t)}catch{e=t}if(this.mode==="single"){const r=this.availableItems.find(a=>a[this.valueField]==e);r&&(this.selectedItems=[r])}else Array.isArray(e)&&(this.selectedItems=this.availableItems.filter(r=>e.includes(r[this.valueField])));this.renderSelectedItems()}connectedCallback(){this.render(),this.resizeObserver=new ResizeObserver(()=>{this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{this.updateVisibleChips()},10)}),this.selectedContainer&&this.resizeObserver.observe(this.selectedContainer)}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.disconnect()}render(){this.innerHTML="";const t=document.createElement("style");t.textContent=`
            :host {
                display: block;
                font-family: var(--sl-font-sans);
                width: 100%;
                max-width: 100%;
            }
            .picker-container {
                display: flex;
                flex-direction: column;
                gap: var(--sl-spacing-2x-small);
                width: 100%; /* Constrain parent width */
                max-width: 100%;
            }
            .label {
                font-size: var(--sl-input-label-font-size-medium);
                font-weight: var(--sl-font-weight-semibold);
                color: var(--sl-input-label-color);
            }
            .selected-items {
                display: flex;
                flex-wrap: nowrap; /* Prevent wrapping to second line */
                gap: 0.5rem;
                height: 2.5rem; /* Fixed height */
                width: 100%; /* Prevent horizontal expansion */
                max-width: 100%; /* Enforce width limit */
                min-width: 0; /* Allow shrinking below content size */
                box-sizing: border-box; /* Include padding in width */
                padding: 0.5rem;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-input-border-radius-medium);
                background: var(--sl-input-background-color);
                cursor: pointer;
                transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
                overflow: hidden;
                align-items: center; /* Vertically center all content */
            }
            .selected-items sl-tag {
                flex-shrink: 0; /* Prevent tags from shrinking */
            }
            .selected-items:hover {
                border-color: var(--sl-input-border-color-hover);
            }
            .selected-items:focus-within {
                border-color: var(--sl-color-primary-500);
                box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
            }
            .selected-items.empty {
                color: var(--sl-input-placeholder-color);
                font-size: var(--sl-font-size-medium);
            }
            .selected-items::after {
                content: none;
            }
            .picker-icon {
                font-size: var(--sl-font-size-medium);
                color: var(--sl-color-neutral-500);
            }
            .picker-icon.clear-icon {
                cursor: pointer;
                color: var(--sl-color-neutral-400);
                margin-right: 0.25rem;
                transition: color 0.2s;
            }
            .picker-icon.clear-icon:hover {
                color: var(--sl-color-danger-500);
            }
            .picker-controls {
                display: flex;
                align-items: center;
                margin-left: auto; /* Push to right */
                flex-shrink: 0;
                padding-right: var(--sl-spacing-small);
            }
            .search-results {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                max-height: 300px;
                overflow-y: auto;
            }
            .results-table {
                width: 100%;
                border-collapse: collapse;
                font-size: var(--sl-font-size-small);
            }
            .results-table tr {
                border-bottom: 1px solid var(--sl-color-neutral-200);
                cursor: pointer;
                transition: background-color 0.1s;
            }
            .results-table tr:last-child {
                border-bottom: none;
            }
            .results-table tr:hover {
                background-color: var(--sl-color-primary-50);
            }
            .results-table tr.selected {
                background-color: var(--sl-color-primary-100);
            }
            .results-table td {
                padding: 0.5rem;
                text-align: left;
            }
            .results-table td.icon-cell {
                width: auto;
                text-align: right;
                padding-right: 1rem;
            }
        `,this.appendChild(t);const e=document.createElement("div");if(e.className="picker-container",this.label){const a=document.createElement("label");a.className="label",a.textContent=this.label,e.appendChild(a)}const r=document.createElement("div");r.className="selected-items",r.addEventListener("click",a=>{a.target.closest("sl-tag")||a.target.closest(".clear-icon")||this.openDialog()}),this.selectedContainer=r,this.renderSelectedItems(),e.appendChild(r),this.appendChild(e),this.resizeObserver&&this.resizeObserver.observe(this.selectedContainer)}renderSelectedItems(){if(this.selectedContainer.innerHTML="",this.selectedContainer.classList.remove("empty"),this.selectedItems.length===0){const r=document.createElement("span");r.textContent="Žádné položky nevybrány",r.style.color="var(--sl-input-placeholder-color)",this.selectedContainer.appendChild(r),this.selectedContainer.classList.add("empty")}else this.selectedItems.forEach(r=>{const a=document.createElement("sl-tag");a.variant="primary",a.removable=!0,a.size="medium";const p=(this.chipDisplayFields&&this.chipDisplayFields.length>0?this.chipDisplayFields:this.displayFields.slice(0,1)).map(c=>r[c]).join(" - ");a.textContent=p,a.addEventListener("sl-remove",c=>{c.stopPropagation(),this.removeItem(r)}),this.selectedContainer.appendChild(a)});const t=document.createElement("div");if(t.className="picker-controls",this.selectedItems.length>0){const r=document.createElement("sl-icon");r.name="x-circle-fill",r.className="picker-icon clear-icon",r.addEventListener("click",a=>{a.stopPropagation(),this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange()}),t.appendChild(r)}const e=document.createElement("sl-icon");e.name="chevron-down",e.className="picker-icon",t.appendChild(e),this.selectedContainer.appendChild(t),this.selectedItems.length>0&&customElements.whenDefined("sl-tag").then(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.updateVisibleChips()})})})}updateVisibleChips(){if(!this.selectedContainer||this.selectedItems.length===0)return;const t=Array.from(this.selectedContainer.querySelectorAll("sl-tag:not(.summary-tag)")),e=this.selectedContainer.querySelector(".summary-tag");if(e&&e.remove(),t.forEach(O=>O.style.display=""),t.length===0)return;const r=window.getComputedStyle(this.selectedContainer),a=parseFloat(r.paddingLeft),d=parseFloat(r.paddingRight),p=r.gap||"8px",c=parseFloat(p)||8,h=this.selectedContainer.querySelector(".picker-controls");let A=0;h&&(A=h.getBoundingClientRect().width);let v=this.selectedContainer.clientWidth-a-d-2;A>0&&(v-=A+c);let D=0;const E=t.map(O=>{const u=Math.ceil(O.getBoundingClientRect().width);return D+=u+c,u});if(D-=c,D<=v)return;const x=document.createElement("sl-tag");x.className="summary-tag",x.variant="neutral",x.size="medium",x.style.cursor="pointer",x.style.flexShrink="0",x.textContent=`A další, celkem (${t.length})`,x.style.visibility="hidden",x.style.position="absolute",this.selectedContainer.appendChild(x);let H=Math.ceil(x.getBoundingClientRect().width);if(H<20){const u=document.createElement("canvas").getContext("2d"),g=window.getComputedStyle(this.selectedContainer);u.font=g.font;const m=u.measureText(x.textContent).width;H=Math.ceil(m)+32}else H+=4;x.remove(),x.style.visibility="",x.style.position="",x.addEventListener("click",O=>{O.stopPropagation(),this.openDialog()});let M=H+c,_=0;for(let O=0;O<E.length&&M+E[O]<=v;O++)M+=E[O]+c,_++;for(let O=0;O<t.length;O++)t[O].style.display=O<_?"":"none";if(_<t.length)if(_>0){const O=t[_-1];O.nextSibling?this.selectedContainer.insertBefore(x,O.nextSibling):this.selectedContainer.appendChild(x)}else this.selectedContainer.insertBefore(x,this.selectedContainer.firstChild)}removeItem(t){this.selectedItems=this.selectedItems.filter(e=>e[this.valueField]!==t[this.valueField]),this.renderSelectedItems(),this.dispatchChange()}addItem(t){this.mode==="single"?this.selectedItems=[t]:this.selectedItems.find(e=>e[this.valueField]===t[this.valueField])||this.selectedItems.push(t),this.renderSelectedItems(),this.dispatchChange()}dispatchChange(){const t=this.mode==="single"?this.selectedItems[0]?this.selectedItems[0][this.valueField]:null:this.selectedItems.map(e=>e[this.valueField]);this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:t,items:this.selectedItems},bubbles:!0,composed:!0}))}openDialog(){const t=document.createElement("sl-dialog");t.label=`Vybrat ${this.targetEntity}`,t.style.setProperty("--width","600px"),t.style.fontFamily="var(--sl-font-sans)";const e=document.createElement("div"),r=document.createElement("sl-input");r.placeholder="Hledat...",r.clearable=!0,r.addEventListener("sl-input",c=>this.filterResults(c.target.value,a,t));const a=document.createElement("div");a.className="search-results",e.appendChild(r),e.appendChild(a),t.appendChild(e);const d=document.createElement("div");d.slot="footer",d.style.display="flex",d.style.justifyContent="flex-end",d.style.alignItems="center",d.style.width="100%";const p=document.createElement("sl-button");p.textContent="Zavřít",p.addEventListener("click",()=>t.hide()),d.appendChild(p),t.appendChild(d),document.body.appendChild(t),this.filterResults("",a,t),requestAnimationFrame(()=>{t.open=!0}),t.addEventListener("sl-after-show",()=>{r.focus()}),t.addEventListener("sl-after-hide",()=>t.remove())}filterResults(t,e,r){e.innerHTML="";const a=t.toLowerCase(),d=this.availableItems.filter(c=>this.displayFields.some(h=>String(c[h]).toLowerCase().includes(a)));if(d.length===0){e.innerHTML='<div style="text-align: center; color: var(--sl-color-neutral-500); padding: 1rem;">Žádné výsledky</div>';return}const p=document.createElement("table");p.className="results-table",p.style.fontFamily="var(--sl-font-sans)",p.style.width="100%",p.style.borderCollapse="collapse",p.style.fontSize="var(--sl-font-size-small)",d.forEach(c=>{const h=document.createElement("tr"),A=this.selectedItems.some(E=>E[this.valueField]===c[this.valueField]);A&&h.classList.add("selected"),this.displayFields.forEach((E,x)=>{const H=document.createElement("td");H.textContent=c[E],x<this.displayFields.length-1&&(H.style.width="1%",H.style.whiteSpace="nowrap"),h.appendChild(H)});const v=document.createElement("td");v.className="icon-cell";const D=document.createElement("sl-icon");D.name=A?"check-circle-fill":"circle",D.style.color=A?"var(--sl-color-success-500)":"var(--sl-color-neutral-400)",v.appendChild(D),h.appendChild(v),h.addEventListener("click",()=>{this.mode==="single"?this.selectedItems.some(x=>x[this.valueField]===c[this.valueField])?(this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange(),r&&r.hide()):(this.addItem(c),r&&r.hide()):this.selectedItems.some(x=>x[this.valueField]===c[this.valueField])?(this.removeItem(c),h.classList.remove("selected"),D.name="circle",D.style.color="var(--sl-color-neutral-400)"):(this.addItem(c),h.classList.add("selected"),D.name="check-circle-fill",D.style.color="var(--sl-color-success-500)")}),p.appendChild(h)}),e.appendChild(p)}}customElements.define("ts-relationship-picker",jt);class Ht extends HTMLElement{constructor(){super(),this.options=[],this._value="",this.isOpen=!1,this.filteredOptions=[]}static get observedAttributes(){return["label","value","options","disabled","placeholder","required","error","allow-custom","allow-empty"]}get allowCustom(){return this.hasAttribute("allow-custom")}set allowCustom(t){t?this.setAttribute("allow-custom",""):this.removeAttribute("allow-custom")}get allowEmpty(){return this.hasAttribute("allow-empty")}set allowEmpty(t){t?this.setAttribute("allow-empty",""):this.removeAttribute("allow-empty")}attributeChangedCallback(t,e,r){if(e!==r){if(t==="options")try{this.options=JSON.parse(r),this.filteredOptions=[...this.options]}catch{this.options=[],this.filteredOptions=[]}else t==="value"&&(this._value=r);this.render()}}getDisplayValue(t){if(!t)return"";const e=this.options.find(r=>(r.value||r)===t);return e?e.label||e.value||e:t}connectedCallback(){this.render(),document.addEventListener("click",this.handleDocumentClick.bind(this))}disconnectedCallback(){document.removeEventListener("click",this.handleDocumentClick.bind(this))}handleDocumentClick(t){this.contains(t.target)||(this.isOpen=!1,this.renderDropdown(),this.updateIconState(),this.validateInput())}validateInput(){const t=this.querySelector("sl-input");if(!t)return;const e=t.value.trim();if(!e){this.allowEmpty?this.handleSelect(""):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("");return}const r=this.options.find(a=>{const d=a.label||a.value||a;return String(d).toLowerCase()===e.toLowerCase()});if(r){const a=r.value||r;this._value!==a?this.handleSelect(a):t.value=this.getDisplayValue(a)}else this.allowCustom?this._value!==e&&(this._value=e,this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:e},bubbles:!0,composed:!0}))):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("")}toggleDropdown(t){t.preventDefault(),t.stopPropagation(),this.isOpen?(this.isOpen=!1,this.renderDropdown(),this.updateIconState()):(this.isOpen=!0,this.handleFocus())}updateIconState(){const t=this.querySelector(".combobox-icon");t&&t.classList.toggle("open",this.isOpen)}handleInput(t){const e=t.target.value;if(this.isOpen=!0,this.updateIconState(),!e)this.filteredOptions=[...this.options];else{const r=e.toLowerCase();this.filteredOptions=this.options.filter(a=>{const d=a.label||a.value||a;return String(d).toLowerCase().includes(r)})}this.renderDropdown()}handleSelect(t){const e=this._value;this._value=t,this.isOpen=!1,this.updateIconState(),e!==t&&this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:this._value},bubbles:!0,composed:!0}));const r=this.querySelector("sl-input");r&&(r.value=this.getDisplayValue(t)),this.renderDropdown()}handleFocus(){this.isOpen=!0,this.updateIconState();const t=this.querySelector("sl-input");if(t&&setTimeout(()=>t.select(),0),t&&t.value){const e=t.value.toLowerCase();this.filteredOptions=this.options.filter(r=>{const a=r.label||r.value||r;return String(a).toLowerCase().includes(e)})}else this.filteredOptions=[...this.options];this.renderDropdown()}render(){this.innerHTML="";const t=this.getAttribute("label"),e=this.hasAttribute("disabled"),r=this.getAttribute("placeholder")||"",a=this.hasAttribute("required"),d=this.getAttribute("error"),p=document.createElement("div");p.style.position="relative",p.style.width="100%";const c=document.createElement("sl-input");c.classList.add("combobox-input"),t&&(c.label=t),c.value=this.getDisplayValue(this._value),c.disabled=e,c.placeholder=r,c.required=a,d&&c.classList.add("input-invalid"),c.setAttribute("autocomplete","off");const h=document.createElement("sl-icon");h.classList.add("combobox-icon"),h.slot="suffix",h.name="chevron-down",h.name="chevron-down",h.addEventListener("mousedown",v=>v.preventDefault()),h.addEventListener("click",this.toggleDropdown.bind(this)),c.appendChild(h),c.appendChild(h),c.addEventListener("sl-input",this.handleInput.bind(this)),c.addEventListener("sl-focus",this.handleFocus.bind(this)),c.addEventListener("keydown",v=>{v.key==="Escape"&&(v.preventDefault(),v.stopPropagation(),c.value=this.getDisplayValue(this._value),this.isOpen=!1,this.renderDropdown(),this.updateIconState(),c.blur())}),c.addEventListener("sl-blur",()=>{setTimeout(()=>{this.isOpen&&(this.isOpen=!1,this.renderDropdown(),this.updateIconState()),this.validateInput()},150)}),c.addEventListener("sl-change",v=>{v.stopPropagation()}),p.appendChild(c);const A=document.createElement("div");if(A.className="ts-combobox-dropdown",p.appendChild(A),this.appendChild(p),!this.querySelector("style")){const v=document.createElement("style");v.textContent=`
                .ts-combobox-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    max-height: 200px;
                    overflow-y: auto;
                    background: var(--sl-color-neutral-0);
                    border: 1px solid var(--sl-color-neutral-200);
                    border-radius: var(--sl-border-radius-medium);
                    box-shadow: var(--sl-shadow-medium);
                    z-index: 1000;
                    margin-top: 4px;
                    display: none;
                }
                .ts-combobox-item {
                    padding: var(--sl-spacing-small) var(--sl-spacing-medium);
                    cursor: pointer;
                    transition: background-color 0.1s;
                    color: var(--sl-color-neutral-700);
                    font-family: var(--sl-font-sans);
                    font-size: var(--sl-font-size-medium);
                }
                .ts-combobox-item:hover {
                    background-color: var(--sl-color-primary-50);
                    color: var(--sl-color-primary-700);
                }
                sl-input.combobox-input::part(suffix) {
                    padding-inline-end: var(--sl-input-spacing-medium, 0.75rem);
                    color: var(--sl-input-icon-color, currentColor);
                }
                .combobox-icon {
                    margin: 0 !important;
                    transition: transform 0.2s ease;
                    cursor: pointer;
                }
                .combobox-icon.open {
                    transform: rotate(180deg);
                }
                .ts-combobox-empty {
                    padding: var(--sl-spacing-small) var(--sl-spacing-medium);
                    color: var(--sl-color-neutral-500);
                    font-family: var(--sl-font-sans);
                    font-size: var(--sl-font-size-medium);
                    font-style: italic;
                    cursor: default;
                }
            `,this.appendChild(v)}this.renderDropdown()}renderDropdown(){const t=this.querySelector(".ts-combobox-dropdown");if(t)if(this.isOpen&&this.filteredOptions.length>0)t.style.display="block",t.innerHTML="",this.filteredOptions.forEach(e=>{const r=e.value||e,a=e.label||r,d=document.createElement("div");d.className="ts-combobox-item",d.textContent=a,d.addEventListener("click",()=>this.handleSelect(r)),t.appendChild(d)});else if(this.isOpen){t.style.display="block",t.innerHTML="";const e=document.createElement("div");e.className="ts-combobox-empty",e.textContent="Nic nenalezeno...",t.appendChild(e)}else t.style.display="none"}}customElements.define("ts-combobox",Ht);var He=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange","onPreCalendarPosition"],se={_disable:[],allowInput:!1,allowInvalidPreload:!1,altFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",animate:typeof window=="object"&&window.navigator.userAgent.indexOf("MSIE")===-1,ariaDateFormat:"F j, Y",autoFillDefaultTime:!0,clickOpens:!0,closeOnSelect:!0,conjunction:", ",dateFormat:"Y-m-d",defaultHour:12,defaultMinute:0,defaultSeconds:0,disable:[],disableMobile:!1,enableSeconds:!1,enableTime:!1,errorHandler:function(o){return typeof console<"u"&&console.warn(o)},getWeek:function(o){var t=new Date(o.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var e=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-e.getTime())/864e5-3+(e.getDay()+6)%7)/7)},hourIncrement:1,ignoredFocusElements:[],inline:!1,locale:"default",minuteIncrement:5,mode:"single",monthSelectorType:"dropdown",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",noCalendar:!1,now:new Date,onChange:[],onClose:[],onDayCreate:[],onDestroy:[],onKeyDown:[],onMonthChange:[],onOpen:[],onParseConfig:[],onReady:[],onValueUpdate:[],onYearChange:[],onPreCalendarPosition:[],plugins:[],position:"auto",positionElement:void 0,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",shorthandCurrentMonth:!1,showMonths:1,static:!1,time_24hr:!1,weekNumbers:!1,wrap:!1},me={weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(o){var t=o%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle",amPM:["AM","PM"],yearAriaLabel:"Year",monthAriaLabel:"Month",hourAriaLabel:"Hour",minuteAriaLabel:"Minute",time_24hr:!1},V=function(o,t){return t===void 0&&(t=2),("000"+o).slice(t*-1)},Q=function(o){return o===!0?1:0};function nt(o,t){var e;return function(){var r=this,a=arguments;clearTimeout(e),e=setTimeout(function(){return o.apply(r,a)},t)}}var Be=function(o){return o instanceof Array?o:[o]};function U(o,t,e){if(e===!0)return o.classList.add(t);o.classList.remove(t)}function T(o,t,e){var r=window.document.createElement(o);return t=t||"",e=e||"",r.className=t,e!==void 0&&(r.textContent=e),r}function ke(o){for(;o.firstChild;)o.removeChild(o.firstChild)}function lt(o,t){if(t(o))return o;if(o.parentNode)return lt(o.parentNode,t)}function Ce(o,t){var e=T("div","numInputWrapper"),r=T("input","numInput "+o),a=T("span","arrowUp"),d=T("span","arrowDown");if(navigator.userAgent.indexOf("MSIE 9.0")===-1?r.type="number":(r.type="text",r.pattern="\\d*"),t!==void 0)for(var p in t)r.setAttribute(p,t[p]);return e.appendChild(r),e.appendChild(a),e.appendChild(d),e}function K(o){try{if(typeof o.composedPath=="function"){var t=o.composedPath();return t[0]}return o.target}catch{return o.target}}var Ye=function(){},Te=function(o,t,e){return e.months[t?"shorthand":"longhand"][o]},Bt={D:Ye,F:function(o,t,e){o.setMonth(e.months.longhand.indexOf(t))},G:function(o,t){o.setHours((o.getHours()>=12?12:0)+parseFloat(t))},H:function(o,t){o.setHours(parseFloat(t))},J:function(o,t){o.setDate(parseFloat(t))},K:function(o,t,e){o.setHours(o.getHours()%12+12*Q(new RegExp(e.amPM[1],"i").test(t)))},M:function(o,t,e){o.setMonth(e.months.shorthand.indexOf(t))},S:function(o,t){o.setSeconds(parseFloat(t))},U:function(o,t){return new Date(parseFloat(t)*1e3)},W:function(o,t,e){var r=parseInt(t),a=new Date(o.getFullYear(),0,2+(r-1)*7,0,0,0,0);return a.setDate(a.getDate()-a.getDay()+e.firstDayOfWeek),a},Y:function(o,t){o.setFullYear(parseFloat(t))},Z:function(o,t){return new Date(t)},d:function(o,t){o.setDate(parseFloat(t))},h:function(o,t){o.setHours((o.getHours()>=12?12:0)+parseFloat(t))},i:function(o,t){o.setMinutes(parseFloat(t))},j:function(o,t){o.setDate(parseFloat(t))},l:Ye,m:function(o,t){o.setMonth(parseFloat(t)-1)},n:function(o,t){o.setMonth(parseFloat(t)-1)},s:function(o,t){o.setSeconds(parseFloat(t))},u:function(o,t){return new Date(parseFloat(t))},w:Ye,y:function(o,t){o.setFullYear(2e3+parseFloat(t))}},re={D:"",F:"",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"",M:"",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",u:"(.+)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},fe={Z:function(o){return o.toISOString()},D:function(o,t,e){return t.weekdays.shorthand[fe.w(o,t,e)]},F:function(o,t,e){return Te(fe.n(o,t,e)-1,!1,t)},G:function(o,t,e){return V(fe.h(o,t,e))},H:function(o){return V(o.getHours())},J:function(o,t){return t.ordinal!==void 0?o.getDate()+t.ordinal(o.getDate()):o.getDate()},K:function(o,t){return t.amPM[Q(o.getHours()>11)]},M:function(o,t){return Te(o.getMonth(),!0,t)},S:function(o){return V(o.getSeconds())},U:function(o){return o.getTime()/1e3},W:function(o,t,e){return e.getWeek(o)},Y:function(o){return V(o.getFullYear(),4)},d:function(o){return V(o.getDate())},h:function(o){return o.getHours()%12?o.getHours()%12:12},i:function(o){return V(o.getMinutes())},j:function(o){return o.getDate()},l:function(o,t){return t.weekdays.longhand[o.getDay()]},m:function(o){return V(o.getMonth()+1)},n:function(o){return o.getMonth()+1},s:function(o){return o.getSeconds()},u:function(o){return o.getTime()},w:function(o){return o.getDay()},y:function(o){return String(o.getFullYear()).substring(2)}},st=function(o){var t=o.config,e=t===void 0?se:t,r=o.l10n,a=r===void 0?me:r,d=o.isMobile,p=d===void 0?!1:d;return function(c,h,A){var v=A||a;return e.formatDate!==void 0&&!p?e.formatDate(c,h,v):h.split("").map(function(D,E,x){return fe[D]&&x[E-1]!=="\\"?fe[D](c,v,e):D!=="\\"?D:""}).join("")}},qe=function(o){var t=o.config,e=t===void 0?se:t,r=o.l10n,a=r===void 0?me:r;return function(d,p,c,h){if(!(d!==0&&!d)){var A=h||a,v,D=d;if(d instanceof Date)v=new Date(d.getTime());else if(typeof d!="string"&&d.toFixed!==void 0)v=new Date(d);else if(typeof d=="string"){var E=p||(e||se).dateFormat,x=String(d).trim();if(x==="today")v=new Date,c=!0;else if(e&&e.parseDate)v=e.parseDate(d,E);else if(/Z$/.test(x)||/GMT$/.test(x))v=new Date(d);else{for(var H=void 0,M=[],_=0,O=0,u="";_<E.length;_++){var g=E[_],m=g==="\\",P=E[_-1]==="\\"||m;if(re[g]&&!P){u+=re[g];var C=new RegExp(u).exec(d);C&&(H=!0)&&M[g!=="Y"?"push":"unshift"]({fn:Bt[g],val:C[++O]})}else m||(u+=".")}v=!e||!e.noCalendar?new Date(new Date().getFullYear(),0,1,0,0,0,0):new Date(new Date().setHours(0,0,0,0)),M.forEach(function(I){var j=I.fn,R=I.val;return v=j(v,R,A)||v}),v=H?v:void 0}}if(!(v instanceof Date&&!isNaN(v.getTime()))){e.errorHandler(new Error("Invalid date provided: "+D));return}return c===!0&&v.setHours(0,0,0,0),v}}};function Z(o,t,e){return e===void 0&&(e=!0),e!==!1?new Date(o.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):o.getTime()-t.getTime()}var Yt=function(o,t,e){return o>Math.min(t,e)&&o<Math.max(t,e)},Je=function(o,t,e){return o*3600+t*60+e},Jt=function(o){var t=Math.floor(o/3600),e=(o-t*3600)/60;return[t,e,o-t*3600-e*60]},Wt={DAY:864e5};function We(o){var t=o.defaultHour,e=o.defaultMinute,r=o.defaultSeconds;if(o.minDate!==void 0){var a=o.minDate.getHours(),d=o.minDate.getMinutes(),p=o.minDate.getSeconds();t<a&&(t=a),t===a&&e<d&&(e=d),t===a&&e===d&&r<p&&(r=o.minDate.getSeconds())}if(o.maxDate!==void 0){var c=o.maxDate.getHours(),h=o.maxDate.getMinutes();t=Math.min(t,c),t===c&&(e=Math.min(h,e)),t===c&&e===h&&(r=o.maxDate.getSeconds())}return{hours:t,minutes:e,seconds:r}}typeof Object.assign!="function"&&(Object.assign=function(o){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];if(!o)throw TypeError("Cannot convert undefined or null to object");for(var r=function(c){c&&Object.keys(c).forEach(function(h){return o[h]=c[h]})},a=0,d=t;a<d.length;a++){var p=d[a];r(p)}return o});var q=function(){return q=Object.assign||function(o){for(var t,e=1,r=arguments.length;e<r;e++){t=arguments[e];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(o[a]=t[a])}return o},q.apply(this,arguments)},at=function(){for(var o=0,t=0,e=arguments.length;t<e;t++)o+=arguments[t].length;for(var r=Array(o),a=0,t=0;t<e;t++)for(var d=arguments[t],p=0,c=d.length;p<c;p++,a++)r[a]=d[p];return r},qt=300;function $t(o,t){var e={config:q(q({},se),z.defaultConfig),l10n:me};e.parseDate=qe({config:e.config,l10n:e.l10n}),e._handlers=[],e.pluginElements=[],e.loadedPlugins=[],e._bind=M,e._setHoursFromDate=E,e._positionCalendar=ye,e.changeMonth=Oe,e.changeYear=be,e.clear=ct,e.close=ut,e.onMouseOver=ve,e._createElement=T,e.createDay=C,e.destroy=pt,e.isEnabled=ie,e.jumpToDate=u,e.updateValue=ne,e.open=ht,e.redraw=Ze,e.set=yt,e.setDate=wt,e.toggle=Dt;function r(){e.utils={getDaysInMonth:function(n,i){return n===void 0&&(n=e.currentMonth),i===void 0&&(i=e.currentYear),n===1&&(i%4===0&&i%100!==0||i%400===0)?29:e.l10n.daysInMonth[n]}}}function a(){e.element=e.input=o,e.isOpen=!1,bt(),Ke(),kt(),xt(),r(),e.isMobile||P(),O(),(e.selectedDates.length||e.config.noCalendar)&&(e.config.enableTime&&E(e.config.noCalendar?e.latestSelectedDateObj:void 0),ne(!1)),c();var n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);!e.isMobile&&n&&ye(),L("onReady")}function d(){var n;return((n=e.calendarContainer)===null||n===void 0?void 0:n.getRootNode()).activeElement||document.activeElement}function p(n){return n.bind(e)}function c(){var n=e.config;n.weekNumbers===!1&&n.showMonths===1||n.noCalendar!==!0&&window.requestAnimationFrame(function(){if(e.calendarContainer!==void 0&&(e.calendarContainer.style.visibility="hidden",e.calendarContainer.style.display="block"),e.daysContainer!==void 0){var i=(e.days.offsetWidth+1)*n.showMonths;e.daysContainer.style.width=i+"px",e.calendarContainer.style.width=i+(e.weekWrapper!==void 0?e.weekWrapper.offsetWidth:0)+"px",e.calendarContainer.style.removeProperty("visibility"),e.calendarContainer.style.removeProperty("display")}})}function h(n){if(e.selectedDates.length===0){var i=e.config.minDate===void 0||Z(new Date,e.config.minDate)>=0?new Date:new Date(e.config.minDate.getTime()),l=We(e.config);i.setHours(l.hours,l.minutes,l.seconds,i.getMilliseconds()),e.selectedDates=[i],e.latestSelectedDateObj=i}n!==void 0&&n.type!=="blur"&&Mt(n);var s=e._input.value;D(),ne(),e._input.value!==s&&e._debouncedChange()}function A(n,i){return n%12+12*Q(i===e.l10n.amPM[1])}function v(n){switch(n%24){case 0:case 12:return 12;default:return n%12}}function D(){if(!(e.hourElement===void 0||e.minuteElement===void 0)){var n=(parseInt(e.hourElement.value.slice(-2),10)||0)%24,i=(parseInt(e.minuteElement.value,10)||0)%60,l=e.secondElement!==void 0?(parseInt(e.secondElement.value,10)||0)%60:0;e.amPM!==void 0&&(n=A(n,e.amPM.textContent));var s=e.config.minTime!==void 0||e.config.minDate&&e.minDateHasTime&&e.latestSelectedDateObj&&Z(e.latestSelectedDateObj,e.config.minDate,!0)===0,f=e.config.maxTime!==void 0||e.config.maxDate&&e.maxDateHasTime&&e.latestSelectedDateObj&&Z(e.latestSelectedDateObj,e.config.maxDate,!0)===0;if(e.config.maxTime!==void 0&&e.config.minTime!==void 0&&e.config.minTime>e.config.maxTime){var b=Je(e.config.minTime.getHours(),e.config.minTime.getMinutes(),e.config.minTime.getSeconds()),S=Je(e.config.maxTime.getHours(),e.config.maxTime.getMinutes(),e.config.maxTime.getSeconds()),w=Je(n,i,l);if(w>S&&w<b){var F=Jt(b);n=F[0],i=F[1],l=F[2]}}else{if(f){var y=e.config.maxTime!==void 0?e.config.maxTime:e.config.maxDate;n=Math.min(n,y.getHours()),n===y.getHours()&&(i=Math.min(i,y.getMinutes())),i===y.getMinutes()&&(l=Math.min(l,y.getSeconds()))}if(s){var k=e.config.minTime!==void 0?e.config.minTime:e.config.minDate;n=Math.max(n,k.getHours()),n===k.getHours()&&i<k.getMinutes()&&(i=k.getMinutes()),i===k.getMinutes()&&(l=Math.max(l,k.getSeconds()))}}x(n,i,l)}}function E(n){var i=n||e.latestSelectedDateObj;i&&i instanceof Date&&x(i.getHours(),i.getMinutes(),i.getSeconds())}function x(n,i,l){e.latestSelectedDateObj!==void 0&&e.latestSelectedDateObj.setHours(n%24,i,l||0,0),!(!e.hourElement||!e.minuteElement||e.isMobile)&&(e.hourElement.value=V(e.config.time_24hr?n:(12+n)%12+12*Q(n%12===0)),e.minuteElement.value=V(i),e.amPM!==void 0&&(e.amPM.textContent=e.l10n.amPM[Q(n>=12)]),e.secondElement!==void 0&&(e.secondElement.value=V(l)))}function H(n){var i=K(n),l=parseInt(i.value)+(n.delta||0);(l/1e3>1||n.key==="Enter"&&!/[^\d]/.test(l.toString()))&&be(l)}function M(n,i,l,s){if(i instanceof Array)return i.forEach(function(f){return M(n,f,l,s)});if(n instanceof Array)return n.forEach(function(f){return M(f,i,l,s)});n.addEventListener(i,l,s),e._handlers.push({remove:function(){return n.removeEventListener(i,l,s)}})}function _(){L("onChange")}function O(){if(e.config.wrap&&["open","close","toggle","clear"].forEach(function(l){Array.prototype.forEach.call(e.element.querySelectorAll("[data-"+l+"]"),function(s){return M(s,"click",e[l])})}),e.isMobile){Ct();return}var n=nt(mt,50);if(e._debouncedChange=nt(_,qt),e.daysContainer&&!/iPhone|iPad|iPod/i.test(navigator.userAgent)&&M(e.daysContainer,"mouseover",function(l){e.config.mode==="range"&&ve(K(l))}),M(e._input,"keydown",Ue),e.calendarContainer!==void 0&&M(e.calendarContainer,"keydown",Ue),!e.config.inline&&!e.config.static&&M(window,"resize",n),window.ontouchstart!==void 0?M(window.document,"touchstart",Ne):M(window.document,"mousedown",Ne),M(window.document,"focus",Ne,{capture:!0}),e.config.clickOpens===!0&&(M(e._input,"focus",e.open),M(e._input,"click",e.open)),e.daysContainer!==void 0&&(M(e.monthNav,"click",St),M(e.monthNav,["keyup","increment"],H),M(e.daysContainer,"click",Xe)),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0){var i=function(l){return K(l).select()};M(e.timeContainer,["increment"],h),M(e.timeContainer,"blur",h,{capture:!0}),M(e.timeContainer,"click",g),M([e.hourElement,e.minuteElement],["focus","click"],i),e.secondElement!==void 0&&M(e.secondElement,"focus",function(){return e.secondElement&&e.secondElement.select()}),e.amPM!==void 0&&M(e.amPM,"click",function(l){h(l)})}e.config.allowInput&&M(e._input,"blur",ft)}function u(n,i){var l=n!==void 0?e.parseDate(n):e.latestSelectedDateObj||(e.config.minDate&&e.config.minDate>e.now?e.config.minDate:e.config.maxDate&&e.config.maxDate<e.now?e.config.maxDate:e.now),s=e.currentYear,f=e.currentMonth;try{l!==void 0&&(e.currentYear=l.getFullYear(),e.currentMonth=l.getMonth())}catch(b){b.message="Invalid date supplied: "+l,e.config.errorHandler(b)}i&&e.currentYear!==s&&(L("onYearChange"),B()),i&&(e.currentYear!==s||e.currentMonth!==f)&&L("onMonthChange"),e.redraw()}function g(n){var i=K(n);~i.className.indexOf("arrow")&&m(n,i.classList.contains("arrowUp")?1:-1)}function m(n,i,l){var s=n&&K(n),f=l||s&&s.parentNode&&s.parentNode.firstChild,b=Le("increment");b.delta=i,f&&f.dispatchEvent(b)}function P(){var n=window.document.createDocumentFragment();if(e.calendarContainer=T("div","flatpickr-calendar"),e.calendarContainer.tabIndex=-1,!e.config.noCalendar){if(n.appendChild(he()),e.innerContainer=T("div","flatpickr-innerContainer"),e.config.weekNumbers){var i=dt(),l=i.weekWrapper,s=i.weekNumbers;e.innerContainer.appendChild(l),e.weekNumbers=s,e.weekWrapper=l}e.rContainer=T("div","flatpickr-rContainer"),e.rContainer.appendChild(ae()),e.daysContainer||(e.daysContainer=T("div","flatpickr-days"),e.daysContainer.tabIndex=-1),Y(),e.rContainer.appendChild(e.daysContainer),e.innerContainer.appendChild(e.rContainer),n.appendChild(e.innerContainer)}e.config.enableTime&&n.appendChild(X()),U(e.calendarContainer,"rangeMode",e.config.mode==="range"),U(e.calendarContainer,"animate",e.config.animate===!0),U(e.calendarContainer,"multiMonth",e.config.showMonths>1),e.calendarContainer.appendChild(n);var f=e.config.appendTo!==void 0&&e.config.appendTo.nodeType!==void 0;if((e.config.inline||e.config.static)&&(e.calendarContainer.classList.add(e.config.inline?"inline":"static"),e.config.inline&&(!f&&e.element.parentNode?e.element.parentNode.insertBefore(e.calendarContainer,e._input.nextSibling):e.config.appendTo!==void 0&&e.config.appendTo.appendChild(e.calendarContainer)),e.config.static)){var b=T("div","flatpickr-wrapper");e.element.parentNode&&e.element.parentNode.insertBefore(b,e.element),b.appendChild(e.element),e.altInput&&b.appendChild(e.altInput),b.appendChild(e.calendarContainer)}!e.config.static&&!e.config.inline&&(e.config.appendTo!==void 0?e.config.appendTo:window.document.body).appendChild(e.calendarContainer)}function C(n,i,l,s){var f=ie(i,!0),b=T("span",n,i.getDate().toString());return b.dateObj=i,b.$i=s,b.setAttribute("aria-label",e.formatDate(i,e.config.ariaDateFormat)),n.indexOf("hidden")===-1&&Z(i,e.now)===0&&(e.todayDateElem=b,b.classList.add("today"),b.setAttribute("aria-current","date")),f?(b.tabIndex=-1,ze(i)&&(b.classList.add("selected"),e.selectedDateElem=b,e.config.mode==="range"&&(U(b,"startRange",e.selectedDates[0]&&Z(i,e.selectedDates[0],!0)===0),U(b,"endRange",e.selectedDates[1]&&Z(i,e.selectedDates[1],!0)===0),n==="nextMonthDay"&&b.classList.add("inRange")))):b.classList.add("flatpickr-disabled"),e.config.mode==="range"&&Et(i)&&!ze(i)&&b.classList.add("inRange"),e.weekNumbers&&e.config.showMonths===1&&n!=="prevMonthDay"&&s%7===6&&e.weekNumbers.insertAdjacentHTML("beforeend","<span class='flatpickr-day'>"+e.config.getWeek(i)+"</span>"),L("onDayCreate",b),b}function I(n){n.focus(),e.config.mode==="range"&&ve(n)}function j(n){for(var i=n>0?0:e.config.showMonths-1,l=n>0?e.config.showMonths:-1,s=i;s!=l;s+=n)for(var f=e.daysContainer.children[s],b=n>0?0:f.children.length-1,S=n>0?f.children.length:-1,w=b;w!=S;w+=n){var F=f.children[w];if(F.className.indexOf("hidden")===-1&&ie(F.dateObj))return F}}function R(n,i){for(var l=n.className.indexOf("Month")===-1?n.dateObj.getMonth():e.currentMonth,s=i>0?e.config.showMonths:-1,f=i>0?1:-1,b=l-e.currentMonth;b!=s;b+=f)for(var S=e.daysContainer.children[b],w=l-e.currentMonth===b?n.$i+i:i<0?S.children.length-1:0,F=S.children.length,y=w;y>=0&&y<F&&y!=(i>0?F:-1);y+=f){var k=S.children[y];if(k.className.indexOf("hidden")===-1&&ie(k.dateObj)&&Math.abs(n.$i-y)>=Math.abs(i))return I(k)}e.changeMonth(f),J(j(f),0)}function J(n,i){var l=d(),s=ge(l||document.body),f=n!==void 0?n:s?l:e.selectedDateElem!==void 0&&ge(e.selectedDateElem)?e.selectedDateElem:e.todayDateElem!==void 0&&ge(e.todayDateElem)?e.todayDateElem:j(i>0?1:-1);f===void 0?e._input.focus():s?R(f,i):I(f)}function W(n,i){for(var l=(new Date(n,i,1).getDay()-e.l10n.firstDayOfWeek+7)%7,s=e.utils.getDaysInMonth((i-1+12)%12,n),f=e.utils.getDaysInMonth(i,n),b=window.document.createDocumentFragment(),S=e.config.showMonths>1,w=S?"prevMonthDay hidden":"prevMonthDay",F=S?"nextMonthDay hidden":"nextMonthDay",y=s+1-l,k=0;y<=s;y++,k++)b.appendChild(C("flatpickr-day "+w,new Date(n,i-1,y),y,k));for(y=1;y<=f;y++,k++)b.appendChild(C("flatpickr-day",new Date(n,i,y),y,k));for(var N=f+1;N<=42-l&&(e.config.showMonths===1||k%7!==0);N++,k++)b.appendChild(C("flatpickr-day "+F,new Date(n,i+1,N%f),N,k));var te=T("div","dayContainer");return te.appendChild(b),te}function Y(){if(e.daysContainer!==void 0){ke(e.daysContainer),e.weekNumbers&&ke(e.weekNumbers);for(var n=document.createDocumentFragment(),i=0;i<e.config.showMonths;i++){var l=new Date(e.currentYear,e.currentMonth,1);l.setMonth(e.currentMonth+i),n.appendChild(W(l.getFullYear(),l.getMonth()))}e.daysContainer.appendChild(n),e.days=e.daysContainer.firstChild,e.config.mode==="range"&&e.selectedDates.length===1&&ve()}}function B(){if(!(e.config.showMonths>1||e.config.monthSelectorType!=="dropdown")){var n=function(s){return e.config.minDate!==void 0&&e.currentYear===e.config.minDate.getFullYear()&&s<e.config.minDate.getMonth()?!1:!(e.config.maxDate!==void 0&&e.currentYear===e.config.maxDate.getFullYear()&&s>e.config.maxDate.getMonth())};e.monthsDropdownContainer.tabIndex=-1,e.monthsDropdownContainer.innerHTML="";for(var i=0;i<12;i++)if(n(i)){var l=T("option","flatpickr-monthDropdown-month");l.value=new Date(e.currentYear,i).getMonth().toString(),l.textContent=Te(i,e.config.shorthandCurrentMonth,e.l10n),l.tabIndex=-1,e.currentMonth===i&&(l.selected=!0),e.monthsDropdownContainer.appendChild(l)}}}function $(){var n=T("div","flatpickr-month"),i=window.document.createDocumentFragment(),l;e.config.showMonths>1||e.config.monthSelectorType==="static"?l=T("span","cur-month"):(e.monthsDropdownContainer=T("select","flatpickr-monthDropdown-months"),e.monthsDropdownContainer.setAttribute("aria-label",e.l10n.monthAriaLabel),M(e.monthsDropdownContainer,"change",function(S){var w=K(S),F=parseInt(w.value,10);e.changeMonth(F-e.currentMonth),L("onMonthChange")}),B(),l=e.monthsDropdownContainer);var s=Ce("cur-year",{tabindex:"-1"}),f=s.getElementsByTagName("input")[0];f.setAttribute("aria-label",e.l10n.yearAriaLabel),e.config.minDate&&f.setAttribute("min",e.config.minDate.getFullYear().toString()),e.config.maxDate&&(f.setAttribute("max",e.config.maxDate.getFullYear().toString()),f.disabled=!!e.config.minDate&&e.config.minDate.getFullYear()===e.config.maxDate.getFullYear());var b=T("div","flatpickr-current-month");return b.appendChild(l),b.appendChild(s),i.appendChild(b),n.appendChild(i),{container:n,yearElement:f,monthElement:l}}function ee(){ke(e.monthNav),e.monthNav.appendChild(e.prevMonthNav),e.config.showMonths&&(e.yearElements=[],e.monthElements=[]);for(var n=e.config.showMonths;n--;){var i=$();e.yearElements.push(i.yearElement),e.monthElements.push(i.monthElement),e.monthNav.appendChild(i.container)}e.monthNav.appendChild(e.nextMonthNav)}function he(){return e.monthNav=T("div","flatpickr-months"),e.yearElements=[],e.monthElements=[],e.prevMonthNav=T("span","flatpickr-prev-month"),e.prevMonthNav.innerHTML=e.config.prevArrow,e.nextMonthNav=T("span","flatpickr-next-month"),e.nextMonthNav.innerHTML=e.config.nextArrow,ee(),Object.defineProperty(e,"_hidePrevMonthArrow",{get:function(){return e.__hidePrevMonthArrow},set:function(n){e.__hidePrevMonthArrow!==n&&(U(e.prevMonthNav,"flatpickr-disabled",n),e.__hidePrevMonthArrow=n)}}),Object.defineProperty(e,"_hideNextMonthArrow",{get:function(){return e.__hideNextMonthArrow},set:function(n){e.__hideNextMonthArrow!==n&&(U(e.nextMonthNav,"flatpickr-disabled",n),e.__hideNextMonthArrow=n)}}),e.currentYearElement=e.yearElements[0],xe(),e.monthNav}function X(){e.calendarContainer.classList.add("hasTime"),e.config.noCalendar&&e.calendarContainer.classList.add("noCalendar");var n=We(e.config);e.timeContainer=T("div","flatpickr-time"),e.timeContainer.tabIndex=-1;var i=T("span","flatpickr-time-separator",":"),l=Ce("flatpickr-hour",{"aria-label":e.l10n.hourAriaLabel});e.hourElement=l.getElementsByTagName("input")[0];var s=Ce("flatpickr-minute",{"aria-label":e.l10n.minuteAriaLabel});if(e.minuteElement=s.getElementsByTagName("input")[0],e.hourElement.tabIndex=e.minuteElement.tabIndex=-1,e.hourElement.value=V(e.latestSelectedDateObj?e.latestSelectedDateObj.getHours():e.config.time_24hr?n.hours:v(n.hours)),e.minuteElement.value=V(e.latestSelectedDateObj?e.latestSelectedDateObj.getMinutes():n.minutes),e.hourElement.setAttribute("step",e.config.hourIncrement.toString()),e.minuteElement.setAttribute("step",e.config.minuteIncrement.toString()),e.hourElement.setAttribute("min",e.config.time_24hr?"0":"1"),e.hourElement.setAttribute("max",e.config.time_24hr?"23":"12"),e.hourElement.setAttribute("maxlength","2"),e.minuteElement.setAttribute("min","0"),e.minuteElement.setAttribute("max","59"),e.minuteElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(l),e.timeContainer.appendChild(i),e.timeContainer.appendChild(s),e.config.time_24hr&&e.timeContainer.classList.add("time24hr"),e.config.enableSeconds){e.timeContainer.classList.add("hasSeconds");var f=Ce("flatpickr-second");e.secondElement=f.getElementsByTagName("input")[0],e.secondElement.value=V(e.latestSelectedDateObj?e.latestSelectedDateObj.getSeconds():n.seconds),e.secondElement.setAttribute("step",e.minuteElement.getAttribute("step")),e.secondElement.setAttribute("min","0"),e.secondElement.setAttribute("max","59"),e.secondElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(T("span","flatpickr-time-separator",":")),e.timeContainer.appendChild(f)}return e.config.time_24hr||(e.amPM=T("span","flatpickr-am-pm",e.l10n.amPM[Q((e.latestSelectedDateObj?e.hourElement.value:e.config.defaultHour)>11)]),e.amPM.title=e.l10n.toggleTitle,e.amPM.tabIndex=-1,e.timeContainer.appendChild(e.amPM)),e.timeContainer}function ae(){e.weekdayContainer?ke(e.weekdayContainer):e.weekdayContainer=T("div","flatpickr-weekdays");for(var n=e.config.showMonths;n--;){var i=T("div","flatpickr-weekdaycontainer");e.weekdayContainer.appendChild(i)}return $e(),e.weekdayContainer}function $e(){if(e.weekdayContainer){var n=e.l10n.firstDayOfWeek,i=at(e.l10n.weekdays.shorthand);n>0&&n<i.length&&(i=at(i.splice(n,i.length),i.splice(0,n)));for(var l=e.config.showMonths;l--;)e.weekdayContainer.children[l].innerHTML=`
      <span class='flatpickr-weekday'>
        `+i.join("</span><span class='flatpickr-weekday'>")+`
      </span>
      `}}function dt(){e.calendarContainer.classList.add("hasWeeks");var n=T("div","flatpickr-weekwrapper");n.appendChild(T("span","flatpickr-weekday",e.l10n.weekAbbreviation));var i=T("div","flatpickr-weeks");return n.appendChild(i),{weekWrapper:n,weekNumbers:i}}function Oe(n,i){i===void 0&&(i=!0);var l=i?n:n-e.currentMonth;l<0&&e._hidePrevMonthArrow===!0||l>0&&e._hideNextMonthArrow===!0||(e.currentMonth+=l,(e.currentMonth<0||e.currentMonth>11)&&(e.currentYear+=e.currentMonth>11?1:-1,e.currentMonth=(e.currentMonth+12)%12,L("onYearChange"),B()),Y(),L("onMonthChange"),xe())}function ct(n,i){if(n===void 0&&(n=!0),i===void 0&&(i=!0),e.input.value="",e.altInput!==void 0&&(e.altInput.value=""),e.mobileInput!==void 0&&(e.mobileInput.value=""),e.selectedDates=[],e.latestSelectedDateObj=void 0,i===!0&&(e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth()),e.config.enableTime===!0){var l=We(e.config),s=l.hours,f=l.minutes,b=l.seconds;x(s,f,b)}e.redraw(),n&&L("onChange")}function ut(){e.isOpen=!1,e.isMobile||(e.calendarContainer!==void 0&&e.calendarContainer.classList.remove("open"),e._input!==void 0&&e._input.classList.remove("active")),L("onClose")}function pt(){e.config!==void 0&&L("onDestroy");for(var n=e._handlers.length;n--;)e._handlers[n].remove();if(e._handlers=[],e.mobileInput)e.mobileInput.parentNode&&e.mobileInput.parentNode.removeChild(e.mobileInput),e.mobileInput=void 0;else if(e.calendarContainer&&e.calendarContainer.parentNode)if(e.config.static&&e.calendarContainer.parentNode){var i=e.calendarContainer.parentNode;if(i.lastChild&&i.removeChild(i.lastChild),i.parentNode){for(;i.firstChild;)i.parentNode.insertBefore(i.firstChild,i);i.parentNode.removeChild(i)}}else e.calendarContainer.parentNode.removeChild(e.calendarContainer);e.altInput&&(e.input.type="text",e.altInput.parentNode&&e.altInput.parentNode.removeChild(e.altInput),delete e.altInput),e.input&&(e.input.type=e.input._type,e.input.classList.remove("flatpickr-input"),e.input.removeAttribute("readonly")),["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","monthsDropdownContainer","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach(function(l){try{delete e[l]}catch{}})}function ce(n){return e.calendarContainer.contains(n)}function Ne(n){if(e.isOpen&&!e.config.inline){var i=K(n),l=ce(i),s=i===e.input||i===e.altInput||e.element.contains(i)||n.path&&n.path.indexOf&&(~n.path.indexOf(e.input)||~n.path.indexOf(e.altInput)),f=!s&&!l&&!ce(n.relatedTarget),b=!e.config.ignoredFocusElements.some(function(S){return S.contains(i)});f&&b&&(e.config.allowInput&&e.setDate(e._input.value,!1,e.config.altInput?e.config.altFormat:e.config.dateFormat),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0&&e.input.value!==""&&e.input.value!==void 0&&h(),e.close(),e.config&&e.config.mode==="range"&&e.selectedDates.length===1&&e.clear(!1))}}function be(n){if(!(!n||e.config.minDate&&n<e.config.minDate.getFullYear()||e.config.maxDate&&n>e.config.maxDate.getFullYear())){var i=n,l=e.currentYear!==i;e.currentYear=i||e.currentYear,e.config.maxDate&&e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth=Math.min(e.config.maxDate.getMonth(),e.currentMonth):e.config.minDate&&e.currentYear===e.config.minDate.getFullYear()&&(e.currentMonth=Math.max(e.config.minDate.getMonth(),e.currentMonth)),l&&(e.redraw(),L("onYearChange"),B())}}function ie(n,i){var l;i===void 0&&(i=!0);var s=e.parseDate(n,void 0,i);if(e.config.minDate&&s&&Z(s,e.config.minDate,i!==void 0?i:!e.minDateHasTime)<0||e.config.maxDate&&s&&Z(s,e.config.maxDate,i!==void 0?i:!e.maxDateHasTime)>0)return!1;if(!e.config.enable&&e.config.disable.length===0)return!0;if(s===void 0)return!1;for(var f=!!e.config.enable,b=(l=e.config.enable)!==null&&l!==void 0?l:e.config.disable,S=0,w=void 0;S<b.length;S++){if(w=b[S],typeof w=="function"&&w(s))return f;if(w instanceof Date&&s!==void 0&&w.getTime()===s.getTime())return f;if(typeof w=="string"){var F=e.parseDate(w,void 0,!0);return F&&F.getTime()===s.getTime()?f:!f}else if(typeof w=="object"&&s!==void 0&&w.from&&w.to&&s.getTime()>=w.from.getTime()&&s.getTime()<=w.to.getTime())return f}return!f}function ge(n){return e.daysContainer!==void 0?n.className.indexOf("hidden")===-1&&n.className.indexOf("flatpickr-disabled")===-1&&e.daysContainer.contains(n):!1}function ft(n){var i=n.target===e._input,l=e._input.value.trimEnd()!==_e();i&&l&&!(n.relatedTarget&&ce(n.relatedTarget))&&e.setDate(e._input.value,!0,n.target===e.altInput?e.config.altFormat:e.config.dateFormat)}function Ue(n){var i=K(n),l=e.config.wrap?o.contains(i):i===e._input,s=e.config.allowInput,f=e.isOpen&&(!s||!l),b=e.config.inline&&l&&!s;if(n.keyCode===13&&l){if(s)return e.setDate(e._input.value,!0,i===e.altInput?e.config.altFormat:e.config.dateFormat),e.close(),i.blur();e.open()}else if(ce(i)||f||b){var S=!!e.timeContainer&&e.timeContainer.contains(i);switch(n.keyCode){case 13:S?(n.preventDefault(),h(),Re()):Xe(n);break;case 27:n.preventDefault(),Re();break;case 8:case 46:l&&!e.config.allowInput&&(n.preventDefault(),e.clear());break;case 37:case 39:if(!S&&!l){n.preventDefault();var w=d();if(e.daysContainer!==void 0&&(s===!1||w&&ge(w))){var F=n.keyCode===39?1:-1;n.ctrlKey?(n.stopPropagation(),Oe(F),J(j(1),0)):J(void 0,F)}}else e.hourElement&&e.hourElement.focus();break;case 38:case 40:n.preventDefault();var y=n.keyCode===40?1:-1;e.daysContainer&&i.$i!==void 0||i===e.input||i===e.altInput?n.ctrlKey?(n.stopPropagation(),be(e.currentYear-y),J(j(1),0)):S||J(void 0,y*7):i===e.currentYearElement?be(e.currentYear-y):e.config.enableTime&&(!S&&e.hourElement&&e.hourElement.focus(),h(n),e._debouncedChange());break;case 9:if(S){var k=[e.hourElement,e.minuteElement,e.secondElement,e.amPM].concat(e.pluginElements).filter(function(G){return G}),N=k.indexOf(i);if(N!==-1){var te=k[N+(n.shiftKey?-1:1)];n.preventDefault(),(te||e._input).focus()}}else!e.config.noCalendar&&e.daysContainer&&e.daysContainer.contains(i)&&n.shiftKey&&(n.preventDefault(),e._input.focus());break}}if(e.amPM!==void 0&&i===e.amPM)switch(n.key){case e.l10n.amPM[0].charAt(0):case e.l10n.amPM[0].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[0],D(),ne();break;case e.l10n.amPM[1].charAt(0):case e.l10n.amPM[1].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[1],D(),ne();break}(l||ce(i))&&L("onKeyDown",n)}function ve(n,i){if(i===void 0&&(i="flatpickr-day"),!(e.selectedDates.length!==1||n&&(!n.classList.contains(i)||n.classList.contains("flatpickr-disabled")))){for(var l=n?n.dateObj.getTime():e.days.firstElementChild.dateObj.getTime(),s=e.parseDate(e.selectedDates[0],void 0,!0).getTime(),f=Math.min(l,e.selectedDates[0].getTime()),b=Math.max(l,e.selectedDates[0].getTime()),S=!1,w=0,F=0,y=f;y<b;y+=Wt.DAY)ie(new Date(y),!0)||(S=S||y>f&&y<b,y<s&&(!w||y>w)?w=y:y>s&&(!F||y<F)&&(F=y));var k=Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+"+e.config.showMonths+") > ."+i));k.forEach(function(N){var te=N.dateObj,G=te.getTime(),ue=w>0&&G<w||F>0&&G>F;if(ue){N.classList.add("notAllowed"),["inRange","startRange","endRange"].forEach(function(le){N.classList.remove(le)});return}else if(S&&!ue)return;["startRange","inRange","endRange","notAllowed"].forEach(function(le){N.classList.remove(le)}),n!==void 0&&(n.classList.add(l<=e.selectedDates[0].getTime()?"startRange":"endRange"),s<l&&G===s?N.classList.add("startRange"):s>l&&G===s&&N.classList.add("endRange"),G>=w&&(F===0||G<=F)&&Yt(G,s,l)&&N.classList.add("inRange"))})}}function mt(){e.isOpen&&!e.config.static&&!e.config.inline&&ye()}function ht(n,i){if(i===void 0&&(i=e._positionElement),e.isMobile===!0){if(n){n.preventDefault();var l=K(n);l&&l.blur()}e.mobileInput!==void 0&&(e.mobileInput.focus(),e.mobileInput.click()),L("onOpen");return}else if(e._input.disabled||e.config.inline)return;var s=e.isOpen;e.isOpen=!0,s||(e.calendarContainer.classList.add("open"),e._input.classList.add("active"),L("onOpen"),ye(i)),e.config.enableTime===!0&&e.config.noCalendar===!0&&e.config.allowInput===!1&&(n===void 0||!e.timeContainer.contains(n.relatedTarget))&&setTimeout(function(){return e.hourElement.select()},50)}function Ve(n){return function(i){var l=e.config["_"+n+"Date"]=e.parseDate(i,e.config.dateFormat),s=e.config["_"+(n==="min"?"max":"min")+"Date"];l!==void 0&&(e[n==="min"?"minDateHasTime":"maxDateHasTime"]=l.getHours()>0||l.getMinutes()>0||l.getSeconds()>0),e.selectedDates&&(e.selectedDates=e.selectedDates.filter(function(f){return ie(f)}),!e.selectedDates.length&&n==="min"&&E(l),ne()),e.daysContainer&&(Ze(),l!==void 0?e.currentYearElement[n]=l.getFullYear().toString():e.currentYearElement.removeAttribute(n),e.currentYearElement.disabled=!!s&&l!==void 0&&s.getFullYear()===l.getFullYear())}}function bt(){var n=["wrap","weekNumbers","allowInput","allowInvalidPreload","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],i=q(q({},JSON.parse(JSON.stringify(o.dataset||{}))),t),l={};e.config.parseDate=i.parseDate,e.config.formatDate=i.formatDate,Object.defineProperty(e.config,"enable",{get:function(){return e.config._enable},set:function(k){e.config._enable=et(k)}}),Object.defineProperty(e.config,"disable",{get:function(){return e.config._disable},set:function(k){e.config._disable=et(k)}});var s=i.mode==="time";if(!i.dateFormat&&(i.enableTime||s)){var f=z.defaultConfig.dateFormat||se.dateFormat;l.dateFormat=i.noCalendar||s?"H:i"+(i.enableSeconds?":S":""):f+" H:i"+(i.enableSeconds?":S":"")}if(i.altInput&&(i.enableTime||s)&&!i.altFormat){var b=z.defaultConfig.altFormat||se.altFormat;l.altFormat=i.noCalendar||s?"h:i"+(i.enableSeconds?":S K":" K"):b+(" h:i"+(i.enableSeconds?":S":"")+" K")}Object.defineProperty(e.config,"minDate",{get:function(){return e.config._minDate},set:Ve("min")}),Object.defineProperty(e.config,"maxDate",{get:function(){return e.config._maxDate},set:Ve("max")});var S=function(k){return function(N){e.config[k==="min"?"_minTime":"_maxTime"]=e.parseDate(N,"H:i:S")}};Object.defineProperty(e.config,"minTime",{get:function(){return e.config._minTime},set:S("min")}),Object.defineProperty(e.config,"maxTime",{get:function(){return e.config._maxTime},set:S("max")}),i.mode==="time"&&(e.config.noCalendar=!0,e.config.enableTime=!0),Object.assign(e.config,l,i);for(var w=0;w<n.length;w++)e.config[n[w]]=e.config[n[w]]===!0||e.config[n[w]]==="true";He.filter(function(k){return e.config[k]!==void 0}).forEach(function(k){e.config[k]=Be(e.config[k]||[]).map(p)}),e.isMobile=!e.config.disableMobile&&!e.config.inline&&e.config.mode==="single"&&!e.config.disable.length&&!e.config.enable&&!e.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);for(var w=0;w<e.config.plugins.length;w++){var F=e.config.plugins[w](e)||{};for(var y in F)He.indexOf(y)>-1?e.config[y]=Be(F[y]).map(p).concat(e.config[y]):typeof i[y]>"u"&&(e.config[y]=F[y])}i.altInputClass||(e.config.altInputClass=Ge().className+" "+e.config.altInputClass),L("onParseConfig")}function Ge(){return e.config.wrap?o.querySelector("[data-input]"):o}function Ke(){typeof e.config.locale!="object"&&typeof z.l10ns[e.config.locale]>"u"&&e.config.errorHandler(new Error("flatpickr: invalid locale "+e.config.locale)),e.l10n=q(q({},z.l10ns.default),typeof e.config.locale=="object"?e.config.locale:e.config.locale!=="default"?z.l10ns[e.config.locale]:void 0),re.D="("+e.l10n.weekdays.shorthand.join("|")+")",re.l="("+e.l10n.weekdays.longhand.join("|")+")",re.M="("+e.l10n.months.shorthand.join("|")+")",re.F="("+e.l10n.months.longhand.join("|")+")",re.K="("+e.l10n.amPM[0]+"|"+e.l10n.amPM[1]+"|"+e.l10n.amPM[0].toLowerCase()+"|"+e.l10n.amPM[1].toLowerCase()+")";var n=q(q({},t),JSON.parse(JSON.stringify(o.dataset||{})));n.time_24hr===void 0&&z.defaultConfig.time_24hr===void 0&&(e.config.time_24hr=e.l10n.time_24hr),e.formatDate=st(e),e.parseDate=qe({config:e.config,l10n:e.l10n})}function ye(n){if(typeof e.config.position=="function")return void e.config.position(e,n);if(e.calendarContainer!==void 0){L("onPreCalendarPosition");var i=n||e._positionElement,l=Array.prototype.reduce.call(e.calendarContainer.children,(function(Rt,Lt){return Rt+Lt.offsetHeight}),0),s=e.calendarContainer.offsetWidth,f=e.config.position.split(" "),b=f[0],S=f.length>1?f[1]:null,w=i.getBoundingClientRect(),F=window.innerHeight-w.bottom,y=b==="above"||b!=="below"&&F<l&&w.top>l,k=window.pageYOffset+w.top+(y?-l-2:i.offsetHeight+2);if(U(e.calendarContainer,"arrowTop",!y),U(e.calendarContainer,"arrowBottom",y),!e.config.inline){var N=window.pageXOffset+w.left,te=!1,G=!1;S==="center"?(N-=(s-w.width)/2,te=!0):S==="right"&&(N-=s-w.width,G=!0),U(e.calendarContainer,"arrowLeft",!te&&!G),U(e.calendarContainer,"arrowCenter",te),U(e.calendarContainer,"arrowRight",G);var ue=window.document.body.offsetWidth-(window.pageXOffset+w.right),le=N+s>window.document.body.offsetWidth,Ft=ue+s>window.document.body.offsetWidth;if(U(e.calendarContainer,"rightMost",le),!e.config.static)if(e.calendarContainer.style.top=k+"px",!le)e.calendarContainer.style.left=N+"px",e.calendarContainer.style.right="auto";else if(!Ft)e.calendarContainer.style.left="auto",e.calendarContainer.style.right=ue+"px";else{var je=gt();if(je===void 0)return;var It=window.document.body.offsetWidth,At=Math.max(0,It/2-s/2),Pt=".flatpickr-calendar.centerMost:before",Tt=".flatpickr-calendar.centerMost:after",Ot=je.cssRules.length,Nt="{left:"+w.left+"px;right:auto;}";U(e.calendarContainer,"rightMost",!1),U(e.calendarContainer,"centerMost",!0),je.insertRule(Pt+","+Tt+Nt,Ot),e.calendarContainer.style.left=At+"px",e.calendarContainer.style.right="auto"}}}}function gt(){for(var n=null,i=0;i<document.styleSheets.length;i++){var l=document.styleSheets[i];if(l.cssRules){try{l.cssRules}catch{continue}n=l;break}}return n??vt()}function vt(){var n=document.createElement("style");return document.head.appendChild(n),n.sheet}function Ze(){e.config.noCalendar||e.isMobile||(B(),xe(),Y())}function Re(){e._input.focus(),window.navigator.userAgent.indexOf("MSIE")!==-1||navigator.msMaxTouchPoints!==void 0?setTimeout(e.close,0):e.close()}function Xe(n){n.preventDefault(),n.stopPropagation();var i=function(k){return k.classList&&k.classList.contains("flatpickr-day")&&!k.classList.contains("flatpickr-disabled")&&!k.classList.contains("notAllowed")},l=lt(K(n),i);if(l!==void 0){var s=l,f=e.latestSelectedDateObj=new Date(s.dateObj.getTime()),b=(f.getMonth()<e.currentMonth||f.getMonth()>e.currentMonth+e.config.showMonths-1)&&e.config.mode!=="range";if(e.selectedDateElem=s,e.config.mode==="single")e.selectedDates=[f];else if(e.config.mode==="multiple"){var S=ze(f);S?e.selectedDates.splice(parseInt(S),1):e.selectedDates.push(f)}else e.config.mode==="range"&&(e.selectedDates.length===2&&e.clear(!1,!1),e.latestSelectedDateObj=f,e.selectedDates.push(f),Z(f,e.selectedDates[0],!0)!==0&&e.selectedDates.sort(function(k,N){return k.getTime()-N.getTime()}));if(D(),b){var w=e.currentYear!==f.getFullYear();e.currentYear=f.getFullYear(),e.currentMonth=f.getMonth(),w&&(L("onYearChange"),B()),L("onMonthChange")}if(xe(),Y(),ne(),!b&&e.config.mode!=="range"&&e.config.showMonths===1?I(s):e.selectedDateElem!==void 0&&e.hourElement===void 0&&e.selectedDateElem&&e.selectedDateElem.focus(),e.hourElement!==void 0&&e.hourElement!==void 0&&e.hourElement.focus(),e.config.closeOnSelect){var F=e.config.mode==="single"&&!e.config.enableTime,y=e.config.mode==="range"&&e.selectedDates.length===2&&!e.config.enableTime;(F||y)&&Re()}_()}}var we={locale:[Ke,$e],showMonths:[ee,c,ae],minDate:[u],maxDate:[u],positionElement:[tt],clickOpens:[function(){e.config.clickOpens===!0?(M(e._input,"focus",e.open),M(e._input,"click",e.open)):(e._input.removeEventListener("focus",e.open),e._input.removeEventListener("click",e.open))}]};function yt(n,i){if(n!==null&&typeof n=="object"){Object.assign(e.config,n);for(var l in n)we[l]!==void 0&&we[l].forEach(function(s){return s()})}else e.config[n]=i,we[n]!==void 0?we[n].forEach(function(s){return s()}):He.indexOf(n)>-1&&(e.config[n]=Be(i));e.redraw(),ne(!0)}function Qe(n,i){var l=[];if(n instanceof Array)l=n.map(function(s){return e.parseDate(s,i)});else if(n instanceof Date||typeof n=="number")l=[e.parseDate(n,i)];else if(typeof n=="string")switch(e.config.mode){case"single":case"time":l=[e.parseDate(n,i)];break;case"multiple":l=n.split(e.config.conjunction).map(function(s){return e.parseDate(s,i)});break;case"range":l=n.split(e.l10n.rangeSeparator).map(function(s){return e.parseDate(s,i)});break}else e.config.errorHandler(new Error("Invalid date supplied: "+JSON.stringify(n)));e.selectedDates=e.config.allowInvalidPreload?l:l.filter(function(s){return s instanceof Date&&ie(s,!1)}),e.config.mode==="range"&&e.selectedDates.sort(function(s,f){return s.getTime()-f.getTime()})}function wt(n,i,l){if(i===void 0&&(i=!1),l===void 0&&(l=e.config.dateFormat),n!==0&&!n||n instanceof Array&&n.length===0)return e.clear(i);Qe(n,l),e.latestSelectedDateObj=e.selectedDates[e.selectedDates.length-1],e.redraw(),u(void 0,i),E(),e.selectedDates.length===0&&e.clear(!1),ne(i),i&&L("onChange")}function et(n){return n.slice().map(function(i){return typeof i=="string"||typeof i=="number"||i instanceof Date?e.parseDate(i,void 0,!0):i&&typeof i=="object"&&i.from&&i.to?{from:e.parseDate(i.from,void 0),to:e.parseDate(i.to,void 0)}:i}).filter(function(i){return i})}function xt(){e.selectedDates=[],e.now=e.parseDate(e.config.now)||new Date;var n=e.config.defaultDate||((e.input.nodeName==="INPUT"||e.input.nodeName==="TEXTAREA")&&e.input.placeholder&&e.input.value===e.input.placeholder?null:e.input.value);n&&Qe(n,e.config.dateFormat),e._initialDate=e.selectedDates.length>0?e.selectedDates[0]:e.config.minDate&&e.config.minDate.getTime()>e.now.getTime()?e.config.minDate:e.config.maxDate&&e.config.maxDate.getTime()<e.now.getTime()?e.config.maxDate:e.now,e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth(),e.selectedDates.length>0&&(e.latestSelectedDateObj=e.selectedDates[0]),e.config.minTime!==void 0&&(e.config.minTime=e.parseDate(e.config.minTime,"H:i")),e.config.maxTime!==void 0&&(e.config.maxTime=e.parseDate(e.config.maxTime,"H:i")),e.minDateHasTime=!!e.config.minDate&&(e.config.minDate.getHours()>0||e.config.minDate.getMinutes()>0||e.config.minDate.getSeconds()>0),e.maxDateHasTime=!!e.config.maxDate&&(e.config.maxDate.getHours()>0||e.config.maxDate.getMinutes()>0||e.config.maxDate.getSeconds()>0)}function kt(){if(e.input=Ge(),!e.input){e.config.errorHandler(new Error("Invalid input element specified"));return}e.input._type=e.input.type,e.input.type="text",e.input.classList.add("flatpickr-input"),e._input=e.input,e.config.altInput&&(e.altInput=T(e.input.nodeName,e.config.altInputClass),e._input=e.altInput,e.altInput.placeholder=e.input.placeholder,e.altInput.disabled=e.input.disabled,e.altInput.required=e.input.required,e.altInput.tabIndex=e.input.tabIndex,e.altInput.type="text",e.input.setAttribute("type","hidden"),!e.config.static&&e.input.parentNode&&e.input.parentNode.insertBefore(e.altInput,e.input.nextSibling)),e.config.allowInput||e._input.setAttribute("readonly","readonly"),tt()}function tt(){e._positionElement=e.config.positionElement||e._input}function Ct(){var n=e.config.enableTime?e.config.noCalendar?"time":"datetime-local":"date";e.mobileInput=T("input",e.input.className+" flatpickr-mobile"),e.mobileInput.tabIndex=1,e.mobileInput.type=n,e.mobileInput.disabled=e.input.disabled,e.mobileInput.required=e.input.required,e.mobileInput.placeholder=e.input.placeholder,e.mobileFormatStr=n==="datetime-local"?"Y-m-d\\TH:i:S":n==="date"?"Y-m-d":"H:i:S",e.selectedDates.length>0&&(e.mobileInput.defaultValue=e.mobileInput.value=e.formatDate(e.selectedDates[0],e.mobileFormatStr)),e.config.minDate&&(e.mobileInput.min=e.formatDate(e.config.minDate,"Y-m-d")),e.config.maxDate&&(e.mobileInput.max=e.formatDate(e.config.maxDate,"Y-m-d")),e.input.getAttribute("step")&&(e.mobileInput.step=String(e.input.getAttribute("step"))),e.input.type="hidden",e.altInput!==void 0&&(e.altInput.type="hidden");try{e.input.parentNode&&e.input.parentNode.insertBefore(e.mobileInput,e.input.nextSibling)}catch{}M(e.mobileInput,"change",function(i){e.setDate(K(i).value,!1,e.mobileFormatStr),L("onChange"),L("onClose")})}function Dt(n){if(e.isOpen===!0)return e.close();e.open(n)}function L(n,i){if(e.config!==void 0){var l=e.config[n];if(l!==void 0&&l.length>0)for(var s=0;l[s]&&s<l.length;s++)l[s](e.selectedDates,e.input.value,e,i);n==="onChange"&&(e.input.dispatchEvent(Le("change")),e.input.dispatchEvent(Le("input")))}}function Le(n){var i=document.createEvent("Event");return i.initEvent(n,!0,!0),i}function ze(n){for(var i=0;i<e.selectedDates.length;i++){var l=e.selectedDates[i];if(l instanceof Date&&Z(l,n)===0)return""+i}return!1}function Et(n){return e.config.mode!=="range"||e.selectedDates.length<2?!1:Z(n,e.selectedDates[0])>=0&&Z(n,e.selectedDates[1])<=0}function xe(){e.config.noCalendar||e.isMobile||!e.monthNav||(e.yearElements.forEach(function(n,i){var l=new Date(e.currentYear,e.currentMonth,1);l.setMonth(e.currentMonth+i),e.config.showMonths>1||e.config.monthSelectorType==="static"?e.monthElements[i].textContent=Te(l.getMonth(),e.config.shorthandCurrentMonth,e.l10n)+" ":e.monthsDropdownContainer.value=l.getMonth().toString(),n.value=l.getFullYear().toString()}),e._hidePrevMonthArrow=e.config.minDate!==void 0&&(e.currentYear===e.config.minDate.getFullYear()?e.currentMonth<=e.config.minDate.getMonth():e.currentYear<e.config.minDate.getFullYear()),e._hideNextMonthArrow=e.config.maxDate!==void 0&&(e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth+1>e.config.maxDate.getMonth():e.currentYear>e.config.maxDate.getFullYear()))}function _e(n){var i=n||(e.config.altInput?e.config.altFormat:e.config.dateFormat);return e.selectedDates.map(function(l){return e.formatDate(l,i)}).filter(function(l,s,f){return e.config.mode!=="range"||e.config.enableTime||f.indexOf(l)===s}).join(e.config.mode!=="range"?e.config.conjunction:e.l10n.rangeSeparator)}function ne(n){n===void 0&&(n=!0),e.mobileInput!==void 0&&e.mobileFormatStr&&(e.mobileInput.value=e.latestSelectedDateObj!==void 0?e.formatDate(e.latestSelectedDateObj,e.mobileFormatStr):""),e.input.value=_e(e.config.dateFormat),e.altInput!==void 0&&(e.altInput.value=_e(e.config.altFormat)),n!==!1&&L("onValueUpdate")}function St(n){var i=K(n),l=e.prevMonthNav.contains(i),s=e.nextMonthNav.contains(i);l||s?Oe(l?-1:1):e.yearElements.indexOf(i)>=0?i.select():i.classList.contains("arrowUp")?e.changeYear(e.currentYear+1):i.classList.contains("arrowDown")&&e.changeYear(e.currentYear-1)}function Mt(n){n.preventDefault();var i=n.type==="keydown",l=K(n),s=l;e.amPM!==void 0&&l===e.amPM&&(e.amPM.textContent=e.l10n.amPM[Q(e.amPM.textContent===e.l10n.amPM[0])]);var f=parseFloat(s.getAttribute("min")),b=parseFloat(s.getAttribute("max")),S=parseFloat(s.getAttribute("step")),w=parseInt(s.value,10),F=n.delta||(i?n.which===38?1:-1:0),y=w+S*F;if(typeof s.value<"u"&&s.value.length===2){var k=s===e.hourElement,N=s===e.minuteElement;y<f?(y=b+y+Q(!k)+(Q(k)&&Q(!e.amPM)),N&&m(void 0,-1,e.hourElement)):y>b&&(y=s===e.hourElement?y-b-Q(!e.amPM):f,N&&m(void 0,1,e.hourElement)),e.amPM&&k&&(S===1?y+w===23:Math.abs(y-w)>S)&&(e.amPM.textContent=e.l10n.amPM[Q(e.amPM.textContent===e.l10n.amPM[0])]),s.value=V(y)}}return a(),e}function de(o,t){for(var e=Array.prototype.slice.call(o).filter(function(p){return p instanceof HTMLElement}),r=[],a=0;a<e.length;a++){var d=e[a];try{if(d.getAttribute("data-fp-omit")!==null)continue;d._flatpickr!==void 0&&(d._flatpickr.destroy(),d._flatpickr=void 0),d._flatpickr=$t(d,t||{}),r.push(d._flatpickr)}catch(p){console.error(p)}}return r.length===1?r[0]:r}typeof HTMLElement<"u"&&typeof HTMLCollection<"u"&&typeof NodeList<"u"&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(o){return de(this,o)},HTMLElement.prototype.flatpickr=function(o){return de([this],o)});var z=function(o,t){return typeof o=="string"?de(window.document.querySelectorAll(o),t):o instanceof Node?de([o],t):de(o,t)};z.defaultConfig={};z.l10ns={en:q({},me),default:q({},me)};z.localize=function(o){z.l10ns.default=q(q({},z.l10ns.default),o)};z.setDefaults=function(o){z.defaultConfig=q(q({},z.defaultConfig),o)};z.parseDate=qe({});z.formatDate=st({});z.compareDates=Z;typeof jQuery<"u"&&typeof jQuery.fn<"u"&&(jQuery.fn.flatpickr=function(o){return de(this,o)});Date.prototype.fp_incr=function(o){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+(typeof o=="string"?parseInt(o,10):o))};typeof window<"u"&&(window.flatpickr=z);var pe={exports:{}},Ut=pe.exports,it;function Vt(){return it||(it=1,(function(o,t){(function(e,r){r(t)})(Ut,(function(e){var r=typeof window<"u"&&window.flatpickr!==void 0?window.flatpickr:{l10ns:{}},a={weekdays:{shorthand:["Ne","Po","Út","St","Čt","Pá","So"],longhand:["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"]},months:{shorthand:["Led","Ún","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Pro"],longhand:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"]},firstDayOfWeek:1,ordinal:function(){return"."},rangeSeparator:" do ",weekAbbreviation:"Týd.",scrollTitle:"Rolujte pro změnu",toggleTitle:"Přepnout dopoledne/odpoledne",amPM:["dop.","odp."],yearAriaLabel:"Rok",time_24hr:!0};r.l10ns.cs=a;var d=r.l10ns;e.Czech=a,e.default=d,Object.defineProperty(e,"__esModule",{value:!0})}))})(pe,pe.exports)),pe.exports}var rt=Vt();const Gt='.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,.08);box-shadow:1px 0 #e6e6e6,-1px 0 #e6e6e6,0 1px #e6e6e6,0 -1px #e6e6e6,0 3px 13px #00000014}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1);animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none!important;box-shadow:none!important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:"";height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:#000000e6;fill:#000000e6;height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:#000000e6;fill:#000000e6}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:#0000001a}.numInputWrapper span:active{background:#0003}.numInputWrapper span:after{display:block;content:"";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:#00000080}.numInputWrapper:hover{background:#0000000d}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:#0000000d}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch�;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:#000000e6}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:#000000e6}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:#00000080;background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:#0000000d}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:#0000008a;line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:#3939394d;background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:#3939391a}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 #569ff7,5px 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:#3939394d;background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:"";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}';if(!document.getElementById("ts-form-flatpickr-styles")){const o=document.createElement("style");o.id="ts-form-flatpickr-styles",o.textContent=Gt,document.head.appendChild(o)}class Kt extends HTMLElement{constructor(){super()}static get observedAttributes(){return["field-name","config","value","error"]}attributeChangedCallback(t,e,r){e!==r&&this.requestRender()}connectedCallback(){this.requestRender()}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}render(){this.innerHTML="";const t=this.getAttribute("field-name"),e=this.getAttribute("config"),r=this.getAttribute("value"),a=this.getAttribute("error");if(!t||!e)return;let d;try{d=JSON.parse(e)}catch(h){console.error("Invalid config for field",t,h);return}let p=r;try{r&&(r.startsWith("[")||r.startsWith("{")||r==="true"||r==="false")&&(p=JSON.parse(r))}catch{}const c=this.createField(t,d,p);if(this.appendChild(c),!document.getElementById("ts-form-field-styles")){const h=document.createElement("style");h.id="ts-form-field-styles",h.textContent=`
                .force-prefix-spacing::part(prefix) {
                    padding-inline-start: var(--sl-input-spacing-medium, 0.75rem);
                    color: var(--sl-input-icon-color, currentColor);
                }
                .force-suffix-spacing::part(suffix) {
                    padding-inline-end: var(--sl-input-spacing-medium, 0.75rem);
                    color: var(--sl-input-icon-color, currentColor);
                }
                sl-icon[slot="prefix"] {
                    margin: 0 !important;
                }
            `,this.appendChild(h)}if(d.type==="select"&&Promise.all([customElements.whenDefined("sl-select"),customElements.whenDefined("sl-option")]).then(()=>{requestAnimationFrame(()=>{d.multiple&&Array.isArray(p)?c.value=p:c.value=p||""})}),a)if(c.classList.add("input-invalid"),d.type==="file"||d.type==="image")c.setAttribute("error",a);else{const h=document.createElement("div");h.className="error-message",h.textContent=a,this.appendChild(h)}else(d.type==="file"||d.type==="image")&&c.removeAttribute("error"),c.classList.remove("input-invalid")}createField(t,e,r){let a;switch(e.type){case"textarea":a=document.createElement("sl-textarea"),a.value=r||"";break;case"password":a=document.createElement("sl-input"),a.type="password",a.passwordToggle=!0,a.setAttribute("autocomplete","current-password"),a.value=r||"";break;case"checkbox":const d=document.createElement("div");d.style.display="flex",d.style.flexDirection="column";const p=document.createElement("div");return p.style.height="calc(var(--sl-input-label-font-size-medium) + var(--sl-spacing-2x-small))",p.style.marginBottom="var(--sl-spacing-2x-small)",d.appendChild(p),a=document.createElement("sl-checkbox"),e.hideLabel||(a.textContent=e.label),a.checked=r===!0,a.addEventListener("sl-change",u=>this.handleFieldChange(u,t)),d.appendChild(a),d;case"switch":const c=document.createElement("div");if(c.style.display="flex",c.style.flexDirection="column",c.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const u=document.createElement("label");u.textContent=e.label,u.style.fontSize="var(--sl-input-label-font-size-medium)",u.style.fontWeight="var(--sl-font-weight-semibold)",c.appendChild(u)}const h=document.createElement("div");return h.style.display="flex",h.style.alignItems="center",h.style.minHeight="var(--sl-input-height-medium)",h.style.paddingLeft="2px",a=document.createElement("sl-switch"),a.checked=r===!0,a.addEventListener("sl-change",u=>this.handleFieldChange(u,t)),h.appendChild(a),c.appendChild(h),c;case"slider":const A=document.createElement("div");if(A.style.display="flex",A.style.flexDirection="column",!e.hideLabel){const u=document.createElement("label");u.textContent=e.label,u.style.fontSize="var(--sl-input-label-font-size-medium)",u.style.fontWeight="var(--sl-font-weight-semibold)",u.style.marginBottom="var(--sl-spacing-2x-small)",A.appendChild(u)}return a=document.createElement("sl-range"),e.min&&(a.min=e.min),e.max&&(a.max=e.max),e.step&&(a.step=e.step),a.value=r||e.min||0,a.addEventListener("sl-change",u=>this.handleFieldChange(u,t)),A.appendChild(a),A;case"combobox":a=document.createElement("ts-combobox"),a.setAttribute("label",e.label||""),a.setAttribute("value",r||""),e.options&&a.setAttribute("options",JSON.stringify(e.options)),e.placeholder&&a.setAttribute("placeholder",e.placeholder),e.disabled&&a.setAttribute("disabled",""),e.allowCustom&&a.setAttribute("allow-custom",""),e.allowEmpty&&a.setAttribute("allow-empty","");break;case"file":case"image":a=document.createElement("ts-file-upload"),e.hideLabel||a.setAttribute("label",e.label||"Upload file"),e.multiple&&a.setAttribute("multiple","true"),e.type==="image"?a.setAttribute("accept","image/*"):e.accept&&a.setAttribute("accept",e.accept);break;case"button":return a=document.createElement("sl-button"),a.variant=e.variant||"primary",a.textContent=e.label||"Button",a.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:e.action||"click"},bubbles:!0,composed:!0}))}),a;case"button-group":let v;return e.variant==="process"?(v=document.createElement("div"),v.className="process-group",v.style.display="flex",v.style.gap="0"):(v=document.createElement("sl-button-group"),v.style.gap="0.5rem"),e.options&&e.options.forEach(u=>{const[g,m="true",P="default",C=""]=u.split("/"),I=document.createElement("sl-button");I.dataset.value=g;const j=r===g?P||"primary":P||"default";I.variant=j,I.setAttribute("data-variant",j),I.textContent=C||g,I.disabled=m==="false",I.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("field-change",{detail:{field:t,value:g},bubbles:!0,composed:!0}))}),v.appendChild(I)}),v;case"radio":const D=document.createElement("div");if(D.style.display="flex",D.style.flexDirection="column",D.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const u=document.createElement("label");u.textContent=e.label,u.style.fontSize="var(--sl-input-label-font-size-medium)",u.style.fontWeight="var(--sl-font-weight-semibold)",D.appendChild(u)}return a=document.createElement("sl-radio-group"),e.options&&e.options.forEach(u=>{const g=document.createElement("sl-radio");g.value=u.value,g.textContent=u.label,g.style.marginBottom="var(--sl-spacing-2x-small)",a.appendChild(g)}),setTimeout(()=>{a.value=r||""},0),a.addEventListener("sl-change",u=>this.handleFieldChange(u,t)),D.appendChild(a),D;case"number":a=document.createElement("sl-input"),a.type="text",a.inputMode="decimal",a.classList.add("text-right"),a.setAttribute("autocomplete","off"),a.addEventListener("sl-input",()=>{const u=a.value,g=u.replace(/[^0-9.,+\-*/^() ]/g,"");u!==g&&(a.value=g)}),r&&(a.value=this.formatNumber(r,e.roundTo)),a.addEventListener("sl-focus",()=>{a.value=a.value.replace(/\s/g,""),setTimeout(()=>a.select(),0)}),a.addEventListener("sl-blur",()=>{let u=a.value;if(/[+\-*/^()]/.test(u)){const g=this.evaluateMathExpression(u);if(g===null){a.value="";return}u=g}a.value=this.formatNumber(u,e.roundTo)}),a.addEventListener("keydown",u=>{u.key==="Enter"&&a.dispatchEvent(new Event("sl-blur"))}),Object.defineProperty(a,"submitValue",{get:()=>{if(!a.value)return null;let u=a.value;if(/[+\-*/^()]/.test(u)){const P=this.evaluateMathExpression(u);P!==null&&(u=P)}const g=u.toString().replace(/\s/g,"").replace(",",".");if(g==="")return null;let m=parseFloat(g);return isNaN(m)?null:(e.roundTo!==void 0&&e.roundTo!==null&&e.roundTo!==""&&(m=this.roundNumber(m,e.roundTo)),m)}});break;case"date":a=document.createElement("sl-input"),a.type="text",a.classList.add("text-right"),a.classList.add("force-prefix-spacing"),a.setAttribute("autocomplete","off");const E=document.createElement("sl-icon");E.name="calendar3",E.slot="prefix",E.style.cursor="pointer",E.style.fontSize="var(--sl-font-size-large)",a.appendChild(E),a.value=r?this.formatDate(r):"",a.isoValue=r||null,a.addEventListener("sl-focus",()=>{setTimeout(()=>a.select(),0)}),setTimeout(()=>{const u=a.shadowRoot?a.shadowRoot.querySelector("input"):a;if(u){const g=z(u,{locale:rt.Czech,defaultDate:r,dateFormat:"d. m. Y",allowInput:!0,clickOpens:!1,onChange:(m,P)=>{if(a.value=P,m.length>0){const C=m[0],I=C.getFullYear(),j=String(C.getMonth()+1).padStart(2,"0"),R=String(C.getDate()).padStart(2,"0");a.isoValue=`${I}-${j}-${R}`}else a.isoValue=null;a.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(m,P)=>{const C=m.replace(/[^0-9]/g,"");if(C.length===8){const R=C.substring(0,2),J=C.substring(2,4),W=C.substring(4,8);return new Date(`${W}-${J}-${R}`)}if(C.length===4){const R=C.substring(0,2),J=C.substring(2,4),W=new Date().getFullYear();return new Date(`${W}-${J}-${R}`)}const I=m.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})$/);if(I)return new Date(`${I[3]}-${I[2]}-${I[1]}`);const j=m.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(j){const R=new Date().getFullYear();return new Date(`${R}-${j[2]}-${j[1]}`)}return z.parseDate(m,P)}});E.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),g.open()}),a.addEventListener("keydown",m=>{m.key==="Enter"&&g.setDate(a.value,!0,g.config.dateFormat)})}},0),Object.defineProperty(a,"submitValue",{get:()=>a.isoValue});break;case"datetime":a=document.createElement("sl-input"),a.type="text",a.classList.add("text-right"),a.classList.add("force-prefix-spacing"),a.setAttribute("autocomplete","off");const x=document.createElement("sl-icon");x.name="calendar3",x.slot="prefix",x.style.cursor="pointer",x.style.fontSize="var(--sl-font-size-large)",a.appendChild(x),a.value=r?this.formatDateTime(r):"",a.isoValue=r||null,a.addEventListener("sl-focus",()=>{setTimeout(()=>a.select(),0)}),setTimeout(()=>{const u=a.shadowRoot?a.shadowRoot.querySelector("input"):a;if(u){const g=z(u,{locale:rt.Czech,defaultDate:r,enableTime:!0,dateFormat:"d. m. Y H:i",time_24hr:!0,allowInput:!0,clickOpens:!1,onChange:(m,P)=>{if(a.value=P,m.length>0){const C=m[0],I=C.getFullYear(),j=String(C.getMonth()+1).padStart(2,"0"),R=String(C.getDate()).padStart(2,"0"),J=String(C.getHours()).padStart(2,"0"),W=String(C.getMinutes()).padStart(2,"0"),Y=String(C.getSeconds()).padStart(2,"0");a.isoValue=`${I}-${j}-${R}T${J}:${W}:${Y}`}else a.isoValue=null;a.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(m,P)=>{const C=m.replace(/[^0-9]/g,"");if(C.length>=8){const R=C.substring(0,2),J=C.substring(2,4),W=C.substring(4,8);let Y="00",B="00";return C.length>=10&&(Y=C.substring(8,10)),C.length>=12&&(B=C.substring(10,12)),new Date(`${W}-${J}-${R}T${Y}:${B}:00`)}const I=m.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})(?:\s+(\d{1,2})[:.](\d{1,2}))?$/);if(I){const R=I[1],J=I[2],W=I[3],Y=I[4]||"00",B=I[5]||"00";return new Date(`${W}-${J}-${R}T${Y}:${B}:00`)}const j=m.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(j){const R=new Date().getFullYear();return new Date(`${R}-${j[2]}-${j[1]}T00:00:00`)}return z.parseDate(m,P)}});x.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),g.open()}),a.addEventListener("keydown",m=>{m.key==="Enter"&&g.setDate(a.value,!0,g.config.dateFormat)})}},0),Object.defineProperty(a,"submitValue",{get:()=>a.isoValue});break;case"select":a=document.createElement("sl-select"),a.hoist=!0,a.label=e.label,e.multiple&&(a.multiple=!0,a.clearable=!0),e.options&&e.options.forEach(u=>{const g=document.createElement("sl-option");g.value=u.value,g.textContent=u.label,a.appendChild(g)});break;case"relationship":a=document.createElement("ts-relationship-picker"),a.setAttribute("target-entity",e.targetEntity||""),a.setAttribute("mode",e.mode||"single"),e.label&&!e.hideLabel&&a.setAttribute("label",e.label),e.displayFields&&a.setAttribute("display-fields",JSON.stringify(e.displayFields)),e.chipDisplayFields&&a.setAttribute("chip-display-fields",JSON.stringify(e.chipDisplayFields)),e.valueField&&a.setAttribute("value-field",e.valueField),e.options&&a.setAttribute("options",JSON.stringify(e.options)),r&&a.setAttribute("value",JSON.stringify(r));break;case"separator":return a=document.createElement("div"),a.className="form-separator",a.textContent=e.label||"",a;case"table":if(a=document.createElement("ts-table"),e.columns){const u=e.columns.map((m,P)=>({...m,key:m.field||m.key,title:m.header||m.title||m.label,visible:m.visible!==!1,order:m.order!==void 0?m.order:P}));a.setAttribute("column-definitions",JSON.stringify(u));const g=u.filter(m=>m.visible).map(m=>m.key).join(",");a.setAttribute("visible-columns",g)}["show-create-button","show-import-button","show-export-button","show-column-selector","enable-sorting","enable-filtering","enable-column-resizing","enable-column-reordering","enable-selection","enable-row-menu","enable-clickable-rows","enable-clickable-columns","enable-pagination"].forEach(u=>{const g=u.replace(/-([a-z])/g,m=>m[1].toUpperCase());e[g]!==void 0&&a.setAttribute(u,String(e[g]))}),["single-item-actions","multiple-items-actions","unhideable-columns","unshowable-columns","columns-required-for-import"].forEach(u=>{const g=u.replace(/-([a-z])/g,m=>m[1].toUpperCase());e[g]&&a.setAttribute(u,e[g])}),e.itemsPerPage&&a.setAttribute("items-per-page",e.itemsPerPage),e.itemsPerPageOptions&&a.setAttribute("items-per-page-options",e.itemsPerPageOptions),e.predefinedFilters&&a.setAttribute("predefined-filters",JSON.stringify(e.predefinedFilters)),e.settings&&a.setAttribute("settings",JSON.stringify(e.settings));const _=r||e.data;_&&a.setAttribute("table-data",JSON.stringify(_)),["create-new-record","selection-action-activated","do-import"].forEach(u=>{a.addEventListener(u,g=>{g.stopPropagation(),this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:u,originalDetail:g.detail},bubbles:!0,composed:!0}))})}),setTimeout(()=>{typeof a.run=="function"&&a.run()},0);break;default:a=document.createElement("sl-input"),a.type=e.type||"text",a.setAttribute("autocomplete","off"),a.value=r||""}return a.name=t,e.hideLabel||e.type!=="checkbox"&&e.type!=="radio"&&e.type!=="file"&&e.type!=="image"&&(a.label=e.label),e.required&&(a.required=!0),a.addEventListener("sl-change",d=>this.handleFieldChange(d,t)),a}handleFieldChange(t,e){const r=t.target;let a;r.submitValue!==void 0?a=r.submitValue:r.tagName==="SL-CHECKBOX"||r.tagName==="SL-SWITCH"?a=r.checked:r.tagName==="TS-FILE-UPLOAD"?a=t.detail.files:r.tagName==="TS-RELATIONSHIP-PICKER"||r.tagName==="TS-COMBOBOX"?a=t.detail.value:r.type==="file"?a=r.files:a=r.value,this.dispatchEvent(new CustomEvent("field-change",{detail:{field:e,value:a},bubbles:!0,composed:!0}))}showImportResults(t){const e=this.querySelector("ts-table");e&&typeof e.showImportResults=="function"?e.showImportResults(t):console.warn("Inner ts-table not found or does not support showImportResults")}evaluateMathExpression(t){try{let e=t.replace(/,/g,".");if(e=e.replace(/\^/g,"**"),/[^0-9.+\-*/^() ]/.test(e))return null;const r=new Function("return "+e)();return!isFinite(r)||isNaN(r)?null:r}catch{return null}}roundNumber(t,e){if(e==null||e==="")return t;const r=1/parseFloat(e);return Math.round(t*r)/r}formatNumber(t,e){if(t==null||t==="")return"";let r=parseFloat(t.toString().replace(/\s/g,"").replace(",","."));if(isNaN(r))return t;e!=null&&e!==""&&(r=this.roundNumber(r,e));let a={};if(e&&e<1){const d=-Math.floor(Math.log10(parseFloat(e)));a={minimumFractionDigits:d,maximumFractionDigits:d}}return r.toLocaleString("cs-CZ",a)}formatDate(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const r=e.getDate(),a=e.getMonth()+1,d=e.getFullYear();return`${r}. ${a}. ${d}`}catch{return t}}formatDateTime(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const r=e.getDate(),a=e.getMonth()+1,d=e.getFullYear(),p=String(e.getHours()).padStart(2,"0"),c=String(e.getMinutes()).padStart(2,"0");return`${r}. ${a}. ${d} ${p}:${c}`}catch{return t}}}customElements.define("ts-form-field",Kt);class Zt extends HTMLElement{constructor(){super(),this.formData={},this.validationErrors={},this.lastAction=null,this.buttons={},this.buttons={},this.buttons={},this.isInitialized=!1}static get observedAttributes(){return["layout","fields","errors","buttons","values","active-tab"]}attributeChangedCallback(t,e,r){e!==r&&(t==="active-tab"?this.switchTab(r):this.isInitialized&&this.requestRender())}run(){this.isInitialized=!0,this.render();const t=new Set;this.querySelectorAll("*").forEach(d=>{const p=d.tagName.toLowerCase();(p.startsWith("sl-")||p.startsWith("ts-"))&&t.add(p)});const r=Array.from(t).map(d=>customElements.whenDefined(d)),a=new Promise(d=>setTimeout(d,2e3));Promise.race([Promise.all(r),a]).then(()=>{const d=this.querySelector(".ts-form-container"),p=this.querySelector(".loader");d&&requestAnimationFrame(()=>{d.style.opacity="1",p&&p.classList.add("hidden")})}).catch(()=>{const d=this.querySelector(".ts-form-container"),p=this.querySelector(".loader");d&&(d.style.opacity="1",p&&p.classList.add("hidden"))})}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}switchTab(t){const e=this.querySelector("sl-tab-group");if(e){const r=`tab-${t}`;e.show(r)}}connectedCallback(){this.ensureStructure(),this.setupEventListeners()}ensureStructure(){if(this.querySelector(".ts-form-container"))return;const t=document.createElement("style");t.textContent=`
            ts-form {
                display: block;
                width: 100%;
                height: 100vh;
                --label-spacing: var(--sl-spacing-2x-small);
                position: relative; /* For loader positioning */
                font-family: var(--sl-font-sans);
            }
            .ts-form-container {
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                width: 100%;
                height: 100%;
            }
            .loader {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: var(--sl-color-neutral-0);
                z-index: 100;
                transition: opacity 0.3s ease-out;
            }
            .loader.hidden {
                opacity: 0;
                pointer-events: none;
            }
            .dot {
                width: 10px;
                height: 10px;
                margin: 0 5px;
                background-color: var(--sl-color-primary-600);
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
            }
            .dot:nth-child(1) { animation-delay: -0.32s; }
            .dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            form {
                display: grid;
                grid-template-rows: 1fr auto;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .form-actions {
                grid-row: 2;
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                background: var(--sl-color-neutral-0);
                padding: 1rem;
                border-top: 1px solid var(--sl-color-neutral-200);
                z-index: 10;
            }
            sl-tab-group {
                grid-row: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow: hidden;
            }
            sl-tab-group::part(base) {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            sl-tab-group::part(body) {
                flex: 1;
                overflow: hidden; /* Delegate scrolling to tab-content */
                display: flex;
                flex-direction: column;
            }
            sl-tab-panel {
                height: 100%;
                width: 100%;
                --padding: 0;
            }
            sl-tab-panel::part(base) {
                height: 100%;
                width: 100%;
                display: block; /* Ensure base part fills host */
            }
            .tab-content {
                padding: 1rem;
                max-width: 1200px;
                margin: 0 auto;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
                scrollbar-gutter: stable; /* Prevent layout shift when scrollbar appears */
            }
            .tab-content.full-height {
                padding: 0.5rem;
                max-width: none;
                overflow: hidden; /* Let table handle scrolling */
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }
            .tab-content.full-height .form-row {
                height: 100%;
                margin-bottom: 0;
                gap: 0; /* Remove gap for single item */
                min-height: 0; /* Allow shrinking */
            }
            .tab-content.full-height .form-col {
                height: 100%;
                min-height: 0;
            }
            .tab-content.full-height ts-form-field {
                height: 100%;
                display: block;
                min-height: 0;
            }
            .tab-content.full-height ts-form-field ts-table {
                height: 100%;
                width: 100%;
            }
            .form-row {
                display: grid;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            .form-col {
                min-width: 0; /* Critical: allows flex item to shrink below content size */
                overflow: visible; /* Changed from hidden to allow tooltips (slider) to show */
                padding: 4px; /* Prevent focus ring clipping */
            }
            .error-message {
                color: var(--sl-color-danger-500);
                font-size: var(--sl-font-size-small);
                margin-top: 0.25rem;
            }
            
            /* Increase label spacing */
            ts-form-field::part(form-control-label) {
                margin-bottom: var(--label-spacing);
            }

            /* invalid styles */
            .input-invalid {
                --sl-input-border-color: var(--sl-color-danger-600);
                --sl-input-border-color-hover: var(--sl-color-danger-600);
                --sl-input-border-color-focus: var(--sl-color-danger-600);
            }

            .input-invalid:focus-within {
                --sl-input-border-color: var(--sl-color-danger-600);
                --sl-input-focus-ring-color: var(--sl-color-danger-300);
            }

            .input-invalid sl-radio::part(label) {
                color: var(--sl-color-danger-700);
            }

            .input-invalid::part(form-control-label),
            .input-invalid::part(form-control-help-text),
            .input-invalid::part(label) {
                color: var(--sl-color-danger-700) !important;
            }

            .text-right::part(input) {
                text-align: right;
            }

            /* switch label when its container has .input-invalid */
            .input-invalid label {
                color: var(--sl-color-danger-700);
            }

            .input-invalid sl-switch::part(label) {
                color: var(--sl-color-danger-700);
            }

            .input-invalid sl-checkbox::part(label) {
                color: var(--sl-color-danger-700);
            }

            .input-invalid sl-checkbox::part(control) {
                outline: none;
            }

            /* ts-combobox error styling */
            ts-combobox.input-invalid sl-input::part(form-control-label) {
                color: var(--sl-color-danger-700) !important;
            }

            /* ts-file-upload error styling */
            .input-invalid .file-upload-label {
                color: var(--sl-color-danger-700) !important;
            }

            sl-tab.invalid::part(base) {
                color: var(--sl-color-danger-700);
            }

            sl-tab.invalid[active]::part(base) {
                color: var(--sl-color-danger-700);
            }

            sl-tab-group::part(nav) {
                background: var(--sl-color-neutral-0);
                z-index: 1;
                padding-left: 0;
                padding-right: 0;
            }
            .form-separator {
                display: flex;
                align-items: center;
                width: 100%;
                margin: 1.5rem 0 1rem 0;
                color: var(--sl-color-neutral-500);
                font-size: var(--sl-font-size-small);
                font-weight: var(--sl-font-weight-bold);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-family: var(--sl-font-sans);
            }
            .form-separator::after {
                content: '';
                flex: 1;
                height: 1px;
                background: var(--sl-color-neutral-200);
                margin-left: 1rem;
            }
            
            /* Process Group Styles */
            .process-group {
                display: flex;
                isolation: isolate;
            }
            
            .process-group sl-button {
                margin-left: -12px; /* Overlap */
                z-index: 1;
            }
            
            .process-group sl-button:hover,
            .process-group sl-button:focus-within,
            .process-group sl-button[data-variant="primary"],
            .process-group sl-button[data-variant="success"],
            .process-group sl-button[data-variant="warning"] {
                z-index: 10;
            }

            .process-group sl-button::part(base) {
                border-radius: 0;
                border: none;
                min-height: 40px;
                
                /* Shape: Cutout Left (Notch), Arrow Right */
                /* Polygon: Top-Left, Top-Right(indent), Right-Mid(point), Bottom-Right(indent), Bottom-Left, Left-Mid(indent/notch) */
                clip-path: polygon(
                    0 0, 
                    calc(100% - 12px) 0, 
                    100% 50%, 
                    calc(100% - 12px) 100%, 
                    0 100%, 
                    12px 50%
                );
                
                padding-left: 25px;
                padding-right: 25px;
                background-color: var(--sl-color-neutral-200);
                color: var(--sl-color-neutral-700);
                transition: background-color 0.2s, color 0.2s;
            }

            /* Colors - using !important to ensure override of default button styles if needed */
            .process-group sl-button[data-variant="primary"]::part(base) {
                background-color: var(--sl-color-primary-600) !important;
                color: var(--sl-color-neutral-0) !important;
            }
            
            .process-group sl-button[data-variant="success"]::part(base) {
                background-color: var(--sl-color-success-600) !important;
                color: var(--sl-color-neutral-0) !important;
            }
            
            .process-group sl-button[data-variant="warning"]::part(base) {
                background-color: var(--sl-color-warning-600) !important;
                color: var(--sl-color-neutral-0) !important;
            }

            /* First button: Also Notched Left (as requested) */
            .process-group sl-button:first-child {
                margin-left: 0;
            }
            
            .process-group sl-button:first-child::part(base) {
                /* Same notched shape as others */
                clip-path: polygon(
                    0 0, 
                    calc(100% - 12px) 0, 
                    100% 50%, 
                    calc(100% - 12px) 100%, 
                    0 100%, 
                    12px 50%
                );
                padding-left: 25px; /* Consistent padding */
                padding-right: 25px;
            }

            /* Flatpickr Overrides */
            .flatpickr-calendar {
                font-family: var(--sl-font-sans) !important;
            }
        `,this.appendChild(t);const e=document.createElement("div");e.className="loader",e.innerHTML=`
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `,this.appendChild(e);const r=document.createElement("div");r.className="ts-form-container",this.appendChild(r)}setupEventListeners(){this.addEventListener("field-change",t=>{t.stopPropagation();const{field:e,value:r}=t.detail;this.formData[e]=r,this.dispatchEvent(new CustomEvent("form-changed",{detail:{field:e,value:r,formData:this.formData},bubbles:!0,composed:!0}))}),this.addEventListener("form-field-action",t=>{}),this.addEventListener("form-table-action",t=>{})}showImportResults(t,e){const r=this.querySelector(`ts-form-field[field-name="${t}"]`);r&&typeof r.showImportResults=="function"?r.showImportResults(e):console.warn(`Field ${t} not found or does not support showImportResults`)}render(){const t=this.getAttribute("layout"),e=this.getAttribute("fields"),r=this.getAttribute("errors"),a=this.getAttribute("buttons"),d=this.getAttribute("values");if(!(!t||!e))try{const p=JSON.parse(t),c=JSON.parse(e);this.fieldsConfig=c;const h=r?JSON.parse(r):{},A=a?JSON.parse(a):[],v=d?JSON.parse(d):{};this.formData={...this.formData,...v},this.ensureStructure();const D=this.querySelector(".ts-form-container");D.innerHTML="";const E=document.createElement("form");if(E.noValidate=!0,p.tabs){const u=document.createElement("sl-tab-group");let g=!1;if(p.tabs.forEach((m,P)=>{const C=document.createElement("sl-tab");C.slot="nav",C.panel=`tab-${P}`,C.textContent=m.label;const I=this.getAttribute("active-tab");I!==null?parseInt(I)===P&&(C.active=!0):P===0&&(C.active=!0),m.rows.some(Y=>Y.some(B=>h[B.field]))&&(C.classList.add("invalid"),g=!0);const R=document.createElement("sl-tab-panel");R.name=`tab-${P}`,I!==null?parseInt(I)===P&&(R.active=!0):P===0&&(R.active=!0);let J=!1;if(m.rows&&m.rows.length===1&&m.rows[0].length===1){const Y=m.rows[0][0].field;c[Y]&&c[Y].type==="table"&&(J=!0)}const W=document.createElement("div");W.className="tab-content",J&&W.classList.add("full-height"),m.rows&&m.rows.forEach(Y=>{const B=document.createElement("div");B.className="form-row",B.style.gridTemplateColumns=Y.map($=>$.width||"1fr").join(" "),Y.forEach($=>{const ee=document.createElement("div");if(ee.className="form-col",$.align&&(ee.style.display="flex",ee.style.justifyContent=$.align==="right"?"flex-end":$.align==="center"?"center":"flex-start"),$.type==="empty"){B.appendChild(ee);return}if($.type==="separator"){const X=document.createElement("ts-form-field");X.setAttribute("config",JSON.stringify({type:"separator",label:$.label})),X.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),ee.appendChild(X),B.appendChild(ee);return}const he=c[$.field];if(he){const X=document.createElement("ts-form-field");X.setAttribute("config",JSON.stringify(he)),X.setAttribute("field-name",$.field);const ae=this.formData[$.field];ae!=null&&(typeof ae=="object"?X.setAttribute("value",JSON.stringify(ae)):X.setAttribute("value",ae)),h[$.field]&&X.setAttribute("error",h[$.field]),ee.appendChild(X)}B.appendChild(ee)}),W.appendChild(B)}),R.appendChild(W),u.appendChild(C),u.appendChild(R)}),g){u.classList.add("invalid");const m=()=>{const P=u.querySelector("sl-tab[active]");P&&P.classList.contains("invalid")?u.style.setProperty("--indicator-color","var(--sl-color-danger-600)"):u.style.setProperty("--indicator-color","var(--sl-color-primary-600)")};u.addEventListener("sl-tab-show",()=>setTimeout(m,0)),setTimeout(m,0)}E.appendChild(u)}else if(p.rows){const u=document.createElement("div");u.className="form-content-wrapper",u.style.padding="1rem",u.style.overflow="auto",u.style.scrollbarGutter="stable",u.style.overflow="auto",u.style.scrollbarGutter="stable",this.renderRows(p.rows,c,h,u),E.appendChild(u)}const x=document.createElement("div");x.className="form-actions";const H=document.createElement("div");H.style.display="flex",H.style.gap="0.5rem";const M=document.createElement("div");M.style.display="flex",M.style.gap="0.5rem";const _=document.createElement("div");_.style.display="flex",_.style.gap="0.5rem",x.appendChild(H),x.appendChild(M),x.appendChild(_);let O=!1;if(a)JSON.parse(a).forEach(g=>{g.hidden||(O=!0);const m=document.createElement("sl-button");m.variant=g.variant||"primary",m.textContent=g.label||g.action,m.type="button",g.disabled&&(m.disabled=!0),g.hidden&&(m.style.display="none"),m.addEventListener("click",()=>{this.lastAction=g.action,g.confirmation?this.showConfirmationDialog(g.confirmation,()=>{this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:g.action},bubbles:!0,composed:!0}))}):this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:g.action},bubbles:!0,composed:!0}))}),this.buttons[g.action]=m;const P=g.position||"right";P==="left"?H.appendChild(m):P==="center"?M.appendChild(m):_.appendChild(m)});else{O=!0;const u=document.createElement("sl-button");u.variant="primary",u.textContent="Submit",u.type="button",u.addEventListener("click",()=>{this.lastAction="submit",this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:"submit"},bubbles:!0,composed:!0}))}),this.buttons.submit=u,_.appendChild(u)}O||(x.style.display="none"),E.addEventListener("submit",this.handleSubmit.bind(this)),E.appendChild(x),D.appendChild(E)}catch(p){console.error("Failed to parse form configuration:",p),this.innerHTML="<p>Error: Invalid form configuration.</p>"}}renderRows(t,e,r,a){t.forEach(d=>{const p=document.createElement("div");p.className="form-row",p.style.gridTemplateColumns=d.map(c=>c.width||"1fr").join(" "),d.forEach(c=>{const h=document.createElement("div");if(h.className="form-col",c.align&&(h.style.display="flex",h.style.justifyContent=c.align==="right"?"flex-end":c.align==="center"?"center":"flex-start"),c.type==="empty"){p.appendChild(h);return}if(c.type==="separator"){const v=document.createElement("ts-form-field");v.setAttribute("config",JSON.stringify({type:"separator",label:c.label})),v.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),h.appendChild(v),p.appendChild(h);return}const A=e[c.field];if(A){const v=document.createElement("div"),D=document.createElement("ts-form-field");D.setAttribute("field-name",c.field),D.setAttribute("config",JSON.stringify(A));const E=this.formData[c.field];E!=null&&(typeof E=="object"?D.setAttribute("value",JSON.stringify(E)):D.setAttribute("value",E));const x=r[c.field];x&&D.setAttribute("error",x),v.appendChild(D),p.appendChild(v)}}),a.appendChild(p)})}getSubmissionData(){const t={...this.formData};return this.fieldsConfig&&Object.keys(this.fieldsConfig).forEach(e=>{this.fieldsConfig[e].excludeFromSubmit&&delete t[e]}),t}handleSubmit(t){t.preventDefault()}disableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!0)}enableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!1)}hideButton(t){this.buttons[t]&&(this.buttons[t].style.display="none")}showButton(t){this.buttons[t]&&(this.buttons[t].style.display="")}showConfirmationDialog(t,e){const r=document.createElement("sl-dialog");r.label=t.title||"Confirm",r.open=!0,r.size="medium",r.style.fontFamily="var(--sl-font-sans)";const a=document.createElement("div");a.textContent=t.text||"Are you sure?",r.appendChild(a);const d=document.createElement("div");d.slot="footer",d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center";const p=document.createElement("div");p.style.display="flex",p.style.gap="0.5rem";const c=document.createElement("div");c.style.display="flex",c.style.gap="0.5rem";const h=document.createElement("div");h.style.display="flex",h.style.gap="0.5rem",d.appendChild(p),d.appendChild(c),d.appendChild(h),t.buttons.forEach(A=>{const v=document.createElement("sl-button");v.variant=A.variant||"primary",v.textContent=A.label||A.action,v.addEventListener("click",()=>{r.hide(),A.confirm&&e()});const D=A.position||"right";D==="left"?p.appendChild(v):D==="center"?c.appendChild(v):h.appendChild(v)}),r.appendChild(d),document.body.appendChild(r)}}customElements.define("ts-form",Zt);const{action:ot}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"TSWebUI/TSForm",parameters:{layout:"fullscreen"},render:o=>{const t=o.dark?"dark":"light";let e=zt.replace(/\{\{theme\}\}/g,t);const r=`form-${Math.random().toString(36).substr(2,9)}`,a=/<ts-form([^>]*)>/;if(e.match(a)){const p=[`layout='${o.layout}'`,`fields='${o.fields}'`,`errors='${o.errors}'`,`buttons='${o.buttons}'`,`values='${o.values}'`].join(" ");e=e.replace(a,`<ts-form id="${r}" ${p}>`)}return setTimeout(()=>{const p=document.getElementById(r);if(p){customElements.whenDefined("ts-form").then(()=>{p.run()});for(const c of["form-changed","form-submit","form-field-action"])p.removeEventListener(c,ot(c)),p.addEventListener(c,h=>{ot(c)(h.detail)})}},0),e},argTypes:{dark:{control:"boolean",description:"Dark theme mode"},layout:{control:"text",description:"Form layout configuration (JSON object)"},fields:{control:"text",description:"Form fields configuration (JSON object)"},errors:{control:"text",description:"Form validation errors (JSON object)"},values:{control:"text",description:"Initial form values (JSON object)"},buttons:{control:"text",description:"Form buttons configuration (JSON array of objects: [{action, variant, label, disabled?, hidden?, position?, confirmation?}])"}}},oe={dark:!1,buttons:"[]",layout:`{
        "tabs": [
            {
                "label": "User Info",
                "rows": [
                    [{"field": "name", "width": "1fr"}],
                    [{"field": "password", "width": "1fr"}],
                    [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                    [{"field": "combobox", "width": "1fr"}],
                    [{"field": "newsletter", "width": "1fr"}, {"field": "enableFeature", "width": "1fr"}],
                    [{"field": "volume", "width": "2fr"}],
                    [{"field": "invoiceStatus", "width": "1fr"}],
                    [{"field": "testButton", "width": "1fr"}],
                    [{"field": "bio", "width": "2fr"}],
                    [{"field": "uploadImage", "width": "1fr"}],
                    [{"field": "extraField", "width": "1fr"}]
                ]
            }
        ]
    }`,fields:`{
        "name": {"type": "text", "label": "Name", "required": true},

        "password": {"type": "password", "label": "Password"},
        "userType": {
            "type": "radio",
            "label": "User Type",
            "options": [
                {"value": "admin", "label": "Admin"},
                {"value": "user", "label": "User"}
            ]
        },
        "preferences": {
            "type": "select",
            "label": "Preferences",
            "options": [
                {"value": "option1", "label": "Option 1"},
                {"value": "option2", "label": "Option 2"}
            ]
        },
        "combobox": {
            "type": "combobox",
            "label": "Combobox",
            "options": [
                {"value": "item1", "label": "Item 1"},
                {"value": "item2", "label": "Item 2"},
                {"value": "item3", "label": "Item 3"}
            ]
        },
        "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
        "enableFeature": {"type": "switch", "label": "Enable Feature"},
        "volume": {"type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1},
        "invoiceStatus": {"type": "button-group", "options": ["active/true/primary/Aktivní", "inactive/false/default/Neaktivní", "paid/true/default/Zaplaceno"]},
        "testButton": {"type": "button", "label": "Test Button", "variant": "primary", "action": "test"},
        "bio": {"type": "textarea", "label": "Bio"},
        "extraField": {"type": "text", "label": "Extra Field"},
        "uploadImage": {"type": "image", "label": "Nahrát obrázky", "multiple": true}
    }`,errors:"{}",values:"{}"},De={args:{...oe}},Ee={args:{layout:`{
            "rows": [
                [{"field": "name", "width": "1fr"}],
                [{"field": "password", "width": "1fr"}],
                [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                [{"field": "combobox", "width": "1fr"}],
                [{"field": "newsletter", "width": "1fr"}, {"field": "enableFeature", "width": "1fr"}],
                [{"field": "volume", "width": "2fr"}],
                [{"field": "invoiceStatus", "width": "1fr"}],
                [{"field": "bio", "width": "2fr"}],
                [{"field": "age", "width": "1fr"}],
                [{"field": "startDate", "width": "1fr"}, {"field": "meetingTime", "width": "1fr"}],
                [{"field": "department", "width": "1fr"}, {"field": "projects", "width": "1fr"}],
                [{"field": "uploadFile", "width": "1fr"}, {"field": "uploadImage", "width": "1fr"}]
            ]
        }`,fields:`{
            "name": {"type": "text", "label": "Name", "required": true},

            "password": {"type": "password", "label": "Password"},
            "userType": {
                "type": "radio",
                "label": "User Type",
                "options": [
                    {"value": "admin", "label": "Admin"},
                    {"value": "user", "label": "User"}
                ]
            },
            "preferences": {
                "type": "select",
                "label": "Preferences",
                "options": [
                    {"value": "option1", "label": "Option 1"},
                    {"value": "option2", "label": "Option 2"}
                ]
            },
            "combobox": {
                "type": "combobox",
                "label": "Combobox",
                "options": [
                    {"value": "item1", "label": "Item 1"},
                    {"value": "item2", "label": "Item 2"}
                ]
            },
            "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
            "enableFeature": {"type": "switch", "label": "Enable Feature"},
            "volume": {"type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1},
            "invoiceStatus": {"type": "button-group", "label": "Invoice Status", "options": ["active/true/primary/Aktivní", "inactive/false/default/Neaktivní"]},
            "bio": {"type": "textarea", "label": "Bio"},
            "age": {"type": "number", "label": "Age"},

            "startDate": {"type": "date", "label": "Start Date"},
            "meetingTime": {"type": "datetime", "label": "Meeting Time"},
            "department": {
                "label": "Department (N:1)",
                "type": "relationship",
                "targetEntity": "department",
                "mode": "single",
                "displayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 1, "name": "IT" },
                    { "id": 2, "name": "HR" }
                ]
            },
            "projects": {
                "label": "Projects (M:N)",
                "type": "relationship",
                "targetEntity": "project",
                "mode": "multiple",
                "displayFields": ["name"],
                "chipDisplayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 101, "name": "Project A" },
                    { "id": 102, "name": "Project B" }
                ]
            },
            "uploadFile": {"type": "file", "label": "Nahrát soubor"},
            "uploadImage": {"type": "image", "label": "Nahrát obrázky", "multiple": true}
        }`,errors:`{
            "name": "Name is required.",
            "password": "Password is required.",

            "userType": "Please select a user type.",
            "preferences": "Please select a preference.",
            "combobox": "Please select an option.",
            "newsletter": "You must subscribe to the newsletter.",
            "enableFeature": "Feature must be enabled.",
            "volume": "Volume must be set.",
            "invoiceStatus": "Please select invoice status.",
            "bio": "Bio is required.",
            "age": "Age must be valid.",

            "startDate": "Date is required.",
            "meetingTime": "Time is required.",
            "department": "Department is required.",
            "projects": "At least one project is required.",
            "uploadFile": "File is required.",
            "uploadImage": "Image is required."
        }`,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]',values:"{}"}},Se={args:{...oe,buttons:'[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'}},Me={args:{...oe,buttons:'[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'}},Fe={args:{...oe,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'}},Ie={args:{...oe,values:`{
            "name": "John Doe",
            "email": "john@example.com",
            "password": "secret123",
            "userType": "user",
            "preferences": "option1",
            "combobox": "item2",
            "newsletter": true,
            "enableFeature": true,
            "volume": 75,
            "invoiceStatus": "active",
            "bio": "Some bio text",
            "extraField": "Extra value"
        }`}},Ae={args:{...oe,layout:JSON.stringify({tabs:[{label:"Osobní údaje",rows:[[{field:"name"},{field:"surname"}],[{field:"birthdate"}]]},{label:"Účet",rows:[[{field:"username"},{field:"password"}],[{field:"role"},{field:"active"}],[{field:"department"}]]},{label:"Detaily",rows:[[{field:"bio"}],[{field:"avatar"},{field:"resume"}]]},{label:"Nastavení",rows:[[{field:"notifications"}],[{field:"theme"}],[{field:"projects"}]]},{label:"Tabulka",rows:[[{field:"history"}]]},{label:"Další prvky",rows:[[{field:"section1"}],[{field:"terms",width:"1fr"},{field:"satisfaction",width:"2fr"}],[{field:"country"},{field:"meetingTime"},{field:"startDate"}],[{field:"section2"}],[{field:"age",width:"150px"}],[{field:"section3"}],[{type:"empty"},{field:"statusGroup",align:"right"}],[{field:"actionButton"}]]}]}),fields:JSON.stringify({name:{label:"Jméno",type:"text",required:!0},surname:{label:"Příjmení",type:"text",required:!0},username:{label:"Uživatelské jméno",type:"text",required:!0},password:{label:"Heslo",type:"password",required:!0},number:{label:"Number Input",type:"number"},currency:{label:"Currency (Round 0.01)",type:"number",roundTo:.01},role:{label:"Role",type:"select",options:[{value:"admin",label:"Administrátor"},{value:"manager",label:"Manažer"},{value:"user",label:"Uživatel"},{value:"guest",label:"Host"}]},active:{label:"Aktivní účet",type:"switch",labelPosition:"right"},birthdate:{label:"Datum narození",type:"date"},bio:{label:"Životopis",type:"textarea",hideLabel:!0,placeholder:"Životopis (bez labelu)"},avatar:{label:"Profilový obrázek",type:"image",multiple:!0},resume:{label:"Životopis (PDF)",type:"file",multiple:!0},notifications:{label:"Notifikace",type:"select",multiple:!0,options:[{value:"email",label:"E-mail"},{value:"sms",label:"SMS"},{value:"push",label:"Push notifikace"},{value:"slack",label:"Slack"}]},theme:{label:"Preferovaný vzhled",type:"radio",options:[{value:"light",label:"Světlý"},{value:"dark",label:"Tmavý"},{value:"auto",label:"Automaticky"}]},department:{label:"Oddělení (N:1)",type:"relationship",targetEntity:"department",mode:"single",displayFields:["name"],valueField:"id",options:[{id:1,name:"IT",code:"DEP-01"},{id:2,name:"HR",code:"DEP-02"},{id:3,name:"Sales",code:"DEP-03"},{id:4,name:"Marketing",code:"DEP-04"}]},projects:{label:"Projekty (M:N)",type:"relationship",targetEntity:"project",mode:"multiple",displayFields:["code","name"],chipDisplayFields:["name"],valueField:"id",options:[{id:101,name:"Website Redesign",code:"PRJ-WEB"},{id:102,name:"Mobile App",code:"PRJ-APP"},{id:103,name:"Cloud Migration",code:"PRJ-CLOUD"},{id:104,name:"Security Audit",code:"PRJ-SEC"},{id:105,name:"AI Integration",code:"PRJ-AI"},{id:106,name:"Database Optimization",code:"PRJ-DB"},{id:107,name:"API Restructuring",code:"PRJ-API"},{id:108,name:"Frontend Refactor",code:"PRJ-FE"},{id:109,name:"Backend Refactor",code:"PRJ-BE"},{id:110,name:"DevOps Pipeline",code:"PRJ-OPS"},{id:111,name:"User Testing",code:"PRJ-UX"},{id:112,name:"Market Research",code:"PRJ-MKT"},{id:113,name:"Legal Compliance",code:"PRJ-LEG"},{id:114,name:"GDPR Audit",code:"PRJ-GDPR"},{id:115,name:"Network Upgrade",code:"PRJ-NET"},{id:116,name:"Server Migration",code:"PRJ-SRV"},{id:117,name:"Client Onboarding",code:"PRJ-CLI"},{id:118,name:"Internal Training",code:"PRJ-TRN"},{id:119,name:"Documentation",code:"PRJ-DOC"},{id:120,name:"Legacy Retirement",code:"PRJ-OLD"}]},history:{label:"Historie aktivit",type:"table",showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,itemsPerPage:5,itemsPerPageOptions:[5,10,20],singleItemActions:"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat",multipleItemsActions:"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané",columns:[{field:"date",header:"Datum",type:"date",sortable:!0,filterable:!0,canBeCopied:!0,isClickable:!0,align:"right"},{field:"action",header:"Akce",type:"text",sortable:!0,filterable:!0,isClickable:!0},{field:"user",header:"Uživatel",type:"text",sortable:!0,filterable:!0}],data:[{id:1,date:"2023-01-01",action:"Login",user:"jnovak"},{id:2,date:"2023-01-02",action:"Update Profile",user:"jnovak"},{id:3,date:"2023-01-03",action:"Logout",user:"jnovak"},{id:4,date:"2023-01-04",action:"Login",user:"jnovak"},{id:5,date:"2023-01-05",action:"View Report",user:"jnovak"},{id:6,date:"2023-01-06",action:"Export Data",user:"jnovak"},{id:7,date:"2023-01-07",action:"Logout",user:"jnovak"}]},section1:{type:"separator",label:"Základní nastavení"},section2:{type:"separator",label:"Osobní údaje"},section3:{type:"separator",label:"Akce"},terms:{label:"Souhlasím s podmínkami",type:"checkbox"},satisfaction:{label:"Spokojenost",type:"slider",min:0,max:100,step:10},country:{label:"Země (Combobox)",type:"combobox",options:[{value:"cz",label:"Česká republika"},{value:"sk",label:"Slovensko"},{value:"de",label:"Německo"},{value:"pl",label:"Polsko"},{value:"at",label:"Rakousko"}]},startDate:{label:"Datum zahájení (Date only)",type:"date"},meetingTime:{label:"Čas schůzky",type:"datetime"},age:{label:"Věk",type:"number",min:0,max:120},statusGroup:{type:"button-group",variant:"process",label:"Status",options:["draft/true/default/Koncept","published/true/success/Publikováno","archived/true/warning/Archivováno"]},actionButton:{type:"button",label:"Provést akci",variant:"primary",action:"custom_action"}}),buttons:JSON.stringify([{action:"cancel",label:"Zrušit",variant:"default"},{action:"save",label:"Uložit",variant:"primary"}]),values:JSON.stringify({name:"Jan",surname:"Novák",username:"jnovak",password:"password123",role:"user",active:!1,birthdate:"1990-05-15",bio:"Zkušený vývojář se zaměřením na webové technologie.",theme:"dark",notifications:["email","push"],department:2,projects:[101,103],terms:!0,satisfaction:80,country:"cz",age:30,statusGroup:"published",meetingTime:"2023-11-15 14:30",startDate:"2023-01-01"})}},Pe={args:{...oe,layout:JSON.stringify({tabs:[{label:"Text Inputs",rows:[[{type:"separator",label:"Text Input"}],[{field:"text"}],[{type:"separator",label:"Textarea"}],[{field:"textarea"}]]},{label:"Numeric & Date",rows:[[{type:"separator",label:"Number Input"}],[{field:"number"}],[{type:"separator",label:"Currency (Round 0.01)"}],[{field:"currency"}],[{type:"separator",label:"Slider"}],[{field:"slider"}],[{type:"separator",label:"Date Picker"}],[{field:"date"}],[{type:"separator",label:"Datetime Picker"}],[{field:"datetime"}]]},{label:"Selects & Pickers",rows:[[{type:"separator",label:"Select"}],[{field:"select"}],[{type:"separator",label:"Multiselect"}],[{field:"multiselect"}],[{type:"separator",label:"Combobox"}],[{field:"combobox"}],[{field:"comboboxStrict"},{field:"comboboxCustom"}],[{type:"separator",label:"Relationship Picker (Single)"}],[{field:"relationshipSingle"}],[{type:"separator",label:"Relationship Picker (Multiple)"}],[{field:"relationshipMultiple"}]]},{label:"Toggles & Buttons",rows:[[{type:"separator",label:"Checkbox"}],[{field:"checkbox"}],[{type:"separator",label:"Switch"}],[{field:"switch"}],[{type:"separator",label:"Radio Group"}],[{field:"radio"}],[{type:"separator",label:"Button Group"}],[{field:"buttonGroup"}],[{type:"separator",label:"Button Field"}],[{field:"button"}]]},{label:"Files & Media",rows:[[{type:"separator",label:"File Upload"}],[{field:"file"}],[{type:"separator",label:"Image Upload"}],[{field:"image"}]]},{label:"Table",rows:[[{field:"table"}]]}]}),fields:JSON.stringify({text:{type:"text",label:"Text Field"},textarea:{type:"textarea",label:"Textarea Field",rows:3},number:{type:"number",label:"Number Field",min:0,max:100},currency:{type:"number",label:"Currency Field",roundTo:.01},slider:{type:"slider",label:"Slider Field",min:0,max:100,step:10},date:{type:"date",label:"Date Field"},datetime:{type:"datetime",label:"Datetime Field"},select:{type:"select",label:"Select Field",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},multiselect:{type:"select",label:"Multiselect Field",multiple:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},combobox:{type:"combobox",label:"Combobox Field (Allows Empty)",allowEmpty:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},comboboxStrict:{type:"combobox",label:"Strict Combobox (No Custom)",allowCustom:!1,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},comboboxCustom:{type:"combobox",label:"Custom Combobox (Allow Custom)",allowCustom:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},relationshipSingle:{type:"relationship",label:"Relationship (Single)",targetEntity:"entity",mode:"single",displayFields:["name"],valueField:"id",options:[{id:1,name:"Entity 1"},{id:2,name:"Entity 2"}]},relationshipMultiple:{type:"relationship",label:"Relationship (Multiple)",targetEntity:"entity",mode:"multiple",displayFields:["name"],chipDisplayFields:["name"],valueField:"id",options:[{id:1,name:"Entity 1"},{id:2,name:"Entity 2"}]},checkbox:{type:"checkbox",label:"Checkbox Field"},switch:{type:"switch",label:"Switch Field"},radio:{type:"radio",label:"Radio Field",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},buttonGroup:{type:"button-group",label:"Button Group",options:["1/true/default/Option 1","2/true/primary/Option 2"]},button:{type:"button",label:"Button Field",variant:"primary",action:"click"},file:{type:"file",label:"Nahrát soubor"},image:{type:"image",label:"Nahrát obrázky",multiple:!0},table:{label:"Example Table",type:"table",showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,itemsPerPage:5,itemsPerPageOptions:[5,10,20],singleItemActions:"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat",multipleItemsActions:"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané",columns:[{field:"id",header:"ID",type:"number",sortable:!0,filterable:!0,width:"80px"},{field:"name",header:"Name",type:"text",sortable:!0,filterable:!0},{field:"status",header:"Status",type:"text",sortable:!0,filterable:!0}],data:[{id:1,name:"Item 1",status:"Active"},{id:2,name:"Item 2",status:"Inactive"},{id:3,name:"Item 3",status:"Active"}]}}),values:"{}"}};De.parameters={...De.parameters,docs:{...De.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs
  }
}`,...De.parameters?.docs?.source}}};Ee.parameters={...Ee.parameters,docs:{...Ee.parameters?.docs,source:{originalSource:`{
  args: {
    layout: \`{
            "rows": [
                [{"field": "name", "width": "1fr"}],
                [{"field": "password", "width": "1fr"}],
                [{"field": "userType", "width": "1fr"}, {"field": "preferences", "width": "1fr"}],
                [{"field": "combobox", "width": "1fr"}],
                [{"field": "newsletter", "width": "1fr"}, {"field": "enableFeature", "width": "1fr"}],
                [{"field": "volume", "width": "2fr"}],
                [{"field": "invoiceStatus", "width": "1fr"}],
                [{"field": "bio", "width": "2fr"}],
                [{"field": "age", "width": "1fr"}],
                [{"field": "startDate", "width": "1fr"}, {"field": "meetingTime", "width": "1fr"}],
                [{"field": "department", "width": "1fr"}, {"field": "projects", "width": "1fr"}],
                [{"field": "uploadFile", "width": "1fr"}, {"field": "uploadImage", "width": "1fr"}]
            ]
        }\`,
    fields: \`{
            "name": {"type": "text", "label": "Name", "required": true},

            "password": {"type": "password", "label": "Password"},
            "userType": {
                "type": "radio",
                "label": "User Type",
                "options": [
                    {"value": "admin", "label": "Admin"},
                    {"value": "user", "label": "User"}
                ]
            },
            "preferences": {
                "type": "select",
                "label": "Preferences",
                "options": [
                    {"value": "option1", "label": "Option 1"},
                    {"value": "option2", "label": "Option 2"}
                ]
            },
            "combobox": {
                "type": "combobox",
                "label": "Combobox",
                "options": [
                    {"value": "item1", "label": "Item 1"},
                    {"value": "item2", "label": "Item 2"}
                ]
            },
            "newsletter": {"type": "checkbox", "label": "Subscribe to newsletter"},
            "enableFeature": {"type": "switch", "label": "Enable Feature"},
            "volume": {"type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1},
            "invoiceStatus": {"type": "button-group", "label": "Invoice Status", "options": ["active/true/primary/Aktivní", "inactive/false/default/Neaktivní"]},
            "bio": {"type": "textarea", "label": "Bio"},
            "age": {"type": "number", "label": "Age"},

            "startDate": {"type": "date", "label": "Start Date"},
            "meetingTime": {"type": "datetime", "label": "Meeting Time"},
            "department": {
                "label": "Department (N:1)",
                "type": "relationship",
                "targetEntity": "department",
                "mode": "single",
                "displayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 1, "name": "IT" },
                    { "id": 2, "name": "HR" }
                ]
            },
            "projects": {
                "label": "Projects (M:N)",
                "type": "relationship",
                "targetEntity": "project",
                "mode": "multiple",
                "displayFields": ["name"],
                "chipDisplayFields": ["name"],
                "valueField": "id",
                "options": [
                    { "id": 101, "name": "Project A" },
                    { "id": 102, "name": "Project B" }
                ]
            },
            "uploadFile": {"type": "file", "label": "Nahrát soubor"},
            "uploadImage": {"type": "image", "label": "Nahrát obrázky", "multiple": true}
        }\`,
    errors: \`{
            "name": "Name is required.",
            "password": "Password is required.",

            "userType": "Please select a user type.",
            "preferences": "Please select a preference.",
            "combobox": "Please select an option.",
            "newsletter": "You must subscribe to the newsletter.",
            "enableFeature": "Feature must be enabled.",
            "volume": "Volume must be set.",
            "invoiceStatus": "Please select invoice status.",
            "bio": "Bio is required.",
            "age": "Age must be valid.",

            "startDate": "Date is required.",
            "meetingTime": "Time is required.",
            "department": "Department is required.",
            "projects": "At least one project is required.",
            "uploadFile": "File is required.",
            "uploadImage": "Image is required."
        }\`,
    buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]',
    values: '{}'
  }
}`,...Ee.parameters?.docs?.source}}};Se.parameters={...Se.parameters,docs:{...Se.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'
  }
}`,...Se.parameters?.docs?.source}}};Me.parameters={...Me.parameters,docs:{...Me.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'
  }
}`,...Me.parameters?.docs?.source}}};Fe.parameters={...Fe.parameters,docs:{...Fe.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'
  }
}`,...Fe.parameters?.docs?.source}}};Ie.parameters={...Ie.parameters,docs:{...Ie.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    values: \`{
            "name": "John Doe",
            "email": "john@example.com",
            "password": "secret123",
            "userType": "user",
            "preferences": "option1",
            "combobox": "item2",
            "newsletter": true,
            "enableFeature": true,
            "volume": 75,
            "invoiceStatus": "active",
            "bio": "Some bio text",
            "extraField": "Extra value"
        }\`
  }
}`,...Ie.parameters?.docs?.source}}};Ae.parameters={...Ae.parameters,docs:{...Ae.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      tabs: [{
        label: 'Osobní údaje',
        rows: [[{
          field: 'name'
        }, {
          field: 'surname'
        }], [{
          field: 'birthdate'
        }]]
      }, {
        label: 'Účet',
        rows: [[{
          field: 'username'
        }, {
          field: 'password'
        }], [{
          field: 'role'
        }, {
          field: 'active'
        }], [{
          field: 'department'
        }]]
      }, {
        label: 'Detaily',
        rows: [[{
          field: 'bio'
        }], [{
          field: 'avatar'
        }, {
          field: 'resume'
        }]]
      }, {
        label: 'Nastavení',
        rows: [[{
          field: 'notifications'
        }], [{
          field: 'theme'
        }], [{
          field: 'projects'
        }]]
      }, {
        label: 'Tabulka',
        rows: [[{
          field: 'history'
        }]]
      }, {
        label: 'Další prvky',
        rows: [[{
          field: 'section1'
        }], [{
          field: 'terms',
          width: '1fr'
        }, {
          field: 'satisfaction',
          width: '2fr'
        }], [{
          field: 'country'
        }, {
          field: 'meetingTime'
        }, {
          field: 'startDate'
        }], [{
          field: 'section2'
        }], [{
          field: 'age',
          width: '150px'
        }], [{
          field: 'section3'
        }], [{
          type: 'empty'
        }, {
          field: 'statusGroup',
          align: 'right'
        }], [{
          field: 'actionButton'
        }]]
      }]
    }),
    fields: JSON.stringify({
      // Basic Info
      name: {
        label: 'Jméno',
        type: 'text',
        required: true
      },
      surname: {
        label: 'Příjmení',
        type: 'text',
        required: true
      },
      // Account Info
      username: {
        label: 'Uživatelské jméno',
        type: 'text',
        required: true
      },
      password: {
        label: 'Heslo',
        type: 'password',
        required: true
      },
      number: {
        label: 'Number Input',
        type: 'number'
      },
      currency: {
        label: 'Currency (Round 0.01)',
        type: 'number',
        roundTo: 0.01
      },
      role: {
        label: 'Role',
        type: 'select',
        options: [{
          value: 'admin',
          label: 'Administrátor'
        }, {
          value: 'manager',
          label: 'Manažer'
        }, {
          value: 'user',
          label: 'Uživatel'
        }, {
          value: 'guest',
          label: 'Host'
        }]
      },
      active: {
        label: 'Aktivní účet',
        type: 'switch',
        labelPosition: 'right'
      },
      // Details
      birthdate: {
        label: 'Datum narození',
        type: 'date'
      },
      bio: {
        label: 'Životopis',
        type: 'textarea',
        hideLabel: true,
        placeholder: 'Životopis (bez labelu)'
      },
      avatar: {
        label: 'Profilový obrázek',
        type: 'image',
        multiple: true
      },
      resume: {
        label: 'Životopis (PDF)',
        type: 'file',
        multiple: true
      },
      // Preferences
      notifications: {
        label: 'Notifikace',
        type: 'select',
        multiple: true,
        options: [{
          value: 'email',
          label: 'E-mail'
        }, {
          value: 'sms',
          label: 'SMS'
        }, {
          value: 'push',
          label: 'Push notifikace'
        }, {
          value: 'slack',
          label: 'Slack'
        }]
      },
      theme: {
        label: 'Preferovaný vzhled',
        type: 'radio',
        options: [{
          value: 'light',
          label: 'Světlý'
        }, {
          value: 'dark',
          label: 'Tmavý'
        }, {
          value: 'auto',
          label: 'Automaticky'
        }]
      },
      // Relationships
      department: {
        label: 'Oddělení (N:1)',
        type: 'relationship',
        targetEntity: 'department',
        mode: 'single',
        displayFields: ['name'],
        valueField: 'id',
        options: [{
          id: 1,
          name: 'IT',
          code: 'DEP-01'
        }, {
          id: 2,
          name: 'HR',
          code: 'DEP-02'
        }, {
          id: 3,
          name: 'Sales',
          code: 'DEP-03'
        }, {
          id: 4,
          name: 'Marketing',
          code: 'DEP-04'
        }]
      },
      projects: {
        label: 'Projekty (M:N)',
        type: 'relationship',
        targetEntity: 'project',
        mode: 'multiple',
        displayFields: ['code', 'name'],
        chipDisplayFields: ['name'],
        valueField: 'id',
        options: [{
          id: 101,
          name: 'Website Redesign',
          code: 'PRJ-WEB'
        }, {
          id: 102,
          name: 'Mobile App',
          code: 'PRJ-APP'
        }, {
          id: 103,
          name: 'Cloud Migration',
          code: 'PRJ-CLOUD'
        }, {
          id: 104,
          name: 'Security Audit',
          code: 'PRJ-SEC'
        }, {
          id: 105,
          name: 'AI Integration',
          code: 'PRJ-AI'
        }, {
          id: 106,
          name: 'Database Optimization',
          code: 'PRJ-DB'
        }, {
          id: 107,
          name: 'API Restructuring',
          code: 'PRJ-API'
        }, {
          id: 108,
          name: 'Frontend Refactor',
          code: 'PRJ-FE'
        }, {
          id: 109,
          name: 'Backend Refactor',
          code: 'PRJ-BE'
        }, {
          id: 110,
          name: 'DevOps Pipeline',
          code: 'PRJ-OPS'
        }, {
          id: 111,
          name: 'User Testing',
          code: 'PRJ-UX'
        }, {
          id: 112,
          name: 'Market Research',
          code: 'PRJ-MKT'
        }, {
          id: 113,
          name: 'Legal Compliance',
          code: 'PRJ-LEG'
        }, {
          id: 114,
          name: 'GDPR Audit',
          code: 'PRJ-GDPR'
        }, {
          id: 115,
          name: 'Network Upgrade',
          code: 'PRJ-NET'
        }, {
          id: 116,
          name: 'Server Migration',
          code: 'PRJ-SRV'
        }, {
          id: 117,
          name: 'Client Onboarding',
          code: 'PRJ-CLI'
        }, {
          id: 118,
          name: 'Internal Training',
          code: 'PRJ-TRN'
        }, {
          id: 119,
          name: 'Documentation',
          code: 'PRJ-DOC'
        }, {
          id: 120,
          name: 'Legacy Retirement',
          code: 'PRJ-OLD'
        }]
      },
      // History Table
      history: {
        label: 'Historie aktivit',
        type: 'table',
        // Table feature flags
        showCreateButton: true,
        showImportButton: true,
        showExportButton: true,
        showColumnSelector: true,
        enableSorting: true,
        enableFiltering: true,
        enableColumnResizing: true,
        enableColumnReordering: true,
        enableSelection: true,
        enableRowMenu: true,
        enableClickableRows: true,
        enableClickableColumns: true,
        enablePagination: true,
        itemsPerPage: 5,
        itemsPerPageOptions: [5, 10, 20],
        singleItemActions: 'view_details/Zobrazit detaily,edit/Upravit,delete/Smazat',
        multipleItemsActions: 'delete_selected/Smazat vybrané,export_selected/Exportovat vybrané',
        columns: [{
          field: 'date',
          header: 'Datum',
          type: 'date',
          sortable: true,
          filterable: true,
          canBeCopied: true,
          isClickable: true,
          align: 'right'
        }, {
          field: 'action',
          header: 'Akce',
          type: 'text',
          sortable: true,
          filterable: true,
          isClickable: true
        }, {
          field: 'user',
          header: 'Uživatel',
          type: 'text',
          sortable: true,
          filterable: true
        }],
        data: [{
          id: 1,
          date: '2023-01-01',
          action: 'Login',
          user: 'jnovak'
        }, {
          id: 2,
          date: '2023-01-02',
          action: 'Update Profile',
          user: 'jnovak'
        }, {
          id: 3,
          date: '2023-01-03',
          action: 'Logout',
          user: 'jnovak'
        }, {
          id: 4,
          date: '2023-01-04',
          action: 'Login',
          user: 'jnovak'
        }, {
          id: 5,
          date: '2023-01-05',
          action: 'View Report',
          user: 'jnovak'
        }, {
          id: 6,
          date: '2023-01-06',
          action: 'Export Data',
          user: 'jnovak'
        }, {
          id: 7,
          date: '2023-01-07',
          action: 'Logout',
          user: 'jnovak'
        }]
      },
      // Other Elements
      section1: {
        type: 'separator',
        label: 'Základní nastavení'
      },
      section2: {
        type: 'separator',
        label: 'Osobní údaje'
      },
      section3: {
        type: 'separator',
        label: 'Akce'
      },
      terms: {
        label: 'Souhlasím s podmínkami',
        type: 'checkbox'
      },
      satisfaction: {
        label: 'Spokojenost',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10
      },
      country: {
        label: 'Země (Combobox)',
        type: 'combobox',
        options: [{
          value: 'cz',
          label: 'Česká republika'
        }, {
          value: 'sk',
          label: 'Slovensko'
        }, {
          value: 'de',
          label: 'Německo'
        }, {
          value: 'pl',
          label: 'Polsko'
        }, {
          value: 'at',
          label: 'Rakousko'
        }]
      },
      startDate: {
        label: 'Datum zahájení (Date only)',
        type: 'date'
      },
      meetingTime: {
        label: 'Čas schůzky',
        type: 'datetime'
      },
      age: {
        label: 'Věk',
        type: 'number',
        min: 0,
        max: 120
      },
      statusGroup: {
        type: 'button-group',
        variant: 'process',
        label: 'Status',
        options: ['draft/true/default/Koncept', 'published/true/success/Publikováno', 'archived/true/warning/Archivováno']
      },
      actionButton: {
        type: 'button',
        label: 'Provést akci',
        variant: 'primary',
        action: 'custom_action'
      }
    }),
    buttons: JSON.stringify([{
      action: 'cancel',
      label: 'Zrušit',
      variant: 'default'
    }, {
      action: 'save',
      label: 'Uložit',
      variant: 'primary'
    }]),
    values: JSON.stringify({
      name: 'Jan',
      surname: 'Novák',
      username: 'jnovak',
      password: 'password123',
      role: 'user',
      active: false,
      birthdate: '1990-05-15',
      bio: 'Zkušený vývojář se zaměřením na webové technologie.',
      theme: 'dark',
      notifications: ['email', 'push'],
      department: 2,
      projects: [101, 103],
      terms: true,
      satisfaction: 80,
      country: 'cz',
      age: 30,
      statusGroup: 'published',
      meetingTime: '2023-11-15 14:30',
      startDate: '2023-01-01'
    })
  }
}`,...Ae.parameters?.docs?.source}}};Pe.parameters={...Pe.parameters,docs:{...Pe.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      tabs: [{
        label: 'Text Inputs',
        rows: [[{
          type: 'separator',
          label: 'Text Input'
        }], [{
          field: 'text'
        }], [{
          type: 'separator',
          label: 'Textarea'
        }], [{
          field: 'textarea'
        }]]
      }, {
        label: 'Numeric & Date',
        rows: [[{
          type: 'separator',
          label: 'Number Input'
        }], [{
          field: 'number'
        }], [{
          type: 'separator',
          label: 'Currency (Round 0.01)'
        }], [{
          field: 'currency'
        }], [{
          type: 'separator',
          label: 'Slider'
        }], [{
          field: 'slider'
        }], [{
          type: 'separator',
          label: 'Date Picker'
        }], [{
          field: 'date'
        }], [{
          type: 'separator',
          label: 'Datetime Picker'
        }], [{
          field: 'datetime'
        }]]
      }, {
        label: 'Selects & Pickers',
        rows: [[{
          type: 'separator',
          label: 'Select'
        }], [{
          field: 'select'
        }], [{
          type: 'separator',
          label: 'Multiselect'
        }], [{
          field: 'multiselect'
        }], [{
          type: 'separator',
          label: 'Combobox'
        }], [{
          field: 'combobox'
        }], [{
          field: 'comboboxStrict'
        }, {
          field: 'comboboxCustom'
        }], [{
          type: 'separator',
          label: 'Relationship Picker (Single)'
        }], [{
          field: 'relationshipSingle'
        }], [{
          type: 'separator',
          label: 'Relationship Picker (Multiple)'
        }], [{
          field: 'relationshipMultiple'
        }]]
      }, {
        label: 'Toggles & Buttons',
        rows: [[{
          type: 'separator',
          label: 'Checkbox'
        }], [{
          field: 'checkbox'
        }], [{
          type: 'separator',
          label: 'Switch'
        }], [{
          field: 'switch'
        }], [{
          type: 'separator',
          label: 'Radio Group'
        }], [{
          field: 'radio'
        }], [{
          type: 'separator',
          label: 'Button Group'
        }], [{
          field: 'buttonGroup'
        }], [{
          type: 'separator',
          label: 'Button Field'
        }], [{
          field: 'button'
        }]]
      }, {
        label: 'Files & Media',
        rows: [[{
          type: 'separator',
          label: 'File Upload'
        }], [{
          field: 'file'
        }], [{
          type: 'separator',
          label: 'Image Upload'
        }], [{
          field: 'image'
        }]]
      }, {
        label: 'Table',
        rows: [[{
          field: 'table'
        }]]
      }]
    }),
    fields: JSON.stringify({
      // Text Inputs
      text: {
        type: 'text',
        label: 'Text Field'
      },
      textarea: {
        type: 'textarea',
        label: 'Textarea Field',
        rows: 3
      },
      // Numeric & Date
      number: {
        type: 'number',
        label: 'Number Field',
        min: 0,
        max: 100
      },
      currency: {
        type: 'number',
        label: 'Currency Field',
        roundTo: 0.01
      },
      slider: {
        type: 'slider',
        label: 'Slider Field',
        min: 0,
        max: 100,
        step: 10
      },
      date: {
        type: 'date',
        label: 'Date Field'
      },
      datetime: {
        type: 'datetime',
        label: 'Datetime Field'
      },
      // Selects & Pickers
      select: {
        type: 'select',
        label: 'Select Field',
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      multiselect: {
        type: 'select',
        label: 'Multiselect Field',
        multiple: true,
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      combobox: {
        type: 'combobox',
        label: 'Combobox Field (Allows Empty)',
        allowEmpty: true,
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      comboboxStrict: {
        type: 'combobox',
        label: 'Strict Combobox (No Custom)',
        allowCustom: false,
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      comboboxCustom: {
        type: 'combobox',
        label: 'Custom Combobox (Allow Custom)',
        allowCustom: true,
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      relationshipSingle: {
        type: 'relationship',
        label: 'Relationship (Single)',
        targetEntity: 'entity',
        mode: 'single',
        displayFields: ['name'],
        valueField: 'id',
        options: [{
          id: 1,
          name: 'Entity 1'
        }, {
          id: 2,
          name: 'Entity 2'
        }]
      },
      relationshipMultiple: {
        type: 'relationship',
        label: 'Relationship (Multiple)',
        targetEntity: 'entity',
        mode: 'multiple',
        displayFields: ['name'],
        chipDisplayFields: ['name'],
        valueField: 'id',
        options: [{
          id: 1,
          name: 'Entity 1'
        }, {
          id: 2,
          name: 'Entity 2'
        }]
      },
      // Toggles & Buttons
      checkbox: {
        type: 'checkbox',
        label: 'Checkbox Field'
      },
      switch: {
        type: 'switch',
        label: 'Switch Field'
      },
      radio: {
        type: 'radio',
        label: 'Radio Field',
        options: [{
          value: '1',
          label: 'Option 1'
        }, {
          value: '2',
          label: 'Option 2'
        }]
      },
      buttonGroup: {
        type: 'button-group',
        label: 'Button Group',
        options: ['1/true/default/Option 1', '2/true/primary/Option 2']
      },
      button: {
        type: 'button',
        label: 'Button Field',
        variant: 'primary',
        action: 'click'
      },
      // Files & Media
      file: {
        type: 'file',
        label: 'Nahrát soubor'
      },
      image: {
        type: 'image',
        label: 'Nahrát obrázky',
        multiple: true
      },
      // Table
      table: {
        label: 'Example Table',
        type: 'table',
        showCreateButton: true,
        showImportButton: true,
        showExportButton: true,
        showColumnSelector: true,
        enableSorting: true,
        enableFiltering: true,
        enableColumnResizing: true,
        enableColumnReordering: true,
        enableSelection: true,
        enableRowMenu: true,
        enableClickableRows: true,
        enableClickableColumns: true,
        enablePagination: true,
        itemsPerPage: 5,
        itemsPerPageOptions: [5, 10, 20],
        singleItemActions: 'view_details/Zobrazit detaily,edit/Upravit,delete/Smazat',
        multipleItemsActions: 'delete_selected/Smazat vybrané,export_selected/Exportovat vybrané',
        columns: [{
          field: 'id',
          header: 'ID',
          type: 'number',
          sortable: true,
          filterable: true,
          width: '80px'
        }, {
          field: 'name',
          header: 'Name',
          type: 'text',
          sortable: true,
          filterable: true
        }, {
          field: 'status',
          header: 'Status',
          type: 'text',
          sortable: true,
          filterable: true
        }],
        data: [{
          id: 1,
          name: 'Item 1',
          status: 'Active'
        }, {
          id: 2,
          name: 'Item 2',
          status: 'Inactive'
        }, {
          id: 3,
          name: 'Item 3',
          status: 'Active'
        }]
      }
    }),
    values: '{}'
  }
}`,...Pe.parameters?.docs?.source}}};const en=["Default","WithErrors","WithButtons","WithDisabledAndHiddenButtons","WithConfirmation","WithValues","Complex","AllElements"];export{Pe as AllElements,Ae as Complex,De as Default,Se as WithButtons,Fe as WithConfirmation,Me as WithDisabledAndHiddenButtons,Ee as WithErrors,Ie as WithValues,en as __namedExportsOrder,Qt as default};
