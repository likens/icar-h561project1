import { Cartesian2, Cartesian3, Cartographic, Color, HeightReference, HorizontalOrigin, ImageMaterialProperty, JulianDate, LabelStyle, LagrangePolynomialApproximation, Math as CesiumMath, NearFarScalar, PolylineGlowMaterialProperty, Rectangle, SampledPositionProperty, TimeInterval, TimeIntervalCollection, VelocityOrientationProperty, VerticalOrigin } from "cesium";
import { viewer, scene } from "./App";

export const RESOURCE_STATUS = [
    "Idle",
    "Staging",
    "Active",
    "Available",
    "Unavailable",
    "Resting",
    "Idle",
    "Staging",
    "Active",
    "Available",
    "Unavailable",
    "Resting",
    "Rescue",
    "Triage",
    "Collection",
    "Idle",
    "Staging",
    "Active",
    "Available",
    "Unavailable",
    "Resting",
    "Patrolling",
    "Guarding"
]

export function getRandomStatus() {
    return RESOURCE_STATUS[getRandomNumber(0, RESOURCE_STATUS.length - 1)];
}

export const RESOURCE_SUB = [
    "Firefighter",
    "Driver",
    "Engineer",
    "Lieutenant",
    "Captain",
    "Battalion Chief",
    "Assistant Chief",
    "Fire Chief",
    "Paramedic",
    "Crew Chief",
    "Supervisor",
    "Lieutenant",
    "Captain",
    "Battalion Chief",
    "Patrolman",
    "Detective",
    "Sergeant",
    "Lieutenant",
    "Captain",
    "Major",
    "Commander",
    "Deputy Chief",
    "Assistant Chief",
    "Chief of Police"
]

export function getRandomSub() {
    return RESOURCE_SUB[getRandomNumber(0, RESOURCE_SUB.length - 1)];
}

export const RESOURCE_BUBBLES = [
    "check",
    "sleep",
    "idle",
    "alert"
];

export function getRandomBubble() {
    return RESOURCE_BUBBLES[getRandomNumber(0, RESOURCE_BUBBLES.length - 1)];
}

export function getRandomStat() {
    return "";
}

export function getRandomBlock() {
    return "";
}


export const FIRE_RED = `rgba(215, 48, 39)`;
export const MED_GREEN = `rgba(127, 188, 65)`;
export const POLICE_BLUE = `rgba(116, 173, 209)`;
export const PUB_YELLOW = `rgba(255, 210, 61)`;

export function getStartTime(): JulianDate {
    return JulianDate.fromDate(new Date());
}

export function getStopTime(): JulianDate {
    return JulianDate.addSeconds(getStartTime(), 240, new JulianDate());
}

