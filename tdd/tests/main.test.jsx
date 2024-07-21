import { it, expect, describe } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { usd_to_mmk } from "../libs/math";
import App from "../src/App";

describe("math test", () => {
  it("should be 4752.1", () => {
    expect(usd_to_mmk(1)).toBe(4752.1);
  });

  it("should be 16394.75", () => {
    expect(usd_to_mmk(3.45)).toBe(16394.75);
  });

  it("should be 4100", () => {
    expect(usd_to_mmk(1, 4100)).toBe(4100);
  });
});

describe("UI test", () => {
  render(<App />);

  it("should render correctly", () => {
    expect(screen.getByRole("title")).toBeInTheDocument();
  });

  it("should show correct result", async () => {
    await fireEvent.change(screen.getByRole("input"), {
      target: { value: "3.45" },
    });

    await fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("result").textContent).toBe("16394.75");
  });
});
