import fireSingle from "./assets/img/hci/fire_single.png";
import fireVehicle from "./assets/img/hci/fire_vehicle.png";
import emsSingle from "./assets/img/hci/ems_single.png";
import emsVehicle from "./assets/img/hci/ems_vehicle.png";
import policeSingle from "./assets/img/hci/police_single.png";
import policeVehicle from "./assets/img/hci/police_vehicle.png";
import triage from "./assets/img/napsg/triage.svg";
import casualtyCollectionPoint from "./assets/img/napsg/ccp.svg";
import accessBlocked from "./assets/img/napsg/hazard-access-blocked.svg";
import fireStaging from "./assets/img/napsg/staging-fire.svg";
import emsStaging from "./assets/img/napsg/staging-ems.svg";
import policeStaging from "./assets/img/napsg/staging-police.svg";
import media from "./assets/img/napsg/media.svg";
import fireHydrant from "./assets/img/napsg/fire-hydrant.svg";
import noWaterSupply from "./assets/img/napsg/hazard-fire-no-water-supply.svg";
import emergencyOperationsCenter from "./assets/img/napsg/eoc.svg";
import jointOperationsCenter from "./assets/img/napsg/joc.svg";
import multiAgencyCoordinationCenter from "./assets/img/napsg/macc.svg";
import incidentCommandPost from "./assets/img/napsg/icp.svg";
import areaCommandPost from "./assets/img/napsg/acp.svg";
import commandPost from "./assets/img/napsg/cp.svg";
import publicInformation from "./assets/img/napsg/public-information.svg";
import usarTaskForce from "./assets/img/napsg/usar-task-force.svg";
import evacCoordTeam from "./assets/img/napsg/evac-coord-team.svg";
import doNotEnter from "./assets/img/napsg/hazard-fire-do-not-enter.svg";
import hazardousEntry from "./assets/img/napsg/hazard-fire-hazardous-entry.svg";
import fireLadder from "./assets/img/napsg/fire-ladder.svg";
import mobileComms from "./assets/img/napsg/mobile-comms.svg";
import emsAir from "./assets/img/napsg/ems-air.svg";
import helibase from "./assets/img/napsg/helibase.svg";
import barrierSecurity from "./assets/img/napsg/barrier-security.svg";
import fireEngine from "./assets/img/napsg/fire-engine.svg";
import fireDrone from "./assets/img/napsg/fire-drone.png";
import { Cartesian2, HeightReference, HorizontalOrigin, VerticalOrigin } from "cesium";

// need person unit (fire/ems/police)
// need drones
// need air unit
// look at polygons for icons

export const UNIT_TYPE_SINGLE = "single";
export const UNIT_TYPE_VEHICLE = "vehicle";
export const UNIT_ORG_FIRE = "fire";
export const UNIT_ORG_EMS = "ems";
export const UNIT_ORG_POLICE = "police";

export const FIRE_RED = `rgba(215, 48, 39)`;
export const EMS_GREEN = `rgba(127, 188, 65)`;
export const POLICE_BLUE = `rgba(116, 173, 209)`;

export const BILLBOARDS = [
    
    { lng: -86.157016, lat: 39.781600, name: "Access Blocked", symbol: accessBlocked },
    { lng: -86.157358, lat: 39.781812, name: "Access Blocked", symbol: accessBlocked },
    { lng: -86.156536, lat: 39.782215, name: "No Water Supply", symbol: noWaterSupply },
    { lng: -86.156297, lat: 39.782018, name: "Search and Rescue Task Force", symbol: usarTaskForce },
    { lng: -86.156327, lat: 39.781837, name: "Evacuation Coordination Team", symbol: evacCoordTeam },
    { lng: -86.157211, lat: 39.781713, name: "Do Not Enter", symbol: doNotEnter },
    { lng: -86.156779, lat: 39.782007, name: "Hazardous Entry", symbol: hazardousEntry },
    { lng: -86.156688, lat: 39.781097, name: "Mobile Communications", symbol: mobileComms },
]

