import{j as n,M as t,C as i,A as r}from"./blocks-drMzULvl.js";import{useMDXComponents as a}from"./index-zHTT5-1K.js";import{T as d,D as s,M as c,a as h}from"./TSWINDOW.stories-CmF8jJGX.js";import"./preload-helper-PPVm8Dsz.js";import"./iframe-CzFpelWl.js";function l(e){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{of:d}),`
`,n.jsx(o.h1,{id:"tswindow",children:"TSWindow"}),`
`,n.jsxs(o.p,{children:["Tento projekt implementuje plně funkční okenní systém pro webové aplikace pomocí ",n.jsx(o.strong,{children:"Web Components"}),". Nabízí okna ve stylu macOS, která lze posouvat, měnit jejich velikost, minimalizovat a maximalizovat. Komponenta je vysoce optimalizovaná pro výkon a nabízí bohaté API pro programové ovládání."]}),`
`,n.jsx(o.h2,{id:"vlastnosti",children:"Vlastnosti"}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Web Component"}),": Použití standardního HTML elementu ",n.jsx(o.code,{children:"<ts-window>"}),"."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Optimalizovaný výkon"}),": Plynulé posouvání a změna velikosti využívající ",n.jsx(o.code,{children:"requestAnimationFrame"})," a přímé DOM manipulace."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Ovládání oken"}),":",`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Posouvání"}),": Chytnutím za záhlaví okna."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Změna velikosti"}),": Podpora změny velikosti ze všech 8 směrů (rohy i hrany). Dvojklik na pravý dolní roh přizpůsobí velikost obsahu."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Dvojklik na záhlaví"}),": Maximalizuje nebo obnoví okno."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Tlačítka"}),": Funkční tlačítka pro zavření, minimalizaci a maximalizaci (styl macOS)."]}),`
`]}),`
`]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Stavy okna"}),":",`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Minimalizace"}),": Okno se zmenší na úzký pruh (zachovává pozici)."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Maximalizace"}),": Okno vyplní celou obrazovku."]}),`
`]}),`
`]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"API"}),": Metody pro programové ovládání (center, fitToContent, bringToFront, atd.)."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Dynamický obsah"}),": Do okna lze vložit libovolný HTML obsah pomocí slotů."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.strong,{children:"Z-index management"}),": Aktivní okno se automaticky posouvá do popředí."]}),`
`]}),`
`,n.jsx(o.h2,{id:"použití",children:"Použití"}),`
`,n.jsxs(o.p,{children:["Stačí vložit skript ",n.jsx(o.code,{children:"index.js"})," do vaší stránky a použít element ",n.jsx(o.code,{children:"<ts-window>"}),":"]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-html",children:`<!DOCTYPE html>
<html lang="cs">
<head>
    <script src="./index.js"><\/script>
    <link rel="stylesheet" href="./styles.css">
</head>
<body>

    <!-- Jednoduché okno -->
    <ts-window label="Moje Okno">
        <p>Zde je nějaký obsah okna.</p>
    </ts-window>

    <!-- Okno s nastavenou pozicí a velikostí -->
    <ts-window label="Aplikace" top="50" left="50" width="600" height="400">
        <div style="padding: 20px;">
            <h2>Nadpis</h2>
            <button>Klikni mě</button>
        </div>
    </ts-window>

</body>
</html>
`})}),`
`,n.jsx(o.h3,{id:"atributy",children:"Atributy"}),`
`,n.jsx(o.p,{children:"Komponenta sleduje následující atributy. Jejich změna se okamžitě projeví na okně."}),`
`,n.jsxs(o.ul,{children:[`
`,n.jsxs(o.li,{children:[n.jsx(o.code,{children:"label"}),": Titulek v záhlaví okna."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.code,{children:"width"}),': Šířka okna v pixelech (např. "400").']}),`
`,n.jsxs(o.li,{children:[n.jsx(o.code,{children:"height"}),': Výška okna v pixelech (např. "300").']}),`
`,n.jsxs(o.li,{children:[n.jsx(o.code,{children:"top"}),": Pozice Y od horního okraje v pixelech."]}),`
`,n.jsxs(o.li,{children:[n.jsx(o.code,{children:"left"}),": Pozice X od levého okraje v pixelech."]}),`
`]}),`
`,n.jsx(o.h3,{id:"javascript-api-metody",children:"JavaScript API (Metody)"}),`
`,n.jsxs(o.p,{children:["Instance elementu ",n.jsx(o.code,{children:"<ts-window>"})," vystavuje veřejné metody pro kompletní programové ovládání."]}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-javascript",children:`const win = document.querySelector('ts-window');

// Změna stavu okna
win.minimize();       // Minimalizuje okno (zachová pozici)
win.maximize();       // Maximalizuje na celou obrazovku
win.restore();        // Obnoví původní velikost a pozici
win.close();          // Úplně odstraní okno z DOM

// Práce s pozicí a velikostí
win.centerOnScreen(); // Vycentruje okno na střed obrazovky
win.fitToContent();   // Přizpůsobí velikost okna jeho obsahu (animovaně)
win.fitToContent(false); // Přizpůsobí velikost okamžitě (bez animace)

// Z-index (vrstvy)
win.bringToFront();   // Přesune okno do popředí (nejvyšší z-index)
win.sendToBack();     // Přesune okno do pozadí
`})}),`
`,n.jsx(o.h2,{id:"příklady",children:"Příklady"}),`
`,n.jsx(i,{of:s}),`
`,n.jsx(r,{of:s}),`
`,n.jsx(o.h3,{id:"minimalizované-okno",children:"Minimalizované okno"}),`
`,n.jsx(i,{of:c}),`
`,n.jsx(o.h3,{id:"více-oken",children:"Více oken"}),`
`,n.jsx(i,{of:h})]})}function k(e={}){const{wrapper:o}={...a(),...e.components};return o?n.jsx(o,{...e,children:n.jsx(l,{...e})}):l(e)}export{k as default};
