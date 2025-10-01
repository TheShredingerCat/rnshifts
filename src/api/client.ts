export async function fetchShifts(lat: number, lon: number) {
  const url = `https://mobile.handswork.pro/api/shift?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
