import{j as n,M as K}from"./blocks-BktivKAf.js";import{useMDXComponents as U}from"./index-n8hgM1XI.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-nUyNzROl.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,z=T.trustedTypes,M=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,V="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+m,Z=`<${F}>`,b=document,N=()=>b.createComment(""),y=t=>t===null||typeof t!="object"&&typeof t!="function",H=Array.isArray,J=t=>H(t)||typeof t?.[Symbol.iterator]=="function",S=`[ 	
\f\r]`,f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,E=/>/g,g=RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),C=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,A=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),D=new WeakMap,v=b.createTreeWalker(b,129);function R(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return M!==void 0?M.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let l,r=e===2?"<svg>":e===3?"<math>":"",o=f;for(let j=0;j<i;j++){const d=t[j];let a,x,c=-1,u=0;for(;u<d.length&&(o.lastIndex=u,x=o.exec(d),x!==null);)u=o.lastIndex,o===f?x[1]==="!--"?o=O:x[1]!==void 0?o=E:x[2]!==void 0?(B.test(x[2])&&(l=RegExp("</"+x[2],"g")),o=g):x[3]!==void 0&&(o=g):o===g?x[0]===">"?(o=l??f,c=-1):x[1]===void 0?c=-2:(c=o.lastIndex-x[2].length,a=x[1],o=x[3]===void 0?g:x[3]==='"'?I:C):o===I||o===C?o=g:o===O||o===E?o=f:(o=g,l=void 0);const p=o===g&&t[j+1].startsWith("/>")?" ":"";r+=o===f?d+Z:c>=0?(s.push(a),d.slice(0,c)+V+d.slice(c)+m+p):d+m+(c===-2?j:p)}return[R(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class ${constructor({strings:e,_$litType$:i},s){let l;this.parts=[];let r=0,o=0;const j=e.length-1,d=this.parts,[a,x]=W(e,i);if(this.el=$.createElement(a,s),v.currentNode=this.el.content,i===2||i===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(l=v.nextNode())!==null&&d.length<j;){if(l.nodeType===1){if(l.hasAttributes())for(const c of l.getAttributeNames())if(c.endsWith(V)){const u=x[o++],p=l.getAttribute(c).split(m),_=/([.?@])?(.*)/.exec(u);d.push({type:1,index:r,name:_[2],strings:p,ctor:_[1]==="."?Y:_[1]==="?"?G:_[1]==="@"?X:P}),l.removeAttribute(c)}else c.startsWith(m)&&(d.push({type:6,index:r}),l.removeAttribute(c));if(B.test(l.tagName)){const c=l.textContent.split(m),u=c.length-1;if(u>0){l.textContent=z?z.emptyScript:"";for(let p=0;p<u;p++)l.append(c[p],N()),v.nextNode(),d.push({type:2,index:++r});l.append(c[u],N())}}}else if(l.nodeType===8)if(l.data===F)d.push({type:2,index:r});else{let c=-1;for(;(c=l.data.indexOf(m,c+1))!==-1;)d.push({type:7,index:r}),c+=m.length-1}r++}}static createElement(e,i){const s=b.createElement("template");return s.innerHTML=e,s}}function k(t,e,i=t,s){if(e===A)return e;let l=s!==void 0?i._$Co?.[s]:i._$Cl;const r=y(e)?void 0:e._$litDirective$;return l?.constructor!==r&&(l?._$AO?.(!1),r===void 0?l=void 0:(l=new r(t),l._$AT(t,i,s)),s!==void 0?(i._$Co??=[])[s]=l:i._$Cl=l),l!==void 0&&(e=k(t,l._$AS(t,e.values),l,s)),e}class q{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:s}=this._$AD,l=(e?.creationScope??b).importNode(i,!0);v.currentNode=l;let r=v.nextNode(),o=0,j=0,d=s[0];for(;d!==void 0;){if(o===d.index){let a;d.type===2?a=new w(r,r.nextSibling,this,e):d.type===1?a=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(a=new Q(r,this,e)),this._$AV.push(a),d=s[++j]}o!==d?.index&&(r=v.nextNode(),o++)}return v.currentNode=b,l}p(e){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}}class w{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,i,s,l){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=l,this._$Cv=l?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&e?.nodeType===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=k(this,e,i),y(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):J(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&y(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){const{values:i,_$litType$:s}=e,l=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=$.createElement(R(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===l)this._$AH.p(i);else{const r=new q(l,this),o=r.u(this.options);r.p(i),this.T(o),this._$AH=r}}_$AC(e){let i=D.get(e.strings);return i===void 0&&D.set(e.strings,i=new $(e)),i}k(e){H(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,l=0;for(const r of e)l===i.length?i.push(s=new w(this.O(N()),this.O(N()),this,this.options)):s=i[l],s._$AI(r),l++;l<i.length&&(this._$AR(s&&s._$AB.nextSibling,l),i.length=l)}_$AR(e=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class P{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,l,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=i,this._$AM=l,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,i=this,s,l){const r=this.strings;let o=!1;if(r===void 0)e=k(this,e,i,0),o=!y(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{const j=e;let d,a;for(e=r[0],d=0;d<r.length-1;d++)a=k(this,j[s+d],i,d),a===A&&(a=this._$AH[d]),o||=!y(a)||a!==this._$AH[d],a===h?e=h:e!==h&&(e+=(a??"")+r[d+1]),this._$AH[d]=a}o&&!l&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Y extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class G extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class X extends P{constructor(e,i,s,l,r){super(e,i,s,l,r),this.type=5}_$AI(e,i=this){if((e=k(this,e,i,0)??h)===A)return;const s=this._$AH,l=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==h&&(s===h||l);l&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const ee=T.litHtmlPolyfillSupport;ee?.($,w),(T.litHtmlVersions??=[]).push("3.3.1");const{action:te}=__STORYBOOK_MODULE_ACTIONS__;function L(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...U(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(K,{title:"TSWebUI/TSForm"}),`
`,n.jsx(e.h1,{id:"tsform",children:"TSForm"}),`
`,n.jsxs(e.p,{children:["Komponenta ",n.jsx(e.code,{children:"ts-form"})," je univerzální formulářový generátor založený na JSON konfiguraci. Podporuje složité layouty, záložky (tabs), validace a širokou škálu vstupních prvků."]}),`
`,n.jsx(e.h3,{id:"rychlý-příklad",children:"Rychlý Příklad"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<ts-form
  layout='{
    "rows": [
      [{"field": "name", "width": "1fr"}, {"field": "email", "width": "1fr"}],
      [{"field": "country", "width": "1fr"}]
    ]
  }'
  fields='{
    "name": {"type": "text", "label": "Jméno", "required": true},
    "email": {"type": "email", "label": "E-mail", "required": true},
    "country": {
        "type": "combobox", 
        "label": "Země", 
        "options": [{"value": "cz", "label": "Česko"}, {"value": "sk", "label": "Slovensko"}]
    }
  }'
  buttons='[
    {"action": "save", "label": "Uložit", "variant": "primary"}
  ]'
></ts-form>
`})}),`
`,n.jsx(e.h2,{id:"layout-konfigurace",children:"Layout Konfigurace"}),`
`,n.jsxs(e.p,{children:["Layout formuláře se definuje pomocí JSON objektu předaného do atributu ",n.jsx(e.code,{children:"layout"}),"."]}),`
`,n.jsx(e.h3,{id:"struktura",children:"Struktura"}),`
`,n.jsx(e.p,{children:"Layout může být definován dvěma způsoby:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Se záložkami (Tabs):"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "tabs": [
    {
      "label": "Název záložky",
      "rows": [ ... ]
    },
    ...
  ]
}
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Bez záložek (Jednoduchý):"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "rows": [ ... ]
}
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"řádky-a-sloupce-grid",children:"Řádky a Sloupce (Grid)"}),`
`,n.jsxs(e.p,{children:["Vlastnost ",n.jsx(e.code,{children:"rows"})," je pole polí, kde vnitřní pole reprezentuje řádek a jeho prvky jsou sloupce."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`"rows": [
  [ { "field": "firstName", "width": "1fr" }, { "field": "lastName", "width": "1fr" } ], // 2 sloupce
  [ { "field": "bio", "width": "100%" } ] // 1 sloupec přes celou šířku
]
`})}),`
`,n.jsx(e.h3,{id:"vlastnosti-buňky-layoutu",children:"Vlastnosti buňky layoutu"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"field"}),": (string) Název pole, který musí odpovídat klíči v definici ",n.jsx(e.code,{children:"fields"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"width"}),": (string) Šířka sloupce. Lze použít CSS Grid jednotky (např. ",n.jsx(e.code,{children:"1fr"}),", ",n.jsx(e.code,{children:"2fr"}),", ",n.jsx(e.code,{children:"150px"}),", ",n.jsx(e.code,{children:"auto"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"align"}),": (string) Horizontální zarovnání obsahu buňky (",n.jsx(e.code,{children:"'left'"}),", ",n.jsx(e.code,{children:"'center'"}),", ",n.jsx(e.code,{children:"'right'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": (string) Speciální typ buňky, pokud se nejedná o pole.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'empty'"}),": Prázdná buňka pro odsazení."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'separator'"}),": Oddělovač (viz níže)."]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h3,{id:"oddělovače-separators",children:"Oddělovače (Separators)"}),`
`,n.jsx(e.p,{children:"Lze vložit vizuální oddělovač sekcí."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`[ { "type": "separator", "label": "Osobní údaje" } ]
`})}),`
`,n.jsx(e.h2,{id:"konfigurace-polí-fields",children:"Konfigurace Polí (Fields)"}),`
`,n.jsxs(e.p,{children:["Definice polí se předává do atributu ",n.jsx(e.code,{children:"fields"})," jako JSON objekt, kde klíč je název pole."]}),`
`,n.jsx(e.h3,{id:"společné-parametry",children:"Společné parametry"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"label"}),": (string) Popisek pole."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": (string) Typ pole (viz níže)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"hidden"}),": (boolean) Skryté pole."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"disabled"}),": (boolean) Deaktivované pole."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"readonly"}),": (boolean) Pole pouze pro čtení."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"hint"}),": (string) Nápověda pod polem."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"width"}),": (string) Šířka samotného inputu (např. '100%')."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"autofocus"}),": (boolean) Automaticky zaměří pole po načtení formuláře."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"placeholder"}),": (string) Text zobrazený v prázdném poli (týká se textových polí, comboboxu, data atd.)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"enterAction"}),": (string) Akce při stisku Enter (např. ",n.jsx(e.code,{children:"'submit'"}),", ",n.jsx(e.code,{children:"'click:myButton'"}),", ",n.jsx(e.code,{children:"'focus:nextField'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"escapeAction"}),": (string) Akce při stisku Escape (např. ",n.jsx(e.code,{children:"'clear'"}),", ",n.jsx(e.code,{children:"'click:cancel'"}),")."]}),`
`]}),`
`,n.jsx(e.h3,{id:"typy-polí",children:"Typy polí"}),`
`,n.jsx(e.h4,{id:"textové-vstupy",children:"Textové vstupy"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"text"}),": Klasický textový input."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"password"}),": Skryté znaky."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"textarea"}),": Víceřádkový text. Parametr ",n.jsx(e.code,{children:"rows"})," (number)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"combobox"}),": Textový input s našeptávačem (datalist). Parametr ",n.jsx(e.code,{children:"options"}),".",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"allowCustom"})})," (boolean):",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"false"})," (default, Strict Mode): Povolí pouze hodnoty ze seznamu ",n.jsx(e.code,{children:"options"}),".",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Při opuštění pole (blur) se nevalidní hodnota ",n.jsx(e.strong,{children:"vrátí na předchozí validní hodnotu"})," (revert)."]}),`
`,n.jsxs(e.li,{children:["Klávesa ",n.jsx(e.strong,{children:"Escape"})," vrátí hodnotu na předchozí validní stav a zavře dropdown."]}),`
`,n.jsxs(e.li,{children:["Událost ",n.jsx(e.code,{children:"sl-change"})," se vyvolá pouze při výběru validní možnosti."]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"true"})," (Custom Mode): Povolí zadat libovolný text.",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Neznámá hodnota je akceptována jako nová hodnota."}),`
`,n.jsxs(e.li,{children:["Událost ",n.jsx(e.code,{children:"sl-change"})," se vyvolá při výběru možnosti nebo zadání vlastního textu (po blur/enter)."]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"allowEmpty"})})," (boolean):",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"true"})," (default): Hodnota může být prázdná (uživatel ji může smazat)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"false"}),": Pokud uživatel smaže hodnotu a opustí pole:",`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Pokud existovala předchozí validní hodnota, pole se na ni vrátí (revert)."}),`
`,n.jsx(e.li,{children:"Pokud neexistovala, pole se vyčistí (protože nelze vynutit hodnotu)."}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h4,{id:"číselné-vstupy",children:"Číselné vstupy"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"number"}),": Číslo. Parametry: ",n.jsx(e.code,{children:"min"}),", ",n.jsx(e.code,{children:"max"}),", ",n.jsx(e.code,{children:"step"}),"."]}),`
`]}),`
`,n.jsx(e.h4,{id:"datum-a-čas",children:"Datum a Čas"}),`
`,n.jsx(e.p,{children:"Používá knihovnu Flatpickr s českou lokalizací."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"date"}),": Výběr data."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"datetime"}),": Výběr data a času."]}),`
`]}),`
`,n.jsx(e.h4,{id:"výběry-selects-a-radios",children:"Výběry (Selects a Radios)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"select"}),": Jednoduchý výběr (dropdown)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"multiselect"}),": Výběr více hodnot."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"radio"}),": Skupina přepínačů (radio buttons)."]}),`
`,n.jsxs(e.li,{children:[n.jsxs(e.strong,{children:["Parametr ",n.jsx(e.code,{children:"options"})]}),":",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Pole objektů: ",n.jsx(e.code,{children:'[{ "value": "cz", "label": "Česko" }, ...]'})]}),`
`,n.jsxs(e.li,{children:["Nebo pole řetězců ve formátu ",n.jsx(e.code,{children:'"value/Label"'}),"."]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h4,{id:"relationship-picker-mn",children:"Relationship Picker (M:N)"}),`
`,n.jsx(e.p,{children:"Pokročilý výběr vazeb s vyhledáváním a čipy."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'relationship'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"targetEntity"}),": (string) Název entity (pro dialog)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"mode"}),": ",n.jsx(e.code,{children:"'single'"})," nebo ",n.jsx(e.code,{children:"'multiple'"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"displayFields"}),": (array) Pole zobrazovaná v tabulce výsledků."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"chipDisplayFields"}),": (array) Pole zobrazovaná na vybraných čipech."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"options"}),": (array) Data pro výběr (pole objektů)."]}),`
`]}),`
`,n.jsx(e.h4,{id:"přepínače-a-checkboxy",children:"Přepínače a Checkboxy"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"switch"}),": Přepínač (ON/OFF)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"checkbox"}),": Zaškrtávací políčko."]}),`
`]}),`
`,n.jsx(e.h4,{id:"slider",children:"Slider"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'slider'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"min"}),", ",n.jsx(e.strong,{children:"max"}),", ",n.jsx(e.strong,{children:"step"}),": Rozsah a krok."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"hideLabel"}),": (boolean) Skryje číselnou hodnotu/label nad sliderem."]}),`
`]}),`
`,n.jsx(e.h4,{id:"soubory-a-obrázky",children:"Soubory a Obrázky"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"file"}),": Nahrávání souborů."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"image"}),": Nahrávání obrázků (automaticky ",n.jsx(e.code,{children:'accept="image/*"'}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"multiple"}),": (boolean) Povolit více souborů."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"accept"}),": (string) MIME typy (např. ",n.jsx(e.code,{children:".pdf,.doc"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"innerLabel"}),': (string) Text zobrazený uvnitř drop zóny (např. "Klikněte pro nahrání"). Pokud není zadán, použije se ',n.jsx(e.code,{children:"label"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Download"}),": U nahraných souborů se automaticky zobrazuje ikona pro stažení obsahu."]}),`
`]}),`
`,n.jsx(e.h4,{id:"samostatná-tlačítka-v-gridu",children:"Samostatná Tlačítka (v gridu)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'button'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"label"}),": Text tlačítka."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"variant"}),": ",n.jsx(e.code,{children:"'primary'"}),", ",n.jsx(e.code,{children:"'default'"}),", ",n.jsx(e.code,{children:"'neutral'"}),", ",n.jsx(e.code,{children:"'danger'"}),", atd."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"action"}),": (string) Identifikátor akce pro event ",n.jsx(e.code,{children:"form-field-action"}),"."]}),`
`]}),`
`,n.jsx(e.h4,{id:"informační-boxy-infobox",children:"Informační boxy (Infobox)"}),`
`,n.jsxs(e.p,{children:["Zobrazí ",n.jsx(e.code,{children:"sl-alert"})," pro statické informace."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'infobox'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"variant"}),": ",n.jsx(e.code,{children:"'primary'"}),", ",n.jsx(e.code,{children:"'success'"}),", ",n.jsx(e.code,{children:"'neutral'"}),", ",n.jsx(e.code,{children:"'warning'"}),", ",n.jsx(e.code,{children:"'danger'"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"icon"}),": (string) Název ikony (Shoelace icon name)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"content"}),": (html string) Obsah boxu. Může obsahovat HTML."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"value"}),": (string) Alternativně lze obsah předat přes hodnotu pole."]}),`
`]}),`
`,n.jsx(e.h4,{id:"markdown-obsah",children:"Markdown Obsah"}),`
`,n.jsx(e.p,{children:"Zobrazí renderovaný markdown."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'markdown'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"content"}),": (string) Markdown řetězec."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"value"}),": (string) Alternativně lze obsah předat přes hodnotu pole."]}),`
`]}),`
`,n.jsx(e.h4,{id:"tabulka-embedded-table",children:"Tabulka (Embedded Table)"}),`
`,n.jsxs(e.p,{children:["Vloží plnohodnotnou ",n.jsx(e.code,{children:"ts-table"})," do formuláře."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'table'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"columns"}),": Definice sloupců (stejné jako u ",n.jsx(e.code,{children:"ts-table"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"data"}),": Data tabulky (nebo předaná přes ",n.jsx(e.code,{children:"value"})," formuláře)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Podporované flagy"}),": ",n.jsx(e.code,{children:"showCreateButton"}),", ",n.jsx(e.code,{children:"enableSorting"}),", ",n.jsx(e.code,{children:"enableFiltering"}),", ",n.jsx(e.code,{children:"enablePagination"}),", atd."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Akce"}),": ",n.jsx(e.code,{children:"singleItemActions"}),", ",n.jsx(e.code,{children:"multipleItemsActions"}),"."]}),`
`]}),`
`,n.jsx(e.h4,{id:"button-group",children:"Button Group"}),`
`,n.jsx(e.p,{children:"Skupina tlačítek chovající se jako radio buttony."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"}),": ",n.jsx(e.code,{children:"'button-group'"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"variant"}),":",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'default'"}),": Standardní tlačítka."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'process'"}),": Tlačítka ve tvaru šipek (procesní flow)."]}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"options"}),": Pole řetězců ",n.jsx(e.code,{children:'"value/enabled/variant/Label"'}),".",`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Příklad: ",n.jsx(e.code,{children:'["draft/true/neutral/Koncept", "published/true/success/Publikováno"]'})]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{id:"tlačítka-formuláře-buttons",children:"Tlačítka Formuláře (Buttons)"}),`
`,n.jsxs(e.p,{children:["Konfigurace akčních tlačítek v patičce formuláře (atribut ",n.jsx(e.code,{children:"buttons"}),")."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`[
  {
    "action": "submit",
    "label": "Uložit",
    "variant": "primary",
    "disabled": false
  },
  {
    "action": "cancel",
    "label": "Zrušit",
    "variant": "neutral",
    "position": "left",
    "hidden": false
  }
]
`})}),`
`,n.jsx(e.h3,{id:"parametry-tlačítka",children:"Parametry tlačítka"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"action"}),": (string) Identifikátor akce."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"label"}),": (string) Text tlačítka."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"variant"}),": (string) Vzhled tlačítka (",n.jsx(e.code,{children:"primary"}),", ",n.jsx(e.code,{children:"success"}),", ",n.jsx(e.code,{children:"neutral"}),", ",n.jsx(e.code,{children:"warning"}),", ",n.jsx(e.code,{children:"danger"}),", ",n.jsx(e.code,{children:"text"}),", ",n.jsx(e.code,{children:"default"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"position"}),": (string) Pozice tlačítka v patičce (",n.jsx(e.code,{children:"left"}),", ",n.jsx(e.code,{children:"center"}),", ",n.jsx(e.code,{children:"right"}),"). Výchozí je ",n.jsx(e.code,{children:"right"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"disabled"}),": (boolean) Pokud ",n.jsx(e.code,{children:"true"}),", tlačítko je neaktivní (šedé)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"hidden"}),": (boolean) Pokud ",n.jsx(e.code,{children:"true"}),", tlačítko není vidět."]}),`
`]}),`
`,n.jsx(e.h3,{id:"import-a-export-dat",children:"Import a Export Dat"}),`
`,n.jsx(e.p,{children:"Formulář podporuje vestavěné akce pro uložení a načtení dat ve formátu JSON (včetně souborů jako Base64)."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"export-data"})}),": Uloží kompletní stav formuláře do souboru ",n.jsx(e.code,{children:"form-data-YYYY-MM-DD.json"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:n.jsx(e.code,{children:"import-data"})}),": Otevře dialog pro výběr JSON souboru a načte data do formuláře."]}),`
`]}),`
`,n.jsx(e.p,{children:"Příklad použití:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`[
  { "action": "export-data", "label": "Exportovat", "variant": "primary" },
  { "action": "import-data", "label": "Importovat", "variant": "default" }
]
`})}),`
`,n.jsx(e.h3,{id:"potvrzení-akce-confirmation",children:"Potvrzení Akce (Confirmation)"}),`
`,n.jsxs(e.p,{children:["Tlačítka mohou vyžadovat potvrzení před provedením akce. To se konfiguruje objektem ",n.jsx(e.code,{children:"confirmation"}),"."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "action": "delete",
  "label": "Smazat",
  "variant": "danger",
  "confirmation": {
    "title": "Potvrdit akci",
    "text": "Opravdu smazat záznam?",
    "buttons": [
      { "action": "no", "label": "Ne", "variant": "default" },
      { "action": "yes", "label": "Ano", "variant": "danger", "confirm": true }
    ]
  }
}
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"confirmation.title"}),": (string) Nadpis dialogu."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"confirmation.text"}),": (string) Text dialogu."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"confirmation.buttons"}),": (array) Tlačítka v dialogu. Tlačítko s ",n.jsx(e.code,{children:'"confirm": true'})," provede původní akci."]}),`
`]}),`
`,n.jsx(e.h2,{id:"metody",children:"Metody"}),`
`,n.jsx(e.h3,{id:"showimportresultsfieldname-results",children:n.jsx(e.code,{children:"showImportResults(fieldName, results)"})}),`
`,n.jsx(e.p,{children:"Zobrazí dialog s výsledky importu nad konkrétním polem typu tabulka."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"fieldName"}),": (string) Název pole (klíč v ",n.jsx(e.code,{children:"fields"})," konfiguraci)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"results"}),": (object) Objekt s výsledky importu (obsahuje počty added, updated, skipped, rejected)."]}),`
`]}),`
`,n.jsx(e.h2,{id:"události-events",children:"Události (Events)"}),`
`,n.jsx(e.p,{children:"Komponenta vyhazuje následující CustomEvents:"}),`
`,n.jsx(e.h3,{id:"form-changed",children:n.jsx(e.code,{children:"form-changed"})}),`
`,n.jsx(e.p,{children:"Vyvolána při změně hodnoty jakéhokoliv pole."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.field"}),": (string) Název změněného pole."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.value"}),": (any) Nová hodnota."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.formData"}),": (object) Aktuální data celého formuláře."]}),`
`]}),`
`,n.jsx(e.h3,{id:"form-submit",children:n.jsx(e.code,{children:"form-submit"})}),`
`,n.jsxs(e.p,{children:["Vyvolána při kliknutí na tlačítko v patičce formuláře (definované v ",n.jsx(e.code,{children:"buttons"}),")."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.action"}),": (string) Akce tlačítka (např. ",n.jsx(e.code,{children:"'submit'"}),", ",n.jsx(e.code,{children:"'cancel'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.formData"}),": (object) Data formuláře při odeslání."]}),`
`]}),`
`,n.jsx(e.h3,{id:"form-field-action",children:n.jsx(e.code,{children:"form-field-action"})}),`
`,n.jsxs(e.p,{children:["Vyvolána při kliknutí na samostatné tlačítko uvnitř gridu (typ pole ",n.jsx(e.code,{children:"button"}),")."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.field"}),": (string) Název pole tlačítka."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.action"}),": (string) Akce definovaná v konfiguraci pole."]}),`
`]}),`
`,n.jsx(e.h3,{id:"form-table-action",children:n.jsx(e.code,{children:"form-table-action"})}),`
`,n.jsxs(e.p,{children:["Bublající událost z vnořené tabulky (typ pole ",n.jsx(e.code,{children:"table"}),")."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.field"}),": (string) Název pole tabulky."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.action"}),": (string) Typ akce (např. ",n.jsx(e.code,{children:"'row-clicked'"}),", ",n.jsx(e.code,{children:"'create-new-record'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"detail.originalDetail"}),": (object) Původní detail události z ",n.jsx(e.code,{children:"ts-table"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"ukázka",children:"Ukázka"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<ts-form
  layout='{
    "tabs": [
      {"label": "Základní informace", "rows": [
        [{"field": "name", "width": "1fr"}, {"field": "email", "width": "1fr"}],
        [{"field": "role", "width": "1fr"}, {"field": "active", "width": "auto"}],
        [{"field": "bio", "width": "100%"}]
      ]},
      {"label": "Přílohy", "rows": [
        [{"field": "avatar", "width": "1fr"}]
      ]}
    ]
  }'
  fields='{
    "name": {"type": "text", "label": "Jméno", "required": true},
    "email": {"type": "email", "label": "E-mail", "required": true},
    "role": {
        "type": "select", 
        "label": "Role", 
        "options": [{"value": "admin", "label": "Admin"}, {"value": "user", "label": "User"}]
    },
    "active": {"type": "switch", "label": "Aktivní účet"},
    "bio": {"type": "textarea", "label": "O mně", "rows": 3},
    "avatar": {"type": "image", "label": "Profilové foto"}
  }'
  errors='{
    "email": "Zadejte platný email"
  }'
  buttons='[
    {"action": "save", "label": "Uložit změny", "variant": "primary"},
    {"action": "cancel", "label": "Zrušit", "variant": "default", "position": "left"}
  ]'
></ts-form>
<script>
  const form = document.querySelector('ts-form');
  form.addEventListener('form-changed', (e) => console.log('Changed:', e.detail));
  form.addEventListener('form-submit', (e) => console.log('Submit:', e.detail));
  form.addEventListener('form-field-action', (e) => console.log('Action:', e.detail));
<\/script>
`})}),`
`,n.jsx(e.h2,{id:"validace-a-chyby",children:"Validace a Chyby"}),`
`,n.jsxs(e.p,{children:["Chyby validace se předávají do atributu ",n.jsx(e.code,{children:"errors"})," jako JSON objekt, kde klíčem je název pole a hodnotou chybová hláška."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "email": "Zadejte platný email",
  "password": "Heslo je příliš krátké"
}
`})}),`
`,n.jsx(e.p,{children:"Pokud pole obsahuje chybu:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:["Input zčervená (aplikuje se třída ",n.jsx(e.code,{children:".input-invalid"}),")."]}),`
`,n.jsx(e.li,{children:"Pod inputem se zobrazí chybová hláška."}),`
`]}),`
`,n.jsx(e.h2,{id:"ovládání-klávesnicí",children:"Ovládání Klávesnicí"}),`
`,n.jsx(e.p,{children:"Formulář podporuje pokročilé ovládání klávesnicí konfigurovatelné pro každé pole."}),`
`,n.jsxs(e.h3,{id:"konfigurovatelné-akce-enteraction-escapeaction",children:["Konfigurovatelné Akce (",n.jsx(e.code,{children:"enterAction"}),", ",n.jsx(e.code,{children:"escapeAction"}),")"]}),`
`,n.jsx(e.p,{children:"Akce lze definovat jako řetězce v následujících formátech:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'submit'"}),": Odešle formulář (klikne na tlačítko typu submit nebo primary)."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'click:BUTTON_ACTION'"}),": Klikne na tlačítko s danou ",n.jsx(e.code,{children:"action"})," (např. ",n.jsx(e.code,{children:"'click:save'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'focus:FIELD_NAME'"}),": Přesune focus na jiné pole (např. ",n.jsx(e.code,{children:"'focus:password'"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'clear'"}),": Vymaže hodnotu pole (pouze pro ",n.jsx(e.code,{children:"escapeAction"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"'next'"}),": (Experimentální) Přesune focus na další pole."]}),`
`]}),`
`,n.jsx(e.h3,{id:"příklad-konfigurace",children:"Příklad Konfigurace"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`"username": {
  "type": "text",
  "label": "Uživatel",
  "autofocus": true,
  "enterAction": "focus:password",
  "escapeAction": "click:cancel"
},
"password": {
  "type": "password",
  "label": "Heslo",
  "enterAction": "submit",
  "escapeAction": "click:cancel"
}
`})})]})}function re(t={}){const{wrapper:e}={...U(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(L,{...t})}):L(t)}export{re as default};
