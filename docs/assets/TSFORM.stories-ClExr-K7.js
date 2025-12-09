import"./ts-table-BYRwQNre.js";const On=`<style>
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
</div>`;class Ln extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.files=[],this.multiple=!1,this.accept="*",this.label="Nahrát soubory"}static get observedAttributes(){return["multiple","accept","label","value","error"]}attributeChangedCallback(t,e,a){t==="multiple"?this.multiple=a!==null&&a!=="false":t==="accept"?this.accept=a||"*":t==="label"?this.label=a:t==="value"||t==="error"&&(this.error=a,this.updateError()),this.hasRendered?t==="multiple"?this.updateUploadText():t==="label"&&this.render():this.render()}updateError(){this.errorContainer&&(this.errorContainer.textContent=this.error||"",this.errorContainer.style.display=this.error?"block":"none",this.error?this.classList.add("input-invalid"):this.classList.remove("input-invalid"))}connectedCallback(){this.render(),this.setupEventListeners(),this.updateError()}setupEventListeners(){this.addEventListener("dragover",t=>{t.preventDefault(),this.classList.add("drag-over")}),this.addEventListener("dragleave",t=>{t.preventDefault(),this.classList.remove("drag-over")}),this.addEventListener("drop",t=>{t.preventDefault(),this.classList.remove("drag-over"),t.dataTransfer.files&&t.dataTransfer.files.length>0&&this.handleFiles(t.dataTransfer.files)})}handleFiles(t){const e=Array.from(t);this.multiple?this.files=[...this.files,...e]:this.files=[e[0]],this.renderFileList(),this.dispatchChange()}removeFile(t){this.files.splice(t,1),this.renderFileList(),this.dispatchChange()}dispatchChange(){this.dispatchEvent(new CustomEvent("sl-change",{detail:{files:this.files},bubbles:!0,composed:!0}))}render(){if(this.hasRendered)return;this.hasRendered=!0,this.shadowRoot.innerHTML="";const t=document.createElement("style");t.textContent=`
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
        `,this.shadowRoot.appendChild(t);const e=document.createElement("div"),a=document.createElement("input");a.type="file",a.multiple=this.multiple,a.accept=this.accept,a.addEventListener("change",d=>{d.target.files.length>0&&this.handleFiles(d.target.files),a.value=""});const n=document.createElement("div");if(n.className="drop-zone",n.innerHTML=`
            <div class="upload-icon">
                <sl-icon name="cloud-upload"></sl-icon>
            </div>
            <div>${this.label}</div>
            <div class="upload-text" style="font-size: 0.8em; color: var(--sl-color-neutral-500); margin-top: 0.25rem;">
                ${this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání"}
            </div>
        `,n.addEventListener("click",()=>a.click()),this.label){const d=document.createElement("label");d.textContent=this.label,d.className="file-upload-label",d.setAttribute("part","label"),e.appendChild(d)}const o=document.createElement("div");o.className="error-message",this.errorContainer=o;const s=document.createElement("div");s.className="file-list",this.fileListContainer=s,e.appendChild(a),e.appendChild(n),e.appendChild(o),e.appendChild(s),this.shadowRoot.appendChild(e),this.updateError(),this.renderFileList()}renderFileList(){this.fileListContainer&&(this.fileListContainer.innerHTML="",this.files.forEach((t,e)=>{const a=document.createElement("div");a.className="file-item";const n=document.createElement("div");n.className="file-info";const o=document.createElement("sl-icon");o.name="file-earmark";const s=document.createElement("span");s.className="file-name",s.textContent=t.name;const d=document.createElement("span");d.style.color="var(--sl-color-neutral-500)",d.textContent=`(${(t.size/1024).toFixed(1)} KB)`,n.appendChild(o),n.appendChild(s),n.appendChild(d);const c=document.createElement("sl-icon-button");c.name="x",c.label="Odstranit",c.addEventListener("click",m=>{m.stopPropagation(),this.removeFile(e)}),a.appendChild(n),a.appendChild(c),this.fileListContainer.appendChild(a)}))}updateUploadText(){const t=this.shadowRoot.querySelector(".upload-text");t&&(t.textContent=this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání");const e=this.shadowRoot.querySelector('input[type="file"]');e&&(e.multiple=this.multiple)}}customElements.define("ts-file-upload",Ln);class Nn extends HTMLElement{constructor(){super(),this.selectedItems=[],this.availableItems=[],this.mode="single",this.targetEntity="",this.displayFields=[],this.chipDisplayFields=[],this.valueField="id",this.label=""}static get observedAttributes(){return["mode","target-entity","display-fields","chip-display-fields","value-field","value","label","options"]}attributeChangedCallback(t,e,a){if(e!==a){if(t==="mode"&&(this.mode=a),t==="target-entity"&&(this.targetEntity=a),t==="display-fields")try{this.displayFields=JSON.parse(a)}catch{this.displayFields=[a]}if(t==="chip-display-fields")try{this.chipDisplayFields=JSON.parse(a)}catch{this.chipDisplayFields=[a]}if(t==="value-field"&&(this.valueField=a),t==="label"&&(this.label=a,this.render()),t==="options")try{this.availableItems=JSON.parse(a),this.updateSelectedFromValue()}catch(n){console.error("Failed to parse options for relationship picker:",n),this.availableItems=[]}t==="value"&&this.updateSelectedFromValue()}}updateSelectedFromValue(){const t=this.getAttribute("value");if(!t)return;let e;try{e=JSON.parse(t)}catch{e=t}if(this.mode==="single"){const a=this.availableItems.find(n=>n[this.valueField]==e);a&&(this.selectedItems=[a])}else Array.isArray(e)&&(this.selectedItems=this.availableItems.filter(a=>e.includes(a[this.valueField])));this.renderSelectedItems()}connectedCallback(){this.render(),this.resizeObserver=new ResizeObserver(()=>{this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{this.updateVisibleChips()},10)}),this.selectedContainer&&this.resizeObserver.observe(this.selectedContainer)}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.disconnect()}render(){this.innerHTML="";const t=document.createElement("style");t.textContent=`
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
        `,this.appendChild(t);const e=document.createElement("div");if(e.className="picker-container",this.label){const n=document.createElement("label");n.className="label",n.textContent=this.label,e.appendChild(n)}const a=document.createElement("div");a.className="selected-items",a.addEventListener("click",n=>{n.target.closest("sl-tag")||n.target.closest(".clear-icon")||this.openDialog()}),this.selectedContainer=a,this.renderSelectedItems(),e.appendChild(a),this.appendChild(e),this.resizeObserver&&this.resizeObserver.observe(this.selectedContainer)}renderSelectedItems(){if(this.selectedContainer.innerHTML="",this.selectedContainer.classList.remove("empty"),this.selectedItems.length===0){const a=document.createElement("span");a.textContent="Žádné položky nevybrány",a.style.color="var(--sl-input-placeholder-color)",this.selectedContainer.appendChild(a),this.selectedContainer.classList.add("empty")}else this.selectedItems.forEach(a=>{const n=document.createElement("sl-tag");n.variant="primary",n.removable=!0,n.size="medium";const s=(this.chipDisplayFields&&this.chipDisplayFields.length>0?this.chipDisplayFields:this.displayFields.slice(0,1)).map(d=>a[d]).join(" - ");n.textContent=s,n.addEventListener("sl-remove",d=>{d.stopPropagation(),this.removeItem(a)}),this.selectedContainer.appendChild(n)});const t=document.createElement("div");if(t.className="picker-controls",this.selectedItems.length>0){const a=document.createElement("sl-icon");a.name="x-circle-fill",a.className="picker-icon clear-icon",a.addEventListener("click",n=>{n.stopPropagation(),this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange()}),t.appendChild(a)}const e=document.createElement("sl-icon");e.name="chevron-down",e.className="picker-icon",t.appendChild(e),this.selectedContainer.appendChild(t),this.selectedItems.length>0&&customElements.whenDefined("sl-tag").then(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.updateVisibleChips()})})})}updateVisibleChips(){if(!this.selectedContainer||this.selectedItems.length===0)return;const t=Array.from(this.selectedContainer.querySelectorAll("sl-tag:not(.summary-tag)")),e=this.selectedContainer.querySelector(".summary-tag");if(e&&e.remove(),t.forEach(O=>O.style.display=""),t.length===0)return;const a=window.getComputedStyle(this.selectedContainer),n=parseFloat(a.paddingLeft),o=parseFloat(a.paddingRight),s=a.gap||"8px",d=parseFloat(s)||8,c=this.selectedContainer.querySelector(".picker-controls");let m=0;c&&(m=c.getBoundingClientRect().width);let f=this.selectedContainer.clientWidth-n-o-2;m>0&&(f-=m+d);let v=0;const g=t.map(O=>{const A=Math.ceil(O.getBoundingClientRect().width);return v+=A+d,A});if(v-=d,v<=f)return;const x=document.createElement("sl-tag");x.className="summary-tag",x.variant="neutral",x.size="medium",x.style.cursor="pointer",x.style.flexShrink="0",x.textContent=`A další, celkem (${t.length})`,x.style.visibility="hidden",x.style.position="absolute",this.selectedContainer.appendChild(x);let M=Math.ceil(x.getBoundingClientRect().width);if(M<20){const A=document.createElement("canvas").getContext("2d"),N=window.getComputedStyle(this.selectedContainer);A.font=N.font;const h=A.measureText(x.textContent).width;M=Math.ceil(h)+32}else M+=4;x.remove(),x.style.visibility="",x.style.position="",x.addEventListener("click",O=>{O.stopPropagation(),this.openDialog()});let E=M+d,B=0;for(let O=0;O<g.length&&E+g[O]<=f;O++)E+=g[O]+d,B++;for(let O=0;O<t.length;O++)t[O].style.display=O<B?"":"none";if(B<t.length)if(B>0){const O=t[B-1];O.nextSibling?this.selectedContainer.insertBefore(x,O.nextSibling):this.selectedContainer.appendChild(x)}else this.selectedContainer.insertBefore(x,this.selectedContainer.firstChild)}removeItem(t){this.selectedItems=this.selectedItems.filter(e=>e[this.valueField]!==t[this.valueField]),this.renderSelectedItems(),this.dispatchChange()}addItem(t){this.mode==="single"?this.selectedItems=[t]:this.selectedItems.find(e=>e[this.valueField]===t[this.valueField])||this.selectedItems.push(t),this.renderSelectedItems(),this.dispatchChange()}dispatchChange(){const t=this.mode==="single"?this.selectedItems[0]?this.selectedItems[0][this.valueField]:null:this.selectedItems.map(e=>e[this.valueField]);this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:t,items:this.selectedItems},bubbles:!0,composed:!0}))}openDialog(){const t=document.createElement("sl-dialog");t.label=`Vybrat ${this.targetEntity}`,t.style.setProperty("--width","600px"),t.style.fontFamily="var(--sl-font-sans)";const e=document.createElement("div"),a=document.createElement("sl-input");a.placeholder="Hledat...",a.clearable=!0,a.addEventListener("sl-input",d=>this.filterResults(d.target.value,n,t));const n=document.createElement("div");n.className="search-results",e.appendChild(a),e.appendChild(n),t.appendChild(e);const o=document.createElement("div");o.slot="footer",o.style.display="flex",o.style.justifyContent="flex-end",o.style.alignItems="center",o.style.width="100%";const s=document.createElement("sl-button");s.textContent="Zavřít",s.addEventListener("click",()=>t.hide()),o.appendChild(s),t.appendChild(o),document.body.appendChild(t),this.filterResults("",n,t),requestAnimationFrame(()=>{t.open=!0}),t.addEventListener("sl-after-show",()=>{a.focus()}),t.addEventListener("sl-after-hide",()=>t.remove())}filterResults(t,e,a){e.innerHTML="";const n=t.toLowerCase(),o=this.availableItems.filter(d=>this.displayFields.some(c=>String(d[c]).toLowerCase().includes(n)));if(o.length===0){e.innerHTML='<div style="text-align: center; color: var(--sl-color-neutral-500); padding: 1rem;">Žádné výsledky</div>';return}const s=document.createElement("table");s.className="results-table",s.style.fontFamily="var(--sl-font-sans)",s.style.width="100%",s.style.borderCollapse="collapse",s.style.fontSize="var(--sl-font-size-small)",o.forEach(d=>{const c=document.createElement("tr"),m=this.selectedItems.some(g=>g[this.valueField]===d[this.valueField]);m&&c.classList.add("selected"),this.displayFields.forEach((g,x)=>{const M=document.createElement("td");M.textContent=d[g],x<this.displayFields.length-1&&(M.style.width="1%",M.style.whiteSpace="nowrap"),c.appendChild(M)});const f=document.createElement("td");f.className="icon-cell";const v=document.createElement("sl-icon");v.name=m?"check-circle-fill":"circle",v.style.color=m?"var(--sl-color-success-500)":"var(--sl-color-neutral-400)",f.appendChild(v),c.appendChild(f),c.addEventListener("click",()=>{this.mode==="single"?this.selectedItems.some(x=>x[this.valueField]===d[this.valueField])?(this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange(),a&&a.hide()):(this.addItem(d),a&&a.hide()):this.selectedItems.some(x=>x[this.valueField]===d[this.valueField])?(this.removeItem(d),c.classList.remove("selected"),v.name="circle",v.style.color="var(--sl-color-neutral-400)"):(this.addItem(d),c.classList.add("selected"),v.name="check-circle-fill",v.style.color="var(--sl-color-success-500)")}),s.appendChild(c)}),e.appendChild(s)}}customElements.define("ts-relationship-picker",Nn);class zn extends HTMLElement{constructor(){super(),this.options=[],this._value="",this.isOpen=!1,this.filteredOptions=[]}static get observedAttributes(){return["label","value","options","disabled","placeholder","required","error","allow-custom","allow-empty"]}get allowCustom(){return this.hasAttribute("allow-custom")}set allowCustom(t){t?this.setAttribute("allow-custom",""):this.removeAttribute("allow-custom")}get allowEmpty(){return this.hasAttribute("allow-empty")}set allowEmpty(t){t?this.setAttribute("allow-empty",""):this.removeAttribute("allow-empty")}attributeChangedCallback(t,e,a){if(e!==a){if(t==="options")try{this.options=JSON.parse(a),this.filteredOptions=[...this.options]}catch{this.options=[],this.filteredOptions=[]}else t==="value"&&(this._value=a);this.render()}}getDisplayValue(t){if(!t)return"";const e=this.options.find(a=>(a.value||a)===t);return e?e.label||e.value||e:t}connectedCallback(){this.render(),document.addEventListener("click",this.handleDocumentClick.bind(this))}disconnectedCallback(){document.removeEventListener("click",this.handleDocumentClick.bind(this))}handleDocumentClick(t){this.contains(t.target)||(this.isOpen=!1,this.renderDropdown(),this.updateIconState(),this.validateInput())}validateInput(){const t=this.querySelector("sl-input");if(!t)return;const e=t.value.trim();if(!e){this.allowEmpty?this.handleSelect(""):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("");return}const a=this.options.find(n=>{const o=n.label||n.value||n;return String(o).toLowerCase()===e.toLowerCase()});if(a){const n=a.value||a;this._value!==n?this.handleSelect(n):t.value=this.getDisplayValue(n)}else this.allowCustom?this._value!==e&&(this._value=e,this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:e},bubbles:!0,composed:!0}))):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("")}toggleDropdown(t){t.preventDefault(),t.stopPropagation(),this.isOpen?(this.isOpen=!1,this.renderDropdown(),this.updateIconState()):(this.isOpen=!0,this.handleFocus())}updateIconState(){const t=this.querySelector(".combobox-icon");t&&t.classList.toggle("open",this.isOpen)}handleInput(t){const e=t.target.value;if(this.isOpen=!0,this.updateIconState(),!e)this.filteredOptions=[...this.options];else{const a=e.toLowerCase();this.filteredOptions=this.options.filter(n=>{const o=n.label||n.value||n;return String(o).toLowerCase().includes(a)})}this.renderDropdown()}handleSelect(t){const e=this._value;this._value=t,this.isOpen=!1,this.updateIconState(),e!==t&&this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:this._value},bubbles:!0,composed:!0}));const a=this.querySelector("sl-input");a&&(a.value=this.getDisplayValue(t)),this.renderDropdown()}handleFocus(){this.isOpen=!0,this.updateIconState();const t=this.querySelector("sl-input");if(t&&setTimeout(()=>t.select(),0),t&&t.value){const e=t.value.toLowerCase();this.filteredOptions=this.options.filter(a=>{const n=a.label||a.value||a;return String(n).toLowerCase().includes(e)})}else this.filteredOptions=[...this.options];this.renderDropdown()}render(){this.innerHTML="";const t=this.getAttribute("label"),e=this.hasAttribute("disabled"),a=this.getAttribute("placeholder")||"",n=this.hasAttribute("required"),o=this.getAttribute("error"),s=document.createElement("div");s.style.position="relative",s.style.width="100%";const d=document.createElement("sl-input");d.classList.add("combobox-input"),t&&(d.label=t),d.value=this.getDisplayValue(this._value),d.disabled=e,d.placeholder=a,d.required=n,o&&d.classList.add("input-invalid"),d.setAttribute("autocomplete","off");const c=document.createElement("sl-icon");c.classList.add("combobox-icon"),c.slot="suffix",c.name="chevron-down",c.name="chevron-down",c.addEventListener("mousedown",f=>f.preventDefault()),c.addEventListener("click",this.toggleDropdown.bind(this)),d.appendChild(c),d.appendChild(c),d.addEventListener("sl-input",this.handleInput.bind(this)),d.addEventListener("sl-focus",this.handleFocus.bind(this)),d.addEventListener("keydown",f=>{f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d.value=this.getDisplayValue(this._value),this.isOpen=!1,this.renderDropdown(),this.updateIconState(),d.blur())}),d.addEventListener("sl-blur",()=>{setTimeout(()=>{this.isOpen&&(this.isOpen=!1,this.renderDropdown(),this.updateIconState()),this.validateInput()},150)}),d.addEventListener("sl-change",f=>{f.stopPropagation()}),s.appendChild(d);const m=document.createElement("div");if(m.className="ts-combobox-dropdown",s.appendChild(m),this.appendChild(s),!this.querySelector("style")){const f=document.createElement("style");f.textContent=`
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
            `,this.appendChild(f)}this.renderDropdown()}renderDropdown(){const t=this.querySelector(".ts-combobox-dropdown");if(t)if(this.isOpen&&this.filteredOptions.length>0)t.style.display="block",t.innerHTML="",this.filteredOptions.forEach(e=>{const a=e.value||e,n=e.label||a,o=document.createElement("div");o.className="ts-combobox-item",o.textContent=n,o.addEventListener("click",()=>this.handleSelect(a)),t.appendChild(o)});else if(this.isOpen){t.style.display="block",t.innerHTML="";const e=document.createElement("div");e.className="ts-combobox-empty",e.textContent="Nic nenalezeno...",t.appendChild(e)}else t.style.display="none"}}customElements.define("ts-combobox",zn);var lt=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange","onPreCalendarPosition"],be={_disable:[],allowInput:!1,allowInvalidPreload:!1,altFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",animate:typeof window=="object"&&window.navigator.userAgent.indexOf("MSIE")===-1,ariaDateFormat:"F j, Y",autoFillDefaultTime:!0,clickOpens:!0,closeOnSelect:!0,conjunction:", ",dateFormat:"Y-m-d",defaultHour:12,defaultMinute:0,defaultSeconds:0,disable:[],disableMobile:!1,enableSeconds:!1,enableTime:!1,errorHandler:function(i){return typeof console<"u"&&console.warn(i)},getWeek:function(i){var t=new Date(i.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var e=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-e.getTime())/864e5-3+(e.getDay()+6)%7)/7)},hourIncrement:1,ignoredFocusElements:[],inline:!1,locale:"default",minuteIncrement:5,mode:"single",monthSelectorType:"dropdown",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",noCalendar:!1,now:new Date,onChange:[],onClose:[],onDayCreate:[],onDestroy:[],onKeyDown:[],onMonthChange:[],onOpen:[],onParseConfig:[],onReady:[],onValueUpdate:[],onYearChange:[],onPreCalendarPosition:[],plugins:[],position:"auto",positionElement:void 0,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",shorthandCurrentMonth:!1,showMonths:1,static:!1,time_24hr:!1,weekNumbers:!1,wrap:!1},Se={weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(i){var t=i%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle",amPM:["AM","PM"],yearAriaLabel:"Year",monthAriaLabel:"Month",hourAriaLabel:"Hour",minuteAriaLabel:"Minute",time_24hr:!1},Q=function(i,t){return t===void 0&&(t=2),("000"+i).slice(t*-1)},ie=function(i){return i===!0?1:0};function Lt(i,t){var e;return function(){var a=this,n=arguments;clearTimeout(e),e=setTimeout(function(){return i.apply(a,n)},t)}}var st=function(i){return i instanceof Array?i:[i]};function G(i,t,e){if(e===!0)return i.classList.add(t);i.classList.remove(t)}function L(i,t,e){var a=window.document.createElement(i);return t=t||"",e=e||"",a.className=t,e!==void 0&&(a.textContent=e),a}function Le(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Yt(i,t){if(t(i))return i;if(i.parentNode)return Yt(i.parentNode,t)}function Ne(i,t){var e=L("div","numInputWrapper"),a=L("input","numInput "+i),n=L("span","arrowUp"),o=L("span","arrowDown");if(navigator.userAgent.indexOf("MSIE 9.0")===-1?a.type="number":(a.type="text",a.pattern="\\d*"),t!==void 0)for(var s in t)a.setAttribute(s,t[s]);return e.appendChild(a),e.appendChild(n),e.appendChild(o),e}function ee(i){try{if(typeof i.composedPath=="function"){var t=i.composedPath();return t[0]}return i.target}catch{return i.target}}var ct=function(){},Ze=function(i,t,e){return e.months[t?"shorthand":"longhand"][i]},_n={D:ct,F:function(i,t,e){i.setMonth(e.months.longhand.indexOf(t))},G:function(i,t){i.setHours((i.getHours()>=12?12:0)+parseFloat(t))},H:function(i,t){i.setHours(parseFloat(t))},J:function(i,t){i.setDate(parseFloat(t))},K:function(i,t,e){i.setHours(i.getHours()%12+12*ie(new RegExp(e.amPM[1],"i").test(t)))},M:function(i,t,e){i.setMonth(e.months.shorthand.indexOf(t))},S:function(i,t){i.setSeconds(parseFloat(t))},U:function(i,t){return new Date(parseFloat(t)*1e3)},W:function(i,t,e){var a=parseInt(t),n=new Date(i.getFullYear(),0,2+(a-1)*7,0,0,0,0);return n.setDate(n.getDate()-n.getDay()+e.firstDayOfWeek),n},Y:function(i,t){i.setFullYear(parseFloat(t))},Z:function(i,t){return new Date(t)},d:function(i,t){i.setDate(parseFloat(t))},h:function(i,t){i.setHours((i.getHours()>=12?12:0)+parseFloat(t))},i:function(i,t){i.setMinutes(parseFloat(t))},j:function(i,t){i.setDate(parseFloat(t))},l:ct,m:function(i,t){i.setMonth(parseFloat(t)-1)},n:function(i,t){i.setMonth(parseFloat(t)-1)},s:function(i,t){i.setSeconds(parseFloat(t))},u:function(i,t){return new Date(parseFloat(t))},w:ct,y:function(i,t){i.setFullYear(2e3+parseFloat(t))}},pe={D:"",F:"",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"",M:"",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",u:"(.+)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},De={Z:function(i){return i.toISOString()},D:function(i,t,e){return t.weekdays.shorthand[De.w(i,t,e)]},F:function(i,t,e){return Ze(De.n(i,t,e)-1,!1,t)},G:function(i,t,e){return Q(De.h(i,t,e))},H:function(i){return Q(i.getHours())},J:function(i,t){return t.ordinal!==void 0?i.getDate()+t.ordinal(i.getDate()):i.getDate()},K:function(i,t){return t.amPM[ie(i.getHours()>11)]},M:function(i,t){return Ze(i.getMonth(),!0,t)},S:function(i){return Q(i.getSeconds())},U:function(i){return i.getTime()/1e3},W:function(i,t,e){return e.getWeek(i)},Y:function(i){return Q(i.getFullYear(),4)},d:function(i){return Q(i.getDate())},h:function(i){return i.getHours()%12?i.getHours()%12:12},i:function(i){return Q(i.getMinutes())},j:function(i){return i.getDate()},l:function(i,t){return t.weekdays.longhand[i.getDay()]},m:function(i){return Q(i.getMonth()+1)},n:function(i){return i.getMonth()+1},s:function(i){return i.getSeconds()},u:function(i){return i.getTime()},w:function(i){return i.getDay()},y:function(i){return String(i.getFullYear()).substring(2)}},Ut=function(i){var t=i.config,e=t===void 0?be:t,a=i.l10n,n=a===void 0?Se:a,o=i.isMobile,s=o===void 0?!1:o;return function(d,c,m){var f=m||n;return e.formatDate!==void 0&&!s?e.formatDate(d,c,f):c.split("").map(function(v,g,x){return De[v]&&x[g-1]!=="\\"?De[v](d,f,e):v!=="\\"?v:""}).join("")}},pt=function(i){var t=i.config,e=t===void 0?be:t,a=i.l10n,n=a===void 0?Se:a;return function(o,s,d,c){if(!(o!==0&&!o)){var m=c||n,f,v=o;if(o instanceof Date)f=new Date(o.getTime());else if(typeof o!="string"&&o.toFixed!==void 0)f=new Date(o);else if(typeof o=="string"){var g=s||(e||be).dateFormat,x=String(o).trim();if(x==="today")f=new Date,d=!0;else if(e&&e.parseDate)f=e.parseDate(o,g);else if(/Z$/.test(x)||/GMT$/.test(x))f=new Date(o);else{for(var M=void 0,E=[],B=0,O=0,A="";B<g.length;B++){var N=g[B],h=N==="\\",w=g[B-1]==="\\"||h;if(pe[N]&&!w){A+=pe[N];var y=new RegExp(A).exec(o);y&&(M=!0)&&E[N!=="Y"?"push":"unshift"]({fn:_n[N],val:y[++O]})}else h||(A+=".")}f=!e||!e.noCalendar?new Date(new Date().getFullYear(),0,1,0,0,0,0):new Date(new Date().setHours(0,0,0,0)),E.forEach(function(_){var F=_.fn,P=_.val;return f=F(f,P,m)||f}),f=M?f:void 0}}if(!(f instanceof Date&&!isNaN(f.getTime()))){e.errorHandler(new Error("Invalid date provided: "+v));return}return d===!0&&f.setHours(0,0,0,0),f}}};function te(i,t,e){return e===void 0&&(e=!0),e!==!1?new Date(i.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):i.getTime()-t.getTime()}var $n=function(i,t,e){return i>Math.min(t,e)&&i<Math.max(t,e)},dt=function(i,t,e){return i*3600+t*60+e},jn=function(i){var t=Math.floor(i/3600),e=(i-t*3600)/60;return[t,e,i-t*3600-e*60]},Bn={DAY:864e5};function ut(i){var t=i.defaultHour,e=i.defaultMinute,a=i.defaultSeconds;if(i.minDate!==void 0){var n=i.minDate.getHours(),o=i.minDate.getMinutes(),s=i.minDate.getSeconds();t<n&&(t=n),t===n&&e<o&&(e=o),t===n&&e===o&&a<s&&(a=i.minDate.getSeconds())}if(i.maxDate!==void 0){var d=i.maxDate.getHours(),c=i.maxDate.getMinutes();t=Math.min(t,d),t===d&&(e=Math.min(c,e)),t===d&&e===c&&(a=i.maxDate.getSeconds())}return{hours:t,minutes:e,seconds:a}}typeof Object.assign!="function"&&(Object.assign=function(i){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];if(!i)throw TypeError("Cannot convert undefined or null to object");for(var a=function(d){d&&Object.keys(d).forEach(function(c){return i[c]=d[c]})},n=0,o=t;n<o.length;n++){var s=o[n];a(s)}return i});var V=function(){return V=Object.assign||function(i){for(var t,e=1,a=arguments.length;e<a;e++){t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n])}return i},V.apply(this,arguments)},Nt=function(){for(var i=0,t=0,e=arguments.length;t<e;t++)i+=arguments[t].length;for(var a=Array(i),n=0,t=0;t<e;t++)for(var o=arguments[t],s=0,d=o.length;s<d;s++,n++)a[n]=o[s];return a},Hn=300;function qn(i,t){var e={config:V(V({},be),J.defaultConfig),l10n:Se};e.parseDate=pt({config:e.config,l10n:e.l10n}),e._handlers=[],e.pluginElements=[],e.loadedPlugins=[],e._bind=E,e._setHoursFromDate=g,e._positionCalendar=Pe,e.changeMonth=et,e.changeYear=Te,e.clear=ln,e.close=sn,e.onMouseOver=Fe,e._createElement=L,e.createDay=y,e.destroy=cn,e.isEnabled=ue,e.jumpToDate=A,e.updateValue=le,e.open=pn,e.redraw=It,e.set=bn,e.setDate=gn,e.toggle=xn;function a(){e.utils={getDaysInMonth:function(r,l){return r===void 0&&(r=e.currentMonth),l===void 0&&(l=e.currentYear),r===1&&(l%4===0&&l%100!==0||l%400===0)?29:e.l10n.daysInMonth[r]}}}function n(){e.element=e.input=i,e.isOpen=!1,fn(),Tt(),yn(),vn(),a(),e.isMobile||w(),O(),(e.selectedDates.length||e.config.noCalendar)&&(e.config.enableTime&&g(e.config.noCalendar?e.latestSelectedDateObj:void 0),le(!1)),d();var r=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);!e.isMobile&&r&&Pe(),q("onReady")}function o(){var r;return((r=e.calendarContainer)===null||r===void 0?void 0:r.getRootNode()).activeElement||document.activeElement}function s(r){return r.bind(e)}function d(){var r=e.config;r.weekNumbers===!1&&r.showMonths===1||r.noCalendar!==!0&&window.requestAnimationFrame(function(){if(e.calendarContainer!==void 0&&(e.calendarContainer.style.visibility="hidden",e.calendarContainer.style.display="block"),e.daysContainer!==void 0){var l=(e.days.offsetWidth+1)*r.showMonths;e.daysContainer.style.width=l+"px",e.calendarContainer.style.width=l+(e.weekWrapper!==void 0?e.weekWrapper.offsetWidth:0)+"px",e.calendarContainer.style.removeProperty("visibility"),e.calendarContainer.style.removeProperty("display")}})}function c(r){if(e.selectedDates.length===0){var l=e.config.minDate===void 0||te(new Date,e.config.minDate)>=0?new Date:new Date(e.config.minDate.getTime()),u=ut(e.config);l.setHours(u.hours,u.minutes,u.seconds,l.getMilliseconds()),e.selectedDates=[l],e.latestSelectedDateObj=l}r!==void 0&&r.type!=="blur"&&Dn(r);var p=e._input.value;v(),le(),e._input.value!==p&&e._debouncedChange()}function m(r,l){return r%12+12*ie(l===e.l10n.amPM[1])}function f(r){switch(r%24){case 0:case 12:return 12;default:return r%12}}function v(){if(!(e.hourElement===void 0||e.minuteElement===void 0)){var r=(parseInt(e.hourElement.value.slice(-2),10)||0)%24,l=(parseInt(e.minuteElement.value,10)||0)%60,u=e.secondElement!==void 0?(parseInt(e.secondElement.value,10)||0)%60:0;e.amPM!==void 0&&(r=m(r,e.amPM.textContent));var p=e.config.minTime!==void 0||e.config.minDate&&e.minDateHasTime&&e.latestSelectedDateObj&&te(e.latestSelectedDateObj,e.config.minDate,!0)===0,b=e.config.maxTime!==void 0||e.config.maxDate&&e.maxDateHasTime&&e.latestSelectedDateObj&&te(e.latestSelectedDateObj,e.config.maxDate,!0)===0;if(e.config.maxTime!==void 0&&e.config.minTime!==void 0&&e.config.minTime>e.config.maxTime){var k=dt(e.config.minTime.getHours(),e.config.minTime.getMinutes(),e.config.minTime.getSeconds()),T=dt(e.config.maxTime.getHours(),e.config.maxTime.getMinutes(),e.config.maxTime.getSeconds()),D=dt(r,l,u);if(D>T&&D<k){var I=jn(k);r=I[0],l=I[1],u=I[2]}}else{if(b){var C=e.config.maxTime!==void 0?e.config.maxTime:e.config.maxDate;r=Math.min(r,C.getHours()),r===C.getHours()&&(l=Math.min(l,C.getMinutes())),l===C.getMinutes()&&(u=Math.min(u,C.getSeconds()))}if(p){var S=e.config.minTime!==void 0?e.config.minTime:e.config.minDate;r=Math.max(r,S.getHours()),r===S.getHours()&&l<S.getMinutes()&&(l=S.getMinutes()),l===S.getMinutes()&&(u=Math.max(u,S.getSeconds()))}}x(r,l,u)}}function g(r){var l=r||e.latestSelectedDateObj;l&&l instanceof Date&&x(l.getHours(),l.getMinutes(),l.getSeconds())}function x(r,l,u){e.latestSelectedDateObj!==void 0&&e.latestSelectedDateObj.setHours(r%24,l,u||0,0),!(!e.hourElement||!e.minuteElement||e.isMobile)&&(e.hourElement.value=Q(e.config.time_24hr?r:(12+r)%12+12*ie(r%12===0)),e.minuteElement.value=Q(l),e.amPM!==void 0&&(e.amPM.textContent=e.l10n.amPM[ie(r>=12)]),e.secondElement!==void 0&&(e.secondElement.value=Q(u)))}function M(r){var l=ee(r),u=parseInt(l.value)+(r.delta||0);(u/1e3>1||r.key==="Enter"&&!/[^\d]/.test(u.toString()))&&Te(u)}function E(r,l,u,p){if(l instanceof Array)return l.forEach(function(b){return E(r,b,u,p)});if(r instanceof Array)return r.forEach(function(b){return E(b,l,u,p)});r.addEventListener(l,u,p),e._handlers.push({remove:function(){return r.removeEventListener(l,u,p)}})}function B(){q("onChange")}function O(){if(e.config.wrap&&["open","close","toggle","clear"].forEach(function(u){Array.prototype.forEach.call(e.element.querySelectorAll("[data-"+u+"]"),function(p){return E(p,"click",e[u])})}),e.isMobile){kn();return}var r=Lt(un,50);if(e._debouncedChange=Lt(B,Hn),e.daysContainer&&!/iPhone|iPad|iPod/i.test(navigator.userAgent)&&E(e.daysContainer,"mouseover",function(u){e.config.mode==="range"&&Fe(ee(u))}),E(e._input,"keydown",St),e.calendarContainer!==void 0&&E(e.calendarContainer,"keydown",St),!e.config.inline&&!e.config.static&&E(window,"resize",r),window.ontouchstart!==void 0?E(window.document,"touchstart",tt):E(window.document,"mousedown",tt),E(window.document,"focus",tt,{capture:!0}),e.config.clickOpens===!0&&(E(e._input,"focus",e.open),E(e._input,"click",e.open)),e.daysContainer!==void 0&&(E(e.monthNav,"click",Cn),E(e.monthNav,["keyup","increment"],M),E(e.daysContainer,"click",Ft)),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0){var l=function(u){return ee(u).select()};E(e.timeContainer,["increment"],c),E(e.timeContainer,"blur",c,{capture:!0}),E(e.timeContainer,"click",N),E([e.hourElement,e.minuteElement],["focus","click"],l),e.secondElement!==void 0&&E(e.secondElement,"focus",function(){return e.secondElement&&e.secondElement.select()}),e.amPM!==void 0&&E(e.amPM,"click",function(u){c(u)})}e.config.allowInput&&E(e._input,"blur",dn)}function A(r,l){var u=r!==void 0?e.parseDate(r):e.latestSelectedDateObj||(e.config.minDate&&e.config.minDate>e.now?e.config.minDate:e.config.maxDate&&e.config.maxDate<e.now?e.config.maxDate:e.now),p=e.currentYear,b=e.currentMonth;try{u!==void 0&&(e.currentYear=u.getFullYear(),e.currentMonth=u.getMonth())}catch(k){k.message="Invalid date supplied: "+u,e.config.errorHandler(k)}l&&e.currentYear!==p&&(q("onYearChange"),j()),l&&(e.currentYear!==p||e.currentMonth!==b)&&q("onMonthChange"),e.redraw()}function N(r){var l=ee(r);~l.className.indexOf("arrow")&&h(r,l.classList.contains("arrowUp")?1:-1)}function h(r,l,u){var p=r&&ee(r),b=u||p&&p.parentNode&&p.parentNode.firstChild,k=it("increment");k.delta=l,b&&b.dispatchEvent(k)}function w(){var r=window.document.createDocumentFragment();if(e.calendarContainer=L("div","flatpickr-calendar"),e.calendarContainer.tabIndex=-1,!e.config.noCalendar){if(r.appendChild(Ae()),e.innerContainer=L("div","flatpickr-innerContainer"),e.config.weekNumbers){var l=on(),u=l.weekWrapper,p=l.weekNumbers;e.innerContainer.appendChild(u),e.weekNumbers=p,e.weekWrapper=u}e.rContainer=L("div","flatpickr-rContainer"),e.rContainer.appendChild(de()),e.daysContainer||(e.daysContainer=L("div","flatpickr-days"),e.daysContainer.tabIndex=-1),Y(),e.rContainer.appendChild(e.daysContainer),e.innerContainer.appendChild(e.rContainer),r.appendChild(e.innerContainer)}e.config.enableTime&&r.appendChild(ne()),G(e.calendarContainer,"rangeMode",e.config.mode==="range"),G(e.calendarContainer,"animate",e.config.animate===!0),G(e.calendarContainer,"multiMonth",e.config.showMonths>1),e.calendarContainer.appendChild(r);var b=e.config.appendTo!==void 0&&e.config.appendTo.nodeType!==void 0;if((e.config.inline||e.config.static)&&(e.calendarContainer.classList.add(e.config.inline?"inline":"static"),e.config.inline&&(!b&&e.element.parentNode?e.element.parentNode.insertBefore(e.calendarContainer,e._input.nextSibling):e.config.appendTo!==void 0&&e.config.appendTo.appendChild(e.calendarContainer)),e.config.static)){var k=L("div","flatpickr-wrapper");e.element.parentNode&&e.element.parentNode.insertBefore(k,e.element),k.appendChild(e.element),e.altInput&&k.appendChild(e.altInput),k.appendChild(e.calendarContainer)}!e.config.static&&!e.config.inline&&(e.config.appendTo!==void 0?e.config.appendTo:window.document.body).appendChild(e.calendarContainer)}function y(r,l,u,p){var b=ue(l,!0),k=L("span",r,l.getDate().toString());return k.dateObj=l,k.$i=p,k.setAttribute("aria-label",e.formatDate(l,e.config.ariaDateFormat)),r.indexOf("hidden")===-1&&te(l,e.now)===0&&(e.todayDateElem=k,k.classList.add("today"),k.setAttribute("aria-current","date")),b?(k.tabIndex=-1,at(l)&&(k.classList.add("selected"),e.selectedDateElem=k,e.config.mode==="range"&&(G(k,"startRange",e.selectedDates[0]&&te(l,e.selectedDates[0],!0)===0),G(k,"endRange",e.selectedDates[1]&&te(l,e.selectedDates[1],!0)===0),r==="nextMonthDay"&&k.classList.add("inRange")))):k.classList.add("flatpickr-disabled"),e.config.mode==="range"&&wn(l)&&!at(l)&&k.classList.add("inRange"),e.weekNumbers&&e.config.showMonths===1&&r!=="prevMonthDay"&&p%7===6&&e.weekNumbers.insertAdjacentHTML("beforeend","<span class='flatpickr-day'>"+e.config.getWeek(l)+"</span>"),q("onDayCreate",k),k}function _(r){r.focus(),e.config.mode==="range"&&Fe(r)}function F(r){for(var l=r>0?0:e.config.showMonths-1,u=r>0?e.config.showMonths:-1,p=l;p!=u;p+=r)for(var b=e.daysContainer.children[p],k=r>0?0:b.children.length-1,T=r>0?b.children.length:-1,D=k;D!=T;D+=r){var I=b.children[D];if(I.className.indexOf("hidden")===-1&&ue(I.dateObj))return I}}function P(r,l){for(var u=r.className.indexOf("Month")===-1?r.dateObj.getMonth():e.currentMonth,p=l>0?e.config.showMonths:-1,b=l>0?1:-1,k=u-e.currentMonth;k!=p;k+=b)for(var T=e.daysContainer.children[k],D=u-e.currentMonth===k?r.$i+l:l<0?T.children.length-1:0,I=T.children.length,C=D;C>=0&&C<I&&C!=(l>0?I:-1);C+=b){var S=T.children[C];if(S.className.indexOf("hidden")===-1&&ue(S.dateObj)&&Math.abs(r.$i-C)>=Math.abs(l))return _(S)}e.changeMonth(b),H(F(b),0)}function H(r,l){var u=o(),p=Ie(u||document.body),b=r!==void 0?r:p?u:e.selectedDateElem!==void 0&&Ie(e.selectedDateElem)?e.selectedDateElem:e.todayDateElem!==void 0&&Ie(e.todayDateElem)?e.todayDateElem:F(l>0?1:-1);b===void 0?e._input.focus():p?P(b,l):_(b)}function W(r,l){for(var u=(new Date(r,l,1).getDay()-e.l10n.firstDayOfWeek+7)%7,p=e.utils.getDaysInMonth((l-1+12)%12,r),b=e.utils.getDaysInMonth(l,r),k=window.document.createDocumentFragment(),T=e.config.showMonths>1,D=T?"prevMonthDay hidden":"prevMonthDay",I=T?"nextMonthDay hidden":"nextMonthDay",C=p+1-u,S=0;C<=p;C++,S++)k.appendChild(y("flatpickr-day "+D,new Date(r,l-1,C),C,S));for(C=1;C<=b;C++,S++)k.appendChild(y("flatpickr-day",new Date(r,l,C),C,S));for(var $=b+1;$<=42-u&&(e.config.showMonths===1||S%7!==0);$++,S++)k.appendChild(y("flatpickr-day "+I,new Date(r,l+1,$%b),$,S));var oe=L("div","dayContainer");return oe.appendChild(k),oe}function Y(){if(e.daysContainer!==void 0){Le(e.daysContainer),e.weekNumbers&&Le(e.weekNumbers);for(var r=document.createDocumentFragment(),l=0;l<e.config.showMonths;l++){var u=new Date(e.currentYear,e.currentMonth,1);u.setMonth(e.currentMonth+l),r.appendChild(W(u.getFullYear(),u.getMonth()))}e.daysContainer.appendChild(r),e.days=e.daysContainer.firstChild,e.config.mode==="range"&&e.selectedDates.length===1&&Fe()}}function j(){if(!(e.config.showMonths>1||e.config.monthSelectorType!=="dropdown")){var r=function(p){return e.config.minDate!==void 0&&e.currentYear===e.config.minDate.getFullYear()&&p<e.config.minDate.getMonth()?!1:!(e.config.maxDate!==void 0&&e.currentYear===e.config.maxDate.getFullYear()&&p>e.config.maxDate.getMonth())};e.monthsDropdownContainer.tabIndex=-1,e.monthsDropdownContainer.innerHTML="";for(var l=0;l<12;l++)if(r(l)){var u=L("option","flatpickr-monthDropdown-month");u.value=new Date(e.currentYear,l).getMonth().toString(),u.textContent=Ze(l,e.config.shorthandCurrentMonth,e.l10n),u.tabIndex=-1,e.currentMonth===l&&(u.selected=!0),e.monthsDropdownContainer.appendChild(u)}}}function U(){var r=L("div","flatpickr-month"),l=window.document.createDocumentFragment(),u;e.config.showMonths>1||e.config.monthSelectorType==="static"?u=L("span","cur-month"):(e.monthsDropdownContainer=L("select","flatpickr-monthDropdown-months"),e.monthsDropdownContainer.setAttribute("aria-label",e.l10n.monthAriaLabel),E(e.monthsDropdownContainer,"change",function(T){var D=ee(T),I=parseInt(D.value,10);e.changeMonth(I-e.currentMonth),q("onMonthChange")}),j(),u=e.monthsDropdownContainer);var p=Ne("cur-year",{tabindex:"-1"}),b=p.getElementsByTagName("input")[0];b.setAttribute("aria-label",e.l10n.yearAriaLabel),e.config.minDate&&b.setAttribute("min",e.config.minDate.getFullYear().toString()),e.config.maxDate&&(b.setAttribute("max",e.config.maxDate.getFullYear().toString()),b.disabled=!!e.config.minDate&&e.config.minDate.getFullYear()===e.config.maxDate.getFullYear());var k=L("div","flatpickr-current-month");return k.appendChild(u),k.appendChild(p),l.appendChild(k),r.appendChild(l),{container:r,yearElement:b,monthElement:u}}function Z(){Le(e.monthNav),e.monthNav.appendChild(e.prevMonthNav),e.config.showMonths&&(e.yearElements=[],e.monthElements=[]);for(var r=e.config.showMonths;r--;){var l=U();e.yearElements.push(l.yearElement),e.monthElements.push(l.monthElement),e.monthNav.appendChild(l.container)}e.monthNav.appendChild(e.nextMonthNav)}function Ae(){return e.monthNav=L("div","flatpickr-months"),e.yearElements=[],e.monthElements=[],e.prevMonthNav=L("span","flatpickr-prev-month"),e.prevMonthNav.innerHTML=e.config.prevArrow,e.nextMonthNav=L("span","flatpickr-next-month"),e.nextMonthNav.innerHTML=e.config.nextArrow,Z(),Object.defineProperty(e,"_hidePrevMonthArrow",{get:function(){return e.__hidePrevMonthArrow},set:function(r){e.__hidePrevMonthArrow!==r&&(G(e.prevMonthNav,"flatpickr-disabled",r),e.__hidePrevMonthArrow=r)}}),Object.defineProperty(e,"_hideNextMonthArrow",{get:function(){return e.__hideNextMonthArrow},set:function(r){e.__hideNextMonthArrow!==r&&(G(e.nextMonthNav,"flatpickr-disabled",r),e.__hideNextMonthArrow=r)}}),e.currentYearElement=e.yearElements[0],Oe(),e.monthNav}function ne(){e.calendarContainer.classList.add("hasTime"),e.config.noCalendar&&e.calendarContainer.classList.add("noCalendar");var r=ut(e.config);e.timeContainer=L("div","flatpickr-time"),e.timeContainer.tabIndex=-1;var l=L("span","flatpickr-time-separator",":"),u=Ne("flatpickr-hour",{"aria-label":e.l10n.hourAriaLabel});e.hourElement=u.getElementsByTagName("input")[0];var p=Ne("flatpickr-minute",{"aria-label":e.l10n.minuteAriaLabel});if(e.minuteElement=p.getElementsByTagName("input")[0],e.hourElement.tabIndex=e.minuteElement.tabIndex=-1,e.hourElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getHours():e.config.time_24hr?r.hours:f(r.hours)),e.minuteElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getMinutes():r.minutes),e.hourElement.setAttribute("step",e.config.hourIncrement.toString()),e.minuteElement.setAttribute("step",e.config.minuteIncrement.toString()),e.hourElement.setAttribute("min",e.config.time_24hr?"0":"1"),e.hourElement.setAttribute("max",e.config.time_24hr?"23":"12"),e.hourElement.setAttribute("maxlength","2"),e.minuteElement.setAttribute("min","0"),e.minuteElement.setAttribute("max","59"),e.minuteElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(u),e.timeContainer.appendChild(l),e.timeContainer.appendChild(p),e.config.time_24hr&&e.timeContainer.classList.add("time24hr"),e.config.enableSeconds){e.timeContainer.classList.add("hasSeconds");var b=Ne("flatpickr-second");e.secondElement=b.getElementsByTagName("input")[0],e.secondElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getSeconds():r.seconds),e.secondElement.setAttribute("step",e.minuteElement.getAttribute("step")),e.secondElement.setAttribute("min","0"),e.secondElement.setAttribute("max","59"),e.secondElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(L("span","flatpickr-time-separator",":")),e.timeContainer.appendChild(b)}return e.config.time_24hr||(e.amPM=L("span","flatpickr-am-pm",e.l10n.amPM[ie((e.latestSelectedDateObj?e.hourElement.value:e.config.defaultHour)>11)]),e.amPM.title=e.l10n.toggleTitle,e.amPM.tabIndex=-1,e.timeContainer.appendChild(e.amPM)),e.timeContainer}function de(){e.weekdayContainer?Le(e.weekdayContainer):e.weekdayContainer=L("div","flatpickr-weekdays");for(var r=e.config.showMonths;r--;){var l=L("div","flatpickr-weekdaycontainer");e.weekdayContainer.appendChild(l)}return Et(),e.weekdayContainer}function Et(){if(e.weekdayContainer){var r=e.l10n.firstDayOfWeek,l=Nt(e.l10n.weekdays.shorthand);r>0&&r<l.length&&(l=Nt(l.splice(r,l.length),l.splice(0,r)));for(var u=e.config.showMonths;u--;)e.weekdayContainer.children[u].innerHTML=`
      <span class='flatpickr-weekday'>
        `+l.join("</span><span class='flatpickr-weekday'>")+`
      </span>
      `}}function on(){e.calendarContainer.classList.add("hasWeeks");var r=L("div","flatpickr-weekwrapper");r.appendChild(L("span","flatpickr-weekday",e.l10n.weekAbbreviation));var l=L("div","flatpickr-weeks");return r.appendChild(l),{weekWrapper:r,weekNumbers:l}}function et(r,l){l===void 0&&(l=!0);var u=l?r:r-e.currentMonth;u<0&&e._hidePrevMonthArrow===!0||u>0&&e._hideNextMonthArrow===!0||(e.currentMonth+=u,(e.currentMonth<0||e.currentMonth>11)&&(e.currentYear+=e.currentMonth>11?1:-1,e.currentMonth=(e.currentMonth+12)%12,q("onYearChange"),j()),Y(),q("onMonthChange"),Oe())}function ln(r,l){if(r===void 0&&(r=!0),l===void 0&&(l=!0),e.input.value="",e.altInput!==void 0&&(e.altInput.value=""),e.mobileInput!==void 0&&(e.mobileInput.value=""),e.selectedDates=[],e.latestSelectedDateObj=void 0,l===!0&&(e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth()),e.config.enableTime===!0){var u=ut(e.config),p=u.hours,b=u.minutes,k=u.seconds;x(p,b,k)}e.redraw(),r&&q("onChange")}function sn(){e.isOpen=!1,e.isMobile||(e.calendarContainer!==void 0&&e.calendarContainer.classList.remove("open"),e._input!==void 0&&e._input.classList.remove("active")),q("onClose")}function cn(){e.config!==void 0&&q("onDestroy");for(var r=e._handlers.length;r--;)e._handlers[r].remove();if(e._handlers=[],e.mobileInput)e.mobileInput.parentNode&&e.mobileInput.parentNode.removeChild(e.mobileInput),e.mobileInput=void 0;else if(e.calendarContainer&&e.calendarContainer.parentNode)if(e.config.static&&e.calendarContainer.parentNode){var l=e.calendarContainer.parentNode;if(l.lastChild&&l.removeChild(l.lastChild),l.parentNode){for(;l.firstChild;)l.parentNode.insertBefore(l.firstChild,l);l.parentNode.removeChild(l)}}else e.calendarContainer.parentNode.removeChild(e.calendarContainer);e.altInput&&(e.input.type="text",e.altInput.parentNode&&e.altInput.parentNode.removeChild(e.altInput),delete e.altInput),e.input&&(e.input.type=e.input._type,e.input.classList.remove("flatpickr-input"),e.input.removeAttribute("readonly")),["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","monthsDropdownContainer","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach(function(u){try{delete e[u]}catch{}})}function ve(r){return e.calendarContainer.contains(r)}function tt(r){if(e.isOpen&&!e.config.inline){var l=ee(r),u=ve(l),p=l===e.input||l===e.altInput||e.element.contains(l)||r.path&&r.path.indexOf&&(~r.path.indexOf(e.input)||~r.path.indexOf(e.altInput)),b=!p&&!u&&!ve(r.relatedTarget),k=!e.config.ignoredFocusElements.some(function(T){return T.contains(l)});b&&k&&(e.config.allowInput&&e.setDate(e._input.value,!1,e.config.altInput?e.config.altFormat:e.config.dateFormat),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0&&e.input.value!==""&&e.input.value!==void 0&&c(),e.close(),e.config&&e.config.mode==="range"&&e.selectedDates.length===1&&e.clear(!1))}}function Te(r){if(!(!r||e.config.minDate&&r<e.config.minDate.getFullYear()||e.config.maxDate&&r>e.config.maxDate.getFullYear())){var l=r,u=e.currentYear!==l;e.currentYear=l||e.currentYear,e.config.maxDate&&e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth=Math.min(e.config.maxDate.getMonth(),e.currentMonth):e.config.minDate&&e.currentYear===e.config.minDate.getFullYear()&&(e.currentMonth=Math.max(e.config.minDate.getMonth(),e.currentMonth)),u&&(e.redraw(),q("onYearChange"),j())}}function ue(r,l){var u;l===void 0&&(l=!0);var p=e.parseDate(r,void 0,l);if(e.config.minDate&&p&&te(p,e.config.minDate,l!==void 0?l:!e.minDateHasTime)<0||e.config.maxDate&&p&&te(p,e.config.maxDate,l!==void 0?l:!e.maxDateHasTime)>0)return!1;if(!e.config.enable&&e.config.disable.length===0)return!0;if(p===void 0)return!1;for(var b=!!e.config.enable,k=(u=e.config.enable)!==null&&u!==void 0?u:e.config.disable,T=0,D=void 0;T<k.length;T++){if(D=k[T],typeof D=="function"&&D(p))return b;if(D instanceof Date&&p!==void 0&&D.getTime()===p.getTime())return b;if(typeof D=="string"){var I=e.parseDate(D,void 0,!0);return I&&I.getTime()===p.getTime()?b:!b}else if(typeof D=="object"&&p!==void 0&&D.from&&D.to&&p.getTime()>=D.from.getTime()&&p.getTime()<=D.to.getTime())return b}return!b}function Ie(r){return e.daysContainer!==void 0?r.className.indexOf("hidden")===-1&&r.className.indexOf("flatpickr-disabled")===-1&&e.daysContainer.contains(r):!1}function dn(r){var l=r.target===e._input,u=e._input.value.trimEnd()!==rt();l&&u&&!(r.relatedTarget&&ve(r.relatedTarget))&&e.setDate(e._input.value,!0,r.target===e.altInput?e.config.altFormat:e.config.dateFormat)}function St(r){var l=ee(r),u=e.config.wrap?i.contains(l):l===e._input,p=e.config.allowInput,b=e.isOpen&&(!p||!u),k=e.config.inline&&u&&!p;if(r.keyCode===13&&u){if(p)return e.setDate(e._input.value,!0,l===e.altInput?e.config.altFormat:e.config.dateFormat),e.close(),l.blur();e.open()}else if(ve(l)||b||k){var T=!!e.timeContainer&&e.timeContainer.contains(l);switch(r.keyCode){case 13:T?(r.preventDefault(),c(),nt()):Ft(r);break;case 27:r.preventDefault(),nt();break;case 8:case 46:u&&!e.config.allowInput&&(r.preventDefault(),e.clear());break;case 37:case 39:if(!T&&!u){r.preventDefault();var D=o();if(e.daysContainer!==void 0&&(p===!1||D&&Ie(D))){var I=r.keyCode===39?1:-1;r.ctrlKey?(r.stopPropagation(),et(I),H(F(1),0)):H(void 0,I)}}else e.hourElement&&e.hourElement.focus();break;case 38:case 40:r.preventDefault();var C=r.keyCode===40?1:-1;e.daysContainer&&l.$i!==void 0||l===e.input||l===e.altInput?r.ctrlKey?(r.stopPropagation(),Te(e.currentYear-C),H(F(1),0)):T||H(void 0,C*7):l===e.currentYearElement?Te(e.currentYear-C):e.config.enableTime&&(!T&&e.hourElement&&e.hourElement.focus(),c(r),e._debouncedChange());break;case 9:if(T){var S=[e.hourElement,e.minuteElement,e.secondElement,e.amPM].concat(e.pluginElements).filter(function(X){return X}),$=S.indexOf(l);if($!==-1){var oe=S[$+(r.shiftKey?-1:1)];r.preventDefault(),(oe||e._input).focus()}}else!e.config.noCalendar&&e.daysContainer&&e.daysContainer.contains(l)&&r.shiftKey&&(r.preventDefault(),e._input.focus());break}}if(e.amPM!==void 0&&l===e.amPM)switch(r.key){case e.l10n.amPM[0].charAt(0):case e.l10n.amPM[0].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[0],v(),le();break;case e.l10n.amPM[1].charAt(0):case e.l10n.amPM[1].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[1],v(),le();break}(u||ve(l))&&q("onKeyDown",r)}function Fe(r,l){if(l===void 0&&(l="flatpickr-day"),!(e.selectedDates.length!==1||r&&(!r.classList.contains(l)||r.classList.contains("flatpickr-disabled")))){for(var u=r?r.dateObj.getTime():e.days.firstElementChild.dateObj.getTime(),p=e.parseDate(e.selectedDates[0],void 0,!0).getTime(),b=Math.min(u,e.selectedDates[0].getTime()),k=Math.max(u,e.selectedDates[0].getTime()),T=!1,D=0,I=0,C=b;C<k;C+=Bn.DAY)ue(new Date(C),!0)||(T=T||C>b&&C<k,C<p&&(!D||C>D)?D=C:C>p&&(!I||C<I)&&(I=C));var S=Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+"+e.config.showMonths+") > ."+l));S.forEach(function($){var oe=$.dateObj,X=oe.getTime(),ye=D>0&&X<D||I>0&&X>I;if(ye){$.classList.add("notAllowed"),["inRange","startRange","endRange"].forEach(function(me){$.classList.remove(me)});return}else if(T&&!ye)return;["startRange","inRange","endRange","notAllowed"].forEach(function(me){$.classList.remove(me)}),r!==void 0&&(r.classList.add(u<=e.selectedDates[0].getTime()?"startRange":"endRange"),p<u&&X===p?$.classList.add("startRange"):p>u&&X===p&&$.classList.add("endRange"),X>=D&&(I===0||X<=I)&&$n(X,p,u)&&$.classList.add("inRange"))})}}function un(){e.isOpen&&!e.config.static&&!e.config.inline&&Pe()}function pn(r,l){if(l===void 0&&(l=e._positionElement),e.isMobile===!0){if(r){r.preventDefault();var u=ee(r);u&&u.blur()}e.mobileInput!==void 0&&(e.mobileInput.focus(),e.mobileInput.click()),q("onOpen");return}else if(e._input.disabled||e.config.inline)return;var p=e.isOpen;e.isOpen=!0,p||(e.calendarContainer.classList.add("open"),e._input.classList.add("active"),q("onOpen"),Pe(l)),e.config.enableTime===!0&&e.config.noCalendar===!0&&e.config.allowInput===!1&&(r===void 0||!e.timeContainer.contains(r.relatedTarget))&&setTimeout(function(){return e.hourElement.select()},50)}function Mt(r){return function(l){var u=e.config["_"+r+"Date"]=e.parseDate(l,e.config.dateFormat),p=e.config["_"+(r==="min"?"max":"min")+"Date"];u!==void 0&&(e[r==="min"?"minDateHasTime":"maxDateHasTime"]=u.getHours()>0||u.getMinutes()>0||u.getSeconds()>0),e.selectedDates&&(e.selectedDates=e.selectedDates.filter(function(b){return ue(b)}),!e.selectedDates.length&&r==="min"&&g(u),le()),e.daysContainer&&(It(),u!==void 0?e.currentYearElement[r]=u.getFullYear().toString():e.currentYearElement.removeAttribute(r),e.currentYearElement.disabled=!!p&&u!==void 0&&p.getFullYear()===u.getFullYear())}}function fn(){var r=["wrap","weekNumbers","allowInput","allowInvalidPreload","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],l=V(V({},JSON.parse(JSON.stringify(i.dataset||{}))),t),u={};e.config.parseDate=l.parseDate,e.config.formatDate=l.formatDate,Object.defineProperty(e.config,"enable",{get:function(){return e.config._enable},set:function(S){e.config._enable=Rt(S)}}),Object.defineProperty(e.config,"disable",{get:function(){return e.config._disable},set:function(S){e.config._disable=Rt(S)}});var p=l.mode==="time";if(!l.dateFormat&&(l.enableTime||p)){var b=J.defaultConfig.dateFormat||be.dateFormat;u.dateFormat=l.noCalendar||p?"H:i"+(l.enableSeconds?":S":""):b+" H:i"+(l.enableSeconds?":S":"")}if(l.altInput&&(l.enableTime||p)&&!l.altFormat){var k=J.defaultConfig.altFormat||be.altFormat;u.altFormat=l.noCalendar||p?"h:i"+(l.enableSeconds?":S K":" K"):k+(" h:i"+(l.enableSeconds?":S":"")+" K")}Object.defineProperty(e.config,"minDate",{get:function(){return e.config._minDate},set:Mt("min")}),Object.defineProperty(e.config,"maxDate",{get:function(){return e.config._maxDate},set:Mt("max")});var T=function(S){return function($){e.config[S==="min"?"_minTime":"_maxTime"]=e.parseDate($,"H:i:S")}};Object.defineProperty(e.config,"minTime",{get:function(){return e.config._minTime},set:T("min")}),Object.defineProperty(e.config,"maxTime",{get:function(){return e.config._maxTime},set:T("max")}),l.mode==="time"&&(e.config.noCalendar=!0,e.config.enableTime=!0),Object.assign(e.config,u,l);for(var D=0;D<r.length;D++)e.config[r[D]]=e.config[r[D]]===!0||e.config[r[D]]==="true";lt.filter(function(S){return e.config[S]!==void 0}).forEach(function(S){e.config[S]=st(e.config[S]||[]).map(s)}),e.isMobile=!e.config.disableMobile&&!e.config.inline&&e.config.mode==="single"&&!e.config.disable.length&&!e.config.enable&&!e.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);for(var D=0;D<e.config.plugins.length;D++){var I=e.config.plugins[D](e)||{};for(var C in I)lt.indexOf(C)>-1?e.config[C]=st(I[C]).map(s).concat(e.config[C]):typeof l[C]>"u"&&(e.config[C]=I[C])}l.altInputClass||(e.config.altInputClass=At().className+" "+e.config.altInputClass),q("onParseConfig")}function At(){return e.config.wrap?i.querySelector("[data-input]"):i}function Tt(){typeof e.config.locale!="object"&&typeof J.l10ns[e.config.locale]>"u"&&e.config.errorHandler(new Error("flatpickr: invalid locale "+e.config.locale)),e.l10n=V(V({},J.l10ns.default),typeof e.config.locale=="object"?e.config.locale:e.config.locale!=="default"?J.l10ns[e.config.locale]:void 0),pe.D="("+e.l10n.weekdays.shorthand.join("|")+")",pe.l="("+e.l10n.weekdays.longhand.join("|")+")",pe.M="("+e.l10n.months.shorthand.join("|")+")",pe.F="("+e.l10n.months.longhand.join("|")+")",pe.K="("+e.l10n.amPM[0]+"|"+e.l10n.amPM[1]+"|"+e.l10n.amPM[0].toLowerCase()+"|"+e.l10n.amPM[1].toLowerCase()+")";var r=V(V({},t),JSON.parse(JSON.stringify(i.dataset||{})));r.time_24hr===void 0&&J.defaultConfig.time_24hr===void 0&&(e.config.time_24hr=e.l10n.time_24hr),e.formatDate=Ut(e),e.parseDate=pt({config:e.config,l10n:e.l10n})}function Pe(r){if(typeof e.config.position=="function")return void e.config.position(e,r);if(e.calendarContainer!==void 0){q("onPreCalendarPosition");var l=r||e._positionElement,u=Array.prototype.reduce.call(e.calendarContainer.children,(function(Pn,Rn){return Pn+Rn.offsetHeight}),0),p=e.calendarContainer.offsetWidth,b=e.config.position.split(" "),k=b[0],T=b.length>1?b[1]:null,D=l.getBoundingClientRect(),I=window.innerHeight-D.bottom,C=k==="above"||k!=="below"&&I<u&&D.top>u,S=window.pageYOffset+D.top+(C?-u-2:l.offsetHeight+2);if(G(e.calendarContainer,"arrowTop",!C),G(e.calendarContainer,"arrowBottom",C),!e.config.inline){var $=window.pageXOffset+D.left,oe=!1,X=!1;T==="center"?($-=(p-D.width)/2,oe=!0):T==="right"&&($-=p-D.width,X=!0),G(e.calendarContainer,"arrowLeft",!oe&&!X),G(e.calendarContainer,"arrowCenter",oe),G(e.calendarContainer,"arrowRight",X);var ye=window.document.body.offsetWidth-(window.pageXOffset+D.right),me=$+p>window.document.body.offsetWidth,En=ye+p>window.document.body.offsetWidth;if(G(e.calendarContainer,"rightMost",me),!e.config.static)if(e.calendarContainer.style.top=S+"px",!me)e.calendarContainer.style.left=$+"px",e.calendarContainer.style.right="auto";else if(!En)e.calendarContainer.style.left="auto",e.calendarContainer.style.right=ye+"px";else{var ot=hn();if(ot===void 0)return;var Sn=window.document.body.offsetWidth,Mn=Math.max(0,Sn/2-p/2),An=".flatpickr-calendar.centerMost:before",Tn=".flatpickr-calendar.centerMost:after",In=ot.cssRules.length,Fn="{left:"+D.left+"px;right:auto;}";G(e.calendarContainer,"rightMost",!1),G(e.calendarContainer,"centerMost",!0),ot.insertRule(An+","+Tn+Fn,In),e.calendarContainer.style.left=Mn+"px",e.calendarContainer.style.right="auto"}}}}function hn(){for(var r=null,l=0;l<document.styleSheets.length;l++){var u=document.styleSheets[l];if(u.cssRules){try{u.cssRules}catch{continue}r=u;break}}return r??mn()}function mn(){var r=document.createElement("style");return document.head.appendChild(r),r.sheet}function It(){e.config.noCalendar||e.isMobile||(j(),Oe(),Y())}function nt(){e._input.focus(),window.navigator.userAgent.indexOf("MSIE")!==-1||navigator.msMaxTouchPoints!==void 0?setTimeout(e.close,0):e.close()}function Ft(r){r.preventDefault(),r.stopPropagation();var l=function(S){return S.classList&&S.classList.contains("flatpickr-day")&&!S.classList.contains("flatpickr-disabled")&&!S.classList.contains("notAllowed")},u=Yt(ee(r),l);if(u!==void 0){var p=u,b=e.latestSelectedDateObj=new Date(p.dateObj.getTime()),k=(b.getMonth()<e.currentMonth||b.getMonth()>e.currentMonth+e.config.showMonths-1)&&e.config.mode!=="range";if(e.selectedDateElem=p,e.config.mode==="single")e.selectedDates=[b];else if(e.config.mode==="multiple"){var T=at(b);T?e.selectedDates.splice(parseInt(T),1):e.selectedDates.push(b)}else e.config.mode==="range"&&(e.selectedDates.length===2&&e.clear(!1,!1),e.latestSelectedDateObj=b,e.selectedDates.push(b),te(b,e.selectedDates[0],!0)!==0&&e.selectedDates.sort(function(S,$){return S.getTime()-$.getTime()}));if(v(),k){var D=e.currentYear!==b.getFullYear();e.currentYear=b.getFullYear(),e.currentMonth=b.getMonth(),D&&(q("onYearChange"),j()),q("onMonthChange")}if(Oe(),Y(),le(),!k&&e.config.mode!=="range"&&e.config.showMonths===1?_(p):e.selectedDateElem!==void 0&&e.hourElement===void 0&&e.selectedDateElem&&e.selectedDateElem.focus(),e.hourElement!==void 0&&e.hourElement!==void 0&&e.hourElement.focus(),e.config.closeOnSelect){var I=e.config.mode==="single"&&!e.config.enableTime,C=e.config.mode==="range"&&e.selectedDates.length===2&&!e.config.enableTime;(I||C)&&nt()}B()}}var Re={locale:[Tt,Et],showMonths:[Z,d,de],minDate:[A],maxDate:[A],positionElement:[Ot],clickOpens:[function(){e.config.clickOpens===!0?(E(e._input,"focus",e.open),E(e._input,"click",e.open)):(e._input.removeEventListener("focus",e.open),e._input.removeEventListener("click",e.open))}]};function bn(r,l){if(r!==null&&typeof r=="object"){Object.assign(e.config,r);for(var u in r)Re[u]!==void 0&&Re[u].forEach(function(p){return p()})}else e.config[r]=l,Re[r]!==void 0?Re[r].forEach(function(p){return p()}):lt.indexOf(r)>-1&&(e.config[r]=st(l));e.redraw(),le(!0)}function Pt(r,l){var u=[];if(r instanceof Array)u=r.map(function(p){return e.parseDate(p,l)});else if(r instanceof Date||typeof r=="number")u=[e.parseDate(r,l)];else if(typeof r=="string")switch(e.config.mode){case"single":case"time":u=[e.parseDate(r,l)];break;case"multiple":u=r.split(e.config.conjunction).map(function(p){return e.parseDate(p,l)});break;case"range":u=r.split(e.l10n.rangeSeparator).map(function(p){return e.parseDate(p,l)});break}else e.config.errorHandler(new Error("Invalid date supplied: "+JSON.stringify(r)));e.selectedDates=e.config.allowInvalidPreload?u:u.filter(function(p){return p instanceof Date&&ue(p,!1)}),e.config.mode==="range"&&e.selectedDates.sort(function(p,b){return p.getTime()-b.getTime()})}function gn(r,l,u){if(l===void 0&&(l=!1),u===void 0&&(u=e.config.dateFormat),r!==0&&!r||r instanceof Array&&r.length===0)return e.clear(l);Pt(r,u),e.latestSelectedDateObj=e.selectedDates[e.selectedDates.length-1],e.redraw(),A(void 0,l),g(),e.selectedDates.length===0&&e.clear(!1),le(l),l&&q("onChange")}function Rt(r){return r.slice().map(function(l){return typeof l=="string"||typeof l=="number"||l instanceof Date?e.parseDate(l,void 0,!0):l&&typeof l=="object"&&l.from&&l.to?{from:e.parseDate(l.from,void 0),to:e.parseDate(l.to,void 0)}:l}).filter(function(l){return l})}function vn(){e.selectedDates=[],e.now=e.parseDate(e.config.now)||new Date;var r=e.config.defaultDate||((e.input.nodeName==="INPUT"||e.input.nodeName==="TEXTAREA")&&e.input.placeholder&&e.input.value===e.input.placeholder?null:e.input.value);r&&Pt(r,e.config.dateFormat),e._initialDate=e.selectedDates.length>0?e.selectedDates[0]:e.config.minDate&&e.config.minDate.getTime()>e.now.getTime()?e.config.minDate:e.config.maxDate&&e.config.maxDate.getTime()<e.now.getTime()?e.config.maxDate:e.now,e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth(),e.selectedDates.length>0&&(e.latestSelectedDateObj=e.selectedDates[0]),e.config.minTime!==void 0&&(e.config.minTime=e.parseDate(e.config.minTime,"H:i")),e.config.maxTime!==void 0&&(e.config.maxTime=e.parseDate(e.config.maxTime,"H:i")),e.minDateHasTime=!!e.config.minDate&&(e.config.minDate.getHours()>0||e.config.minDate.getMinutes()>0||e.config.minDate.getSeconds()>0),e.maxDateHasTime=!!e.config.maxDate&&(e.config.maxDate.getHours()>0||e.config.maxDate.getMinutes()>0||e.config.maxDate.getSeconds()>0)}function yn(){if(e.input=At(),!e.input){e.config.errorHandler(new Error("Invalid input element specified"));return}e.input._type=e.input.type,e.input.type="text",e.input.classList.add("flatpickr-input"),e._input=e.input,e.config.altInput&&(e.altInput=L(e.input.nodeName,e.config.altInputClass),e._input=e.altInput,e.altInput.placeholder=e.input.placeholder,e.altInput.disabled=e.input.disabled,e.altInput.required=e.input.required,e.altInput.tabIndex=e.input.tabIndex,e.altInput.type="text",e.input.setAttribute("type","hidden"),!e.config.static&&e.input.parentNode&&e.input.parentNode.insertBefore(e.altInput,e.input.nextSibling)),e.config.allowInput||e._input.setAttribute("readonly","readonly"),Ot()}function Ot(){e._positionElement=e.config.positionElement||e._input}function kn(){var r=e.config.enableTime?e.config.noCalendar?"time":"datetime-local":"date";e.mobileInput=L("input",e.input.className+" flatpickr-mobile"),e.mobileInput.tabIndex=1,e.mobileInput.type=r,e.mobileInput.disabled=e.input.disabled,e.mobileInput.required=e.input.required,e.mobileInput.placeholder=e.input.placeholder,e.mobileFormatStr=r==="datetime-local"?"Y-m-d\\TH:i:S":r==="date"?"Y-m-d":"H:i:S",e.selectedDates.length>0&&(e.mobileInput.defaultValue=e.mobileInput.value=e.formatDate(e.selectedDates[0],e.mobileFormatStr)),e.config.minDate&&(e.mobileInput.min=e.formatDate(e.config.minDate,"Y-m-d")),e.config.maxDate&&(e.mobileInput.max=e.formatDate(e.config.maxDate,"Y-m-d")),e.input.getAttribute("step")&&(e.mobileInput.step=String(e.input.getAttribute("step"))),e.input.type="hidden",e.altInput!==void 0&&(e.altInput.type="hidden");try{e.input.parentNode&&e.input.parentNode.insertBefore(e.mobileInput,e.input.nextSibling)}catch{}E(e.mobileInput,"change",function(l){e.setDate(ee(l).value,!1,e.mobileFormatStr),q("onChange"),q("onClose")})}function xn(r){if(e.isOpen===!0)return e.close();e.open(r)}function q(r,l){if(e.config!==void 0){var u=e.config[r];if(u!==void 0&&u.length>0)for(var p=0;u[p]&&p<u.length;p++)u[p](e.selectedDates,e.input.value,e,l);r==="onChange"&&(e.input.dispatchEvent(it("change")),e.input.dispatchEvent(it("input")))}}function it(r){var l=document.createEvent("Event");return l.initEvent(r,!0,!0),l}function at(r){for(var l=0;l<e.selectedDates.length;l++){var u=e.selectedDates[l];if(u instanceof Date&&te(u,r)===0)return""+l}return!1}function wn(r){return e.config.mode!=="range"||e.selectedDates.length<2?!1:te(r,e.selectedDates[0])>=0&&te(r,e.selectedDates[1])<=0}function Oe(){e.config.noCalendar||e.isMobile||!e.monthNav||(e.yearElements.forEach(function(r,l){var u=new Date(e.currentYear,e.currentMonth,1);u.setMonth(e.currentMonth+l),e.config.showMonths>1||e.config.monthSelectorType==="static"?e.monthElements[l].textContent=Ze(u.getMonth(),e.config.shorthandCurrentMonth,e.l10n)+" ":e.monthsDropdownContainer.value=u.getMonth().toString(),r.value=u.getFullYear().toString()}),e._hidePrevMonthArrow=e.config.minDate!==void 0&&(e.currentYear===e.config.minDate.getFullYear()?e.currentMonth<=e.config.minDate.getMonth():e.currentYear<e.config.minDate.getFullYear()),e._hideNextMonthArrow=e.config.maxDate!==void 0&&(e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth+1>e.config.maxDate.getMonth():e.currentYear>e.config.maxDate.getFullYear()))}function rt(r){var l=r||(e.config.altInput?e.config.altFormat:e.config.dateFormat);return e.selectedDates.map(function(u){return e.formatDate(u,l)}).filter(function(u,p,b){return e.config.mode!=="range"||e.config.enableTime||b.indexOf(u)===p}).join(e.config.mode!=="range"?e.config.conjunction:e.l10n.rangeSeparator)}function le(r){r===void 0&&(r=!0),e.mobileInput!==void 0&&e.mobileFormatStr&&(e.mobileInput.value=e.latestSelectedDateObj!==void 0?e.formatDate(e.latestSelectedDateObj,e.mobileFormatStr):""),e.input.value=rt(e.config.dateFormat),e.altInput!==void 0&&(e.altInput.value=rt(e.config.altFormat)),r!==!1&&q("onValueUpdate")}function Cn(r){var l=ee(r),u=e.prevMonthNav.contains(l),p=e.nextMonthNav.contains(l);u||p?et(u?-1:1):e.yearElements.indexOf(l)>=0?l.select():l.classList.contains("arrowUp")?e.changeYear(e.currentYear+1):l.classList.contains("arrowDown")&&e.changeYear(e.currentYear-1)}function Dn(r){r.preventDefault();var l=r.type==="keydown",u=ee(r),p=u;e.amPM!==void 0&&u===e.amPM&&(e.amPM.textContent=e.l10n.amPM[ie(e.amPM.textContent===e.l10n.amPM[0])]);var b=parseFloat(p.getAttribute("min")),k=parseFloat(p.getAttribute("max")),T=parseFloat(p.getAttribute("step")),D=parseInt(p.value,10),I=r.delta||(l?r.which===38?1:-1:0),C=D+T*I;if(typeof p.value<"u"&&p.value.length===2){var S=p===e.hourElement,$=p===e.minuteElement;C<b?(C=k+C+ie(!S)+(ie(S)&&ie(!e.amPM)),$&&h(void 0,-1,e.hourElement)):C>k&&(C=p===e.hourElement?C-k-ie(!e.amPM):b,$&&h(void 0,1,e.hourElement)),e.amPM&&S&&(T===1?C+D===23:Math.abs(C-D)>T)&&(e.amPM.textContent=e.l10n.amPM[ie(e.amPM.textContent===e.l10n.amPM[0])]),p.value=Q(C)}}return n(),e}function ge(i,t){for(var e=Array.prototype.slice.call(i).filter(function(s){return s instanceof HTMLElement}),a=[],n=0;n<e.length;n++){var o=e[n];try{if(o.getAttribute("data-fp-omit")!==null)continue;o._flatpickr!==void 0&&(o._flatpickr.destroy(),o._flatpickr=void 0),o._flatpickr=qn(o,t||{}),a.push(o._flatpickr)}catch(s){console.error(s)}}return a.length===1?a[0]:a}typeof HTMLElement<"u"&&typeof HTMLCollection<"u"&&typeof NodeList<"u"&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(i){return ge(this,i)},HTMLElement.prototype.flatpickr=function(i){return ge([this],i)});var J=function(i,t){return typeof i=="string"?ge(window.document.querySelectorAll(i),t):i instanceof Node?ge([i],t):ge(i,t)};J.defaultConfig={};J.l10ns={en:V({},Se),default:V({},Se)};J.localize=function(i){J.l10ns.default=V(V({},J.l10ns.default),i)};J.setDefaults=function(i){J.defaultConfig=V(V({},J.defaultConfig),i)};J.parseDate=pt({});J.formatDate=Ut({});J.compareDates=te;typeof jQuery<"u"&&typeof jQuery.fn<"u"&&(jQuery.fn.flatpickr=function(i){return ge(this,i)});Date.prototype.fp_incr=function(i){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+(typeof i=="string"?parseInt(i,10):i))};typeof window<"u"&&(window.flatpickr=J);var we={exports:{}},Jn=we.exports,zt;function Wn(){return zt||(zt=1,(function(i,t){(function(e,a){a(t)})(Jn,(function(e){var a=typeof window<"u"&&window.flatpickr!==void 0?window.flatpickr:{l10ns:{}},n={weekdays:{shorthand:["Ne","Po","Út","St","Čt","Pá","So"],longhand:["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"]},months:{shorthand:["Led","Ún","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Pro"],longhand:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"]},firstDayOfWeek:1,ordinal:function(){return"."},rangeSeparator:" do ",weekAbbreviation:"Týd.",scrollTitle:"Rolujte pro změnu",toggleTitle:"Přepnout dopoledne/odpoledne",amPM:["dop.","odp."],yearAriaLabel:"Rok",time_24hr:!0};a.l10ns.cs=n;var o=a.l10ns;e.Czech=n,e.default=o,Object.defineProperty(e,"__esModule",{value:!0})}))})(we,we.exports)),we.exports}var _t=Wn();const Yn='.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,.08);box-shadow:1px 0 #e6e6e6,-1px 0 #e6e6e6,0 1px #e6e6e6,0 -1px #e6e6e6,0 3px 13px #00000014}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1);animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none!important;box-shadow:none!important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:"";height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:#000000e6;fill:#000000e6;height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:#000000e6;fill:#000000e6}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:#0000001a}.numInputWrapper span:active{background:#0003}.numInputWrapper span:after{display:block;content:"";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:#00000080}.numInputWrapper:hover{background:#0000000d}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:#0000000d}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch�;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:#000000e6}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:#000000e6}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:#00000080;background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:#0000000d}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:#0000008a;line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:#3939394d;background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:#3939391a}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 #569ff7,5px 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:#3939394d;background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:"";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}';function bt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var he=bt();function Zt(i){he=i}var Ee={exec:()=>null};function R(i,t=""){let e=typeof i=="string"?i:i.source,a={replace:(n,o)=>{let s=typeof o=="string"?o:o.source;return s=s.replace(K.caret,"$1"),e=e.replace(n,s),a},getRegex:()=>new RegExp(e,t)};return a}var Un=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),K={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:i=>new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}#`),htmlBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}<(?:[a-z].*>|!--)`,"i")},Zn=/^(?:[ \t]*(?:\n|$))+/,Vn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gn=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Me=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Kn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,gt=/(?:[*+-]|\d{1,9}[.)])/,Vt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Gt=R(Vt).replace(/bull/g,gt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Qn=R(Vt).replace(/bull/g,gt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),vt=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xn=/^[^\n]+/,yt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ei=R(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",yt).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ti=R(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,gt).getRegex(),Qe="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",kt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ni=R("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",kt).replace("tag",Qe).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Kt=R(vt).replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qe).getRegex(),ii=R(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Kt).getRegex(),xt={blockquote:ii,code:Vn,def:ei,fences:Gn,heading:Kn,hr:Me,html:ni,lheading:Gt,list:ti,newline:Zn,paragraph:Kt,table:Ee,text:Xn},$t=R("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qe).getRegex(),ai={...xt,lheading:Qn,table:$t,paragraph:R(vt).replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$t).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qe).getRegex()},ri={...xt,html:R(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",kt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ee,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:R(vt).replace("hr",Me).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Gt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},oi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,li=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Qt=/^( {2,}|\\)\n(?!\s*$)/,si=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xe=/[\p{P}\p{S}]/u,wt=/[\s\p{P}\p{S}]/u,Xt=/[^\s\p{P}\p{S}]/u,ci=R(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wt).getRegex(),en=/(?!~)[\p{P}\p{S}]/u,di=/(?!~)[\s\p{P}\p{S}]/u,ui=/(?:[^\s\p{P}\p{S}]|~)/u,pi=R(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Un?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),tn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,fi=R(tn,"u").replace(/punct/g,Xe).getRegex(),hi=R(tn,"u").replace(/punct/g,en).getRegex(),nn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mi=R(nn,"gu").replace(/notPunctSpace/g,Xt).replace(/punctSpace/g,wt).replace(/punct/g,Xe).getRegex(),bi=R(nn,"gu").replace(/notPunctSpace/g,ui).replace(/punctSpace/g,di).replace(/punct/g,en).getRegex(),gi=R("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Xt).replace(/punctSpace/g,wt).replace(/punct/g,Xe).getRegex(),vi=R(/\\(punct)/,"gu").replace(/punct/g,Xe).getRegex(),yi=R(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ki=R(kt).replace("(?:-->|$)","-->").getRegex(),xi=R("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ki).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ve=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,wi=R(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ve).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),an=R(/^!?\[(label)\]\[(ref)\]/).replace("label",Ve).replace("ref",yt).getRegex(),rn=R(/^!?\[(ref)\](?:\[\])?/).replace("ref",yt).getRegex(),Ci=R("reflink|nolink(?!\\()","g").replace("reflink",an).replace("nolink",rn).getRegex(),jt=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ct={_backpedal:Ee,anyPunctuation:vi,autolink:yi,blockSkip:pi,br:Qt,code:li,del:Ee,emStrongLDelim:fi,emStrongRDelimAst:mi,emStrongRDelimUnd:gi,escape:oi,link:wi,nolink:rn,punctuation:ci,reflink:an,reflinkSearch:Ci,tag:xi,text:si,url:Ee},Di={...Ct,link:R(/^!?\[(label)\]\((.*?)\)/).replace("label",Ve).getRegex(),reflink:R(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ve).getRegex()},ft={...Ct,emStrongRDelimAst:bi,emStrongLDelim:hi,url:R(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",jt).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:R(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",jt).getRegex()},Ei={...ft,br:R(Qt).replace("{2,}","*").getRegex(),text:R(ft.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ze={normal:xt,gfm:ai,pedantic:ri},ke={normal:Ct,gfm:ft,breaks:Ei,pedantic:Di},Si={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Bt=i=>Si[i];function se(i,t){if(t){if(K.escapeTest.test(i))return i.replace(K.escapeReplace,Bt)}else if(K.escapeTestNoEncode.test(i))return i.replace(K.escapeReplaceNoEncode,Bt);return i}function Ht(i){try{i=encodeURI(i).replace(K.percentDecode,"%")}catch{return null}return i}function qt(i,t){let e=i.replace(K.findPipe,(o,s,d)=>{let c=!1,m=s;for(;--m>=0&&d[m]==="\\";)c=!c;return c?"|":" |"}),a=e.split(K.splitPipe),n=0;if(a[0].trim()||a.shift(),a.length>0&&!a.at(-1)?.trim()&&a.pop(),t)if(a.length>t)a.splice(t);else for(;a.length<t;)a.push("");for(;n<a.length;n++)a[n]=a[n].trim().replace(K.slashPipe,"|");return a}function xe(i,t,e){let a=i.length;if(a===0)return"";let n=0;for(;n<a&&i.charAt(a-n-1)===t;)n++;return i.slice(0,a-n)}function Mi(i,t){if(i.indexOf(t[1])===-1)return-1;let e=0;for(let a=0;a<i.length;a++)if(i[a]==="\\")a++;else if(i[a]===t[0])e++;else if(i[a]===t[1]&&(e--,e<0))return a;return e>0?-2:-1}function Jt(i,t,e,a,n){let o=t.href,s=t.title||null,d=i[1].replace(n.other.outputLinkReplace,"$1");a.state.inLink=!0;let c={type:i[0].charAt(0)==="!"?"image":"link",raw:e,href:o,title:s,text:d,tokens:a.inlineTokens(d)};return a.state.inLink=!1,c}function Ai(i,t,e){let a=i.match(e.other.indentCodeCompensation);if(a===null)return t;let n=a[1];return t.split(`
