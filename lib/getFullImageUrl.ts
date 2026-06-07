export const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${apiBase}${url.startsWith("/") ? "" : "/"}${url}`;
};
