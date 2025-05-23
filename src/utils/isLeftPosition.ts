/**
 * Utility function to check if className contains left positioning classes
 * Handles responsive variants (sm:, md:, lg:, xl:, 2xl:) and multi-digit values
 * Also considers margin effects for fixed/absolute positioned elements
 *
 * @param className - The className string to check
 * @param tolerance - Maximum distance from left edge to consider as "left positioned" (default: 5)
 * @returns boolean indicating if the element is positioned at the left edge
 */
export const checkLeftPosition = (
  className: string,
  tolerance: number = 5
): boolean => {
  if (!className) return false;

  const classes = className.split(/\s+/);

  // Pattern to match left positioning classes with responsive variants and multi-digit values
  // Examples: "left-0", "sm:left-2", "md:left-10", "lg:left-100"
  const leftPattern = /^(sm:|md:|lg:|xl:|2xl:)?left-(\d+)$/;

  // Check for explicit left positioning classes
  const hasExplicitLeftPosition = classes.some((cls) => {
    const match = cls.match(leftPattern);
    if (!match) return false;

    const value = parseInt(match[2], 10);
    // Consider it "left positioned" if within tolerance distance from left edge
    return value <= tolerance;
  });

  if (hasExplicitLeftPosition) {
    return true;
  }

  // Check for margin-based left positioning for fixed/absolute elements
  // When an element uses "fixed" or "absolute" positioning with margin but no explicit left/right,
  // it effectively positions at the left edge due to the natural flow
  const hasFixedOrAbsolute =
    classes.includes("fixed") || classes.includes("absolute");
  const hasNoExplicitHorizontal = !classes.some((cls) =>
    cls.match(/^(sm:|md:|lg:|xl:|2xl:)?(left-|right-)/)
  );

  if (hasFixedOrAbsolute && hasNoExplicitHorizontal) {
    // Check for margin classes that would position element near left edge
    const marginPattern = /^(sm:|md:|lg:|xl:|2xl:)?(m-|mx-|ml-)(\d+)$/;

    return classes.some((cls) => {
      const match = cls.match(marginPattern);
      if (!match) return false;

      const value = parseInt(match[3], 10);
      // Consider it "left positioned" if margin value is within tolerance
      // Tailwind spacing: 1 = 0.25rem, 2 = 0.5rem, etc.
      return value <= tolerance;
    });
  }

  return false;
};
