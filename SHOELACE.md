# Shoelace Komponenty použité v TS-Table

Tento dokument obsahuje seznam všech Shoelace komponent použitých v projektu TS-Table a souvisejících souborech.

## Přehled komponent

### 1. **sl-button**
- **Použití**: Primární tlačítka pro akce
- **Soubory**: 
  - `ts-export-button.js` - Export dialog
  - `ts-import-button.js` - Import dialog
  - `ts-table-pager.js` - Navigační tlačítka stránkování
  - `ts-datatable.js` - Filtrovací dropdown
  - `ts-column-selector.js` - Výběr sloupců
  - `ts-selection-menu.js` - Menu pro výběr
  - `ts-create-record-button.js` - Tlačítko pro vytvoření záznamu
- **Vlastnosti**: `variant`, `size`, `circle`, `caret`, `slot="trigger"`

### 2. **sl-icon**
- **Použití**: Ikony pro UI
- **Soubory**: Všechny komponenty
- **Ikony**:
  - `download` - Export
  - `upload` - Import
  - `exclamation-octagon` - Chybová zpráva
  - `chevron-down` - Dropdown indikátor
  - `chevron-left`, `chevron-right` - Navigace stránkování
  - `chevron-bar-left`, `chevron-bar-right` - První/poslední stránka
  - `funnel` - Filtr/selection view
  - `arrow-left`, `arrow-right` - Přesouvání sloupců
  - `three-dots-vertical` - Menu
  - `gear` - Nastavení
  - `plus-lg` - Přidat záznam

### 3. **sl-icon-button**
- **Použití**: Kompaktní tlačítka pouze s ikonou
- **Soubory**: 
  - `ts-datatable.js` - Přesouvání sloupců, selection view toggle
- **Vlastnosti**: `name`, `size="small"`, `disabled`, `title`

### 4. **sl-tooltip**
- **Použití**: Nápověda při najetí myší
- **Soubory**:
  - `ts-export-button.js` - "Exportovat do Excelu"
  - `ts-import-button.js` - "Importovat z Excelu"
  - `ts-datatable.js` - Selection view tooltip
  - `ts-column-selector.js` - "Výběr sloupců"
  - `ts-create-record-button.js` - "Nový záznam"
- **Vlastnosti**: `content`, `hoist`

### 5. **sl-dialog**
- **Použití**: Modální dialogy
- **Soubory**:
  - `ts-export-button.js` - Export dialog
  - `ts-import-button.js` - Import error dialog, Import summary dialog
- **Vlastnosti**: `label`, `hidden`
- **Slots**: `footer`
- **Parts**: `title`, `body`, `panel`, `footer`

### 6. **sl-dropdown**
- **Použití**: Rozbalovací menu
- **Soubory**:
  - `ts-table-pager.js` - Výběr počtu položek na stránku
  - `ts-datatable.js` - Filtry, řádková menu
  - `ts-column-selector.js` - Výběr sloupců
  - `ts-selection-menu.js` - Menu pro vybrané položky
- **Vlastnosti**: `hoist`, `placement`
- **Slots**: `trigger`

### 7. **sl-menu**
- **Použití**: Seznam položek v dropdown
- **Soubory**: 
  - `ts-table-pager.js` - Počet položek na stránku
  - `ts-datatable.js` - Filtry, akce řádků
  - `ts-column-selector.js` - Seznam sloupců
  - `ts-selection-menu.js` - Seznam akcí
- **Vlastnosti**: `class`

### 8. **sl-menu-item**
- **Použití**: Jednotlivé položky menu
- **Soubory**:
  - `ts-table-pager.js` - Hodnoty stránkování (5, 10, 20, 50, 100)
  - `ts-datatable.js` - Filtrovací hodnoty, akce
- **Vlastnosti**: `data-value`, `data-action`

### 9. **sl-checkbox**
- **Použití**: Výběr řádků
- **Soubory**:
  - `ts-datatable.js` - Výběr všech řádků (header), výběr jednotlivých řádků
- **Vlastnosti**: `id`, `class="row-select"`

### 10. **sl-input**
- **Použití**: Textová pole
- **Soubory**:
  - `ts-table-pager.js` - Číslo stránky
  - `ts-datatable.js` - Filtrovací pole pro sloupce
- **Vlastnosti**: `size="small"`, `placeholder`, `autocomplete="off"`, `data-column-key`

### 11. **sl-button-group**
- **Použití**: Seskupení tlačítek
- **Soubory**:
  - `ts-table-pager.js` - Navigační tlačítka stránkování
- **Popis**: Seskupuje tlačítka pro navigaci (první, předchozí, další, poslední stránka)

### 12. **sl-switch**
- **Použití**: Přepínač pro boolean hodnoty
- **Soubory**:
  - `ts-datatable.js` - Zobrazení boolean hodnot (schváleno/neschváleno)
- **Vlastnosti**: `checked`, `disabled`

### 13. **sl-format-number**
- **Použití**: Formátování čísel
- **Soubory**:
  - `ts-datatable.js` - Formátování číselných hodnot (např. obrat)
- **Vlastnosti**: `value`, `type="decimal"`, `minimum-fraction-digits`, `maximum-fraction-digits`

### 14. **sl-format-date**
- **Použití**: Formátování data
- **Soubory**:
  - `ts-datatable.js` - Formátování datumových hodnot
- **Vlastnosti**: `date`

### 15. **sl-copy-button**
- **Použití**: Kopírování do schránky
- **Soubory**:
  - `ts-datatable.js` - Kopírování hodnot buněk
- **Vlastnosti**: `value`, `copy-label`, `success-label`, `error-label`

### 16. **sl-radio-group**
- **Použití**: Skupina radio buttonů
- **Soubory**:
  - `ts-export-button.js` - Výběr sloupců pro export
- **Vlastnosti**: `id`
- **Parts**: `form-control`

### 17. **sl-radio**
- **Použití**: Jednotlivé radio buttony
- **Soubory**:
  - `ts-export-button.js` - Volby exportu sloupců
- **Vlastnosti**: `value`, `checked`

### 18. **sl-alert**
- **Použití**: Upozornění a chybové zprávy
- **Soubory**:
  - `ts-import-button.js` - Chybová zpráva při importu
- **Vlastnosti**: `open`, `variant="danger"`
- **Slots**: `icon`

## Shoelace Design Tokens

Projekt také využívá Shoelace design tokeny pro konzistentní styling:

### Barvy
- `--sl-color-neutral-50`, `--sl-color-neutral-200`, `--sl-color-neutral-700`
- `--sl-color-primary-600`

### Typografie
- `--sl-font-sans`
- `--sl-font-size-small`
- `--sl-font-weight-light`, `--sl-font-weight-semibold`

### Layout
- `--sl-border-radius-medium`

## Závislosti

Pro správnou funkčnost je nutné mít nainstalovanou knihovnu **Shoelace** (https://shoelace.style/).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.x/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.x/dist/shoelace-autoloader.js"></script>
```

## Celkový počet komponent

**18 různých Shoelace komponent** je použito v projektu TS-Table.

---

*Poslední aktualizace: 18. října 2025*
