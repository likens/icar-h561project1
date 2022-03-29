import { RefObject, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange } from "cesium";
import fireSingle from "./assets/img/fire_single.png";
import fireVehicle from "./assets/img/fire_vehicle.png";
import policeSingle from "./assets/img/police_single.png";
import policeVehicle from "./assets/img/police_vehicle.png";
import emsSingle from "./assets/img/ems_single.png";
import emsVehicle from "./assets/img/ems_vehicle.png";

const locationDiv = document.getElementById("location");
const terrainProvider = createWorldTerrain();
const osmBuildings = createOsmBuildings();

const viewer = new Viewer("cesiumContainer", {
    terrainProvider: terrainProvider
});
viewer.imageryLayers.addImageryProvider(
    new IonImageryProvider({ assetId: 3 })
);

// //Set bounds of our simulation time
// const start = JulianDate.fromDate(new Date(2015, 2, 25, 16));
// const stop = JulianDate.addSeconds(start, 360, new JulianDate());

// //Make sure viewer is at the desired time.
// viewer.clock.startTime = start.clone();
// viewer.clock.stopTime = stop.clone();
// viewer.clock.currentTime = start.clone();
// viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
// viewer.clock.multiplier = 10;

const scene = viewer.scene;
scene.primitives.add(osmBuildings);
scene.globe.depthTestAgainstTerrain = true;

scene.camera.setView({
    destination: Cartesian3.fromDegrees(-86.15797, 39.77999, 300),
    orientation: {
        heading: Math.toRadians(20),
        pitch: Math.toRadians(-30),
    },
}); 

osmBuildings.initialTilesLoaded.addEventListener((tiles) => {
    console.log("initial osm buildings loaded", tiles);
});

osmBuildings.allTilesLoaded.addEventListener((tile) => {
    console.log("all osm buildings loaded", tile);
});

osmBuildings.tileLoad.addEventListener((tile: Cesium3DTile) => {
    const content = tile.content;
    const featuresLength = content.featuresLength;
    for (let i = 0; i < featuresLength; i++) {
        const name = content.getFeature(i).getProperty("name");
        if (name === "The Landmark Center") {
            const lng = content.getFeature(i).getProperty("cesium#longitude");
            const lat = content.getFeature(i).getProperty("cesium#latitude");
            const alt = parseInt(content.getFeature(i).getProperty("cesium#estimatedHeight"));
            const str = `${lng}:${lat}:${alt}`;
            const ent = viewer.entities.getById(str);
            if (!ent) {
                viewer.entities.add({
                    id: str,
                    position: Cartesian3.fromDegrees(lng, lat, alt),
                    // polyline: {
                    //     show: true,
                    //     positions: [positionEnd, positionStart],
                    //     width: 2,
                    //     arcType: ArcType.NONE,
                    //     material: new PolylineOutlineMaterialProperty({
                    //         color: Color.BLACK,
                    //     }),
                    // },
                    label: {
                        show: true,
                        text: name,
                        font: "20px monospace",
                        fillColor: Color.WHITE,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        heightReference: HeightReference.RELATIVE_TO_GROUND,
                        showBackground: true,
                        backgroundColor: Color.BLACK,
                        // translucencyByDistance: new NearFarScalar(1.0e1, 1.0, 3.0e3, 0.0)
                    }
                });
            }
        }
    }
});

osmBuildings.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            ["${feature['building']} === 'apartments' || ${feature['building']} === 'residential'", "color('cyan', 1)",],
            ["${feature['building']} === 'civic'","color('blue', 1)",],
            ["${feature['building']} === 'office'","color('yellow', 1)",],
            ["${feature['building']} === 'commercial' || ${feature['building']} === 'retail'","color('green', 1)",],
            ["${feature['building']} === 'hospital'","color('red', 1)",],
            ["${feature['building']} === 'construction'","color('orange', 1)",],
            ["${feature['building']} === 'school'","color('purple', 1)",],
            ["${feature['building']} === 'parking'","color('pink', 1)",],
            [true, "color('white', 1)"],
        ],
    }
});

// https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
// https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
// https://sandcastle.cesium.com/?src=Interpolation.html

addBasicPoint(-86.155112, 39.781147, 0, "Red Car", Color.RED);
addBasicPoint(-86.155534, 39.781028, 0, "White Truck", Color.WHITE);

// Fire
addBillboard(-86.156922, 39.781387, 0, fireSingle);
addBillboard(-86.156886, 39.781286, 0, fireSingle);
addBillboard(-86.156737, 39.781397, 0, fireSingle);
addBillboard(-86.157261, 39.781358, 0, fireVehicle);
addBillboard(-86.156826, 39.781351, 0, fireSingle);
addRectangle(-86.157423, 39.781252, -86.156713, 39.781454, -86.157077, 39.781357, 0, "FIRE STAGING", Color.fromCssColorString('rgba(215, 48, 39, .5)'));

