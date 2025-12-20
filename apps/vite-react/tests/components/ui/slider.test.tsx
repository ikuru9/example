import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "@/components/ui/slider";

describe("Slider", () => {
  describe("Rendering", () => {
    it("renders basic slider with all data-slots", () => {
      const { container } = render(<Slider />);

      const root = container.querySelector('[data-slot="slider"]');
      const track = container.querySelector('[data-slot="slider-track"]');
      const range = container.querySelector('[data-slot="slider-range"]');
      const thumb = container.querySelector('[data-slot="slider-thumb"]');

      expect(root).toBeInTheDocument();
      expect(track).toBeInTheDocument();
      expect(range).toBeInTheDocument();
      expect(thumb).toBeInTheDocument();
    });

    it("renders single thumb for single value", () => {
      const { container } = render(<Slider defaultValue={[50]} />);

      const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
      expect(thumbs.length).toBe(1);
    });

    it("renders multiple thumbs for array value", () => {
      const { container } = render(<Slider defaultValue={[20, 80]} />);

      const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
      expect(thumbs.length).toBe(2);
    });

    it("renders thumbs based on computed values length", () => {
      const { container } = render(<Slider min={10} max={90} />);

      const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
      expect(thumbs.length).toBe(2);
    });
  });

  describe("Value & Range", () => {
    it("handles min and max constraints", () => {
      const onValueChange = vi.fn();
      render(<Slider min={10} max={90} value={[50]} onValueChange={onValueChange} />);

      const root = screen.getByRole("slider");
      expect(root).toHaveAttribute("aria-valuemin", "10");
      expect(root).toHaveAttribute("aria-valuemax", "90");
    });

    it("displays correct aria-valuenow for single value", () => {
      render(<Slider value={[75]} />);

      const root = screen.getByRole("slider");
      expect(root).toHaveAttribute("aria-valuenow", "75");
    });

    it("calls onValueChange with new value", () => {
      const onValueChange = vi.fn();
      render(<Slider value={[50]} onValueChange={onValueChange} />);

      const root = screen.getByRole("slider");
      fireEvent.keyDown(root, { key: "ArrowRight" });

      expect(onValueChange).toHaveBeenCalled();
    });

    it("supports controlled behavior", () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState([50]);
        return <Slider value={value} onValueChange={setValue} />;
      };

      render(<TestComponent />);

      const root = screen.getByRole("slider");
      expect(root).toHaveAttribute("aria-valuenow", "50");
    });

    it("supports uncontrolled behavior with defaultValue", () => {
      render(<Slider defaultValue={[25]} />);

      const root = screen.getByRole("slider");
      expect(root).toHaveAttribute("aria-valuenow", "25");
    });
  });

  describe("Orientation", () => {
    it("applies horizontal orientation classes by default", () => {
      const { container } = render(<Slider />);

      const root = container.querySelector('[data-slot="slider"]');
      const track = container.querySelector('[data-slot="slider-track"]');
      const range = container.querySelector('[data-slot="slider-range"]');

      expect(root).toHaveAttribute("data-orientation", "horizontal");
      expect(track).toHaveAttribute("data-orientation", "horizontal");
      expect(range).toHaveAttribute("data-orientation", "horizontal");
    });

    it("applies vertical orientation when specified", () => {
      const { container } = render(<Slider orientation="vertical" />);

      const root = container.querySelector('[data-slot="slider"]');
      const track = container.querySelector('[data-slot="slider-track"]');
      const range = container.querySelector('[data-slot="slider-range"]');

      expect(root).toHaveAttribute("data-orientation", "vertical");
      expect(track).toHaveAttribute("data-orientation", "vertical");
      expect(range).toHaveAttribute("data-orientation", "vertical");
    });

    it("applies vertical layout classes", () => {
      const { container } = render(<Slider orientation="vertical" />);

      const root = container.querySelector('[data-slot="slider"]');
      expect(root).toHaveClass("data-[orientation=vertical]:h-full");
      expect(root).toHaveClass("data-[orientation=vertical]:min-h-44");
      expect(root).toHaveClass("data-[orientation=vertical]:w-auto");
      expect(root).toHaveClass("data-[orientation=vertical]:flex-col");
    });
  });

  describe("Props & Behavior", () => {
    it("merges className with base classes", () => {
      const { container } = render(<Slider className="custom-class" />);

      const root = container.querySelector('[data-slot="slider"]');
      expect(root).toHaveClass("custom-class");
      expect(root).toHaveClass("relative");
      expect(root).toHaveClass("flex");
    });

    it("passes through Radix props", () => {
      const onValueCommit = vi.fn();
      render(<Slider step={5} onValueCommit={onValueCommit} />);

      const root = screen.getByRole("slider");
      expect(root).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders with slider role", () => {
      render(<Slider />);

      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("has correct aria attributes for single thumb", () => {
      render(<Slider value={[40]} min={0} max={100} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
      expect(slider).toHaveAttribute("aria-valuenow", "40");
    });

    it("supports aria-label", () => {
      render(<Slider aria-label="Volume" />);

      const slider = screen.getByLabelText("Volume");
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies base slider classes", () => {
      const { container } = render(<Slider />);

      const root = container.querySelector('[data-slot="slider"]');
      expect(root).toHaveClass("relative");
      expect(root).toHaveClass("flex");
      expect(root).toHaveClass("w-full");
      expect(root).toHaveClass("touch-none");
      expect(root).toHaveClass("items-center");
    });

    it("applies track classes", () => {
      const { container } = render(<Slider />);

      const track = container.querySelector('[data-slot="slider-track"]');
      expect(track).toHaveClass("bg-muted");
      expect(track).toHaveClass("relative");
      expect(track).toHaveClass("grow");
      expect(track).toHaveClass("overflow-hidden");
      expect(track).toHaveClass("rounded-full");
    });

    it("applies range classes", () => {
      const { container } = render(<Slider />);

      const range = container.querySelector('[data-slot="slider-range"]');
      expect(range).toHaveClass("bg-primary");
      expect(range).toHaveClass("absolute");
    });

    it("applies thumb classes", () => {
      const { container } = render(<Slider />);

      const thumb = container.querySelector('[data-slot="slider-thumb"]');
      expect(thumb).toHaveClass("border-primary");
      expect(thumb).toHaveClass("ring-ring/50");
      expect(thumb).toHaveClass("block");
      expect(thumb).toHaveClass("size-4");
      expect(thumb).toHaveClass("shrink-0");
      expect(thumb).toHaveClass("rounded-full");
      expect(thumb).toHaveClass("border");
      expect(thumb).toHaveClass("bg-white");
      expect(thumb).toHaveClass("shadow-sm");
    });
  });

  describe("Interaction", () => {
    it("supports keyboard navigation", () => {
      const onValueChange = vi.fn();
      render(<Slider value={[50]} onValueChange={onValueChange} />);

      const slider = screen.getByRole("slider");
      fireEvent.keyDown(slider, { key: "ArrowRight" });

      expect(onValueChange).toHaveBeenCalled();
    });

    it("shows focus ring on thumb focus", () => {
      const { container } = render(<Slider />);

      const thumb = container.querySelector('[data-slot="slider-thumb"]') as HTMLElement;
      fireEvent.focus(thumb);

      expect(thumb).toHaveClass("focus-visible:ring-4");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styling", () => {
      const { container } = render(<Slider disabled />);

      const root = container.querySelector('[data-slot="slider"]');
      expect(root).toHaveClass("data-disabled:opacity-50");
    });

    it("disables thumbs", () => {
      const { container } = render(<Slider disabled />);

      const thumb = container.querySelector('[data-slot="slider-thumb"]');
      expect(thumb).toHaveClass("disabled:pointer-events-none");
      expect(thumb).toHaveClass("disabled:opacity-50");
    });

    it("sets data-disabled attribute", () => {
      const { container } = render(<Slider disabled />);

      const root = container.querySelector('[data-slot="slider"]');
      const track = container.querySelector('[data-slot="slider-track"]');
      const range = container.querySelector('[data-slot="slider-range"]');
      const thumb = container.querySelector('[data-slot="slider-thumb"]');

      expect(root).toHaveAttribute("data-disabled");
      expect(track).toHaveAttribute("data-disabled");
      expect(range).toHaveAttribute("data-disabled");
      expect(thumb).toHaveAttribute("data-disabled");
    });
  });

  describe("Data Attributes", () => {
    it("sets data-slot attributes correctly", () => {
      const { container } = render(<Slider />);

      expect(container.querySelector('[data-slot="slider"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="slider-track"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="slider-range"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="slider-thumb"]')).toBeInTheDocument();
    });
  });
});
