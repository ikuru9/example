import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  describe("Rendering", () => {
    it("renders switch with root and thumb data-slots", () => {
      render(<Switch aria-label="Toggle" />);

      const root = screen.getByRole("switch", { name: "Toggle" });
      const thumb = root.querySelector('[data-slot="switch-thumb"]');

      expect(root.getAttribute("data-slot")).toBe("switch");
      expect(thumb).toBeInTheDocument();
    });

    it("renders with default unchecked state", () => {
      render(<Switch aria-label="Notifications" />);

      const control = screen.getByRole("switch", { name: "Notifications" });
      expect(control.getAttribute("data-state")).toBe("unchecked");
    });

    it("renders with checked state when defaultChecked", () => {
      render(<Switch defaultChecked aria-label="Enabled" />);

      const control = screen.getByRole("switch", { name: "Enabled" });
      expect(control.getAttribute("data-state")).toBe("checked");
    });
  });

  describe("States", () => {
    it("displays unchecked state styling", () => {
      render(<Switch aria-label="Switch" />);

      const root = screen.getByRole("switch");
      const thumb = root.querySelector('[data-slot="switch-thumb"]');

      expect(root).toHaveClass("data-[state=unchecked]:bg-input");
      expect(thumb).toHaveClass("data-[state=unchecked]:translate-x-0");
    });

    it("displays checked state styling", () => {
      render(<Switch defaultChecked aria-label="Switch" />);

      const root = screen.getByRole("switch");
      const thumb = root.querySelector('[data-slot="switch-thumb"]');

      expect(root).toHaveClass("data-[state=checked]:bg-primary");
      expect(thumb).toHaveClass("data-[state=checked]:translate-x-[calc(100%-2px)]");
    });

    it("toggles state when clicked", () => {
      render(<Switch aria-label="Toggle" />);

      const control = screen.getByRole("switch");
      expect(control.getAttribute("data-state")).toBe("unchecked");

      fireEvent.click(control);
      expect(control.getAttribute("data-state")).toBe("checked");

      fireEvent.click(control);
      expect(control.getAttribute("data-state")).toBe("unchecked");
    });
  });

  describe("Props & Behavior", () => {
    it("calls onCheckedChange when state changes", () => {
      const handleCheckedChange = vi.fn();
      render(<Switch onCheckedChange={handleCheckedChange} aria-label="Switch" />);

      const control = screen.getByRole("switch");
      fireEvent.click(control);

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    });

    it("merges className with base classes", () => {
      render(<Switch className="custom-class" aria-label="Switch" />);

      const root = screen.getByRole("switch");
      expect(root).toHaveClass("custom-class");
      expect(root).toHaveClass("inline-flex");
    });

    it("handles disabled state", () => {
      render(<Switch disabled aria-label="Disabled Switch" />);

      const control = screen.getByRole("switch");
      expect(control).toBeDisabled();
      expect(control).toHaveClass("disabled:cursor-not-allowed");
      expect(control).toHaveClass("disabled:opacity-50");
    });

    it("prevents interaction when disabled", () => {
      const handleCheckedChange = vi.fn();
      render(<Switch disabled onCheckedChange={handleCheckedChange} aria-label="Disabled" />);

      const control = screen.getByRole("switch");
      fireEvent.click(control);

      expect(handleCheckedChange).not.toHaveBeenCalled();
      expect(control.getAttribute("data-state")).toBe("unchecked");
    });

    it("passes through additional props", () => {
      render(<Switch id="test-switch" aria-label="Switch" />);

      const control = screen.getByRole("switch");
      expect(control).toHaveAttribute("id", "test-switch");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(<Switch aria-label="Toggle Setting" />);

      const control = screen.getByRole("switch", { name: "Toggle Setting" });
      expect(control).toHaveAttribute("role", "switch");
      expect(control).toHaveAttribute("aria-checked", "false");
    });

    it("updates aria-checked when state changes", () => {
      render(<Switch aria-label="Switch" />);

      const control = screen.getByRole("switch");
      expect(control).toHaveAttribute("aria-checked", "false");

      fireEvent.click(control);
      expect(control).toHaveAttribute("aria-checked", "true");

      fireEvent.click(control);
      expect(control).toHaveAttribute("aria-checked", "false");
    });

    it("has keyboard focus support", () => {
      render(<Switch aria-label="Keyboard Switch" />);

      const control = screen.getByRole("switch");
      control.focus();

      expect(document.activeElement).toBe(control);
    });
  });

  describe("Styling", () => {
    it("applies focus-visible ring on keyboard focus", () => {
      render(<Switch aria-label="Focus Switch" />);

      const control = screen.getByRole("switch");
      expect(control).toHaveClass("focus-visible:ring-[3px]");
      expect(control).toHaveClass("focus-visible:ring-ring/50");
    });

    it("has correct size classes", () => {
      render(<Switch aria-label="Size Switch" />);

      const root = screen.getByRole("switch");
      expect(root).toHaveClass("h-[1.15rem]");
      expect(root).toHaveClass("w-8");
    });

    it("thumb has correct size and styling", () => {
      render(<Switch aria-label="Thumb Switch" />);

      const thumb = screen.getByRole("switch").querySelector('[data-slot="switch-thumb"]');
      expect(thumb).toHaveClass("size-4");
      expect(thumb).toHaveClass("rounded-full");
      expect(thumb).toHaveClass("ring-0");
    });

    it("applies dark mode classes", () => {
      render(<Switch aria-label="Dark Switch" />);

      const root = screen.getByRole("switch");
      const thumb = root.querySelector('[data-slot="switch-thumb"]');

      expect(root).toHaveClass("dark:data-[state=unchecked]:bg-input/80");
      expect(thumb).toHaveClass("dark:data-[state=unchecked]:bg-foreground");
      expect(thumb).toHaveClass("dark:data-[state=checked]:bg-primary-foreground");
    });
  });

  describe("Interaction", () => {
    it("toggles on click", () => {
      render(<Switch aria-label="Click Switch" />);

      const control = screen.getByRole("switch");
      expect(control.getAttribute("aria-checked")).toBe("false");

      fireEvent.click(control);
      expect(control.getAttribute("aria-checked")).toBe("true");
    });

    it("maintains controlled state", () => {
      const { rerender } = render(<Switch checked={false} aria-label="Controlled" />);

      const control = screen.getByRole("switch");
      expect(control.getAttribute("aria-checked")).toBe("false");

      rerender(<Switch checked={true} aria-label="Controlled" />);
      expect(control.getAttribute("aria-checked")).toBe("true");
    });

    it("calls onCheckedChange with controlled component", () => {
      const handleCheckedChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={handleCheckedChange} aria-label="Controlled" />);

      const control = screen.getByRole("switch");
      fireEvent.click(control);

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });
  });
});