// Police
addBillboard(-86.157446, 39.783739, 0, policeVehicle);
addBillboard(-86.157523, 39.782254, 0, policeSingle);
addBillboard(-86.157503, 39.782246, 0, policeSingle);
addBillboard(-86.157493, 39.782332, 0, policeSingle);
addBillboard(-86.157542, 39.782290, 0, policeVehicle);
addRectangle(-86.157633, 39.782218, -86.157388, 39.782385, -86.157504, 39.782292, 0, "BARRICADE", Color.fromCssColorString('rgba(116, 173, 209, .5)'));
addBillboard(-86.157512, 39.781206, 0, policeVehicle);
addBillboard(-86.157586, 39.781204, 0, policeSingle);
addBillboard(-86.157519, 39.781100, 0, policeSingle);
addRectangle(-86.157697, 39.781040, -86.157388, 39.781265, -86.157549, 39.781160, 0, "BARRICADE", Color.fromCssColorString('rgba(116, 173, 209, .5)'));

// EMS
addBillboard(-86.156478, 39.781398, 0, emsSingle);
addBillboard(-86.156508, 39.781335, 0, emsSingle);
addBillboard(-86.156307, 39.781426, 0, emsSingle);
addBillboard(-86.156350, 39.781364, 0, emsSingle);
addBillboard(-86.156092, 39.781399, 0, emsVehicle);
addBillboard(-86.155975, 39.781365, 0, emsVehicle);
addRectangle(-86.156576, 39.781257, -86.155908, 39.781443, -86.156255, 39.781350, 0, "EMS STAGING", Color.fromCssColorString('rgba(127, 188, 65, .5)'));

viewer.entities.add({
    id: 'mouse',
    label: {
        show: true,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        font: "12px monospace",
        fillColor: Color.WHITE,
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.75),
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(10, 0)
    }
});

// Mouse over the globe to see the cartographic position
const handler = new ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function onMouseMove(movement) {
    const locationMouse: any = viewer.entities.getById('mouse');
    const cartesian = scene.pickPosition(movement.endPosition)
    if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
        const heightString = Math.toDegrees(cartographic.height).toFixed(2);
        locationMouse.position = cartesian;
		// if (locationDiv) {
		// 	locationDiv.innerHTML = `${longitudeString}, ${latitudeString} | ${heightString}m`;
		// }
        // const feature = scene.pick(movement.endPosition);
        // if (defined(feature)) {
        //     const name = feature.getProperty("name");
        //     if (name) {
        //         locationString = `${name}, ${locationString}`;
        //     }
        // }
        locationMouse.label.show = true;
        locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
    } else {
        locationMouse.label.show = false;
    }
}, ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function onMouseMove(movement) {
    const cartesian = scene.pickPosition(movement.position)
    if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
        console.log(`${longitudeString}, ${latitudeString}`);
    }
}, ScreenSpaceEventType.LEFT_CLICK);


function addBasicPoint(lat: number, lng: number, alt: number = 0, text: string, color = Color.WHITE, outlineColor = Color.BLACK) {

    const basicPoint = {
        pixelSize: 10,
        color: color,
        outlineColor: outlineColor,
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference : HeightReference.CLAMP_TO_GROUND
    };

    // const basicLine = {
    //     positions: Cartesian3.fromDegreesArrayHeights([lng, lat, alt, lng, lat, 50,]),
    //     width: 5,
    //     material: new PolylineOutlineMaterialProperty({
    //         color: color,
    //         outlineWidth: 2,
    //         outlineColor: outlineColor,
    //     }),
    // }

    const basicLabel = {
        show: true,
        font: "14px monospace",
        outlineColor: outlineColor,
        outlineWidth: 20,
        fillColor: outlineColor,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        heightReference : HeightReference.RELATIVE_TO_GROUND,
        showBackground: true,
        backgroundColor: color,
        horizontalOrigin: HorizontalOrigin.CENTER,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(7, -30)
    }

    viewer.entities.add({
        position: Cartesian3.fromDegrees(lat, lng, alt),
        point: basicPoint,
        // polyline: basicLine,
        label: {
            ...basicLabel,
            text: text
        }
    });
}

function addBillboard(lat: number, lng: number, alt: number = 0, image: string,) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lat, lng, alt),
        billboard: {
            image: image,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            pixelOffset: new Cartesian2(0, -60)
        },
    });
}

function addRectangle(west: number, south: number, east: number, north: number, lng: number, lat: number, alt: number, text: string, color: Color) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lng, lat, alt),
        rectangle: {
            coordinates: Rectangle.fromDegrees(west, south, east, north), // left middle, bot middle, right middle, top middle
            material: color,
            heightReference: HeightReference.CLAMP_TO_GROUND
        },
        label: {
            show: true,
            text: text,
            font: "20px monospace",
            fillColor: Color.BLACK,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            showBackground: true,
            backgroundColor: color,
            horizontalOrigin: HorizontalOrigin.CENTER,
            verticalOrigin: VerticalOrigin.BASELINE,
            pixelOffset: new Cartesian2(0, -30)
        }
    });
}

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			{/* <Viewer full terrainProvider={terrainProvider}>
				<Scene>
				</Scene>
				<Globe />
				<Camera>
					<CameraFlyTo 
						destination={position}
						orientation={orientation} /> 
				</Camera>
				<Entity position={position} name="New York">
					<PointGraphics pixelSize={10} />
					<EntityDescription>
						<h1>Hello, world.</h1>
						<p>JSX is available here!</p>
					</EntityDescription>
				</Entity>
			</Viewer> */}
		</div>
	)
}

export default App
