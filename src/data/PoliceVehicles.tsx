import { getRandomNumber, POLICE_BLUE } from "../Utils";

export const POLICE_VEHICLES = [{
    lng: -86.157446,
    lat: 39.783739,
    brng: 180, // getRandomNumber(0, 360),
    name: "PD12",
    sub: "Patrol Car",
    status: "Moving",
    loc: "Traveling South, North Meridian St.",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.157542,
    lat: 39.782290,
    brng: getRandomNumber(0, 360),
    name: "PD21",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Barricade - Northwest",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.157512,
    lat: 39.781206,
    brng: getRandomNumber(0, 360),
    name: "PD87",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Barricade - Southwest",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.155725,
    lat: 39.782260,
    brng: getRandomNumber(0, 360),
    name: "PD101",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Barricade - Northeast",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.155786,
    lat: 39.781032,
    brng: getRandomNumber(0, 360),
    name: "PD23",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Barricade - Southeast",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.155669,
    lat: 39.781080,
    brng: getRandomNumber(0, 360),
    name: "PD55",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Barricade - Southeast",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.157101,
    lat: 39.781096,
    brng: getRandomNumber(0, 360),
    name: "PD04",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Police Staging Area, South of The Landmark Center",
    color: POLICE_BLUE,
    symbol: ""
},
{
    lng: -86.157268,
    lat: 39.781192,
    brng: getRandomNumber(0, 360),
    name: "PD99",
    sub: "Patrol Car",
    status: "Idle",
    loc: "Police Staging Area, South of The Landmark Center",
    color: POLICE_BLUE,
    symbol: ""
},
]