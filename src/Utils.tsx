import fireSingle from "./assets/img/hci/fire_single.png";
import fireVehicle from "./assets/img/hci/fire_vehicle.png";
import emsSingle from "./assets/img/hci/ems_single.png";
import emsVehicle from "./assets/img/hci/ems_vehicle.png";
import policeSingle from "./assets/img/hci/police_single.png";
import policeVehicle from "./assets/img/hci/police_vehicle.png";
import incidentCommandPost from "./assets/img/napsg/incident_command_post.png";
import triage from "./assets/img/napsg/triage.png";
import casualtyCollectionPoint from "./assets/img/napsg/casualty_collection_point.png";
import accessBlocked from "./assets/img/napsg/access_blocked.png";
import fireStaging from "./assets/img/napsg/fire_staging.png";
import emsStaging from "./assets/img/napsg/ems_staging.png";
import media from "./assets/img/napsg/media.png";
import fireHydrant from "./assets/img/napsg/fire_hydrant.png";
import noWaterSupply from "./assets/img/napsg/fire_no_water_supply.png";
import emergencyOperationsCenter from "./assets/img/napsg/emergency_operations_center.png";
import jointOperationsCenter from "./assets/img/napsg/joint_operations_center.png";
import usarTaskForce from "./assets/img/napsg/search_and_rescue_task_force.png";
import evacTeam from "./assets/img/napsg/evacuation_coordination_team.png";
import doNotEnter from "./assets/img/napsg/fire_do_not_enter.png";
import hazardousEntry from "./assets/img/napsg/fire_hazardous_entry.png";
import fireLadder from "./assets/img/napsg/fire_ladder.png";

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
    { lng: -86.156652, lat: 39.781150, name: "Incident Command Post", symbol: incidentCommandPost },
    { lng: -86.156185, lat: 39.781510, name: "Triage", symbol: triage },
    { lng: -86.155900, lat: 39.781635, name: "Casualty Collection Point", symbol: casualtyCollectionPoint },
    { lng: -86.157074, lat: 39.781336, name: "Fire Staging", symbol: fireStaging },
    { lng: -86.156249, lat: 39.781334, name: "EMS Staging", symbol: emsStaging },
    { lng: -86.157441, lat: 39.781357, name: "Hydrant", symbol: fireHydrant },
    { lng: -86.157402, lat: 39.782125, name: "Hydrant", symbol: fireHydrant },
    { lng: -86.157016, lat: 39.781600, name: "Access Blocked", symbol: accessBlocked },
    { lng: -86.157358, lat: 39.781812, name: "Access Blocked", symbol: accessBlocked },
    { lng: -86.157086, lat: 39.780803, name: "Media", symbol: media },
    { lng: -86.156536, lat: 39.782215, name: "No Water Supply", symbol: noWaterSupply },
    { lng: -86.157625, lat: 39.781609, name: "Emergency Operations Center", symbol: emergencyOperationsCenter },
    { lng: -86.156554, lat: 39.781168, name: "Joint Operations Center", symbol: jointOperationsCenter },
    { lng: -86.156691, lat: 39.782050, name: "Search and Rescue Task Force", symbol: usarTaskForce },
    { lng: -86.156442, lat: 39.781821, name: "Evacuation Coordination Team", symbol: evacTeam },
    { lng: -86.157211, lat: 39.781712, name: "Do Not Enter", symbol: doNotEnter },
    { lng: -86.156781, lat: 39.781999, name: "Hazardous Entry", symbol: hazardousEntry },
]

