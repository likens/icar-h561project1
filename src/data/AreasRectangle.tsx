import { MED_GREEN, FIRE_RED, POLICE_BLUE } from "../Utils";
import triage from "../assets/img/napsg/triage.svg";
import casualtyCollectionPoint from "../assets/img/napsg/ccp.svg";
import fireStaging from "../assets/img/napsg/staging-fire.svg";
import emsStaging from "../assets/img/napsg/staging-ems.svg";
import policeStaging from "../assets/img/napsg/staging-police.svg";
import emergencyOperationsCenter from "../assets/img/napsg/eoc.svg";
import jointOperationsCenter from "../assets/img/napsg/joc.svg";
import incidentCommandPost from "../assets/img/napsg/icp.svg";
import helibase from "../assets/img/napsg/helibase.svg";
import barrierSecurity from "../assets/img/napsg/barrier-security.svg";

export const AREAS_RECTANGLE = [
    [-86.157633, 39.782218, -86.157388, 39.782385, "Barricade - Northwest", "#FFF", barrierSecurity],
    [-86.157697, 39.781040, -86.157388, 39.781265, "Barricade - Southwest", "#FFF", barrierSecurity],
    [-86.155905, 39.782153, -86.155651, 39.782332, "Barricade - Northeast", "#FFF", barrierSecurity],
    [-86.155953, 39.780997, -86.155668, 39.781199, "Barricade - Southeast", "#FFF", barrierSecurity],
    [-86.157423, 39.781252, -86.156713, 39.781454, "Fire Staging", FIRE_RED, fireStaging],
    [-86.156576, 39.781257, -86.155908, 39.781443, "EMS Staging", MED_GREEN, emsStaging],
    [-86.157326, 39.781080, -86.156953, 39.781220, "Police Staging", POLICE_BLUE, policeStaging],
    [-86.156273, 39.781458, -86.156063, 39.781658, "Triage", "#FFFF00", triage],
    [-86.156050, 39.781465, -86.155875, 39.781657, "Casualty Collection Point", "#FF00FF", casualtyCollectionPoint],
    [-86.155795, 39.781539, -86.155523, 39.781715, "Medical Landing Zone", "#FFA500", helibase],
    [-86.156772, 39.781156, -86.156711, 39.781191, "Emergency Operations Center", "#028cef", emergencyOperationsCenter, 2],
    [-86.156678, 39.781142, -86.156604, 39.781187, "Incident Command Post", "#028cef", incidentCommandPost, 2],
    [-86.156586, 39.781160, -86.156514, 39.781201, "Joint Operations Center", "#028cef", jointOperationsCenter, 2]
]