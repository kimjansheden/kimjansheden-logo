/**
 * Properties for the KimJanshedenLogo component.
 *
 * @property {string} [className] - Optional additional CSS classes to apply to the logo image.
 *
 * Allows for customization of size, positioning, and other styles
 */
export interface KimJanshedenLogoProps {
  className?: string;
}

export type CheckBottomPositionOptions = {
  classNames: string[];
  bottomPositionTolerance?: number;
};
