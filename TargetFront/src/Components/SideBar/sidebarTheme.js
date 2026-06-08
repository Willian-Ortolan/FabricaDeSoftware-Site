export const SIDEBAR_GRADIENT =
  "linear-gradient(180deg, #0b1f4a 0%, #0f2760 45%, #102a6b 100%)";

export const SIDEBAR_WIDTH = 260;

/** Evita marcar Home quando a rota é /e/:slug/servicos etc. */
export function resolveMenuSelectedKey(pathname, items, homeKey) {
  const current = pathname.replace(/\/$/, "") || "/";
  const home = homeKey.replace(/\/$/, "") || "/";

  const nested = items.find((item) => {
    const key = item.key.replace(/\/$/, "") || "/";
    if (key === home) return false;
    return current === key || current.startsWith(`${key}/`);
  });

  if (nested) return nested.key;
  if (current === home) return homeKey;

  return homeKey;
}