export function generatePointer(unit: boolean, name: string, symbol: string, lng: number, lat: number, brng: number, color: string = "#ffffff", height?: number) {

    const scale = unit ? 1 : 4;
    const east = 90;
    const south = 180;
    const west = 270;
    const position = Cartesian3.fromDegrees(lng, lat, height ? height : 0);

    const centerPoint = unit ? vincentyDirection(lng, lat, brng, scale) : vincentyDirection(lng, lat, brng, scale - 1);
    const centerTop = unit ? vincentyDirection(lng, lat, brng, scale * -.75) : vincentyDirection(lng, lat, brng, scale * .5);
    const centerBot = unit ? vincentyDirection(lng, lat, south + brng, scale) : vincentyDirection(lng, lat, south + brng, scale * .5);
    const cornerTopLeft = vincentyDirection(centerTop.lng, centerTop.lat, west + brng, scale * .25);
    const cornerTopRight = vincentyDirection(centerTop.lng, centerTop.lat, east + brng, scale * .25);
    const cornerBotLeft = unit ? vincentyDirection(centerBot.lng, centerBot.lat, west + brng, scale * .75) : vincentyDirection(centerBot.lng, centerBot.lat, west + brng, scale * .25);
    const cornerBotRight = unit ? vincentyDirection(centerBot.lng, centerBot.lat, east + brng, scale * .75) : vincentyDirection(centerBot.lng, centerBot.lat, east + brng, scale * .25);

    const polygonPoints = unit ? Cartesian3.fromDegreesArray([
        centerTop.lng,
        centerTop.lat,
        cornerBotRight.lng,
        cornerBotRight.lat,
        centerPoint.lng,
        centerPoint.lat,
        cornerBotLeft.lng,
        cornerBotLeft.lat
    ]) : Cartesian3.fromDegreesArray([
        cornerTopLeft.lng,
        cornerTopLeft.lat,
        cornerBotLeft.lng,
        cornerBotLeft.lat,
        cornerBotRight.lng,
        cornerBotRight.lat,
        cornerTopRight.lng,
        cornerTopRight.lat,
        centerPoint.lng,
        centerPoint.lat
    ]);

    const entityHeight = height ? height : .5;
    const extrudedHeight = height ? height + .5 : 1;

    let entity = {
        id: `pointer_${name}`, // ${unit ? `unit` : `vehicle`}
        name: name,
        position: position,
        show: true,
        polygon: {
            hierarchy: {
                positions: polygonPoints,
                holes: []
            },
            material: Color.fromCssColorString(color),
            height: entityHeight,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            extrudedHeight: extrudedHeight,
            extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
            outline: true,
            outlineColor: Color.BLACK
        },
        label: {
            text: name,
            ...basicLabel,
            // show: true,
            backgroundColor: Color.BLACK.withAlpha(.5)
            // backgroundColor: Color.fromCssColorString(color).withAlpha(.5)
        },
    }

    viewer.entities.add(entity);

    // 2D Billboards
    viewer.entities.add({
        id: `billboard_${name}`, // ${unit ? `unit` : `vehicle`}
        name: name,
        position: position,
        show: false,
        billboard: {
            image: symbol,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            pixelOffset: new Cartesian2(0, -60)
        },
        label: {
            text: name,
            font: "11px sans-serif",
            fillColor: Color.BLACK,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.fromCssColorString(`rgba(255, 255, 255, .6)`),
            horizontalOrigin: HorizontalOrigin.LEFT,
            verticalOrigin: VerticalOrigin.BASELINE,
            pixelOffset: unit ? new Cartesian2(5, -95) : new Cartesian2(-10, -100)
        },
    });
}

export function generateBillboard(symbol: string, label: string, lng: number, lat: number, alt = 0) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lng, lat, alt),
        name: label,
        billboard: {
            image: symbol,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            scale: .5,
            eyeOffset: new Cartesian3(0, 0, 0),
        },
        label: {
            text: label,
            show: false,
            font: "12px sans-serif",
            fillColor: Color.WHITE,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.BLACK,
            horizontalOrigin: HorizontalOrigin.CENTER,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, 60)
        }
    });
}

export function generateAnimatedBillboard(symbol: string, label: string, positions: any[]) {
    
    const property = new SampledPositionProperty();

    // add first position as last for looping
    positions.push(positions[0]);
    positions.forEach((pos: any, i) => {
        const time = JulianDate.addSeconds(getStartTime(), i * 30, new JulianDate());
        property.addSample(time, Cartesian3.fromDegrees(pos.lng, pos.lat, pos.alt ? pos.alt : 0));
    });

    
    property.setInterpolationOptions({
        interpolationDegree: 5,
        interpolationAlgorithm: LagrangePolynomialApproximation,
    })

    viewer.entities.add({
        id: label,
        position: property,
        availability: new TimeIntervalCollection([
            new TimeInterval({
                start: getStartTime(),
                stop: getStopTime(),
            }),
        ]),
        orientation: new VelocityOrientationProperty(property),
        name: label,
        billboard: {
            image: symbol,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            scale: .4,
            eyeOffset: new Cartesian3(0, 1.5, 0),
        },
    });

}

