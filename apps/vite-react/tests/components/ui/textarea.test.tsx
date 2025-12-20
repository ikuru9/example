import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  describe("Rendering", () => {
    it("renders a textarea element", () => {
      render(<Textarea aria-label="Message" />);

      const textarea = screen.getByLabelText("Message");

      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("renders with data-slot attribute", () => {
      render(<Textarea aria-label="Message" />);

      const textarea = screen.getByLabelText("Message");

      expect(textarea.getAttribute("data-slot")).toBe("textarea");
    });

    it("includes field-sizing-content class for auto-resize", () => {
      render(<Textarea aria-label="Notes" />);

      const textarea = screen.getByLabelText("Notes");

      expect(textarea).toHaveClass("field-sizing-content");
    });
  });

  describe("Props & Behavior", () => {
    it("merges className with base classes", () => {
      render(<Textarea aria-label="Notes" className="custom-class" />);

      const textarea = screen.getByLabelText("Notes");

      expect(textarea).toHaveClass("custom-class");
    });

    it("passes value prop", () => {
      render(<Textarea aria-label="Input" value="test value" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveValue("test value");
    });

    it("passes placeholder prop", () => {
      render(<Textarea aria-label="Input" placeholder="Enter text" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveAttribute("placeholder", "Enter text");
    });

    it("passes rows attribute", () => {
      render(<Textarea aria-label="Input" rows={5} />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveAttribute("rows", "5");
    });

    it("handles onChange event", () => {
      const handleChange = vi.fn();
      render(<Textarea aria-label="Input" onChange={handleChange} />);

      const textarea = screen.getByLabelText("Input");
      fireEvent.change(textarea, { target: { value: "new value" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("forwards standard HTML textarea props", () => {
      render(
        <Textarea
          aria-label="Input"
          id="test-textarea"
          name="textarea-name"
          maxLength={100}
          autoComplete="off"
        />,
      );

      const textarea = screen.getByLabelText("Input");
      expect(textarea).toHaveAttribute("id", "test-textarea");
      expect(textarea).toHaveAttribute("name", "textarea-name");
      expect(textarea).toHaveAttribute("maxLength", "100");
      expect(textarea).toHaveAttribute("autoComplete", "off");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(<Textarea aria-label="Description" />);

      const textarea = screen.getByLabelText("Description");

      expect(textarea).toBeInTheDocument();
    });

    it("handles aria-invalid for invalid state", () => {
      render(<Textarea aria-label="Input" aria-invalid="true" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Styling", () => {
    it("applies disabled styles when disabled", () => {
      render(<Textarea aria-label="Input" disabled />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveClass("disabled:opacity-50");
      expect(textarea).toHaveClass("disabled:cursor-not-allowed");
      expect(textarea).toBeDisabled();
    });

    it("applies invalid state styling with aria-invalid", () => {
      render(<Textarea aria-label="Input" aria-invalid="true" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveClass("aria-invalid:ring-destructive/20");
      expect(textarea).toHaveClass("dark:aria-invalid:ring-destructive/40");
      expect(textarea).toHaveClass("aria-invalid:border-destructive");
    });

    it("applies focus-visible ring styles", () => {
      render(<Textarea aria-label="Input" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveClass("focus-visible:ring-ring/50");
      expect(textarea).toHaveClass("focus-visible:ring-[3px]");
    });

    it("includes base styling classes", () => {
      render(<Textarea aria-label="Input" />);

      const textarea = screen.getByLabelText("Input");

      expect(textarea).toHaveClass(
        "border-input",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring",
        "flex",
        "min-h-16",
        "w-full",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-2",
        "text-base",
        "shadow-xs",
        "transition-[color,box-shadow]",
        "outline-none",
        "md:text-sm",
      );
    });
  });

  describe("Interaction", () => {
    it("updates value on user input", () => {
      render(<Textarea aria-label="Input" />);

      const textarea = screen.getByLabelText("Input");
      fireEvent.change(textarea, { target: { value: "Hello World" } });

      expect(textarea).toHaveValue("Hello World");
    });

    it("triggers onChange on input", () => {
      const handleChange = vi.fn();
      render(<Textarea aria-label="Input" onChange={handleChange} />);

      const textarea = screen.getByLabelText("Input");
      fireEvent.change(textarea, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "test" }),
        }),
      );
    });
  });
});
