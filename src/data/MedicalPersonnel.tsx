import { MED_GREEN, getRandomNumber } from "../Utils";

export const MEDICAL_RANKS = [
    "Paramedic",
    "Crew Chief",
    "Supervisor",
    "Lieutenant",
    "Captain",
    "Battalion Chief"
]

export const MEDICAL_STATUS = [
    "Idle",
    "Staging",
    "Active",
    "Available",
    "Unavailable",
    "Resting",
    "Rescue",
    "Triage",
    "Collection"
]

export const MEDICAL_PERSONNEL = [{
    lng: -86.156478,
    lat: 39.781398,
    brng: getRandomNumber(0, 360),
    fname: "Cassie",
    lname: "Waletzko",
    name: "Waletzko",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.156508,
    lat: 39.781335,
    brng: getRandomNumber(0, 360),
    fname: "Mackenzi",
    lname: "Bowler",
    name: "Bowler",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.156307,
    lat: 39.781426,
    brng: getRandomNumber(0, 360),
    fname: "Chance",
    lname: "Callahan",
    name: "Callahan",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.156350,
    lat: 39.781364,
    brng: getRandomNumber(0, 360),
    fname: "Marisha",
    lname: "Mercer",
    name: "Mercer",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "EMS Staging Area, Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.156089,
    lat: 39.781601,
    brng: getRandomNumber(0, 360),
    fname: "Ashley",
    lname: "Jaffee",
    name: "Jaffee",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "Triage Area, East-Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
{
    lng: -86.155946,
    lat: 39.781587,
    brng: getRandomNumber(0, 360),
    fname: "June",
    lname: "Turner",
    name: "Turner",
    sub: MEDICAL_RANKS[getRandomNumber(0, MEDICAL_RANKS.length)],
    status: MEDICAL_STATUS[getRandomNumber(0, MEDICAL_STATUS.length)],
    loc: "Casualty Collection Area, East-Southeast of The Landmark Center",
    color: MED_GREEN,
    symbol: ""
},
]