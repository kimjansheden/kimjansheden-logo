# Kim Jansheden Logo

## Installation

```shell
npm install kimjansheden-logo
```

### Requirements

This component uses Tailwind CSS classes. Your project should already have Tailwind CSS installed and configured.

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
