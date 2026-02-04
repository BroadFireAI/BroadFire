import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PointCloudGlobeProps {
  className?: string;
}

// Simplified world coastline coordinates (lat, lng pairs)
// This is a condensed dataset - in production you'd load GeoJSON
const COASTLINE_POINTS: [number, number][] = [
  // North America West Coast
  [48.5, -124.5],
  [47.5, -124.2],
  [46.2, -124.0],
  [45.0, -124.0],
  [43.5, -124.3],
  [42.0, -124.4],
  [41.0, -124.2],
  [40.0, -124.3],
  [39.0, -123.7],
  [38.0, -123.0],
  [37.5, -122.5],
  [36.5, -122.0],
  [35.5, -121.0],
  [34.5, -120.5],
  [34.0, -119.5],
  [33.5, -118.0],
  [33.0, -117.5],
  [32.5, -117.2],
  [31.5, -116.5],
  [30.0, -115.5],
  [28.5, -114.0],
  [27.0, -113.0],
  [25.0, -112.0],
  [23.5, -110.5],
  [22.5, -109.5],
  // North America East Coast
  [45.0, -66.5],
  [44.5, -67.5],
  [43.5, -70.0],
  [42.5, -70.5],
  [42.0, -71.0],
  [41.5, -71.0],
  [41.0, -72.0],
  [40.5, -74.0],
  [39.5, -74.5],
  [38.5, -75.0],
  [37.5, -76.0],
  [36.5, -76.0],
  [35.5, -75.5],
  [34.5, -77.5],
  [33.5, -79.0],
  [32.0, -80.5],
  [31.0, -81.5],
  [30.0, -81.5],
  [29.0, -81.0],
  [28.0, -80.5],
  [27.0, -80.0],
  [26.0, -80.0],
  [25.5, -80.5],
  [25.0, -81.0],
  // Gulf of Mexico
  [30.0, -88.0],
  [29.5, -89.5],
  [29.0, -90.0],
  [29.5, -93.0],
  [29.0, -95.0],
  [28.0, -97.0],
  [26.5, -97.5],
  [25.5, -97.0],
  [23.0, -98.0],
  [21.5, -97.5],
  [20.0, -96.5],
  [19.0, -96.0],
  [18.5, -95.0],
  [18.0, -94.5],
  // Central America
  [16.0, -95.0],
  [15.0, -93.0],
  [14.0, -91.0],
  [13.5, -90.0],
  [13.0, -88.0],
  [12.0, -87.0],
  [11.0, -86.0],
  [10.0, -85.5],
  [9.5, -84.5],
  [9.0, -83.5],
  [8.5, -82.5],
  [8.0, -81.0],
  [9.0, -79.5],
  [8.5, -78.0],
  [7.5, -77.5],
  // South America West Coast
  [6.0, -77.0],
  [4.0, -77.5],
  [2.0, -79.0],
  [0.0, -80.0],
  [-2.0, -80.5],
  [-4.0, -81.0],
  [-6.0, -81.0],
  [-8.0, -79.5],
  [-10.0, -78.5],
  [-12.0, -77.0],
  [-14.0, -76.5],
  [-16.0, -73.5],
  [-18.0, -71.0],
  [-20.0, -70.5],
  [-22.0, -70.5],
  [-24.0, -70.5],
  [-27.0, -71.0],
  [-30.0, -71.5],
  [-33.0, -72.0],
  [-36.0, -73.0],
  [-39.0, -73.5],
  [-42.0, -74.0],
  [-45.0, -75.5],
  [-48.0, -75.5],
  [-51.0, -74.0],
  [-53.0, -71.0],
  [-55.0, -68.0],
  // South America East Coast
  [5.0, -60.0],
  [4.0, -52.0],
  [2.0, -50.0],
  [0.0, -49.5],
  [-2.0, -44.0],
  [-4.0, -38.5],
  [-6.0, -35.0],
  [-8.0, -35.0],
  [-10.0, -37.0],
  [-13.0, -38.5],
  [-15.0, -39.0],
  [-18.0, -39.5],
  [-20.0, -40.5],
  [-22.0, -41.0],
  [-23.0, -43.0],
  [-25.0, -47.5],
  [-28.0, -48.5],
  [-30.0, -50.0],
  [-32.0, -52.0],
  [-34.0, -53.5],
  [-36.0, -56.5],
  [-38.0, -57.5],
  [-40.0, -62.0],
  [-42.0, -64.0],
  [-45.0, -66.0],
  [-48.0, -66.0],
  [-51.0, -69.0],
  [-53.0, -68.0],
  // Europe West Coast
  [58.5, -5.0],
  [57.0, -7.0],
  [55.0, -8.0],
  [53.5, -10.0],
  [52.0, -10.5],
  [51.5, -10.0],
  [51.0, -9.5],
  [50.0, -5.5],
  [49.5, -1.5],
  [48.5, -5.0],
  [47.5, -3.0],
  [46.5, -2.0],
  [45.5, -1.5],
  [44.5, -1.5],
  [43.5, -2.0],
  [43.0, -3.0],
  [43.5, -8.5],
  [42.0, -9.0],
  [41.0, -9.0],
  [39.5, -9.5],
  [38.0, -9.0],
  [37.0, -8.5],
  [36.5, -6.5],
  [36.0, -5.5],
  // Mediterranean
  [36.5, -2.5],
  [37.5, -1.0],
  [38.0, 0.0],
  [39.0, 0.5],
  [40.5, 0.5],
  [41.5, 2.0],
  [42.5, 3.0],
  [43.0, 5.0],
  [43.5, 7.0],
  [44.0, 8.5],
  [43.5, 10.0],
  [42.5, 11.0],
  [41.5, 12.5],
  [40.5, 14.0],
  [40.0, 15.5],
  [39.0, 17.0],
  [38.0, 16.0],
  [37.5, 15.0],
  [37.0, 15.5],
  [36.5, 14.5],
  [35.5, 12.5],
  [33.5, 11.0],
  [32.5, 13.0],
  [31.5, 16.0],
  [31.0, 20.0],
  [31.5, 25.0],
  [31.5, 27.5],
  [31.0, 30.0],
  [31.5, 32.0],
  [32.5, 34.0],
  [33.5, 35.5],
  [34.5, 36.0],
  [36.0, 36.0],
  [36.5, 35.0],
  [37.0, 36.5],
  [38.0, 38.5],
  [39.5, 40.0],
  [41.0, 41.5],
  [42.0, 41.0],
  [43.0, 39.5],
  [44.0, 38.0],
  [45.0, 36.0],
  [45.5, 35.0],
  [45.5, 31.0],
  [46.0, 30.0],
  // Northern Europe
  [70.0, 28.0],
  [71.0, 25.0],
  [70.0, 22.0],
  [69.5, 18.5],
  [68.5, 16.0],
  [67.5, 15.0],
  [66.0, 14.0],
  [65.0, 12.0],
  [63.5, 10.0],
  [62.0, 6.0],
  [61.0, 5.0],
  [59.5, 5.5],
  [58.5, 6.0],
  [58.0, 8.0],
  [57.5, 10.0],
  [56.5, 11.0],
  [55.5, 10.0],
  [55.0, 8.5],
  [54.0, 9.0],
  [54.5, 11.0],
  // Africa West Coast
  [35.5, -6.0],
  [34.0, -6.5],
  [32.5, -9.0],
  [31.0, -10.0],
  [29.0, -10.5],
  [27.5, -13.5],
  [25.5, -15.0],
  [23.5, -16.5],
  [21.5, -17.0],
  [19.5, -17.0],
  [17.5, -16.5],
  [15.5, -17.0],
  [14.0, -17.5],
  [13.0, -17.0],
  [11.5, -16.5],
  [10.5, -15.5],
  [9.5, -14.0],
  [8.5, -13.5],
  [7.5, -13.0],
  [6.5, -11.5],
  [5.0, -9.0],
  [4.5, -7.5],
  [5.5, -5.0],
  [5.0, -3.0],
  [5.5, -1.0],
  [6.0, 1.0],
  [4.5, 2.0],
  [4.0, 5.0],
  [4.5, 8.0],
  [6.0, 10.5],
  // Africa South and East
  [4.0, 9.0],
  [2.0, 9.5],
  [0.0, 9.5],
  [-2.0, 10.0],
  [-4.5, 12.0],
  [-6.0, 12.5],
  [-10.0, 14.0],
  [-13.0, 13.0],
  [-15.5, 12.0],
  [-17.5, 11.5],
  [-20.0, 13.5],
  [-22.5, 14.5],
  [-25.0, 14.5],
  [-27.5, 15.5],
  [-30.0, 17.0],
  [-32.5, 18.0],
  [-34.0, 18.5],
  [-34.5, 20.0],
  [-34.0, 22.5],
  [-33.5, 26.0],
  [-32.0, 29.0],
  [-30.0, 31.0],
  [-28.5, 32.5],
  [-26.0, 33.0],
  [-23.5, 35.5],
  [-20.0, 37.5],
  [-16.5, 39.0],
  [-12.0, 41.0],
  [-7.0, 40.0],
  [-3.0, 40.5],
  [0.0, 42.5],
  [3.0, 43.5],
  [5.0, 44.5],
  [8.0, 47.0],
  [10.0, 51.0],
  [11.5, 51.0],
  [12.0, 45.0],
  [11.5, 43.0],
  [10.5, 40.0],
  // Middle East and India
  [30.0, 48.0],
  [29.5, 50.0],
  [27.0, 51.5],
  [26.0, 50.5],
  [25.0, 52.0],
  [24.0, 54.0],
  [23.5, 58.5],
  [22.5, 60.0],
  [25.0, 61.5],
  [25.5, 62.5],
  [26.5, 63.0],
  [25.0, 65.0],
  [24.0, 67.0],
  [23.5, 68.0],
  [22.0, 69.0],
  [21.0, 72.5],
  [20.0, 73.0],
  [19.0, 73.0],
  [18.0, 73.0],
  [16.5, 73.5],
  [15.0, 74.0],
  [14.0, 74.5],
  [13.0, 74.5],
  [12.0, 75.0],
  [10.5, 76.0],
  [9.0, 76.5],
  [8.0, 77.5],
  [8.5, 79.5],
  [10.0, 79.5],
  [11.5, 80.0],
  [13.0, 80.5],
  [14.5, 80.0],
  [16.0, 81.5],
  [18.0, 83.5],
  [19.5, 85.0],
  [21.0, 87.0],
  [22.0, 88.5],
  [22.5, 89.0],
  [21.5, 90.0],
  [22.0, 91.5],
  [23.5, 91.0],
  [24.0, 92.0],
  [25.0, 93.0],
  // Southeast Asia
  [20.5, 93.0],
  [18.0, 94.5],
  [16.0, 94.5],
  [15.0, 98.0],
  [12.5, 99.5],
  [10.0, 99.0],
  [8.0, 99.0],
  [7.0, 100.5],
  [6.0, 101.0],
  [4.0, 103.5],
  [2.0, 103.5],
  [1.0, 104.0],
  [1.5, 104.5],
  [3.0, 106.0],
  [4.0, 108.0],
  [7.0, 109.5],
  [10.0, 109.0],
  [12.0, 109.0],
  [14.0, 109.5],
  [16.0, 108.0],
  [17.5, 107.0],
  [19.0, 106.0],
  [20.5, 106.5],
  [21.5, 108.0],
  [21.5, 110.5],
  [20.0, 110.5],
  [18.0, 109.5],
  [16.0, 108.5],
  [11.0, 107.0],
  [9.0, 105.5],
  [8.5, 104.5],
  [10.0, 104.5],
  [10.5, 107.0],
  [12.0, 109.0],
  // China and Korea
  [39.0, 117.5],
  [38.0, 118.5],
  [37.5, 119.5],
  [37.0, 122.5],
  [36.0, 120.5],
  [35.0, 119.5],
  [34.0, 120.0],
  [32.5, 121.5],
  [31.0, 122.0],
  [30.0, 122.5],
  [28.0, 121.5],
  [26.5, 120.0],
  [25.0, 119.0],
  [24.0, 118.0],
  [23.0, 117.0],
  [22.5, 114.0],
  [22.0, 113.5],
  [21.5, 110.5],
  [20.5, 110.0],
  [19.5, 109.0],
  // Japan
  [31.0, 131.0],
  [33.0, 130.0],
  [34.0, 131.0],
  [35.0, 132.5],
  [35.5, 134.0],
  [36.0, 136.0],
  [37.0, 137.0],
  [38.0, 138.5],
  [39.0, 140.0],
  [40.0, 140.0],
  [41.0, 140.5],
  [42.0, 140.0],
  [43.0, 141.5],
  [44.0, 145.0],
  [45.0, 142.0],
  [43.5, 145.5],
  [44.0, 146.0],
  // Australia
  [-12.0, 131.0],
  [-12.5, 132.5],
  [-13.5, 136.0],
  [-14.5, 136.5],
  [-15.0, 138.0],
  [-17.0, 140.5],
  [-17.5, 141.0],
  [-15.5, 145.0],
  [-16.5, 145.5],
  [-19.0, 146.5],
  [-21.0, 149.0],
  [-23.0, 150.5],
  [-25.0, 153.0],
  [-27.5, 153.5],
  [-30.0, 153.0],
  [-32.5, 152.5],
  [-34.0, 151.0],
  [-35.5, 150.5],
  [-37.0, 150.0],
  [-38.0, 145.0],
  [-38.5, 143.5],
  [-38.0, 141.0],
  [-36.5, 140.0],
  [-35.0, 137.0],
  [-34.5, 135.5],
  [-33.5, 134.0],
  [-32.5, 133.5],
  [-32.0, 132.5],
  [-32.5, 128.0],
  [-33.5, 121.0],
  [-34.0, 118.0],
  [-34.5, 116.0],
  [-32.0, 115.5],
  [-29.0, 114.5],
  [-26.5, 113.5],
  [-24.0, 113.5],
  [-22.5, 114.0],
  [-21.5, 115.0],
  [-20.0, 116.5],
  [-18.5, 122.0],
  [-16.0, 124.0],
  [-15.0, 125.0],
  [-14.0, 126.5],
  [-13.5, 129.5],
  [-12.5, 130.5],
  // New Zealand
  [-34.5, 173.0],
  [-35.5, 174.5],
  [-37.0, 175.5],
  [-38.5, 176.5],
  [-39.5, 177.0],
  [-41.0, 175.5],
  [-42.0, 173.5],
  [-43.5, 172.5],
  [-44.5, 171.0],
  [-45.5, 170.5],
  [-46.0, 168.0],
  [-45.0, 167.0],
  [-43.5, 169.5],
  [-42.5, 171.5],
  [-41.0, 174.0],
  // Russia Far East
  [64.0, 180.0],
  [65.0, 175.0],
  [66.0, 170.0],
  [67.0, 175.0],
  [68.5, 179.0],
  [66.0, -170.0],
  [64.5, -165.0],
  [63.0, -163.0],
  [61.0, -162.0],
  [59.0, -163.0],
  [57.0, -162.0],
  [55.5, -161.0],
  [55.0, -163.0],
  [54.0, -164.0],
  [53.0, -160.0],
  [52.0, -158.0],
  [51.5, -157.0],
  // Alaska
  [60.0, -147.0],
  [60.5, -145.0],
  [59.5, -140.0],
  [59.0, -138.0],
  [58.0, -136.0],
  [57.0, -135.5],
  [56.5, -133.5],
  [55.5, -132.0],
  [54.5, -130.5],
  // Arctic
  [71.0, -156.0],
  [71.5, -152.0],
  [70.5, -148.0],
  [70.0, -143.0],
  [69.5, -138.0],
  [69.0, -130.0],
  [70.0, -125.0],
  [72.0, -120.0],
  [73.0, -115.0],
  [74.0, -110.0],
  [75.0, -100.0],
  [76.0, -90.0],
  [75.0, -80.0],
  [73.0, -75.0],
  [71.0, -70.0],
  [69.0, -65.0],
  [67.5, -64.0],
  [66.0, -62.0],
  [64.0, -60.0],
  // Greenland
  [60.0, -43.0],
  [62.0, -42.0],
  [65.0, -40.0],
  [68.0, -33.0],
  [70.0, -27.0],
  [72.0, -23.0],
  [75.0, -20.0],
  [77.0, -18.0],
  [78.0, -20.0],
  [80.0, -25.0],
  [82.0, -30.0],
  [83.0, -35.0],
  [83.0, -45.0],
  [82.0, -50.0],
  [80.0, -55.0],
  [78.0, -60.0],
  [76.0, -65.0],
  [73.0, -58.0],
  [70.0, -54.0],
  [67.0, -50.0],
  [64.0, -50.0],
  [62.0, -48.0],
  [60.0, -45.0],
  // Iceland
  [66.0, -18.0],
  [65.5, -14.0],
  [64.5, -14.0],
  [64.0, -16.0],
  [64.0, -19.0],
  [64.5, -22.0],
  [65.5, -24.0],
  [66.5, -22.0],
  // British Isles
  [50.5, -5.0],
  [51.0, -3.0],
  [51.5, 0.0],
  [52.5, 1.5],
  [53.0, 0.0],
  [54.0, -0.5],
  [54.5, -1.5],
  [55.0, -1.5],
  [56.0, -2.5],
  [57.5, -4.0],
  [58.5, -3.0],
  [59.0, -3.0],
  [58.5, -5.0],
  [57.5, -7.0],
  // Philippines
  [18.5, 122.0],
  [16.0, 120.0],
  [14.0, 120.5],
  [12.5, 121.5],
  [11.0, 124.0],
  [9.5, 126.0],
  [7.5, 126.5],
  [6.0, 126.0],
  [6.0, 121.0],
  [8.0, 117.0],
  [10.0, 118.5],
  [12.0, 119.5],
  [14.5, 119.5],
  [17.0, 120.5],
  // Indonesia
  [5.0, 119.5],
  [2.0, 118.0],
  [0.0, 117.5],
  [-2.0, 116.0],
  [-3.5, 116.0],
  [-5.0, 119.0],
  [-6.0, 121.0],
  [-8.0, 122.5],
  [-8.5, 119.0],
  [-8.0, 115.0],
  [-7.5, 114.0],
  [-7.0, 110.5],
  [-6.5, 107.0],
  [-6.0, 106.0],
  [-6.5, 105.5],
  [-5.5, 105.0],
  [-3.0, 104.0],
  [-1.0, 102.0],
  [1.5, 101.0],
  [4.0, 100.0],
  // Madagascar
  [-12.0, 49.0],
  [-14.0, 48.0],
  [-16.0, 46.5],
  [-18.5, 44.0],
  [-21.0, 44.0],
  [-23.5, 44.5],
  [-25.0, 47.0],
  [-23.0, 48.0],
  [-20.0, 48.5],
  [-17.0, 49.5],
  [-14.0, 50.0],
];

