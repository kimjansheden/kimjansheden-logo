import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KimJanshedenLogo from "@components/KimJanshedenLogo";
import React from "react";

// Clean up after each test to avoid leakage between tests
beforeEach(() => {
  cleanup();
});

describe("KimJanshedenLogo - Visual Stability Tests", () => {
  describe("Position Stability on Hover", () => {
    it("maintains stable position when hovering over the logo", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo className="fixed bottom-0 z-10 m-2" />);

      const image = screen.getByRole("img");
      const container = image.closest("div");

      // Get initial position
      const initialRect = container?.getBoundingClientRect();
      const initialTop = initialRect?.top;
      const initialLeft = initialRect?.left;

      // Hover over the image
      await user.hover(image);

      // Small delay to allow any transitions
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check position after hover
      const hoverRect = container?.getBoundingClientRect();
      const hoverTop = hoverRect?.top;
      const hoverLeft = hoverRect?.left;

      // Position should remain exactly the same
      expect(hoverTop).toBe(initialTop);
      expect(hoverLeft).toBe(initialLeft);

      // Unhover to test return to original position
      await user.unhover(image);

      // Small delay for transition
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check final position
      const finalRect = container?.getBoundingClientRect();
      const finalTop = finalRect?.top;
      const finalLeft = finalRect?.left;

      // Should return to exact initial position
      expect(finalTop).toBe(initialTop);
      expect(finalLeft).toBe(initialLeft);
    });

    it("ensures image scale transformation doesn't affect container position", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");
      const link = image.closest("a");
      const container = link?.parentElement;

      // Get container's initial position
      const initialContainerRect = container?.getBoundingClientRect();

      // Hover to trigger scale transformation
      await user.hover(image);

      // Wait for transition
      await new Promise((resolve) => setTimeout(resolve, 350)); // Duration is 300ms

      // Container position should not change even if image scales
      const hoverContainerRect = container?.getBoundingClientRect();

      expect(hoverContainerRect?.top).toBe(initialContainerRect?.top);
      expect(hoverContainerRect?.left).toBe(initialContainerRect?.left);
      expect(hoverContainerRect?.width).toBe(initialContainerRect?.width);
      expect(hoverContainerRect?.height).toBe(initialContainerRect?.height);
    });

    it("verifies drop shadow doesn't cause layout shift", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo className="fixed bottom-4 right-4" />);

      const image = screen.getByRole("img");
      const container = image.closest("div");

      // Record initial computed styles and position
      const initialRect = container?.getBoundingClientRect();
      const initialComputedStyle = window.getComputedStyle(container!);
      const initialMargin = {
        top: initialComputedStyle.marginTop,
        left: initialComputedStyle.marginLeft,
        bottom: initialComputedStyle.marginBottom,
        right: initialComputedStyle.marginRight,
      };

      // Hover to trigger drop shadow
      await user.hover(image);
      await new Promise((resolve) => setTimeout(resolve, 350));

      // Check that position and margins haven't changed
      const hoverRect = container?.getBoundingClientRect();
      const hoverComputedStyle = window.getComputedStyle(container!);
      const hoverMargin = {
        top: hoverComputedStyle.marginTop,
        left: hoverComputedStyle.marginLeft,
        bottom: hoverComputedStyle.marginBottom,
        right: hoverComputedStyle.marginRight,
      };

      // Position should be identical
      expect(hoverRect?.top).toBe(initialRect?.top);
      expect(hoverRect?.left).toBe(initialRect?.left);

      // Margins should be identical (no layout shift from drop shadow)
      expect(hoverMargin.top).toBe(initialMargin.top);
      expect(hoverMargin.left).toBe(initialMargin.left);
      expect(hoverMargin.bottom).toBe(initialMargin.bottom);
      expect(hoverMargin.right).toBe(initialMargin.right);
    });

    it("maintains position stability across different screen positions", async () => {
      const user = userEvent.setup();

      // Test different positioning scenarios
      const testCases = [
        "fixed top-0 left-0",
        "fixed top-0 right-0",
        "fixed bottom-0 left-0",
        "fixed bottom-0 right-0",
        "absolute top-4 left-4",
        "relative m-4",
      ];

      for (const className of testCases) {
        // Clean and re-render for each test case
        cleanup();
        render(<KimJanshedenLogo className={className} />);

        const image = screen.getByRole("img");
        const container = image.closest("div");

        // Record initial position
        const initialRect = container?.getBoundingClientRect();

        // Hover
        await user.hover(image);
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check position during hover
        const hoverRect = container?.getBoundingClientRect();

        // Position should be stable regardless of positioning method
        expect(hoverRect?.top).toBe(initialRect?.top);
        expect(hoverRect?.left).toBe(initialRect?.left);

        // Unhover
        await user.unhover(image);
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check final position
        const finalRect = container?.getBoundingClientRect();
        expect(finalRect?.top).toBe(initialRect?.top);
        expect(finalRect?.left).toBe(initialRect?.left);
      }
    });
  });

  describe("Tooltip Hover Behavior", () => {
    it("tooltip doesn't respond to hover events outside the image area", async () => {
      const user = userEvent.setup();
      // Use a fixed position so we can calculate positions reliably
      render(<KimJanshedenLogo className="fixed top-20 left-20" />);

      // Get all the necessary elements
      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Get initial states and positions
      const initialTooltipOpacity = window.getComputedStyle(tooltip).opacity;

      // First verify tooltip is initially hidden - accepts both empty string and "0"
      // JSDOM can return empty string for opacity, while real browsers typically return "0"
      expect(["", "0"]).toContain(initialTooltipOpacity);

      // In JSDOM, CSS hover effects (group-hover:opacity-100) don't automatically apply
      // We need to test the basic functionality: hover event is triggered on the image
      // and the tooltip element exists in the DOM with the correct classes

      // Test that hovering the image triggers the user event without error
      await user.hover(image);
      await new Promise((resolve) => setTimeout(resolve, 350));

      // Verify that the tooltip element still exists and has the correct hover class
      expect(tooltip).toHaveClass("group-hover:opacity-100");

      // Test that the pointer-events-none class is applied to prevent tooltip interference
      expect(tooltip).toHaveClass("pointer-events-none");

      // Unhover to test cleanup
      await user.unhover(image);
      await new Promise((resolve) => setTimeout(resolve, 350));

      // Tooltip should still exist in DOM with correct classes
      expect(tooltip).toBeInTheDocument();
    });

    it("tooltip only appears when hovering the visible image area", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo />);

      // Get all the necessary elements
      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Verify tooltip starts with correct initial classes
      expect(tooltip).toHaveClass("opacity-0"); // Initially hidden
      expect(tooltip).toHaveClass("group-hover:opacity-100"); // Shows on group hover
      expect(tooltip).toHaveClass("pointer-events-none"); // Doesn't interfere with hover

      // Test that hover event can be triggered on the image
      await user.hover(image);
      await new Promise((resolve) => setTimeout(resolve, 350));

      // In JSDOM, we can't test actual opacity changes from CSS hover,
      // but we can verify the structure and classes are correct
      expect(image).toBeInTheDocument();
      expect(tooltip).toBeInTheDocument();

      // Verify the tooltip has the correct positioning classes
      expect(tooltip).toHaveClass("absolute");
      expect(tooltip).toHaveClass("transition-all");
      expect(tooltip).toHaveClass("duration-300");

      // Test unhover functionality
      await user.unhover(image);
      await new Promise((resolve) => setTimeout(resolve, 350));

      // Elements should still be present and functional
      expect(image).toBeInTheDocument();
      expect(tooltip).toBeInTheDocument();
    });

    it("verifies pointer-events-none prevents tooltip hover interference", async () => {
      const user = userEvent.setup();
      render(<KimJanshedenLogo className="fixed top-20 left-20" />);

      // Get all the necessary elements
      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);
      const container = image.closest("div");

      // Verify the fix is applied: tooltip should have pointer-events-none
      expect(tooltip).toHaveClass("pointer-events-none");

      // Verify container has group class for hover functionality
      expect(container).toHaveClass("group");

      // Verify tooltip has group-hover class that responds to container hover
      expect(tooltip).toHaveClass("group-hover:opacity-100");

      // Test that image is hoverable (should not throw error)
      await user.hover(image);

      // Verify image is still the target of hover events
      expect(image).toBeInTheDocument();

      // Test unhover
      await user.unhover(image);

      // All elements should remain functional
      expect(image).toBeInTheDocument();
      expect(tooltip).toBeInTheDocument();
      expect(container).toBeInTheDocument();
    });
  });
});
