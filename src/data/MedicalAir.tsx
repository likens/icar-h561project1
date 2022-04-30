import { MED_GREEN, getRandomNumber, getRandomBubble } from "../Utils";
import emsAir from "../assets/img/napsg/ems-air.svg";

export const MEDICAL_AIR = [
    {
        name: "MEDAIR02",
        lng: -86.155625, 
        lat: 39.781596, 
        alt: getRandomNumber(40, 60),
        symbol: emsAir,
        color: MED_GREEN,
        bubble: getRandomBubble(),
        video: "air1",
        locations: [{
            lng: -86.155625,
            lat: 39.781596,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.155182,
            lat: 39.781451,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.154620,
            lat: 39.781491,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.154173,
            lat: 39.781668,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.154003,
            lat: 39.782031,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.154713,
            lat: 39.782040,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.155211,
            lat: 39.781887,
            alt: getRandomNumber(40, 60)
        },
        {
            lng: -86.155557,
            lat: 39.781701,
            alt: getRandomNumber(40, 60)
        },
    ]
    }
]