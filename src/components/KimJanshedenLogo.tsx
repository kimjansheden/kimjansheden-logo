import { LOGO_TEXT } from "@/constants";
import { KimJanshedenLogoProps } from "@/types";
import { checkBottomPosition } from "@/utils/isBottomPosition";
import { checkLeftPosition } from "@/utils/isLeftPosition";
import { checkRightPosition } from "@/utils/isRightPosition";
import React from "react";

/**
 * A React component for displaying Kim Jansheden's developer signature logo.
 *
 * - Displays a logo that links to Kim Jansheden's website
 * - Shows an informative tooltip on hover
 * - Includes smooth animations for better user experience
 * - Fully responsive for all screen sizes
 * - Uses Tailwind CSS for styling
 * - Accepts custom className prop for additional styling
 * - Intelligently positions tooltip based on container position
 *
 * @component
 * @example
 * // Basic usage with default size
 * <KimJanshedenLogo />
 *
 * @example
 * // Custom size using className
 * <KimJanshedenLogo className="w-16 h-16" />
 *
 * @example
 * // Fixed positioning
 * <KimJanshedenLogo className="fixed bottom-0 z-10 m-2" />
 *
 * @example
 * // Flexbox positioning (push to bottom of flex container)
 * <KimJanshedenLogo className="mt-auto" />
 *
 * @accessibility
 * - Uses semantic anchor tag for navigation
 * - Includes appropriate aria-label for screen readers
 * - Maintains accessible contrast ratios
 *
 * @param props - Component props
 * @param {string} [props.className=""] - Optional CSS class name for custom styling.
 * Can include positioning, sizing, flexbox utilities, and other utility classes.
 *
 * @returns A fully styled and interactive Kim Jansheden logo component
 */
