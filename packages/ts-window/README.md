# HTML Window Component (TSWindow)

Tento projekt implementuje plně funkční okenní systém pro webové aplikace pomocí **Web Components**. Nabízí okna ve stylu macOS, která lze posouvat, měnit jejich velikost, minimalizovat a maximalizovat. Komponenta je vysoce optimalizovaná pro výkon a nabízí bohaté API pro programové ovládání.

## Vlastnosti

- **Web Component**: Použití standardního HTML elementu `<ts-window>`.
- **Optimalizovaný výkon**: Plynulé posouvání a změna velikosti využívající `requestAnimationFrame` a přímé DOM manipulace.
- **Ovládání oken**:
  - **Posouvání**: Chytnutím za záhlaví okna.
  - **Změna velikosti**: Podpora změny velikosti ze všech 8 směrů (rohy i hrany). Dvojklik na pravý dolní roh přizpůsobí velikost obsahu.
  - **Dvojklik na záhlaví**: Maximalizuje nebo obnoví okno.
  - **Tlačítka**: Funkční tlačítka pro zavření, minimalizaci a maximalizaci (styl macOS).
- **Stavy okna**:
  - **Minimalizace**: Okno se zmenší na úzký pruh (zachovává pozici).
  - **Maximalizace**: Okno vyplní celou obrazovku.
- **API**: Metody pro programové ovládání (center, fitToContent, bringToFront, atd.).
- **Dynamický obsah**: Do okna lze vložit libovolný HTML obsah pomocí slotů.
- **Z-index management**: Aktivní okno se automaticky posouvá do popředí.

## Použití

Stačí vložit skript `index.js` do vaší stránky a použít element `<ts-window>`:

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <script src="./index.js"></script>
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
```

### Atributy

Komponenta sleduje následující atributy. Jejich změna se okamžitě projeví na okně.

- `label`: Titulek v záhlaví okna.
- `width`: Šířka okna v pixelech (např. "400").
- `height`: Výška okna v pixelech (např. "300").
- `top`: Pozice Y od horního okraje v pixelech.
- `left`: Pozice X od levého okraje v pixelech.

### JavaScript API (Metody)

Instance elementu `<ts-window>` vystavuje veřejné metody pro kompletní programové ovládání.

```javascript
const win = document.querySelector('ts-window');

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
```

## Spuštění

Jelikož se jedná o čisté HTML/JS/CSS řešení bez závislostí, stačí otevřít soubor `index.html` v libovolném moderním webovém prohlížeči.

## Struktura projektu

- `index.html`: Ukázka použití komponenty s ovládacím panelem pro testování API.
- `index.js`: Definice třídy `TSWindow` (logika okna, Shadow DOM).
- `styles.css`: Globální styly pro stránku.

## Technologie

- **HTML5**
- **CSS3** (Flexbox, CSS Variables, Transitions)
- **JavaScript** (ES6+, Custom Elements API, Shadow DOM, requestAnimationFrame)