// Generate more points along coastlines by interpolating
function generateCoastlinePoints(density: number = 3): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < COASTLINE_POINTS.length; i++) {
    const [lat, lng] = COASTLINE_POINTS[i];

    // Add the main point
    const pos = latLngToVector3(lat, lng, 2);
    points.push(pos);

    // Add interpolated points to next coordinate
    if (i < COASTLINE_POINTS.length - 1) {
      const [nextLat, nextLng] = COASTLINE_POINTS[i + 1];

      // Only interpolate if points are close enough (same coastline)
      const dist = Math.sqrt(Math.pow(nextLat - lat, 2) + Math.pow(nextLng - lng, 2));

      if (dist < 15) {
        // Skip if too far (different coastline segment)
        for (let j = 1; j < density; j++) {
          const t = j / density;
          const interpLat = lat + (nextLat - lat) * t;
          const interpLng = lng + (nextLng - lng) * t;
          points.push(latLngToVector3(interpLat, interpLng, 2));
        }
      }
    }
  }

  // Add some random ocean scatter points for depth
  for (let i = 0; i < 500; i++) {
    const lat = (Math.random() - 0.5) * 160;
    const lng = (Math.random() - 0.5) * 360;
    const pos = latLngToVector3(lat, lng, 2);
    // Only add if not too close to coastlines
    const closeToCoast = points.some((p) => p.distanceTo(pos) < 0.15);
    if (!closeToCoast) {
      points.push(pos);
    }
  }

  return points;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function vector3ToLatLng(point: THREE.Vector3): { lat: number; lng: number } {
  const radius = point.length();
  const lat = 90 - Math.acos(point.y / radius) * (180 / Math.PI);
  const lng = Math.atan2(point.z, -point.x) * (180 / Math.PI) - 180;

  return {
    lat: Math.round(lat * 100) / 100,
    lng: Math.round(((lng + 540) % 360) - 180 * 100) / 100,
  };
}

