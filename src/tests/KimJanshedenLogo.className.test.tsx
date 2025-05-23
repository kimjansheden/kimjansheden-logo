import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import KimJanshedenLogo from "@components/KimJanshedenLogo";
import React from "react";

// Test constants for className handling tests
const CLASS_CONSTANTS = {
  // Base classes
  GROUP: "group",
  INLINE_BLOCK: "inline-block",
  RELATIVE: "relative",
  CURSOR_POINTER: "cursor-pointer",
  TRANSITION_ALL: "transition-all",
  DURATION_300: "duration-300",
  WILL_CHANGE_TRANSFORM: "will-change-transform",
  HOVER_SCALE: "hover:scale-110",

  // Default sizes
  DEFAULT_H_MOBILE: "h-6",
  DEFAULT_W_MOBILE: "w-6",
  DEFAULT_H_DESKTOP: "sm:h-8",
  DEFAULT_W_DESKTOP: "sm:w-8",

  // Custom sizes for testing
  CUSTOM_H: "h-32",
  CUSTOM_W: "w-32",
  MEDIUM_H: "h-16",
  MEDIUM_W: "w-16",
} as const;

// Helper function to get common elements
const getElements = () => {
  const link = screen.getByRole("link");
  const image = screen.getByRole("img");
  const container = link.parentElement;

  return { link, image, container };
};

// Rensa efter varje test för att undvika läckage mellan tester
beforeEach(() => {
  cleanup();
});