export const KimJanshedenLogo: React.FC<KimJanshedenLogoProps> = ({
  className = "",
}) => {
  // Define patterns for different types of CSS classes
  // Positioning classes that should apply to container
  const positioningPattern = /^(fixed|absolute|relative|static|sticky)$/;
  // Directional positioning classes that should apply to container
  const directionalPattern = /^(top-|bottom-|left-|right-|inset-|z-)/;
  // Display utilities that should apply to container
  const displayPattern =
    /^(sm:|md:|lg:|xl:|2xl:)?((inline-block|inline-flex|flex|block|inline|hidden|grid|table|contents|flow-root))$/;
  // Container utilities including spacing, flexbox, and display properties
  const containerPattern =
    /^(mt-|mb-|ml-|mr-|mx-|my-|m-|pt-|pb-|pl-|pr-|px-|py-|p-|self-|justify-self-|place-self-)/;

  // Split className into individual classes for processing
  const classArray = className.split(" ").filter((cls) => cls.trim() !== "");

  console.log("Received className:", className);
  console.log("Class array after split:", classArray);

  // Check positioning for smart tooltip placement
  const isBottomPositioned = checkBottomPosition({
    classNames: classArray,
    bottomPositionTolerance: 8,
  });

  // Check horizontal positioning for smart tooltip placement
  const isLeftPositioned = checkLeftPosition(className, 8);
  const isRightPositioned = checkRightPosition(className, 8);

  // Get classes that should apply to the container vs the image
  const containerClasses = classArray.filter((cls) => {
    const isPositionType = positioningPattern.test(cls);
    const isDirectional = directionalPattern.test(cls);
    const isDisplayType = displayPattern.test(cls);
    const isContainerUtil = containerPattern.test(cls);
    // Return true if class should apply to container
    return isPositionType || isDirectional || isDisplayType || isContainerUtil;
  });

  console.log("Container classes received:", containerClasses);

  // Get classes that should apply to the image (size, colors, etc.)
  // All classes that are NOT container classes should go to the image
  const imageClasses = classArray.filter((cls) => {
    const isPositionType = positioningPattern.test(cls);
    const isDirectional = directionalPattern.test(cls);
    const isDisplayType = displayPattern.test(cls);
    const isContainerUtil = containerPattern.test(cls);
    // Return true if class should apply to image (NOT container classes)
    return (
      !isPositionType && !isDirectional && !isDisplayType && !isContainerUtil
    );
  });

  console.log("Image classes received:", imageClasses);

  // Base classes for the container
  const baseContainerClasses = "group inline-block";

  // Combine container classes
  // If we have container-specific classes, use them; otherwise, default to relative
  const finalContainerClasses =
    containerClasses.length > 0
      ? `${baseContainerClasses} ${containerClasses.join(" ")}`.trim()
      : `${baseContainerClasses} relative`.trim();

  console.log("Final container classes:", finalContainerClasses);

  // Base classes for the image - essential styling and animations
  const baseImageClasses =
    "cursor-pointer transition-all duration-300 will-change-transform hover:scale-110 hover:drop-shadow-[0_0_0.5em_#646cffaa]";

  // Default size classes - only used if no size classes are provided in imageClasses
  const defaultSizeClasses = "h-6 w-6 sm:h-8 sm:w-8";

  // Check if we have any size-related classes in imageClasses
  const hasSizeClasses = imageClasses.some((cls) =>
    cls.match(/^(h-|w-|size-|max-h-|max-w-|min-h-|min-w-|sm:|md:|lg:|xl:|2xl:)/)
  );

  // Combine image classes
  // If we have image-specific classes, use them; otherwise, use default size classes
  const finalImageClasses =
    imageClasses.length > 0
      ? `${baseImageClasses} ${imageClasses.join(" ")}`.trim()
      : hasSizeClasses
      ? `${baseImageClasses} ${imageClasses.join(" ")}`.trim()
      : `${baseImageClasses} ${defaultSizeClasses}`.trim();

  console.log("Final image classes:", finalImageClasses);

  // Determine tooltip position based on container position
  // Vertical positioning: If positioned at bottom, show tooltip above, otherwise show it below
  const tooltipVerticalClasses = isBottomPositioned
    ? "bottom-full mb-2" // Position above when at bottom of screen
    : "top-full mt-2"; // Position below otherwise

  // Horizontal positioning: Adjust tooltip alignment based on logo position
  // This prevents tooltip from going outside viewport boundaries
  let tooltipHorizontalClasses = "left-1/2 -translate-x-1/2"; // Default: center-aligned

  if (isLeftPositioned) {
    // When logo is at left edge, align tooltip to the left to prevent overflow
    tooltipHorizontalClasses = "left-0";
  } else if (isRightPositioned) {
    // When logo is at right edge, align tooltip to the right to prevent overflow
    tooltipHorizontalClasses = "right-0";
  }

  // Combine all tooltip positioning classes
  const tooltipPositionClasses = `${tooltipVerticalClasses} ${tooltipHorizontalClasses}`;

  return (
    // Container with flexible class support for positioning and layout
    <div className={finalContainerClasses}>
      {/* 
        Tooltip that appears on hover
        - Positioned based on container position (above or below)
        - Initially invisible (opacity-0) and slightly translated
        - Becomes visible and repositions on hover
        - Includes drop shadow and background for readability
      */}
      <span
        className={`absolute ${tooltipPositionClasses} whitespace-normal rounded bg-black/80 px-3 py-2 text-center text-xs text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 
                     max-w-[250px] sm:max-w-xs z-50`}
      >
        {LOGO_TEXT}
      </span>

      {/* 
        Logo wrapped in an anchor element for accessibility
        - Uses anchor tag for semantic navigation instead of onClick
        - Maintains all visual effects and transitions
        - Properly accessible for keyboard and screen reader users
        - Accepts custom className for styling customization
      */}
      <a
        href="https://kimjansheden.se"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Webbsidan är skapad av Kim Jansheden"
      >
        <img
          src="https://kimjansheden.se/images/logo.png"
          alt="Kim Jansheden Logo"
          className={finalImageClasses}
        />
      </a>
    </div>
  );
};

export default KimJanshedenLogo;