const PointCloudGlobe: React.FC<PointCloudGlobeProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const isZoomingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Use full viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera - full viewport aspect ratio
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer - full viewport size
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Generate coastline points
    const coastlinePoints = generateCoastlinePoints(4);
    const pointCount = coastlinePoints.length;

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const basePositions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const sizes = new Float32Array(pointCount);

    const baseColor = new THREE.Color('#1a1a1a');
    const coastColor = new THREE.Color('#3B82F6');

    coastlinePoints.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      basePositions[i * 3] = point.x;
      basePositions[i * 3 + 1] = point.y;
      basePositions[i * 3 + 2] = point.z;

      // Mix colors - coastline points are blue, scattered ocean points are darker
      const isCoastline = i < COASTLINE_POINTS.length * 4;
      const color = isCoastline ? coastColor : baseColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = isCoastline ? 1.5 : 0.8;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('basePosition', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector3(0, 0, 0) },
        bulgeRadius: { value: 0.8 },
        bulgeStrength: { value: 0.3 },
        hoverActive: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        warpProgress: { value: 0 },
        warpCenter: { value: new THREE.Vector3(0, 0, 1) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 basePosition;
        attribute vec3 color;

        uniform float time;
        uniform vec3 mousePosition;
        uniform float bulgeRadius;
        uniform float bulgeStrength;
        uniform float hoverActive;
        uniform float pixelRatio;
        uniform float warpProgress;
        uniform vec3 warpCenter;

        varying vec3 vColor;
        varying float vBulge;
        varying float vWarp;

        void main() {
          vec3 pos = basePosition;

          // Calculate distance from mouse position on sphere surface
          float dist = distance(pos, mousePosition);

          // Bulge effect
          float bulge = 0.0;
          if (dist < bulgeRadius && hoverActive > 0.5) {
            float t = 1.0 - (dist / bulgeRadius);
            bulge = t * t * bulgeStrength;

            // Push point outward along its normal (which is the normalized position for a sphere)
            vec3 normal = normalize(pos);
            pos = pos + normal * bulge;
          }

          vBulge = bulge;
          vColor = color;

          // Subtle breathing animation
          float breathe = sin(time * 0.5) * 0.01;
          pos = pos * (1.0 + breathe);

          // Warp effect - points fly toward camera and spread outward
          if (warpProgress > 0.0) {
            // Direction from point to camera (0,0,6)
            vec3 toCamera = vec3(0.0, 0.0, 6.0) - pos;
            float distToCamera = length(toCamera);
            vec3 warpDir = normalize(toCamera);

            // Points closer to camera move faster (creates parallax)
            float speed = 15.0 * (1.0 / (distToCamera * 0.5 + 0.5));

            // Move points toward and past camera
            pos = pos + warpDir * warpProgress * speed;

            // Spread points outward from center as they pass
            vec2 screenDir = normalize(pos.xy + vec2(0.001));
            float spreadAmount = warpProgress * warpProgress * 8.0;
            pos.xy += screenDir * spreadAmount * (1.0 - distToCamera * 0.1);
          }
          vWarp = warpProgress;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Points get larger during warp for streaking effect
          float warpSize = 1.0 + warpProgress * 3.0;
          gl_PointSize = size * pixelRatio * warpSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vBulge;
        varying float vWarp;

        void main() {
          // Circular point - elongate during warp
          vec2 center = gl_PointCoord - vec2(0.5);

          // Stretch toward center during warp
          float stretch = 1.0 + vWarp * 2.0;
          center.y *= stretch;

          float dist = length(center);
          if (dist > 0.5) discard;

          // Smooth edge
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

          // Color shift to pink/magenta when bulged, cyan/white when warping
          vec3 hoverColor = vec3(1.0, 0.41, 0.71); // Hot pink
          vec3 warpColor = vec3(0.5, 0.8, 1.0); // Cyan-white
          vec3 finalColor = mix(vColor, hoverColor, vBulge * 3.0);
          finalColor = mix(finalColor, warpColor, vWarp * 0.8);

          // Increase brightness during warp
          float warpAlpha = alpha * (0.9 + vWarp * 0.5);

          gl_FragColor = vec4(finalColor, warpAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Create crosshair lines
    const crosshairMaterial = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.15,
    });

    // Vertical line
    const vLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 3, 0),
    ]);
    const vLine = new THREE.Line(vLineGeom, crosshairMaterial);
    scene.add(vLine);

    // Horizontal line
    const hLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(3, 0, 0),
    ]);
    const hLine = new THREE.Line(hLineGeom, crosshairMaterial);
    scene.add(hLine);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const sphereForRaycast = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    scene.add(sphereForRaycast);

    let targetRotationY = 0;
    let currentRotationY = 0;
    let autoRotate = true;
    let zoomProgress = 0;
    let zoomDirection = 0; // 0 = none, 1 = in, -1 = out
    const _baseZoom = 6; // Reserved for future zoom functionality
    const _zoomedIn = 2; // Reserved for future zoom functionality
    void _baseZoom;
    void _zoomedIn;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(sphereForRaycast);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        material.uniforms.mousePosition.value.copy(point);
        material.uniforms.hoverActive.value = 1;

        // Update coordinates display
        const coords = vector3ToLatLng(point);
        setCoordinates(coords);
      } else {
        material.uniforms.hoverActive.value = 0;
        setCoordinates(null);
      }
    };

    const handleClick = () => {
      if (!isZoomingRef.current && material.uniforms.hoverActive.value > 0.5) {
        isZoomingRef.current = true;
        autoRotate = false;
        zoomDirection = 1;
      }
    };

    const handleMouseLeave = () => {
      material.uniforms.hoverActive.value = 0;
      setCoordinates(null);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      material.uniforms.time.value = elapsedTime;

      // Auto rotation
      if (autoRotate) {
        targetRotationY += 0.002;
      }
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      points.rotation.y = currentRotationY;
      sphereForRaycast.rotation.y = currentRotationY;
      vLine.rotation.y = currentRotationY;
      hLine.rotation.y = currentRotationY;

      // Warp animation
      if (zoomDirection !== 0) {
        zoomProgress += 0.025;

        if (zoomDirection === 1) {
          // Warping through - points fly past camera
          const warpAmount = easeInOutCubic(zoomProgress);
          material.uniforms.warpProgress.value = warpAmount;

          if (zoomProgress >= 1) {
            zoomProgress = 0;
            zoomDirection = -1;
          }
        } else {
          // Reset - points return to globe
          const resetAmount = 1 - easeInOutCubic(zoomProgress);
          material.uniforms.warpProgress.value = resetAmount;

          if (zoomProgress >= 1) {
            zoomProgress = 0;
            zoomDirection = 0;
            material.uniforms.warpProgress.value = 0;
            autoRotate = true;
            isZoomingRef.current = false;
          }
        }
      }

      renderer.render(scene, camera);
    };

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    animate();

    // Resize handler - use window dimensions
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      material.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 w-screen h-screen ${className}`}>
      <div ref={containerRef} className="w-full h-full cursor-pointer" />
      {/* Coordinates display */}
      {coordinates && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm text-[#525252] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
          Lat: {coordinates.lat.toFixed(2)}, Lng: {coordinates.lng.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default PointCloudGlobe;
