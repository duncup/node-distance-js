"use strict"

const EARTH_RADIUS = 6378137

/**
 * Convert to radians
 * */
function rad(d) {
  return d * Math.PI / 180.0;
}


function getLat(lat) {
  lat = rad(lat);

  if (lat < 0)
    lat = Math.PI / 2 + Math.abs(lat); // south
  if (lat > 0)
    lat = Math.PI / 2 - Math.abs(lat); // north

  return lat
}

function getLon(lon) {
  lon = rad(lon);

  if (lon < 0)
    lon = Math.PI * 2 - Math.abs(lon); // west
  return lon
}

/**
 * Determination of Two Longitude and Longitude Distance Based on Cosine Theorem
 * @param lon1 longitude of first point
 * @param lat1 latitude of first point
 * @param lon2 longitude of second point
 * @param lat2 latitude of second point
 * @return distance of meter
 * */
function distance(lon1, lat1, lon2, lat2) {

  let radLat1 = getLat(lat1)
  let radLon1 = getLon(lon1)

  let radLat2 = getLat(lat2)
  let radLon2 = getLon(lon2)

  let x1 = EARTH_RADIUS * Math.cos(radLon1) * Math.sin(radLat1);
  let y1 = EARTH_RADIUS * Math.sin(radLon1) * Math.sin(radLat1);
  let z1 = EARTH_RADIUS * Math.cos(radLat1);

  let x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);
  let y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);
  let z2 = EARTH_RADIUS * Math.cos(radLat2);

  let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
  //Cosine theorem for angle
  let theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));
  let dist = theta * EARTH_RADIUS;
  return parseInt(dist);
}


exports.distance = distance
