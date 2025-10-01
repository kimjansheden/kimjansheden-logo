# Tooltip Positioning Fix – 2025-10-01

## Bakgrund

- **Komponent:** `KimJanshedenLogo`
- **Konsumerande app:** `tony`
- **Symptom:** Tooltip-texten visades snett nedåt höger – den gled utanför vyn när logotypen låg fixerad nere till vänster (`className="fixed bottom-0 z-10 m-2 h-6 w-6"`).
- **Tidigare förväntning:** Tooltipen skulle dyka upp strax ovanför och till höger om logotypen, anpassat efter positionen.

![Bild som visar när det blev fel](./attachments/wrong.png)

## Felsökningslogg

| Tidpunkt | Aktivitet | Resultat |
| --- | --- | --- |
| 2025-10-01 07:20 | Reproducerade buggen i konsumtionsprojektet. | Tooltip lämnade viewport. |
| 2025-10-01 07:30 | Verifierade komponenten i `kimjansheden-logo` källkod och dist. | Tooltip-positioneringslogiken såg korrekt ut – komponenten fungerade. |
| 2025-10-01 07:45 | Kontroll av konsolutskrifter (`checkBottomPosition`, `checkLeftPosition`). | Visade korrekt detektion – inget fel i komponentlogik. |
| 2025-10-01 08:00 | Inspekterade DOM och computed styles i appen. | Tooltip-klasserna (`bottom-full`, `mb-2`, etc.) saknade CSS-regler → Tailwind hade purgat dem. |
| 2025-10-01 08:10 | Misstänkte Tailwind-konfiguration (v4). | Bekräftade att `node_modules` ignoreras som standard. |
| 2025-10-01 08:20 | Studerade dokumentationen för "Detecting classes in source files". | Lärde att `@source` måste registrera externa paket. |
| 2025-10-01 08:35 | Laddade om CSS med `@import "tailwindcss";` och `@source "../node_modules/kimjansheden-logo/dist";`. | Tailwind genererade åter tooltip-klasserna. |
| 2025-10-01 08:40 | Startade om dev-servern. | Tooltipen hoppade till rätt position. |
| 2025-10-01 08:45 | Fixade VS Code-varningen `unknownAtRules @source`. | Tillförde `.vscode/tailwindcss-v4.custom-data.json` + `css.customData`. |
| 2025-10-01 08:55 | Uppdaterade README och dokumentation. | Tailwind 4- och VS Code-instruktioner dokumenterade. |

## Rotorsak

Tailwind CSS v4 detekterar inte klasser i `node_modules` om de inte registreras via `@source`. Tooltip-klasserna (`bottom-full`, `mb-2`, `left-1/2`, `-translate-x-1/2`, etc.) försvann därför ur den genererade CSS:en i konsumtionsprojektet, vilket gjorde att tooltipen föll tillbaka på sin standardposition utan offset och hamnade utanför skärmen.

## Lösning

1. Registrera paketet i Tailwind-stylesheeten.

   ```css
   @import "tailwindcss";
   @source "../node_modules/kimjansheden-logo/dist";
 
   _Justera sökvägen efter var din egen CSS-fil ligger._

2. Alternativ: Safelista klasser om du vill undvika att läsa in hela paketet.

   ```css
   @import "tailwindcss";
   @source inline("{bottom-full,top-full,mb-2,mt-2,left-0,right-0,left-1/2,-translate-x-1/2}");
   ```

3. Starta om utvecklingsservern så Tailwind bygger om CSS:en.

4. För att bli av med VS Code-varningen `Unknown at rule @source`, lägg till följande fil:

   ```jsonc
   // .vscode/tailwindcss-v4.custom-data.json
   {
      "atDirectives": [
         {
            "name": "@source",
            "description": "Tailwind CSS v4 source registration directive"
         }
      ]
   }
     ]
   }
   ```

   och peka ut den i `.vscode/settings.json`:

   ```jsonc
   {
     "css.customData": [".vscode/tailwindcss-v4.custom-data.json"]
   }
   ```

## Verifiering

- Tooltipen återgår till att placeras ovanför logotypen (se skärmdump i ärendet).
- Vitest-testfallen kring tooltip-positionering passerar (ingen ändring behövdes).
- README beskriver nu Tailwind 4-flödet samt fallback för Tailwind 3.

![Bild som visar när det blev rätt](./attachments/correct.png)

## Lärdomar

- När Tailwind uppgraderar sin scanningmodell måste externa paket registreras explicit, annars försvinner utilities.
- Håll dokumentationen synkad med publicerade paket så att konsumenter vet hur de ska konfigurera sin build-kedja.
- Editor-stöd kan behöva uppdateras manuellt (custom data) tills officiella plugins hinner ifatt.
- Editor-stöd kan behöva uppdateras manuellt (custom data) tills officiella plugins hinner ifatt.