describe("KimJanshedenLogo - ClassName Handling", () => {
  describe("Size Classes", () => {
    it("applies custom size classes to the image and overrides defaults", () => {
      render(<KimJanshedenLogo className="h-32 w-32" />);
      const { image } = getElements();

      // Check that custom size classes are applied instead of defaults
      expect(image).toHaveClass(
        CLASS_CONSTANTS.CUSTOM_H,
        CLASS_CONSTANTS.CUSTOM_W
      );
      // Verify default size classes are NOT present
      expect(image).not.toHaveClass(
        CLASS_CONSTANTS.DEFAULT_H_MOBILE,
        CLASS_CONSTANTS.DEFAULT_W_MOBILE
      );
      // Verify base animation classes are still present
      expect(image).toHaveClass(
        CLASS_CONSTANTS.CURSOR_POINTER,
        CLASS_CONSTANTS.TRANSITION_ALL,
        CLASS_CONSTANTS.DURATION_300
      );
    });

    it("handles responsive size classes correctly", () => {
      render(
        <KimJanshedenLogo className="h-4 w-4 sm:h-12 sm:w-12 md:h-16 md:w-16" />
      );
      const { image } = getElements();

      // Check that all responsive size classes are applied to image
      expect(image).toHaveClass("h-4", "w-4");
      expect(image).toHaveClass("sm:h-12", "sm:w-12");
      expect(image).toHaveClass("md:h-16", "md:w-16");

      // Verify defaults are not present
      expect(image).not.toHaveClass(
        CLASS_CONSTANTS.DEFAULT_H_MOBILE,
        CLASS_CONSTANTS.DEFAULT_W_MOBILE
      );
    });

    it("handles custom classes with hover and animation effects preserved", () => {
      render(<KimJanshedenLogo className="h-24 w-24 opacity-80" />);
      const { image } = getElements();

      // Custom classes should be applied
      expect(image).toHaveClass("h-24", "w-24", "opacity-80");

      // Base animation and hover effects should be preserved
      expect(image).toHaveClass(CLASS_CONSTANTS.CURSOR_POINTER);
      expect(image).toHaveClass(
        CLASS_CONSTANTS.TRANSITION_ALL,
        CLASS_CONSTANTS.DURATION_300
      );
      expect(image).toHaveClass(CLASS_CONSTANTS.WILL_CHANGE_TRANSFORM);
      expect(image).toHaveClass(CLASS_CONSTANTS.HOVER_SCALE);
      expect(image.className).toMatch(
        /hover:drop-shadow-\[0_0_0\.5em_#646cffaa\]/
      );
    });
  });

  describe("Positioning Classes", () => {
    it("applies positioning classes to the container, not the image", () => {
      render(<KimJanshedenLogo className="fixed bottom-4 right-4" />);
      const { image, container } = getElements();

      // Check that positioning classes go to container
      expect(container).toHaveClass("fixed", "bottom-4", "right-4");
      // Check that image doesn't get positioning classes
      expect(image).not.toHaveClass("fixed", "bottom-4", "right-4");
      // Check that container still has base classes
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );
    });

    it("handles absolute positioning with size classes", () => {
      render(
        <KimJanshedenLogo className="absolute top-0 left-0 h-20 w-20 z-10" />
      );
      const { image, container } = getElements();

      // Container gets positioning and z-index
      expect(container).toHaveClass("absolute", "top-0", "left-0", "z-10");
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );

      // Image gets size classes
      expect(image).toHaveClass("h-20", "w-20");
      expect(image).toHaveClass(
        CLASS_CONSTANTS.CURSOR_POINTER,
        CLASS_CONSTANTS.TRANSITION_ALL
      );

      // Verify container doesn't get relative (since we have absolute positioning)
      expect(container).not.toHaveClass(CLASS_CONSTANTS.RELATIVE);
    });
  });

  describe("Flexbox and Spacing Classes", () => {
    it("applies flexbox utilities to the container", () => {
      render(<KimJanshedenLogo className="mt-auto mb-4 self-end" />);
      const { image, container } = getElements();

      // Check that flexbox utilities go to container
      expect(container).toHaveClass("mt-auto", "mb-4", "self-end");
      // Check that image doesn't get flexbox utilities
      expect(image).not.toHaveClass("mt-auto", "mb-4", "self-end");
    });

    it("handles complex spacing utilities on container", () => {
      render(<KimJanshedenLogo className="mx-auto my-4 px-2 py-1" />);
      const { image, container } = getElements();

      // Container should get all spacing utilities
      expect(container).toHaveClass("mx-auto", "my-4", "px-2", "py-1");
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );

      // Image should not get spacing utilities
      expect(image).not.toHaveClass("mx-auto", "my-4", "px-2", "py-1");
    });

    it("handles self-positioning utilities for flexbox/grid", () => {
      render(
        <KimJanshedenLogo className="self-start justify-self-end place-self-center" />
      );
      const { image, container } = getElements();

      // Self-positioning utilities should go to container
      expect(container).toHaveClass(
        "self-start",
        "justify-self-end",
        "place-self-center"
      );
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );

      // Image should not get these classes
      expect(image).not.toHaveClass(
        "self-start",
        "justify-self-end",
        "place-self-center"
      );
    });
  });

  describe("Mixed Classes and Complex Scenarios", () => {
    it("correctly separates mixed container and image classes", () => {
      render(
        <KimJanshedenLogo className="fixed top-4 left-4 h-16 w-16 mt-2" />
      );
      const { image, container } = getElements();

      // Container should get positioning and spacing classes
      expect(container).toHaveClass("fixed", "top-4", "left-4", "mt-2");
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );

      // Image should get size classes and base styling
      expect(image).toHaveClass(
        CLASS_CONSTANTS.MEDIUM_H,
        CLASS_CONSTANTS.MEDIUM_W
      );
      expect(image).toHaveClass(
        CLASS_CONSTANTS.CURSOR_POINTER,
        CLASS_CONSTANTS.TRANSITION_ALL
      );

      // Verify class separation worked correctly
      expect(image).not.toHaveClass("fixed", "top-4", "left-4", "mt-2");
      expect(container).not.toHaveClass(
        CLASS_CONSTANTS.MEDIUM_H,
        CLASS_CONSTANTS.MEDIUM_W
      );
    });

    it("handles display utilities on container", () => {
      render(<KimJanshedenLogo className="block hidden" />);
      const { container } = getElements();

      // Display utilities should go to container
      expect(container).toHaveClass("block", "hidden");
      expect(container).toHaveClass(CLASS_CONSTANTS.GROUP);
    });

    it("handles responsive display utilities", () => {
      render(<KimJanshedenLogo className="sm:inline-block md:block lg:flex" />);
      const { container } = getElements();

      // Responsive display utilities should go to container
      expect(container).toHaveClass("sm:inline-block", "md:block", "lg:flex");
    });

    it("handles whitespace and multiple spaces in className", () => {
      render(<KimJanshedenLogo className="  h-8   w-8  mt-4  " />);
      const { image, container } = getElements();

      // Should correctly parse and apply classes despite extra whitespace
      expect(image).toHaveClass("h-8", "w-8");
      expect(container).toHaveClass("mt-4");
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK
      );
    });
  });

  describe("Default Behavior", () => {
    it("handles empty className with default behavior", () => {
      render(<KimJanshedenLogo className="" />);
      const { image, container } = getElements();

      // Should have default size classes on image
      expect(image).toHaveClass(
        CLASS_CONSTANTS.DEFAULT_H_MOBILE,
        CLASS_CONSTANTS.DEFAULT_W_MOBILE,
        CLASS_CONSTANTS.DEFAULT_H_DESKTOP,
        CLASS_CONSTANTS.DEFAULT_W_DESKTOP
      );
      // Should have default container classes
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK,
        CLASS_CONSTANTS.RELATIVE
      );
    });

    it("handles no className prop with default behavior", () => {
      render(<KimJanshedenLogo />);
      const { image, container } = getElements();

      // Should have default size classes on image
      expect(image).toHaveClass(
        CLASS_CONSTANTS.DEFAULT_H_MOBILE,
        CLASS_CONSTANTS.DEFAULT_W_MOBILE,
        CLASS_CONSTANTS.DEFAULT_H_DESKTOP,
        CLASS_CONSTANTS.DEFAULT_W_DESKTOP
      );
      // Should have default container classes
      expect(container).toHaveClass(
        CLASS_CONSTANTS.GROUP,
        CLASS_CONSTANTS.INLINE_BLOCK,
        CLASS_CONSTANTS.RELATIVE
      );
    });
  });
});
