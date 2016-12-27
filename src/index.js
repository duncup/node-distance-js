"use strict"

const EARTH_RADIUS = 6378137

/**
 * 转化为弧度(rad)
 * */
function rad(d) {
  return d * Math.PI / 180.0;
}

/**
 * 基于余弦定理求两经纬度距离
 * @param lon1 第一点的经度
 * @param lat1 第一点的纬度
 * @param lon2 第二点的经度
 * @param lat2 第二点的纬度
 * @return 返回的距离，单位m
 * */
function distance(lon1, lat1, lon2, lat2) {
  let radLat1 = rad(lat1);
  let radLat2 = rad(lat2);

  let radLon1 = rad(lon1);
  let radLon2 = rad(lon2);

  if (radLat1 < 0)
    radLat1 = Math.PI / 2 + Math.abs(radLat1); // south
  if (radLat1 > 0)
    radLat1 = Math.PI / 2 - Math.abs(radLat1); // north
  if (radLon1 < 0)
    radLon1 = Math.PI * 2 - Math.abs(radLon1); // west
  if (radLat2 < 0)
    radLat2 = Math.PI / 2 + Math.abs(radLat2); // south
  if (radLat2 > 0)
    radLat2 = Math.PI / 2 - Math.abs(radLat2); // north
  if (radLon2 < 0)
    radLon2 = Math.PI * 2 - Math.abs(radLon2); // west
  let x1 = EARTH_RADIUS * Math.cos(radLon1) * Math.sin(radLat1);
  let y1 = EARTH_RADIUS * Math.sin(radLon1) * Math.sin(radLat1);
  let z1 = EARTH_RADIUS * Math.cos(radLat1);

  let x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);
  let y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);
  let z2 = EARTH_RADIUS * Math.cos(radLat2);

  let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
  //余弦定理求夹角
  let theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));
  let dist = theta * EARTH_RADIUS;
  return parseInt(dist);
}


exports.count = distance