export const UNITS_SINGLE_FIRE = [
    { lng: -86.156922, lat: 39.781387, brng: getRandomBearing(), name: "Fleming, K.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156886, lat: 39.781286, brng: getRandomBearing(), name: "Ortega, J.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156826, lat: 39.781351, brng: getRandomBearing(), name: "Dunn, T.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157363, lat: 39.781997, brng: getRandomBearing(), name: "Chen, Y.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157396, lat: 39.781865, brng: getRandomBearing(), name: "Wood, R.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157358, lat: 39.781679, brng: getRandomBearing(), name: "Howell, C.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157241, lat: 39.781619, brng: getRandomBearing(), name: "Donovan, D.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156596, lat: 39.781710, brng: getRandomBearing(), name: "Partridge, M.", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156731, lat: 39.781621, brng: getRandomBearing(), name: "Allison, K.", color: FIRE_RED, symbol: fireSingle }
]
export const UNITS_VEHICLE_FIRE = [
    { lng: -86.157261, lat: 39.781358, brng: getRandomBearing(), name: "EG24", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.157298, lat: 39.781606, brng: getRandomBearing(), name: "EG03", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.156652, lat: 39.781664, brng: getRandomBearing(), name: "LD10", color: FIRE_RED, symbol: fireVehicle },
    { lng: -86.157408, lat: 39.781927, brng: getRandomBearing(), name: "LD07", color: FIRE_RED, symbol: fireVehicle },
]
export const UNITS_SINGLE_EMS = [
    { lng: -86.156478, lat: 39.781398, brng: getRandomBearing(), name: "Keenan, P.", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156508, lat: 39.781335, brng: getRandomBearing(), name: "Quinn, W.", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156307, lat: 39.781426, brng: getRandomBearing(), name: "Findlay, A.", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156350, lat: 39.781364, brng: getRandomBearing(), name: "Gill, O.", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.156089, lat: 39.781601, brng: getRandomBearing(), name: "Lynch, S.", color: EMS_GREEN, symbol: emsSingle },
    { lng: -86.155946, lat: 39.781587, brng: getRandomBearing(), name: "Shepherd, P.", color: EMS_GREEN, symbol: emsSingle },
]
export const UNITS_VEHICLE_EMS = [
    { lng: -86.156092, lat: 39.781399, brng: getRandomBearing(), name: "EMS33", color: EMS_GREEN, symbol: emsVehicle },
    { lng: -86.155975, lat: 39.781365, brng: getRandomBearing(), name: "EMS71", color: EMS_GREEN, symbol: emsVehicle },
    { lng: -86.155980, lat: 39.781499, brng: getRandomBearing(), name: "EMS36", color: EMS_GREEN, symbol: emsVehicle }
]
export const UNITS_SINGLE_POLICE = [
    { lng: -86.157523, lat: 39.782254, brng: getRandomBearing(), name: "Metcalfe, T.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157456, lat: 39.782287, brng: getRandomBearing(), name: "Holman, E.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157493, lat: 39.782332, brng: getRandomBearing(), name: "Hills, N.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157586, lat: 39.781204, brng: getRandomBearing(), name: "Bates, C.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.157519, lat: 39.781100, brng: getRandomBearing(), name: "Monaghan, K.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155868, lat: 39.782285, brng: getRandomBearing(), name: "Lawson, A.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155699, lat: 39.782189, brng: getRandomBearing(), name: "Fountain, E.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155827, lat: 39.781086, brng: getRandomBearing(), name: "McKee, R.", color: POLICE_BLUE, symbol: policeSingle },
    { lng: -86.155730, lat: 39.781135, brng: getRandomBearing(), name: "Dunne, X.", color: POLICE_BLUE, symbol: policeSingle },
]
export const UNITS_VEHICLE_POLICE = [
    { lng: -86.157446, lat: 39.783739, brng: getRandomBearing(), name: "PD12", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157542, lat: 39.782290, brng: getRandomBearing(), name: "PD21", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.157512, lat: 39.781206, brng: getRandomBearing(), name: "PD87", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155725, lat: 39.782260, brng: getRandomBearing(), name: "PD101", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155786, lat: 39.781032, brng: getRandomBearing(), name: "PD23", color: POLICE_BLUE, symbol: policeVehicle },
    { lng: -86.155669, lat: 39.781080, brng: getRandomBearing(), name: "PD55", color: POLICE_BLUE, symbol: policeVehicle },
]
export const AREAS_RECTANGLE = [
    [-86.157423, 39.781252, -86.156713, 39.781454, "Fire Staging", FIRE_RED],
    [-86.157633, 39.782218, -86.157388, 39.782385, "Barricade - Northwest", POLICE_BLUE],
    [-86.157697, 39.781040, -86.157388, 39.781265, "Barricade - Southwest", POLICE_BLUE],
    [-86.155905, 39.782153, -86.155651, 39.782332, "Barricade - Northeast", POLICE_BLUE],
    [-86.155953, 39.780997, -86.155668, 39.781199, "Barricade - Southeast", POLICE_BLUE],
    [-86.156576, 39.781257, -86.155908, 39.781443, "EMS Staging", EMS_GREEN],
    [-86.156213, 39.781456, -86.155873, 39.781646, "Triage and Collection", "#FF00FF"]
]

export function getRandomBearing() {
    return Math.floor(Math.random() * (360 - 0 + 1) + 0);
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