export const UNITS_SINGLE_FIRE = [
    { lng: -86.156922, lat: 39.781387, brng: getRandomNumber(0, 360), name: "Fleming", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156886, lat: 39.781286, brng: getRandomNumber(0, 360), name: "Ortega", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156826, lat: 39.781351, brng: getRandomNumber(0, 360), name: "Dunn", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157363, lat: 39.781997, brng: getRandomNumber(0, 360), name: "Chen", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157396, lat: 39.781865, brng: getRandomNumber(0, 360), name: "Wood", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157358, lat: 39.781679, brng: getRandomNumber(0, 360), name: "Howell", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157241, lat: 39.781619, brng: getRandomNumber(0, 360), name: "Donovan", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156596, lat: 39.781710, brng: getRandomNumber(0, 360), name: "Partridge", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156731, lat: 39.781621, brng: getRandomNumber(0, 360), name: "Allison", color: FIRE_RED, symbol: fireSingle }
]
export const UNITS_VEHICLE_FIRE = [
    { lng: -86.157261, lat: 39.781358, brng: getRandomNumber(0, 360), name: "EG24", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.157298, lat: 39.781606, brng: getRandomNumber(0, 360), name: "EG03", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.156652, lat: 39.781664, brng: getRandomNumber(0, 360), name: "LD10", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.157408, lat: 39.781927, brng: getRandomNumber(0, 360), name: "LD07", color: FIRE_RED, symbol: fireVehicle },
]
export const UNITS_SINGLE_EMS = [
    { lng: -86.156478, lat: 39.781398, brng: getRandomNumber(0, 360), name: "Keenan", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156508, lat: 39.781335, brng: getRandomNumber(0, 360), name: "Quinn", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156307, lat: 39.781426, brng: getRandomNumber(0, 360), name: "Findlay", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156350, lat: 39.781364, brng: getRandomNumber(0, 360), name: "Gill", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156089, lat: 39.781601, brng: getRandomNumber(0, 360), name: "Lynch", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.155946, lat: 39.781587, brng: getRandomNumber(0, 360), name: "Shepherd", color: EMS_GREEN, symbol: emsSingle },
]
export const UNITS_VEHICLE_EMS = [
    { lng: -86.156092, lat: 39.781399, brng: getRandomNumber(0, 360), name: "EMS33", color: EMS_GREEN, symbol: emsVehicle },
    { lng: -86.155975, lat: 39.781365, brng: getRandomNumber(0, 360), name: "EMS71", color: EMS_GREEN, symbol: emsVehicle },
    { lng: -86.155980, lat: 39.781499, brng: getRandomNumber(0, 360), name: "EMS36", color: EMS_GREEN, symbol: emsVehicle }
]
export const UNITS_SINGLE_POLICE = [
    { lng: -86.157523, lat: 39.782254, brng: getRandomNumber(0, 360), name: "Metcalfe", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157456, lat: 39.782287, brng: getRandomNumber(0, 360), name: "Holman", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157493, lat: 39.782332, brng: getRandomNumber(0, 360), name: "Hills", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157586, lat: 39.781204, brng: getRandomNumber(0, 360), name: "Bates", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157519, lat: 39.781100, brng: getRandomNumber(0, 360), name: "Monaghan", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155868, lat: 39.782285, brng: getRandomNumber(0, 360), name: "Lawson", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155699, lat: 39.782189, brng: getRandomNumber(0, 360), name: "Fountain", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155827, lat: 39.781086, brng: getRandomNumber(0, 360), name: "McKee", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155730, lat: 39.781135, brng: getRandomNumber(0, 360), name: "Dunne", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157272, lat: 39.781132, brng: getRandomNumber(0, 360), name: "Smith", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157205, lat: 39.781095, brng: getRandomNumber(0, 360), name: "Jones", color: POLICE_BLUE, symbol: policeSingle },
]
export const UNITS_VEHICLE_POLICE = [
    { lng: -86.157446, lat: 39.783739, brng: getRandomNumber(0, 360), name: "PD12", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157542, lat: 39.782290, brng: getRandomNumber(0, 360), name: "PD21", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157512, lat: 39.781206, brng: getRandomNumber(0, 360), name: "PD87", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155725, lat: 39.782260, brng: getRandomNumber(0, 360), name: "PD101", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155786, lat: 39.781032, brng: getRandomNumber(0, 360), name: "PD23", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155669, lat: 39.781080, brng: getRandomNumber(0, 360), name: "PD55", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157101, lat: 39.781096, brng: getRandomNumber(0, 360), name: "PD04", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157268, lat: 39.781192, brng: getRandomNumber(0, 360), name: "PD99", color: POLICE_BLUE, symbol: policeVehicle },
]
export const AREAS_RECTANGLE = [
    [-86.157633, 39.782218, -86.157388, 39.782385, "Barricade - Northwest", "#FFF", barrierSecurity],
    [-86.157697, 39.781040, -86.157388, 39.781265, "Barricade - Southwest", "#FFF", barrierSecurity],
    [-86.155905, 39.782153, -86.155651, 39.782332, "Barricade - Northeast", "#FFF", barrierSecurity],
    [-86.155953, 39.780997, -86.155668, 39.781199, "Barricade - Southeast", "#FFF", barrierSecurity],
    [-86.157423, 39.781252, -86.156713, 39.781454, "Fire Staging", FIRE_RED, fireStaging],
    [-86.156576, 39.781257, -86.155908, 39.781443, "EMS Staging", EMS_GREEN, emsStaging],
    [-86.157326, 39.781080, -86.156953, 39.781220, "Police Staging", POLICE_BLUE, policeStaging],
    [-86.156273, 39.781458, -86.156063, 39.781658, "Triage", "#FFFF00", triage],
    [-86.156050, 39.781465, -86.155875, 39.781657, "Casuality Collection Point", "#FF00FF", casualtyCollectionPoint],
    [-86.155795, 39.781539, -86.155523, 39.781715, "Medical Landing Zone", "#FFA500", helibase],
    [-86.156772, 39.781156, -86.156711, 39.781191, "Emergency Operations Center", "#028cef", emergencyOperationsCenter, 2],
    [-86.156678, 39.781142, -86.156604, 39.781187, "Incident Command Post", "#028cef", incidentCommandPost, 2],
    [-86.156586, 39.781160, -86.156514, 39.781201, "Joint Operations Center", "#028cef", jointOperationsCenter, 2]
]

