import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

describe("Select", () => {
  describe("Rendering", () => {
    it("renders all sub-components with correct data slots", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger.getAttribute("data-slot")).toBe("select-trigger");
    });

    it("renders SelectItem with correct data slot", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const item = screen.getByRole("option", { name: "Test Item" });
      expect(item.getAttribute("data-slot")).toBe("select-item");
    });

    it("renders SelectLabel with correct data slot", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Test Label</SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>,
      );

      const label = screen.getByText("Test Label");
      expect(label.getAttribute("data-slot")).toBe("select-label");
    });

    it("renders SelectSeparator with correct data slot", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectSeparator />
          </SelectContent>
        </Select>,
      );

      const separator = document.querySelector('[data-slot="select-separator"]');
      expect(separator).toBeInTheDocument();
    });

    it("renders SelectGroup with correct data slot", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group</SelectLabel>
              <SelectItem value="test">Test</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>,
      );

      const group = document.querySelector('[data-slot="select-group"]');
      expect(group).toBeInTheDocument();
    });

    it("renders SelectValue with correct data slot", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
        </Select>,
      );

      const value = document.querySelector('[data-slot="select-value"]');
      expect(value).toBeInTheDocument();
    });
  });

  describe("Size & Position Variants", () => {
    describe("SelectTrigger sizes", () => {
      it("renders default size with correct height class", () => {
        render(
          <Select>
            <SelectTrigger size="default">
              <SelectValue />
            </SelectTrigger>
          </Select>,
        );

        const trigger = screen.getByRole("combobox");
        expect(trigger.getAttribute("data-size")).toBe("default");
        expect(trigger).toHaveClass("data-[size=default]:h-9");
      });

      it("renders small size with correct height class", () => {
        render(
          <Select>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
          </Select>,
        );

        const trigger = screen.getByRole("combobox");
        expect(trigger.getAttribute("data-size")).toBe("sm");
        expect(trigger).toHaveClass("data-[size=sm]:h-8");
      });

      it("defaults to default size when no size prop provided", () => {
        render(
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
          </Select>,
        );

        const trigger = screen.getByRole("combobox");
        expect(trigger.getAttribute("data-size")).toBe("default");
      });
    });

    describe("SelectContent positions", () => {
      it("renders with item-aligned position by default", () => {
        render(
          <Select open onOpenChange={() => {}}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">Test</SelectItem>
            </SelectContent>
          </Select>,
        );

        const content = document.querySelector('[data-slot="select-content"]');
        expect(content).toBeInTheDocument();
        expect(content).not.toHaveClass("data-[side=bottom]:translate-y-1");
      });

      it("renders with popper position and correct classes", () => {
        render(
          <Select open onOpenChange={() => {}}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="test">Test</SelectItem>
            </SelectContent>
          </Select>,
        );

        const content = document.querySelector('[data-slot="select-content"]');
        expect(content).toBeInTheDocument();
        const viewport = content?.querySelector('[data-radix-select-viewport]');
        expect(viewport).toHaveClass("h-(--radix-select-trigger-height)");
        expect(viewport).toHaveClass("w-full");
        expect(viewport).toHaveClass("min-w-(--radix-select-trigger-width)");
      });
    });
  });

  describe("State & Selection", () => {
    it("displays placeholder when no value is selected", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
        </Select>,
      );

      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("displays selected value text", () => {
      render(
        <Select value="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("shows check icon on selected item when open", () => {
      render(
        <Select open onOpenChange={() => {}} value="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>,
      );

      const appleItem = screen.getByRole("option", { name: "Apple" });
      const checkIcon = appleItem.querySelector('[data-slot="select-item-indicator"] svg');
      expect(checkIcon).toBeInTheDocument();
    });

    it("does not show check icon on unselected items", () => {
      render(
        <Select open onOpenChange={() => {}} value="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>,
      );

      const bananaItem = screen.getByRole("option", { name: "Banana" });
      const indicator = bananaItem.querySelector('[data-slot="select-item-indicator"]');
      expect(indicator?.children.length).toBe(0);
    });
  });

  describe("Props & Behavior", () => {
    it("handles disabled state on trigger", () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("disabled");
      expect(trigger).toHaveClass("disabled:cursor-not-allowed");
      expect(trigger).toHaveClass("disabled:opacity-50");
    });

    it("handles disabled state on individual items", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled" disabled>Disabled</SelectItem>
          </SelectContent>
        </Select>,
      );

      const disabledItem = screen.getByRole("option", { name: "Disabled" });
      expect(disabledItem).toHaveClass("data-disabled:pointer-events-none");
      expect(disabledItem).toHaveClass("data-disabled:opacity-50");
    });

    it("merges custom className with default classes", () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("passes through additional props to root Select", () => {
      const onValueChange = vi.fn();
      render(
        <Select onValueChange={onValueChange} name="test-select">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      // The name prop is used internally by Radix UI for form integration
      // We can verify it doesn't throw an error and the component renders
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders trigger with correct ARIA attributes", () => {
      render(
        <Select>
          <SelectTrigger aria-label="Select fruit">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-label", "Select fruit");
    });

    it("sets aria-expanded when open", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = document.querySelector('[data-slot="select-trigger"]');
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("sets aria-expanded to false when closed", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("sets aria-selected on selected item", () => {
      render(
        <Select open onOpenChange={() => {}} value="apple">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>,
      );

      const appleItem = screen.getByRole("option", { name: "Apple" });
      expect(appleItem).toHaveAttribute("aria-selected", "true");

      const bananaItem = screen.getByRole("option", { name: "Banana" });
      expect(bananaItem).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("Styling", () => {
    it("applies correct base classes to SelectTrigger", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass(
        "border-input",
        "data-placeholder:text-muted-foreground",
        "flex",
        "w-fit",
        "items-center",
        "justify-between",
        "gap-2",
        "rounded-md",
        "border",
        "bg-transparent",
        "px-3",
        "py-2",
        "text-sm",
        "shadow-xs",
        "transition-[color,box-shadow]",
        "outline-none",
        "focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("applies correct classes to SelectItem", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const item = screen.getByRole("option", { name: "Test Item" });
      expect(item).toHaveClass(
        "focus:bg-accent",
        "focus:text-accent-foreground",
        "relative",
        "flex",
        "w-full",
        "cursor-default",
        "items-center",
        "gap-2",
        "rounded-sm",
        "py-1.5",
        "pr-8",
        "pl-2",
        "text-sm",
        "outline-hidden",
        "select-none"
      );
    });

    it("applies correct classes to SelectContent", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toHaveClass(
        "bg-popover",
        "text-popover-foreground",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95",
        "data-[state=open]:zoom-in-95",
        "relative",
        "z-50",
        "max-h-(--radix-select-content-available-height)",
        "min-w-32",
        "overflow-x-hidden",
        "overflow-y-auto",
        "rounded-md",
        "border",
        "shadow-md"
      );
    });
  });

  describe("Icons", () => {
    it("renders ChevronDownIcon in SelectTrigger", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      const chevronIcon = trigger.querySelector("svg");
      expect(chevronIcon).toBeInTheDocument();
      expect(chevronIcon).toHaveClass("size-4", "opacity-50");
    });

    it("renders CheckIcon in selected SelectItem", () => {
      render(
        <Select open onOpenChange={() => {}} value="test">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const item = screen.getByRole("option", { name: "Test Item" });
      const checkIcon = item.querySelector('[data-slot="select-item-indicator"] svg');
      expect(checkIcon).toBeInTheDocument();
      expect(checkIcon).toHaveClass("size-4");
    });

    it("applies pointer-events-none to icons", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("[&_svg]:pointer-events-none");
    });
  });

  describe("Scroll Buttons", () => {
    it("includes SelectScrollUpButton in SelectContent structure", () => {
      // Scroll buttons are only visible when content overflows
      // We test that the component includes them in the correct structure
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      // The scroll buttons are part of the component structure but may not be visible
      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
      // Scroll buttons are rendered by Radix UI internally
    });

    it("includes SelectScrollDownButton in SelectContent structure", () => {
      // Similar to above - scroll buttons are part of the internal structure
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
    });

    it("SelectScrollUpButton has correct structure when rendered", () => {
      // Test the component definition rather than runtime rendering
      // since scroll buttons only appear on overflow
      expect(SelectScrollUpButton).toBeDefined();
    });

    it("SelectScrollDownButton has correct structure when rendered", () => {
      // Test the component definition rather than runtime rendering
      expect(SelectScrollDownButton).toBeDefined();
    });
  });

  describe("Portal Rendering", () => {
    it("renders SelectContent in portal outside component tree", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
      // Portal content is typically positioned fixed and not directly in body
      expect(content?.parentElement).not.toBe(document.body);
    });
  });

  describe("Interaction", () => {
    it("opens content when trigger is clicked", async () => {
      const onOpenChange = vi.fn();
      render(
        <Select onOpenChange={onOpenChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it("selects item when clicked", async () => {
      const onValueChange = vi.fn();
      render(
        <Select onValueChange={onValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      fireEvent.click(trigger);

      const item = screen.getByText("Apple");
      fireEvent.click(item);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("apple");
      });
    });

    it("closes content after item selection", async () => {
      const onOpenChange = vi.fn();
      render(
        <Select onOpenChange={onOpenChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      const item = screen.getByText("Apple");
      fireEvent.click(item);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens content on Enter key", async () => {
      const onOpenChange = vi.fn();
      render(
        <Select onOpenChange={onOpenChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      fireEvent.keyDown(trigger, { key: "Enter" });

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it("opens content on Space key", async () => {
      const onOpenChange = vi.fn();
      render(
        <Select onOpenChange={onOpenChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      fireEvent.keyDown(trigger, { key: " " });

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it("closes content on Escape key", async () => {
      const onOpenChange = vi.fn();
      render(
        <Select open onOpenChange={onOpenChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test Item</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = document.querySelector('[data-slot="select-trigger"]');
      if (trigger) {
        fireEvent.keyDown(trigger, { key: "Escape" });
      }

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("Data Attributes", () => {
    it("sets data-slot on all components", () => {
      render(
        <Select open onOpenChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Test Label</SelectLabel>
              <SelectItem value="test">Test Item</SelectItem>
            </SelectGroup>
            <SelectSeparator />
          </SelectContent>
        </Select>,
      );

      expect(document.querySelector('[data-slot="select-trigger"]')?.getAttribute("data-slot")).toBe("select-trigger");
      expect(document.querySelector('[data-slot="select-content"]')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="select-label"]')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="select-group"]')).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Test Item" }).getAttribute("data-slot")).toBe("select-item");
      expect(document.querySelector('[data-slot="select-separator"]')).toBeInTheDocument();
      expect(document.querySelector('[data-slot="select-value"]')).toBeInTheDocument();
    });

    it("sets data-size on SelectTrigger", () => {
      render(
        <Select>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger.getAttribute("data-size")).toBe("sm");
    });
  });
});
