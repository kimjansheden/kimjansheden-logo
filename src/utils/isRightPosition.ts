/**
 * Utility function to check if className contains right positioning classes
 * Handles responsive variants (sm:, md:, lg:, xl:, 2xl:) and multi-digit values
 * Also considers margin effects for fixed/absolute positioned elements with explicit right positioning
 *
 * @param className - The className string to check
 * @param tolerance - Maximum distance from right edge to consider as "right positioned" (default: 5)
 * @returns boolean indicating if the element is positioned at the right edge
 */
export const checkRightPosition = (
  className: string,
  tolerance: number = 5
): boolean => {
  if (!className) return false;

  const classes = className.split(/\s+/);

  // Pattern to match right positioning classes with responsive variants and multi-digit values
  // Examples: "right-0", "sm:right-2", "md:right-10", "lg:right-100"
  const rightPattern = /^(sm:|md:|lg:|xl:|2xl:)?right-(\d+)$/;

  // Check for explicit right positioning classes
  const hasExplicitRightPosition = classes.some((cls) => {
    const match = cls.match(rightPattern);
    if (!match) return false;

    const value = parseInt(match[2], 10);
    // Consider it "right positioned" if within tolerance distance from right edge
    return value <= tolerance;
  });

  if (hasExplicitRightPosition) {
    return true;
  }

  // For right positioning, we only consider explicit right-X classes
  // because margin alone doesn't position an element at the right edge
  // (elements naturally flow to the left unless explicitly positioned right)
  return false;
};
