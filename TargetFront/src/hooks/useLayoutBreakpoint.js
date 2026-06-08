import { Grid } from "antd";

export function useLayoutBreakpoint() {
  const screens = Grid.useBreakpoint();
  const isMobile = screens.lg !== true;
  const isTablet = screens.md === true && screens.lg !== true;

  return { isMobile, isTablet, isDesktop: screens.lg === true, screens };
}
