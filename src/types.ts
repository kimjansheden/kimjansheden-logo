/**
 * Properties for the KimJanshedenLogo component.
 *
 * Allows for customization of size, positioning, and other styles.
 */
export interface KimJanshedenLogoProps {
  /**
   * Optional additional CSS classes to apply to the logo image.
   * Useful for customizing size (e.g. `w-8 h-8`), positioning, and visuals.
   */
  className?: string;
}

export type CheckBottomPositionOptions = {
  classNames: string[];
  bottomPositionTolerance?: number;
};
