import { FIRE_RED, getRandomBubble, getRandomNumber } from "../Utils";
import fireDrone from "../assets/img/napsg/fire-drone.png";

export const FIRE_AIR = [
    {
        name: "FIREDRONE01",
        lng: -86.156534, 
        lat: 39.782132, 
        alt: getRandomNumber(30, 40),
        symbol: fireDrone,
        color: FIRE_RED,
        bubble: getRandomBubble(),
        video: "drone1",
        locations: [{
            lng: -86.156534,
            lat: 39.782132,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.156944,
            lat: 39.782288,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.157525,
            lat: 39.782158,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.157635,
            lat: 39.781885,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.157602,
            lat: 39.781531,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.157126,
            lat: 39.781411,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.156702,
            lat: 39.781473,
            alt: getRandomNumber(30, 40)
        },
        {
            lng: -86.156359,
            lat: 39.781734,
            alt: getRandomNumber(30, 40)
        },
    ]
    }
]