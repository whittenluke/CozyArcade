export function getGravatarUrl(email: string, size = 200): string {
  const emailHash = btoa(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`;
} 