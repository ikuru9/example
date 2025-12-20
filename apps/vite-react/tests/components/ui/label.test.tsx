import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "@/components/ui/label";

describe("Label", () => {
  describe("Rendering", () => {
    it("renders label with data-slot", () => {
      render(<Label>Label Text</Label>);

      const label = screen.getByText("Label Text");
      expect(label.getAttribute("data-slot")).toBe("label");
    });

    it("renders with children content", () => {
      render(<Label>Click Me</Label>);

      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("renders with nested content including icons", () => {
      render(
        <Label>
          <svg data-testid="icon">🔍</svg>
          Search
        </Label>,
      );

      const label = screen.getByText("Search");
      const icon = screen.getByTestId("icon");
      expect(label).toContainElement(icon);
    });
  });

  describe("Props & Behavior", () => {
    it("forwards htmlFor prop for form association", () => {
      render(<Label htmlFor="input-id">Label</Label>);

      const label = screen.getByText("Label");
      expect(label).toHaveAttribute("for", "input-id");
    });

    it("merges className with base classes", () => {
      render(<Label className="custom-class">Label</Label>);

      const label = screen.getByText("Label");
      expect(label).toHaveClass("custom-class");
      expect(label).toHaveClass("flex");
      expect(label).toHaveClass("items-center");
      expect(label).toHaveClass("gap-2");
    });

    it("handles peer disabled state with opacity-50", () => {
      render(
        <>
          <input disabled data-testid="input" />
          <Label>Label</Label>
        </>,
      );

      const label = screen.getByText("Label");
      expect(label).toHaveClass("peer-disabled:opacity-50");
    });

    it("handles peer disabled state with cursor-not-allowed", () => {
      render(
        <>
          <input disabled data-testid="input" />
          <Label>Label</Label>
        </>,
      );

      const label = screen.getByText("Label");
      expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
    });

    it("handles group disabled state with opacity-50", () => {
      render(
        <div data-disabled="true">
          <Label>Label</Label>
        </div>,
      );

      const label = screen.getByText("Label");
      expect(label).toHaveClass("group-data-[disabled=true]:opacity-50");
    });

    it("handles group disabled state with pointer-events-none", () => {
      render(
        <div data-disabled="true">
          <Label>Label</Label>
        </div>,
      );

      const label = screen.getByText("Label");
      expect(label).toHaveClass("group-data-[disabled=true]:pointer-events-none");
    });

    it("passes standard HTML label props", () => {
      render(
        <Label id="test-label" aria-label="Test Label">
          Label
        </Label>,
      );

      const label = screen.getByText("Label");
      expect(label).toHaveAttribute("id", "test-label");
      expect(label).toHaveAttribute("aria-label", "Test Label");
    });
  });

  describe("Accessibility", () => {
    it("renders as label element", () => {
      render(<Label>Label</Label>);

      const label = screen.getByText("Label");
      expect(label.tagName).toBe("LABEL");
    });

    it("associates with input via htmlFor", () => {
      render(
        <>
          <input id="input-id" />
          <Label htmlFor="input-id">Label</Label>
        </>,
      );

      const input = screen.getByRole("textbox");
      const label = screen.getByText("Label");
      expect(input).toHaveAttribute("id", "input-id");
      expect(label).toHaveAttribute("for", "input-id");
    });

    it("supports aria-label", () => {
      render(<Label aria-label="Accessible Label">Content</Label>);

      const label = screen.getByLabelText("Accessible Label");
      expect(label).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("has base label styling classes", () => {
      render(<Label>Label</Label>);

      const label = screen.getByText("Label");
      expect(label).toHaveClass(
        "flex",
        "items-center",
        "gap-2",
        "text-sm",
        "leading-none",
        "font-medium",
        "select-none",
      );
    });
  });

  describe("Data Attributes", () => {
    it("sets data-slot to 'label'", () => {
      render(<Label>Label</Label>);

      const label = screen.getByText("Label");
      expect(label.getAttribute("data-slot")).toBe("label");
    });
  });

  describe("Radix Primitive Props Forwarding", () => {
    it("forwards Radix props to LabelPrimitive.Root", () => {
      render(<Label asChild><span>Label</span></Label>);

      const span = screen.getByText("Label");
      expect(span.tagName).toBe("SPAN");
      expect(span.getAttribute("data-slot")).toBe("label");
    });
  });
});
