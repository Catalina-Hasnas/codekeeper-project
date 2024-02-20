import { ReactElement, ReactNode } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { afterEach } from "vitest";
import { SWRConfig } from "swr";
import { fetcher } from "utils/fetcher";

afterEach(() => {
  cleanup();
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        dedupingInterval: 0,
        provider: () => new Map(),
      }}
    >
      <Router>{children}</Router>
    </SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
