import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KimJanshedenLogo from "./KimJanshedenLogo";
import React from "react";

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
      const link = screen.getByRole("link");
      const container = link.parentElement;

      // Check grouping and positioning classes
      expect(container).toHaveClass("group");
      expect(container).toHaveClass("relative");
      expect(container).toHaveClass("inline-block");
    });

    it("applies correct CSS classes to the logo image", () => {
      render(<KimJanshedenLogo />);
      const logoImage = screen.getByRole("img");

      // Check basic size and cursor styling
      expect(logoImage).toHaveClass("h-8", "w-8");
      expect(logoImage).toHaveClass("cursor-pointer");

      // Check transitions and animations
      expect(logoImage).toHaveClass("transition-all");
      expect(logoImage).toHaveClass("duration-300");
      expect(logoImage).toHaveClass("will-change-transform");

      // Check hover effects
      expect(logoImage).toHaveClass("hover:scale-110");
      expect(logoImage.className).toMatch(
        /hover:drop-shadow-\[0_0_0\.5em_#646cffaa\]/
      );

      // Check responsive size classes
      expect(logoImage).toHaveClass("sm:h-10", "sm:w-10");
    });

    it("applies correct CSS classes to the tooltip", () => {
      render(<KimJanshedenLogo />);
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Positioning
      expect(tooltip).toHaveClass(
        "absolute",
        "bottom-full",
        "left-1/2",
        "-translate-x-1/2",
        "mb-2"
      );

      // Visibility and animation
      expect(tooltip).toHaveClass(
        "opacity-0",
        "group-hover:opacity-100",
        "transition-all",
        "duration-300"
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
      const expectedText =
        "Denna sida är skapad av Kim Jansheden. Vill du göra/ha din egen hemsida till dig eller ditt företag? Klicka här för att kontakta Kim Jansheden";
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
      expect(image).toHaveClass("will-change-transform");
    });

    it("uses efficient CSS transitions", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Check that both image and tooltip use optimized CSS transitions
      expect(image).toHaveClass("transition-all", "duration-300");
      expect(tooltip).toHaveClass("transition-all", "duration-300");
    });
  });

  // Responsive design tests
  describe("Responsive design", () => {
    it("has responsive sizes for the logo", () => {
      render(<KimJanshedenLogo />);

      const image = screen.getByRole("img");

      // Check default mobile size
      expect(image).toHaveClass("h-8", "w-8");

      // Check desktop size at the sm breakpoint
      expect(image).toHaveClass("sm:h-10", "sm:w-10");
    });

    it("has responsive sizes for the tooltip", () => {
      render(<KimJanshedenLogo />);

      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Check responsive maximum width
      expect(tooltip).toHaveClass("max-w-[250px]");
      expect(tooltip).toHaveClass("sm:max-w-xs");
    });
  });
});
