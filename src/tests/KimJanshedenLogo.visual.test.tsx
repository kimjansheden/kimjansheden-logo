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
});
