import { FIRE_RED, getRandomBubble, getRandomNumber, getRandomStatus } from "../Utils";

export const FIRE_VEHICLES = [
    {
        lng: -86.157261,
        lat: 39.781358,
        brng: getRandomNumber(0, 360),
        sub: "Engine",
        status: getRandomStatus(),
        bubble: getRandomBubble(),
        video: `vehicle${getRandomNumber(1,2)}`,
        loc: "Fire Staging Area",
        image: "/image/FireVehicle.png",
        name: "EG24",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157298,
        lat: 39.781606,
        brng: getRandomNumber(0, 360),
        sub: "Engine",
        status: getRandomStatus(),
        bubble: getRandomBubble(),
        video: `vehicle${getRandomNumber(1,2)}`,
        loc: "Outside The Landmark Center",
        image: "/image/FireVehicle.png",
        name: "EG03",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156652,
        lat: 39.781664,
        brng: getRandomNumber(0, 360),
        sub: "Ladder",
        status: getRandomStatus(),
        bubble: getRandomBubble(),
        video: `vehicle${getRandomNumber(1,2)}`,
        loc: "Outside The Landmark Center",
        image: "/image/FireVehicle.png",
        name: "LD10",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157408,
        lat: 39.781927,
        brng: getRandomNumber(0, 360),
        sub: "Ladder",
        status: getRandomStatus(),
        bubble: getRandomBubble(),
        video: `vehicle${getRandomNumber(1,2)}`,
        loc: "Outside The Landmark Center",
        image: "/image/FireVehicle.png",
        name: "LD07",
        symbol: "",
        color: FIRE_RED
    },
]