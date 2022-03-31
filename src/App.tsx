import { RefObject, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange } from "cesium";
import fireSingle from "./assets/img/fire_single.png";
import fireVehicle from "./assets/img/fire_vehicle.png";
import policeSingle from "./assets/img/police_single.png";
import policeVehicle from "./assets/img/police_vehicle.png";
import emsSingle from "./assets/img/ems_single.png";
import emsVehicle from "./assets/img/ems_vehicle.png";
import fireIncident from "./assets/img/fire_incident.png";
import incidentCommandPost from "./assets/img/incident_command_post.png";
import { UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, UNIT_TYPE_SINGLE, UNIT_TYPE_VEHICLE, UNIT_ORG_FIRE, UNIT_ORG_EMS, UNIT_ORG_POLICE, FIRE_RED, EMS_GREEN, POLICE_BLUE } from "./Utils";

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
scene.requestRenderMode = true;

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
                    billboard: {
                        image: fireIncident,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        heightReference: HeightReference.RELATIVE_TO_GROUND,
                        pixelOffset: new Cartesian2(0, -60)
                    },
                    ellipse: {
                        semiMinorAxis: 35,
                        semiMajorAxis: 35,
                        heightReference: HeightReference.CLAMP_TO_GROUND,
                        material: Color.fromCssColorString("rgba(165, 0, 38, .3)"),
                        height: 2,
                        extrudedHeight: 1,
                        outline: true,
                        outlineColor: Color.fromCssColorString("#A50026"),
                        outlineWidth: 3,
                        zIndex: 2
                    },
                    label: {
                        show: true,
                        text: name,
                        font: "16px 'IBM Plex Sans'",
                        fillColor: Color.WHITE,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        heightReference: HeightReference.RELATIVE_TO_GROUND,
                        showBackground: true,
                        backgroundColor: Color.BLACK,
                        // translucencyByDistance: new NearFarScalar(1.0e1, 1.0, 3.0e3, 0.0)
                    }
                });
                viewer.entities.add({
                    position: Cartesian3.fromDegrees(lng, lat, alt),
                    ellipse: {
                        semiMinorAxis: 40,
                        semiMajorAxis: 40,
                        height: 1,
                        extrudedHeight: 1,
                        heightReference: HeightReference.CLAMP_TO_GROUND,
                        material: Color.fromCssColorString("rgba(254, 224, 144, .5)"),
                        outline: true,
                        outlineColor: Color.fromCssColorString("#FEE090"),
                        outlineWidth: 3
                    },
                })
            }
        }
    }
});

osmBuildings.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            // ["${feature['building']} === 'apartments' || ${feature['building']} === 'residential'", "color('cyan', 1)",],
            // ["${feature['building']} === 'civic'","color('blue', 1)",],
            // ["${feature['building']} === 'office'","color('yellow', 1)",],
            // ["${feature['building']} === 'commercial' || ${feature['building']} === 'retail'","color('green', 1)",],
            // ["${feature['building']} === 'hospital'","color('red', 1)",],
            // ["${feature['building']} === 'construction'","color('orange', 1)",],
            // ["${feature['building']} === 'school'","color('purple', 1)",],
            // ["${feature['building']} === 'parking'","color('pink', 1)",],
            [true, "color('white', 1)"],
        ],
    }
});

// https://napsg-web.s3.amazonaws.com/symbology/index.html#/
// https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
// https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
// https://sandcastle.cesium.com/?src=Interpolation.html

addBasicPoint(-86.155112, 39.781147, 0, "Red Car", Color.RED);
addBasicPoint(-86.155534, 39.781028, 0, "White Truck", Color.WHITE);

UNITS_SINGLE_FIRE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_FIRE, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
UNITS_VEHICLE_FIRE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_FIRE, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
addRectangle(-86.157423, 39.781252, -86.156713, 39.781454, -86.157077, 39.781357, 0, "FIRE STAGING", Color.fromCssColorString(FIRE_RED));
UNITS_SINGLE_POLICE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_POLICE, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
UNITS_VEHICLE_POLICE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_POLICE, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
addRectangle(-86.157633, 39.782218, -86.157388, 39.782385, -86.157504, 39.782292, 0, "BARRICADE NW", Color.fromCssColorString(POLICE_BLUE));
addRectangle(-86.157697, 39.781040, -86.157388, 39.781265, -86.157549, 39.781160, 0, "BARRICADE SW", Color.fromCssColorString(POLICE_BLUE));
addRectangle(-86.155905, 39.782153, -86.155651, 39.782332, -86.155735, 39.782249, 0, "BARRICADE NE", Color.fromCssColorString(POLICE_BLUE));
addRectangle(-86.155953, 39.780997, -86.155668, 39.781199, -86.155745, 39.781099, 0, "BARRICADE SE", Color.fromCssColorString(POLICE_BLUE));
UNITS_SINGLE_EMS.forEach((unit: any) => addUnitBillboard(UNIT_ORG_EMS, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
UNITS_VEHICLE_EMS.forEach((unit: any) => addUnitBillboard(UNIT_ORG_EMS, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat)));
addRectangle(-86.156576, 39.781257, -86.155908, 39.781443, -86.156255, 39.781350, 0, "EMS STAGING", Color.fromCssColorString(EMS_GREEN));

addBillboard(incidentCommandPost, "Incident Command Post", Cartesian3.fromDegrees(-86.156652, 39.781150));

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
        locationMouse.label.show = true;
        locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
    } else {
        locationMouse.label.show = false;
    }
    scene.requestRender();
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

function addBillboard(image: string, label: string, position: Cartesian3) {

    viewer.entities.add({
        position: position,
        billboard: {
            image: image,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND
        },
        label: {
            text: label,
            show: true,
            font: "12px 'IBM Plex Sans'",
            fillColor: Color.WHITE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.BLACK,
            horizontalOrigin: HorizontalOrigin.CENTER,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, 60)
        }
    });

}

function addUnitBillboard(org: string, type: string, position: Cartesian3) {
    
    let image = "";
    if (org === UNIT_ORG_FIRE) {
        image = type === UNIT_TYPE_VEHICLE ? fireVehicle : fireSingle;
    } else if (org === UNIT_ORG_POLICE) {
        image = type === UNIT_TYPE_VEHICLE ? policeVehicle : policeSingle;
    } else if (org === UNIT_ORG_EMS) {
        image = type === UNIT_TYPE_VEHICLE ? emsVehicle : emsSingle;
    }

    viewer.entities.add({
        position: position,
        billboard: {
            image: image,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            pixelOffset: new Cartesian2(0, -60)
        },
        label: {
            text: type,
            show: true,
            font: "16px 'IBM Plex Sans'",
            fillColor: Color.BLACK,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.fromCssColorString(`rgba(255, 255, 255, .6)`),
            horizontalOrigin: HorizontalOrigin.LEFT,
            verticalOrigin: VerticalOrigin.BASELINE,
            pixelOffset: type === "vehicle" ? new Cartesian2(-10, -93) : new Cartesian2(5, -95)
        }
    });

}

function addRectangle(west: number, south: number, east: number, north: number, lng: number, lat: number, alt: number, text: string, color: Color) {
    viewer.entities.add({
        position: Cartesian3.fromDegrees(lng, lat, alt),
        rectangle: {
            coordinates: Rectangle.fromDegrees(west, south, east, north), // left middle, bot middle, right middle, top middle
            material: color,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            // height: 1,
            // extrudedHeight: 1,
            // outline: true,
            // outlineColor: color,
            // outlineWidth: 10
        },
        label: {
            show: true,
            text: text,
            font: "16px 'IBM Plex Sans'",
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
