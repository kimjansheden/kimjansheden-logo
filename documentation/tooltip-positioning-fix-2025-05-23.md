# Tooltip Positioning Fix - Lösning av viewport-problem

> **Status (oktober 2025):** Den här anteckningen dokumenterar den ursprungliga komponentfixen från 23 maj 2025. Det senaste problemet (Tailwind 4 som inte genererade tooltip-klasser) löses i `tooltip-positioning-fix-2025-10-01.md`.

## Problemet

När `KimJanshedenLogo`-komponenten användes med klassen `"fixed bottom-0 z-10 m-2"`, visades tooltip:en för långt till vänster och gick utanför viewport-gränserna. Detta skapade en dålig användarupplevelse där tooltip:en inte var synlig eller läsbar.

### Ursprungliga symptom

- Tooltip:en centrerades alltid med `left-1/2 -translate-x-1/2`
- Ingen hänsyn togs till logotypens faktiska position på skärmen
- `m-2` klassen placerade logotypen nära vänsterkanten, men tooltip-logiken upptäckte inte detta

## Rotorsaken

Den ursprungliga positioneringslogiken kontrollerade endast explicita `left-X` och `right-X` klasser för att avgöra horizontal positionering. Men när en logotyp använder:

```tsx
<KimJanshedenLogo className="fixed bottom-0 z-10 m-2" />
```

Så innehåller klassnamnet:

- `fixed` - positioneringstyp
- `bottom-0` - placerar vid botten
- `z-10` - z-index för lagerordning  
- `m-2` - margin som **effektivt** placerar elementet nära vänsterkanten

Problemet var att `m-2` klassen inte tolkades som en "vänster-positionering" av tooltip-logiken.

## Lösningen

Vi implementerade en förbättrad positioneringsdetektering som tar hänsyn till margin-effekter för `fixed` och `absolute` positionerade element.

### 1. Förbättring av `checkLeftPosition`

```typescript
// Ny logik som detekterar margin-baserad vänster-positionering
const hasFixedOrAbsolute = classes.includes('fixed') || classes.includes('absolute');
const hasNoExplicitHorizontal = !classes.some(cls => cls.match(/^(sm:|md:|lg:|xl:|2xl:)?(left-|right-)/));

if (hasFixedOrAbsolute && hasNoExplicitHorizontal) {
  // Kontrollera margin-klasser som positionerar nära vänsterkanten
  const marginPattern = /^(sm:|md:|lg:|xl:|2xl:)?(m-|mx-|ml-)(\d+)$/;
  
  return classes.some(cls => {
    const match = cls.match(marginPattern);
    if (!match) return false;
    
    const value = parseInt(match[3], 10);
    return value <= tolerance; // Inom toleransgränsen = vänster-positionerad
  });
}
```

### 2. Förstående av CSS-beteende

När ett element har `fixed` positionering utan explicita `left` eller `right` värden:

- Elementet följer naturligt flöde och placeras till vänster
- `m-2` ger 0.5rem (8px) margin på alla sidor
- Detta placerar logotypen effektivt 8px från vänsterkanten
- Tooltip:en bör därför vänster-justeras för att förhindra viewport-overflow

### 3. Intelligent tooltip-positionering

```typescript
// Vertikal positionering baserat på bottom-detection
const tooltipVerticalClasses = isBottomPositioned
  ? "bottom-full mb-2"  // Ovanför när vid botten
  : "top-full mt-2";    // Under annars

// Horizontal positionering baserat på förbättrad edge-detection  
let tooltipHorizontalClasses = "left-1/2 -translate-x-1/2"; // Standard: centrerad

if (isLeftPositioned) {
  tooltipHorizontalClasses = "left-0";        // Vänster-justerad
} else if (isRightPositioned) {
  tooltipHorizontalClasses = "right-0";       // Höger-justerad
}
```

## Testning

Vi lade till specifika testfall för att säkerställa att lösningen fungerar:

```typescript
it("positions tooltip left-aligned when logo has margin that places it at left edge", () => {
  render(<KimJanshedenLogo className="fixed bottom-0 z-10 m-2" />);
  const { tooltip } = getElements();

  expect(tooltip).toHaveClass("left-0");
  expect(tooltip).not.toHaveClass("left-1/2");
  expect(tooltip).not.toHaveClass("-translate-x-1/2");
});
```

## Resultat

✅ **Före fix:** Tooltip centrerad (`left-1/2 -translate-x-1/2`) → går utanför viewport  
✅ **Efter fix:** Tooltip vänster-justerad (`left-0`) → stannar inom viewport

### Funktionalitet som bevarats

- Vertikal positionering fungerar korrekt (ovan vid bottom, under annars)
- Responsiva klasser stöds (`sm:`, `md:`, etc.)
- Explicita `left-X`/`right-X` klasser fungerar som tidigare
- Tolerance-systemet för edge-detection bevaras

### Nya funktioner

- Automatisk detektering av margin-baserad vänster-positionering
- Intelligent viewport-medvetenhet för `fixed`/`absolute` element
- Förbättrad användarupplevelse för vanliga användningsfall

## Teknisk implementering

### Stödda margin-klasser

- `m-X` - margin på alla sidor
- `mx-X` - horizontal margin (vänster + höger)
- `ml-X` - endast vänster margin
- Responsiva varianter: `sm:m-2`, `md:mx-4`, etc.

### Toleransinställningar

- Standard tolerance: 8 (motsvarar `m-2` i Tailwind)
- Konfigurerbar per positioning-utility
- Tailwind spacing: `1 = 0.25rem`, `2 = 0.5rem`, etc.

Denna fix löser det ursprungliga problemet medan den behåller bakåtkompatibilitet och lägger till intelligent viewport-medvetenhet för framtida användningsfall.
