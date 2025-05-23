import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KimJanshedenLogo from "@/index";
import React from "react";

describe("Package Integration Tests", () => {
  describe("Index export", () => {
    it("correctly exports the main component", () => {
      // Check that the component is defined
      expect(KimJanshedenLogo).toBeDefined();
      // Verify that the exported value is a function (React component)
      expect(typeof KimJanshedenLogo).toBe("function");
    });

    it("exported component can be rendered", () => {
      // Render the component
      render(<KimJanshedenLogo />);

      // Check that the rendered output includes a link element
      expect(screen.getByRole("link")).toBeInTheDocument();
      // Check that the rendered output includes an image element
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("exported component has the same functionality as direct import", () => {
      // Render the component
      render(<KimJanshedenLogo />);

      // Retrieve the link element from the rendered output
      const link = screen.getByRole("link");
      // Retrieve the image element from the rendered output
      const image = screen.getByRole("img");
      // Retrieve the tooltip text
      const tooltip = screen.getByText(/Denna sida är skapad av Kim Jansheden/);

      // Ensure the link directs to the correct URL
      expect(link).toHaveAttribute("href", "https://kimjansheden.se");
      // Ensure the image uses the correct source URL
      expect(image).toHaveAttribute(
        "src",
        "https://kimjansheden.se/images/logo.png"
      );
      // Verify the tooltip text is present in the document
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe("Package structure", () => {
    it("component is a React functional component", () => {
      const component = KimJanshedenLogo;

      // Ensure the component is a function
      expect(typeof component).toBe("function");

      // Check that it returns a valid React element
      const element = React.createElement(component);
      expect(React.isValidElement(element)).toBe(true);
    });

    it("component gracefully accepts React props", () => {
      // Render the component with empty props to test prop handling
      const { container } = render(React.createElement(KimJanshedenLogo, {}));
      // Ensure something is rendered in the DOM
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
