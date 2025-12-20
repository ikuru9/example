import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Input } from "@/components/ui/input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders input element with data-slot", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      expect(input.getAttribute("data-slot")).toBe("input");
    });
  });

  describe("Props & Behavior", () => {
    it("handles type attribute", () => {
      render(<Input type="email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("handles password type", () => {
      render(<Input type="password" />);

      const input = screen.getByDisplayValue("");
      expect(input).toHaveAttribute("type", "password");
    });

    it("merges className with base classes", () => {
      render(<Input className="custom-class" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });

    it("handles disabled state with opacity-50", () => {
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:opacity-50");
      expect(input).toBeDisabled();
    });

    it("handles disabled state with pointer-events-none", () => {
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:pointer-events-none");
    });

    it("handles disabled state with cursor-not-allowed", () => {
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:cursor-not-allowed");
    });

    it("handles invalid state with aria-invalid border-destructive", () => {
      render(<Input aria-invalid />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("aria-invalid:border-destructive");
    });

    it("handles invalid state with ring-destructive styling", () => {
      render(<Input aria-invalid />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("aria-invalid:ring-destructive/20");
      expect(input).toHaveClass("dark:aria-invalid:ring-destructive/40");
    });

    it("passes onChange handler", () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("passes value prop", () => {
      render(<Input value="test value" onChange={() => {}} />);

      const input = screen.getByDisplayValue("test value");
      expect(input).toHaveAttribute("value", "test value");
    });

    it("passes placeholder prop", () => {
      render(<Input placeholder="Enter text" />);

      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toHaveAttribute("placeholder", "Enter text");
    });

    it("passes standard HTML input props", () => {
      render(
        <Input
          id="test-input"
          name="input-name"
          maxLength={10}
          required
          autoComplete="email"
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "test-input");
      expect(input).toHaveAttribute("name", "input-name");
      expect(input).toHaveAttribute("maxLength", "10");
      expect(input).toHaveAttribute("required");
      expect(input).toHaveAttribute("autoComplete", "email");
    });
  });

  describe("Accessibility", () => {
    it("renders as textbox role by default", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      expect(input.tagName).toBe("INPUT");
    });

    it("supports aria-label", () => {
      render(<Input aria-label="Email address" />);

      const input = screen.getByLabelText("Email address");
      expect(input).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Input aria-describedby="help-text" />
          <div id="help-text">Helpful text</div>
        </>,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
    });

    it("is disabled when disabled prop is true", () => {
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("supports aria-invalid for error states", () => {
      render(<Input aria-invalid />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Styling", () => {
    it("has focus-visible ring styling", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("focus-visible:ring-ring/50");
      expect(input).toHaveClass("focus-visible:ring-[3px]");
      expect(input).toHaveClass("focus-visible:border-ring");
    });

    it("has base input styling classes", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(
        "file:text-foreground",
        "placeholder:text-muted-foreground",
        "selection:bg-primary",
        "selection:text-primary-foreground",
        "dark:bg-input/30",
        "border-input",
        "h-9",
        "w-full",
        "min-w-0",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-1",
        "text-base",
        "shadow-xs",
        "transition-[color,box-shadow]",
        "outline-none",
        "file:inline-flex",
        "file:h-7",
        "file:border-0",
        "file:bg-transparent",
        "file:text-sm",
        "file:font-medium",
        "md:text-sm",
      );
    });
  });

  describe("Data Attributes", () => {
    it("sets data-slot to 'input'", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      expect(input.getAttribute("data-slot")).toBe("input");
    });
  });

  describe("Interaction", () => {
    it("focuses and blurs correctly", () => {
      render(<Input />);

      const input = screen.getByRole("textbox");
      input.focus();
      expect(input).toHaveFocus();

      input.blur();
      expect(input).not.toHaveFocus();
    });

    it("handles input value changes", () => {
      render(<Input />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Hello World" } });
      expect(input.value).toBe("Hello World");
    });

    it("supports controlled component pattern", () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("initial");
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };

      render(<TestComponent />);

      const input = screen.getByDisplayValue("initial") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "updated" } });
      expect(input.value).toBe("updated");
    });
  });
});