`).map(o=>{let s=o.match(e.other.beginningSpace);if(s===null)return o;let[d]=s;return d.length>=n.length?o.slice(n.length):o}).join(`
`)}var Ge=class{options;rules;lexer;constructor(i){this.options=i||he}space(i){let t=this.rules.block.newline.exec(i);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(i){let t=this.rules.block.code.exec(i);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:xe(e,`
`)}}}fences(i){let t=this.rules.block.fences.exec(i);if(t){let e=t[0],a=Ai(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:a}}}heading(i){let t=this.rules.block.heading.exec(i);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let a=xe(e,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(e=a.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(i){let t=this.rules.block.hr.exec(i);if(t)return{type:"hr",raw:xe(t[0],`
`)}}blockquote(i){let t=this.rules.block.blockquote.exec(i);if(t){let e=xe(t[0],`
`).split(`
`),a="",n="",o=[];for(;e.length>0;){let s=!1,d=[],c;for(c=0;c<e.length;c++)if(this.rules.other.blockquoteStart.test(e[c]))d.push(e[c]),s=!0;else if(!s)d.push(e[c]);else break;e=e.slice(c);let m=d.join(`
`),f=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${m}`:m,n=n?`${n}
${f}`:f;let v=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=v,e.length===0)break;let g=o.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let x=g,M=x.raw+`
`+e.join(`
`),E=this.blockquote(M);o[o.length-1]=E,a=a.substring(0,a.length-x.raw.length)+E.raw,n=n.substring(0,n.length-x.text.length)+E.text;break}else if(g?.type==="list"){let x=g,M=x.raw+`
`+e.join(`
`),E=this.list(M);o[o.length-1]=E,a=a.substring(0,a.length-g.raw.length)+E.raw,n=n.substring(0,n.length-x.raw.length)+E.raw,e=M.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:o,text:n}}}list(i){let t=this.rules.block.list.exec(i);if(t){let e=t[1].trim(),a=e.length>1,n={type:"list",raw:"",ordered:a,start:a?+e.slice(0,-1):"",loose:!1,items:[]};e=a?`\\d{1,9}\\${e.slice(-1)}`:`\\${e}`,this.options.pedantic&&(e=a?e:"[*+-]");let o=this.rules.other.listItemRegex(e),s=!1;for(;i;){let c=!1,m="",f="";if(!(t=o.exec(i))||this.rules.block.hr.test(i))break;m=t[0],i=i.substring(m.length);let v=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),g=i.split(`
`,1)[0],x=!v.trim(),M=0;if(this.options.pedantic?(M=2,f=v.trimStart()):x?M=t[1].length+1:(M=t[2].search(this.rules.other.nonSpaceChar),M=M>4?1:M,f=v.slice(M),M+=t[1].length),x&&this.rules.other.blankLine.test(g)&&(m+=g+`
`,i=i.substring(g.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex(M),B=this.rules.other.hrRegex(M),O=this.rules.other.fencesBeginRegex(M),A=this.rules.other.headingBeginRegex(M),N=this.rules.other.htmlBeginRegex(M);for(;i;){let h=i.split(`
`,1)[0],w;if(g=h,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),w=g):w=g.replace(this.rules.other.tabCharGlobal,"    "),O.test(g)||A.test(g)||N.test(g)||E.test(g)||B.test(g))break;if(w.search(this.rules.other.nonSpaceChar)>=M||!g.trim())f+=`
`+w.slice(M);else{if(x||v.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||O.test(v)||A.test(v)||B.test(v))break;f+=`
`+g}!x&&!g.trim()&&(x=!0),m+=h+`
`,i=i.substring(h.length+1),v=w.slice(M)}}n.loose||(s?n.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(s=!0)),n.items.push({type:"list_item",raw:m,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),n.raw+=m}let d=n.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c of n.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let m=this.rules.other.listTaskCheckbox.exec(c.raw);if(m){let f={type:"checkbox",raw:m[0]+" ",checked:m[0]!=="[ ]"};c.checked=f.checked,n.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!n.loose){let m=c.tokens.filter(v=>v.type==="space"),f=m.length>0&&m.some(v=>this.rules.other.anyLine.test(v.raw));n.loose=f}}if(n.loose)for(let c of n.items){c.loose=!0;for(let m of c.tokens)m.type==="text"&&(m.type="paragraph")}return n}}html(i){let t=this.rules.block.html.exec(i);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(i){let t=this.rules.block.def.exec(i);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:a,title:n}}}table(i){let t=this.rules.block.table.exec(i);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let e=qt(t[1]),a=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(e.length===a.length){for(let s of a)this.rules.other.tableAlignRight.test(s)?o.align.push("right"):this.rules.other.tableAlignCenter.test(s)?o.align.push("center"):this.rules.other.tableAlignLeft.test(s)?o.align.push("left"):o.align.push(null);for(let s=0;s<e.length;s++)o.header.push({text:e[s],tokens:this.lexer.inline(e[s]),header:!0,align:o.align[s]});for(let s of n)o.rows.push(qt(s,o.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:o.align[c]})));return o}}lheading(i){let t=this.rules.block.lheading.exec(i);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(i){let t=this.rules.block.paragraph.exec(i);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(i){let t=this.rules.block.text.exec(i);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(i){let t=this.rules.inline.escape.exec(i);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(i){let t=this.rules.inline.tag.exec(i);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(i){let t=this.rules.inline.link.exec(i);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let o=xe(e.slice(0,-1),"\\");if((e.length-o.length)%2===0)return}else{let o=Mi(t[2],"()");if(o===-2)return;if(o>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let a=t[2],n="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(a);o&&(a=o[1],n=o[3])}else n=t[3]?t[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?a=a.slice(1):a=a.slice(1,-1)),Jt(t,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(i,t){let e;if((e=this.rules.inline.reflink.exec(i))||(e=this.rules.inline.nolink.exec(i))){let a=(e[2]||e[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=t[a.toLowerCase()];if(!n){let o=e[0].charAt(0);return{type:"text",raw:o,text:o}}return Jt(e,n,e[0],this.lexer,this.rules)}}emStrong(i,t,e=""){let a=this.rules.inline.emStrongLDelim.exec(i);if(!(!a||a[3]&&e.match(this.rules.other.unicodeAlphaNumeric))&&(!(a[1]||a[2])||!e||this.rules.inline.punctuation.exec(e))){let n=[...a[0]].length-1,o,s,d=n,c=0,m=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*i.length+n);(a=m.exec(t))!=null;){if(o=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!o)continue;if(s=[...o].length,a[3]||a[4]){d+=s;continue}else if((a[5]||a[6])&&n%3&&!((n+s)%3)){c+=s;continue}if(d-=s,d>0)continue;s=Math.min(s,s+d+c);let f=[...a[0]][0].length,v=i.slice(0,n+a.index+f+s);if(Math.min(n,s)%2){let x=v.slice(1,-1);return{type:"em",raw:v,text:x,tokens:this.lexer.inlineTokens(x)}}let g=v.slice(2,-2);return{type:"strong",raw:v,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(i){let t=this.rules.inline.code.exec(i);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(e),n=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return a&&n&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(i){let t=this.rules.inline.br.exec(i);if(t)return{type:"br",raw:t[0]}}del(i){let t=this.rules.inline.del.exec(i);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(i){let t=this.rules.inline.autolink.exec(i);if(t){let e,a;return t[2]==="@"?(e=t[1],a="mailto:"+e):(e=t[1],a=e),{type:"link",raw:t[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}url(i){let t;if(t=this.rules.inline.url.exec(i)){let e,a;if(t[2]==="@")e=t[0],a="mailto:"+e;else{let n;do n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(n!==t[0]);e=t[0],t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(i){let t=this.rules.inline.text.exec(i);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},ae=class ht{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||he,this.options.tokenizer=this.options.tokenizer||new Ge,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:K,block:ze.normal,inline:ke.normal};this.options.pedantic?(e.block=ze.pedantic,e.inline=ke.pedantic):this.options.gfm&&(e.block=ze.gfm,this.options.breaks?e.inline=ke.breaks:e.inline=ke.gfm),this.tokenizer.rules=e}static get rules(){return{block:ze,inline:ke}}static lex(t,e){return new ht(e).lex(t)}static lexInline(t,e){return new ht(e).inlineTokens(t)}lex(t){t=t.replace(K.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let a=this.inlineQueue[e];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],a=!1){for(this.options.pedantic&&(t=t.replace(K.tabCharGlobal,"    ").replace(K.spaceLine,""));t;){let n;if(this.options.extensions?.block?.some(s=>(n=s.call({lexer:this},t,e))?(t=t.substring(n.raw.length),e.push(n),!0):!1))continue;if(n=this.tokenizer.space(t)){t=t.substring(n.raw.length);let s=e.at(-1);n.raw.length===1&&s!==void 0?s.raw+=`
`:e.push(n);continue}if(n=this.tokenizer.code(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.at(-1).src=s.text):e.push(n);continue}if(n=this.tokenizer.fences(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.heading(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.hr(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.blockquote(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.list(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.html(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.def(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},e.push(n));continue}if(n=this.tokenizer.table(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.lheading(t)){t=t.substring(n.raw.length),e.push(n);continue}let o=t;if(this.options.extensions?.startBlock){let s=1/0,d=t.slice(1),c;this.options.extensions.startBlock.forEach(m=>{c=m.call({lexer:this},d),typeof c=="number"&&c>=0&&(s=Math.min(s,c))}),s<1/0&&s>=0&&(o=t.substring(0,s+1))}if(this.state.top&&(n=this.tokenizer.paragraph(o))){let s=e.at(-1);a&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):e.push(n),a=o.length!==t.length,t=t.substring(n.raw.length);continue}if(n=this.tokenizer.text(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):e.push(n);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let a=t,n=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)c.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,n.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)o=n[2]?n[2].length:0,a=a.slice(0,n.index+o)+"["+"a".repeat(n[0].length-o-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);a=this.options.hooks?.emStrongMask?.call({lexer:this},a)??a;let s=!1,d="";for(;t;){s||(d=""),s=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,e))?(t=t.substring(c.raw.length),e.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=e.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):e.push(c);continue}if(c=this.tokenizer.emStrong(t,a,d)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),e.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),e.push(c);continue}let m=t;if(this.options.extensions?.startInline){let f=1/0,v=t.slice(1),g;this.options.extensions.startInline.forEach(x=>{g=x.call({lexer:this},v),typeof g=="number"&&g>=0&&(f=Math.min(f,g))}),f<1/0&&f>=0&&(m=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(m)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(d=c.raw.slice(-1)),s=!0;let f=e.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):e.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return e}},Ke=class{options;parser;constructor(i){this.options=i||he}space(i){return""}code({text:i,lang:t,escaped:e}){let a=(t||"").match(K.notSpaceStart)?.[0],n=i.replace(K.endingNewline,"")+`
`;return a?'<pre><code class="language-'+se(a)+'">'+(e?n:se(n,!0))+`</code></pre>
`:"<pre><code>"+(e?n:se(n,!0))+`</code></pre>
`}blockquote({tokens:i}){return`<blockquote>
${this.parser.parse(i)}</blockquote>
`}html({text:i}){return i}def(i){return""}heading({tokens:i,depth:t}){return`<h${t}>${this.parser.parseInline(i)}</h${t}>
`}hr(i){return`<hr>
`}list(i){let t=i.ordered,e=i.start,a="";for(let s=0;s<i.items.length;s++){let d=i.items[s];a+=this.listitem(d)}let n=t?"ol":"ul",o=t&&e!==1?' start="'+e+'"':"";return"<"+n+o+`>
`+a+"</"+n+`>
`}listitem(i){return`<li>${this.parser.parse(i.tokens)}</li>
`}checkbox({checked:i}){return"<input "+(i?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:i}){return`<p>${this.parser.parseInline(i)}</p>
`}table(i){let t="",e="";for(let n=0;n<i.header.length;n++)e+=this.tablecell(i.header[n]);t+=this.tablerow({text:e});let a="";for(let n=0;n<i.rows.length;n++){let o=i.rows[n];e="";for(let s=0;s<o.length;s++)e+=this.tablecell(o[s]);a+=this.tablerow({text:e})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+a+`</table>
`}tablerow({text:i}){return`<tr>
${i}</tr>
`}tablecell(i){let t=this.parser.parseInline(i.tokens),e=i.header?"th":"td";return(i.align?`<${e} align="${i.align}">`:`<${e}>`)+t+`</${e}>
`}strong({tokens:i}){return`<strong>${this.parser.parseInline(i)}</strong>`}em({tokens:i}){return`<em>${this.parser.parseInline(i)}</em>`}codespan({text:i}){return`<code>${se(i,!0)}</code>`}br(i){return"<br>"}del({tokens:i}){return`<del>${this.parser.parseInline(i)}</del>`}link({href:i,title:t,tokens:e}){let a=this.parser.parseInline(e),n=Ht(i);if(n===null)return a;i=n;let o='<a href="'+i+'"';return t&&(o+=' title="'+se(t)+'"'),o+=">"+a+"</a>",o}image({href:i,title:t,text:e,tokens:a}){a&&(e=this.parser.parseInline(a,this.parser.textRenderer));let n=Ht(i);if(n===null)return se(e);i=n;let o=`<img src="${i}" alt="${e}"`;return t&&(o+=` title="${se(t)}"`),o+=">",o}text(i){return"tokens"in i&&i.tokens?this.parser.parseInline(i.tokens):"escaped"in i&&i.escaped?i.text:se(i.text)}},Dt=class{strong({text:i}){return i}em({text:i}){return i}codespan({text:i}){return i}del({text:i}){return i}html({text:i}){return i}text({text:i}){return i}link({text:i}){return""+i}image({text:i}){return""+i}br(){return""}checkbox({raw:i}){return i}},re=class mt{options;renderer;textRenderer;constructor(t){this.options=t||he,this.options.renderer=this.options.renderer||new Ke,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Dt}static parse(t,e){return new mt(e).parse(t)}static parseInline(t,e){return new mt(e).parseInline(t)}parse(t){let e="";for(let a=0;a<t.length;a++){let n=t[a];if(this.options.extensions?.renderers?.[n.type]){let s=n,d=this.options.extensions.renderers[s.type].call({parser:this},s);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){e+=d||"";continue}}let o=n;switch(o.type){case"space":{e+=this.renderer.space(o);break}case"hr":{e+=this.renderer.hr(o);break}case"heading":{e+=this.renderer.heading(o);break}case"code":{e+=this.renderer.code(o);break}case"table":{e+=this.renderer.table(o);break}case"blockquote":{e+=this.renderer.blockquote(o);break}case"list":{e+=this.renderer.list(o);break}case"checkbox":{e+=this.renderer.checkbox(o);break}case"html":{e+=this.renderer.html(o);break}case"def":{e+=this.renderer.def(o);break}case"paragraph":{e+=this.renderer.paragraph(o);break}case"text":{e+=this.renderer.text(o);break}default:{let s='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return e}parseInline(t,e=this.renderer){let a="";for(let n=0;n<t.length;n++){let o=t[n];if(this.options.extensions?.renderers?.[o.type]){let d=this.options.extensions.renderers[o.type].call({parser:this},o);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){a+=d||"";continue}}let s=o;switch(s.type){case"escape":{a+=e.text(s);break}case"html":{a+=e.html(s);break}case"link":{a+=e.link(s);break}case"image":{a+=e.image(s);break}case"checkbox":{a+=e.checkbox(s);break}case"strong":{a+=e.strong(s);break}case"em":{a+=e.em(s);break}case"codespan":{a+=e.codespan(s);break}case"br":{a+=e.br(s);break}case"del":{a+=e.del(s);break}case"text":{a+=e.text(s);break}default:{let d='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return a}},Ce=class{options;block;constructor(i){this.options=i||he}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(i){return i}postprocess(i){return i}processAllTokens(i){return i}emStrongMask(i){return i}provideLexer(){return this.block?ae.lex:ae.lexInline}provideParser(){return this.block?re.parse:re.parseInline}},Ti=class{defaults=bt();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=re;Renderer=Ke;TextRenderer=Dt;Lexer=ae;Tokenizer=Ge;Hooks=Ce;constructor(...i){this.use(...i)}walkTokens(i,t){let e=[];for(let a of i)switch(e=e.concat(t.call(this,a)),a.type){case"table":{let n=a;for(let o of n.header)e=e.concat(this.walkTokens(o.tokens,t));for(let o of n.rows)for(let s of o)e=e.concat(this.walkTokens(s.tokens,t));break}case"list":{let n=a;e=e.concat(this.walkTokens(n.items,t));break}default:{let n=a;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(o=>{let s=n[o].flat(1/0);e=e.concat(this.walkTokens(s,t))}):n.tokens&&(e=e.concat(this.walkTokens(n.tokens,t)))}}return e}use(...i){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return i.forEach(e=>{let a={...e};if(a.async=this.defaults.async||a.async||!1,e.extensions&&(e.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let o=t.renderers[n.name];o?t.renderers[n.name]=function(...s){let d=n.renderer.apply(this,s);return d===!1&&(d=o.apply(this,s)),d}:t.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[n.level];o?o.unshift(n.tokenizer):t[n.level]=[n.tokenizer],n.start&&(n.level==="block"?t.startBlock?t.startBlock.push(n.start):t.startBlock=[n.start]:n.level==="inline"&&(t.startInline?t.startInline.push(n.start):t.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(t.childTokens[n.name]=n.childTokens)}),a.extensions=t),e.renderer){let n=this.defaults.renderer||new Ke(this.defaults);for(let o in e.renderer){if(!(o in n))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let s=o,d=e.renderer[s],c=n[s];n[s]=(...m)=>{let f=d.apply(n,m);return f===!1&&(f=c.apply(n,m)),f||""}}a.renderer=n}if(e.tokenizer){let n=this.defaults.tokenizer||new Ge(this.defaults);for(let o in e.tokenizer){if(!(o in n))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let s=o,d=e.tokenizer[s],c=n[s];n[s]=(...m)=>{let f=d.apply(n,m);return f===!1&&(f=c.apply(n,m)),f}}a.tokenizer=n}if(e.hooks){let n=this.defaults.hooks||new Ce;for(let o in e.hooks){if(!(o in n))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let s=o,d=e.hooks[s],c=n[s];Ce.passThroughHooks.has(o)?n[s]=m=>{if(this.defaults.async&&Ce.passThroughHooksRespectAsync.has(o))return(async()=>{let v=await d.call(n,m);return c.call(n,v)})();let f=d.call(n,m);return c.call(n,f)}:n[s]=(...m)=>{if(this.defaults.async)return(async()=>{let v=await d.apply(n,m);return v===!1&&(v=await c.apply(n,m)),v})();let f=d.apply(n,m);return f===!1&&(f=c.apply(n,m)),f}}a.hooks=n}if(e.walkTokens){let n=this.defaults.walkTokens,o=e.walkTokens;a.walkTokens=function(s){let d=[];return d.push(o.call(this,s)),n&&(d=d.concat(n.call(this,s))),d}}this.defaults={...this.defaults,...a}}),this}setOptions(i){return this.defaults={...this.defaults,...i},this}lexer(i,t){return ae.lex(i,t??this.defaults)}parser(i,t){return re.parse(i,t??this.defaults)}parseMarkdown(i){return(t,e)=>{let a={...e},n={...this.defaults,...a},o=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&a.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=i),n.async)return(async()=>{let s=n.hooks?await n.hooks.preprocess(t):t,d=await(n.hooks?await n.hooks.provideLexer():i?ae.lex:ae.lexInline)(s,n),c=n.hooks?await n.hooks.processAllTokens(d):d;n.walkTokens&&await Promise.all(this.walkTokens(c,n.walkTokens));let m=await(n.hooks?await n.hooks.provideParser():i?re.parse:re.parseInline)(c,n);return n.hooks?await n.hooks.postprocess(m):m})().catch(o);try{n.hooks&&(t=n.hooks.preprocess(t));let s=(n.hooks?n.hooks.provideLexer():i?ae.lex:ae.lexInline)(t,n);n.hooks&&(s=n.hooks.processAllTokens(s)),n.walkTokens&&this.walkTokens(s,n.walkTokens);let d=(n.hooks?n.hooks.provideParser():i?re.parse:re.parseInline)(s,n);return n.hooks&&(d=n.hooks.postprocess(d)),d}catch(s){return o(s)}}}onError(i,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,i){let a="<p>An error occurred:</p><pre>"+se(e.message+"",!0)+"</pre>";return t?Promise.resolve(a):a}if(t)return Promise.reject(e);throw e}}},fe=new Ti;function z(i,t){return fe.parse(i,t)}z.options=z.setOptions=function(i){return fe.setOptions(i),z.defaults=fe.defaults,Zt(z.defaults),z};z.getDefaults=bt;z.defaults=he;z.use=function(...i){return fe.use(...i),z.defaults=fe.defaults,Zt(z.defaults),z};z.walkTokens=function(i,t){return fe.walkTokens(i,t)};z.parseInline=fe.parseInline;z.Parser=re;z.parser=re.parse;z.Renderer=Ke;z.TextRenderer=Dt;z.Lexer=ae;z.lexer=ae.lex;z.Tokenizer=Ge;z.Hooks=Ce;z.parse=z;z.options;z.setOptions;z.use;z.walkTokens;z.parseInline;re.parse;ae.lex;if(!document.getElementById("ts-form-flatpickr-styles")){const i=document.createElement("style");i.id="ts-form-flatpickr-styles",i.textContent=Yn,document.head.appendChild(i)}class Ii extends HTMLElement{constructor(){super()}static get observedAttributes(){return["field-name","config","value","error"]}attributeChangedCallback(t,e,a){e!==a&&this.requestRender()}connectedCallback(){this.requestRender()}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}render(){this.innerHTML="";const t=this.getAttribute("field-name"),e=this.getAttribute("config"),a=this.getAttribute("value"),n=this.getAttribute("error");if(!t||!e)return;let o;try{o=JSON.parse(e)}catch(c){console.error("Invalid config for field",t,c);return}let s=a;try{a&&(a.startsWith("[")||a.startsWith("{")||a==="true"||a==="false")&&(s=JSON.parse(a))}catch{}const d=this.createField(t,o,s);if(this.appendChild(d),!document.getElementById("ts-form-field-styles")){const c=document.createElement("style");c.id="ts-form-field-styles",c.textContent=`
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
            `,this.appendChild(c)}if(!document.getElementById("ts-form-markdown-styles")){const c=document.createElement("style");c.id="ts-form-markdown-styles",c.textContent=`
                .markdown-content {
                    font-family: var(--sl-font-sans);
                    font-size: var(--sl-font-size-medium);
                    line-height: var(--sl-line-height-normal);
                    color: var(--sl-color-neutral-900);
                }
                .markdown-content h1, .markdown-content h2, .markdown-content h3, 
                .markdown-content h4, .markdown-content h5, .markdown-content h6 {
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                    font-weight: var(--sl-font-weight-bold);
                    line-height: var(--sl-line-height-dense);
                    color: var(--sl-color-neutral-1000);
                }
                .markdown-content h1 { font-size: var(--sl-font-size-2x-large); }
                .markdown-content h2 { font-size: var(--sl-font-size-x-large); }
                .markdown-content h3 { font-size: var(--sl-font-size-large); }
                .markdown-content p {
                    margin-bottom: 1em;
                }
                .markdown-content ul, .markdown-content ol {
                    margin-bottom: 1em;
                    padding-left: 1.5em;
                }
                .markdown-content li {
                    margin-bottom: 0.25em;
                }
                .markdown-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1em;
                }
                .markdown-content th, .markdown-content td {
                    padding: var(--sl-spacing-small);
                    border: 1px solid var(--sl-color-neutral-300);
                    text-align: left;
                }
                .markdown-content th {
                    background-color: var(--sl-color-neutral-100);
                    font-weight: var(--sl-font-weight-semibold);
                }
                .markdown-content code {
                    font-family: var(--sl-font-mono);
                    background-color: var(--sl-color-neutral-100);
                    padding: 0.2em 0.4em;
                    border-radius: var(--sl-border-radius-small);
                    font-size: 0.9em;
                }
                .markdown-content pre {
                    background-color: var(--sl-color-neutral-100);
                    padding: var(--sl-spacing-medium);
                    border-radius: var(--sl-border-radius-medium);
                    overflow-x: auto;
                    margin-bottom: 1em;
                }
                .markdown-content pre code {
                    padding: 0;
                    background-color: transparent;
                }
                .markdown-content blockquote {
                    margin: 1em 0;
                    padding-left: 1em;
                    border-left: 4px solid var(--sl-color-primary-500);
                    color: var(--sl-color-neutral-600);
                }
                .markdown-content a {
                    color: var(--sl-color-primary-600);
                    text-decoration: none;
                }
                .markdown-content a:hover {
                    text-decoration: underline;
                }
                .markdown-content > *:first-child {
                    margin-top: -0.25em !important;
                }
            `,this.appendChild(c)}if(o.type==="select"&&Promise.all([customElements.whenDefined("sl-select"),customElements.whenDefined("sl-option")]).then(()=>{requestAnimationFrame(()=>{o.multiple&&Array.isArray(s)?d.value=s:d.value=s||""})}),n)if(d.classList.add("input-invalid"),o.type==="file"||o.type==="image")d.setAttribute("error",n);else{const c=document.createElement("div");c.className="error-message",c.textContent=n,this.appendChild(c)}else(o.type==="file"||o.type==="image")&&d.removeAttribute("error"),d.classList.remove("input-invalid");o.autofocus&&requestAnimationFrame(()=>{this.setFocus()}),d&&d.addEventListener("keydown",c=>this.handleKeyDown(c,o,t))}setFocus(){let t=this.firstElementChild;if(t&&t.tagName==="DIV"){const e=t.querySelector("sl-input, sl-checkbox, sl-switch, sl-range, sl-radio-group, sl-select, textarea, input, ts-combobox, ts-relationship-picker, sl-button, sl-button-group");e&&(t=e)}t&&(typeof t.setFocus=="function"?t.setFocus():typeof t.focus=="function"&&t.focus())}handleKeyDown(t,e,a){if(t.key==="Enter")e.enterAction&&(t.preventDefault(),t.stopPropagation(),this.handleFieldChange(t,a),this.dispatchEvent(new CustomEvent("form-key-action",{detail:{key:"Enter",action:e.enterAction,field:a},bubbles:!0,composed:!0})));else if(t.key==="Escape"&&e.escapeAction)if(t.preventDefault(),t.stopPropagation(),e.escapeAction==="clear"){const n=t.target;"value"in n&&(e.type==="select"&&n.multiple?n.value=[]:n.value="",this.handleFieldChange({target:n},a))}else this.dispatchEvent(new CustomEvent("form-key-action",{detail:{key:"Escape",action:e.escapeAction,field:a},bubbles:!0,composed:!0}))}createField(t,e,a){let n;switch(e.type){case"textarea":n=document.createElement("sl-textarea"),n.value=a||"";break;case"password":n=document.createElement("sl-input"),n.type="password",n.passwordToggle=!0,n.setAttribute("autocomplete","current-password"),n.value=a||"";break;case"checkbox":const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column";const s=document.createElement("div");return s.style.height="calc(var(--sl-input-label-font-size-medium) + var(--sl-spacing-2x-small))",s.style.marginBottom="var(--sl-spacing-2x-small)",o.appendChild(s),n=document.createElement("sl-checkbox"),e.hideLabel||(n.textContent=e.label),n.checked=a===!0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),o.appendChild(n),o;case"switch":const d=document.createElement("div");if(d.style.display="flex",d.style.flexDirection="column",d.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",d.appendChild(h)}const c=document.createElement("div");return c.style.display="flex",c.style.alignItems="center",c.style.minHeight="var(--sl-input-height-medium)",c.style.paddingLeft="2px",n=document.createElement("sl-switch"),n.checked=a===!0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),c.appendChild(n),d.appendChild(c),d;case"slider":const m=document.createElement("div");if(m.style.display="flex",m.style.flexDirection="column",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",h.style.marginBottom="var(--sl-spacing-2x-small)",m.appendChild(h)}return n=document.createElement("sl-range"),e.min&&(n.min=e.min),e.max&&(n.max=e.max),e.step&&(n.step=e.step),n.value=a||e.min||0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),m.appendChild(n),m;case"combobox":n=document.createElement("ts-combobox"),n.setAttribute("label",e.label||""),n.setAttribute("value",a||""),e.options&&n.setAttribute("options",JSON.stringify(e.options)),e.placeholder&&n.setAttribute("placeholder",e.placeholder),e.disabled&&n.setAttribute("disabled",""),e.allowCustom&&n.setAttribute("allow-custom",""),e.allowEmpty&&n.setAttribute("allow-empty","");break;case"file":case"image":n=document.createElement("ts-file-upload"),e.hideLabel||n.setAttribute("label",e.label||"Upload file"),e.multiple&&n.setAttribute("multiple","true"),e.type==="image"?n.setAttribute("accept","image/*"):e.accept&&n.setAttribute("accept",e.accept);break;case"button":return n=document.createElement("sl-button"),n.variant=e.variant||"primary",n.textContent=e.label||"Button",n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:e.action||"click"},bubbles:!0,composed:!0}))}),n;case"button-group":let f;return e.variant==="process"?(f=document.createElement("div"),f.className="process-group",f.style.display="flex",f.style.gap="0"):(f=document.createElement("sl-button-group"),f.style.gap="0.5rem"),e.options&&e.options.forEach(h=>{const[w,y="true",_="default",F=""]=h.split("/"),P=document.createElement("sl-button");P.dataset.value=w;const H=a===w?_||"primary":_||"default";P.variant=H,P.setAttribute("data-variant",H),P.textContent=F||w,P.disabled=y==="false",P.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("field-change",{detail:{field:t,value:w},bubbles:!0,composed:!0}))}),f.appendChild(P)}),f;case"radio":const v=document.createElement("div");if(v.style.display="flex",v.style.flexDirection="column",v.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",v.appendChild(h)}return n=document.createElement("sl-radio-group"),e.options&&e.options.forEach(h=>{const w=document.createElement("sl-radio");w.value=h.value,w.textContent=h.label,w.style.marginBottom="var(--sl-spacing-2x-small)",n.appendChild(w)}),setTimeout(()=>{n.value=a||""},0),n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),v.appendChild(n),v;case"number":n=document.createElement("sl-input"),n.type="text",n.inputMode="decimal",n.classList.add("text-right"),n.setAttribute("autocomplete","off"),n.addEventListener("sl-input",()=>{const h=n.value,w=h.replace(/[^0-9.,+\-*/^() ]/g,"");h!==w&&(n.value=w)}),a&&(n.value=this.formatNumber(a,e.roundTo)),n.addEventListener("sl-focus",()=>{n.value=n.value.replace(/\s/g,""),setTimeout(()=>n.select(),0)}),n.addEventListener("sl-blur",()=>{let h=n.value;if(/[+\-*/^()]/.test(h)){const w=this.evaluateMathExpression(h);if(w===null){n.value="";return}h=w}n.value=this.formatNumber(h,e.roundTo)}),n.addEventListener("keydown",h=>{h.key==="Enter"&&n.dispatchEvent(new Event("sl-blur"))}),Object.defineProperty(n,"submitValue",{get:()=>{if(!n.value)return null;let h=n.value;if(/[+\-*/^()]/.test(h)){const _=this.evaluateMathExpression(h);_!==null&&(h=_)}const w=h.toString().replace(/\s/g,"").replace(",",".");if(w==="")return null;let y=parseFloat(w);return isNaN(y)?null:(e.roundTo!==void 0&&e.roundTo!==null&&e.roundTo!==""&&(y=this.roundNumber(y,e.roundTo)),y)}});break;case"date":n=document.createElement("sl-input"),n.type="text",n.classList.add("text-right"),n.classList.add("force-prefix-spacing"),n.setAttribute("autocomplete","off");const g=document.createElement("sl-icon");g.name="calendar3",g.slot="prefix",g.style.cursor="pointer",g.style.fontSize="var(--sl-font-size-large)",n.appendChild(g),n.value=a?this.formatDate(a):"",n.isoValue=a||null,n.addEventListener("sl-focus",()=>{setTimeout(()=>n.select(),0)}),setTimeout(()=>{const h=n.shadowRoot?n.shadowRoot.querySelector("input"):n;if(h){const w=J(h,{locale:_t.Czech,defaultDate:a,dateFormat:"d. m. Y",allowInput:!0,clickOpens:!1,onChange:(y,_)=>{if(n.value=_,y.length>0){const F=y[0],P=F.getFullYear(),H=String(F.getMonth()+1).padStart(2,"0"),W=String(F.getDate()).padStart(2,"0");n.isoValue=`${P}-${H}-${W}`}else n.isoValue=null;n.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(y,_)=>{if(!y)return null;if(typeof y=="string"&&/^\d{4}-\d{2}-\d{2}/.test(y))return new Date(y);const F=y.replace(/[^0-9]/g,"");if(F.length===8){const W=F.substring(0,2),Y=F.substring(2,4),j=F.substring(4,8);return new Date(`${j}-${Y}-${W}`)}if(F.length===4){const W=F.substring(0,2),Y=F.substring(2,4),j=new Date().getFullYear();return new Date(`${j}-${Y}-${W}`)}const P=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})$/);if(P)return new Date(`${P[3]}-${P[2]}-${P[1]}`);const H=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(H){const W=new Date().getFullYear();return new Date(`${W}-${H[2]}-${H[1]}`)}return J.parseDate(y,_)}});g.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),w.open()}),n.addEventListener("keydown",y=>{y.key==="Enter"&&w.setDate(n.value,!0,w.config.dateFormat)})}},0),Object.defineProperty(n,"submitValue",{get:()=>n.isoValue});break;case"datetime":n=document.createElement("sl-input"),n.type="text",n.classList.add("text-right"),n.classList.add("force-prefix-spacing"),n.setAttribute("autocomplete","off");const x=document.createElement("sl-icon");x.name="calendar3",x.slot="prefix",x.style.cursor="pointer",x.style.fontSize="var(--sl-font-size-large)",n.appendChild(x),n.value=a?this.formatDateTime(a):"",n.isoValue=a||null,n.addEventListener("sl-focus",()=>{setTimeout(()=>n.select(),0)}),setTimeout(()=>{const h=n.shadowRoot?n.shadowRoot.querySelector("input"):n;if(h){const w=J(h,{locale:_t.Czech,defaultDate:a,enableTime:!0,dateFormat:"d. m. Y H:i",time_24hr:!0,allowInput:!0,clickOpens:!1,onChange:(y,_)=>{if(n.value=_,y.length>0){const F=y[0],P=F.getFullYear(),H=String(F.getMonth()+1).padStart(2,"0"),W=String(F.getDate()).padStart(2,"0"),Y=String(F.getHours()).padStart(2,"0"),j=String(F.getMinutes()).padStart(2,"0"),U=String(F.getSeconds()).padStart(2,"0");n.isoValue=`${P}-${H}-${W}T${Y}:${j}:${U}`}else n.isoValue=null;n.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(y,_)=>{const F=y.replace(/[^0-9]/g,"");if(F.length>=8){const W=F.substring(0,2),Y=F.substring(2,4),j=F.substring(4,8);let U="00",Z="00";return F.length>=10&&(U=F.substring(8,10)),F.length>=12&&(Z=F.substring(10,12)),new Date(`${j}-${Y}-${W}T${U}:${Z}:00`)}const P=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})(?:\s+(\d{1,2})[:.](\d{1,2}))?$/);if(P){const W=P[1],Y=P[2],j=P[3],U=P[4]||"00",Z=P[5]||"00";return new Date(`${j}-${Y}-${W}T${U}:${Z}:00`)}const H=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(H){const W=new Date().getFullYear();return new Date(`${W}-${H[2]}-${H[1]}T00:00:00`)}return J.parseDate(y,_)}});x.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),w.open()}),n.addEventListener("keydown",y=>{y.key==="Enter"&&w.setDate(n.value,!0,w.config.dateFormat)})}},0),Object.defineProperty(n,"submitValue",{get:()=>n.isoValue});break;case"select":n=document.createElement("sl-select"),n.hoist=!0,n.label=e.label,e.multiple&&(n.multiple=!0,n.clearable=!0),e.options&&e.options.forEach(h=>{const w=document.createElement("sl-option");w.value=h.value,w.textContent=h.label,n.appendChild(w)});break;case"relationship":n=document.createElement("ts-relationship-picker"),n.setAttribute("target-entity",e.targetEntity||""),n.setAttribute("mode",e.mode||"single"),e.label&&!e.hideLabel&&n.setAttribute("label",e.label),e.displayFields&&n.setAttribute("display-fields",JSON.stringify(e.displayFields)),e.chipDisplayFields&&n.setAttribute("chip-display-fields",JSON.stringify(e.chipDisplayFields)),e.valueField&&n.setAttribute("value-field",e.valueField),e.options&&n.setAttribute("options",JSON.stringify(e.options)),a&&n.setAttribute("value",JSON.stringify(a));break;case"separator":return n=document.createElement("div"),n.className="form-separator",n.textContent=e.label||"",n;case"infobox":n=document.createElement("sl-alert"),n.variant=e.variant||"primary",n.open=!0,e.closable&&(n.closable=!0);let M="";return e.icon&&(M+=`<sl-icon slot="icon" name="${e.icon}"></sl-icon>`),a?M+=a:e.content&&(M+=e.content),n.innerHTML=M,n;case"markdown":n=document.createElement("div"),n.className="markdown-content";const E=a||e.content||"";return n.innerHTML=z.parse(E),n;case"table":if(n=document.createElement("ts-table"),e.columns){const h=e.columns.map((y,_)=>({...y,key:y.field||y.key,title:y.header||y.title||y.label,visible:y.visible!==!1,order:y.order!==void 0?y.order:_}));n.setAttribute("column-definitions",JSON.stringify(h));const w=h.filter(y=>y.visible).map(y=>y.key).join(",");n.setAttribute("visible-columns",w)}["show-create-button","show-import-button","show-export-button","show-column-selector","enable-sorting","enable-filtering","enable-column-resizing","enable-column-reordering","enable-selection","enable-row-menu","enable-clickable-rows","enable-clickable-columns","enable-pagination"].forEach(h=>{const w=h.replace(/-([a-z])/g,y=>y[1].toUpperCase());e[w]!==void 0&&n.setAttribute(h,String(e[w]))}),["single-item-actions","multiple-items-actions","unhideable-columns","unshowable-columns","columns-required-for-import"].forEach(h=>{const w=h.replace(/-([a-z])/g,y=>y[1].toUpperCase());e[w]&&n.setAttribute(h,e[w])}),e.itemsPerPage&&n.setAttribute("items-per-page",e.itemsPerPage),e.itemsPerPageOptions&&n.setAttribute("items-per-page-options",e.itemsPerPageOptions),e.predefinedFilters&&n.setAttribute("predefined-filters",JSON.stringify(e.predefinedFilters)),e.settings&&n.setAttribute("settings",JSON.stringify(e.settings));const A=a||e.data;A&&n.setAttribute("table-data",JSON.stringify(A)),["create-new-record","selection-action-activated","do-import"].forEach(h=>{n.addEventListener(h,w=>{w.stopPropagation(),this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:h,originalDetail:w.detail},bubbles:!0,composed:!0}))})}),customElements.whenDefined("ts-table").then(()=>{setTimeout(()=>{typeof n.run=="function"&&n.run()},0)});break;default:n=document.createElement("sl-input"),n.type=e.type||"text",n.setAttribute("autocomplete","off"),n.value=a||""}return n.name=t,e.hideLabel||e.type!=="checkbox"&&e.type!=="radio"&&e.type!=="file"&&e.type!=="image"&&e.type!=="infobox"&&e.type!=="markdown"&&(n.label=e.label),e.required&&(n.required=!0),n.addEventListener("sl-change",o=>this.handleFieldChange(o,t)),n}handleFieldChange(t,e){const a=t.target;let n;a.submitValue!==void 0?n=a.submitValue:a.tagName==="SL-CHECKBOX"||a.tagName==="SL-SWITCH"?n=a.checked:a.tagName==="TS-FILE-UPLOAD"?n=t.detail.files:a.tagName==="TS-RELATIONSHIP-PICKER"||a.tagName==="TS-COMBOBOX"?n=t.detail.value:a.type==="file"?n=a.files:n=a.value,this.dispatchEvent(new CustomEvent("field-change",{detail:{field:e,value:n},bubbles:!0,composed:!0}))}showImportResults(t){const e=this.querySelector("ts-table");e&&typeof e.showImportResults=="function"?e.showImportResults(t):console.warn("Inner ts-table not found or does not support showImportResults")}evaluateMathExpression(t){try{let e=t.replace(/,/g,".");if(e=e.replace(/\^/g,"**"),/[^0-9.+\-*/^() ]/.test(e))return null;const a=new Function("return "+e)();return!isFinite(a)||isNaN(a)?null:a}catch{return null}}roundNumber(t,e){if(e==null||e==="")return t;const a=1/parseFloat(e);return Math.round(t*a)/a}formatNumber(t,e){if(t==null||t==="")return"";let a=parseFloat(t.toString().replace(/\s/g,"").replace(",","."));if(isNaN(a))return t;e!=null&&e!==""&&(a=this.roundNumber(a,e));let n={};if(e&&e<1){const o=-Math.floor(Math.log10(parseFloat(e)));n={minimumFractionDigits:o,maximumFractionDigits:o}}return a.toLocaleString("cs-CZ",n)}formatDate(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const a=e.getDate(),n=e.getMonth()+1,o=e.getFullYear();return`${a}. ${n}. ${o}`}catch{return t}}formatDateTime(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const a=e.getDate(),n=e.getMonth()+1,o=e.getFullYear(),s=String(e.getHours()).padStart(2,"0"),d=String(e.getMinutes()).padStart(2,"0");return`${a}. ${n}. ${o} ${s}:${d}`}catch{return t}}}customElements.define("ts-form-field",Ii);class Fi extends HTMLElement{constructor(){super(),this.formData={},this.validationErrors={},this.lastAction=null,this.buttons={},this.buttons={},this.buttons={},this.isInitialized=!1}static get observedAttributes(){return["layout","fields","errors","buttons","values","active-tab"]}attributeChangedCallback(t,e,a){e!==a&&(t==="active-tab"?this.switchTab(a):this.isInitialized&&this.requestRender())}run(){this.isInitialized=!0,this.render();const t=new Set;this.querySelectorAll("*").forEach(o=>{const s=o.tagName.toLowerCase();(s.startsWith("sl-")||s.startsWith("ts-"))&&t.add(s)});const a=Array.from(t).map(o=>customElements.whenDefined(o)),n=new Promise(o=>setTimeout(o,2e3));Promise.race([Promise.all(a),n]).then(()=>{const o=this.querySelector(".ts-form-container"),s=this.querySelector(".loader");o&&requestAnimationFrame(()=>{o.style.opacity="1",s&&s.classList.add("hidden")})}).catch(()=>{const o=this.querySelector(".ts-form-container"),s=this.querySelector(".loader");o&&(o.style.opacity="1",s&&s.classList.add("hidden"))})}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}switchTab(t){const e=this.querySelector("sl-tab-group");if(e){const a=`tab-${t}`;e.show(a)}}connectedCallback(){this.ensureStructure(),this.setupEventListeners()}ensureStructure(){if(this.querySelector(".ts-form-container"))return;const t=document.createElement("style");t.textContent=`
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
                margin: 0.5rem 0 0.5rem 0;
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
        `,this.appendChild(e);const a=document.createElement("div");a.className="ts-form-container",this.appendChild(a)}setupEventListeners(){this.addEventListener("field-change",t=>{t.stopPropagation();const{field:e,value:a}=t.detail;this.formData[e]!==a&&(this.formData[e]=a,this.dispatchEvent(new CustomEvent("form-changed",{detail:{field:e,value:a,formData:this.formData},bubbles:!0,composed:!0})))}),this.addEventListener("form-field-action",t=>{}),this.addEventListener("form-key-action",t=>{t.stopPropagation();const{action:e,field:a}=t.detail;if(e){if(e.startsWith("focus:")){const n=e.split(":")[1],o=this.querySelector(`ts-form-field[field-name="${n}"]`);o&&typeof o.setFocus=="function"?requestAnimationFrame(()=>o.setFocus()):console.warn(`Target field for focus not found: ${n}`)}else if(e.startsWith("click:")||e==="submit"){const n=e==="submit"?"submit":e.split(":")[1];let o=this.buttons[n];!o&&n==="submit"&&(o=Object.values(this.buttons).find(d=>d.variant==="primary"&&!d.disabled&&d.style.display!=="none")),o&&!o.disabled&&o.style.display!=="none"?o.click():console.warn(`Button for action '${n}' not found or disabled`)}else if(e==="next"){const n=Array.from(this.querySelectorAll("ts-form-field")),o=n.findIndex(s=>s.getAttribute("field-name")===a);if(o>=0&&o<n.length-1){const s=n[o+1];s&&typeof s.setFocus=="function"&&s.setFocus()}}}}),this.addEventListener("form-table-action",t=>{})}showImportResults(t,e){const a=this.querySelector(`ts-form-field[field-name="${t}"]`);a&&typeof a.showImportResults=="function"?a.showImportResults(e):console.warn(`Field ${t} not found or does not support showImportResults`)}render(){const t=this.getAttribute("layout"),e=this.getAttribute("fields"),a=this.getAttribute("errors"),n=this.getAttribute("buttons"),o=this.getAttribute("values");if(!(!t||!e))try{const s=JSON.parse(t),d=JSON.parse(e);this.fieldsConfig=d;const c=a?JSON.parse(a):{},m=n?JSON.parse(n):[],f=o?JSON.parse(o):{};this.formData={...this.formData,...f},this.ensureStructure();const v=this.querySelector(".ts-form-container");v.innerHTML="";const g=document.createElement("form");if(g.noValidate=!0,s.tabs){const A=document.createElement("sl-tab-group");let N=!1;if(s.tabs.forEach((h,w)=>{const y=document.createElement("sl-tab");y.slot="nav",y.panel=`tab-${w}`,y.textContent=h.label;const _=this.getAttribute("active-tab");_!==null?parseInt(_)===w&&(y.active=!0):w===0&&(y.active=!0),h.rows.some(Y=>Y.some(j=>c[j.field]))&&(y.classList.add("invalid"),N=!0);const P=document.createElement("sl-tab-panel");P.name=`tab-${w}`,_!==null?parseInt(_)===w&&(P.active=!0):w===0&&(P.active=!0);let H=!1;if(h.rows&&h.rows.length===1&&h.rows[0].length===1){const Y=h.rows[0][0].field;d[Y]&&d[Y].type==="table"&&(H=!0)}const W=document.createElement("div");W.className="tab-content",H&&W.classList.add("full-height"),h.rows&&h.rows.forEach(Y=>{const j=document.createElement("div");j.className="form-row",j.style.gridTemplateColumns=Y.map(U=>U.width||"1fr").join(" "),Y.forEach(U=>{const Z=document.createElement("div");if(Z.className="form-col",U.align&&(Z.style.display="flex",Z.style.justifyContent=U.align==="right"?"flex-end":U.align==="center"?"center":"flex-start"),U.type==="empty"){j.appendChild(Z);return}if(U.type==="separator"){const ne=document.createElement("ts-form-field");ne.setAttribute("config",JSON.stringify({type:"separator",label:U.label})),ne.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),Z.appendChild(ne),j.appendChild(Z);return}const Ae=d[U.field];if(Ae){const ne=document.createElement("ts-form-field");ne.setAttribute("config",JSON.stringify(Ae)),ne.setAttribute("field-name",U.field);const de=this.formData[U.field];de!=null&&(typeof de=="object"?ne.setAttribute("value",JSON.stringify(de)):ne.setAttribute("value",de)),c[U.field]&&ne.setAttribute("error",c[U.field]),Z.appendChild(ne)}j.appendChild(Z)}),W.appendChild(j)}),P.appendChild(W),A.appendChild(y),A.appendChild(P)}),N){A.classList.add("invalid");const h=()=>{const w=A.querySelector("sl-tab[active]");w&&w.classList.contains("invalid")?A.style.setProperty("--indicator-color","var(--sl-color-danger-600)"):A.style.setProperty("--indicator-color","var(--sl-color-primary-600)")};A.addEventListener("sl-tab-show",()=>setTimeout(h,0)),setTimeout(h,0)}g.appendChild(A)}else if(s.rows){const A=document.createElement("div");A.className="form-content-wrapper",A.style.padding="1rem",A.style.overflow="auto",A.style.scrollbarGutter="stable",A.style.overflow="auto",A.style.scrollbarGutter="stable",this.renderRows(s.rows,d,c,A),g.appendChild(A)}const x=document.createElement("div");x.className="form-actions";const M=document.createElement("div");M.style.display="flex",M.style.gap="0.5rem";const E=document.createElement("div");E.style.display="flex",E.style.gap="0.5rem";const B=document.createElement("div");B.style.display="flex",B.style.gap="0.5rem",x.appendChild(M),x.appendChild(E),x.appendChild(B);let O=!1;if(n)JSON.parse(n).forEach(N=>{N.hidden||(O=!0);const h=document.createElement("sl-button");h.variant=N.variant||"primary",h.textContent=N.label||N.action,h.type="button",N.disabled&&(h.disabled=!0),N.hidden&&(h.style.display="none"),h.addEventListener("click",()=>{this.lastAction=N.action,N.confirmation?this.showConfirmationDialog(N.confirmation,()=>{this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:N.action},bubbles:!0,composed:!0}))}):this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:N.action},bubbles:!0,composed:!0}))}),this.buttons[N.action]=h;const w=N.position||"right";w==="left"?M.appendChild(h):w==="center"?E.appendChild(h):B.appendChild(h)});else{O=!0;const A=document.createElement("sl-button");A.variant="primary",A.textContent="Submit",A.type="button",A.addEventListener("click",()=>{this.lastAction="submit",this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:"submit"},bubbles:!0,composed:!0}))}),this.buttons.submit=A,B.appendChild(A)}O||(x.style.display="none"),g.addEventListener("submit",this.handleSubmit.bind(this)),g.appendChild(x),v.appendChild(g)}catch(s){console.error("Failed to parse form configuration:",s),this.innerHTML="<p>Error: Invalid form configuration.</p>"}}renderRows(t,e,a,n){t.forEach(o=>{const s=document.createElement("div");s.className="form-row",s.style.gridTemplateColumns=o.map(d=>d.width||"1fr").join(" "),o.forEach(d=>{const c=document.createElement("div");if(c.className="form-col",d.align&&(c.style.display="flex",c.style.justifyContent=d.align==="right"?"flex-end":d.align==="center"?"center":"flex-start"),d.type==="empty"){s.appendChild(c);return}if(d.type==="separator"){const f=document.createElement("ts-form-field");f.setAttribute("config",JSON.stringify({type:"separator",label:d.label})),f.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),c.appendChild(f),s.appendChild(c);return}const m=e[d.field];if(m){const f=document.createElement("div"),v=document.createElement("ts-form-field");v.setAttribute("field-name",d.field),v.setAttribute("config",JSON.stringify(m));const g=this.formData[d.field];g!=null&&(typeof g=="object"?v.setAttribute("value",JSON.stringify(g)):v.setAttribute("value",g));const x=a[d.field];x&&v.setAttribute("error",x),f.appendChild(v),s.appendChild(f)}}),n.appendChild(s)})}getSubmissionData(){const t={...this.formData};return this.fieldsConfig&&Object.keys(this.fieldsConfig).forEach(e=>{this.fieldsConfig[e].excludeFromSubmit&&delete t[e]}),t}handleSubmit(t){t.preventDefault()}disableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!0)}enableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!1)}hideButton(t){this.buttons[t]&&(this.buttons[t].style.display="none")}showButton(t){this.buttons[t]&&(this.buttons[t].style.display="")}showConfirmationDialog(t,e){const a=document.createElement("sl-dialog");a.label=t.title||"Confirm",a.open=!0,a.size="medium",a.style.fontFamily="var(--sl-font-sans)";const n=document.createElement("div");n.textContent=t.text||"Are you sure?",a.appendChild(n);const o=document.createElement("div");o.slot="footer",o.style.display="flex",o.style.justifyContent="space-between",o.style.alignItems="center";const s=document.createElement("div");s.style.display="flex",s.style.gap="0.5rem";const d=document.createElement("div");d.style.display="flex",d.style.gap="0.5rem";const c=document.createElement("div");c.style.display="flex",c.style.gap="0.5rem",o.appendChild(s),o.appendChild(d),o.appendChild(c),t.buttons.forEach(m=>{const f=document.createElement("sl-button");f.variant=m.variant||"primary",f.textContent=m.label||m.action,f.addEventListener("click",()=>{a.hide(),m.confirm&&e()});const v=m.position||"right";v==="left"?s.appendChild(f):v==="center"?d.appendChild(f):c.appendChild(f)}),a.appendChild(o),document.body.appendChild(a)}}customElements.define("ts-form",Fi);const{action:Wt}=__STORYBOOK_MODULE_ACTIONS__,Ri={title:"TSWebUI/TSForm",parameters:{layout:"fullscreen"},render:i=>{const t=i.dark?"dark":"light";let e=On.replace(/\{\{theme\}\}/g,t);const a=`form-${Math.random().toString(36).substr(2,9)}`,n=/<ts-form([^>]*)>/;if(e.match(n)){const s=[`layout='${i.layout}'`,`fields='${i.fields}'`,`errors='${i.errors}'`,`buttons='${i.buttons}'`,`values='${i.values}'`].join(" ");e=e.replace(n,`<ts-form id="${a}" ${s}>`)}return setTimeout(()=>{const s=document.getElementById(a);if(s){customElements.whenDefined("ts-form").then(()=>{s.run()});for(const d of["form-changed","form-submit","form-field-action"])s.removeEventListener(d,Wt(d)),s.addEventListener(d,c=>{Wt(d)(c.detail)})}},0),e},argTypes:{dark:{control:"boolean",description:"Dark theme mode"},layout:{control:"text",description:"Form layout configuration (JSON object)"},fields:{control:"text",description:"Form fields configuration (JSON object)"},errors:{control:"text",description:"Form validation errors (JSON object)"},values:{control:"text",description:"Initial form values (JSON object)"},buttons:{control:"text",description:"Form buttons configuration (JSON array of objects: [{action, variant, label, disabled?, hidden?, position?, confirmation?}])"}}},ce={dark:!1,buttons:"[]",layout:`{
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
    }`,errors:"{}",values:"{}"},_e={args:{...ce}},$e={args:{layout:`{
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
        }`,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]',values:"{}"}},je={args:{...ce,buttons:'[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'}},Be={args:{...ce,buttons:'[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'}},He={args:{...ce,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'}},qe={args:{...ce,values:`{
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
        }`}},Je={args:{...ce,layout:JSON.stringify({tabs:[{label:"Osobní údaje",rows:[[{field:"name"},{field:"surname"}],[{field:"birthdate"}]]},{label:"Účet",rows:[[{field:"username"},{field:"password"}],[{field:"role"},{field:"active"}],[{field:"department"}]]},{label:"Detaily",rows:[[{field:"bio"}],[{field:"avatar"},{field:"resume"}]]},{label:"Nastavení",rows:[[{field:"notifications"}],[{field:"theme"}],[{field:"projects"}]]},{label:"Tabulka",rows:[[{field:"history"}]]},{label:"Další prvky",rows:[[{field:"section1"}],[{field:"terms",width:"1fr"},{field:"satisfaction",width:"2fr"}],[{field:"country"},{field:"meetingTime"},{field:"startDate"}],[{field:"section2"}],[{field:"age",width:"150px"}],[{field:"section3"}],[{type:"empty"},{field:"statusGroup",align:"right"}],[{field:"actionButton"}]]}]}),fields:JSON.stringify({name:{label:"Jméno",type:"text",required:!0},surname:{label:"Příjmení",type:"text",required:!0},username:{label:"Uživatelské jméno",type:"text",required:!0},password:{label:"Heslo",type:"password",required:!0},number:{label:"Number Input",type:"number"},currency:{label:"Currency (Round 0.01)",type:"number",roundTo:.01},role:{label:"Role",type:"select",options:[{value:"admin",label:"Administrátor"},{value:"manager",label:"Manažer"},{value:"user",label:"Uživatel"},{value:"guest",label:"Host"}]},active:{label:"Aktivní účet",type:"switch",labelPosition:"right"},birthdate:{label:"Datum narození",type:"date"},bio:{label:"Životopis",type:"textarea",hideLabel:!0,placeholder:"Životopis (bez labelu)"},avatar:{label:"Profilový obrázek",type:"image",multiple:!0},resume:{label:"Životopis (PDF)",type:"file",multiple:!0},notifications:{label:"Notifikace",type:"select",multiple:!0,options:[{value:"email",label:"E-mail"},{value:"sms",label:"SMS"},{value:"push",label:"Push notifikace"},{value:"slack",label:"Slack"}]},theme:{label:"Preferovaný vzhled",type:"radio",options:[{value:"light",label:"Světlý"},{value:"dark",label:"Tmavý"},{value:"auto",label:"Automaticky"}]},department:{label:"Oddělení (N:1)",type:"relationship",targetEntity:"department",mode:"single",displayFields:["name"],valueField:"id",options:[{id:1,name:"IT",code:"DEP-01"},{id:2,name:"HR",code:"DEP-02"},{id:3,name:"Sales",code:"DEP-03"},{id:4,name:"Marketing",code:"DEP-04"}]},projects:{label:"Projekty (M:N)",type:"relationship",targetEntity:"project",mode:"multiple",displayFields:["code","name"],chipDisplayFields:["name"],valueField:"id",options:[{id:101,name:"Website Redesign",code:"PRJ-WEB"},{id:102,name:"Mobile App",code:"PRJ-APP"},{id:103,name:"Cloud Migration",code:"PRJ-CLOUD"},{id:104,name:"Security Audit",code:"PRJ-SEC"},{id:105,name:"AI Integration",code:"PRJ-AI"},{id:106,name:"Database Optimization",code:"PRJ-DB"},{id:107,name:"API Restructuring",code:"PRJ-API"},{id:108,name:"Frontend Refactor",code:"PRJ-FE"},{id:109,name:"Backend Refactor",code:"PRJ-BE"},{id:110,name:"DevOps Pipeline",code:"PRJ-OPS"},{id:111,name:"User Testing",code:"PRJ-UX"},{id:112,name:"Market Research",code:"PRJ-MKT"},{id:113,name:"Legal Compliance",code:"PRJ-LEG"},{id:114,name:"GDPR Audit",code:"PRJ-GDPR"},{id:115,name:"Network Upgrade",code:"PRJ-NET"},{id:116,name:"Server Migration",code:"PRJ-SRV"},{id:117,name:"Client Onboarding",code:"PRJ-CLI"},{id:118,name:"Internal Training",code:"PRJ-TRN"},{id:119,name:"Documentation",code:"PRJ-DOC"},{id:120,name:"Legacy Retirement",code:"PRJ-OLD"}]},history:{label:"Historie aktivit",type:"table",showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,itemsPerPage:5,itemsPerPageOptions:[5,10,20],singleItemActions:"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat",multipleItemsActions:"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané",columns:[{field:"date",header:"Datum",type:"date",sortable:!0,filterable:!0,canBeCopied:!0,isClickable:!0,align:"right"},{field:"action",header:"Akce",type:"text",sortable:!0,filterable:!0,isClickable:!0},{field:"user",header:"Uživatel",type:"text",sortable:!0,filterable:!0}],data:[{id:1,date:"2023-01-01",action:"Login",user:"jnovak"},{id:2,date:"2023-01-02",action:"Update Profile",user:"jnovak"},{id:3,date:"2023-01-03",action:"Logout",user:"jnovak"},{id:4,date:"2023-01-04",action:"Login",user:"jnovak"},{id:5,date:"2023-01-05",action:"View Report",user:"jnovak"},{id:6,date:"2023-01-06",action:"Export Data",user:"jnovak"},{id:7,date:"2023-01-07",action:"Logout",user:"jnovak"}]},section1:{type:"separator",label:"Základní nastavení"},section2:{type:"separator",label:"Osobní údaje"},section3:{type:"separator",label:"Akce"},terms:{label:"Souhlasím s podmínkami",type:"checkbox"},satisfaction:{label:"Spokojenost",type:"slider",min:0,max:100,step:10},country:{label:"Země (Combobox)",type:"combobox",options:[{value:"cz",label:"Česká republika"},{value:"sk",label:"Slovensko"},{value:"de",label:"Německo"},{value:"pl",label:"Polsko"},{value:"at",label:"Rakousko"}]},startDate:{label:"Datum zahájení (Date only)",type:"date"},meetingTime:{label:"Čas schůzky",type:"datetime"},age:{label:"Věk",type:"number",min:0,max:120},statusGroup:{type:"button-group",variant:"process",label:"Status",options:["draft/true/default/Koncept","published/true/success/Publikováno","archived/true/warning/Archivováno"]},actionButton:{type:"button",label:"Provést akci",variant:"primary",action:"custom_action"}}),buttons:JSON.stringify([{action:"cancel",label:"Zrušit",variant:"default"},{action:"save",label:"Uložit",variant:"primary"}]),values:JSON.stringify({name:"Jan",surname:"Novák",username:"jnovak",password:"password123",role:"user",active:!1,birthdate:"1990-05-15",bio:"Zkušený vývojář se zaměřením na webové technologie.",theme:"dark",notifications:["email","push"],department:2,projects:[101,103],terms:!0,satisfaction:80,country:"cz",age:30,statusGroup:"published",meetingTime:"2023-11-15 14:30",startDate:"2023-01-01"})}},We={args:{...ce,layout:JSON.stringify({tabs:[{label:"Text Inputs",rows:[[{type:"separator",label:"Text Input"}],[{field:"text"}],[{type:"separator",label:"Textarea"}],[{field:"textarea"}]]},{label:"Numeric & Date",rows:[[{type:"separator",label:"Number Input"}],[{field:"number"}],[{type:"separator",label:"Currency (Round 0.01)"}],[{field:"currency"}],[{type:"separator",label:"Slider"}],[{field:"slider"}],[{type:"separator",label:"Date Picker"}],[{field:"date"}],[{type:"separator",label:"Datetime Picker"}],[{field:"datetime"}]]},{label:"Selects & Pickers",rows:[[{type:"separator",label:"Select"}],[{field:"select"}],[{type:"separator",label:"Multiselect"}],[{field:"multiselect"}],[{type:"separator",label:"Combobox"}],[{field:"combobox"}],[{field:"comboboxStrict"},{field:"comboboxCustom"}],[{type:"separator",label:"Relationship Picker (Single)"}],[{field:"relationshipSingle"}],[{type:"separator",label:"Relationship Picker (Multiple)"}],[{field:"relationshipMultiple"}]]},{label:"Toggles & Buttons",rows:[[{type:"separator",label:"Checkbox"}],[{field:"checkbox"}],[{type:"separator",label:"Switch"}],[{field:"switch"}],[{type:"separator",label:"Radio Group"}],[{field:"radio"}],[{type:"separator",label:"Button Group"}],[{field:"buttonGroup"}],[{type:"separator",label:"Button Field"}],[{field:"button"}]]},{label:"Files & Media",rows:[[{type:"separator",label:"File Upload"}],[{field:"file"}],[{type:"separator",label:"Image Upload"}],[{field:"image"}]]},{label:"Table",rows:[[{field:"table"}]]},{label:"Statické",rows:[[{type:"separator",label:"Infoboxes"}],[{field:"infoPrimary"}],[{field:"infoSuccess"}],[{field:"infoWarning"}],[{field:"infoDanger"}],[{field:"infoNeutral"}],[{type:"separator",label:"Markdown"}],[{field:"markdownExample"}]]}]}),fields:JSON.stringify({text:{type:"text",label:"Text Field"},textarea:{type:"textarea",label:"Textarea Field",rows:3},number:{type:"number",label:"Number Field",min:0,max:100},currency:{type:"number",label:"Currency Field",roundTo:.01},slider:{type:"slider",label:"Slider Field",min:0,max:100,step:10},date:{type:"date",label:"Date Field"},datetime:{type:"datetime",label:"Datetime Field"},select:{type:"select",label:"Select Field",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},multiselect:{type:"select",label:"Multiselect Field",multiple:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},combobox:{type:"combobox",label:"Combobox Field (Allows Empty)",allowEmpty:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},comboboxStrict:{type:"combobox",label:"Strict Combobox (No Custom)",allowCustom:!1,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},comboboxCustom:{type:"combobox",label:"Custom Combobox (Allow Custom)",allowCustom:!0,options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},relationshipSingle:{type:"relationship",label:"Relationship (Single)",targetEntity:"entity",mode:"single",displayFields:["name"],valueField:"id",options:[{id:1,name:"Entity 1"},{id:2,name:"Entity 2"}]},relationshipMultiple:{type:"relationship",label:"Relationship (Multiple)",targetEntity:"entity",mode:"multiple",displayFields:["name"],chipDisplayFields:["name"],valueField:"id",options:[{id:1,name:"Entity 1"},{id:2,name:"Entity 2"}]},checkbox:{type:"checkbox",label:"Checkbox Field"},switch:{type:"switch",label:"Switch Field"},radio:{type:"radio",label:"Radio Field",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}]},buttonGroup:{type:"button-group",label:"Button Group",options:["1/true/default/Option 1","2/true/primary/Option 2"]},button:{type:"button",label:"Button Field",variant:"primary",action:"click"},file:{type:"file",label:"Nahrát soubor"},image:{type:"image",label:"Nahrát obrázky",multiple:!0},table:{label:"Example Table",type:"table",showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,itemsPerPage:5,itemsPerPageOptions:[5,10,20],singleItemActions:"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat",multipleItemsActions:"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané",columns:[{field:"id",header:"ID",type:"number",sortable:!0,filterable:!0,width:"80px"},{field:"name",header:"Name",type:"text",sortable:!0,filterable:!0},{field:"status",header:"Status",type:"text",sortable:!0,filterable:!0}],data:[{id:1,name:"Item 1",status:"Active"},{id:2,name:"Item 2",status:"Inactive"},{id:3,name:"Item 3",status:"Active"}]},infoPrimary:{type:"infobox",variant:"primary",icon:"info-circle",content:"<strong>Primary Info</strong><br>This is a primary alert with <em>HTML</em> content."},infoSuccess:{type:"infobox",variant:"success",icon:"check-circle",content:"Success alert."},infoWarning:{type:"infobox",variant:"warning",icon:"exclamation-triangle",content:"Warning alert."},infoDanger:{type:"infobox",variant:"danger",icon:"exclamation-octagon",content:"Danger alert."},infoNeutral:{type:"infobox",variant:"neutral",icon:"gear",content:"Neutral alert."},markdownExample:{type:"markdown",content:`# Markdown Header

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

| Col 1 | Col 2 |
|---|---|
| Val 1 | Val 2 |`}}),values:"{}"}},Ye={args:{...ce,layout:JSON.stringify({rows:[[{field:"loginInfo",width:"1fr"}],[{field:"username",width:"1fr"}],[{field:"password",width:"1fr"}]]}),fields:JSON.stringify({loginInfo:{type:"infobox",variant:"neutral",icon:"box-arrow-in-right",content:"Zadejte uživatelské jméno a heslo"},username:{type:"text",label:"Uživatel",required:!0,autofocus:!0,enterAction:"focus:password",escapeAction:"click:cancel"},password:{type:"password",label:"Heslo",required:!0,enterAction:"submit",escapeAction:"click:cancel"}}),buttons:JSON.stringify([{action:"cancel",label:"Zrušit",variant:"text",position:"left"},{action:"login",label:"Přihlásit se",variant:"primary",position:"right"}]),values:"{}"}},Ue={args:{...ce,layout:JSON.stringify({rows:[[{field:"warningMessage",width:"1fr"}]]}),fields:JSON.stringify({warningMessage:{type:"infobox",variant:"warning",icon:"exclamation-triangle",content:"<strong>Opravdu chcete zaúčtovat nesmysly?</strong>"}}),buttons:JSON.stringify([{action:"no",label:"NE",variant:"default",position:"right"},{action:"yes",label:"ANO",variant:"primary",position:"right"}]),values:"{}"}};_e.parameters={..._e.parameters,docs:{..._e.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs
  }
}`,..._e.parameters?.docs?.source}}};$e.parameters={...$e.parameters,docs:{...$e.parameters?.docs,source:{originalSource:`{
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
}`,...$e.parameters?.docs?.source}}};je.parameters={...je.parameters,docs:{...je.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'
  }
}`,...je.parameters?.docs?.source}}};Be.parameters={...Be.parameters,docs:{...Be.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'
  }
}`,...Be.parameters?.docs?.source}}};He.parameters={...He.parameters,docs:{...He.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'
  }
}`,...He.parameters?.docs?.source}}};qe.parameters={...qe.parameters,docs:{...qe.parameters?.docs,source:{originalSource:`{
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
}`,...qe.parameters?.docs?.source}}};Je.parameters={...Je.parameters,docs:{...Je.parameters?.docs,source:{originalSource:`{
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
}`,...Je.parameters?.docs?.source}}};We.parameters={...We.parameters,docs:{...We.parameters?.docs,source:{originalSource:`{
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
      }, {
        label: 'Statické',
        rows: [[{
          type: 'separator',
          label: 'Infoboxes'
        }], [{
          field: 'infoPrimary'
        }], [{
          field: 'infoSuccess'
        }], [{
          field: 'infoWarning'
        }], [{
          field: 'infoDanger'
        }], [{
          field: 'infoNeutral'
        }], [{
          type: 'separator',
          label: 'Markdown'
        }], [{
          field: 'markdownExample'
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
      },
      // Statické Elements
      infoPrimary: {
        type: 'infobox',
        variant: 'primary',
        icon: 'info-circle',
        content: '<strong>Primary Info</strong><br>This is a primary alert with <em>HTML</em> content.'
      },
      infoSuccess: {
        type: 'infobox',
        variant: 'success',
        icon: 'check-circle',
        content: 'Success alert.'
      },
      infoWarning: {
        type: 'infobox',
        variant: 'warning',
        icon: 'exclamation-triangle',
        content: 'Warning alert.'
      },
      infoDanger: {
        type: 'infobox',
        variant: 'danger',
        icon: 'exclamation-octagon',
        content: 'Danger alert.'
      },
      infoNeutral: {
        type: 'infobox',
        variant: 'neutral',
        icon: 'gear',
        content: 'Neutral alert.'
      },
      markdownExample: {
        type: 'markdown',
        content: '# Markdown Header\\n\\nThis is a paragraph with **bold** and *italic* text.\\n\\n- List item 1\\n- List item 2\\n\\n| Col 1 | Col 2 |\\n|---|---|\\n| Val 1 | Val 2 |'
      }
    }),
    values: '{}'
  }
}`,...We.parameters?.docs?.source}}};Ye.parameters={...Ye.parameters,docs:{...Ye.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      rows: [[{
        field: 'loginInfo',
        width: '1fr'
      }], [{
        field: 'username',
        width: '1fr'
      }], [{
        field: 'password',
        width: '1fr'
      }]]
    }),
    fields: JSON.stringify({
      loginInfo: {
        type: 'infobox',
        variant: 'neutral',
        icon: 'box-arrow-in-right',
        content: 'Zadejte uživatelské jméno a heslo'
      },
      username: {
        type: 'text',
        label: 'Uživatel',
        required: true,
        autofocus: true,
        enterAction: 'focus:password',
        escapeAction: 'click:cancel'
      },
      password: {
        type: 'password',
        label: 'Heslo',
        required: true,
        enterAction: 'submit',
        escapeAction: 'click:cancel'
      }
    }),
    buttons: JSON.stringify([{
      action: 'cancel',
      label: 'Zrušit',
      variant: 'text',
      position: 'left'
    }, {
      action: 'login',
      label: 'Přihlásit se',
      variant: 'primary',
      position: 'right'
    }]),
    values: '{}'
  }
}`,...Ye.parameters?.docs?.source}}};Ue.parameters={...Ue.parameters,docs:{...Ue.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      rows: [[{
        field: 'warningMessage',
        width: '1fr'
      }]]
    }),
    fields: JSON.stringify({
      warningMessage: {
        type: 'infobox',
        variant: 'warning',
        icon: 'exclamation-triangle',
        content: '<strong>Opravdu chcete zaúčtovat nesmysly?</strong>'
      }
    }),
    buttons: JSON.stringify([{
      action: 'no',
      label: 'NE',
      variant: 'default',
      position: 'right'
    }, {
      action: 'yes',
      label: 'ANO',
      variant: 'primary',
      position: 'right'
    }]),
    values: '{}'
  }
}`,...Ue.parameters?.docs?.source}}};const Oi=["Default","WithErrors","WithButtons","WithDisabledAndHiddenButtons","WithConfirmation","WithValues","Complex","AllElements","LoginForm","ConfirmationDialog"];export{We as AllElements,Je as Complex,Ue as ConfirmationDialog,_e as Default,Ye as LoginForm,je as WithButtons,He as WithConfirmation,Be as WithDisabledAndHiddenButtons,$e as WithErrors,qe as WithValues,Oi as __namedExportsOrder,Ri as default};
