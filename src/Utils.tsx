import fireSingle from "./assets/img/hci/fire_single.png";
import fireVehicle from "./assets/img/hci/fire_vehicle.png";
import emsSingle from "./assets/img/hci/ems_single.png";
import emsVehicle from "./assets/img/hci/ems_vehicle.png";
import policeSingle from "./assets/img/hci/police_single.png";
import policeVehicle from "./assets/img/hci/police_vehicle.png";

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

export const UNITS_SINGLE_FIRE = [
    { lng: -86.156922, lat: 39.781387, name: "Fleming, K.", symbol: fireSingle },
    { lng: -86.156886, lat: 39.781286, name: "Ortega, J.", symbol: fireSingle },
    { lng: -86.156826, lat: 39.781351, name: "Dunn, T.", symbol: fireSingle },
    { lng: -86.157363, lat: 39.781997, name: "Chen, Y.", symbol: fireSingle },
    { lng: -86.157396, lat: 39.781865, name: "Wood, R.", symbol: fireSingle },
    { lng: -86.157358, lat: 39.781679, name: "Howell, C.", symbol: fireSingle },
    { lng: -86.157241, lat: 39.781619, name: "Donovan, D.", symbol: fireSingle },
    { lng: -86.156596, lat: 39.781710, name: "Partridge, M.", symbol: fireSingle },
    { lng: -86.156731, lat: 39.781621, name: "Allison, K.", symbol: fireSingle }
]
export const UNITS_VEHICLE_FIRE = [
    { lng: -86.157261, lat: 39.781358, name: "EG24", symbol: fireVehicle },
    { lng: -86.157298, lat: 39.781606, name: "EG03", symbol: fireVehicle },
    { lng: -86.156652, lat: 39.781664, name: "LD10", symbol: fireVehicle },
    { lng: -86.157408, lat: 39.781927, name: "LD07", symbol: fireVehicle },
]
export const UNITS_SINGLE_EMS = [
    { lng: -86.156478, lat: 39.781398, name: "Keenan, P.", symbol: emsSingle },
    { lng: -86.156508, lat: 39.781335, name: "Quinn, W.", symbol: emsSingle },
    { lng: -86.156307, lat: 39.781426, name: "Findlay, A.", symbol: emsSingle },
    { lng: -86.156350, lat: 39.781364, name: "Gill, O.", symbol: emsSingle },
    { lng: -86.156089, lat: 39.781601, name: "Lynch, S.", symbol: emsSingle },
    { lng: -86.155946, lat: 39.781587, name: "Shepherd, P.", symbol: emsSingle },
]
export const UNITS_VEHICLE_EMS = [
    { lng: -86.156092, lat: 39.781399, name: "EMS33", symbol: emsVehicle },
    { lng: -86.155975, lat: 39.781365, name: "EMS71", symbol: emsVehicle },
    { lng: -86.155980, lat: 39.781499, name: "EMS36", symbol: emsVehicle }
]
export const UNITS_SINGLE_POLICE = [
    { lng: -86.157523, lat: 39.782254, name: "Metcalfe, T.", symbol: policeSingle },
    { lng: -86.157503, lat: 39.782246, name: "Holman, E.", symbol: policeSingle },
    { lng: -86.157493, lat: 39.782332, name: "Hills, N.", symbol: policeSingle },
    { lng: -86.157586, lat: 39.781204, name: "Bates, C.", symbol: policeSingle },
    { lng: -86.157519, lat: 39.781100, name: "Monaghan, K.", symbol: policeSingle },
    { lng: -86.155868, lat: 39.782285, name: "Lawson, A.", symbol: policeSingle },
    { lng: -86.155699, lat: 39.782189, name: "Fountain, E.", symbol: policeSingle },
    { lng: -86.155827, lat: 39.781086, name: "McKee, R.", symbol: policeSingle },
    { lng: -86.155730, lat: 39.781135, name: "Dunne, X.", symbol: policeSingle },
]
export const UNITS_VEHICLE_POLICE = [
    { lng: -86.157446, lat: 39.783739, name: "PD12", symbol: policeVehicle },
    { lng: -86.157542, lat: 39.782290, name: "PD21", symbol: policeVehicle },
    { lng: -86.157512, lat: 39.781206, name: "PD87", symbol: policeVehicle },
    { lng: -86.155725, lat: 39.782260, name: "PD101", symbol: policeVehicle },
    { lng: -86.155786, lat: 39.781032, name: "PD23", symbol: policeVehicle },
    { lng: -86.155669, lat: 39.781080, name: "PD55", symbol: policeVehicle },
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