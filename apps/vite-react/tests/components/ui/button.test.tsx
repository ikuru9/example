import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders default button with data attributes", () => {
      render(<Button>Submit</Button>);

      const button = screen.getByRole("button", { name: "Submit" });

      expect(button.getAttribute("data-slot")).toBe("button");
      expect(button.getAttribute("data-variant")).toBe("default");
      expect(button.getAttribute("data-size")).toBe("default");
    });

    it("renders with children content", () => {
      render(<Button>Click Me</Button>);

      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Button variant="default">Default</Button>);

      const button = screen.getByRole("button", { name: "Default" });
      expect(button.getAttribute("data-variant")).toBe("default");
    });

    it("renders destructive variant", () => {
      render(<Button variant="destructive">Delete</Button>);

      const button = screen.getByRole("button", { name: "Delete" });
      expect(button.getAttribute("data-variant")).toBe("destructive");
    });

    it("renders outline variant", () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole("button", { name: "Outline" });
      expect(button.getAttribute("data-variant")).toBe("outline");
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole("button", { name: "Secondary" });
      expect(button.getAttribute("data-variant")).toBe("secondary");
    });

    it("renders ghost variant", () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole("button", { name: "Ghost" });
      expect(button.getAttribute("data-variant")).toBe("ghost");
    });

    it("renders link variant", () => {
      render(<Button variant="link">Link</Button>);

      const button = screen.getByRole("button", { name: "Link" });
      expect(button.getAttribute("data-variant")).toBe("link");
    });
  });

  describe("Sizes", () => {
    it("renders default size", () => {
      render(<Button size="default">Default</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("default");
    });

    it("renders sm size", () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("sm");
    });

    it("renders lg size", () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("lg");
    });

    it("renders icon size", () => {
      render(<Button size="icon">Icon</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("icon");
    });

    it("renders icon-sm size", () => {
      render(<Button size="icon-sm">Icon SM</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("icon-sm");
    });

    it("renders icon-lg size", () => {
      render(<Button size="icon-lg">Icon LG</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-size")).toBe("icon-lg");
    });
  });

  describe("Props & Behavior", () => {
    it("merges className with base classes", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("handles disabled state with pointer-events-none", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:pointer-events-none");
      expect(button).toBeDisabled();
    });

    it("handles disabled state with opacity-50", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("disabled:opacity-50");
    });

    it("passes onClick handler", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("passes type attribute", () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("passes standard HTML button props", () => {
      render(
        <Button id="test-btn" name="button-name" aria-label="Test Button">
          Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "test-btn");
      expect(button).toHaveAttribute("name", "button-name");
      expect(button).toHaveAttribute("aria-label", "Test Button");
    });
  });

  describe("asChild", () => {
    it("renders as link when asChild=true with anchor tag", () => {
      render(
        <Button asChild>
          <a href="/docs">Docs</a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Docs" });

      expect(link.tagName).toBe("A");
      expect(link.getAttribute("data-slot")).toBe("button");
    });

    it("renders as custom element via Radix Slot", () => {
      render(
        <Button asChild>
          <span>Custom</span>
        </Button>,
      );

      const span = screen.getByText("Custom");
      expect(span.tagName).toBe("SPAN");
      expect(span.getAttribute("data-slot")).toBe("button");
    });

    it("merges className with child element", () => {
      render(
        <Button asChild className="custom-class">
          <a href="/docs">Docs</a>
        </Button>,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-class");
    });

    it("passes data attributes to child element", () => {
      render(
        <Button asChild variant="destructive" size="lg">
          <a href="/delete">Delete</a>
        </Button>,
      );

      const link = screen.getByRole("link");
      expect(link.getAttribute("data-slot")).toBe("button");
      expect(link.getAttribute("data-variant")).toBe("destructive");
      expect(link.getAttribute("data-size")).toBe("lg");
    });
  });

  describe("Data Attributes", () => {
    it("sets data-slot to 'button'", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button.getAttribute("data-slot")).toBe("button");
    });

    it("sets data-variant correctly for all variants", () => {
      const variants = [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ] as const;

      variants.forEach((variant) => {
        render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole("button", { name: variant });
        expect(button.getAttribute("data-variant")).toBe(variant);
      });
    });

    it("sets data-size correctly for all sizes", () => {
      const sizes = ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] as const;

      sizes.forEach((size) => {
        render(<Button size={size}>{size}</Button>);
        const button = screen.getByRole("button", { name: size });
        expect(button.getAttribute("data-size")).toBe(size);
      });
    });
  });

  describe("Accessibility", () => {
    it("renders as button role by default", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Search">🔍</Button>);

      const button = screen.getByLabelText("Search");
      expect(button).toBeInTheDocument();
    });

    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("SVG Icon Handling", () => {
    it("renders button with SVG icon", () => {
      render(
        <Button>
          <svg data-testid="icon">🔍</svg>
          Button
        </Button>,
      );

      const button = screen.getByRole("button");
      const icon = screen.getByTestId("icon");
      expect(button).toContainElement(icon);
    });

    it("renders SVG-only button (icon size)", () => {
      render(
        <Button size="icon">
          <svg data-testid="icon">🔍</svg>
        </Button>,
      );

      const button = screen.getByRole("button");
      const icon = screen.getByTestId("icon");
      expect(button).toContainElement(icon);
      expect(button.getAttribute("data-size")).toBe("icon");
    });

    it("renders button with SVG having custom class", () => {
      render(
        <Button>
          <svg data-testid="icon" className="w-6 h-6">
            📍
          </svg>
          Location
        </Button>,
      );

      const button = screen.getByRole("button");
      const icon = screen.getByTestId("icon");
      expect(button).toContainElement(icon);
      expect(icon).toHaveClass("w-6", "h-6");
    });
  });
});
