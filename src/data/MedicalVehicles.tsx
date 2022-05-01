import { MED_GREEN, getRandomNumber, getRandomBubble } from "../Utils";
import emsAmbulance from "../assets/img/napsg/ems-ambulance.svg";

export const MEDICAL_VEHICLES = [{
    lng: -86.156092,
    lat: 39.781399,
    brng: getRandomNumber(0, 360),
    name: "EMS33",
    sub: "Ambulance",
    status: "Idle",
    bubble: getRandomBubble(),
    video: `vehicle${getRandomNumber(1,2)}`,
    loc: "EMS Staging Area",
    image: "/image/MedicalVehicle.png",
    color: MED_GREEN
},
{
    lng: -86.155975,
    lat: 39.781365,
    brng: getRandomNumber(0, 360),
    name: "EMS71",
    sub: "Ambulance",
    status: "Idle",
    bubble: getRandomBubble(),
    video: `vehicle${getRandomNumber(1,2)}`,
    loc: "EMS Staging Area",
    image: "/image/MedicalVehicle.png",
    color: MED_GREEN
},
{
    lng: -86.155980,
    lat: 39.781499,
    brng: getRandomNumber(0, 360),
    name: "EMS36",
    sub: "Ambulance",
    status: "Idle",
    bubble: getRandomBubble(),
    video: `vehicle${getRandomNumber(1,2)}`,
    loc: "Casualty Collection Point",
    image: "/image/MedicalVehicle.png",
    color: MED_GREEN
}
]