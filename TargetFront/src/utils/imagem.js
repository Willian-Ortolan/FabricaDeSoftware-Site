export function getApiOrigin() {
  const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:7289/api";
  return apiUrl.replace(/\/api\/?$/, "");
}

export function resolveImagemUrl(img) {
  if (!img) return null;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const origin = getApiOrigin();
  return `${origin}${img.startsWith("/") ? img : `/${img}`}`;
}