export const AREAS_ELLIPSE = [
    { lng: -86.157441, lat: 39.781357, name: "Fire Hydrant", color: "#FFF", symbol: fireHydrant },
    { lng: -86.157402, lat: 39.782125, name: "Fire Hydrant", color: "#FFF", symbol: fireHydrant },
    { lng: -86.157086, lat: 39.780803, name: "Media", color: "#FFF", symbol: media },
    { lng: -86.157076, lat: 39.780900, name: "Public Information", color: "#FFF", symbol: publicInformation },
]

export const FIRE_DRONE = [
    { lng: -86.156534, lat: 39.782132, alt: getRandomNumber(30, 40) },
    { lng: -86.156944, lat: 39.782288, alt: getRandomNumber(30, 40) },
    { lng: -86.157525, lat: 39.782158, alt: getRandomNumber(30, 40) },
    { lng: -86.157635, lat: 39.781885, alt: getRandomNumber(30, 40) },
    { lng: -86.157602, lat: 39.781531, alt: getRandomNumber(30, 40) },
    { lng: -86.157126, lat: 39.781411, alt: getRandomNumber(30, 40) },
    { lng: -86.156702, lat: 39.781473, alt: getRandomNumber(30, 40) },
    { lng: -86.156359, lat: 39.781734, alt: getRandomNumber(30, 40) },
]

