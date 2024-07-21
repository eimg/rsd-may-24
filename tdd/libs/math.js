const rate = 4752.1;

export function usd_to_mmk(usd, r = 0) {
  if (r) {
    return Number((usd * r).toFixed(2));
  }

  return Number((usd * rate).toFixed(2));
}
