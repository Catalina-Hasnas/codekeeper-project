import React, { ReactElement } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Router>{children}</Router>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