export function generateRectangle(west: number, south: number, east: number, north: number, name: string, color: string, symbol = "", scale = 5) {
    const rectangle = Rectangle.fromDegrees(west, south, east, north);
    const center = Rectangle.center(rectangle);
    const position = Cartographic.toCartesian(center);

    // "flat" symbology
    const longitude = CesiumMath.toDegrees(center.longitude);
    const latitude = CesiumMath.toDegrees(center.latitude);
    const topLeft = vincentyDirection(longitude, latitude, 315, scale);
    const botLeft = vincentyDirection(longitude, latitude, 225, scale);
    const botRight = vincentyDirection(longitude, latitude, 135, scale);
    const topRight = vincentyDirection(longitude, latitude, 45, scale);

    viewer.entities.add({
        name: name,
        position: position,
        rectangle: {
            coordinates: rectangle, // left middle, bot middle, right middle, top middle
            material: Color.fromCssColorString(color).withAlpha(.25),
            heightReference: HeightReference.CLAMP_TO_GROUND,
            height: 0,
            extrudedHeight: .25,
            outline: true,
            outlineColor: Color.fromCssColorString(color),
            outlineWidth: 1
        },
        polygon: {
            hierarchy: {
                positions: Cartesian3.fromDegreesArray([
                    topLeft.lng,
                    topLeft.lat,
                    botLeft.lng,
                    botLeft.lat,
                    botRight.lng,
                    botRight.lat,
                    topRight.lng,
                    topRight.lat
                ]),
                holes: []
            },
            material: symbol ? new ImageMaterialProperty({image: symbol, transparent: true}) : Color.TRANSPARENT,
            height: .5,
            heightReference: HeightReference.RELATIVE_TO_GROUND
        },
        label: {
            text: name,
            ...basicLabel,
            backgroundColor: Color.fromCssColorString(color).withAlpha(.5),
        }
    });

}

export function generateEllipse(lng: number, lat: number, alt = 0, name: string, color: string, symbol: string, scale = 4) {

    // "flat" symbology
    const position = Cartesian3.fromDegrees(lng, lat, alt);
    const topLeft = vincentyDirection(lng, lat, 315, scale * .75);
    const botLeft = vincentyDirection(lng, lat, 225, scale * .75);
    const botRight = vincentyDirection(lng, lat, 135, scale * .75);
    const topRight = vincentyDirection(lng, lat, 45, scale * .75);

    viewer.entities.add({
        name: name,
        position: position,
        ellipse: {
            semiMinorAxis: scale,
            semiMajorAxis: scale,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            material: Color.fromCssColorString(color).withAlpha(.25),
            height: alt,
            extrudedHeight: alt + .25,
            outline: true,
            outlineColor: Color.fromCssColorString(color),
            outlineWidth: 1
        },
        polygon: {
            hierarchy: {
                positions: Cartesian3.fromDegreesArray([
                    topLeft.lng,
                    topLeft.lat,
                    botLeft.lng,
                    botLeft.lat,
                    botRight.lng,
                    botRight.lat,
                    topRight.lng,
                    topRight.lat
                ]),
                holes: []
            },
            material: symbol ? new ImageMaterialProperty({image: symbol, transparent: true}) : Color.TRANSPARENT,
            height: alt + .25,
            heightReference: HeightReference.RELATIVE_TO_GROUND
        },
        label: {
            text: name,
            ...basicLabel,
            backgroundColor: Color.fromCssColorString(color).withAlpha(.5),
        }
    });
}

export function generatePoint(lng: number, lat: number, alt: number = 0, text: string, color = Color.WHITE, outlineColor = Color.BLACK) {
    
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lng, lat, alt),
        point: {
            ...basicPoint,
            color: color,
            outlineColor: outlineColor,
        },
        label: {
            ...basicLabel,
            backgroundColor: color,
            fillColor: outlineColor,
            text: text
        }
    });
}

export function generateAnimatedPoint(positions: any[], text: string, line = true, color = Color.WHITE, outlineColor = Color.BLACK) {

    const property = new SampledPositionProperty();

    // add first position as last for looping
    positions.push(positions[0]);
    positions.forEach((pos: any, i) => {
        const time = JulianDate.addSeconds(getStartTime(), i * 30, new JulianDate());
        property.addSample(time, Cartesian3.fromDegrees(pos.lng, pos.lat, pos.alt ? pos.alt : 0));
        if (line) {
            //Also create a point for each sample we generate.
            viewer.entities.add({
                position: Cartesian3.fromDegrees(pos.lng, pos.lat, pos.alt),
                point: {
                    pixelSize: 10,
                    color: Color.TRANSPARENT,
                    outlineColor: Color.WHITE,
                    outlineWidth: 3,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    heightReference : HeightReference.CLAMP_TO_GROUND
                },
            });
        }
    });

    let polyline = undefined;

    if (line) {
        polyline = {
            positions: positions.map((pos: any) => Cartesian3.fromDegrees(pos.lng, pos.lat)),
            material: new PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Color.WHITE,
            }),
            width: 10,
            clampToGround: true
        }
    } else {
        property.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation,
        })
    }

    viewer.entities.add({
        position: property,
        availability: new TimeIntervalCollection([
            new TimeInterval({
                start: getStartTime(),
                stop: getStopTime(),
            }),
        ]),
        polyline: polyline,
        orientation: new VelocityOrientationProperty(property),
        point: {
            ...basicPoint,
            color: color,
            outlineColor: outlineColor,
        },
        label: {
            ...basicLabel,
            backgroundColor: color,
            fillColor: outlineColor,
            text: text
        }
    });

}

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const basicPoint = {
    pixelSize: 10,
    outlineWidth: 1,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    heightReference : HeightReference.RELATIVE_TO_GROUND
};

