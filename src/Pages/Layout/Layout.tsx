import { Outlet } from "react-router-dom";
import { Header } from "Components/Header/Header";
import { useThemeProvider } from "providers/ThemeProvider";

export const Layout = () => {
  const { isDarkTheme } = useThemeProvider();

  return (
    <div id="app-body" data-theme={isDarkTheme ? "dark" : "light"}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
