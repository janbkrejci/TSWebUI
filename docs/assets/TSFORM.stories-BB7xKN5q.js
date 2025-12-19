import"./ts-table-BYRwQNre.js";const $n=`<style>
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
</div>`;class jn extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.files=[],this.multiple=!1,this.accept="*",this.label="Nahrát soubory"}static get observedAttributes(){return["multiple","accept","label","inner-label","value","error","required"]}get required(){return this.hasAttribute("required")}set required(t){t?this.setAttribute("required",""):this.removeAttribute("required")}attributeChangedCallback(t,e,a){t==="multiple"?this.multiple=a!==null&&a!=="false":t==="accept"?this.accept=a||"*":t==="label"?this.label=a:t==="inner-label"?this.innerLabel=a:t==="value"||(t==="error"?(this.error=a,this.updateError()):t==="required"&&this.hasRendered&&this.render()),this.hasRendered?t==="multiple"?this.updateUploadText():(t==="label"||t==="inner-label")&&this.render():this.render()}updateError(){this.errorContainer&&(this.errorContainer.textContent=this.error||"",this.errorContainer.style.display=this.error?"block":"none",this.error?this.classList.add("input-invalid"):this.classList.remove("input-invalid"))}connectedCallback(){this.render(),this.hasListeners||(this.setupEventListeners(),this.hasListeners=!0),this.updateError()}setupEventListeners(){this.addEventListener("dragover",t=>{t.preventDefault(),this.classList.add("drag-over")}),this.addEventListener("dragleave",t=>{t.preventDefault(),this.classList.remove("drag-over")}),this.addEventListener("drop",t=>{t.preventDefault(),this.classList.remove("drag-over"),t.dataTransfer.files&&t.dataTransfer.files.length>0&&this.handleFiles(t.dataTransfer.files)})}handleFiles(t){const e=Array.from(t);this.multiple?this.files=[...this.files,...e]:this.files=[e[0]],this.renderFileList(),this.dispatchChange()}removeFile(t){this.files.splice(t,1),this.renderFileList(),this.dispatchChange()}downloadFile(t){const e=this.files[t],a=document.createElement("a");if(e instanceof File)a.href=URL.createObjectURL(e);else if(e.data)a.href=e.data;else return;a.download=e.name,document.body.appendChild(a),a.click(),document.body.removeChild(a),e instanceof File&&setTimeout(()=>URL.revokeObjectURL(a.href),1e3)}set value(t){t?Array.isArray(t)?this.files=t:this.files=[t]:this.files=[],this.renderFileList()}get value(){return this.files}dispatchChange(){this.dispatchEvent(new CustomEvent("sl-change",{detail:{files:this.files},bubbles:!0,composed:!0}))}render(){this.hasRendered=!0,this.shadowRoot.innerHTML="";const t=document.createElement("style");t.textContent=`
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
            <div>${this.innerLabel||this.label}</div>
            <div class="upload-text" style="font-size: 0.8em; color: var(--sl-color-neutral-500); margin-top: 0.25rem;">
                ${this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání"}
            </div>
        `,n.addEventListener("click",()=>a.click()),this.label){const d=document.createElement("label");d.innerHTML=this.label+(this.required?" <span>*</span>":""),d.className="file-upload-label",d.setAttribute("part","label"),e.appendChild(d)}const l=document.createElement("div");l.className="error-message",this.errorContainer=l;const s=document.createElement("div");s.className="file-list",this.fileListContainer=s,e.appendChild(a),e.appendChild(n),e.appendChild(l),e.appendChild(s),this.shadowRoot.appendChild(e),this.updateError(),this.renderFileList()}renderFileList(){this.fileListContainer&&(this.fileListContainer.innerHTML="",this.files.forEach((t,e)=>{const a=document.createElement("div");a.className="file-item";const n=document.createElement("div");n.className="file-info";const l=document.createElement("sl-icon");l.name="file-earmark";const s=document.createElement("span");s.className="file-name",s.textContent=t.name;const d=document.createElement("span");d.style.color="var(--sl-color-neutral-500)",d.textContent=`(${(t.size/1024).toFixed(1)} KB)`,n.appendChild(l),n.appendChild(s),n.appendChild(d);const c=document.createElement("div");c.style.display="flex",c.style.gap="0.25rem";const m=document.createElement("sl-icon-button");m.name="cloud-download",m.label="Stáhnout",m.dataset.index=e,m.addEventListener("click",g=>{g.stopPropagation(),this.downloadFile(e)});const p=document.createElement("sl-icon-button");p.name="x",p.label="Odstranit",p.addEventListener("click",g=>{g.stopPropagation(),this.removeFile(e)}),c.appendChild(m),c.appendChild(p),a.appendChild(n),a.appendChild(c),this.fileListContainer.appendChild(a)}))}updateUploadText(){const t=this.shadowRoot.querySelector(".upload-text");t&&(t.textContent=this.multiple?"Přetáhněte soubory sem nebo klikněte pro nahrání":"Přetáhněte soubor sem nebo klikněte pro nahrání");const e=this.shadowRoot.querySelector('input[type="file"]');e&&(e.multiple=this.multiple)}}customElements.define("ts-file-upload",jn);class Bn extends HTMLElement{constructor(){super(),this.selectedItems=[],this.availableItems=[],this.mode="single",this.targetEntity="",this.displayFields=[],this.chipDisplayFields=[],this.valueField="id",this.label=""}static get observedAttributes(){return["mode","target-entity","display-fields","chip-display-fields","value-field","value","label","options"]}attributeChangedCallback(t,e,a){if(e!==a){if(t==="mode"&&(this.mode=a),t==="target-entity"&&(this.targetEntity=a),t==="display-fields")try{this.displayFields=JSON.parse(a)}catch{this.displayFields=[a]}if(t==="chip-display-fields")try{this.chipDisplayFields=JSON.parse(a)}catch{this.chipDisplayFields=[a]}if(t==="value-field"&&(this.valueField=a),t==="label"&&(this.label=a,this.render()),t==="options")try{this.availableItems=JSON.parse(a),this.updateSelectedFromValue()}catch(n){console.error("Failed to parse options for relationship picker:",n),this.availableItems=[]}t==="value"&&this.updateSelectedFromValue()}}updateSelectedFromValue(){const t=this.getAttribute("value");if(!t)return;let e;try{e=JSON.parse(t)}catch{e=t}if(this.mode==="single"){const a=this.availableItems.find(n=>n[this.valueField]==e);a&&(this.selectedItems=[a])}else Array.isArray(e)&&(this.selectedItems=this.availableItems.filter(a=>e.includes(a[this.valueField])));this.renderSelectedItems()}connectedCallback(){this.render(),this.resizeObserver=new ResizeObserver(()=>{this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{this.updateVisibleChips()},10)}),this.selectedContainer&&this.resizeObserver.observe(this.selectedContainer)}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.disconnect()}render(){this.innerHTML="";const t=document.createElement("style");t.textContent=`
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
        `,this.appendChild(t);const e=document.createElement("div");if(e.className="picker-container",this.label){const n=document.createElement("label");n.className="label",n.textContent=this.label,e.appendChild(n)}const a=document.createElement("div");a.className="selected-items",a.addEventListener("click",n=>{n.target.closest("sl-tag")||n.target.closest(".clear-icon")||this.openDialog()}),this.selectedContainer=a,this.renderSelectedItems(),e.appendChild(a),this.appendChild(e),this.resizeObserver&&this.resizeObserver.observe(this.selectedContainer)}renderSelectedItems(){if(this.selectedContainer.innerHTML="",this.selectedContainer.classList.remove("empty"),this.selectedItems.length===0){const a=document.createElement("span");a.textContent="Žádné položky nevybrány",a.style.color="var(--sl-input-placeholder-color)",this.selectedContainer.appendChild(a),this.selectedContainer.classList.add("empty")}else this.selectedItems.forEach(a=>{const n=document.createElement("sl-tag");n.variant="primary",n.removable=!0,n.size="medium";const s=(this.chipDisplayFields&&this.chipDisplayFields.length>0?this.chipDisplayFields:this.displayFields.slice(0,1)).map(d=>a[d]).join(" - ");n.textContent=s,n.addEventListener("sl-remove",d=>{d.stopPropagation(),this.removeItem(a)}),this.selectedContainer.appendChild(n)});const t=document.createElement("div");if(t.className="picker-controls",this.selectedItems.length>0){const a=document.createElement("sl-icon");a.name="x-circle-fill",a.className="picker-icon clear-icon",a.addEventListener("click",n=>{n.stopPropagation(),this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange()}),t.appendChild(a)}const e=document.createElement("sl-icon");e.name="chevron-down",e.className="picker-icon",t.appendChild(e),this.selectedContainer.appendChild(t),this.selectedItems.length>0&&customElements.whenDefined("sl-tag").then(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.updateVisibleChips()})})})}updateVisibleChips(){if(!this.selectedContainer||this.selectedItems.length===0)return;const t=Array.from(this.selectedContainer.querySelectorAll("sl-tag:not(.summary-tag)")),e=this.selectedContainer.querySelector(".summary-tag");if(e&&e.remove(),t.forEach(L=>L.style.display=""),t.length===0)return;const a=window.getComputedStyle(this.selectedContainer),n=parseFloat(a.paddingLeft),l=parseFloat(a.paddingRight),s=a.gap||"8px",d=parseFloat(s)||8,c=this.selectedContainer.querySelector(".picker-controls");let m=0;c&&(m=c.getBoundingClientRect().width);let p=this.selectedContainer.clientWidth-n-l-2;m>0&&(p-=m+d);let g=0;const v=t.map(L=>{const S=Math.ceil(L.getBoundingClientRect().width);return g+=S+d,S});if(g-=d,g<=p)return;const w=document.createElement("sl-tag");w.className="summary-tag",w.variant="neutral",w.size="medium",w.style.cursor="pointer",w.style.flexShrink="0",w.textContent=`A další, celkem (${t.length})`,w.style.visibility="hidden",w.style.position="absolute",this.selectedContainer.appendChild(w);let A=Math.ceil(w.getBoundingClientRect().width);if(A<20){const S=document.createElement("canvas").getContext("2d"),O=window.getComputedStyle(this.selectedContainer);S.font=O.font;const h=S.measureText(w.textContent).width;A=Math.ceil(h)+32}else A+=4;w.remove(),w.style.visibility="",w.style.position="",w.addEventListener("click",L=>{L.stopPropagation(),this.openDialog()});let E=A+d,B=0;for(let L=0;L<v.length&&E+v[L]<=p;L++)E+=v[L]+d,B++;for(let L=0;L<t.length;L++)t[L].style.display=L<B?"":"none";if(B<t.length)if(B>0){const L=t[B-1];L.nextSibling?this.selectedContainer.insertBefore(w,L.nextSibling):this.selectedContainer.appendChild(w)}else this.selectedContainer.insertBefore(w,this.selectedContainer.firstChild)}removeItem(t){this.selectedItems=this.selectedItems.filter(e=>e[this.valueField]!==t[this.valueField]),this.renderSelectedItems(),this.dispatchChange()}addItem(t){this.mode==="single"?this.selectedItems=[t]:this.selectedItems.find(e=>e[this.valueField]===t[this.valueField])||this.selectedItems.push(t),this.renderSelectedItems(),this.dispatchChange()}dispatchChange(){const t=this.mode==="single"?this.selectedItems[0]?this.selectedItems[0][this.valueField]:null:this.selectedItems.map(e=>e[this.valueField]);this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:t,items:this.selectedItems},bubbles:!0,composed:!0}))}openDialog(){const t=document.createElement("sl-dialog");t.label=`Vybrat ${this.targetEntity}`,t.style.setProperty("--width","600px"),t.style.fontFamily="var(--sl-font-sans)";const e=document.createElement("div"),a=document.createElement("sl-input");a.placeholder="Hledat...",a.clearable=!0,a.addEventListener("sl-input",d=>this.filterResults(d.target.value,n,t));const n=document.createElement("div");n.className="search-results",e.appendChild(a),e.appendChild(n),t.appendChild(e);const l=document.createElement("div");l.slot="footer",l.style.display="flex",l.style.justifyContent="flex-end",l.style.alignItems="center",l.style.width="100%";const s=document.createElement("sl-button");s.textContent="Zavřít",s.addEventListener("click",()=>t.hide()),l.appendChild(s),t.appendChild(l),document.body.appendChild(t),this.filterResults("",n,t),requestAnimationFrame(()=>{t.open=!0}),t.addEventListener("sl-after-show",()=>{a.focus()}),t.addEventListener("sl-after-hide",()=>t.remove())}filterResults(t,e,a){e.innerHTML="";const n=t.toLowerCase(),l=this.availableItems.filter(d=>this.displayFields.some(c=>String(d[c]).toLowerCase().includes(n)));if(l.length===0){e.innerHTML='<div style="text-align: center; color: var(--sl-color-neutral-500); padding: 1rem;">Žádné výsledky</div>';return}const s=document.createElement("table");s.className="results-table",s.style.fontFamily="var(--sl-font-sans)",s.style.width="100%",s.style.borderCollapse="collapse",s.style.fontSize="var(--sl-font-size-small)",l.forEach(d=>{const c=document.createElement("tr"),m=this.selectedItems.some(v=>v[this.valueField]===d[this.valueField]);m&&c.classList.add("selected"),this.displayFields.forEach((v,w)=>{const A=document.createElement("td");A.textContent=d[v],w<this.displayFields.length-1&&(A.style.width="1%",A.style.whiteSpace="nowrap"),c.appendChild(A)});const p=document.createElement("td");p.className="icon-cell";const g=document.createElement("sl-icon");g.name=m?"check-circle-fill":"circle",g.style.color=m?"var(--sl-color-success-500)":"var(--sl-color-neutral-400)",p.appendChild(g),c.appendChild(p),c.addEventListener("click",()=>{this.mode==="single"?this.selectedItems.some(w=>w[this.valueField]===d[this.valueField])?(this.selectedItems=[],this.renderSelectedItems(),this.dispatchChange(),a&&a.hide()):(this.addItem(d),a&&a.hide()):this.selectedItems.some(w=>w[this.valueField]===d[this.valueField])?(this.removeItem(d),c.classList.remove("selected"),g.name="circle",g.style.color="var(--sl-color-neutral-400)"):(this.addItem(d),c.classList.add("selected"),g.name="check-circle-fill",g.style.color="var(--sl-color-success-500)")}),s.appendChild(c)}),e.appendChild(s)}}customElements.define("ts-relationship-picker",Bn);class qn extends HTMLElement{constructor(){super(),this.options=[],this._value="",this.isOpen=!1,this.filteredOptions=[]}static get observedAttributes(){return["label","value","options","disabled","placeholder","required","error","allow-custom","allow-empty"]}get allowCustom(){return this.hasAttribute("allow-custom")}set allowCustom(t){t?this.setAttribute("allow-custom",""):this.removeAttribute("allow-custom")}get allowEmpty(){return this.hasAttribute("allow-empty")}set allowEmpty(t){t?this.setAttribute("allow-empty",""):this.removeAttribute("allow-empty")}attributeChangedCallback(t,e,a){if(e!==a){if(t==="options")try{this.options=JSON.parse(a),this.filteredOptions=[...this.options]}catch{this.options=[],this.filteredOptions=[]}else t==="value"&&(this._value=a);this.render()}}getDisplayValue(t){if(t==null||t==="")return"";const e=this.options.find(a=>{const n=a&&a.value!==void 0?a.value:a;return String(n)===String(t)});return e?e.label||e.value||e:t}connectedCallback(){this.render(),document.addEventListener("click",this.handleDocumentClick.bind(this))}disconnectedCallback(){document.removeEventListener("click",this.handleDocumentClick.bind(this))}handleDocumentClick(t){this.contains(t.target)||(this.isOpen=!1,this.renderDropdown(),this.updateIconState(),this.validateInput())}validateInput(){const t=this.querySelector("sl-input");if(!t)return;const e=t.value.trim();if(!e){this.allowEmpty?this.handleSelect(""):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("");return}const a=this.options.find(n=>{const l=n.label||n.value||n;return String(l).toLowerCase()===e.toLowerCase()});if(a){const n=a.value||a;this._value!==n?this.handleSelect(n):t.value=this.getDisplayValue(n)}else this.allowCustom?this._value!==e&&(this._value=e,this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:e},bubbles:!0,composed:!0}))):this._value?t.value=this.getDisplayValue(this._value):this.handleSelect("")}toggleDropdown(t){t.preventDefault(),t.stopPropagation(),this.isOpen?(this.isOpen=!1,this.renderDropdown(),this.updateIconState()):(this.isOpen=!0,this.handleFocus())}updateIconState(){const t=this.querySelector(".combobox-icon");t&&t.classList.toggle("open",this.isOpen)}handleInput(t){const e=t.target.value;if(this.isOpen=!0,this.updateIconState(),!e)this.filteredOptions=[...this.options];else{const a=e.toLowerCase();this.filteredOptions=this.options.filter(n=>{const l=n.label||n.value||n;return String(l).toLowerCase().includes(a)})}this.renderDropdown()}handleSelect(t){const e=this._value;this._value=t,this.isOpen=!1,this.updateIconState(),e!==t&&this.dispatchEvent(new CustomEvent("sl-change",{detail:{value:this._value},bubbles:!0,composed:!0}));const a=this.querySelector("sl-input");a&&(a.value=this.getDisplayValue(t)),this.renderDropdown()}handleFocus(){this.isOpen=!0,this.updateIconState();const t=this.querySelector("sl-input");if(t&&setTimeout(()=>t.select(),0),t&&t.value){const e=t.value.toLowerCase();this.filteredOptions=this.options.filter(a=>{const n=a.label||a.value||a;return String(n).toLowerCase().includes(e)})}else this.filteredOptions=[...this.options];this.renderDropdown()}render(){this.innerHTML="";const t=this.getAttribute("label"),e=this.hasAttribute("disabled"),a=this.getAttribute("placeholder")||"",n=this.hasAttribute("required"),l=this.getAttribute("error"),s=document.createElement("div");s.style.position="relative",s.style.width="100%";const d=document.createElement("sl-input");d.classList.add("combobox-input"),t&&(d.label=t),d.value=this.getDisplayValue(this._value),d.disabled=e,d.placeholder=a,d.required=n,l&&d.classList.add("input-invalid"),d.setAttribute("autocomplete","off");const c=document.createElement("sl-icon");c.classList.add("combobox-icon"),c.slot="suffix",c.name="chevron-down",c.name="chevron-down",c.addEventListener("mousedown",p=>p.preventDefault()),c.addEventListener("click",this.toggleDropdown.bind(this)),d.appendChild(c),d.appendChild(c),d.addEventListener("sl-input",this.handleInput.bind(this)),d.addEventListener("sl-focus",this.handleFocus.bind(this)),d.addEventListener("keydown",p=>{p.key==="Escape"&&(p.preventDefault(),p.stopPropagation(),d.value=this.getDisplayValue(this._value),this.isOpen=!1,this.renderDropdown(),this.updateIconState(),d.blur())}),d.addEventListener("sl-blur",()=>{setTimeout(()=>{this.isOpen&&(this.isOpen=!1,this.renderDropdown(),this.updateIconState()),this.validateInput()},150)}),d.addEventListener("sl-change",p=>{p.stopPropagation()}),s.appendChild(d);const m=document.createElement("div");if(m.className="ts-combobox-dropdown",s.appendChild(m),this.appendChild(s),!this.querySelector("style")){const p=document.createElement("style");p.textContent=`
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
            `,this.appendChild(p)}this.renderDropdown()}renderDropdown(){const t=this.querySelector(".ts-combobox-dropdown");if(t)if(this.isOpen&&this.filteredOptions.length>0)t.style.display="block",t.innerHTML="",this.filteredOptions.forEach(e=>{const a=e.value||e,n=e.label||a,l=document.createElement("div");l.className="ts-combobox-item",l.textContent=n,l.addEventListener("click",()=>this.handleSelect(a)),t.appendChild(l)});else if(this.isOpen){t.style.display="block",t.innerHTML="";const e=document.createElement("div");e.className="ts-combobox-empty",e.textContent="Nic nenalezeno...",t.appendChild(e)}else t.style.display="none"}}customElements.define("ts-combobox",qn);var pt=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange","onPreCalendarPosition"],be={_disable:[],allowInput:!1,allowInvalidPreload:!1,altFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",animate:typeof window=="object"&&window.navigator.userAgent.indexOf("MSIE")===-1,ariaDateFormat:"F j, Y",autoFillDefaultTime:!0,clickOpens:!0,closeOnSelect:!0,conjunction:", ",dateFormat:"Y-m-d",defaultHour:12,defaultMinute:0,defaultSeconds:0,disable:[],disableMobile:!1,enableSeconds:!1,enableTime:!1,errorHandler:function(i){return typeof console<"u"&&console.warn(i)},getWeek:function(i){var t=new Date(i.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var e=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-e.getTime())/864e5-3+(e.getDay()+6)%7)/7)},hourIncrement:1,ignoredFocusElements:[],inline:!1,locale:"default",minuteIncrement:5,mode:"single",monthSelectorType:"dropdown",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",noCalendar:!1,now:new Date,onChange:[],onClose:[],onDayCreate:[],onDestroy:[],onKeyDown:[],onMonthChange:[],onOpen:[],onParseConfig:[],onReady:[],onValueUpdate:[],onYearChange:[],onPreCalendarPosition:[],plugins:[],position:"auto",positionElement:void 0,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",shorthandCurrentMonth:!1,showMonths:1,static:!1,time_24hr:!1,weekNumbers:!1,wrap:!1},Se={weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(i){var t=i%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle",amPM:["AM","PM"],yearAriaLabel:"Year",monthAriaLabel:"Month",hourAriaLabel:"Hour",minuteAriaLabel:"Minute",time_24hr:!1},Q=function(i,t){return t===void 0&&(t=2),("000"+i).slice(t*-1)},ie=function(i){return i===!0?1:0};function jt(i,t){var e;return function(){var a=this,n=arguments;clearTimeout(e),e=setTimeout(function(){return i.apply(a,n)},t)}}var ft=function(i){return i instanceof Array?i:[i]};function G(i,t,e){if(e===!0)return i.classList.add(t);i.classList.remove(t)}function N(i,t,e){var a=window.document.createElement(i);return t=t||"",e=e||"",a.className=t,e!==void 0&&(a.textContent=e),a}function Oe(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Kt(i,t){if(t(i))return i;if(i.parentNode)return Kt(i.parentNode,t)}function Ne(i,t){var e=N("div","numInputWrapper"),a=N("input","numInput "+i),n=N("span","arrowUp"),l=N("span","arrowDown");if(navigator.userAgent.indexOf("MSIE 9.0")===-1?a.type="number":(a.type="text",a.pattern="\\d*"),t!==void 0)for(var s in t)a.setAttribute(s,t[s]);return e.appendChild(a),e.appendChild(n),e.appendChild(l),e}function ee(i){try{if(typeof i.composedPath=="function"){var t=i.composedPath();return t[0]}return i.target}catch{return i.target}}var ht=function(){},Xe=function(i,t,e){return e.months[t?"shorthand":"longhand"][i]},Jn={D:ht,F:function(i,t,e){i.setMonth(e.months.longhand.indexOf(t))},G:function(i,t){i.setHours((i.getHours()>=12?12:0)+parseFloat(t))},H:function(i,t){i.setHours(parseFloat(t))},J:function(i,t){i.setDate(parseFloat(t))},K:function(i,t,e){i.setHours(i.getHours()%12+12*ie(new RegExp(e.amPM[1],"i").test(t)))},M:function(i,t,e){i.setMonth(e.months.shorthand.indexOf(t))},S:function(i,t){i.setSeconds(parseFloat(t))},U:function(i,t){return new Date(parseFloat(t)*1e3)},W:function(i,t,e){var a=parseInt(t),n=new Date(i.getFullYear(),0,2+(a-1)*7,0,0,0,0);return n.setDate(n.getDate()-n.getDay()+e.firstDayOfWeek),n},Y:function(i,t){i.setFullYear(parseFloat(t))},Z:function(i,t){return new Date(t)},d:function(i,t){i.setDate(parseFloat(t))},h:function(i,t){i.setHours((i.getHours()>=12?12:0)+parseFloat(t))},i:function(i,t){i.setMinutes(parseFloat(t))},j:function(i,t){i.setDate(parseFloat(t))},l:ht,m:function(i,t){i.setMonth(parseFloat(t)-1)},n:function(i,t){i.setMonth(parseFloat(t)-1)},s:function(i,t){i.setSeconds(parseFloat(t))},u:function(i,t){return new Date(parseFloat(t))},w:ht,y:function(i,t){i.setFullYear(2e3+parseFloat(t))}},pe={D:"",F:"",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"",M:"",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",u:"(.+)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},De={Z:function(i){return i.toISOString()},D:function(i,t,e){return t.weekdays.shorthand[De.w(i,t,e)]},F:function(i,t,e){return Xe(De.n(i,t,e)-1,!1,t)},G:function(i,t,e){return Q(De.h(i,t,e))},H:function(i){return Q(i.getHours())},J:function(i,t){return t.ordinal!==void 0?i.getDate()+t.ordinal(i.getDate()):i.getDate()},K:function(i,t){return t.amPM[ie(i.getHours()>11)]},M:function(i,t){return Xe(i.getMonth(),!0,t)},S:function(i){return Q(i.getSeconds())},U:function(i){return i.getTime()/1e3},W:function(i,t,e){return e.getWeek(i)},Y:function(i){return Q(i.getFullYear(),4)},d:function(i){return Q(i.getDate())},h:function(i){return i.getHours()%12?i.getHours()%12:12},i:function(i){return Q(i.getMinutes())},j:function(i){return i.getDate()},l:function(i,t){return t.weekdays.longhand[i.getDay()]},m:function(i){return Q(i.getMonth()+1)},n:function(i){return i.getMonth()+1},s:function(i){return i.getSeconds()},u:function(i){return i.getTime()},w:function(i){return i.getDay()},y:function(i){return String(i.getFullYear()).substring(2)}},Qt=function(i){var t=i.config,e=t===void 0?be:t,a=i.l10n,n=a===void 0?Se:a,l=i.isMobile,s=l===void 0?!1:l;return function(d,c,m){var p=m||n;return e.formatDate!==void 0&&!s?e.formatDate(d,c,p):c.split("").map(function(g,v,w){return De[g]&&w[v-1]!=="\\"?De[g](d,p,e):g!=="\\"?g:""}).join("")}},gt=function(i){var t=i.config,e=t===void 0?be:t,a=i.l10n,n=a===void 0?Se:a;return function(l,s,d,c){if(!(l!==0&&!l)){var m=c||n,p,g=l;if(l instanceof Date)p=new Date(l.getTime());else if(typeof l!="string"&&l.toFixed!==void 0)p=new Date(l);else if(typeof l=="string"){var v=s||(e||be).dateFormat,w=String(l).trim();if(w==="today")p=new Date,d=!0;else if(e&&e.parseDate)p=e.parseDate(l,v);else if(/Z$/.test(w)||/GMT$/.test(w))p=new Date(l);else{for(var A=void 0,E=[],B=0,L=0,S="";B<v.length;B++){var O=v[B],h=O==="\\",k=v[B-1]==="\\"||h;if(pe[O]&&!k){S+=pe[O];var y=new RegExp(S).exec(l);y&&(A=!0)&&E[O!=="Y"?"push":"unshift"]({fn:Jn[O],val:y[++L]})}else h||(S+=".")}p=!e||!e.noCalendar?new Date(new Date().getFullYear(),0,1,0,0,0,0):new Date(new Date().setHours(0,0,0,0)),E.forEach(function(_){var F=_.fn,P=_.val;return p=F(p,P,m)||p}),p=A?p:void 0}}if(!(p instanceof Date&&!isNaN(p.getTime()))){e.errorHandler(new Error("Invalid date provided: "+g));return}return d===!0&&p.setHours(0,0,0,0),p}}};function te(i,t,e){return e===void 0&&(e=!0),e!==!1?new Date(i.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):i.getTime()-t.getTime()}var Hn=function(i,t,e){return i>Math.min(t,e)&&i<Math.max(t,e)},mt=function(i,t,e){return i*3600+t*60+e},Wn=function(i){var t=Math.floor(i/3600),e=(i-t*3600)/60;return[t,e,i-t*3600-e*60]},Yn={DAY:864e5};function bt(i){var t=i.defaultHour,e=i.defaultMinute,a=i.defaultSeconds;if(i.minDate!==void 0){var n=i.minDate.getHours(),l=i.minDate.getMinutes(),s=i.minDate.getSeconds();t<n&&(t=n),t===n&&e<l&&(e=l),t===n&&e===l&&a<s&&(a=i.minDate.getSeconds())}if(i.maxDate!==void 0){var d=i.maxDate.getHours(),c=i.maxDate.getMinutes();t=Math.min(t,d),t===d&&(e=Math.min(c,e)),t===d&&e===c&&(a=i.maxDate.getSeconds())}return{hours:t,minutes:e,seconds:a}}typeof Object.assign!="function"&&(Object.assign=function(i){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];if(!i)throw TypeError("Cannot convert undefined or null to object");for(var a=function(d){d&&Object.keys(d).forEach(function(c){return i[c]=d[c]})},n=0,l=t;n<l.length;n++){var s=l[n];a(s)}return i});var V=function(){return V=Object.assign||function(i){for(var t,e=1,a=arguments.length;e<a;e++){t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n])}return i},V.apply(this,arguments)},Bt=function(){for(var i=0,t=0,e=arguments.length;t<e;t++)i+=arguments[t].length;for(var a=Array(i),n=0,t=0;t<e;t++)for(var l=arguments[t],s=0,d=l.length;s<d;s++,n++)a[n]=l[s];return a},Un=300;function Zn(i,t){var e={config:V(V({},be),H.defaultConfig),l10n:Se};e.parseDate=gt({config:e.config,l10n:e.l10n}),e._handlers=[],e.pluginElements=[],e.loadedPlugins=[],e._bind=E,e._setHoursFromDate=v,e._positionCalendar=Pe,e.changeMonth=rt,e.changeYear=Te,e.clear=pn,e.close=fn,e.onMouseOver=Fe,e._createElement=N,e.createDay=y,e.destroy=hn,e.isEnabled=ue,e.jumpToDate=S,e.updateValue=se,e.open=gn,e.redraw=Ot,e.set=kn,e.setDate=wn,e.toggle=Sn;function a(){e.utils={getDaysInMonth:function(r,o){return r===void 0&&(r=e.currentMonth),o===void 0&&(o=e.currentYear),r===1&&(o%4===0&&o%100!==0||o%400===0)?29:e.l10n.daysInMonth[r]}}}function n(){e.element=e.input=i,e.isOpen=!1,yn(),Lt(),Dn(),Cn(),a(),e.isMobile||k(),L(),(e.selectedDates.length||e.config.noCalendar)&&(e.config.enableTime&&v(e.config.noCalendar?e.latestSelectedDateObj:void 0),se(!1)),d();var r=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);!e.isMobile&&r&&Pe(),J("onReady")}function l(){var r;return((r=e.calendarContainer)===null||r===void 0?void 0:r.getRootNode()).activeElement||document.activeElement}function s(r){return r.bind(e)}function d(){var r=e.config;r.weekNumbers===!1&&r.showMonths===1||r.noCalendar!==!0&&window.requestAnimationFrame(function(){if(e.calendarContainer!==void 0&&(e.calendarContainer.style.visibility="hidden",e.calendarContainer.style.display="block"),e.daysContainer!==void 0){var o=(e.days.offsetWidth+1)*r.showMonths;e.daysContainer.style.width=o+"px",e.calendarContainer.style.width=o+(e.weekWrapper!==void 0?e.weekWrapper.offsetWidth:0)+"px",e.calendarContainer.style.removeProperty("visibility"),e.calendarContainer.style.removeProperty("display")}})}function c(r){if(e.selectedDates.length===0){var o=e.config.minDate===void 0||te(new Date,e.config.minDate)>=0?new Date:new Date(e.config.minDate.getTime()),u=bt(e.config);o.setHours(u.hours,u.minutes,u.seconds,o.getMilliseconds()),e.selectedDates=[o],e.latestSelectedDateObj=o}r!==void 0&&r.type!=="blur"&&Tn(r);var f=e._input.value;g(),se(),e._input.value!==f&&e._debouncedChange()}function m(r,o){return r%12+12*ie(o===e.l10n.amPM[1])}function p(r){switch(r%24){case 0:case 12:return 12;default:return r%12}}function g(){if(!(e.hourElement===void 0||e.minuteElement===void 0)){var r=(parseInt(e.hourElement.value.slice(-2),10)||0)%24,o=(parseInt(e.minuteElement.value,10)||0)%60,u=e.secondElement!==void 0?(parseInt(e.secondElement.value,10)||0)%60:0;e.amPM!==void 0&&(r=m(r,e.amPM.textContent));var f=e.config.minTime!==void 0||e.config.minDate&&e.minDateHasTime&&e.latestSelectedDateObj&&te(e.latestSelectedDateObj,e.config.minDate,!0)===0,b=e.config.maxTime!==void 0||e.config.maxDate&&e.maxDateHasTime&&e.latestSelectedDateObj&&te(e.latestSelectedDateObj,e.config.maxDate,!0)===0;if(e.config.maxTime!==void 0&&e.config.minTime!==void 0&&e.config.minTime>e.config.maxTime){var x=mt(e.config.minTime.getHours(),e.config.minTime.getMinutes(),e.config.minTime.getSeconds()),T=mt(e.config.maxTime.getHours(),e.config.maxTime.getMinutes(),e.config.maxTime.getSeconds()),D=mt(r,o,u);if(D>T&&D<x){var I=Wn(x);r=I[0],o=I[1],u=I[2]}}else{if(b){var C=e.config.maxTime!==void 0?e.config.maxTime:e.config.maxDate;r=Math.min(r,C.getHours()),r===C.getHours()&&(o=Math.min(o,C.getMinutes())),o===C.getMinutes()&&(u=Math.min(u,C.getSeconds()))}if(f){var M=e.config.minTime!==void 0?e.config.minTime:e.config.minDate;r=Math.max(r,M.getHours()),r===M.getHours()&&o<M.getMinutes()&&(o=M.getMinutes()),o===M.getMinutes()&&(u=Math.max(u,M.getSeconds()))}}w(r,o,u)}}function v(r){var o=r||e.latestSelectedDateObj;o&&o instanceof Date&&w(o.getHours(),o.getMinutes(),o.getSeconds())}function w(r,o,u){e.latestSelectedDateObj!==void 0&&e.latestSelectedDateObj.setHours(r%24,o,u||0,0),!(!e.hourElement||!e.minuteElement||e.isMobile)&&(e.hourElement.value=Q(e.config.time_24hr?r:(12+r)%12+12*ie(r%12===0)),e.minuteElement.value=Q(o),e.amPM!==void 0&&(e.amPM.textContent=e.l10n.amPM[ie(r>=12)]),e.secondElement!==void 0&&(e.secondElement.value=Q(u)))}function A(r){var o=ee(r),u=parseInt(o.value)+(r.delta||0);(u/1e3>1||r.key==="Enter"&&!/[^\d]/.test(u.toString()))&&Te(u)}function E(r,o,u,f){if(o instanceof Array)return o.forEach(function(b){return E(r,b,u,f)});if(r instanceof Array)return r.forEach(function(b){return E(b,o,u,f)});r.addEventListener(o,u,f),e._handlers.push({remove:function(){return r.removeEventListener(o,u,f)}})}function B(){J("onChange")}function L(){if(e.config.wrap&&["open","close","toggle","clear"].forEach(function(u){Array.prototype.forEach.call(e.element.querySelectorAll("[data-"+u+"]"),function(f){return E(f,"click",e[u])})}),e.isMobile){En();return}var r=jt(bn,50);if(e._debouncedChange=jt(B,Un),e.daysContainer&&!/iPhone|iPad|iPod/i.test(navigator.userAgent)&&E(e.daysContainer,"mouseover",function(u){e.config.mode==="range"&&Fe(ee(u))}),E(e._input,"keydown",Ft),e.calendarContainer!==void 0&&E(e.calendarContainer,"keydown",Ft),!e.config.inline&&!e.config.static&&E(window,"resize",r),window.ontouchstart!==void 0?E(window.document,"touchstart",lt):E(window.document,"mousedown",lt),E(window.document,"focus",lt,{capture:!0}),e.config.clickOpens===!0&&(E(e._input,"focus",e.open),E(e._input,"click",e.open)),e.daysContainer!==void 0&&(E(e.monthNav,"click",An),E(e.monthNav,["keyup","increment"],A),E(e.daysContainer,"click",Nt)),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0){var o=function(u){return ee(u).select()};E(e.timeContainer,["increment"],c),E(e.timeContainer,"blur",c,{capture:!0}),E(e.timeContainer,"click",O),E([e.hourElement,e.minuteElement],["focus","click"],o),e.secondElement!==void 0&&E(e.secondElement,"focus",function(){return e.secondElement&&e.secondElement.select()}),e.amPM!==void 0&&E(e.amPM,"click",function(u){c(u)})}e.config.allowInput&&E(e._input,"blur",mn)}function S(r,o){var u=r!==void 0?e.parseDate(r):e.latestSelectedDateObj||(e.config.minDate&&e.config.minDate>e.now?e.config.minDate:e.config.maxDate&&e.config.maxDate<e.now?e.config.maxDate:e.now),f=e.currentYear,b=e.currentMonth;try{u!==void 0&&(e.currentYear=u.getFullYear(),e.currentMonth=u.getMonth())}catch(x){x.message="Invalid date supplied: "+u,e.config.errorHandler(x)}o&&e.currentYear!==f&&(J("onYearChange"),j()),o&&(e.currentYear!==f||e.currentMonth!==b)&&J("onMonthChange"),e.redraw()}function O(r){var o=ee(r);~o.className.indexOf("arrow")&&h(r,o.classList.contains("arrowUp")?1:-1)}function h(r,o,u){var f=r&&ee(r),b=u||f&&f.parentNode&&f.parentNode.firstChild,x=st("increment");x.delta=o,b&&b.dispatchEvent(x)}function k(){var r=window.document.createDocumentFragment();if(e.calendarContainer=N("div","flatpickr-calendar"),e.calendarContainer.tabIndex=-1,!e.config.noCalendar){if(r.appendChild(Ae()),e.innerContainer=N("div","flatpickr-innerContainer"),e.config.weekNumbers){var o=un(),u=o.weekWrapper,f=o.weekNumbers;e.innerContainer.appendChild(u),e.weekNumbers=f,e.weekWrapper=u}e.rContainer=N("div","flatpickr-rContainer"),e.rContainer.appendChild(de()),e.daysContainer||(e.daysContainer=N("div","flatpickr-days"),e.daysContainer.tabIndex=-1),Y(),e.rContainer.appendChild(e.daysContainer),e.innerContainer.appendChild(e.rContainer),r.appendChild(e.innerContainer)}e.config.enableTime&&r.appendChild(ae()),G(e.calendarContainer,"rangeMode",e.config.mode==="range"),G(e.calendarContainer,"animate",e.config.animate===!0),G(e.calendarContainer,"multiMonth",e.config.showMonths>1),e.calendarContainer.appendChild(r);var b=e.config.appendTo!==void 0&&e.config.appendTo.nodeType!==void 0;if((e.config.inline||e.config.static)&&(e.calendarContainer.classList.add(e.config.inline?"inline":"static"),e.config.inline&&(!b&&e.element.parentNode?e.element.parentNode.insertBefore(e.calendarContainer,e._input.nextSibling):e.config.appendTo!==void 0&&e.config.appendTo.appendChild(e.calendarContainer)),e.config.static)){var x=N("div","flatpickr-wrapper");e.element.parentNode&&e.element.parentNode.insertBefore(x,e.element),x.appendChild(e.element),e.altInput&&x.appendChild(e.altInput),x.appendChild(e.calendarContainer)}!e.config.static&&!e.config.inline&&(e.config.appendTo!==void 0?e.config.appendTo:window.document.body).appendChild(e.calendarContainer)}function y(r,o,u,f){var b=ue(o,!0),x=N("span",r,o.getDate().toString());return x.dateObj=o,x.$i=f,x.setAttribute("aria-label",e.formatDate(o,e.config.ariaDateFormat)),r.indexOf("hidden")===-1&&te(o,e.now)===0&&(e.todayDateElem=x,x.classList.add("today"),x.setAttribute("aria-current","date")),b?(x.tabIndex=-1,ct(o)&&(x.classList.add("selected"),e.selectedDateElem=x,e.config.mode==="range"&&(G(x,"startRange",e.selectedDates[0]&&te(o,e.selectedDates[0],!0)===0),G(x,"endRange",e.selectedDates[1]&&te(o,e.selectedDates[1],!0)===0),r==="nextMonthDay"&&x.classList.add("inRange")))):x.classList.add("flatpickr-disabled"),e.config.mode==="range"&&Mn(o)&&!ct(o)&&x.classList.add("inRange"),e.weekNumbers&&e.config.showMonths===1&&r!=="prevMonthDay"&&f%7===6&&e.weekNumbers.insertAdjacentHTML("beforeend","<span class='flatpickr-day'>"+e.config.getWeek(o)+"</span>"),J("onDayCreate",x),x}function _(r){r.focus(),e.config.mode==="range"&&Fe(r)}function F(r){for(var o=r>0?0:e.config.showMonths-1,u=r>0?e.config.showMonths:-1,f=o;f!=u;f+=r)for(var b=e.daysContainer.children[f],x=r>0?0:b.children.length-1,T=r>0?b.children.length:-1,D=x;D!=T;D+=r){var I=b.children[D];if(I.className.indexOf("hidden")===-1&&ue(I.dateObj))return I}}function P(r,o){for(var u=r.className.indexOf("Month")===-1?r.dateObj.getMonth():e.currentMonth,f=o>0?e.config.showMonths:-1,b=o>0?1:-1,x=u-e.currentMonth;x!=f;x+=b)for(var T=e.daysContainer.children[x],D=u-e.currentMonth===x?r.$i+o:o<0?T.children.length-1:0,I=T.children.length,C=D;C>=0&&C<I&&C!=(o>0?I:-1);C+=b){var M=T.children[C];if(M.className.indexOf("hidden")===-1&&ue(M.dateObj)&&Math.abs(r.$i-C)>=Math.abs(o))return _(M)}e.changeMonth(b),q(F(b),0)}function q(r,o){var u=l(),f=Ie(u||document.body),b=r!==void 0?r:f?u:e.selectedDateElem!==void 0&&Ie(e.selectedDateElem)?e.selectedDateElem:e.todayDateElem!==void 0&&Ie(e.todayDateElem)?e.todayDateElem:F(o>0?1:-1);b===void 0?e._input.focus():f?P(b,o):_(b)}function W(r,o){for(var u=(new Date(r,o,1).getDay()-e.l10n.firstDayOfWeek+7)%7,f=e.utils.getDaysInMonth((o-1+12)%12,r),b=e.utils.getDaysInMonth(o,r),x=window.document.createDocumentFragment(),T=e.config.showMonths>1,D=T?"prevMonthDay hidden":"prevMonthDay",I=T?"nextMonthDay hidden":"nextMonthDay",C=f+1-u,M=0;C<=f;C++,M++)x.appendChild(y("flatpickr-day "+D,new Date(r,o-1,C),C,M));for(C=1;C<=b;C++,M++)x.appendChild(y("flatpickr-day",new Date(r,o,C),C,M));for(var $=b+1;$<=42-u&&(e.config.showMonths===1||M%7!==0);$++,M++)x.appendChild(y("flatpickr-day "+I,new Date(r,o+1,$%b),$,M));var oe=N("div","dayContainer");return oe.appendChild(x),oe}function Y(){if(e.daysContainer!==void 0){Oe(e.daysContainer),e.weekNumbers&&Oe(e.weekNumbers);for(var r=document.createDocumentFragment(),o=0;o<e.config.showMonths;o++){var u=new Date(e.currentYear,e.currentMonth,1);u.setMonth(e.currentMonth+o),r.appendChild(W(u.getFullYear(),u.getMonth()))}e.daysContainer.appendChild(r),e.days=e.daysContainer.firstChild,e.config.mode==="range"&&e.selectedDates.length===1&&Fe()}}function j(){if(!(e.config.showMonths>1||e.config.monthSelectorType!=="dropdown")){var r=function(f){return e.config.minDate!==void 0&&e.currentYear===e.config.minDate.getFullYear()&&f<e.config.minDate.getMonth()?!1:!(e.config.maxDate!==void 0&&e.currentYear===e.config.maxDate.getFullYear()&&f>e.config.maxDate.getMonth())};e.monthsDropdownContainer.tabIndex=-1,e.monthsDropdownContainer.innerHTML="";for(var o=0;o<12;o++)if(r(o)){var u=N("option","flatpickr-monthDropdown-month");u.value=new Date(e.currentYear,o).getMonth().toString(),u.textContent=Xe(o,e.config.shorthandCurrentMonth,e.l10n),u.tabIndex=-1,e.currentMonth===o&&(u.selected=!0),e.monthsDropdownContainer.appendChild(u)}}}function U(){var r=N("div","flatpickr-month"),o=window.document.createDocumentFragment(),u;e.config.showMonths>1||e.config.monthSelectorType==="static"?u=N("span","cur-month"):(e.monthsDropdownContainer=N("select","flatpickr-monthDropdown-months"),e.monthsDropdownContainer.setAttribute("aria-label",e.l10n.monthAriaLabel),E(e.monthsDropdownContainer,"change",function(T){var D=ee(T),I=parseInt(D.value,10);e.changeMonth(I-e.currentMonth),J("onMonthChange")}),j(),u=e.monthsDropdownContainer);var f=Ne("cur-year",{tabindex:"-1"}),b=f.getElementsByTagName("input")[0];b.setAttribute("aria-label",e.l10n.yearAriaLabel),e.config.minDate&&b.setAttribute("min",e.config.minDate.getFullYear().toString()),e.config.maxDate&&(b.setAttribute("max",e.config.maxDate.getFullYear().toString()),b.disabled=!!e.config.minDate&&e.config.minDate.getFullYear()===e.config.maxDate.getFullYear());var x=N("div","flatpickr-current-month");return x.appendChild(u),x.appendChild(f),o.appendChild(x),r.appendChild(o),{container:r,yearElement:b,monthElement:u}}function Z(){Oe(e.monthNav),e.monthNav.appendChild(e.prevMonthNav),e.config.showMonths&&(e.yearElements=[],e.monthElements=[]);for(var r=e.config.showMonths;r--;){var o=U();e.yearElements.push(o.yearElement),e.monthElements.push(o.monthElement),e.monthNav.appendChild(o.container)}e.monthNav.appendChild(e.nextMonthNav)}function Ae(){return e.monthNav=N("div","flatpickr-months"),e.yearElements=[],e.monthElements=[],e.prevMonthNav=N("span","flatpickr-prev-month"),e.prevMonthNav.innerHTML=e.config.prevArrow,e.nextMonthNav=N("span","flatpickr-next-month"),e.nextMonthNav.innerHTML=e.config.nextArrow,Z(),Object.defineProperty(e,"_hidePrevMonthArrow",{get:function(){return e.__hidePrevMonthArrow},set:function(r){e.__hidePrevMonthArrow!==r&&(G(e.prevMonthNav,"flatpickr-disabled",r),e.__hidePrevMonthArrow=r)}}),Object.defineProperty(e,"_hideNextMonthArrow",{get:function(){return e.__hideNextMonthArrow},set:function(r){e.__hideNextMonthArrow!==r&&(G(e.nextMonthNav,"flatpickr-disabled",r),e.__hideNextMonthArrow=r)}}),e.currentYearElement=e.yearElements[0],Le(),e.monthNav}function ae(){e.calendarContainer.classList.add("hasTime"),e.config.noCalendar&&e.calendarContainer.classList.add("noCalendar");var r=bt(e.config);e.timeContainer=N("div","flatpickr-time"),e.timeContainer.tabIndex=-1;var o=N("span","flatpickr-time-separator",":"),u=Ne("flatpickr-hour",{"aria-label":e.l10n.hourAriaLabel});e.hourElement=u.getElementsByTagName("input")[0];var f=Ne("flatpickr-minute",{"aria-label":e.l10n.minuteAriaLabel});if(e.minuteElement=f.getElementsByTagName("input")[0],e.hourElement.tabIndex=e.minuteElement.tabIndex=-1,e.hourElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getHours():e.config.time_24hr?r.hours:p(r.hours)),e.minuteElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getMinutes():r.minutes),e.hourElement.setAttribute("step",e.config.hourIncrement.toString()),e.minuteElement.setAttribute("step",e.config.minuteIncrement.toString()),e.hourElement.setAttribute("min",e.config.time_24hr?"0":"1"),e.hourElement.setAttribute("max",e.config.time_24hr?"23":"12"),e.hourElement.setAttribute("maxlength","2"),e.minuteElement.setAttribute("min","0"),e.minuteElement.setAttribute("max","59"),e.minuteElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(u),e.timeContainer.appendChild(o),e.timeContainer.appendChild(f),e.config.time_24hr&&e.timeContainer.classList.add("time24hr"),e.config.enableSeconds){e.timeContainer.classList.add("hasSeconds");var b=Ne("flatpickr-second");e.secondElement=b.getElementsByTagName("input")[0],e.secondElement.value=Q(e.latestSelectedDateObj?e.latestSelectedDateObj.getSeconds():r.seconds),e.secondElement.setAttribute("step",e.minuteElement.getAttribute("step")),e.secondElement.setAttribute("min","0"),e.secondElement.setAttribute("max","59"),e.secondElement.setAttribute("maxlength","2"),e.timeContainer.appendChild(N("span","flatpickr-time-separator",":")),e.timeContainer.appendChild(b)}return e.config.time_24hr||(e.amPM=N("span","flatpickr-am-pm",e.l10n.amPM[ie((e.latestSelectedDateObj?e.hourElement.value:e.config.defaultHour)>11)]),e.amPM.title=e.l10n.toggleTitle,e.amPM.tabIndex=-1,e.timeContainer.appendChild(e.amPM)),e.timeContainer}function de(){e.weekdayContainer?Oe(e.weekdayContainer):e.weekdayContainer=N("div","flatpickr-weekdays");for(var r=e.config.showMonths;r--;){var o=N("div","flatpickr-weekdaycontainer");e.weekdayContainer.appendChild(o)}return It(),e.weekdayContainer}function It(){if(e.weekdayContainer){var r=e.l10n.firstDayOfWeek,o=Bt(e.l10n.weekdays.shorthand);r>0&&r<o.length&&(o=Bt(o.splice(r,o.length),o.splice(0,r)));for(var u=e.config.showMonths;u--;)e.weekdayContainer.children[u].innerHTML=`
      <span class='flatpickr-weekday'>
        `+o.join("</span><span class='flatpickr-weekday'>")+`
      </span>
      `}}function un(){e.calendarContainer.classList.add("hasWeeks");var r=N("div","flatpickr-weekwrapper");r.appendChild(N("span","flatpickr-weekday",e.l10n.weekAbbreviation));var o=N("div","flatpickr-weeks");return r.appendChild(o),{weekWrapper:r,weekNumbers:o}}function rt(r,o){o===void 0&&(o=!0);var u=o?r:r-e.currentMonth;u<0&&e._hidePrevMonthArrow===!0||u>0&&e._hideNextMonthArrow===!0||(e.currentMonth+=u,(e.currentMonth<0||e.currentMonth>11)&&(e.currentYear+=e.currentMonth>11?1:-1,e.currentMonth=(e.currentMonth+12)%12,J("onYearChange"),j()),Y(),J("onMonthChange"),Le())}function pn(r,o){if(r===void 0&&(r=!0),o===void 0&&(o=!0),e.input.value="",e.altInput!==void 0&&(e.altInput.value=""),e.mobileInput!==void 0&&(e.mobileInput.value=""),e.selectedDates=[],e.latestSelectedDateObj=void 0,o===!0&&(e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth()),e.config.enableTime===!0){var u=bt(e.config),f=u.hours,b=u.minutes,x=u.seconds;w(f,b,x)}e.redraw(),r&&J("onChange")}function fn(){e.isOpen=!1,e.isMobile||(e.calendarContainer!==void 0&&e.calendarContainer.classList.remove("open"),e._input!==void 0&&e._input.classList.remove("active")),J("onClose")}function hn(){e.config!==void 0&&J("onDestroy");for(var r=e._handlers.length;r--;)e._handlers[r].remove();if(e._handlers=[],e.mobileInput)e.mobileInput.parentNode&&e.mobileInput.parentNode.removeChild(e.mobileInput),e.mobileInput=void 0;else if(e.calendarContainer&&e.calendarContainer.parentNode)if(e.config.static&&e.calendarContainer.parentNode){var o=e.calendarContainer.parentNode;if(o.lastChild&&o.removeChild(o.lastChild),o.parentNode){for(;o.firstChild;)o.parentNode.insertBefore(o.firstChild,o);o.parentNode.removeChild(o)}}else e.calendarContainer.parentNode.removeChild(e.calendarContainer);e.altInput&&(e.input.type="text",e.altInput.parentNode&&e.altInput.parentNode.removeChild(e.altInput),delete e.altInput),e.input&&(e.input.type=e.input._type,e.input.classList.remove("flatpickr-input"),e.input.removeAttribute("readonly")),["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","monthsDropdownContainer","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach(function(u){try{delete e[u]}catch{}})}function ye(r){return e.calendarContainer.contains(r)}function lt(r){if(e.isOpen&&!e.config.inline){var o=ee(r),u=ye(o),f=o===e.input||o===e.altInput||e.element.contains(o)||r.path&&r.path.indexOf&&(~r.path.indexOf(e.input)||~r.path.indexOf(e.altInput)),b=!f&&!u&&!ye(r.relatedTarget),x=!e.config.ignoredFocusElements.some(function(T){return T.contains(o)});b&&x&&(e.config.allowInput&&e.setDate(e._input.value,!1,e.config.altInput?e.config.altFormat:e.config.dateFormat),e.timeContainer!==void 0&&e.minuteElement!==void 0&&e.hourElement!==void 0&&e.input.value!==""&&e.input.value!==void 0&&c(),e.close(),e.config&&e.config.mode==="range"&&e.selectedDates.length===1&&e.clear(!1))}}function Te(r){if(!(!r||e.config.minDate&&r<e.config.minDate.getFullYear()||e.config.maxDate&&r>e.config.maxDate.getFullYear())){var o=r,u=e.currentYear!==o;e.currentYear=o||e.currentYear,e.config.maxDate&&e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth=Math.min(e.config.maxDate.getMonth(),e.currentMonth):e.config.minDate&&e.currentYear===e.config.minDate.getFullYear()&&(e.currentMonth=Math.max(e.config.minDate.getMonth(),e.currentMonth)),u&&(e.redraw(),J("onYearChange"),j())}}function ue(r,o){var u;o===void 0&&(o=!0);var f=e.parseDate(r,void 0,o);if(e.config.minDate&&f&&te(f,e.config.minDate,o!==void 0?o:!e.minDateHasTime)<0||e.config.maxDate&&f&&te(f,e.config.maxDate,o!==void 0?o:!e.maxDateHasTime)>0)return!1;if(!e.config.enable&&e.config.disable.length===0)return!0;if(f===void 0)return!1;for(var b=!!e.config.enable,x=(u=e.config.enable)!==null&&u!==void 0?u:e.config.disable,T=0,D=void 0;T<x.length;T++){if(D=x[T],typeof D=="function"&&D(f))return b;if(D instanceof Date&&f!==void 0&&D.getTime()===f.getTime())return b;if(typeof D=="string"){var I=e.parseDate(D,void 0,!0);return I&&I.getTime()===f.getTime()?b:!b}else if(typeof D=="object"&&f!==void 0&&D.from&&D.to&&f.getTime()>=D.from.getTime()&&f.getTime()<=D.to.getTime())return b}return!b}function Ie(r){return e.daysContainer!==void 0?r.className.indexOf("hidden")===-1&&r.className.indexOf("flatpickr-disabled")===-1&&e.daysContainer.contains(r):!1}function mn(r){var o=r.target===e._input,u=e._input.value.trimEnd()!==dt();o&&u&&!(r.relatedTarget&&ye(r.relatedTarget))&&e.setDate(e._input.value,!0,r.target===e.altInput?e.config.altFormat:e.config.dateFormat)}function Ft(r){var o=ee(r),u=e.config.wrap?i.contains(o):o===e._input,f=e.config.allowInput,b=e.isOpen&&(!f||!u),x=e.config.inline&&u&&!f;if(r.keyCode===13&&u){if(f)return e.setDate(e._input.value,!0,o===e.altInput?e.config.altFormat:e.config.dateFormat),e.close(),o.blur();e.open()}else if(ye(o)||b||x){var T=!!e.timeContainer&&e.timeContainer.contains(o);switch(r.keyCode){case 13:T?(r.preventDefault(),c(),ot()):Nt(r);break;case 27:r.preventDefault(),ot();break;case 8:case 46:u&&!e.config.allowInput&&(r.preventDefault(),e.clear());break;case 37:case 39:if(!T&&!u){r.preventDefault();var D=l();if(e.daysContainer!==void 0&&(f===!1||D&&Ie(D))){var I=r.keyCode===39?1:-1;r.ctrlKey?(r.stopPropagation(),rt(I),q(F(1),0)):q(void 0,I)}}else e.hourElement&&e.hourElement.focus();break;case 38:case 40:r.preventDefault();var C=r.keyCode===40?1:-1;e.daysContainer&&o.$i!==void 0||o===e.input||o===e.altInput?r.ctrlKey?(r.stopPropagation(),Te(e.currentYear-C),q(F(1),0)):T||q(void 0,C*7):o===e.currentYearElement?Te(e.currentYear-C):e.config.enableTime&&(!T&&e.hourElement&&e.hourElement.focus(),c(r),e._debouncedChange());break;case 9:if(T){var M=[e.hourElement,e.minuteElement,e.secondElement,e.amPM].concat(e.pluginElements).filter(function(X){return X}),$=M.indexOf(o);if($!==-1){var oe=M[$+(r.shiftKey?-1:1)];r.preventDefault(),(oe||e._input).focus()}}else!e.config.noCalendar&&e.daysContainer&&e.daysContainer.contains(o)&&r.shiftKey&&(r.preventDefault(),e._input.focus());break}}if(e.amPM!==void 0&&o===e.amPM)switch(r.key){case e.l10n.amPM[0].charAt(0):case e.l10n.amPM[0].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[0],g(),se();break;case e.l10n.amPM[1].charAt(0):case e.l10n.amPM[1].charAt(0).toLowerCase():e.amPM.textContent=e.l10n.amPM[1],g(),se();break}(u||ye(o))&&J("onKeyDown",r)}function Fe(r,o){if(o===void 0&&(o="flatpickr-day"),!(e.selectedDates.length!==1||r&&(!r.classList.contains(o)||r.classList.contains("flatpickr-disabled")))){for(var u=r?r.dateObj.getTime():e.days.firstElementChild.dateObj.getTime(),f=e.parseDate(e.selectedDates[0],void 0,!0).getTime(),b=Math.min(u,e.selectedDates[0].getTime()),x=Math.max(u,e.selectedDates[0].getTime()),T=!1,D=0,I=0,C=b;C<x;C+=Yn.DAY)ue(new Date(C),!0)||(T=T||C>b&&C<x,C<f&&(!D||C>D)?D=C:C>f&&(!I||C<I)&&(I=C));var M=Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+"+e.config.showMonths+") > ."+o));M.forEach(function($){var oe=$.dateObj,X=oe.getTime(),ve=D>0&&X<D||I>0&&X>I;if(ve){$.classList.add("notAllowed"),["inRange","startRange","endRange"].forEach(function(me){$.classList.remove(me)});return}else if(T&&!ve)return;["startRange","inRange","endRange","notAllowed"].forEach(function(me){$.classList.remove(me)}),r!==void 0&&(r.classList.add(u<=e.selectedDates[0].getTime()?"startRange":"endRange"),f<u&&X===f?$.classList.add("startRange"):f>u&&X===f&&$.classList.add("endRange"),X>=D&&(I===0||X<=I)&&Hn(X,f,u)&&$.classList.add("inRange"))})}}function bn(){e.isOpen&&!e.config.static&&!e.config.inline&&Pe()}function gn(r,o){if(o===void 0&&(o=e._positionElement),e.isMobile===!0){if(r){r.preventDefault();var u=ee(r);u&&u.blur()}e.mobileInput!==void 0&&(e.mobileInput.focus(),e.mobileInput.click()),J("onOpen");return}else if(e._input.disabled||e.config.inline)return;var f=e.isOpen;e.isOpen=!0,f||(e.calendarContainer.classList.add("open"),e._input.classList.add("active"),J("onOpen"),Pe(o)),e.config.enableTime===!0&&e.config.noCalendar===!0&&e.config.allowInput===!1&&(r===void 0||!e.timeContainer.contains(r.relatedTarget))&&setTimeout(function(){return e.hourElement.select()},50)}function Pt(r){return function(o){var u=e.config["_"+r+"Date"]=e.parseDate(o,e.config.dateFormat),f=e.config["_"+(r==="min"?"max":"min")+"Date"];u!==void 0&&(e[r==="min"?"minDateHasTime":"maxDateHasTime"]=u.getHours()>0||u.getMinutes()>0||u.getSeconds()>0),e.selectedDates&&(e.selectedDates=e.selectedDates.filter(function(b){return ue(b)}),!e.selectedDates.length&&r==="min"&&v(u),se()),e.daysContainer&&(Ot(),u!==void 0?e.currentYearElement[r]=u.getFullYear().toString():e.currentYearElement.removeAttribute(r),e.currentYearElement.disabled=!!f&&u!==void 0&&f.getFullYear()===u.getFullYear())}}function yn(){var r=["wrap","weekNumbers","allowInput","allowInvalidPreload","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],o=V(V({},JSON.parse(JSON.stringify(i.dataset||{}))),t),u={};e.config.parseDate=o.parseDate,e.config.formatDate=o.formatDate,Object.defineProperty(e.config,"enable",{get:function(){return e.config._enable},set:function(M){e.config._enable=_t(M)}}),Object.defineProperty(e.config,"disable",{get:function(){return e.config._disable},set:function(M){e.config._disable=_t(M)}});var f=o.mode==="time";if(!o.dateFormat&&(o.enableTime||f)){var b=H.defaultConfig.dateFormat||be.dateFormat;u.dateFormat=o.noCalendar||f?"H:i"+(o.enableSeconds?":S":""):b+" H:i"+(o.enableSeconds?":S":"")}if(o.altInput&&(o.enableTime||f)&&!o.altFormat){var x=H.defaultConfig.altFormat||be.altFormat;u.altFormat=o.noCalendar||f?"h:i"+(o.enableSeconds?":S K":" K"):x+(" h:i"+(o.enableSeconds?":S":"")+" K")}Object.defineProperty(e.config,"minDate",{get:function(){return e.config._minDate},set:Pt("min")}),Object.defineProperty(e.config,"maxDate",{get:function(){return e.config._maxDate},set:Pt("max")});var T=function(M){return function($){e.config[M==="min"?"_minTime":"_maxTime"]=e.parseDate($,"H:i:S")}};Object.defineProperty(e.config,"minTime",{get:function(){return e.config._minTime},set:T("min")}),Object.defineProperty(e.config,"maxTime",{get:function(){return e.config._maxTime},set:T("max")}),o.mode==="time"&&(e.config.noCalendar=!0,e.config.enableTime=!0),Object.assign(e.config,u,o);for(var D=0;D<r.length;D++)e.config[r[D]]=e.config[r[D]]===!0||e.config[r[D]]==="true";pt.filter(function(M){return e.config[M]!==void 0}).forEach(function(M){e.config[M]=ft(e.config[M]||[]).map(s)}),e.isMobile=!e.config.disableMobile&&!e.config.inline&&e.config.mode==="single"&&!e.config.disable.length&&!e.config.enable&&!e.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);for(var D=0;D<e.config.plugins.length;D++){var I=e.config.plugins[D](e)||{};for(var C in I)pt.indexOf(C)>-1?e.config[C]=ft(I[C]).map(s).concat(e.config[C]):typeof o[C]>"u"&&(e.config[C]=I[C])}o.altInputClass||(e.config.altInputClass=Rt().className+" "+e.config.altInputClass),J("onParseConfig")}function Rt(){return e.config.wrap?i.querySelector("[data-input]"):i}function Lt(){typeof e.config.locale!="object"&&typeof H.l10ns[e.config.locale]>"u"&&e.config.errorHandler(new Error("flatpickr: invalid locale "+e.config.locale)),e.l10n=V(V({},H.l10ns.default),typeof e.config.locale=="object"?e.config.locale:e.config.locale!=="default"?H.l10ns[e.config.locale]:void 0),pe.D="("+e.l10n.weekdays.shorthand.join("|")+")",pe.l="("+e.l10n.weekdays.longhand.join("|")+")",pe.M="("+e.l10n.months.shorthand.join("|")+")",pe.F="("+e.l10n.months.longhand.join("|")+")",pe.K="("+e.l10n.amPM[0]+"|"+e.l10n.amPM[1]+"|"+e.l10n.amPM[0].toLowerCase()+"|"+e.l10n.amPM[1].toLowerCase()+")";var r=V(V({},t),JSON.parse(JSON.stringify(i.dataset||{})));r.time_24hr===void 0&&H.defaultConfig.time_24hr===void 0&&(e.config.time_24hr=e.l10n.time_24hr),e.formatDate=Qt(e),e.parseDate=gt({config:e.config,l10n:e.l10n})}function Pe(r){if(typeof e.config.position=="function")return void e.config.position(e,r);if(e.calendarContainer!==void 0){J("onPreCalendarPosition");var o=r||e._positionElement,u=Array.prototype.reduce.call(e.calendarContainer.children,(function(zn,_n){return zn+_n.offsetHeight}),0),f=e.calendarContainer.offsetWidth,b=e.config.position.split(" "),x=b[0],T=b.length>1?b[1]:null,D=o.getBoundingClientRect(),I=window.innerHeight-D.bottom,C=x==="above"||x!=="below"&&I<u&&D.top>u,M=window.pageYOffset+D.top+(C?-u-2:o.offsetHeight+2);if(G(e.calendarContainer,"arrowTop",!C),G(e.calendarContainer,"arrowBottom",C),!e.config.inline){var $=window.pageXOffset+D.left,oe=!1,X=!1;T==="center"?($-=(f-D.width)/2,oe=!0):T==="right"&&($-=f-D.width,X=!0),G(e.calendarContainer,"arrowLeft",!oe&&!X),G(e.calendarContainer,"arrowCenter",oe),G(e.calendarContainer,"arrowRight",X);var ve=window.document.body.offsetWidth-(window.pageXOffset+D.right),me=$+f>window.document.body.offsetWidth,In=ve+f>window.document.body.offsetWidth;if(G(e.calendarContainer,"rightMost",me),!e.config.static)if(e.calendarContainer.style.top=M+"px",!me)e.calendarContainer.style.left=$+"px",e.calendarContainer.style.right="auto";else if(!In)e.calendarContainer.style.left="auto",e.calendarContainer.style.right=ve+"px";else{var ut=vn();if(ut===void 0)return;var Fn=window.document.body.offsetWidth,Pn=Math.max(0,Fn/2-f/2),Rn=".flatpickr-calendar.centerMost:before",Ln=".flatpickr-calendar.centerMost:after",On=ut.cssRules.length,Nn="{left:"+D.left+"px;right:auto;}";G(e.calendarContainer,"rightMost",!1),G(e.calendarContainer,"centerMost",!0),ut.insertRule(Rn+","+Ln+Nn,On),e.calendarContainer.style.left=Pn+"px",e.calendarContainer.style.right="auto"}}}}function vn(){for(var r=null,o=0;o<document.styleSheets.length;o++){var u=document.styleSheets[o];if(u.cssRules){try{u.cssRules}catch{continue}r=u;break}}return r??xn()}function xn(){var r=document.createElement("style");return document.head.appendChild(r),r.sheet}function Ot(){e.config.noCalendar||e.isMobile||(j(),Le(),Y())}function ot(){e._input.focus(),window.navigator.userAgent.indexOf("MSIE")!==-1||navigator.msMaxTouchPoints!==void 0?setTimeout(e.close,0):e.close()}function Nt(r){r.preventDefault(),r.stopPropagation();var o=function(M){return M.classList&&M.classList.contains("flatpickr-day")&&!M.classList.contains("flatpickr-disabled")&&!M.classList.contains("notAllowed")},u=Kt(ee(r),o);if(u!==void 0){var f=u,b=e.latestSelectedDateObj=new Date(f.dateObj.getTime()),x=(b.getMonth()<e.currentMonth||b.getMonth()>e.currentMonth+e.config.showMonths-1)&&e.config.mode!=="range";if(e.selectedDateElem=f,e.config.mode==="single")e.selectedDates=[b];else if(e.config.mode==="multiple"){var T=ct(b);T?e.selectedDates.splice(parseInt(T),1):e.selectedDates.push(b)}else e.config.mode==="range"&&(e.selectedDates.length===2&&e.clear(!1,!1),e.latestSelectedDateObj=b,e.selectedDates.push(b),te(b,e.selectedDates[0],!0)!==0&&e.selectedDates.sort(function(M,$){return M.getTime()-$.getTime()}));if(g(),x){var D=e.currentYear!==b.getFullYear();e.currentYear=b.getFullYear(),e.currentMonth=b.getMonth(),D&&(J("onYearChange"),j()),J("onMonthChange")}if(Le(),Y(),se(),!x&&e.config.mode!=="range"&&e.config.showMonths===1?_(f):e.selectedDateElem!==void 0&&e.hourElement===void 0&&e.selectedDateElem&&e.selectedDateElem.focus(),e.hourElement!==void 0&&e.hourElement!==void 0&&e.hourElement.focus(),e.config.closeOnSelect){var I=e.config.mode==="single"&&!e.config.enableTime,C=e.config.mode==="range"&&e.selectedDates.length===2&&!e.config.enableTime;(I||C)&&ot()}B()}}var Re={locale:[Lt,It],showMonths:[Z,d,de],minDate:[S],maxDate:[S],positionElement:[$t],clickOpens:[function(){e.config.clickOpens===!0?(E(e._input,"focus",e.open),E(e._input,"click",e.open)):(e._input.removeEventListener("focus",e.open),e._input.removeEventListener("click",e.open))}]};function kn(r,o){if(r!==null&&typeof r=="object"){Object.assign(e.config,r);for(var u in r)Re[u]!==void 0&&Re[u].forEach(function(f){return f()})}else e.config[r]=o,Re[r]!==void 0?Re[r].forEach(function(f){return f()}):pt.indexOf(r)>-1&&(e.config[r]=ft(o));e.redraw(),se(!0)}function zt(r,o){var u=[];if(r instanceof Array)u=r.map(function(f){return e.parseDate(f,o)});else if(r instanceof Date||typeof r=="number")u=[e.parseDate(r,o)];else if(typeof r=="string")switch(e.config.mode){case"single":case"time":u=[e.parseDate(r,o)];break;case"multiple":u=r.split(e.config.conjunction).map(function(f){return e.parseDate(f,o)});break;case"range":u=r.split(e.l10n.rangeSeparator).map(function(f){return e.parseDate(f,o)});break}else e.config.errorHandler(new Error("Invalid date supplied: "+JSON.stringify(r)));e.selectedDates=e.config.allowInvalidPreload?u:u.filter(function(f){return f instanceof Date&&ue(f,!1)}),e.config.mode==="range"&&e.selectedDates.sort(function(f,b){return f.getTime()-b.getTime()})}function wn(r,o,u){if(o===void 0&&(o=!1),u===void 0&&(u=e.config.dateFormat),r!==0&&!r||r instanceof Array&&r.length===0)return e.clear(o);zt(r,u),e.latestSelectedDateObj=e.selectedDates[e.selectedDates.length-1],e.redraw(),S(void 0,o),v(),e.selectedDates.length===0&&e.clear(!1),se(o),o&&J("onChange")}function _t(r){return r.slice().map(function(o){return typeof o=="string"||typeof o=="number"||o instanceof Date?e.parseDate(o,void 0,!0):o&&typeof o=="object"&&o.from&&o.to?{from:e.parseDate(o.from,void 0),to:e.parseDate(o.to,void 0)}:o}).filter(function(o){return o})}function Cn(){e.selectedDates=[],e.now=e.parseDate(e.config.now)||new Date;var r=e.config.defaultDate||((e.input.nodeName==="INPUT"||e.input.nodeName==="TEXTAREA")&&e.input.placeholder&&e.input.value===e.input.placeholder?null:e.input.value);r&&zt(r,e.config.dateFormat),e._initialDate=e.selectedDates.length>0?e.selectedDates[0]:e.config.minDate&&e.config.minDate.getTime()>e.now.getTime()?e.config.minDate:e.config.maxDate&&e.config.maxDate.getTime()<e.now.getTime()?e.config.maxDate:e.now,e.currentYear=e._initialDate.getFullYear(),e.currentMonth=e._initialDate.getMonth(),e.selectedDates.length>0&&(e.latestSelectedDateObj=e.selectedDates[0]),e.config.minTime!==void 0&&(e.config.minTime=e.parseDate(e.config.minTime,"H:i")),e.config.maxTime!==void 0&&(e.config.maxTime=e.parseDate(e.config.maxTime,"H:i")),e.minDateHasTime=!!e.config.minDate&&(e.config.minDate.getHours()>0||e.config.minDate.getMinutes()>0||e.config.minDate.getSeconds()>0),e.maxDateHasTime=!!e.config.maxDate&&(e.config.maxDate.getHours()>0||e.config.maxDate.getMinutes()>0||e.config.maxDate.getSeconds()>0)}function Dn(){if(e.input=Rt(),!e.input){e.config.errorHandler(new Error("Invalid input element specified"));return}e.input._type=e.input.type,e.input.type="text",e.input.classList.add("flatpickr-input"),e._input=e.input,e.config.altInput&&(e.altInput=N(e.input.nodeName,e.config.altInputClass),e._input=e.altInput,e.altInput.placeholder=e.input.placeholder,e.altInput.disabled=e.input.disabled,e.altInput.required=e.input.required,e.altInput.tabIndex=e.input.tabIndex,e.altInput.type="text",e.input.setAttribute("type","hidden"),!e.config.static&&e.input.parentNode&&e.input.parentNode.insertBefore(e.altInput,e.input.nextSibling)),e.config.allowInput||e._input.setAttribute("readonly","readonly"),$t()}function $t(){e._positionElement=e.config.positionElement||e._input}function En(){var r=e.config.enableTime?e.config.noCalendar?"time":"datetime-local":"date";e.mobileInput=N("input",e.input.className+" flatpickr-mobile"),e.mobileInput.tabIndex=1,e.mobileInput.type=r,e.mobileInput.disabled=e.input.disabled,e.mobileInput.required=e.input.required,e.mobileInput.placeholder=e.input.placeholder,e.mobileFormatStr=r==="datetime-local"?"Y-m-d\\TH:i:S":r==="date"?"Y-m-d":"H:i:S",e.selectedDates.length>0&&(e.mobileInput.defaultValue=e.mobileInput.value=e.formatDate(e.selectedDates[0],e.mobileFormatStr)),e.config.minDate&&(e.mobileInput.min=e.formatDate(e.config.minDate,"Y-m-d")),e.config.maxDate&&(e.mobileInput.max=e.formatDate(e.config.maxDate,"Y-m-d")),e.input.getAttribute("step")&&(e.mobileInput.step=String(e.input.getAttribute("step"))),e.input.type="hidden",e.altInput!==void 0&&(e.altInput.type="hidden");try{e.input.parentNode&&e.input.parentNode.insertBefore(e.mobileInput,e.input.nextSibling)}catch{}E(e.mobileInput,"change",function(o){e.setDate(ee(o).value,!1,e.mobileFormatStr),J("onChange"),J("onClose")})}function Sn(r){if(e.isOpen===!0)return e.close();e.open(r)}function J(r,o){if(e.config!==void 0){var u=e.config[r];if(u!==void 0&&u.length>0)for(var f=0;u[f]&&f<u.length;f++)u[f](e.selectedDates,e.input.value,e,o);r==="onChange"&&(e.input.dispatchEvent(st("change")),e.input.dispatchEvent(st("input")))}}function st(r){var o=document.createEvent("Event");return o.initEvent(r,!0,!0),o}function ct(r){for(var o=0;o<e.selectedDates.length;o++){var u=e.selectedDates[o];if(u instanceof Date&&te(u,r)===0)return""+o}return!1}function Mn(r){return e.config.mode!=="range"||e.selectedDates.length<2?!1:te(r,e.selectedDates[0])>=0&&te(r,e.selectedDates[1])<=0}function Le(){e.config.noCalendar||e.isMobile||!e.monthNav||(e.yearElements.forEach(function(r,o){var u=new Date(e.currentYear,e.currentMonth,1);u.setMonth(e.currentMonth+o),e.config.showMonths>1||e.config.monthSelectorType==="static"?e.monthElements[o].textContent=Xe(u.getMonth(),e.config.shorthandCurrentMonth,e.l10n)+" ":e.monthsDropdownContainer.value=u.getMonth().toString(),r.value=u.getFullYear().toString()}),e._hidePrevMonthArrow=e.config.minDate!==void 0&&(e.currentYear===e.config.minDate.getFullYear()?e.currentMonth<=e.config.minDate.getMonth():e.currentYear<e.config.minDate.getFullYear()),e._hideNextMonthArrow=e.config.maxDate!==void 0&&(e.currentYear===e.config.maxDate.getFullYear()?e.currentMonth+1>e.config.maxDate.getMonth():e.currentYear>e.config.maxDate.getFullYear()))}function dt(r){var o=r||(e.config.altInput?e.config.altFormat:e.config.dateFormat);return e.selectedDates.map(function(u){return e.formatDate(u,o)}).filter(function(u,f,b){return e.config.mode!=="range"||e.config.enableTime||b.indexOf(u)===f}).join(e.config.mode!=="range"?e.config.conjunction:e.l10n.rangeSeparator)}function se(r){r===void 0&&(r=!0),e.mobileInput!==void 0&&e.mobileFormatStr&&(e.mobileInput.value=e.latestSelectedDateObj!==void 0?e.formatDate(e.latestSelectedDateObj,e.mobileFormatStr):""),e.input.value=dt(e.config.dateFormat),e.altInput!==void 0&&(e.altInput.value=dt(e.config.altFormat)),r!==!1&&J("onValueUpdate")}function An(r){var o=ee(r),u=e.prevMonthNav.contains(o),f=e.nextMonthNav.contains(o);u||f?rt(u?-1:1):e.yearElements.indexOf(o)>=0?o.select():o.classList.contains("arrowUp")?e.changeYear(e.currentYear+1):o.classList.contains("arrowDown")&&e.changeYear(e.currentYear-1)}function Tn(r){r.preventDefault();var o=r.type==="keydown",u=ee(r),f=u;e.amPM!==void 0&&u===e.amPM&&(e.amPM.textContent=e.l10n.amPM[ie(e.amPM.textContent===e.l10n.amPM[0])]);var b=parseFloat(f.getAttribute("min")),x=parseFloat(f.getAttribute("max")),T=parseFloat(f.getAttribute("step")),D=parseInt(f.value,10),I=r.delta||(o?r.which===38?1:-1:0),C=D+T*I;if(typeof f.value<"u"&&f.value.length===2){var M=f===e.hourElement,$=f===e.minuteElement;C<b?(C=x+C+ie(!M)+(ie(M)&&ie(!e.amPM)),$&&h(void 0,-1,e.hourElement)):C>x&&(C=f===e.hourElement?C-x-ie(!e.amPM):b,$&&h(void 0,1,e.hourElement)),e.amPM&&M&&(T===1?C+D===23:Math.abs(C-D)>T)&&(e.amPM.textContent=e.l10n.amPM[ie(e.amPM.textContent===e.l10n.amPM[0])]),f.value=Q(C)}}return n(),e}function ge(i,t){for(var e=Array.prototype.slice.call(i).filter(function(s){return s instanceof HTMLElement}),a=[],n=0;n<e.length;n++){var l=e[n];try{if(l.getAttribute("data-fp-omit")!==null)continue;l._flatpickr!==void 0&&(l._flatpickr.destroy(),l._flatpickr=void 0),l._flatpickr=Zn(l,t||{}),a.push(l._flatpickr)}catch(s){console.error(s)}}return a.length===1?a[0]:a}typeof HTMLElement<"u"&&typeof HTMLCollection<"u"&&typeof NodeList<"u"&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(i){return ge(this,i)},HTMLElement.prototype.flatpickr=function(i){return ge([this],i)});var H=function(i,t){return typeof i=="string"?ge(window.document.querySelectorAll(i),t):i instanceof Node?ge([i],t):ge(i,t)};H.defaultConfig={};H.l10ns={en:V({},Se),default:V({},Se)};H.localize=function(i){H.l10ns.default=V(V({},H.l10ns.default),i)};H.setDefaults=function(i){H.defaultConfig=V(V({},H.defaultConfig),i)};H.parseDate=gt({});H.formatDate=Qt({});H.compareDates=te;typeof jQuery<"u"&&typeof jQuery.fn<"u"&&(jQuery.fn.flatpickr=function(i){return ge(this,i)});Date.prototype.fp_incr=function(i){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+(typeof i=="string"?parseInt(i,10):i))};typeof window<"u"&&(window.flatpickr=H);var we={exports:{}},Vn=we.exports,qt;function Gn(){return qt||(qt=1,(function(i,t){(function(e,a){a(t)})(Vn,(function(e){var a=typeof window<"u"&&window.flatpickr!==void 0?window.flatpickr:{l10ns:{}},n={weekdays:{shorthand:["Ne","Po","Út","St","Čt","Pá","So"],longhand:["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"]},months:{shorthand:["Led","Ún","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Pro"],longhand:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"]},firstDayOfWeek:1,ordinal:function(){return"."},rangeSeparator:" do ",weekAbbreviation:"Týd.",scrollTitle:"Rolujte pro změnu",toggleTitle:"Přepnout dopoledne/odpoledne",amPM:["dop.","odp."],yearAriaLabel:"Rok",time_24hr:!0};a.l10ns.cs=n;var l=a.l10ns;e.Czech=n,e.default=l,Object.defineProperty(e,"__esModule",{value:!0})}))})(we,we.exports)),we.exports}var Jt=Gn();const Kn='.flatpickr-calendar{background:transparent;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-touch-action:manipulation;touch-action:manipulation;background:#fff;-webkit-box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,.08);box-shadow:1px 0 #e6e6e6,-1px 0 #e6e6e6,0 1px #e6e6e6,0 -1px #e6e6e6,0 3px 13px #00000014}.flatpickr-calendar.open,.flatpickr-calendar.inline{opacity:1;max-height:640px;visibility:visible}.flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr-calendar.animate.open{-webkit-animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1);animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1)}.flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){-webkit-box-shadow:none!important;box-shadow:none!important}.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){-webkit-box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-2px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-calendar .hasWeeks .dayContainer,.flatpickr-calendar .hasTime .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr-calendar.hasTime .flatpickr-time{height:40px;border-top:1px solid #e6e6e6}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:before,.flatpickr-calendar:after{position:absolute;display:block;pointer-events:none;border:solid transparent;content:"";height:0;width:0;left:22px}.flatpickr-calendar.rightMost:before,.flatpickr-calendar.arrowRight:before,.flatpickr-calendar.rightMost:after,.flatpickr-calendar.arrowRight:after{left:auto;right:22px}.flatpickr-calendar.arrowCenter:before,.flatpickr-calendar.arrowCenter:after{left:50%;right:50%}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:before,.flatpickr-calendar.arrowBottom:after{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-calendar:focus{outline:0}.flatpickr-wrapper{position:relative;display:inline-block}.flatpickr-months{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-months .flatpickr-month{background:transparent;color:#000000e6;fill:#000000e6;height:34px;line-height:1;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;overflow:hidden;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.flatpickr-months .flatpickr-prev-month,.flatpickr-months .flatpickr-next-month{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:#000000e6;fill:#000000e6}.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,.flatpickr-months .flatpickr-next-month.flatpickr-disabled{display:none}.flatpickr-months .flatpickr-prev-month i,.flatpickr-months .flatpickr-next-month i{position:relative}.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,.flatpickr-months .flatpickr-next-month.flatpickr-prev-month{left:0}.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,.flatpickr-months .flatpickr-next-month.flatpickr-next-month{right:0}.flatpickr-months .flatpickr-prev-month:hover,.flatpickr-months .flatpickr-next-month:hover{color:#959ea9}.flatpickr-months .flatpickr-prev-month:hover svg,.flatpickr-months .flatpickr-next-month:hover svg{fill:#f64747}.flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{width:14px;height:14px}.flatpickr-months .flatpickr-prev-month svg path,.flatpickr-months .flatpickr-next-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper input::-ms-clear{display:none}.numInputWrapper input::-webkit-outer-spin-button,.numInputWrapper input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(57,57,57,.15);-webkit-box-sizing:border-box;box-sizing:border-box}.numInputWrapper span:hover{background:#0000001a}.numInputWrapper span:active{background:#0003}.numInputWrapper span:after{display:block;content:"";position:absolute}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,.6);top:26%}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,.6);top:40%}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:#00000080}.numInputWrapper:hover{background:#0000000d}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0;line-height:1;height:34px;display:inline-block;text-align:center;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0)}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr-current-month span.cur-month:hover{background:#0000000d}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch�;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:#000000e6}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:#000000e6}.flatpickr-current-month input.cur-year{background:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:#00000080;background:transparent;pointer-events:none}.flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:transparent;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0;outline:none;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-current-month .flatpickr-monthDropdown-months:active{outline:none}.flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:#0000000d}.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:transparent;outline:none;padding:0}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:28px}.flatpickr-weekdays .flatpickr-weekdaycontainer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}span.flatpickr-weekday{cursor:default;font-size:90%;background:transparent;color:#0000008a;line-height:1;margin:0;text-align:center;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-weight:bolder}.dayContainer,.flatpickr-weeks{padding:1px 0 0}.flatpickr-days{position:relative;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;width:307.875px}.flatpickr-days:focus{outline:0}.dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;-webkit-justify-content:space-around;justify-content:space-around;-webkit-transform:translate3d(0px,0px,0px);transform:translateZ(0);opacity:1}.dayContainer+.dayContainer{-webkit-box-shadow:-1px 0 0 #e6e6e6;box-shadow:-1px 0 #e6e6e6}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-webkit-flex-basis:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.today.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day:hover,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.nextMonthDay:hover,.flatpickr-day:focus,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.nextMonthDay:focus{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:hover,.flatpickr-day.today:focus{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected.inRange,.flatpickr-day.startRange.inRange,.flatpickr-day.endRange.inRange,.flatpickr-day.selected:focus,.flatpickr-day.startRange:focus,.flatpickr-day.endRange:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.endRange.nextMonthDay{background:#569ff7;-webkit-box-shadow:none;box-shadow:none;color:#fff;border-color:#569ff7}.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange,.flatpickr-day.endRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange,.flatpickr-day.endRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)){-webkit-box-shadow:-10px 0 0 #569ff7;box-shadow:-10px 0 #569ff7}.flatpickr-day.selected.startRange.endRange,.flatpickr-day.startRange.startRange.endRange,.flatpickr-day.endRange.startRange.endRange{border-radius:50px}.flatpickr-day.inRange{border-radius:0;-webkit-box-shadow:-5px 0 0 #e6e6e6,5px 0 0 #e6e6e6;box-shadow:-5px 0 #e6e6e6,5px 0 #e6e6e6}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover,.flatpickr-day.prevMonthDay,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.notAllowed.nextMonthDay{color:#3939394d;background:transparent;border-color:transparent;cursor:default}.flatpickr-day.flatpickr-disabled,.flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:#3939391a}.flatpickr-day.week.selected{border-radius:0;-webkit-box-shadow:-5px 0 0 #569ff7,5px 0 0 #569ff7;box-shadow:-5px 0 #569ff7,5px 0 #569ff7}.flatpickr-day.hidden{visibility:hidden}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{float:left}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;-webkit-box-shadow:1px 0 0 #e6e6e6;box-shadow:1px 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr-weekwrapper span.flatpickr-day,.flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:#3939394d;background:transparent;cursor:default;border:none}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flatpickr-time:after{content:"";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;-webkit-box-shadow:none;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:#393939;font-size:14px;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-time-separator,.flatpickr-time .flatpickr-am-pm{height:inherit;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time input:hover,.flatpickr-time .flatpickr-am-pm:hover,.flatpickr-time input:focus,.flatpickr-time .flatpickr-am-pm:focus{background:#eee}.flatpickr-input[readonly]{cursor:pointer}@-webkit-keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes fpFadeInDown{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}';function kt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var he=kt();function Xt(i){he=i}var Ee={exec:()=>null};function R(i,t=""){let e=typeof i=="string"?i:i.source,a={replace:(n,l)=>{let s=typeof l=="string"?l:l.source;return s=s.replace(K.caret,"$1"),e=e.replace(n,s),a},getRegex:()=>new RegExp(e,t)};return a}var Qn=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),K={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:i=>new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}#`),htmlBeginRegex:i=>new RegExp(`^ {0,${Math.min(3,i-1)}}<(?:[a-z].*>|!--)`,"i")},Xn=/^(?:[ \t]*(?:\n|$))+/,ea=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ta=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Me=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,na=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,wt=/(?:[*+-]|\d{1,9}[.)])/,en=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,tn=R(en).replace(/bull/g,wt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),aa=R(en).replace(/bull/g,wt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ct=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ia=/^[^\n]+/,Dt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ra=R(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Dt).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),la=R(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,wt).getRegex(),at="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Et=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,oa=R("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Et).replace("tag",at).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nn=R(Ct).replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",at).getRegex(),sa=R(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nn).getRegex(),St={blockquote:sa,code:ea,def:ra,fences:ta,heading:na,hr:Me,html:oa,lheading:tn,list:la,newline:Xn,paragraph:nn,table:Ee,text:ia},Ht=R("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",at).getRegex(),ca={...St,lheading:aa,table:Ht,paragraph:R(Ct).replace("hr",Me).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ht).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",at).getRegex()},da={...St,html:R(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Et).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ee,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:R(Ct).replace("hr",Me).replace("heading",` *#{1,6} *[^
]`).replace("lheading",tn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ua=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pa=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,an=/^( {2,}|\\)\n(?!\s*$)/,fa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,it=/[\p{P}\p{S}]/u,Mt=/[\s\p{P}\p{S}]/u,rn=/[^\s\p{P}\p{S}]/u,ha=R(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Mt).getRegex(),ln=/(?!~)[\p{P}\p{S}]/u,ma=/(?!~)[\s\p{P}\p{S}]/u,ba=/(?:[^\s\p{P}\p{S}]|~)/u,ga=R(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Qn?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),on=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ya=R(on,"u").replace(/punct/g,it).getRegex(),va=R(on,"u").replace(/punct/g,ln).getRegex(),sn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xa=R(sn,"gu").replace(/notPunctSpace/g,rn).replace(/punctSpace/g,Mt).replace(/punct/g,it).getRegex(),ka=R(sn,"gu").replace(/notPunctSpace/g,ba).replace(/punctSpace/g,ma).replace(/punct/g,ln).getRegex(),wa=R("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,rn).replace(/punctSpace/g,Mt).replace(/punct/g,it).getRegex(),Ca=R(/\\(punct)/,"gu").replace(/punct/g,it).getRegex(),Da=R(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ea=R(Et).replace("(?:-->|$)","-->").getRegex(),Sa=R("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ea).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),et=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ma=R(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",et).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cn=R(/^!?\[(label)\]\[(ref)\]/).replace("label",et).replace("ref",Dt).getRegex(),dn=R(/^!?\[(ref)\](?:\[\])?/).replace("ref",Dt).getRegex(),Aa=R("reflink|nolink(?!\\()","g").replace("reflink",cn).replace("nolink",dn).getRegex(),Wt=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,At={_backpedal:Ee,anyPunctuation:Ca,autolink:Da,blockSkip:ga,br:an,code:pa,del:Ee,emStrongLDelim:ya,emStrongRDelimAst:xa,emStrongRDelimUnd:wa,escape:ua,link:Ma,nolink:dn,punctuation:ha,reflink:cn,reflinkSearch:Aa,tag:Sa,text:fa,url:Ee},Ta={...At,link:R(/^!?\[(label)\]\((.*?)\)/).replace("label",et).getRegex(),reflink:R(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",et).getRegex()},yt={...At,emStrongRDelimAst:ka,emStrongLDelim:va,url:R(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Wt).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:R(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Wt).getRegex()},Ia={...yt,br:R(an).replace("{2,}","*").getRegex(),text:R(yt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ze={normal:St,gfm:ca,pedantic:da},xe={normal:At,gfm:yt,breaks:Ia,pedantic:Ta},Fa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yt=i=>Fa[i];function ce(i,t){if(t){if(K.escapeTest.test(i))return i.replace(K.escapeReplace,Yt)}else if(K.escapeTestNoEncode.test(i))return i.replace(K.escapeReplaceNoEncode,Yt);return i}function Ut(i){try{i=encodeURI(i).replace(K.percentDecode,"%")}catch{return null}return i}function Zt(i,t){let e=i.replace(K.findPipe,(l,s,d)=>{let c=!1,m=s;for(;--m>=0&&d[m]==="\\";)c=!c;return c?"|":" |"}),a=e.split(K.splitPipe),n=0;if(a[0].trim()||a.shift(),a.length>0&&!a.at(-1)?.trim()&&a.pop(),t)if(a.length>t)a.splice(t);else for(;a.length<t;)a.push("");for(;n<a.length;n++)a[n]=a[n].trim().replace(K.slashPipe,"|");return a}function ke(i,t,e){let a=i.length;if(a===0)return"";let n=0;for(;n<a&&i.charAt(a-n-1)===t;)n++;return i.slice(0,a-n)}function Pa(i,t){if(i.indexOf(t[1])===-1)return-1;let e=0;for(let a=0;a<i.length;a++)if(i[a]==="\\")a++;else if(i[a]===t[0])e++;else if(i[a]===t[1]&&(e--,e<0))return a;return e>0?-2:-1}function Vt(i,t,e,a,n){let l=t.href,s=t.title||null,d=i[1].replace(n.other.outputLinkReplace,"$1");a.state.inLink=!0;let c={type:i[0].charAt(0)==="!"?"image":"link",raw:e,href:l,title:s,text:d,tokens:a.inlineTokens(d)};return a.state.inLink=!1,c}function Ra(i,t,e){let a=i.match(e.other.indentCodeCompensation);if(a===null)return t;let n=a[1];return t.split(`
`).map(l=>{let s=l.match(e.other.beginningSpace);if(s===null)return l;let[d]=s;return d.length>=n.length?l.slice(n.length):l}).join(`
`)}var tt=class{options;rules;lexer;constructor(i){this.options=i||he}space(i){let t=this.rules.block.newline.exec(i);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(i){let t=this.rules.block.code.exec(i);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:ke(e,`
`)}}}fences(i){let t=this.rules.block.fences.exec(i);if(t){let e=t[0],a=Ra(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:a}}}heading(i){let t=this.rules.block.heading.exec(i);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let a=ke(e,"#");(this.options.pedantic||!a||this.rules.other.endingSpaceChar.test(a))&&(e=a.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(i){let t=this.rules.block.hr.exec(i);if(t)return{type:"hr",raw:ke(t[0],`
`)}}blockquote(i){let t=this.rules.block.blockquote.exec(i);if(t){let e=ke(t[0],`
`).split(`
`),a="",n="",l=[];for(;e.length>0;){let s=!1,d=[],c;for(c=0;c<e.length;c++)if(this.rules.other.blockquoteStart.test(e[c]))d.push(e[c]),s=!0;else if(!s)d.push(e[c]);else break;e=e.slice(c);let m=d.join(`
`),p=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");a=a?`${a}
${m}`:m,n=n?`${n}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,l,!0),this.lexer.state.top=g,e.length===0)break;let v=l.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let w=v,A=w.raw+`
`+e.join(`
`),E=this.blockquote(A);l[l.length-1]=E,a=a.substring(0,a.length-w.raw.length)+E.raw,n=n.substring(0,n.length-w.text.length)+E.text;break}else if(v?.type==="list"){let w=v,A=w.raw+`
`+e.join(`
`),E=this.list(A);l[l.length-1]=E,a=a.substring(0,a.length-v.raw.length)+E.raw,n=n.substring(0,n.length-w.raw.length)+E.raw,e=A.substring(l.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:a,tokens:l,text:n}}}list(i){let t=this.rules.block.list.exec(i);if(t){let e=t[1].trim(),a=e.length>1,n={type:"list",raw:"",ordered:a,start:a?+e.slice(0,-1):"",loose:!1,items:[]};e=a?`\\d{1,9}\\${e.slice(-1)}`:`\\${e}`,this.options.pedantic&&(e=a?e:"[*+-]");let l=this.rules.other.listItemRegex(e),s=!1;for(;i;){let c=!1,m="",p="";if(!(t=l.exec(i))||this.rules.block.hr.test(i))break;m=t[0],i=i.substring(m.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),v=i.split(`
`,1)[0],w=!g.trim(),A=0;if(this.options.pedantic?(A=2,p=g.trimStart()):w?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,p=g.slice(A),A+=t[1].length),w&&this.rules.other.blankLine.test(v)&&(m+=v+`
`,i=i.substring(v.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex(A),B=this.rules.other.hrRegex(A),L=this.rules.other.fencesBeginRegex(A),S=this.rules.other.headingBeginRegex(A),O=this.rules.other.htmlBeginRegex(A);for(;i;){let h=i.split(`
`,1)[0],k;if(v=h,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),k=v):k=v.replace(this.rules.other.tabCharGlobal,"    "),L.test(v)||S.test(v)||O.test(v)||E.test(v)||B.test(v))break;if(k.search(this.rules.other.nonSpaceChar)>=A||!v.trim())p+=`
`+k.slice(A);else{if(w||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||L.test(g)||S.test(g)||B.test(g))break;p+=`
`+v}!w&&!v.trim()&&(w=!0),m+=h+`
`,i=i.substring(h.length+1),g=k.slice(A)}}n.loose||(s?n.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(s=!0)),n.items.push({type:"list_item",raw:m,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),n.raw+=m}let d=n.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let c of n.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let m=this.rules.other.listTaskCheckbox.exec(c.raw);if(m){let p={type:"checkbox",raw:m[0]+" ",checked:m[0]!=="[ ]"};c.checked=p.checked,n.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=p.raw+c.tokens[0].raw,c.tokens[0].text=p.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(p)):c.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):c.tokens.unshift(p)}}if(!n.loose){let m=c.tokens.filter(g=>g.type==="space"),p=m.length>0&&m.some(g=>this.rules.other.anyLine.test(g.raw));n.loose=p}}if(n.loose)for(let c of n.items){c.loose=!0;for(let m of c.tokens)m.type==="text"&&(m.type="paragraph")}return n}}html(i){let t=this.rules.block.html.exec(i);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(i){let t=this.rules.block.def.exec(i);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),a=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:a,title:n}}}table(i){let t=this.rules.block.table.exec(i);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let e=Zt(t[1]),a=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],l={type:"table",raw:t[0],header:[],align:[],rows:[]};if(e.length===a.length){for(let s of a)this.rules.other.tableAlignRight.test(s)?l.align.push("right"):this.rules.other.tableAlignCenter.test(s)?l.align.push("center"):this.rules.other.tableAlignLeft.test(s)?l.align.push("left"):l.align.push(null);for(let s=0;s<e.length;s++)l.header.push({text:e[s],tokens:this.lexer.inline(e[s]),header:!0,align:l.align[s]});for(let s of n)l.rows.push(Zt(s,l.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:l.align[c]})));return l}}lheading(i){let t=this.rules.block.lheading.exec(i);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(i){let t=this.rules.block.paragraph.exec(i);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(i){let t=this.rules.block.text.exec(i);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(i){let t=this.rules.inline.escape.exec(i);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(i){let t=this.rules.inline.tag.exec(i);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(i){let t=this.rules.inline.link.exec(i);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let l=ke(e.slice(0,-1),"\\");if((e.length-l.length)%2===0)return}else{let l=Pa(t[2],"()");if(l===-2)return;if(l>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+l;t[2]=t[2].substring(0,l),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let a=t[2],n="";if(this.options.pedantic){let l=this.rules.other.pedanticHrefTitle.exec(a);l&&(a=l[1],n=l[3])}else n=t[3]?t[3].slice(1,-1):"";return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?a=a.slice(1):a=a.slice(1,-1)),Vt(t,{href:a&&a.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(i,t){let e;if((e=this.rules.inline.reflink.exec(i))||(e=this.rules.inline.nolink.exec(i))){let a=(e[2]||e[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=t[a.toLowerCase()];if(!n){let l=e[0].charAt(0);return{type:"text",raw:l,text:l}}return Vt(e,n,e[0],this.lexer,this.rules)}}emStrong(i,t,e=""){let a=this.rules.inline.emStrongLDelim.exec(i);if(!(!a||a[3]&&e.match(this.rules.other.unicodeAlphaNumeric))&&(!(a[1]||a[2])||!e||this.rules.inline.punctuation.exec(e))){let n=[...a[0]].length-1,l,s,d=n,c=0,m=a[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*i.length+n);(a=m.exec(t))!=null;){if(l=a[1]||a[2]||a[3]||a[4]||a[5]||a[6],!l)continue;if(s=[...l].length,a[3]||a[4]){d+=s;continue}else if((a[5]||a[6])&&n%3&&!((n+s)%3)){c+=s;continue}if(d-=s,d>0)continue;s=Math.min(s,s+d+c);let p=[...a[0]][0].length,g=i.slice(0,n+a.index+p+s);if(Math.min(n,s)%2){let w=g.slice(1,-1);return{type:"em",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}let v=g.slice(2,-2);return{type:"strong",raw:g,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(i){let t=this.rules.inline.code.exec(i);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),a=this.rules.other.nonSpaceChar.test(e),n=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return a&&n&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(i){let t=this.rules.inline.br.exec(i);if(t)return{type:"br",raw:t[0]}}del(i){let t=this.rules.inline.del.exec(i);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(i){let t=this.rules.inline.autolink.exec(i);if(t){let e,a;return t[2]==="@"?(e=t[1],a="mailto:"+e):(e=t[1],a=e),{type:"link",raw:t[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}url(i){let t;if(t=this.rules.inline.url.exec(i)){let e,a;if(t[2]==="@")e=t[0],a="mailto:"+e;else{let n;do n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(n!==t[0]);e=t[0],t[1]==="www."?a="http://"+t[0]:a=t[0]}return{type:"link",raw:t[0],text:e,href:a,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(i){let t=this.rules.inline.text.exec(i);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},re=class vt{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||he,this.options.tokenizer=this.options.tokenizer||new tt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:K,block:ze.normal,inline:xe.normal};this.options.pedantic?(e.block=ze.pedantic,e.inline=xe.pedantic):this.options.gfm&&(e.block=ze.gfm,this.options.breaks?e.inline=xe.breaks:e.inline=xe.gfm),this.tokenizer.rules=e}static get rules(){return{block:ze,inline:xe}}static lex(t,e){return new vt(e).lex(t)}static lexInline(t,e){return new vt(e).inlineTokens(t)}lex(t){t=t.replace(K.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let a=this.inlineQueue[e];this.inlineTokens(a.src,a.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],a=!1){for(this.options.pedantic&&(t=t.replace(K.tabCharGlobal,"    ").replace(K.spaceLine,""));t;){let n;if(this.options.extensions?.block?.some(s=>(n=s.call({lexer:this},t,e))?(t=t.substring(n.raw.length),e.push(n),!0):!1))continue;if(n=this.tokenizer.space(t)){t=t.substring(n.raw.length);let s=e.at(-1);n.raw.length===1&&s!==void 0?s.raw+=`
`:e.push(n);continue}if(n=this.tokenizer.code(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.at(-1).src=s.text):e.push(n);continue}if(n=this.tokenizer.fences(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.heading(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.hr(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.blockquote(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.list(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.html(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.def(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},e.push(n));continue}if(n=this.tokenizer.table(t)){t=t.substring(n.raw.length),e.push(n);continue}if(n=this.tokenizer.lheading(t)){t=t.substring(n.raw.length),e.push(n);continue}let l=t;if(this.options.extensions?.startBlock){let s=1/0,d=t.slice(1),c;this.options.extensions.startBlock.forEach(m=>{c=m.call({lexer:this},d),typeof c=="number"&&c>=0&&(s=Math.min(s,c))}),s<1/0&&s>=0&&(l=t.substring(0,s+1))}if(this.state.top&&(n=this.tokenizer.paragraph(l))){let s=e.at(-1);a&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):e.push(n),a=l.length!==t.length,t=t.substring(n.raw.length);continue}if(n=this.tokenizer.text(t)){t=t.substring(n.raw.length);let s=e.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):e.push(n);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let a=t,n=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(a))!=null;)c.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(a))!=null;)a=a.slice(0,n.index)+"++"+a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let l;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(a))!=null;)l=n[2]?n[2].length:0,a=a.slice(0,n.index+l)+"["+"a".repeat(n[0].length-l-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);a=this.options.hooks?.emStrongMask?.call({lexer:this},a)??a;let s=!1,d="";for(;t;){s||(d=""),s=!1;let c;if(this.options.extensions?.inline?.some(p=>(c=p.call({lexer:this},t,e))?(t=t.substring(c.raw.length),e.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let p=e.at(-1);c.type==="text"&&p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):e.push(c);continue}if(c=this.tokenizer.emStrong(t,a,d)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),e.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),e.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),e.push(c);continue}let m=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),v;this.options.extensions.startInline.forEach(w=>{v=w.call({lexer:this},g),typeof v=="number"&&v>=0&&(p=Math.min(p,v))}),p<1/0&&p>=0&&(m=t.substring(0,p+1))}if(c=this.tokenizer.inlineText(m)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(d=c.raw.slice(-1)),s=!0;let p=e.at(-1);p?.type==="text"?(p.raw+=c.raw,p.text+=c.text):e.push(c);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return e}},nt=class{options;parser;constructor(i){this.options=i||he}space(i){return""}code({text:i,lang:t,escaped:e}){let a=(t||"").match(K.notSpaceStart)?.[0],n=i.replace(K.endingNewline,"")+`
`;return a?'<pre><code class="language-'+ce(a)+'">'+(e?n:ce(n,!0))+`</code></pre>
`:"<pre><code>"+(e?n:ce(n,!0))+`</code></pre>
`}blockquote({tokens:i}){return`<blockquote>
${this.parser.parse(i)}</blockquote>
`}html({text:i}){return i}def(i){return""}heading({tokens:i,depth:t}){return`<h${t}>${this.parser.parseInline(i)}</h${t}>
`}hr(i){return`<hr>
`}list(i){let t=i.ordered,e=i.start,a="";for(let s=0;s<i.items.length;s++){let d=i.items[s];a+=this.listitem(d)}let n=t?"ol":"ul",l=t&&e!==1?' start="'+e+'"':"";return"<"+n+l+`>
`+a+"</"+n+`>
`}listitem(i){return`<li>${this.parser.parse(i.tokens)}</li>
`}checkbox({checked:i}){return"<input "+(i?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:i}){return`<p>${this.parser.parseInline(i)}</p>
`}table(i){let t="",e="";for(let n=0;n<i.header.length;n++)e+=this.tablecell(i.header[n]);t+=this.tablerow({text:e});let a="";for(let n=0;n<i.rows.length;n++){let l=i.rows[n];e="";for(let s=0;s<l.length;s++)e+=this.tablecell(l[s]);a+=this.tablerow({text:e})}return a&&(a=`<tbody>${a}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+a+`</table>
`}tablerow({text:i}){return`<tr>
${i}</tr>
`}tablecell(i){let t=this.parser.parseInline(i.tokens),e=i.header?"th":"td";return(i.align?`<${e} align="${i.align}">`:`<${e}>`)+t+`</${e}>
`}strong({tokens:i}){return`<strong>${this.parser.parseInline(i)}</strong>`}em({tokens:i}){return`<em>${this.parser.parseInline(i)}</em>`}codespan({text:i}){return`<code>${ce(i,!0)}</code>`}br(i){return"<br>"}del({tokens:i}){return`<del>${this.parser.parseInline(i)}</del>`}link({href:i,title:t,tokens:e}){let a=this.parser.parseInline(e),n=Ut(i);if(n===null)return a;i=n;let l='<a href="'+i+'"';return t&&(l+=' title="'+ce(t)+'"'),l+=">"+a+"</a>",l}image({href:i,title:t,text:e,tokens:a}){a&&(e=this.parser.parseInline(a,this.parser.textRenderer));let n=Ut(i);if(n===null)return ce(e);i=n;let l=`<img src="${i}" alt="${e}"`;return t&&(l+=` title="${ce(t)}"`),l+=">",l}text(i){return"tokens"in i&&i.tokens?this.parser.parseInline(i.tokens):"escaped"in i&&i.escaped?i.text:ce(i.text)}},Tt=class{strong({text:i}){return i}em({text:i}){return i}codespan({text:i}){return i}del({text:i}){return i}html({text:i}){return i}text({text:i}){return i}link({text:i}){return""+i}image({text:i}){return""+i}br(){return""}checkbox({raw:i}){return i}},le=class xt{options;renderer;textRenderer;constructor(t){this.options=t||he,this.options.renderer=this.options.renderer||new nt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Tt}static parse(t,e){return new xt(e).parse(t)}static parseInline(t,e){return new xt(e).parseInline(t)}parse(t){let e="";for(let a=0;a<t.length;a++){let n=t[a];if(this.options.extensions?.renderers?.[n.type]){let s=n,d=this.options.extensions.renderers[s.type].call({parser:this},s);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){e+=d||"";continue}}let l=n;switch(l.type){case"space":{e+=this.renderer.space(l);break}case"hr":{e+=this.renderer.hr(l);break}case"heading":{e+=this.renderer.heading(l);break}case"code":{e+=this.renderer.code(l);break}case"table":{e+=this.renderer.table(l);break}case"blockquote":{e+=this.renderer.blockquote(l);break}case"list":{e+=this.renderer.list(l);break}case"checkbox":{e+=this.renderer.checkbox(l);break}case"html":{e+=this.renderer.html(l);break}case"def":{e+=this.renderer.def(l);break}case"paragraph":{e+=this.renderer.paragraph(l);break}case"text":{e+=this.renderer.text(l);break}default:{let s='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return e}parseInline(t,e=this.renderer){let a="";for(let n=0;n<t.length;n++){let l=t[n];if(this.options.extensions?.renderers?.[l.type]){let d=this.options.extensions.renderers[l.type].call({parser:this},l);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(l.type)){a+=d||"";continue}}let s=l;switch(s.type){case"escape":{a+=e.text(s);break}case"html":{a+=e.html(s);break}case"link":{a+=e.link(s);break}case"image":{a+=e.image(s);break}case"checkbox":{a+=e.checkbox(s);break}case"strong":{a+=e.strong(s);break}case"em":{a+=e.em(s);break}case"codespan":{a+=e.codespan(s);break}case"br":{a+=e.br(s);break}case"del":{a+=e.del(s);break}case"text":{a+=e.text(s);break}default:{let d='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return a}},Ce=class{options;block;constructor(i){this.options=i||he}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(i){return i}postprocess(i){return i}processAllTokens(i){return i}emStrongMask(i){return i}provideLexer(){return this.block?re.lex:re.lexInline}provideParser(){return this.block?le.parse:le.parseInline}},La=class{defaults=kt();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=le;Renderer=nt;TextRenderer=Tt;Lexer=re;Tokenizer=tt;Hooks=Ce;constructor(...i){this.use(...i)}walkTokens(i,t){let e=[];for(let a of i)switch(e=e.concat(t.call(this,a)),a.type){case"table":{let n=a;for(let l of n.header)e=e.concat(this.walkTokens(l.tokens,t));for(let l of n.rows)for(let s of l)e=e.concat(this.walkTokens(s.tokens,t));break}case"list":{let n=a;e=e.concat(this.walkTokens(n.items,t));break}default:{let n=a;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(l=>{let s=n[l].flat(1/0);e=e.concat(this.walkTokens(s,t))}):n.tokens&&(e=e.concat(this.walkTokens(n.tokens,t)))}}return e}use(...i){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return i.forEach(e=>{let a={...e};if(a.async=this.defaults.async||a.async||!1,e.extensions&&(e.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let l=t.renderers[n.name];l?t.renderers[n.name]=function(...s){let d=n.renderer.apply(this,s);return d===!1&&(d=l.apply(this,s)),d}:t.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let l=t[n.level];l?l.unshift(n.tokenizer):t[n.level]=[n.tokenizer],n.start&&(n.level==="block"?t.startBlock?t.startBlock.push(n.start):t.startBlock=[n.start]:n.level==="inline"&&(t.startInline?t.startInline.push(n.start):t.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(t.childTokens[n.name]=n.childTokens)}),a.extensions=t),e.renderer){let n=this.defaults.renderer||new nt(this.defaults);for(let l in e.renderer){if(!(l in n))throw new Error(`renderer '${l}' does not exist`);if(["options","parser"].includes(l))continue;let s=l,d=e.renderer[s],c=n[s];n[s]=(...m)=>{let p=d.apply(n,m);return p===!1&&(p=c.apply(n,m)),p||""}}a.renderer=n}if(e.tokenizer){let n=this.defaults.tokenizer||new tt(this.defaults);for(let l in e.tokenizer){if(!(l in n))throw new Error(`tokenizer '${l}' does not exist`);if(["options","rules","lexer"].includes(l))continue;let s=l,d=e.tokenizer[s],c=n[s];n[s]=(...m)=>{let p=d.apply(n,m);return p===!1&&(p=c.apply(n,m)),p}}a.tokenizer=n}if(e.hooks){let n=this.defaults.hooks||new Ce;for(let l in e.hooks){if(!(l in n))throw new Error(`hook '${l}' does not exist`);if(["options","block"].includes(l))continue;let s=l,d=e.hooks[s],c=n[s];Ce.passThroughHooks.has(l)?n[s]=m=>{if(this.defaults.async&&Ce.passThroughHooksRespectAsync.has(l))return(async()=>{let g=await d.call(n,m);return c.call(n,g)})();let p=d.call(n,m);return c.call(n,p)}:n[s]=(...m)=>{if(this.defaults.async)return(async()=>{let g=await d.apply(n,m);return g===!1&&(g=await c.apply(n,m)),g})();let p=d.apply(n,m);return p===!1&&(p=c.apply(n,m)),p}}a.hooks=n}if(e.walkTokens){let n=this.defaults.walkTokens,l=e.walkTokens;a.walkTokens=function(s){let d=[];return d.push(l.call(this,s)),n&&(d=d.concat(n.call(this,s))),d}}this.defaults={...this.defaults,...a}}),this}setOptions(i){return this.defaults={...this.defaults,...i},this}lexer(i,t){return re.lex(i,t??this.defaults)}parser(i,t){return le.parse(i,t??this.defaults)}parseMarkdown(i){return(t,e)=>{let a={...e},n={...this.defaults,...a},l=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&a.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=i),n.async)return(async()=>{let s=n.hooks?await n.hooks.preprocess(t):t,d=await(n.hooks?await n.hooks.provideLexer():i?re.lex:re.lexInline)(s,n),c=n.hooks?await n.hooks.processAllTokens(d):d;n.walkTokens&&await Promise.all(this.walkTokens(c,n.walkTokens));let m=await(n.hooks?await n.hooks.provideParser():i?le.parse:le.parseInline)(c,n);return n.hooks?await n.hooks.postprocess(m):m})().catch(l);try{n.hooks&&(t=n.hooks.preprocess(t));let s=(n.hooks?n.hooks.provideLexer():i?re.lex:re.lexInline)(t,n);n.hooks&&(s=n.hooks.processAllTokens(s)),n.walkTokens&&this.walkTokens(s,n.walkTokens);let d=(n.hooks?n.hooks.provideParser():i?le.parse:le.parseInline)(s,n);return n.hooks&&(d=n.hooks.postprocess(d)),d}catch(s){return l(s)}}}onError(i,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,i){let a="<p>An error occurred:</p><pre>"+ce(e.message+"",!0)+"</pre>";return t?Promise.resolve(a):a}if(t)return Promise.reject(e);throw e}}},fe=new La;function z(i,t){return fe.parse(i,t)}z.options=z.setOptions=function(i){return fe.setOptions(i),z.defaults=fe.defaults,Xt(z.defaults),z};z.getDefaults=kt;z.defaults=he;z.use=function(...i){return fe.use(...i),z.defaults=fe.defaults,Xt(z.defaults),z};z.walkTokens=function(i,t){return fe.walkTokens(i,t)};z.parseInline=fe.parseInline;z.Parser=le;z.parser=le.parse;z.Renderer=nt;z.TextRenderer=Tt;z.Lexer=re;z.lexer=re.lex;z.Tokenizer=tt;z.Hooks=Ce;z.parse=z;z.options;z.setOptions;z.use;z.walkTokens;z.parseInline;le.parse;re.lex;if(!document.getElementById("ts-form-flatpickr-styles")){const i=document.createElement("style");i.id="ts-form-flatpickr-styles",i.textContent=Kn,document.head.appendChild(i)}class Oa extends HTMLElement{constructor(){super()}static get observedAttributes(){return["field-name","config","value","error"]}attributeChangedCallback(t,e,a){e!==a&&this.requestRender()}connectedCallback(){this.requestRender()}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}render(){this.innerHTML="";const t=this.getAttribute("field-name"),e=this.getAttribute("config"),a=this.getAttribute("value"),n=this.getAttribute("error");if(!t||!e)return;let l;try{l=JSON.parse(e)}catch(c){console.error("Invalid config for field",t,c);return}let s=a;try{a&&(a.startsWith("[")||a.startsWith("{")||a==="true"||a==="false")&&(s=JSON.parse(a))}catch{}const d=this.createField(t,l,s);if(this.appendChild(d),!document.getElementById("ts-form-field-styles")){const c=document.createElement("style");c.id="ts-form-field-styles",c.textContent=`
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
            `,this.appendChild(c)}if(l.type==="select"&&Promise.all([customElements.whenDefined("sl-select"),customElements.whenDefined("sl-option")]).then(()=>{requestAnimationFrame(()=>{l.multiple&&Array.isArray(s)?d.value=s:d.value=s||""})}),n)if(d.classList.add("input-invalid"),l.type==="file"||l.type==="image")d.setAttribute("error",n);else{const c=document.createElement("div");c.className="error-message",c.textContent=n,this.appendChild(c)}else(l.type==="file"||l.type==="image")&&d.removeAttribute("error"),d.classList.remove("input-invalid");l.autofocus&&requestAnimationFrame(()=>{this.setFocus()}),d&&d.addEventListener("keydown",c=>this.handleKeyDown(c,l,t))}setFocus(){let t=this.firstElementChild;if(t&&t.tagName==="DIV"){const e=t.querySelector("sl-input, sl-checkbox, sl-switch, sl-range, sl-radio-group, sl-select, textarea, input, ts-combobox, ts-relationship-picker, sl-button, sl-button-group");e&&(t=e)}t&&(typeof t.setFocus=="function"?t.setFocus():typeof t.focus=="function"&&t.focus())}handleKeyDown(t,e,a){if(t.key==="Enter")e.enterAction&&(t.preventDefault(),t.stopPropagation(),this.handleFieldChange(t,a),this.dispatchEvent(new CustomEvent("form-key-action",{detail:{key:"Enter",action:e.enterAction,field:a},bubbles:!0,composed:!0})));else if(t.key==="Escape"&&e.escapeAction)if(t.preventDefault(),t.stopPropagation(),e.escapeAction==="clear"){const n=t.target;"value"in n&&(e.type==="select"&&n.multiple?n.value=[]:n.value="",this.handleFieldChange({target:n},a))}else this.dispatchEvent(new CustomEvent("form-key-action",{detail:{key:"Escape",action:e.escapeAction,field:a},bubbles:!0,composed:!0}))}createField(t,e,a){let n;switch(e.type){case"textarea":n=document.createElement("sl-textarea"),n.value=a||"",e.rows&&(n.rows=e.rows),e.placeholder&&(n.placeholder=e.placeholder);break;case"password":n=document.createElement("sl-input"),n.type="password",n.passwordToggle=!0,n.setAttribute("autocomplete","current-password"),n.value=a||"",e.placeholder&&(n.placeholder=e.placeholder);break;case"checkbox":const l=document.createElement("div");l.style.display="flex",l.style.flexDirection="column";const s=document.createElement("div");return s.style.height="calc(var(--sl-input-label-font-size-medium) + var(--sl-spacing-2x-small))",s.style.marginBottom="var(--sl-spacing-2x-small)",l.appendChild(s),n=document.createElement("sl-checkbox"),e.hideLabel||(n.textContent=e.label),n.checked=a===!0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),l.appendChild(n),l;case"switch":const d=document.createElement("div");if(d.style.display="flex",d.style.flexDirection="column",d.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",d.appendChild(h)}const c=document.createElement("div");return c.style.display="flex",c.style.alignItems="center",c.style.minHeight="var(--sl-input-height-medium)",c.style.paddingLeft="2px",n=document.createElement("sl-switch"),n.checked=a===!0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),c.appendChild(n),d.appendChild(c),d;case"slider":const m=document.createElement("div");if(m.style.display="flex",m.style.flexDirection="column",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",h.style.marginBottom="var(--sl-spacing-2x-small)",m.appendChild(h)}return n=document.createElement("sl-range"),e.min&&(n.min=e.min),e.max&&(n.max=e.max),e.step&&(n.step=e.step),n.value=a||e.min||0,n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),m.appendChild(n),m;case"combobox":n=document.createElement("ts-combobox"),n.setAttribute("label",e.label||""),n.setAttribute("value",a||""),e.options&&n.setAttribute("options",JSON.stringify(e.options)),e.placeholder&&n.setAttribute("placeholder",e.placeholder),e.disabled&&n.setAttribute("disabled",""),e.allowCustom&&n.setAttribute("allow-custom",""),e.allowEmpty&&n.setAttribute("allow-empty",""),e.required&&n.setAttribute("required","");break;case"file":case"image":n=document.createElement("ts-file-upload"),e.hideLabel||n.setAttribute("label",e.label||"Upload file"),e.multiple&&n.setAttribute("multiple","true"),e.type==="image"?n.setAttribute("accept","image/*"):e.accept&&n.setAttribute("accept",e.accept),e.innerLabel&&n.setAttribute("inner-label",e.innerLabel),a&&setTimeout(()=>{n.value=a},0);break;case"button":return n=document.createElement("sl-button"),n.variant=e.variant||"primary",n.textContent=e.label||"Button",n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:e.action||"click"},bubbles:!0,composed:!0}))}),n;case"button-group":let p;return e.variant==="process"?(p=document.createElement("div"),p.className="process-group",p.style.display="flex",p.style.gap="0"):(p=document.createElement("sl-button-group"),p.style.gap="0.5rem"),e.options&&e.options.forEach(h=>{const[k,y="true",_="default",F=""]=h.split("/"),P=document.createElement("sl-button");P.dataset.value=k;const q=a===k?_||"primary":_||"default";P.variant=q,P.setAttribute("data-variant",q),P.textContent=F||k,P.disabled=y==="false",P.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("field-change",{detail:{field:t,value:k},bubbles:!0,composed:!0}))}),p.appendChild(P)}),p;case"radio":const g=document.createElement("div");if(g.style.display="flex",g.style.flexDirection="column",g.style.gap="var(--sl-spacing-2x-small)",!e.hideLabel){const h=document.createElement("label");h.textContent=e.label,h.style.fontSize="var(--sl-input-label-font-size-medium)",h.style.fontWeight="var(--sl-font-weight-semibold)",g.appendChild(h)}return n=document.createElement("sl-radio-group"),e.options&&e.options.forEach(h=>{const k=document.createElement("sl-radio");k.value=h.value,k.textContent=h.label,k.style.marginBottom="var(--sl-spacing-2x-small)",n.appendChild(k)}),setTimeout(()=>{n.value=a||""},0),n.addEventListener("sl-change",h=>this.handleFieldChange(h,t)),g.appendChild(n),g;case"number":n=document.createElement("sl-input"),n.type="text",n.inputMode="decimal",n.classList.add("text-right"),n.classList.add("text-right"),n.setAttribute("autocomplete","off"),e.placeholder&&(n.placeholder=e.placeholder),n.addEventListener("sl-input",()=>{const h=n.value,k=h.replace(/[^0-9.,+\-*/^() ]/g,"");h!==k&&(n.value=k)}),a&&(n.value=this.formatNumber(a,e.roundTo)),n.addEventListener("sl-focus",()=>{n.value=n.value.replace(/\s/g,""),setTimeout(()=>n.select(),0)}),n.addEventListener("sl-blur",()=>{let h=n.value;if(/[+\-*/^()]/.test(h)){const k=this.evaluateMathExpression(h);if(k===null){n.value="";return}h=k}n.value=this.formatNumber(h,e.roundTo)}),n.addEventListener("keydown",h=>{h.key==="Enter"&&n.dispatchEvent(new Event("sl-blur"))}),Object.defineProperty(n,"submitValue",{get:()=>{if(!n.value)return null;let h=n.value;if(/[+\-*/^()]/.test(h)){const _=this.evaluateMathExpression(h);_!==null&&(h=_)}const k=h.toString().replace(/\s/g,"").replace(",",".");if(k==="")return null;let y=parseFloat(k);return isNaN(y)?null:(e.roundTo!==void 0&&e.roundTo!==null&&e.roundTo!==""&&(y=this.roundNumber(y,e.roundTo)),y)}});break;case"date":n=document.createElement("sl-input"),n.type="text",n.classList.add("text-right"),n.classList.add("force-prefix-spacing"),n.setAttribute("autocomplete","off");const v=document.createElement("sl-icon");v.name="calendar3",v.slot="prefix",v.style.cursor="pointer",v.style.fontSize="var(--sl-font-size-large)",n.appendChild(v),n.value=a?this.formatDate(a):"",n.isoValue=a||null,n.addEventListener("sl-focus",()=>{setTimeout(()=>n.select(),0)}),setTimeout(()=>{const h=n.shadowRoot?n.shadowRoot.querySelector("input"):n;if(h){const k=H(h,{locale:Jt.Czech,defaultDate:a,dateFormat:"d. m. Y",allowInput:!0,clickOpens:!1,onChange:(y,_)=>{if(n.value=_,y.length>0){const F=y[0],P=F.getFullYear(),q=String(F.getMonth()+1).padStart(2,"0"),W=String(F.getDate()).padStart(2,"0");n.isoValue=`${P}-${q}-${W}`}else n.isoValue=null;n.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(y,_)=>{if(!y)return null;if(typeof y=="string"&&/^\d{4}-\d{2}-\d{2}/.test(y))return new Date(y);const F=y.replace(/[^0-9]/g,"");if(F.length===8){const W=F.substring(0,2),Y=F.substring(2,4),j=F.substring(4,8);return new Date(`${j}-${Y}-${W}`)}if(F.length===4){const W=F.substring(0,2),Y=F.substring(2,4),j=new Date().getFullYear();return new Date(`${j}-${Y}-${W}`)}const P=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})$/);if(P)return new Date(`${P[3]}-${P[2]}-${P[1]}`);const q=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(q){const W=new Date().getFullYear();return new Date(`${W}-${q[2]}-${q[1]}`)}return H.parseDate(y,_)}});v.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),k.open()}),n.addEventListener("keydown",y=>{y.key==="Enter"&&k.setDate(n.value,!0,k.config.dateFormat)})}},0),Object.defineProperty(n,"submitValue",{get:()=>n.isoValue});break;case"datetime":n=document.createElement("sl-input"),n.type="text",n.classList.add("text-right"),n.classList.add("force-prefix-spacing"),n.setAttribute("autocomplete","off");const w=document.createElement("sl-icon");w.name="calendar3",w.slot="prefix",w.style.cursor="pointer",w.style.fontSize="var(--sl-font-size-large)",n.appendChild(w),n.value=a?this.formatDateTime(a):"",n.isoValue=a||null,n.addEventListener("sl-focus",()=>{setTimeout(()=>n.select(),0)}),setTimeout(()=>{const h=n.shadowRoot?n.shadowRoot.querySelector("input"):n;if(h){const k=H(h,{locale:Jt.Czech,defaultDate:a,enableTime:!0,dateFormat:"d. m. Y H:i",time_24hr:!0,allowInput:!0,clickOpens:!1,onChange:(y,_)=>{if(n.value=_,y.length>0){const F=y[0],P=F.getFullYear(),q=String(F.getMonth()+1).padStart(2,"0"),W=String(F.getDate()).padStart(2,"0"),Y=String(F.getHours()).padStart(2,"0"),j=String(F.getMinutes()).padStart(2,"0"),U=String(F.getSeconds()).padStart(2,"0");n.isoValue=`${P}-${q}-${W}T${Y}:${j}:${U}`}else n.isoValue=null;n.dispatchEvent(new CustomEvent("sl-change",{bubbles:!0}))},parseDate:(y,_)=>{const F=y.replace(/[^0-9]/g,"");if(F.length>=8){const W=F.substring(0,2),Y=F.substring(2,4),j=F.substring(4,8);let U="00",Z="00";return F.length>=10&&(U=F.substring(8,10)),F.length>=12&&(Z=F.substring(10,12)),new Date(`${j}-${Y}-${W}T${U}:${Z}:00`)}const P=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]+(\d{4})(?:\s+(\d{1,2})[:.](\d{1,2}))?$/);if(P){const W=P[1],Y=P[2],j=P[3],U=P[4]||"00",Z=P[5]||"00";return new Date(`${j}-${Y}-${W}T${U}:${Z}:00`)}const q=y.match(/^(\d{1,2})[.\s/-]+(\d{1,2})[.\s/-]*$/);if(q){const W=new Date().getFullYear();return new Date(`${W}-${q[2]}-${q[1]}T00:00:00`)}return H.parseDate(y,_)}});w.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),k.open()}),n.addEventListener("keydown",y=>{y.key==="Enter"&&k.setDate(n.value,!0,k.config.dateFormat)})}},0),Object.defineProperty(n,"submitValue",{get:()=>n.isoValue});break;case"select":n=document.createElement("sl-select"),n.hoist=!0,n.label=e.label,e.multiple&&(n.multiple=!0,n.clearable=!0),e.options&&e.options.forEach(h=>{const k=document.createElement("sl-option");k.value=h.value,k.textContent=h.label,n.appendChild(k)});break;case"relationship":n=document.createElement("ts-relationship-picker"),n.setAttribute("target-entity",e.targetEntity||""),n.setAttribute("mode",e.mode||"single"),e.label&&!e.hideLabel&&n.setAttribute("label",e.label),e.displayFields&&n.setAttribute("display-fields",JSON.stringify(e.displayFields)),e.chipDisplayFields&&n.setAttribute("chip-display-fields",JSON.stringify(e.chipDisplayFields)),e.valueField&&n.setAttribute("value-field",e.valueField),e.options&&n.setAttribute("options",JSON.stringify(e.options)),a&&n.setAttribute("value",JSON.stringify(a));break;case"separator":return n=document.createElement("div"),n.className="form-separator",n.textContent=e.label||"",n;case"infobox":n=document.createElement("sl-alert"),n.variant=e.variant||"primary",n.open=!0,e.closable&&(n.closable=!0);let A="";return e.icon&&(A+=`<sl-icon slot="icon" name="${e.icon}"></sl-icon>`),a?A+=a:e.content&&(A+=e.content),n.innerHTML=A,n;case"markdown":n=document.createElement("div"),n.className="markdown-content";const E=a||e.content||"";return n.innerHTML=z.parse(E),n;case"table":if(n=document.createElement("ts-table"),e.columns){const h=e.columns.map((y,_)=>({...y,key:y.field||y.key,title:y.header||y.title||y.label,visible:y.visible!==!1,order:y.order!==void 0?y.order:_}));n.setAttribute("column-definitions",JSON.stringify(h));const k=h.filter(y=>y.visible).map(y=>y.key).join(",");n.setAttribute("visible-columns",k)}["show-create-button","show-import-button","show-export-button","show-column-selector","enable-sorting","enable-filtering","enable-column-resizing","enable-column-reordering","enable-selection","enable-row-menu","enable-clickable-rows","enable-clickable-columns","enable-pagination"].forEach(h=>{const k=h.replace(/-([a-z])/g,y=>y[1].toUpperCase());e[k]!==void 0&&n.setAttribute(h,String(e[k]))}),["single-item-actions","multiple-items-actions","unhideable-columns","unshowable-columns","columns-required-for-import"].forEach(h=>{const k=h.replace(/-([a-z])/g,y=>y[1].toUpperCase());e[k]&&n.setAttribute(h,e[k])}),e.itemsPerPage&&n.setAttribute("items-per-page",e.itemsPerPage),e.itemsPerPageOptions&&n.setAttribute("items-per-page-options",e.itemsPerPageOptions),e.predefinedFilters&&n.setAttribute("predefined-filters",JSON.stringify(e.predefinedFilters)),e.settings&&n.setAttribute("settings",JSON.stringify(e.settings));const S=a||e.data;S&&n.setAttribute("table-data",JSON.stringify(S)),["create-new-record","selection-action-activated","do-import"].forEach(h=>{n.addEventListener(h,k=>{k.stopPropagation(),this.dispatchEvent(new CustomEvent("form-field-action",{detail:{field:t,action:h,originalDetail:k.detail},bubbles:!0,composed:!0}))})}),customElements.whenDefined("ts-table").then(()=>{setTimeout(()=>{typeof n.run=="function"&&n.run()},0)});break;default:n=document.createElement("sl-input"),n.type=e.type||"text",n.setAttribute("autocomplete","off"),n.value=a||"",e.placeholder&&(n.placeholder=e.placeholder)}return n.name=t,e.hideLabel||e.type!=="checkbox"&&e.type!=="radio"&&e.type!=="file"&&e.type!=="image"&&e.type!=="infobox"&&e.type!=="markdown"&&(n.label=e.label),e.required&&(n.required=!0),n.addEventListener("sl-change",l=>this.handleFieldChange(l,t)),n}handleFieldChange(t,e){const a=t.target;let n;a.submitValue!==void 0?n=a.submitValue:a.tagName==="SL-CHECKBOX"||a.tagName==="SL-SWITCH"?n=a.checked:a.tagName==="TS-FILE-UPLOAD"?n=t.detail.files:a.tagName==="TS-RELATIONSHIP-PICKER"||a.tagName==="TS-COMBOBOX"?n=t.detail.value:a.type==="file"?n=a.files:n=a.value,this.dispatchEvent(new CustomEvent("field-change",{detail:{field:e,value:n},bubbles:!0,composed:!0}))}showImportResults(t){const e=this.querySelector("ts-table");e&&typeof e.showImportResults=="function"?e.showImportResults(t):console.warn("Inner ts-table not found or does not support showImportResults")}evaluateMathExpression(t){try{let e=t.replace(/,/g,".");if(e=e.replace(/\^/g,"**"),/[^0-9.+\-*/^() ]/.test(e))return null;const a=new Function("return "+e)();return!isFinite(a)||isNaN(a)?null:a}catch{return null}}roundNumber(t,e){if(e==null||e==="")return t;const a=1/parseFloat(e);return Math.round(t*a)/a}formatNumber(t,e){if(t==null||t==="")return"";let a=parseFloat(t.toString().replace(/\s/g,"").replace(",","."));if(isNaN(a))return t;e!=null&&e!==""&&(a=this.roundNumber(a,e));let n={};if(e&&e<1){const l=-Math.floor(Math.log10(parseFloat(e)));n={minimumFractionDigits:l,maximumFractionDigits:l}}return a.toLocaleString("cs-CZ",n)}formatDate(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const a=e.getDate(),n=e.getMonth()+1,l=e.getFullYear();return`${a}. ${n}. ${l}`}catch{return t}}formatDateTime(t){if(!t)return"";try{const e=new Date(t);if(isNaN(e.getTime()))return t;const a=e.getDate(),n=e.getMonth()+1,l=e.getFullYear(),s=String(e.getHours()).padStart(2,"0"),d=String(e.getMinutes()).padStart(2,"0");return`${a}. ${n}. ${l} ${s}:${d}`}catch{return t}}}customElements.define("ts-form-field",Oa);class Na extends HTMLElement{constructor(){super(),this.formData={},this.validationErrors={},this.lastAction=null,this.buttons={},this.buttons={},this.buttons={},this.isInitialized=!1}static get observedAttributes(){return["layout","fields","errors","buttons","values","active-tab"]}attributeChangedCallback(t,e,a){e!==a&&(t==="active-tab"?this.switchTab(a):this.isInitialized&&this.requestRender())}run(){this.isInitialized=!0,this.render();const t=new Set;this.querySelectorAll("*").forEach(l=>{const s=l.tagName.toLowerCase();(s.startsWith("sl-")||s.startsWith("ts-"))&&t.add(s)});const a=Array.from(t).map(l=>customElements.whenDefined(l)),n=new Promise(l=>setTimeout(l,2e3));Promise.race([Promise.all(a),n]).then(()=>{const l=this.querySelector(".ts-form-container"),s=this.querySelector(".loader");l&&requestAnimationFrame(()=>{l.style.opacity="1",s&&s.classList.add("hidden")})}).catch(()=>{const l=this.querySelector(".ts-form-container"),s=this.querySelector(".loader");l&&(l.style.opacity="1",s&&s.classList.add("hidden"))})}requestRender(){this.renderPending||(this.renderPending=!0,requestAnimationFrame(()=>{this.render(),this.renderPending=!1}))}switchTab(t){const e=this.querySelector("sl-tab-group");if(e){const a=`tab-${t}`;e.show(a)}}connectedCallback(){this.ensureStructure(),this.setupEventListeners()}ensureStructure(){if(this.querySelector(".ts-form-container"))return;const t=document.createElement("style");t.textContent=`
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
                gap: 0;
                margin-bottom: 1rem;
            }
            .form-col {
                min-width: 0; /* Critical: allows flex item to shrink below content size */
                overflow: visible; /* Changed from hidden to allow tooltips (slider) to show */
                padding: 4px 0.5rem; /* Simulate gap with padding */
            }
            .form-col:first-child {
                padding-left: 4px;
            }
            .form-col:last-child {
                padding-right: 4px;
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
            .form-separator:empty::after {
                margin-left: 0;
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
        `,this.appendChild(e);const a=document.createElement("div");a.className="ts-form-container",this.appendChild(a)}setupEventListeners(){this.addEventListener("field-change",t=>{t.stopPropagation();const{field:e,value:a}=t.detail;this.formData[e]!==a&&(this.formData[e]=a,this.dispatchEvent(new CustomEvent("form-changed",{detail:{field:e,value:a,formData:this.getSubmissionData()},bubbles:!0,composed:!0})))}),this.addEventListener("form-field-action",t=>{}),this.addEventListener("form-key-action",t=>{t.stopPropagation();const{action:e,field:a}=t.detail;if(e){if(e.startsWith("focus:")){const n=e.split(":")[1],l=this.querySelector(`ts-form-field[field-name="${n}"]`);l&&typeof l.setFocus=="function"?requestAnimationFrame(()=>l.setFocus()):console.warn(`Target field for focus not found: ${n}`)}else if(e.startsWith("click:")||e==="submit"){const n=e==="submit"?"submit":e.split(":")[1];let l=this.buttons[n];!l&&n==="submit"&&(l=Object.values(this.buttons).find(d=>d.variant==="primary"&&!d.disabled&&d.style.display!=="none")),l&&!l.disabled&&l.style.display!=="none"?l.click():console.warn(`Button for action '${n}' not found or disabled`)}else if(e==="next"){const n=Array.from(this.querySelectorAll("ts-form-field")),l=n.findIndex(s=>s.getAttribute("field-name")===a);if(l>=0&&l<n.length-1){const s=n[l+1];s&&typeof s.setFocus=="function"&&s.setFocus()}}}}),this.addEventListener("form-table-action",t=>{})}showImportResults(t,e){const a=this.querySelector(`ts-form-field[field-name="${t}"]`);a&&typeof a.showImportResults=="function"?a.showImportResults(e):console.warn(`Field ${t} not found or does not support showImportResults`)}render(){const t=this.getAttribute("layout"),e=this.getAttribute("fields"),a=this.getAttribute("errors"),n=this.getAttribute("buttons"),l=this.getAttribute("values");if(!(!t||!e))try{const s=JSON.parse(t),d=JSON.parse(e);this.fieldsConfig=d;const c=a?JSON.parse(a):{},m=n?JSON.parse(n):[],p=l?JSON.parse(l):{};this.formData={...p,...this.formData},this.ensureStructure();const g=this.querySelector(".ts-form-container");g.innerHTML="";const v=document.createElement("form");if(v.noValidate=!0,v.addEventListener("submit",S=>{S.preventDefault(),S.stopPropagation()}),s.tabs){const S=document.createElement("sl-tab-group");let O=!1;if(s.tabs.forEach((h,k)=>{const y=document.createElement("sl-tab");y.slot="nav",y.panel=`tab-${k}`,y.textContent=h.label;const _=this.getAttribute("active-tab");_!==null?parseInt(_)===k&&(y.active=!0):k===0&&(y.active=!0),h.rows.some(Y=>Y.some(j=>c[j.field]))&&(y.classList.add("invalid"),O=!0);const P=document.createElement("sl-tab-panel");P.name=`tab-${k}`,_!==null?parseInt(_)===k&&(P.active=!0):k===0&&(P.active=!0);let q=!1;if(h.rows&&h.rows.length===1&&h.rows[0].length===1){const Y=h.rows[0][0].field;d[Y]&&d[Y].type==="table"&&(q=!0)}const W=document.createElement("div");W.className="tab-content",q&&W.classList.add("full-height"),h.rows&&h.rows.forEach(Y=>{const j=document.createElement("div");j.className="form-row",j.style.gridTemplateColumns=Y.map(U=>U.width||"1fr").join(" "),Y.forEach(U=>{const Z=document.createElement("div");if(Z.className="form-col",U.align&&(Z.style.display="flex",Z.style.justifyContent=U.align==="right"?"flex-end":U.align==="center"?"center":"flex-start"),U.type==="empty"){j.appendChild(Z);return}if(U.type==="separator"){const ae=document.createElement("ts-form-field");ae.setAttribute("config",JSON.stringify({type:"separator",label:U.label})),ae.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),Z.appendChild(ae),j.appendChild(Z);return}const Ae=d[U.field];if(Ae){const ae=document.createElement("ts-form-field");ae.setAttribute("config",JSON.stringify(Ae)),ae.setAttribute("field-name",U.field);const de=this.formData[U.field];de!=null&&(typeof de=="object"?ae.setAttribute("value",JSON.stringify(de)):ae.setAttribute("value",de)),c[U.field]&&ae.setAttribute("error",c[U.field]),Z.appendChild(ae)}j.appendChild(Z)}),W.appendChild(j)}),P.appendChild(W),S.appendChild(y),S.appendChild(P)}),O){S.classList.add("invalid");const h=()=>{const k=S.querySelector("sl-tab[active]");k&&k.classList.contains("invalid")?S.style.setProperty("--indicator-color","var(--sl-color-danger-600)"):S.style.setProperty("--indicator-color","var(--sl-color-primary-600)")};S.addEventListener("sl-tab-show",()=>setTimeout(h,0)),setTimeout(h,0)}S.addEventListener("sl-tab-show",h=>{const k=h.detail.name;if(k&&k.startsWith("tab-")){const y=k.replace("tab-","");this.getAttribute("active-tab")!==y&&this.setAttribute("active-tab",y)}}),v.appendChild(S)}else if(s.rows){const S=document.createElement("div");S.className="form-content-wrapper",S.style.padding="1rem",S.style.overflow="auto",S.style.scrollbarGutter="stable",S.style.overflow="auto",S.style.scrollbarGutter="stable",this.renderRows(s.rows,d,c,S),v.appendChild(S)}const w=document.createElement("div");w.className="form-actions";const A=document.createElement("div");A.style.display="flex",A.style.gap="0.5rem";const E=document.createElement("div");E.style.display="flex",E.style.gap="0.5rem";const B=document.createElement("div");B.style.display="flex",B.style.gap="0.5rem",w.appendChild(A),w.appendChild(E),w.appendChild(B);let L=!1;if(n)JSON.parse(n).forEach(O=>{O.hidden||(L=!0);const h=document.createElement("sl-button");h.variant=O.variant||"primary",h.textContent=O.label||O.action,h.type="button",O.disabled&&(h.disabled=!0),O.hidden&&(h.style.display="none"),h.addEventListener("click",()=>{if(this.lastAction=O.action,O.action==="export-data"){this.exportFormData();return}if(O.action==="import-data"){this.importFormData();return}O.confirmation?this.showConfirmationDialog(O.confirmation,()=>{this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:O.action},bubbles:!0,composed:!0}))}):this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:O.action},bubbles:!0,composed:!0}))}),this.buttons[O.action]=h;const k=O.position||"right";k==="left"?A.appendChild(h):k==="center"?E.appendChild(h):B.appendChild(h)});else{L=!0;const S=document.createElement("sl-button");S.variant="primary",S.textContent="Submit",S.type="button",S.addEventListener("click",()=>{this.lastAction="submit",this.dispatchEvent(new CustomEvent("form-submit",{detail:{formData:this.getSubmissionData(),action:"submit"},bubbles:!0,composed:!0}))}),this.buttons.submit=S,B.appendChild(S)}L||(w.style.display="none"),v.addEventListener("submit",this.handleSubmit.bind(this)),v.appendChild(w),g.appendChild(v)}catch(s){console.error("Failed to parse form configuration:",s),this.innerHTML="<p>Error: Invalid form configuration.</p>"}}renderRows(t,e,a,n){t.forEach(l=>{const s=document.createElement("div");s.className="form-row",s.style.gridTemplateColumns=l.map(d=>d.width||"1fr").join(" "),l.forEach(d=>{const c=document.createElement("div");if(c.className="form-col",d.align&&(c.style.display="flex",c.style.justifyContent=d.align==="right"?"flex-end":d.align==="center"?"center":"flex-start"),d.type==="empty"){s.appendChild(c);return}if(d.type==="separator"){const p=document.createElement("ts-form-field");p.setAttribute("config",JSON.stringify({type:"separator",label:d.label})),p.setAttribute("field-name",`separator-${Math.random().toString(36).substr(2,9)}`),c.appendChild(p),s.appendChild(c);return}const m=e[d.field];if(m){const p=document.createElement("ts-form-field");p.setAttribute("field-name",d.field),p.setAttribute("config",JSON.stringify(m));const g=this.formData[d.field];g!=null&&(typeof g=="object"?p.setAttribute("value",JSON.stringify(g)):p.setAttribute("value",g));const v=a[d.field];v&&p.setAttribute("error",v),c.appendChild(p),s.appendChild(c)}}),n.appendChild(s)})}getSubmissionData(){const t={...this.formData};return this.fieldsConfig&&Object.keys(this.fieldsConfig).forEach(e=>{const a=this.fieldsConfig[e];(a.excludeFromSubmit||a.type==="markdown"||a.type==="infobox")&&delete t[e]}),t}fileToBase64(t){return new Promise((e,a)=>{const n=new FileReader;n.readAsDataURL(t),n.onload=()=>e(n.result),n.onerror=l=>a(l)})}async exportFormData(){const t=async e=>{if(Array.isArray(e))return Promise.all(e.map(a=>t(a)));if(e instanceof File){const a=await this.fileToBase64(e);return{name:e.name,type:e.type,size:e.size,lastModified:e.lastModified,data:a,_is_file:!0}}else if(e&&typeof e=="object"){const a={};for(const n of Object.keys(e))a[n]=await t(e[n]);return a}return e};try{const e=await t(this.formData),a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),l=document.createElement("a");l.href=n,l.download=`form-data-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(n)}catch(e){console.error("Export failed",e),alert("Export failed: "+e.message)}}importFormData(){const t=document.createElement("input");t.type="file",t.accept="application/json",t.onchange=e=>{const a=e.target.files[0];if(!a)return;const n=new FileReader;n.onload=l=>{try{const s=JSON.parse(l.target.result);this.formData=s,this.requestRender()}catch(s){console.error("Import failed",s),alert("Import failed: Invalid JSON")}},n.readAsText(a)},t.click()}handleSubmit(t){t.preventDefault()}disableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!0)}enableButton(t){this.buttons[t]&&(this.buttons[t].disabled=!1)}hideButton(t){this.buttons[t]&&(this.buttons[t].style.display="none")}showButton(t){this.buttons[t]&&(this.buttons[t].style.display="")}showConfirmationDialog(t,e){const a=document.createElement("sl-dialog");a.label=t.title||"Confirm",a.open=!0,a.size="medium",a.style.fontFamily="var(--sl-font-sans)";const n=document.createElement("div");n.textContent=t.text||"Are you sure?",a.appendChild(n);const l=document.createElement("div");l.slot="footer",l.style.display="flex",l.style.justifyContent="space-between",l.style.alignItems="center";const s=document.createElement("div");s.style.display="flex",s.style.gap="0.5rem";const d=document.createElement("div");d.style.display="flex",d.style.gap="0.5rem";const c=document.createElement("div");c.style.display="flex",c.style.gap="0.5rem",l.appendChild(s),l.appendChild(d),l.appendChild(c),t.buttons.forEach(m=>{const p=document.createElement("sl-button");p.variant=m.variant||"primary",p.textContent=m.label||m.action,p.addEventListener("click",()=>{a.hide(),m.confirm&&e()});const g=m.position||"right";g==="left"?s.appendChild(p):g==="center"?d.appendChild(p):c.appendChild(p)}),a.appendChild(l),document.body.appendChild(a)}}customElements.define("ts-form",Na);const{action:Gt}=__STORYBOOK_MODULE_ACTIONS__,_a={title:"TSWebUI/TSForm",parameters:{layout:"fullscreen"},render:i=>{const t=i.dark?"dark":"light";let e=$n.replace(/\{\{theme\}\}/g,t);const a=`form-${Math.random().toString(36).substr(2,9)}`,n=/<ts-form([^>]*)>/;if(e.match(n)){const s=[`layout='${i.layout}'`,`fields='${i.fields}'`,`errors='${i.errors}'`,`buttons='${i.buttons}'`,`values='${i.values}'`].join(" ");e=e.replace(n,`<ts-form id="${a}" ${s}>`)}return setTimeout(()=>{const s=document.getElementById(a);if(s){customElements.whenDefined("ts-form").then(()=>{s.run()});for(const d of["form-changed","form-submit","form-field-action"])s.removeEventListener(d,Gt(d)),s.addEventListener(d,c=>{Gt(d)(c.detail)})}},0),e},argTypes:{dark:{control:"boolean",description:"Dark theme mode"},layout:{control:"text",description:"Form layout configuration (JSON object)"},fields:{control:"text",description:"Form fields configuration (JSON object)"},errors:{control:"text",description:"Form validation errors (JSON object)"},values:{control:"text",description:"Initial form values (JSON object)"},buttons:{control:"text",description:"Form buttons configuration (JSON array of objects: [{action, variant, label, disabled?, hidden?, position?, confirmation?}])"}}},ne={dark:!1,buttons:"[]",layout:`{
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
    }`,errors:"{}",values:"{}"},_e={args:{...ne}},$e={args:{layout:`{
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
        }`,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"}]',values:"{}"}},je={args:{...ne,buttons:'[{"action":"save","variant":"primary","label":"Save","position":"right"},{"action":"cancel","variant":"default","label":"Cancel","position":"left"}]'}},Be={args:{...ne,buttons:'[{"action":"cancel","variant":"default","label":"Cancel","hidden":true,"position":"left"},{"action":"save","variant":"primary","label":"Save","disabled":true,"position":"right"}]'}},qe={args:{...ne,buttons:'[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'}},Je={args:{...ne,values:`{
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
        }`}},He={args:{...ne,layout:JSON.stringify({tabs:[{label:"Osobní údaje",rows:[[{field:"name"},{field:"surname"}],[{field:"birthdate"}]]},{label:"Účet",rows:[[{field:"username"},{field:"password"}],[{field:"role"},{field:"active"}],[{field:"department"}]]},{label:"Detaily",rows:[[{field:"bio"}],[{field:"avatar"},{field:"resume"}]]},{label:"Nastavení",rows:[[{field:"notifications"}],[{field:"theme"}],[{field:"projects"}]]},{label:"Tabulka",rows:[[{field:"history"}]]},{label:"Další prvky",rows:[[{field:"section1"}],[{field:"terms",width:"1fr"},{field:"satisfaction",width:"2fr"}],[{field:"country"},{field:"meetingTime"},{field:"startDate"}],[{field:"section2"}],[{field:"age",width:"150px"}],[{field:"section3"}],[{type:"empty"},{field:"statusGroup",align:"right"}],[{field:"actionButton"}]]}]}),fields:JSON.stringify({name:{label:"Jméno",type:"text",required:!0},surname:{label:"Příjmení",type:"text",required:!0},username:{label:"Uživatelské jméno",type:"text",required:!0},password:{label:"Heslo",type:"password",required:!0},number:{label:"Number Input",type:"number"},currency:{label:"Currency (Round 0.01)",type:"number",roundTo:.01},role:{label:"Role",type:"select",options:[{value:"admin",label:"Administrátor"},{value:"manager",label:"Manažer"},{value:"user",label:"Uživatel"},{value:"guest",label:"Host"}]},active:{label:"Aktivní účet",type:"switch",labelPosition:"right"},birthdate:{label:"Datum narození",type:"date"},bio:{label:"Životopis",type:"textarea",hideLabel:!0,placeholder:"Životopis (bez labelu)"},avatar:{label:"Profilový obrázek",type:"image",multiple:!0},resume:{label:"Životopis (PDF)",type:"file",multiple:!0},notifications:{label:"Notifikace",type:"select",multiple:!0,options:[{value:"email",label:"E-mail"},{value:"sms",label:"SMS"},{value:"push",label:"Push notifikace"},{value:"slack",label:"Slack"}]},theme:{label:"Preferovaný vzhled",type:"radio",options:[{value:"light",label:"Světlý"},{value:"dark",label:"Tmavý"},{value:"auto",label:"Automaticky"}]},department:{label:"Oddělení (N:1)",type:"relationship",targetEntity:"department",mode:"single",displayFields:["name"],valueField:"id",options:[{id:1,name:"IT",code:"DEP-01"},{id:2,name:"HR",code:"DEP-02"},{id:3,name:"Sales",code:"DEP-03"},{id:4,name:"Marketing",code:"DEP-04"}]},projects:{label:"Projekty (M:N)",type:"relationship",targetEntity:"project",mode:"multiple",displayFields:["code","name"],chipDisplayFields:["name"],valueField:"id",options:[{id:101,name:"Website Redesign",code:"PRJ-WEB"},{id:102,name:"Mobile App",code:"PRJ-APP"},{id:103,name:"Cloud Migration",code:"PRJ-CLOUD"},{id:104,name:"Security Audit",code:"PRJ-SEC"},{id:105,name:"AI Integration",code:"PRJ-AI"},{id:106,name:"Database Optimization",code:"PRJ-DB"},{id:107,name:"API Restructuring",code:"PRJ-API"},{id:108,name:"Frontend Refactor",code:"PRJ-FE"},{id:109,name:"Backend Refactor",code:"PRJ-BE"},{id:110,name:"DevOps Pipeline",code:"PRJ-OPS"},{id:111,name:"User Testing",code:"PRJ-UX"},{id:112,name:"Market Research",code:"PRJ-MKT"},{id:113,name:"Legal Compliance",code:"PRJ-LEG"},{id:114,name:"GDPR Audit",code:"PRJ-GDPR"},{id:115,name:"Network Upgrade",code:"PRJ-NET"},{id:116,name:"Server Migration",code:"PRJ-SRV"},{id:117,name:"Client Onboarding",code:"PRJ-CLI"},{id:118,name:"Internal Training",code:"PRJ-TRN"},{id:119,name:"Documentation",code:"PRJ-DOC"},{id:120,name:"Legacy Retirement",code:"PRJ-OLD"}]},history:{label:"Historie aktivit",type:"table",showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,itemsPerPage:5,itemsPerPageOptions:[5,10,20],singleItemActions:"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat",multipleItemsActions:"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané",columns:[{field:"date",header:"Datum",type:"date",sortable:!0,filterable:!0,canBeCopied:!0,isClickable:!0,align:"right"},{field:"action",header:"Akce",type:"text",sortable:!0,filterable:!0,isClickable:!0},{field:"user",header:"Uživatel",type:"text",sortable:!0,filterable:!0}],data:[{id:1,date:"2023-01-01",action:"Login",user:"jnovak"},{id:2,date:"2023-01-02",action:"Update Profile",user:"jnovak"},{id:3,date:"2023-01-03",action:"Logout",user:"jnovak"},{id:4,date:"2023-01-04",action:"Login",user:"jnovak"},{id:5,date:"2023-01-05",action:"View Report",user:"jnovak"},{id:6,date:"2023-01-06",action:"Export Data",user:"jnovak"},{id:7,date:"2023-01-07",action:"Logout",user:"jnovak"}]},section1:{type:"separator",label:"Základní nastavení"},section2:{type:"separator",label:"Osobní údaje"},section3:{type:"separator",label:"Akce"},terms:{label:"Souhlasím s podmínkami",type:"checkbox"},satisfaction:{label:"Spokojenost",type:"slider",min:0,max:100,step:10},country:{label:"Země (Combobox)",type:"combobox",options:[{value:"cz",label:"Česká republika"},{value:"sk",label:"Slovensko"},{value:"de",label:"Německo"},{value:"pl",label:"Polsko"},{value:"at",label:"Rakousko"}]},startDate:{label:"Datum zahájení (Date only)",type:"date"},meetingTime:{label:"Čas schůzky",type:"datetime"},age:{label:"Věk",type:"number",min:0,max:120},statusGroup:{type:"button-group",variant:"process",label:"Status",options:["draft/true/default/Koncept","published/true/success/Publikováno","archived/true/warning/Archivováno"]},actionButton:{type:"button",label:"Provést akci",variant:"primary",action:"custom_action"}}),buttons:JSON.stringify([{action:"cancel",label:"Zrušit",variant:"default"},{action:"save",label:"Uložit",variant:"primary"}]),values:JSON.stringify({name:"Jan",surname:"Novák",username:"jnovak",password:"password123",role:"user",active:!1,birthdate:"1990-05-15",bio:"Zkušený vývojář se zaměřením na webové technologie.",theme:"dark",notifications:["email","push"],department:2,projects:[101,103],terms:!0,satisfaction:80,country:"cz",age:30,statusGroup:"published",meetingTime:"2023-11-15 14:30",startDate:"2023-01-01"})}},We={args:{...ne,layout:JSON.stringify({tabs:[{label:"Text Inputs",rows:[[{type:"separator",label:"Text Input"}],[{field:"text"}],[{type:"separator",label:"Textarea (Rows 2)"}],[{field:"textareaSmall"}],[{type:"separator",label:"Textarea (Rows 6)"}],[{field:"textareaLarge"}]]},{label:"Numeric & Date",rows:[[{type:"separator",label:"Number Input"}],[{field:"number"}],[{type:"separator",label:"Currency (Round 0.01)"}],[{field:"currency"}],[{type:"separator",label:"Slider"}],[{field:"slider"}],[{type:"separator",label:"Date Picker"}],[{field:"date"}],[{type:"separator",label:"Datetime Picker"}],[{field:"datetime"}]]},{label:"Selects & Pickers",rows:[[{type:"separator",label:"Select"}],[{field:"select"}],[{type:"separator",label:"Multiselect"}],[{field:"multiselect"}],[{type:"separator",label:"Combobox"}],[{field:"combobox"}],[{field:"comboboxStrict"},{field:"comboboxCustom"}],[{type:"separator",label:"Relationship Picker (Single)"}],[{field:"relationshipSingle"}],[{type:"separator",label:"Relationship Picker (Multiple)"}],[{field:"relationshipMultiple"}]]},{label:"Toggles & Buttons",rows:[[{type:"separator",label:"Checkbox"}],[{field:"checkbox"}],[{type:"separator",label:"Switch"}],[{field:"switch"}],[{type:"separator",label:"Radio Group"}],[{field:"radio"}],[{type:"separator",label:"Button Group"}],[{field:"buttonGroup"}],[{type:"separator",label:"Button Field"}],[{field:"button"}]]},{label:"Files & Media",rows:[[{type:"separator",label:"File Upload"}],[{field:"file"}],[{type:"separator",label:"Image Upload"}],[{field:"image"}]]},{label:"Table",rows:[[{field:"table"}]]},{label:"Statické",rows:[[{type:"separator",label:"Infoboxes"}],[{field:"infoPrimary"}],[{field:"infoSuccess"}],[{field:"infoWarning"}],[{field:"infoDanger"}],[{field:"infoNeutral"}],[{type:"separator",label:"Markdown"}],[{field:"markdownExample"}]]}]}),fields:'{"text":{"type":"text","label":"Text Field","required":true,"placeholder":"test"},"textareaSmall":{"type":"textarea","label":"Small Textarea","rows":2, "required":true,"placeholder":"test"},"textareaLarge":{"type":"textarea","label":"Large Textarea","rows":6},"number":{"type":"number","label":"Number Field","min":0,"max":100},"currency":{"type":"number","label":"Currency Field","roundTo":0.01},"slider":{"type":"slider","label":"Slider Field","min":0,"max":100,"step":10},"date":{"type":"date","label":"Date Field"},"datetime":{"type":"datetime","label":"Datetime Field"},"select":{"type":"select","label":"Select Field","options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"multiselect":{"type":"select","label":"Multiselect Field","multiple":true,"options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"combobox":{"type":"combobox","label":"Combobox Field (Allows Empty)","allowEmpty":true,"options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"comboboxStrict":{"type":"combobox","label":"Strict Combobox (No Custom)","allowCustom":false,"options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"comboboxCustom":{"type":"combobox","label":"Custom Combobox (Allow Custom)","allowCustom":true,"options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"relationshipSingle":{"type":"relationship","label":"Relationship (Single)","targetEntity":"entity","mode":"single","displayFields":["name"],"valueField":"id","options":[{"id":1,"name":"Entity 1"},{"id":2,"name":"Entity 2"}]},"relationshipMultiple":{"type":"relationship","label":"Relationship (Multiple)","targetEntity":"entity","mode":"multiple","displayFields":["name"],"chipDisplayFields":["name"],"valueField":"id","options":[{"id":1,"name":"Entity 1"},{"id":2,"name":"Entity 2"}]},"checkbox":{"type":"checkbox","label":"Checkbox Field"},"switch":{"type":"switch","label":"Switch Field"},"radio":{"type":"radio","label":"Radio Field","options":[{"value":"1","label":"Option 1"},{"value":"2","label":"Option 2"}]},"buttonGroup":{"type":"button-group","label":"Button Group","options":["1/true/default/Option 1","2/true/primary/Option 2"]},"button":{"type":"button","label":"Button Field","variant":"primary","action":"click"},"file":{"type":"file","label":"Nahrát soubor","innerLabel":"Klikněte pro nahrání souboru","required":true},"image":{"type":"image","label":"Nahrát obrázky","innerLabel":"Klikněte pro nahrání obrázků","multiple":true},"table":{"label":"Example Table","type":"table","showCreateButton":true,"showImportButton":true,"showExportButton":true,"showColumnSelector":true,"enableSorting":true,"enableFiltering":true,"enableColumnResizing":true,"enableColumnReordering":true,"enableSelection":true,"enableRowMenu":true,"enableClickableRows":true,"enableClickableColumns":true,"enablePagination":true,"itemsPerPage":5,"itemsPerPageOptions":[5,10,20],"singleItemActions":"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat","multipleItemsActions":"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané","columns":[{"field":"id","header":"ID","type":"number","sortable":true,"filterable":true,"width":"80px"},{"field":"name","header":"Name","type":"text","sortable":true,"filterable":true},{"field":"status","header":"Status","type":"text","sortable":true,"filterable":true}],"data":[{"id":1,"name":"Item 1","status":"Active"},{"id":2,"name":"Item 2","status":"Inactive"},{"id":3,"name":"Item 3","status":"Active"}]},"infoPrimary":{"type":"infobox","variant":"primary","icon":"info-circle","content":"<strong>Primary Info</strong><br>This is a primary alert with <em>HTML</em> content."},"infoSuccess":{"type":"infobox","variant":"success","icon":"check-circle","content":"Success alert."},"infoWarning":{"type":"infobox","variant":"warning","icon":"exclamation-triangle","content":"Warning alert."},"infoDanger":{"type":"infobox","variant":"danger","icon":"exclamation-octagon","content":"Danger alert."},"infoNeutral":{"type":"infobox","variant":"neutral","icon":"gear","content":"Neutral alert."},"markdownExample":{"type":"markdown","content":"\\n### Markdown Content\\nYou can include **bold**, *italic*, and [links](#).\\n- Bullet points\\n- Lists\\n"}}',values:"{}"}},Ye={args:{...ne,layout:JSON.stringify({tabs:[{label:"Adresa",rows:[[{field:"street",width:"8fr"},{field:"cp",width:"2fr"},{field:"ce",width:"2fr"}],[{field:"zip",width:"2fr"},{field:"city",width:"6fr"},{field:"country",width:"2fr"},{type:"empty",width:"2fr"}]]}]}),fields:JSON.stringify({street:{type:"text",label:"Ulice"},cp:{type:"text",label:"ČP"},ce:{type:"text",label:"Č.ev."},zip:{type:"text",label:"PSČ"},city:{type:"text",label:"Obec"},country:{type:"text",label:"Stát"}})}},Ue={args:{...ne,layout:JSON.stringify({rows:[[{field:"loginInfo",width:"1fr"}],[{field:"username",width:"1fr"}],[{field:"password",width:"1fr"}]]}),fields:JSON.stringify({loginInfo:{type:"infobox",variant:"neutral",icon:"box-arrow-in-right",content:"Zadejte uživatelské jméno a heslo"},username:{type:"text",label:"Uživatel",required:!0,autofocus:!0,enterAction:"focus:password",escapeAction:"click:cancel"},password:{type:"password",label:"Heslo",required:!0,enterAction:"submit",escapeAction:"click:cancel"}}),buttons:JSON.stringify([{action:"cancel",label:"Zrušit",variant:"text",position:"left"},{action:"login",label:"Přihlásit se",variant:"primary",position:"right"}]),values:"{}"}},Ze={args:{...ne,layout:JSON.stringify({rows:[[{field:"warningMessage",width:"1fr"}]]}),fields:JSON.stringify({warningMessage:{type:"infobox",variant:"warning",icon:"exclamation-triangle",content:"<strong>Opravdu chcete zaúčtovat nesmysly?</strong>"}}),buttons:JSON.stringify([{action:"no",label:"NE",variant:"default",position:"right"},{action:"yes",label:"ANO",variant:"primary",position:"right"}]),values:"{}"}},Ve={args:{...ne,layout:JSON.stringify({tabs:[{label:"Basic Fields",rows:[[{field:"text"},{field:"number"}],[{field:"date"},{field:"datetime"}],[{field:"textarea"}]]},{label:"Selection",rows:[[{field:"select"},{field:"multiselect"}],[{field:"combobox"},{field:"radio"}],[{field:"checkbox"},{field:"switch"}]]},{label:"Files",rows:[[{field:"fileSingle"}],[{field:"fileMultiple"}],[{field:"imageMultiple"}]]}]}),fields:JSON.stringify({text:{type:"text",label:"Text"},number:{type:"number",label:"Number"},date:{type:"date",label:"Date"},datetime:{type:"datetime",label:"Datetime"},textarea:{type:"textarea",label:"Long Text"},select:{type:"select",label:"Select",options:[{value:"a",label:"A"},{value:"b",label:"B"}]},multiselect:{type:"select",label:"Multi Select",multiple:!0,options:[{value:"x",label:"X"},{value:"y",label:"Y"}]},combobox:{type:"combobox",label:"Combobox",options:[{value:"1",label:"One"},{value:"2",label:"Two"}]},radio:{type:"radio",label:"Radio",options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}]},checkbox:{type:"checkbox",label:"Checkbox"},switch:{type:"switch",label:"Switch"},fileSingle:{type:"file",label:"Single File"},fileMultiple:{type:"file",label:"Multiple Files",multiple:!0},imageMultiple:{type:"image",label:"Multiple Images",multiple:!0}}),buttons:JSON.stringify([{action:"import-data",label:"Načíst data (Import)",variant:"default",position:"left"},{action:"export-data",label:"Uložit data (Export)",variant:"primary",position:"right"}])}},Ge={args:{...ne,layout:JSON.stringify({rows:[[{field:"numericCombobox",width:"1fr"}]]}),fields:'{"numericCombobox":{"required":true,"type":"combobox","label":"Numeric Values","options":[{"value":1,"label":"One (ID: 1)"},{"value":2,"label":"Two (ID: 2)"}]}}',values:JSON.stringify({numericCombobox:1})}},Ke={args:{...ne,layout:JSON.stringify({rows:[[{field:"fileWithDualLabels",width:"1fr"}],[{field:"imageWithDualLabels",width:"1fr"}]]}),fields:JSON.stringify({fileWithDualLabels:{type:"file",label:"Příloha (Outer Label)",innerLabel:"Klikněte pro nahrání souboru (Inner Label)",required:!0},imageWithDualLabels:{type:"image",label:"Profilová fotka (Outer Label)",innerLabel:"Sem přetáhněte fotku (Inner Label)",multiple:!0}}),values:"{}"}},Qe={args:{fields:JSON.stringify({field1:{type:"text",label:"Field Above"},field2:{type:"text",label:"Field Below"}}),layout:JSON.stringify({rows:[[{field:"field1"}],[{type:"separator",label:"Separator With Label"}],[{type:"empty"}],[{type:"separator",label:""}],[{field:"field2"}]]}),values:"{}",errors:"{}",buttons:"[]"}};_e.parameters={..._e.parameters,docs:{..._e.parameters?.docs,source:{originalSource:`{
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
}`,...Be.parameters?.docs?.source}}};qe.parameters={...qe.parameters,docs:{...qe.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    buttons: '[{"action":"cancel","variant":"text","label":"Cancel","position":"left"},{"action":"delete","variant":"danger","label":"Delete","position":"right","confirmation":{"title":"Potvrdit akci","text":"Opravdu smazat záznam?","buttons":[{"action":"no","variant":"default","label":"Ne","position":"left"},{"action":"yes","variant":"danger","label":"Ano","confirm":true,"position":"right"}]}}]'
  }
}`,...qe.parameters?.docs?.source}}};Je.parameters={...Je.parameters,docs:{...Je.parameters?.docs,source:{originalSource:`{
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
}`,...Je.parameters?.docs?.source}}};He.parameters={...He.parameters,docs:{...He.parameters?.docs,source:{originalSource:`{
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
}`,...He.parameters?.docs?.source}}};We.parameters={...We.parameters,docs:{...We.parameters?.docs,source:{originalSource:`{
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
          label: 'Textarea (Rows 2)'
        }], [{
          field: 'textareaSmall'
        }], [{
          type: 'separator',
          label: 'Textarea (Rows 6)'
        }], [{
          field: 'textareaLarge'
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
    fields: "{\\"text\\":{\\"type\\":\\"text\\",\\"label\\":\\"Text Field\\",\\"required\\":true,\\"placeholder\\":\\"test\\"},\\"textareaSmall\\":{\\"type\\":\\"textarea\\",\\"label\\":\\"Small Textarea\\",\\"rows\\":2, \\"required\\":true,\\"placeholder\\":\\"test\\"},\\"textareaLarge\\":{\\"type\\":\\"textarea\\",\\"label\\":\\"Large Textarea\\",\\"rows\\":6},\\"number\\":{\\"type\\":\\"number\\",\\"label\\":\\"Number Field\\",\\"min\\":0,\\"max\\":100},\\"currency\\":{\\"type\\":\\"number\\",\\"label\\":\\"Currency Field\\",\\"roundTo\\":0.01},\\"slider\\":{\\"type\\":\\"slider\\",\\"label\\":\\"Slider Field\\",\\"min\\":0,\\"max\\":100,\\"step\\":10},\\"date\\":{\\"type\\":\\"date\\",\\"label\\":\\"Date Field\\"},\\"datetime\\":{\\"type\\":\\"datetime\\",\\"label\\":\\"Datetime Field\\"},\\"select\\":{\\"type\\":\\"select\\",\\"label\\":\\"Select Field\\",\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"multiselect\\":{\\"type\\":\\"select\\",\\"label\\":\\"Multiselect Field\\",\\"multiple\\":true,\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"combobox\\":{\\"type\\":\\"combobox\\",\\"label\\":\\"Combobox Field (Allows Empty)\\",\\"allowEmpty\\":true,\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"comboboxStrict\\":{\\"type\\":\\"combobox\\",\\"label\\":\\"Strict Combobox (No Custom)\\",\\"allowCustom\\":false,\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"comboboxCustom\\":{\\"type\\":\\"combobox\\",\\"label\\":\\"Custom Combobox (Allow Custom)\\",\\"allowCustom\\":true,\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"relationshipSingle\\":{\\"type\\":\\"relationship\\",\\"label\\":\\"Relationship (Single)\\",\\"targetEntity\\":\\"entity\\",\\"mode\\":\\"single\\",\\"displayFields\\":[\\"name\\"],\\"valueField\\":\\"id\\",\\"options\\":[{\\"id\\":1,\\"name\\":\\"Entity 1\\"},{\\"id\\":2,\\"name\\":\\"Entity 2\\"}]},\\"relationshipMultiple\\":{\\"type\\":\\"relationship\\",\\"label\\":\\"Relationship (Multiple)\\",\\"targetEntity\\":\\"entity\\",\\"mode\\":\\"multiple\\",\\"displayFields\\":[\\"name\\"],\\"chipDisplayFields\\":[\\"name\\"],\\"valueField\\":\\"id\\",\\"options\\":[{\\"id\\":1,\\"name\\":\\"Entity 1\\"},{\\"id\\":2,\\"name\\":\\"Entity 2\\"}]},\\"checkbox\\":{\\"type\\":\\"checkbox\\",\\"label\\":\\"Checkbox Field\\"},\\"switch\\":{\\"type\\":\\"switch\\",\\"label\\":\\"Switch Field\\"},\\"radio\\":{\\"type\\":\\"radio\\",\\"label\\":\\"Radio Field\\",\\"options\\":[{\\"value\\":\\"1\\",\\"label\\":\\"Option 1\\"},{\\"value\\":\\"2\\",\\"label\\":\\"Option 2\\"}]},\\"buttonGroup\\":{\\"type\\":\\"button-group\\",\\"label\\":\\"Button Group\\",\\"options\\":[\\"1/true/default/Option 1\\",\\"2/true/primary/Option 2\\"]},\\"button\\":{\\"type\\":\\"button\\",\\"label\\":\\"Button Field\\",\\"variant\\":\\"primary\\",\\"action\\":\\"click\\"},\\"file\\":{\\"type\\":\\"file\\",\\"label\\":\\"Nahrát soubor\\",\\"innerLabel\\":\\"Klikněte pro nahrání souboru\\",\\"required\\":true},\\"image\\":{\\"type\\":\\"image\\",\\"label\\":\\"Nahrát obrázky\\",\\"innerLabel\\":\\"Klikněte pro nahrání obrázků\\",\\"multiple\\":true},\\"table\\":{\\"label\\":\\"Example Table\\",\\"type\\":\\"table\\",\\"showCreateButton\\":true,\\"showImportButton\\":true,\\"showExportButton\\":true,\\"showColumnSelector\\":true,\\"enableSorting\\":true,\\"enableFiltering\\":true,\\"enableColumnResizing\\":true,\\"enableColumnReordering\\":true,\\"enableSelection\\":true,\\"enableRowMenu\\":true,\\"enableClickableRows\\":true,\\"enableClickableColumns\\":true,\\"enablePagination\\":true,\\"itemsPerPage\\":5,\\"itemsPerPageOptions\\":[5,10,20],\\"singleItemActions\\":\\"view_details/Zobrazit detaily,edit/Upravit,delete/Smazat\\",\\"multipleItemsActions\\":\\"delete_selected/Smazat vybrané,export_selected/Exportovat vybrané\\",\\"columns\\":[{\\"field\\":\\"id\\",\\"header\\":\\"ID\\",\\"type\\":\\"number\\",\\"sortable\\":true,\\"filterable\\":true,\\"width\\":\\"80px\\"},{\\"field\\":\\"name\\",\\"header\\":\\"Name\\",\\"type\\":\\"text\\",\\"sortable\\":true,\\"filterable\\":true},{\\"field\\":\\"status\\",\\"header\\":\\"Status\\",\\"type\\":\\"text\\",\\"sortable\\":true,\\"filterable\\":true}],\\"data\\":[{\\"id\\":1,\\"name\\":\\"Item 1\\",\\"status\\":\\"Active\\"},{\\"id\\":2,\\"name\\":\\"Item 2\\",\\"status\\":\\"Inactive\\"},{\\"id\\":3,\\"name\\":\\"Item 3\\",\\"status\\":\\"Active\\"}]},\\"infoPrimary\\":{\\"type\\":\\"infobox\\",\\"variant\\":\\"primary\\",\\"icon\\":\\"info-circle\\",\\"content\\":\\"<strong>Primary Info</strong><br>This is a primary alert with <em>HTML</em> content.\\"},\\"infoSuccess\\":{\\"type\\":\\"infobox\\",\\"variant\\":\\"success\\",\\"icon\\":\\"check-circle\\",\\"content\\":\\"Success alert.\\"},\\"infoWarning\\":{\\"type\\":\\"infobox\\",\\"variant\\":\\"warning\\",\\"icon\\":\\"exclamation-triangle\\",\\"content\\":\\"Warning alert.\\"},\\"infoDanger\\":{\\"type\\":\\"infobox\\",\\"variant\\":\\"danger\\",\\"icon\\":\\"exclamation-octagon\\",\\"content\\":\\"Danger alert.\\"},\\"infoNeutral\\":{\\"type\\":\\"infobox\\",\\"variant\\":\\"neutral\\",\\"icon\\":\\"gear\\",\\"content\\":\\"Neutral alert.\\"},\\"markdownExample\\":{\\"type\\":\\"markdown\\",\\"content\\":\\"\\\\n### Markdown Content\\\\nYou can include **bold**, *italic*, and [links](#).\\\\n- Bullet points\\\\n- Lists\\\\n\\"}}",
    values: '{}'
  }
}`,...We.parameters?.docs?.source}}};Ye.parameters={...Ye.parameters,docs:{...Ye.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      tabs: [{
        label: 'Adresa',
        rows: [[{
          field: 'street',
          width: '8fr'
        }, {
          field: 'cp',
          width: '2fr'
        }, {
          field: 'ce',
          width: '2fr'
        }], [{
          field: 'zip',
          width: '2fr'
        }, {
          field: 'city',
          width: '6fr'
        }, {
          field: 'country',
          width: '2fr'
        }, {
          type: 'empty',
          width: '2fr'
        }]]
      }]
    }),
    fields: JSON.stringify({
      street: {
        type: 'text',
        label: 'Ulice'
      },
      cp: {
        type: 'text',
        label: 'ČP'
      },
      ce: {
        type: 'text',
        label: 'Č.ev.'
      },
      zip: {
        type: 'text',
        label: 'PSČ'
      },
      city: {
        type: 'text',
        label: 'Obec'
      },
      country: {
        type: 'text',
        label: 'Stát'
      }
    })
  }
}`,...Ye.parameters?.docs?.source}}};Ue.parameters={...Ue.parameters,docs:{...Ue.parameters?.docs,source:{originalSource:`{
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
}`,...Ue.parameters?.docs?.source}}};Ze.parameters={...Ze.parameters,docs:{...Ze.parameters?.docs,source:{originalSource:`{
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
}`,...Ze.parameters?.docs?.source}}};Ve.parameters={...Ve.parameters,docs:{...Ve.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      tabs: [{
        label: 'Basic Fields',
        rows: [[{
          field: 'text'
        }, {
          field: 'number'
        }], [{
          field: 'date'
        }, {
          field: 'datetime'
        }], [{
          field: 'textarea'
        }]]
      }, {
        label: 'Selection',
        rows: [[{
          field: 'select'
        }, {
          field: 'multiselect'
        }], [{
          field: 'combobox'
        }, {
          field: 'radio'
        }], [{
          field: 'checkbox'
        }, {
          field: 'switch'
        }]]
      }, {
        label: 'Files',
        rows: [[{
          field: 'fileSingle'
        }], [{
          field: 'fileMultiple'
        }], [{
          field: 'imageMultiple'
        }]]
      }]
    }),
    fields: JSON.stringify({
      text: {
        type: 'text',
        label: 'Text'
      },
      number: {
        type: 'number',
        label: 'Number'
      },
      date: {
        type: 'date',
        label: 'Date'
      },
      datetime: {
        type: 'datetime',
        label: 'Datetime'
      },
      textarea: {
        type: 'textarea',
        label: 'Long Text'
      },
      select: {
        type: 'select',
        label: 'Select',
        options: [{
          value: 'a',
          label: 'A'
        }, {
          value: 'b',
          label: 'B'
        }]
      },
      multiselect: {
        type: 'select',
        label: 'Multi Select',
        multiple: true,
        options: [{
          value: 'x',
          label: 'X'
        }, {
          value: 'y',
          label: 'Y'
        }]
      },
      combobox: {
        type: 'combobox',
        label: 'Combobox',
        options: [{
          value: '1',
          label: 'One'
        }, {
          value: '2',
          label: 'Two'
        }]
      },
      radio: {
        type: 'radio',
        label: 'Radio',
        options: [{
          value: 'yes',
          label: 'Yes'
        }, {
          value: 'no',
          label: 'No'
        }]
      },
      checkbox: {
        type: 'checkbox',
        label: 'Checkbox'
      },
      switch: {
        type: 'switch',
        label: 'Switch'
      },
      fileSingle: {
        type: 'file',
        label: 'Single File'
      },
      fileMultiple: {
        type: 'file',
        label: 'Multiple Files',
        multiple: true
      },
      imageMultiple: {
        type: 'image',
        label: 'Multiple Images',
        multiple: true
      }
    }),
    buttons: JSON.stringify([{
      action: 'import-data',
      label: 'Načíst data (Import)',
      variant: 'default',
      position: 'left'
    }, {
      action: 'export-data',
      label: 'Uložit data (Export)',
      variant: 'primary',
      position: 'right'
    }])
  }
}`,...Ve.parameters?.docs?.source}}};Ge.parameters={...Ge.parameters,docs:{...Ge.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      rows: [[{
        field: 'numericCombobox',
        width: '1fr'
      }]]
    }),
    fields: "{\\"numericCombobox\\":{\\"required\\":true,\\"type\\":\\"combobox\\",\\"label\\":\\"Numeric Values\\",\\"options\\":[{\\"value\\":1,\\"label\\":\\"One (ID: 1)\\"},{\\"value\\":2,\\"label\\":\\"Two (ID: 2)\\"}]}}",
    values: JSON.stringify({
      numericCombobox: 1
    })
  }
}`,...Ge.parameters?.docs?.source}}};Ke.parameters={...Ke.parameters,docs:{...Ke.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    layout: JSON.stringify({
      rows: [[{
        field: 'fileWithDualLabels',
        width: '1fr'
      }], [{
        field: 'imageWithDualLabels',
        width: '1fr'
      }]]
    }),
    fields: JSON.stringify({
      fileWithDualLabels: {
        type: 'file',
        label: 'Příloha (Outer Label)',
        innerLabel: 'Klikněte pro nahrání souboru (Inner Label)',
        required: true
      },
      imageWithDualLabels: {
        type: 'image',
        label: 'Profilová fotka (Outer Label)',
        innerLabel: 'Sem přetáhněte fotku (Inner Label)',
        multiple: true
      }
    }),
    values: '{}'
  }
}`,...Ke.parameters?.docs?.source}}};Qe.parameters={...Qe.parameters,docs:{...Qe.parameters?.docs,source:{originalSource:`{
  args: {
    fields: JSON.stringify({
      field1: {
        type: 'text',
        label: 'Field Above'
      },
      field2: {
        type: 'text',
        label: 'Field Below'
      }
    }),
    layout: JSON.stringify({
      rows: [[{
        field: 'field1'
      }], [{
        type: 'separator',
        label: 'Separator With Label'
      }], [{
        type: 'empty'
      }],
      // Spacer
      [{
        type: 'separator',
        label: ''
      }],
      // Separator Without Label
      [{
        field: 'field2'
      }]]
    }),
    values: '{}',
    errors: '{}',
    buttons: '[]'
  }
}`,...Qe.parameters?.docs?.source}}};const $a=["Default","WithErrors","WithButtons","WithDisabledAndHiddenButtons","WithConfirmation","WithValues","Complex","AllElements","PartialRow","LoginForm","ConfirmationDialog","VerificationWithImportExport","DebugCombobox","FileUploadWithDualLabels","Separators"];export{We as AllElements,He as Complex,Ze as ConfirmationDialog,Ge as DebugCombobox,_e as Default,Ke as FileUploadWithDualLabels,Ue as LoginForm,Ye as PartialRow,Qe as Separators,Ve as VerificationWithImportExport,je as WithButtons,qe as WithConfirmation,Be as WithDisabledAndHiddenButtons,$e as WithErrors,Je as WithValues,$a as __namedExportsOrder,_a as default};
