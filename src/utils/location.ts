import Geolocation from "react-native-geolocation-service";
import { check, request, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions";
import { Platform } from "react-native";

export async function ensureLocationPermission(): Promise<boolean> {
  const perm =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const status = await check(perm);
  if (status === RESULTS.GRANTED) return true;

  const r = await request(perm);
  if (r === RESULTS.GRANTED) return true;

  if (r === RESULTS.BLOCKED) {
    await openSettings();
  }
  return false;
}

export function getCurrentPosition(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}
