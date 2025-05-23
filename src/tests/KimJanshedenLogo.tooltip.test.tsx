import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import KimJanshedenLogo from "@components/KimJanshedenLogo";
import React from "react";
import { LOGO_TEXT } from "@/constants";

// Helper function to get common elements
const getElements = () => {
  const link = screen.getByRole("link");
  const image = screen.getByRole("img");
  const container = link.parentElement;
  const tooltip = screen.getByText(LOGO_TEXT);

  return { link, image, container, tooltip };
};

// Clean up after each test to avoid leakage between tests
beforeEach(() => {
  cleanup();
});

describe("KimJanshedenLogo - Tooltip Positioning", () => {
  describe("Bottom Position Detection", () => {
    it("positions tooltip above the logo when logo is at bottom-0", () => {
      render(<KimJanshedenLogo className="fixed bottom-0 right-0" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned above the logo
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");
    });

    it("positions tooltip above the logo when logo is at bottom-8", () => {
      render(<KimJanshedenLogo className="fixed bottom-8 right-0" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned above the logo
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");
    });

    it("positions tooltip below the logo when logo is NOT at bottom position", () => {
      render(<KimJanshedenLogo className="fixed top-0 right-0" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned below the logo
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");
    });

    it("positions tooltip below the logo by default when no position is specified", () => {
      render(<KimJanshedenLogo />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned below the logo by default
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");
    });
  });

  describe("Bottom Position with Different Values", () => {
    it("positions tooltip above the logo with single-digit bottom value", () => {
      render(<KimJanshedenLogo className="fixed bottom-5" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned above the logo
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
    });

    it("positions tooltip below the logo with double-digit bottom value (> tolerance)", () => {
      // The default bottomPositionTolerance is 8, so bottom-9 should NOT trigger the bottom position
      render(<KimJanshedenLogo className="fixed bottom-9" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned below the logo since bottom-9 > default tolerance of 8
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");
    });

    it("positions tooltip below the logo with high bottom value (bottom-100)", () => {
      render(<KimJanshedenLogo className="fixed bottom-100" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned below the logo since bottom-100 > default tolerance of 8
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");
    });
  });

  describe("Responsive Bottom Positions", () => {
    it("positions tooltip above the logo with responsive bottom class", () => {
      render(<KimJanshedenLogo className="fixed sm:bottom-4" />);
      const { tooltip } = getElements();

      // Check that tooltip is positioned above the logo with responsive bottom class
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");
    });

    it("positions tooltip above the logo with multiple responsive bottom classes", () => {
      render(
        <KimJanshedenLogo className="fixed sm:bottom-2 md:bottom-4 lg:bottom-6" />
      );
      const { tooltip } = getElements();

      // Check that tooltip is positioned above the logo with any responsive bottom class
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");
    });
  });

  describe("Z-index and Visibility", () => {
    it("ensures tooltip has higher z-index for visibility", () => {
      render(<KimJanshedenLogo className="fixed bottom-0 z-10" />);
      const { tooltip } = getElements();

      // Check that tooltip has z-index higher than container
      expect(tooltip).toHaveClass("z-50");
    });
  });

  describe("Horizontal Position Detection", () => {
    describe("Left Position Detection", () => {
      it("positions tooltip aligned to left when logo is at left-0", () => {
        render(<KimJanshedenLogo className="fixed left-0 top-0" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the left
        expect(tooltip).toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip aligned to left when logo is at left-8", () => {
        render(<KimJanshedenLogo className="fixed left-8 top-0" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the left
        expect(tooltip).toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip in center when logo is NOT at left position", () => {
        render(<KimJanshedenLogo className="fixed right-0 top-0" />);
        const { tooltip } = getElements();

        // Check that tooltip is centered (when not at left or right edge)
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip with single-digit left value", () => {
        render(<KimJanshedenLogo className="fixed left-5" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the left
        expect(tooltip).toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip in center with double-digit left value (> tolerance)", () => {
        // The default leftPositionTolerance is 8, so left-9 should NOT trigger the left position
        render(<KimJanshedenLogo className="fixed left-9" />);
        const { tooltip } = getElements();

        // Check that tooltip is centered since left-9 > default tolerance of 8
        expect(tooltip).toHaveClass("left-1/2");
        expect(tooltip).toHaveClass("-translate-x-1/2");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
      });

      it("positions tooltip with responsive left class", () => {
        render(<KimJanshedenLogo className="fixed sm:left-4" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the left with responsive left class
        expect(tooltip).toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip with multiple responsive left classes", () => {
        render(
          <KimJanshedenLogo className="fixed sm:left-2 md:left-4 lg:left-6" />
        );
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the left with any responsive left class
        expect(tooltip).toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });
    });

    describe("Right Position Detection", () => {
      it("positions tooltip aligned to right when logo is at right-0", () => {
        render(<KimJanshedenLogo className="fixed right-0 top-0" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the right
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip aligned to right when logo is at right-8", () => {
        render(<KimJanshedenLogo className="fixed right-8 top-0" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the right
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip with single-digit right value", () => {
        render(<KimJanshedenLogo className="fixed right-5" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the right
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip in center with double-digit right value (> tolerance)", () => {
        // The default rightPositionTolerance is 8, so right-9 should NOT trigger the right position
        render(<KimJanshedenLogo className="fixed right-9" />);
        const { tooltip } = getElements();

        // Check that tooltip is centered since right-9 > default tolerance of 8
        expect(tooltip).toHaveClass("left-1/2");
        expect(tooltip).toHaveClass("-translate-x-1/2");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
      });

      it("positions tooltip with responsive right class", () => {
        render(<KimJanshedenLogo className="fixed sm:right-4" />);
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the right with responsive right class
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });

      it("positions tooltip with multiple responsive right classes", () => {
        render(
          <KimJanshedenLogo className="fixed sm:right-2 md:right-4 lg:right-6" />
        );
        const { tooltip } = getElements();

        // Check that tooltip is aligned to the right with any responsive right class
        expect(tooltip).toHaveClass("right-0");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("left-1/2");
        expect(tooltip).not.toHaveClass("-translate-x-1/2");
      });
    });

    it("positions tooltip left-aligned when logo has margin that places it at left edge", () => {
      // This reproduces the real-world issue: "fixed bottom-0 z-10 m-2"
      // The m-2 class effectively positions the logo near the left edge
      render(<KimJanshedenLogo className="fixed bottom-0 z-10 m-2" />);
      const { tooltip } = getElements();

      // When logo is effectively at left edge due to margin, tooltip should be left-aligned
      // to prevent it from going outside viewport
      expect(tooltip).toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("positions tooltip right-aligned when logo has margin that places it at right edge", () => {
      // Similar case but for right edge
      render(<KimJanshedenLogo className="fixed bottom-0 z-10 m-2 right-0" />);
      const { tooltip } = getElements();

      // When logo is at right edge, tooltip should be right-aligned
      expect(tooltip).toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    describe("Default Horizontal Positioning", () => {
      it("positions tooltip in center by default when no horizontal position is specified", () => {
        render(<KimJanshedenLogo />);
        const { tooltip } = getElements();

        // Check that tooltip is centered by default
        expect(tooltip).toHaveClass("left-1/2");
        expect(tooltip).toHaveClass("-translate-x-1/2");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
      });

      it("positions tooltip in center when logo has no edge positioning", () => {
        render(<KimJanshedenLogo className="fixed top-10" />);
        const { tooltip } = getElements();

        // Check that tooltip is centered when not at edges
        expect(tooltip).toHaveClass("left-1/2");
        expect(tooltip).toHaveClass("-translate-x-1/2");
        expect(tooltip).not.toHaveClass("left-0");
        expect(tooltip).not.toHaveClass("right-0");
      });
    });
  });

  describe("Combined Positioning (Edge Cases)", () => {
    it("positions tooltip above and aligned left when logo is at bottom-left corner", () => {
      render(<KimJanshedenLogo className="fixed bottom-0 left-0" />);
      const { tooltip } = getElements();

      // Check vertical positioning (above because of bottom position)
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");

      // Check horizontal positioning (left aligned because of left position)
      expect(tooltip).toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("positions tooltip above and aligned right when logo is at bottom-right corner", () => {
      render(<KimJanshedenLogo className="fixed bottom-0 right-0" />);
      const { tooltip } = getElements();

      // Check vertical positioning (above because of bottom position)
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");

      // Check horizontal positioning (right aligned because of right position)
      expect(tooltip).toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("positions tooltip below and aligned left when logo is at top-left corner", () => {
      render(<KimJanshedenLogo className="fixed top-0 left-0" />);
      const { tooltip } = getElements();

      // Check vertical positioning (below because NOT at bottom position)
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");

      // Check horizontal positioning (left aligned because of left position)
      expect(tooltip).toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("positions tooltip below and aligned right when logo is at top-right corner", () => {
      render(<KimJanshedenLogo className="fixed top-0 right-0" />);
      const { tooltip } = getElements();

      // Check vertical positioning (below because NOT at bottom position)
      expect(tooltip).toHaveClass("top-full");
      expect(tooltip).toHaveClass("mt-2");
      expect(tooltip).not.toHaveClass("bottom-full");
      expect(tooltip).not.toHaveClass("mb-2");

      // Check horizontal positioning (right aligned because of right position)
      expect(tooltip).toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("positions tooltip with responsive positioning at corners", () => {
      render(
        <KimJanshedenLogo className="fixed sm:bottom-4 md:right-6 lg:left-2" />
      );
      const { tooltip } = getElements();

      // Check vertical positioning (above because of responsive bottom class)
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");

      // Check horizontal positioning (left aligned because left takes precedence over right when both are present)
      expect(tooltip).toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("right-0");
      expect(tooltip).not.toHaveClass("left-1/2");
      expect(tooltip).not.toHaveClass("-translate-x-1/2");
    });

    it("handles mixed tolerance values correctly", () => {
      // Mix of values within and outside tolerance (bottom-5 within, left-10 outside)
      render(<KimJanshedenLogo className="fixed bottom-5 left-10" />);
      const { tooltip } = getElements();

      // Check vertical positioning (above because bottom-5 <= tolerance)
      expect(tooltip).toHaveClass("bottom-full");
      expect(tooltip).toHaveClass("mb-2");
      expect(tooltip).not.toHaveClass("top-full");
      expect(tooltip).not.toHaveClass("mt-2");

      // Check horizontal positioning (centered because left-10 > tolerance)
      expect(tooltip).toHaveClass("left-1/2");
      expect(tooltip).toHaveClass("-translate-x-1/2");
      expect(tooltip).not.toHaveClass("left-0");
      expect(tooltip).not.toHaveClass("right-0");
    });
  });
});
