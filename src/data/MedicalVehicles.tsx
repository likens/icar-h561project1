import { MED_GREEN, getRandomNumber } from "../Utils";

export const MEDICAL_VEHICLES = [{
    lng: -86.156092,
    lat: 39.781399,
    brng: getRandomNumber(0, 360),
    name: "EMS33",
    sub: "Ambulance",
    status: "Idle",
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.155975,
    lat: 39.781365,
    brng: getRandomNumber(0, 360),
    name: "EMS71",
    sub: "Ambulance",
    status: "Idle",
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.155980,
    lat: 39.781499,
    brng: getRandomNumber(0, 360),
    name: "EMS36",
    sub: "Ambulance",
    status: "Idle",
    loc: "Casualty Collection Area, East-Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
}
]