export const basicLabel = {
    show: false,
    font: "14px sans-serif",
    fillColor: Color.WHITE,
    backgroundColor: Color.BLACK,
    showBackground: true,
    outline: true,
    outlineColor: Color.BLACK,
    outlineWidth: 3,
    style: LabelStyle.FILL_AND_OUTLINE,
    horizontalOrigin: HorizontalOrigin.LEFT,
    verticalOrigin: VerticalOrigin.BOTTOM,
    heightReference: HeightReference.RELATIVE_TO_GROUND,
    eyeOffset: new Cartesian3(0, 1, -2),
    translucencyByDistance: new NearFarScalar(4e2, 1, 10.0e2, 0),
}

/*!
 * JavaScript function to calculate the destination point given start point latitude / longitude (numeric degrees), bearing (numeric degrees) and distance (in m).
 *
 * Taken from http://movable-type.co.uk/scripts/latlong-vincenty-direct.html and optimized / cleaned up by Mathias Bynens <http://mathiasbynens.be/>
 * Based on the Vincenty direct formula by T. Vincenty, “Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations”, Survey Review, vol XXII no 176, 1975 <http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf>
 */
export function vincentyDirection(lng: number, lat: number, brng: number, dist: number) {

    function toRad(degrees: number) {
        return degrees * Math.PI / 180;
    }
    
    function toDeg(radians: number) {
        return radians * 180 / Math.PI;
    }

    const a = 6378137;
    const b = 6356752.3142;
    const f = 1 / 298.257223563; // WGS-84 ellipsiod
    const s = dist;
    const alpha1 = toRad(brng);
    const sinAlpha1 = Math.sin(alpha1);
    const cosAlpha1 = Math.cos(alpha1);
    const tanU1 = (1 - f) * Math.tan(toRad(lat));
    const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1;
    const sigma1 = Math.atan2(tanU1, cosAlpha1);
    const sinAlpha = cosU1 * sinAlpha1;
    const cosSqAlpha = 1 - sinAlpha * sinAlpha;
    const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let cos2SigmaM = 0;
    let sinSigma = 0;
    let cosSigma = 0;
    let sigma = s / (b * A);
    let sigmaP = 2 * Math.PI;
    while (Math.abs(sigma - sigmaP) > 1e-12) {
        cos2SigmaM = Math.cos(2*sigma1 + sigma);
        sinSigma = Math.sin(sigma);
        cosSigma = Math.cos(sigma);
        const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        sigmaP = sigma;
        sigma = s / (b * A) + deltaSigma;
    };
    const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1
    const latitude = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    const revAz = Math.atan2(sinAlpha, -tmp); // final bearing
    return { lng: lng + toDeg(L), lat: toDeg(latitude) };
};

// const osmBuildings = createOsmBuildings();
// scene.primitives.add(osmBuildings);
// scene.globe.depthTestAgainstTerrain = true;

// osmBuildings.style = new Cesium3DTileStyle({
//     color: {
//         conditions: [
//             // ["${feature['building']} === 'apartments' || ${feature['building']} === 'residential'", "color('cyan', 1)",],
//             // ["${feature['building']} === 'civic'","color('blue', 1)",],
//             // ["${feature['building']} === 'office'","color('yellow', 1)",],
//             // ["${feature['building']} === 'commercial' || ${feature['building']} === 'retail'","color('green', 1)",],
//             // ["${feature['building']} === 'hospital'","color('red', 1)",],
//             // ["${feature['building']} === 'construction'","color('orange', 1)",],
//             // ["${feature['building']} === 'school'","color('purple', 1)",],
//             // ["${feature['building']} === 'parking'","color('pink', 1)",],
//             ["${feature['name']} === 'The Landmark Center'", "color('white', 0)"],
//             [true, "color('white', 1)"],
//         ],
//     }
// });