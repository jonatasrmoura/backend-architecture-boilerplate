export function maskDocument(document?: string | null): string {
  if (!document) return "";

  const cleanDocument = document.replace(/\D/g, "");

  if (cleanDocument.length !== 11) {
    return document;
  }

  const firstDigits = cleanDocument.slice(0, 3);
  const lastDigits = cleanDocument.slice(-2);

  return `${firstDigits}.***.***-${lastDigits}`;
}