export const EMS_AIR = [
    { lng: -86.155625, lat: 39.781596, alt: getRandomNumber(60, 80) },
    { lng: -86.155182, lat: 39.781451, alt: getRandomNumber(60, 80) },
    { lng: -86.154620, lat: 39.781491, alt: getRandomNumber(60, 80) },
    { lng: -86.154173, lat: 39.781668, alt: getRandomNumber(60, 80) },
    { lng: -86.154003, lat: 39.782031, alt: getRandomNumber(60, 80) },
    { lng: -86.154713, lat: 39.782040, alt: getRandomNumber(60, 80) },
    { lng: -86.155211, lat: 39.781887, alt: getRandomNumber(60, 80) },
    { lng: -86.155557, lat: 39.781701, alt: getRandomNumber(60, 80) },
]

export const UNIT_AIR = [
    {
        symbol: emsAir, 
        label: "EMSAIR02",
        positions: EMS_AIR
    },
    {
        symbol: fireDrone, 
        label: "FIREDRONE01",
        positions: FIRE_DRONE
    },
]

// export const TEST_ANIMATION_POSITIONS = [
//     { lng: -86.157073, lat: 39.780962 },
//     { lng: -86.157298, lat: 39.780967 },
//     { lng: -86.157304, lat: 39.780772 },
//     { lng: -86.157312, lat: 39.780560 },
//     { lng: -86.157075, lat: 39.780552 },
//     { lng: -86.156834, lat: 39.780560 },
//     { lng: -86.156829, lat: 39.780756 },
//     { lng: -86.156826, lat: 39.780961 }
// ]

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const basicPoint = {
    pixelSize: 10,
    outlineWidth: 1,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    heightReference : HeightReference.RELATIVE_TO_GROUND
};

export const basicLabel = {
    show: true,
    font: "14px sans-serif",
    heightReference : HeightReference.RELATIVE_TO_GROUND,
    showBackground: true,
    horizontalOrigin: HorizontalOrigin.CENTER,
    verticalOrigin: VerticalOrigin.BASELINE,
    pixelOffset: new Cartesian2(7, -30)
}

/*!
 * JavaScript function to calculate the destination point given start point latitude / longitude (numeric degrees), bearing (numeric degrees) and distance (in m).
 *
 * Taken from http://movable-type.co.uk/scripts/latlong-vincenty-direct.html and optimized / cleaned up by Mathias Bynens <http://mathiasbynens.be/>
 * Based on the Vincenty direct formula by T. Vincenty, “Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations”, Survey Review, vol XXII no 176, 1975 <http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf>
 */
export function vincentyDirection(lng: number, lat: number, brng: number, dist: number) {

    function toRad(degrees: number) {
        return degrees * Math.PI / 180;
    }
    
    function toDeg(radians: number) {
        return radians * 180 / Math.PI;
    }

    const a = 6378137;
    const b = 6356752.3142;
    const f = 1 / 298.257223563; // WGS-84 ellipsiod
    const s = dist;
    const alpha1 = toRad(brng);
    const sinAlpha1 = Math.sin(alpha1);
    const cosAlpha1 = Math.cos(alpha1);
    const tanU1 = (1 - f) * Math.tan(toRad(lat));
    const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
    const sigma1 = Math.atan2(tanU1, cosAlpha1);
    const sinAlpha = cosU1 * sinAlpha1;
    const cosSqAlpha = 1 - sinAlpha * sinAlpha;
    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let cos2SigmaM = 0;
    let sinSigma = 0;
    let cosSigma = 0;
    let sigma = s / (b * A);
    let sigmaP = 2 * Math.PI;
    while (Math.abs(sigma - sigmaP) > 1e-12) {
        cos2SigmaM = Math.cos(2*sigma1 + sigma);
        sinSigma = Math.sin(sigma);
        cosSigma = Math.cos(sigma);
        const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b * A) + deltaSigma;
    };
    const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1
    const latitude = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    const revAz = Math.atan2(sinAlpha, -tmp); // final bearing
    return { lng: lng + toDeg(L), lat: toDeg(latitude) };
};