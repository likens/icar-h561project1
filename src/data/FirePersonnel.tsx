import { FIRE_RED, getRandomNumber } from "../Utils";

export const FIRE_RANKS = [
    "Firefighter",
    "Driver",
    "Engineer",
    "Lieutenant",
    "Captain",
    "Battalion Chief",
    "Assistant Chief",
    "Fire Chief"
]

export const FIRE_STATUS = [
    "Idle",
    "Staging",
    "Active",
    "Available",
    "Unavailable",
    "Resting"
]

export const FIRE_PERSONNEL = [
    {
        lng: -86.156922,
        lat: 39.781387,
        brng: getRandomNumber(0, 360),
        fname: "Allison",
        lname: "Kenneth",
        name: "Kenneth",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Fire Staging Area, South of The Landmark Center",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156886,
        lat: 39.781286,
        brng: getRandomNumber(0, 360),
        fname: "Bret",
        lname: "Stevenson",
        name: "Stevenson",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Fire Staging Area, South of The Landmark Center",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156826,
        lat: 39.781351,
        brng: getRandomNumber(0, 360),
        fname: "JoAnna",
        lname: "Muniz",
        name: "Muniz",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Fire Staging Area, South of The Landmark Center",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157363,
        lat: 39.781997,
        brng: getRandomNumber(0, 360),
        fname: "Kayleigh",
        lname: "Jones",
        name: "Jones",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Northwest, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157396,
        lat: 39.781865,
        brng: getRandomNumber(0, 360),
        fname: "Caleb",
        lname: "Likens",
        name: "Likens",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Northwest, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157358,
        lat: 39.781679,
        brng: getRandomNumber(0, 360),
        fname: "Julia",
        lname: "Ottaway",
        name: "Ottaway",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Southwest, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.157241,
        lat: 39.781619,
        brng: getRandomNumber(0, 360),
        fname: "Howard",
        lname: "Flemming",
        name: "Flemming",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Southwest, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156596,
        lat: 39.781710,
        brng: getRandomNumber(0, 360),
        fname: "Tara",
        lname: "Hodson",
        name: "Hodson",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Southeast, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    }, {
        lng: -86.156731,
        lat: 39.781621,
        brng: getRandomNumber(0, 360),
        fname: "Krystal",
        lname: "Nolasco",
        name: "Nolasco",
        sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
        status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
        loc: "Southeast, Outside, The Landmark Center, 10 meters",
        symbol: "",
        color: FIRE_RED
    },
]