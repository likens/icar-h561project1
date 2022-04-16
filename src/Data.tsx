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
import { Cartesian3 } from "cesium";
import { getRandomNumber } from "./Utils";

export const FIRE_RED = `rgba(215, 48, 39)`;
export const EMS_GREEN = `rgba(127, 188, 65)`;
export const POLICE_BLUE = `rgba(116, 173, 209)`;

export const LANDMARK_CENTER_POSITION = Cartesian3.fromDegrees(-86.157, 39.78187, 38);

export const LANDMARK_CENTER_OUTLINE = [
    -86.156992, 39.782069,
    -86.157060, 39.782127,
    -86.157324, 39.781944,
    -86.157250, 39.781881,
    -86.157325, 39.781814,
    -86.157079, 39.781610,
    -86.157004, 39.781664,
    -86.156919, 39.781609,
    -86.156687, 39.781781,
    -86.156772, 39.781851,
    -86.156685, 39.781917,
    -86.156924, 39.782110
]

export const LANDMARK_CENTER_UNITS = [
    { lng: -86.157127, lat: 39.781875, brng: getRandomNumber(0, 360), name: "Fire1", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.156945, lat: 39.781868, brng: getRandomNumber(0, 360), name: "Fire2", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157035, lat: 39.781810, brng: getRandomNumber(0, 360), name: "Fire3", color: FIRE_RED, symbol: fireSingle },
    { lng: -86.157045, lat: 39.781915, brng: getRandomNumber(0, 360), name: "Fire4", color: FIRE_RED, symbol: fireSingle },
]

export const LANDMARK_CENTER_WALLS = [
    [
        -86.156992, 39.782069,
        -86.157250, 39.781881,
        -86.157254, 39.781884,
        -86.156995, 39.782071
    ],
    [
        -86.157173, 39.781943,
        -86.157238, 39.782003,
        -86.157235, 39.782005,
        -86.157170, 39.781945
    ],
    [
        -86.157142, 39.782070,
        -86.157139, 39.782072,
        -86.157074, 39.782014,
        -86.157077, 39.782011
    ],
    [
        -86.157250, 39.781881,
        -86.157004, 39.781664,
        -86.157007, 39.781662,
        -86.157254, 39.781878
    ],
    [
        -86.157241, 39.781746,
        -86.157246, 39.781749,
        -86.157170, 39.781805,
        -86.157167, 39.781802
    ],
    [
        -86.156772, 39.781851,
        -86.156857, 39.781786,
        -86.156854, 39.781783,
        -86.156768, 39.781847
    ],
    [
        -86.156854, 39.781783,
        -86.156850, 39.781785,
        -86.156770, 39.781722,
        -86.156773, 39.781719
    ],
    [
        -86.156730, 39.781816,
        -86.156727, 39.781814,
        -86.156808, 39.781753,
        -86.156811, 39.781755
    ],
    [
        -86.156772, 39.781851,
        -86.156770, 39.781853,
        -86.157003, 39.782061,
        -86.157008, 39.782058
    ],
    [
        -86.156977, 39.782038,
        -86.156974, 39.782036,
        -86.156895, 39.782087,
        -86.156897, 39.782088
    ],
    [
        -86.156832, 39.782035,
        -86.156830, 39.782033,
        -86.156911, 39.781979,
        -86.156914, 39.781981
    ],
    [
        -86.156839, 39.781913,
        -86.156753, 39.781970,
        -86.156751, 39.781969,
        -86.156835, 39.781911
    ],
    [
        -86.157004, 39.781664,
        -86.157002, 39.781662,
        -86.156897, 39.781739,
        -86.156900, 39.781741
    ],
    [
        -86.156900, 39.781736,
        -86.156898, 39.781738,
        -86.156826, 39.781678,
        -86.156831, 39.781675
    ]
]

export const LANDMARK_CENTER_DOORS = [
    [
        -86.156862, 39.781701,
        -86.156875, 39.781713,
        -86.156869, 39.781715,
        -86.156857, 39.781705
    ]
]

export const LANDMARK_CENTER_WINDOWS = [
    [
        -86.156852, 39.781660,
        -86.156838, 39.781670,
        -86.156836, 39.781669,
        -86.156850, 39.781658
    ],
    [
        -86.156885, 39.781635,
        -86.156884, 39.781634,
        -86.156900, 39.781622,
        -86.156901, 39.781623
    ],
    [
        -86.156979, 39.781651,
        -86.156936, 39.781623,
        -86.156939, 39.781620,
        -86.156983, 39.781648
    ]
    
]


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
    { symbol: emsAir, label: "EMSAIR02", positions: EMS_AIR },
    { symbol: fireDrone, label: "FIREDRONE01", positions: FIRE_DRONE },
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