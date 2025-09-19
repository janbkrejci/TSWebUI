import{j as e,M as r}from"./blocks-CUOeAvBM.js";import{useMDXComponents as i}from"./index-B5MMSrBv.js";import"./preload-helper-D9Z9MdNV.js";import"./iframe-DJCz6Ic6.js";function l(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"TSGrid"}),`
`,e.jsx(n.h1,{id:"tsgrid---prototyp",children:"TSGrid - prototyp"}),`
`,e.jsx(n.p,{children:"Javascript, CSS a HTML plus Shoelace z CDN."}),`
`,e.jsx(n.p,{children:"Žádný framework (React apod.), žádný bundler (Webpack)."}),`
`,e.jsx(n.p,{children:"Veškerý kód je vidět přímo ve stránce."}),`
`,e.jsx(n.h2,{id:"podporuje",children:"Podporuje:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"stránkování (zkuste napsat dole do inputu neexistující číslo stránky),"}),`
`,e.jsx(n.li,{children:"řazení podle jednoho sloupce (3 stavy - vzestupně, sestupně, neřadit),"}),`
`,e.jsx(n.li,{children:"schovávání a změnu pořadí sloupců,"}),`
`,e.jsx(n.li,{children:"řádkovou nabídku,"}),`
`,e.jsx(n.li,{children:"filtrování (inteligentní, viz dále)"}),`
`,e.jsx(n.li,{children:"formátování sloupců typu datum a číslo podle české lokalizace"}),`
`,e.jsx(n.li,{children:"výběr řádků a akční menu adaptivní pro jeden vybraný prvek i více vybraných prvků"}),`
`,e.jsx(n.li,{children:"export do Excelu a demo importu z Excelu (dopiš si svou logiku)"}),`
`,e.jsx(n.li,{children:"klikatelný každý řádek (např. pro přechod na detail)"}),`
`,e.jsx(n.li,{children:"dark/light mód"}),`
`]}),`
`,e.jsx(n.h2,{id:"filtrování",children:"Filtrování:"}),`
`,e.jsx(n.p,{children:"Pokud je vybrán (checkboxem) aspoň jeden řádek, lze filtrovat i podle stavu výběru řádků (tedy zobrazit jen vybrané, jen nevybrané)."}),`
`,e.jsx(n.p,{children:"Při focusu vstupního pole pro zadání filtru se vybere celý obsah vstupního pole pro rychlé přepsání celé hodnoty."}),`
`,e.jsx(n.p,{children:"Escape vymaže vstupní pole."}),`
`,e.jsx(n.p,{children:"Filtr pro číselné sloupce:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"ignoruje mezery, dovolí desetinnou čárku i tečku,"}),`
`,e.jsxs(n.li,{children:["umožňuje použít range operátor ",e.jsx(n.code,{children:".."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"..číslo"})," zobrazí vše menší nebo rovné číslu"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"číslo.."})," zobrazí vše větší nebo rovné číslu"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"číslo..číslo"})," zobrazí vše v uzavřeném intervalu mezi čísly včetně"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Filtr pro sloupce typu Datum"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"ignoruje mezery"}),`
`,e.jsx(n.li,{children:"umožňuje jako oddělovač dnů, měsíců a roků použít tečku, lomítko nebo pomlčku"}),`
`,e.jsxs(n.li,{children:[`lze zadat:
** `,e.jsx(n.code,{children:"rrrr"}),`
** `,e.jsx(n.code,{children:"mm.rrrr"}),`
** `,e.jsx(n.code,{children:"dd.mm.rrrr"}),`
** a použít operátor range jako u číselné`]}),`
`]}),`
`,e.jsx(n.p,{children:"Filtr pro textové sloupce"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"hvězdička jako zástupný znak pro libovolnou i prázdnou sekvenci znaků"}),`
`,e.jsx(n.li,{children:"dvě hvězdičky jako skutečná hvězdička v textu, pokud ji potřebujete hledat"}),`
`,e.jsx(n.li,{children:"tečka na začátku znamená hledej od začátku"}),`
`,e.jsx(n.li,{children:"hledá podřetězec, case insensitive včetně české diakritiky"}),`
`]}),`
`,e.jsx(n.h2,{id:"výběr-řádků",children:"Výběr řádků:"}),`
`,e.jsx(n.p,{children:`Individuálně nebo hromadně - v záhlaví tabulky je tri-state checkbox, který vybere vše, odvybere vše.
Respektuje při tom aktivní filtry.`}),`
`,e.jsx(n.h2,{id:"volba-a-řazení-zobrazených-sloupců",children:"Volba a řazení zobrazených sloupců:"}),`
`,e.jsx(n.p,{children:"Toto by mělo být intuitivní, stačí vědět, že to jde, přijdete na to, jak se to dělá."}),`
`,e.jsx(n.p,{children:`Jen poznámka - pokud si nastavíte filtr u některého sloupce a pak ho schováte,
nezoufejte, filtr lze vymazat v pravém horním seznamu fiditelných sloupců.`}),`
`,e.jsx(n.h1,{id:"licence",children:"Licence"}),`
`,e.jsx(n.p,{children:"UNLICENSED - dělejte si s tím co chcete, ale nic po mně nechtějte :-)"})]})}function a(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(l,{...o})}):l(o)}export{a as default};
