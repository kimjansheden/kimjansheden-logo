import { CheckBottomPositionOptions } from "@/types";

/**
 * Utility function to determine if the logo is positioned at the bottom of the screen.
 *
 * This function analyzes class names to detect bottom positioning with a configurable tolerance.
 * It supports both standard and responsive Tailwind utility classes.
 *
 * The function detects:
 * - Standard classes: `bottom-0`, `bottom-4`, etc.
 * - Responsive classes: `sm:bottom-4`, `md:bottom-2`, `lg:bottom-0`, etc.
 *
 * @example
 * // Returns true for classes within tolerance
 * checkBottomPosition({classNames: ['bottom-4', 'right-0']}) // true (within default tolerance of 8)
 * checkBottomPosition({classNames: ['sm:bottom-8']}) // true (responsive variant within tolerance)
 *
 * // Returns false for classes beyond tolerance or non-bottom positions
 * checkBottomPosition({classNames: ['bottom-10']}) // false (beyond default tolerance)
 * checkBottomPosition({classNames: ['top-0']}) // false (not a bottom position)
 *
 * @param options - Options object
 * @param options.classNames - Array of CSS class names to check
 * @param options.bottomPositionTolerance - (Optional) Maximum bottom-N value that counts as "bottom positioned". Default is 8.
 * @returns Boolean indicating if the logo is positioned at the bottom
 */
export const checkBottomPosition = ({
  classNames,
  bottomPositionTolerance = 8,
}: CheckBottomPositionOptions) => {
  // We'll use a single approach that works for all numeric values
  return classNames.some((cls) => {
    // Extract numeric value for bottom-X classes from any responsive variant
    // This will handle single-digit, double-digit, and any numeric values
    // Match both regular (bottom-4) and responsive variants (sm:bottom-4)
    const match = cls.match(/^(sm:|md:|lg:|xl:|2xl:)?bottom-(\d+)$/);
    if (match) {
      // The numeric value is in the second capture group
      const value = parseInt(match[2], 10);
      if (process.env.NODE_ENV === "development") {
        console.log(`Matched ${cls} with value ${value}`);
      }
      return value <= bottomPositionTolerance;
    }

    return false;
  });
};
