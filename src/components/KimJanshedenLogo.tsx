import React from "react";

/**
 * KimJanshedenLogo Component
 *
 * A branded logo component for displaying Kim Jansheden's developer signature
 * - Displays a logo that links to Kim Jansheden's website
 * - Shows an informative tooltip on hover
 * - Includes smooth animations for better user experience
 * - Fully responsive for all screen sizes
 * - Uses Tailwind CSS for styling
 */
const KimJanshedenLogo: React.FC = () => {
  return (
    // Container with relative positioning for tooltip placement
    <div className="group relative inline-block">
      {/* 
        Tooltip that appears on hover
        - Positioned absolutely to appear above the logo
        - Initially invisible (opacity-0) and slightly translated
        - Becomes visible and repositions on hover
        - Includes drop shadow and background for readability
      */}
      <span
        className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-normal rounded bg-black/80 px-3 py-2 text-center text-xs text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 
                     max-w-[250px] sm:max-w-xs"
      >
        Denna sida är skapad av Kim Jansheden. Vill du göra/ha din egen hemsida
        till dig eller ditt företag? Klicka här för att kontakta Kim Jansheden
      </span>

      {/* 
        Logo image with click handler
        - Cursor pointer indicates clickability
      {/* 
        Logo wrapped in an anchor element for accessibility
        - Uses anchor tag for semantic navigation instead of onClick
        - Maintains all visual effects and transitions
        - Properly accessible for keyboard and screen reader users
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
          className="h-8 w-8 cursor-pointer transition-all duration-300 will-change-transform
                   hover:scale-110 hover:drop-shadow-[0_0_0.5em_#646cffaa]
                   sm:h-10 sm:w-10"
        />
      </a>
    </div>
  );
};

export default KimJanshedenLogo;
