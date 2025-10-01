# Kim Jansheden Logo

## Installation

```shell
npm install kimjansheden-logo
```

### Requirements

This component uses Tailwind CSS classes. Your project should already have Tailwind CSS installed and configured.

#### Tailwind source configuration (v4+)

Tailwind CSS v4 ignores `node_modules` when scanning for classes. To make sure the tooltip utilities (`bottom-full`, `top-full`, `left-0`, `right-0`, and friends) are generated, register the package explicitly in the stylesheet where you import Tailwind:

```css
/* Register Tailwind at the top of your CSS file */
@import "tailwindcss";
/* Scan the published bundle for utility classes (adjust the relative path to match your project) */
@source "../node_modules/kimjansheden-logo/dist";
```

If you only need a handful of utilities, you can safelist them inline instead of scanning the whole package:

```css
/* Register Tailwind */
@import "tailwindcss";
/* Safelist the tooltip helpers so they are always available */
@source inline("{bottom-full,top-full,mb-2,mt-2,left-0,right-0,left-1/2,-translate-x-1/2}");
```

Remember to restart your dev server after changing the stylesheet so Tailwind recompiles with the updated sources.

#### Tailwind 3.x projects

If you are still on Tailwind 3, add the package path to the `content` array (or safelist the individual utilities) in `tailwind.config.{js,ts}` instead. The component ships the same classes, so no other changes are required.

#### VS Code "Unknown at rule @source"

If the stock CSS language service in VS Code does not yet recognize Tailwind's `@source` directive, you might see a lint warning. Until the Tailwind CSS extension ships full v4 support, you can teach VS Code about the directive by adding custom CSS data in your application:

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
```

Then reference the file from your workspace settings:

```jsonc
// .vscode/settings.json
{
  "css.customData": [".vscode/tailwindcss-v4.custom-data.json"]
}
```

Restart VS Code afterwards and the warning disappears. Alternatively, install the Tailwind CSS IntelliSense extension preview build once it becomes available, which will include native support for the new directives.

## Usage

### Import the component

```tsx
import KimJanshedenLogo from "kimjansheden-logo";
```

### Use the component

```tsx
// Use without className – uses default sizes and positioning
<KimJanshedenLogo />

// Use with custom size (uses relative positioning)
<KimJanshedenLogo className="h-6 w-6" />

// Use with custom positioning (uses default size)
<KimJanshedenLogo className="fixed bottom-0" />

// Use with responsive size
<KimJanshedenLogo className="h-4 w-4 md:h-8 md:w-8" />

// Use with fixed position to bottom right
<KimJanshedenLogo className="fixed bottom-4 right-4 h-12 w-12" />

// Use with absolute position to top left
<KimJanshedenLogo className="absolute top-0 left-0 h-8 w-8" />

// Use with relative positioning and offset
<KimJanshedenLogo className="relative top-2 left-4 h-10 w-10" />
```
