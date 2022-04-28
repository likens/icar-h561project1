import { FIRE_RED, getRandomNumber } from "../Utils";

export const FIRE_VEHICLES = [
    {
        lng: -86.157261,
        lat: 39.781358,
        brng: getRandomNumber(0, 360),
        sub: "Engine",
        status: "Idle",
        loc: "Fire Staging Area, South of The Landmark Center",
        name: "EG24",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157298,
        lat: 39.781606,
        brng: getRandomNumber(0, 360),
        sub: "Engine",
        status: "In Progress",
        loc: "Southwest, Outside, The Landmark Center, 10 meters",
        name: "EG03",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156652,
        lat: 39.781664,
        brng: getRandomNumber(0, 360),
        sub: "Ladder",
        status: "In Progress",
        loc: "Southeast, Outside, The Landmark Center, 20 meters",
        name: "LD10",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157408,
        lat: 39.781927,
        brng: getRandomNumber(0, 360),
        sub: "Ladder",
        status: "In Progress",
        loc: "Northwest, Outside, The Landmark Center, 20 meters",
        name: "LD07",
        symbol: "",
        color: FIRE_RED
    },
]