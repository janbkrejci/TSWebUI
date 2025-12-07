import{j as e,M as d}from"./blocks-CmAgLvIZ.js";import{useMDXComponents as r}from"./index-NoiZmwkq.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-Yq2S16XC.js";function t(l){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"TSWebUI/TSTable"}),`
`,e.jsx(n.h1,{id:"tstable",children:"TSTable"}),`
`,e.jsx(n.p,{children:"Kompletní client-side webový datagrid bez frameworku, pouze HTML, JS, CSS a Shoelace z CDN."}),`
`,e.jsxs(n.p,{children:["Je realizován jako web component. Stačí tedy naimportovat a do HTML vložit ",e.jsx(n.code,{children:"<ts-table></ts-table>"}),`,
samozřejmě musíte grid nakrmit daty a dát mu potřebné parametry.`]}),`
`,e.jsx(n.h2,{id:"funkce---přehled",children:"Funkce - přehled"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"stránkování, volba počtu položek na stránku"}),`
`,e.jsx(n.li,{children:"řazení podle sloupců (vzestupně/sestupně/bez řazení)"}),`
`,e.jsx(n.li,{children:"schovávání a změna pořadí sloupců"}),`
`,e.jsx(n.li,{children:"řádková nabídka (menu pro každý řádek)"}),`
`,e.jsx(n.li,{children:"filtrování podle sloupců (čísla, datum, text, výběr řádků)"}),`
`,e.jsx(n.li,{children:"formátování čísel a dat podle české lokalizace"}),`
`,e.jsx(n.li,{children:"výběr řádků (jednotlivě i hromadně, tri-state checkbox)"}),`
`,e.jsx(n.li,{children:"akční menu pro jeden i více vybraných řádků"}),`
`,e.jsx(n.li,{children:"export do Excelu, demo import z Excelu"}),`
`,e.jsx(n.li,{children:"klikatelné řádky (např. pro detail)"}),`
`,e.jsx(n.li,{children:"klikatelné vybrané sloupce (volitelně, např. pro akce nad buňkou)"}),`
`,e.jsx(n.li,{children:"dark/light mód"}),`
`,e.jsx(n.li,{children:"změna šířky sloupců"}),`
`]}),`
`,e.jsx(n.h2,{id:"parametry-props",children:"Parametry (props)"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parametr"}),e.jsx("th",{children:"Typ"}),e.jsx("th",{children:"Význam"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"show-create-button"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zobrazit tlačítko „Nový záznam“"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"show-import-button"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zobrazit tlačítko „Importovat“"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"show-export-button"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zobrazit tlačítko „Exportovat“"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"show-column-selector"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zobrazit volbu sloupců"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-sorting"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit řazení"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-filtering"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit filtrování"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"predefined-filters"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Předdefinované filtry (JSON objekt, nelze vymazat uživatelem)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-column-resizing"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit změnu šířky sloupců"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-column-reordering"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit změnu pořadí sloupců"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-selection"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit výběr řádků"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-row-menu"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit menu pro řádek"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-clickable-rows"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit klikání na řádky"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-clickable-columns"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit klikání na sloupce"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable-pagination"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit stránkování"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"single-item-actions"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Akce pro jeden vybraný řádek (formát: action/label, čárkou oddělené)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"multiple-items-actions"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Akce pro více vybraných řádků (formát: action/label, čárkou oddělené)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"visible-columns"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Viditelné sloupce (klíče, čárkou oddělené)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"unhideable-columns"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Sloupce, které nelze skrýt"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"unshowable-columns"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Sloupce, které nelze zobrazit"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"columns-required-for-import"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Povinné sloupce pro import"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"items-per-page"}),e.jsx("td",{children:"number"}),e.jsx("td",{children:"Počet položek na stránku"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"items-per-page-options"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Volby počtu položek na stránku"})]})]})]}),`
`,e.jsx(n.h3,{id:"konfigurace-menu-akcí",children:"Konfigurace menu akcí"}),`
`,e.jsxs(n.p,{children:["Parametry ",e.jsx(n.code,{children:"single-item-actions"})," a ",e.jsx(n.code,{children:"multiple-items-actions"})," používají formát ",e.jsx(n.code,{children:"action/label"}),", kde:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"action"})," (před lomítkem) - text akce, který se pošle v eventu ",e.jsx(n.code,{children:"selection-action-activated"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"label"})," (za lomítkem) - zobrazovaný text v menu"]}),`
`]}),`
`,e.jsx(n.p,{children:"Příklady:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"edit/Upravit"}),' - akce "edit" se zobrazí jako "Upravit"']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"delete/Smazat"}),' - akce "delete" se zobrazí jako "Smazat"']}),`
`]}),`
`,e.jsx(n.h3,{id:"předdefinované-filtry",children:"Předdefinované filtry"}),`
`,e.jsxs(n.p,{children:["Parametr ",e.jsx(n.code,{children:"predefined-filters"})," umožňuje nastavit trvalé filtry, které se aplikují na data při načtení a ",e.jsx(n.strong,{children:"nelze je vymazat uživatelem"}),". Hodnota je JSON řetězec s objekty filtrů podle klíčů sloupců."]}),`
`,e.jsx(n.p,{children:"Příklady:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'{"approved": "true"}'})," - zobrazí pouze schválené záznamy"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'{"status": "active", "category": "premium"}'})," - kombinace filtrů"]}),`
`]}),`
`,e.jsx(n.h3,{id:"příklad",children:"Příklad"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-HTML",children:`<ts-table
    id="table"
    show-create-button="false"
    show-import-button="false"
    show-export-button="false"
    show-column-selector="true"
    enable-sorting="true"
    enable-filtering="false"
    predefined-filters='{"approved": "true"}'
    enable-column-resizing="true"
    enable-column-reordering="false"
    enable-selection="false"
    enable-row-menu="false"
    enable-clickable-rows="false"
    enable-clickable-columns="true"
    enable-pagination="false"
    single-item-actions="edit/Upravit,duplicate/Duplikovat,delete/Smazat,view_details/Zobrazit detaily,export/Exportovat řádek"
    multiple-items-actions="delete/Smazat vybrané,export/Exportovat vybrané"
    visible-columns="name,email,turnover,contractDate,approved"
    unhideable-columns="name,email"
    unshowable-columns="id"
    columns-required-for-import="id,name,email"
    items-per-page="5"
    items-per-page-options="3,5,10,20,50,-1">
</ts-table>
`})}),`
`,e.jsx(n.h2,{id:"externí-události-events",children:"Externí události (events)"}),`
`,e.jsxs(n.p,{children:["Pouze eventy emitované přímo z ",e.jsx(n.code,{children:"<ts-table>"})," (bublají z vnitřních komponent):"]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Event"}),e.jsx("th",{children:"Detail (event.detail)"}),e.jsx("th",{children:"Popis"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"create-new-record"}),e.jsx("td",{}),e.jsx("td",{children:"Kliknutí na „Nový záznam“"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"selection-action-activated"}),e.jsx("td",{children:" action, rows"}),e.jsx("td",{children:"Aktivace akce pro vybrané řádky"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"row-clicked"}),e.jsx("td",{children:" row, columnKey"}),e.jsx("td",{children:"Kliknutí na řádek/sloupec"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"do-import"}),e.jsx("td",{children:" data"}),e.jsx("td",{children:"Import dat z Excelu"})]})]})]}),`
`,e.jsxs(n.p,{children:["Pokud je povoleno ",e.jsx("code",{children:"enable-clickable-columns"})," a sloupec má v ",e.jsx("code",{children:"columnDefinitions"})," nastaveno ",e.jsx("code",{children:"isClickable: true"}),", event ",e.jsx("code",{children:"row-clicked"})," obsahuje i klíč sloupce (",e.jsx("code",{children:"columnKey"}),")."]}),`
`,e.jsx(n.h2,{id:"struktura-columndefinition",children:"Struktura columnDefinition"}),`
`,e.jsx(n.p,{children:"Každý sloupec je definován objektem s následujícími atributy:"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atribut"}),e.jsx("th",{children:"Typ"}),e.jsx("th",{children:"Význam"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"key"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Unikátní klíč sloupce (povinný)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"title"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Zobrazovaný název sloupce"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"type"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:'Typ dat: "text", "number", "date", "boolean"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"sortable"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit řazení podle sloupce"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"sortDirection"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:'Aktuální směr řazení: "asc", "desc", "none"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"filterable"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Povolit filtrování"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"filterPlaceholder"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:"Placeholder pro filtr"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"visible"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zda je sloupec viditelný"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"align"}),e.jsx("td",{children:"string"}),e.jsx("td",{children:'Zarovnání: "left", "center", "right"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"order"}),e.jsx("td",{children:"number"}),e.jsx("td",{children:"Pořadí sloupce"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"isClickable"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zda je sloupec klikatelný (pro eventy)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"canBeCopied"}),e.jsx("td",{children:"boolean"}),e.jsx("td",{children:"Zda lze hodnotu kopírovat"})]})]})]}),`
`,e.jsx(n.p,{children:"Příklad:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`{
  key: "email",
  title: "E-mail",
  type: "text",
  sortable: false,
  sortDirection: "none",
  filterable: true,
  filterPlaceholder: "Filtr e-mailu",
  visible: false,
  align: "left",
  order: 3,
  canBeCopied: true,
  isClickable: true
}
`})})]})}function a(l={}){const{wrapper:n}={...r(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(t,{...l})}):t(l)}export{a as default};
