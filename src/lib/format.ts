export function formatClp(value: number, decimals = 0): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatSignedClp(
  value: number,
  sign: "+" | "-" | "=" | "base",
): string {
  const formatted = formatClp(value);

  return sign === "-" ? `(${formatted})` : formatted;
}
