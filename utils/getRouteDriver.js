import * as turf from '@turf/turf';

/**
 * Crop remaining route based on live driver position
 * @param {Array<[number, number]>} fullRoute - LineString geometry from Mapbox Directions
 * @param {[number, number]} driverPosition - Live driver location
 * @param {[number, number]} destination - Final endpoint
 * @returns {Array<[number, number]>} sliced route coordinates
 */
export function cropRoute(fullRoute, driverPosition, destination) {
  try {
    const line = turf.lineString(fullRoute);
    const driverPoint = turf.point(driverPosition);
    const destPoint = turf.point(destination);

    // Cari titik di jalur yang paling dekat dengan lokasi driver saat ini
    const snapped = turf.nearestPointOnLine(line, driverPoint);

    // Slice dari titik terdekat → tujuan akhir
    const sliced = turf.lineSlice(snapped, destPoint, line);

    return sliced.geometry.coordinates;
  } catch (e) {
    console.log("Error cropping route: ", e);
    return fullRoute; // fallback — tetap tampilkan seluruh route jika error
  }
}
