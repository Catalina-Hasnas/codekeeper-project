import { ReactElement, ReactNode } from "react";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { SWRConfig } from "swr";
import { fetcher } from "utils/fetcher";

afterEach(() => {
  cleanup();
});

const Wrapper = ({
  children,
  initialEntries,
}: {
  children: ReactNode;
  initialEntries?: string[];
}) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        dedupingInterval: 0,
      }}
    >
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { initialEntries: string[] }
) =>
  render(ui, {
    wrapper: (props) => (
      <Wrapper {...props} initialEntries={options?.initialEntries} />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
