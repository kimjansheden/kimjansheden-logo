import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KimJanshedenLogo from "@components/KimJanshedenLogo";
import React from "react";
import { LOGO_TEXT } from "@/constants";

// Test constants
const EXPECTED_CLASSES = {
  // Container classes
  GROUP: "group",
  INLINE_BLOCK: "inline-block",
  RELATIVE: "relative",

  // Image classes
  CURSOR_POINTER: "cursor-pointer",
  TRANSITION_ALL: "transition-all",
  DURATION: "duration-300",
  WILL_CHANGE_TRANSFORM: "will-change-transform",
  HOVER_SCALE: "hover:scale-110",

  // Default sizes
  DEFAULT_H_MOBILE: "h-6",
  DEFAULT_W_MOBILE: "w-6",
  DEFAULT_H_DESKTOP: "sm:h-8",
  DEFAULT_W_DESKTOP: "sm:w-8",
} as const;

// Helper function to get common elements
const getCommonElements = () => {
  const link = screen.getByRole("link");
  const image = screen.getByRole("img");
  const container = link.parentElement;
  const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

  return { link, image, container, tooltip };
};

// Rensa efter varje test för att undvika läckage mellan tester
beforeEach(() => {
  cleanup();
});

describe("KimJanshedenLogo", () => {
  // Test basic rendering of the component
  describe("Basic Rendering", () => {
    it("renders the component without crashing", () => {
      render(<KimJanshedenLogo />);

      // Check that the link is rendered
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("renders the logo image with correct attributes", () => {
      render(<KimJanshedenLogo />);

      // Check that the image is rendered and has correct attributes
      const logoImage = screen.getByRole("img");
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute(
        "src",
        "https://kimjansheden.se/images/logo.png"
      );
      expect(logoImage).toHaveAttribute("alt", "Kim Jansheden Logo");
    });

    it("renders the tooltip text", () => {
      render(<KimJanshedenLogo />);

      // Check that the tooltip text exists (even if hidden initially)
      const tooltipText = screen.getByText(
        /Denna sida är skapad av Kim Jansheden/
      );
      expect(tooltipText).toBeInTheDocument();
    });

    it("has correct DOM structure", () => {
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");
      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Verify image is inside the link
      expect(link).toContainElement(image);

      // Verify tooltip and link are siblings in the same container
      expect(tooltip.parentElement).toBe(link.parentElement);
    });
  });

  // Test link functionality
  describe("Link Functionality", () => {
    it("has correct link attributes", () => {
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");

      // Verify correct href
      expect(link).toHaveAttribute("href", "https://kimjansheden.se");

      // Verify link opens in new tab
      expect(link).toHaveAttribute("target", "_blank");

      // Verify security attributes for external links
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("can be clicked without error", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");

      // Simulate click and verify no error
      await user.click(link);
      expect(link).toBeInTheDocument();
    });

    it("responds to keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");

      // Simulate tab navigation
      await user.tab();
      expect(link).toHaveFocus();

      // Simulate Enter key activation
      await user.keyboard("{Enter}");
      expect(link).toBeInTheDocument();
    });
  });

  // Test Tailwind CSS classes and styling
  describe("CSS Classes and Styling", () => {
    it("applies correct CSS classes to the container", () => {
      render(<KimJanshedenLogo />);
      const { link, container } = getCommonElements();

      // Check grouping and positioning classes
      expect(container).toHaveClass(EXPECTED_CLASSES.GROUP);
      expect(container).toHaveClass(EXPECTED_CLASSES.RELATIVE);
      expect(container).toHaveClass(EXPECTED_CLASSES.INLINE_BLOCK);
    });

    it("applies correct CSS classes to the logo image", () => {
      render(<KimJanshedenLogo />);
      const { image } = getCommonElements();

      // Check basic size and cursor styling
      expect(image).toHaveClass(
        EXPECTED_CLASSES.DEFAULT_H_MOBILE,
        EXPECTED_CLASSES.DEFAULT_W_MOBILE
      );
      expect(image).toHaveClass(EXPECTED_CLASSES.CURSOR_POINTER);

      // Check transitions and animations
      expect(image).toHaveClass(EXPECTED_CLASSES.TRANSITION_ALL);
      expect(image).toHaveClass(EXPECTED_CLASSES.DURATION);
      expect(image).toHaveClass(EXPECTED_CLASSES.WILL_CHANGE_TRANSFORM);

      // Check hover effects
      expect(image).toHaveClass(EXPECTED_CLASSES.HOVER_SCALE);
      expect(image.className).toMatch(
        /hover:drop-shadow-\[0_0_0\.5em_#646cffaa\]/
      );

      // Check responsive size classes
      expect(image).toHaveClass(
        EXPECTED_CLASSES.DEFAULT_H_DESKTOP,
        EXPECTED_CLASSES.DEFAULT_W_DESKTOP
      );
    });

    it("applies correct CSS classes to the tooltip", () => {
      render(<KimJanshedenLogo />);
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Positioning - for default rendering (no bottom position), tooltip should be below the logo
      expect(tooltip).toHaveClass(
        "absolute",
        "top-full", // Changed from bottom-full to top-full for default position
        "left-1/2",
        "-translate-x-1/2",
        "mt-2" // Changed from mb-2 to mt-2 for default position
      );

      // Visibility and animation
      expect(tooltip).toHaveClass(
        "opacity-0",
        "group-hover:opacity-100",
        EXPECTED_CLASSES.TRANSITION_ALL,
        EXPECTED_CLASSES.DURATION
      );

      // Appearance
      expect(tooltip).toHaveClass(
        "rounded",
        "bg-black/80",
        "text-white",
        "px-3",
        "py-2",
        "text-center",
        "text-xs",
        "shadow-lg",
        "whitespace-normal"
      );

      // Responsive width
      expect(tooltip).toHaveClass("max-w-[250px]", "sm:max-w-xs");
    });
  });

  // Test Tooltip Content och Behavior
  describe("Tooltip Content and Behavior", () => {
    it("displays the full Swedish tooltip text", () => {
      render(<KimJanshedenLogo />);
      const expectedText = LOGO_TEXT;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it("tooltip is initially hidden", () => {
      render(<KimJanshedenLogo />);
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);
      // Check the class that hides the tooltip initially
      expect(tooltip).toHaveClass("opacity-0");
    });

    it("tooltip reveals on group hover", () => {
      render(<KimJanshedenLogo />);
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);
      // Check hover-triggered class
      expect(tooltip).toHaveClass("group-hover:opacity-100");
    });
  });

  // Test Accessibility
  describe("Accessibility", () => {
    // Test to ensure correct semantic structure
    it("has correct semantic structure", () => {
      render(<KimJanshedenLogo />);

      // Check that a link and an image are present
      const link = screen.getByRole("link");
      const image = screen.getByRole("img");

      expect(link).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });

    // Test to ensure image provides meaningful alt text for screen readers
    it("provides meaningful alt text for screen readers", () => {
      render(<KimJanshedenLogo />);

      // Check for image with appropriate alt text
      const image = screen.getByAltText("Kim Jansheden Logo");
      expect(image).toBeInTheDocument();
    });

    // Test to ensure link has a meaningful aria-label
    it("provides meaningful aria-label for the link", () => {
      render(<KimJanshedenLogo />);

      // Check for link with correct aria-label
      const link = screen.getByLabelText(
        "Webbsidan är skapad av Kim Jansheden"
      );
      expect(link).toBeInTheDocument();
    });

    // Test to ensure keyboard navigation is supported
    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");

      // Test Tab navigation to focus the link
      await user.tab();
      expect(link).toHaveFocus();

      // Test activation using Space key
      await user.keyboard(" ");
      expect(link).toBeInTheDocument();
    });

    // Test to ensure correct ARIA roles are used
    it("has correct ARIA roles", () => {
      render(<KimJanshedenLogo />);

      // Verify that the link element has the correct tag
      const link = screen.getByRole("link");
      expect(link.tagName.toLowerCase()).toBe("a");

      // Verify that the image element has the correct tag
      const image = screen.getByRole("img");
      expect(image.tagName.toLowerCase()).toBe("img");
    });
  });

  // Test component export and structure
  describe("Component export and structure", () => {
    it("exports the component as default", () => {
      // Check if KimJanshedenLogo is defined and is a function
      expect(KimJanshedenLogo).toBeDefined();
      expect(typeof KimJanshedenLogo).toBe("function");
    });

    it("the component returns a valid React element", () => {
      // Create the component using React.createElement and check its validity
      const element = React.createElement(KimJanshedenLogo);
      expect(React.isValidElement(element)).toBe(true);
    });

    it("the component is a valid React functional component", () => {
      // Render the component and ensure it renders without errors
      const { container } = render(<KimJanshedenLogo />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // Test for robustness and edge cases
  describe("Robustness and edge cases", () => {
    it("handles multiple renders without issues", () => {
      // Initial render
      const { rerender } = render(<KimJanshedenLogo />);

      // Rerender the component multiple times
      rerender(<KimJanshedenLogo />);
      rerender(<KimJanshedenLogo />);
      rerender(<KimJanshedenLogo />);

      // Check that essential elements are still rendered
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(
        screen.getByText(/Denna sida är skapad av Kim Jansheden/)
      ).toBeInTheDocument();
    });

    it("retains correct structure after unmount and remount", () => {
      // Render the component
      const { unmount } = render(<KimJanshedenLogo />);

      // Unmount the component
      unmount();

      // Remount the component
      render(<KimJanshedenLogo />);

      // Verify structure is intact
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(
        screen.getByText(/Denna sida är skapad av Kim Jansheden/)
      ).toBeInTheDocument();
    });

    it("works correctly with multiple simultaneous instances", () => {
      // Render multiple instances of the component
      render(
        <div>
          <KimJanshedenLogo />
          <KimJanshedenLogo />
          <KimJanshedenLogo />
        </div>
      );

      // Check all instances are rendered correctly
      const links = screen.getAllByRole("link");
      const images = screen.getAllByRole("img");
      const tooltips = screen.getAllByText(
        /Denna sida är skapad av Kim Jansheden/
      );

      expect(links).toHaveLength(3);
      expect(images).toHaveLength(3);
      expect(tooltips).toHaveLength(3);
    });

    it("maintains performance with many re-renders", () => {
      // Render the component
      const { rerender } = render(<KimJanshedenLogo />);

      // Simulate many re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<KimJanshedenLogo />);
      }

      // Verify the component still functions properly
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  // Security tests
  describe("Security", () => {
    it("uses secure link attributes for external link", () => {
      render(<KimJanshedenLogo />);

      const link = screen.getByRole("link");

      // Check security attributes to prevent tab nabbing
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("uses a secure image source", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");
      const src = image.getAttribute("src");

      // Ensure the image source uses HTTPS for security
      expect(src).toMatch(/^https:/);
      expect(src).toBe("https://kimjansheden.se/images/logo.png");
    });
  });

  // Performance and optimization tests
  describe("Performance and optimization", () => {
    it("uses will-change for optimized animation", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");

      // Check that will-change is used for better performance in animations
      expect(image).toHaveClass(EXPECTED_CLASSES.WILL_CHANGE_TRANSFORM);
    });

    it("uses efficient CSS transitions", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Check that both image and tooltip use optimized CSS transitions
      expect(image).toHaveClass(
        EXPECTED_CLASSES.TRANSITION_ALL,
        EXPECTED_CLASSES.DURATION
      );
      expect(tooltip).toHaveClass(
        EXPECTED_CLASSES.TRANSITION_ALL,
        EXPECTED_CLASSES.DURATION
      );
    });
  });

  // Responsive design tests
  describe("Responsive design", () => {
    it("has responsive sizes for the logo", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");

      // Check default mobile size
      expect(image).toHaveClass("h-6", "w-6");

      // Check desktop size at the sm breakpoint
      expect(image).toHaveClass("sm:h-8", "sm:w-8");
    });

    it("has responsive sizes for the tooltip", () => {
      render(<KimJanshedenLogo />);

      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Check responsive maximum width
      expect(tooltip).toHaveClass("max-w-[250px]");
      expect(tooltip).toHaveClass("sm:max-w-xs");
    });
  });

  // Test className handling and class separation
  describe("ClassName Handling", () => {
    it("applies custom size classes to the image and overrides defaults", () => {
      render(<KimJanshedenLogo className="h-32 w-32" />);
      const logoImage = screen.getByRole("img");

      // Check that custom size classes are applied instead of defaults
      expect(logoImage).toHaveClass("h-32", "w-32");
      // Verify default size classes are NOT present
      expect(logoImage).not.toHaveClass("h-6", "w-6");
      // Verify base animation classes are still present
      expect(logoImage).toHaveClass(
        EXPECTED_CLASSES.CURSOR_POINTER,
        EXPECTED_CLASSES.TRANSITION_ALL,
        EXPECTED_CLASSES.DURATION
      );
    });

    it("applies positioning classes to the container, not the image", () => {
      render(<KimJanshedenLogo className="fixed bottom-4 right-4" />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Check that positioning classes go to container
      expect(container).toHaveClass("fixed", "bottom-4", "right-4");
      // Check that image doesn't get positioning classes
      expect(logoImage).not.toHaveClass("fixed", "bottom-4", "right-4");
      // Check that container still has base classes
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);
    });

    it("applies flexbox utilities to the container", () => {
      render(<KimJanshedenLogo className="mt-auto mb-4 self-end" />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Check that flexbox utilities go to container
      expect(container).toHaveClass("mt-auto", "mb-4", "self-end");
      // Check that image doesn't get flexbox utilities
      expect(logoImage).not.toHaveClass("mt-auto", "mb-4", "self-end");
    });

    it("correctly separates mixed container and image classes", () => {
      render(
        <KimJanshedenLogo className="fixed top-4 left-4 h-16 w-16 mt-2" />
      );
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Container should get positioning and spacing classes
      expect(container).toHaveClass("fixed", "top-4", "left-4", "mt-2");
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);

      // Image should get size classes and base styling
      expect(logoImage).toHaveClass("h-16", "w-16");
      expect(logoImage).toHaveClass(
        EXPECTED_CLASSES.CURSOR_POINTER,
        EXPECTED_CLASSES.TRANSITION_ALL
      );

      // Verify class separation worked correctly
      expect(logoImage).not.toHaveClass("fixed", "top-4", "left-4", "mt-2");
      expect(container).not.toHaveClass("h-16", "w-16");
    });

    it("handles empty className with default behavior", () => {
      render(<KimJanshedenLogo className="" />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Should have default size classes on image
      expect(logoImage).toHaveClass("h-6", "w-6", "sm:h-8", "sm:w-8");
      // Should have default container classes
      expect(container).toHaveClass(
        "group",
        EXPECTED_CLASSES.INLINE_BLOCK,
        "relative"
      );
    });

    it("handles no className prop with default behavior", () => {
      render(<KimJanshedenLogo />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Should have default size classes on image
      expect(logoImage).toHaveClass("h-6", "w-6", "sm:h-8", "sm:w-8");
      // Should have default container classes
      expect(container).toHaveClass(
        "group",
        EXPECTED_CLASSES.INLINE_BLOCK,
        "relative"
      );
    });

    it("handles responsive size classes correctly", () => {
      render(
        <KimJanshedenLogo className="h-4 w-4 sm:h-12 sm:w-12 md:h-16 md:w-16" />
      );
      const logoImage = screen.getByRole("img");

      // Check that all responsive size classes are applied to image
      expect(logoImage).toHaveClass("h-4", "w-4");
      expect(logoImage).toHaveClass("sm:h-12", "sm:w-12");
      expect(logoImage).toHaveClass("md:h-16", "md:w-16");

      // Verify defaults are not present
      expect(logoImage).not.toHaveClass("h-6", "w-6");
    });

    it("handles complex spacing utilities on container", () => {
      render(<KimJanshedenLogo className="mx-auto my-4 px-2 py-1" />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Container should get all spacing utilities
      expect(container).toHaveClass("mx-auto", "my-4", "px-2", "py-1");
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);

      // Image should not get spacing utilities
      expect(logoImage).not.toHaveClass("mx-auto", "my-4", "px-2", "py-1");
    });

    it("handles absolute positioning with size classes", () => {
      render(
        <KimJanshedenLogo className="absolute top-0 left-0 h-20 w-20 z-10" />
      );
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Container gets positioning and z-index
      expect(container).toHaveClass("absolute", "top-0", "left-0", "z-10");
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);

      // Image gets size classes
      expect(logoImage).toHaveClass("h-20", "w-20");
      expect(logoImage).toHaveClass(
        EXPECTED_CLASSES.CURSOR_POINTER,
        EXPECTED_CLASSES.TRANSITION_ALL
      );

      // Verify container doesn't get relative (since we have absolute positioning)
      expect(container).not.toHaveClass("relative");
    });

    it("handles custom classes with hover and animation effects preserved", () => {
      render(<KimJanshedenLogo className="h-24 w-24 opacity-80" />);
      const logoImage = screen.getByRole("img");

      // Custom classes should be applied
      expect(logoImage).toHaveClass("h-24", "w-24", "opacity-80");

      // Base animation and hover effects should be preserved
      expect(logoImage).toHaveClass(EXPECTED_CLASSES.CURSOR_POINTER);
      expect(logoImage).toHaveClass(
        EXPECTED_CLASSES.TRANSITION_ALL,
        EXPECTED_CLASSES.DURATION
      );
      expect(logoImage).toHaveClass(EXPECTED_CLASSES.WILL_CHANGE_TRANSFORM);
      expect(logoImage).toHaveClass(EXPECTED_CLASSES.HOVER_SCALE);
      expect(logoImage.className).toMatch(
        /hover:drop-shadow-\[0_0_0\.5em_#646cffaa\]/
      );
    });

    it("handles display utilities on container", () => {
      render(<KimJanshedenLogo className="block hidden" />);
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Display utilities should go to container
      expect(container).toHaveClass("block", "hidden");
      expect(container).toHaveClass("group");
    });

    it("handles responsive display utilities", () => {
      render(<KimJanshedenLogo className="sm:inline-block md:block lg:flex" />);
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Responsive display utilities should go to container
      expect(container).toHaveClass("sm:inline-block", "md:block", "lg:flex");
    });

    it("handles self-positioning utilities for flexbox/grid", () => {
      render(
        <KimJanshedenLogo className="self-start justify-self-end place-self-center" />
      );
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Self-positioning utilities should go to container
      expect(container).toHaveClass(
        "self-start",
        "justify-self-end",
        "place-self-center"
      );
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);

      // Image should not get these classes
      expect(logoImage).not.toHaveClass(
        "self-start",
        "justify-self-end",
        "place-self-center"
      );
    });

    it("handles whitespace and multiple spaces in className", () => {
      render(<KimJanshedenLogo className="  h-8   w-8  mt-4  " />);
      const logoImage = screen.getByRole("img");
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Should correctly parse and apply classes despite extra whitespace
      expect(logoImage).toHaveClass("h-8", "w-8");
      expect(container).toHaveClass("mt-4");
      expect(container).toHaveClass("group", EXPECTED_CLASSES.INLINE_BLOCK);
    });
  });
});
