export function formatDate(dateString: Date | string) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export function removeMaliciousScripts(input: string): string {
  const scriptTagRegex =
    /<\s*script\b[^>]*>[\s\S]*?<\/\s*script\s*>|<\s*script[^>]*\/\s*>|^\s*script\s*\/?>/gis;
  return input.replace(scriptTagRegex, "");
}

export function formatFileSize(size?: number): string {
  if (!size) return "0 B";

  if (size >= 1_000_000) {
    return `${(size / 1_000_000).toFixed(1)} MB`;
  }
  if (size >= 1_000) {
    return `${(size / 1_000).toFixed(1)} kB`;
  }
  return `${size} B`;
}
