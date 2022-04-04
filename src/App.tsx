import { RefObject, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange, Billboard, GroundPrimitive, Ion } from "cesium";
import fireSingle from "./assets/img/fire_single.png";
import fireVehicle from "./assets/img/fire_vehicle.png";
import policeSingle from "./assets/img/police_single.png";
import policeVehicle from "./assets/img/police_vehicle.png";
import emsSingle from "./assets/img/ems_single.png";
import emsVehicle from "./assets/img/ems_vehicle.png";
import fireIncident from "./assets/img/fire_incident.png";
import incidentCommandPost from "./assets/img/incident_command_post.png";
import triage from "./assets/img/triage.png";
import casualtyCollectionPoint from "./assets/img/casualty_collection_point.png";
import accessBlocked from "./assets/img/access_blocked.png";
import fireStaging from "./assets/img/fire_staging.png";
import emsStaging from "./assets/img/ems_staging.png";
import media from "./assets/img/media.png";
import fireHydrant from "./assets/img/fire_hydrant.png";
import { UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, UNIT_TYPE_SINGLE, UNIT_TYPE_VEHICLE, UNIT_ORG_FIRE, UNIT_ORG_EMS, UNIT_ORG_POLICE, FIRE_RED, EMS_GREEN, POLICE_BLUE, AREAS_RECTANGLE } from "./Utils";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzBlNWQ2My1jMjk1LTQxOWQtYmZmNC1kYjQwOWIyMDU0MDciLCJpZCI6ODM5MjksImlhdCI6MTY0NTk4MzM1OH0.m0c3i42EidYlImKwNh6E2Ylvy2XnTGj7L2Nmu7QBLJM";

const locationDiv = document.getElementById("location");
const terrainProvider = createWorldTerrain();
const osmBuildings = createOsmBuildings();

const viewer = new Viewer("cesiumContainer", {
    terrainProvider: terrainProvider
});
// viewer.imageryLayers.addImageryProvider(
//     new IonImageryProvider({ assetId: 3 })
// );

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
                        font: "16px monospace",
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
            [true, "color('white', .9)"],
        ],
    }
});

// https://napsg-web.s3.amazonaws.com/symbology/index.html#/
// https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
// https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
// https://sandcastle.cesium.com/?src=Interpolation.html

addBasicPoint(-86.155112, 39.781147, 0, "Red Car", Color.RED);
addBasicPoint(-86.155534, 39.781028, 0, "White Truck", Color.WHITE);

AREAS_RECTANGLE.forEach((area: any) => addRectangle(area[0], area[1], area[2], area[3], area[4], area[5]));
UNITS_SINGLE_FIRE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_FIRE, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));
UNITS_VEHICLE_FIRE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_FIRE, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));
UNITS_SINGLE_POLICE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_POLICE, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));
UNITS_VEHICLE_POLICE.forEach((unit: any) => addUnitBillboard(UNIT_ORG_POLICE, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));
UNITS_SINGLE_EMS.forEach((unit: any) => addUnitBillboard(UNIT_ORG_EMS, UNIT_TYPE_SINGLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));
UNITS_VEHICLE_EMS.forEach((unit: any) => addUnitBillboard(UNIT_ORG_EMS, UNIT_TYPE_VEHICLE, Cartesian3.fromDegrees(unit.lng, unit.lat), unit.name));

addBillboard(incidentCommandPost, "Incident Command Post", Cartesian3.fromDegrees(-86.156652, 39.781150));
addBillboard(triage, "Triage", Cartesian3.fromDegrees(-86.156185, 39.781510));
addBillboard(casualtyCollectionPoint, "Casualty Collection Point", Cartesian3.fromDegrees(-86.155900, 39.781635));
addBillboard(fireStaging, "Fire Staging", Cartesian3.fromDegrees(-86.157074, 39.781336));
addBillboard(emsStaging, "EMS Staging", Cartesian3.fromDegrees(-86.156249, 39.781334));
addBillboard(fireHydrant, "Hydrant", Cartesian3.fromDegrees(-86.157441, 39.781357));
addBillboard(fireHydrant, "Hydrant", Cartesian3.fromDegrees(-86.157402, 39.782125));
addBillboard(accessBlocked, "Access Blocked", Cartesian3.fromDegrees(-86.157016, 39.781600));
addBillboard(accessBlocked, "Access Blocked", Cartesian3.fromDegrees(-86.157358, 39.781812));
addBillboard(media, "Media", Cartesian3.fromDegrees(-86.157086, 39.780803));

viewer.entities.add({
    id: 'mouse',
    label: {
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        fillColor: Color.WHITE,
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.75),
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BASELINE,
        pixelOffset: new Cartesian2(20, 0)
    }
});

// Mouse over the globe to see the cartographic position
const handler = new ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function onMouseMove(movement) {
    const locationMouse: any = viewer.entities.getById('mouse');
    const cartesian = scene.pickPosition(movement.endPosition);
    const pick = scene.pick(movement.endPosition);
    if (cartesian) {
        const cartographic = Cartographic.fromCartesian(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
        const heightString = Math.toDegrees(cartographic.height).toFixed(2);
        locationMouse.position = cartesian;
        locationMouse.label.show = true;
        locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
        locationMouse.label.font = "12px monospace";
    } else if (pick?.id?.label?.text) {
        locationMouse.position = scene.globe.pick(viewer.camera.getPickRay(movement.endPosition), scene);
        locationMouse.label.show = true;
        locationMouse.label.text = pick.id.label.text;
        locationMouse.label.font = "20px monospace";
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
            heightReference: HeightReference.CLAMP_TO_GROUND,
            scale: .75
        },
        label: {
            text: label,
            show: false,
            font: "12px monospace",
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

function addUnitBillboard(org: string, type: string, position: Cartesian3, name?: string) {
    
    let image = "";
    if (org === UNIT_ORG_FIRE) {
        image = type === UNIT_TYPE_VEHICLE ? fireVehicle : fireSingle;
    } else if (org === UNIT_ORG_POLICE) {
        image = type === UNIT_TYPE_VEHICLE ? policeVehicle : policeSingle;
    } else if (org === UNIT_ORG_EMS) {
        image = type === UNIT_TYPE_VEHICLE ? emsVehicle : emsSingle;
    }

    viewer.entities.add({
        id: name,
        position: position,
        billboard: {
            image: image,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            pixelOffset: new Cartesian2(0, -60)
        },
        label: {
            text: name ? name : type,
            show: true,
            font: "11px monospace",
            fillColor: Color.BLACK,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.fromCssColorString(`rgba(255, 255, 255, .6)`),
            horizontalOrigin: HorizontalOrigin.LEFT,
            verticalOrigin: VerticalOrigin.BASELINE,
            pixelOffset: type === "vehicle" ? new Cartesian2(-10, -100) : new Cartesian2(5, -95)
        }
    });

}

function addRectangle(west: number, south: number, east: number, north: number, text: string, color: string) {
    const rectangle = Rectangle.fromDegrees(west, south, east, north);
    const center = Rectangle.center(rectangle);
    const position = Cartographic.toCartesian(center);
    // const colorAlpha: Color = color.withAlpha(.5);
    viewer.entities.add({
        position: position,
        rectangle: {
            coordinates: rectangle, // left middle, bot middle, right middle, top middle
            material: Color.fromCssColorString(color).withAlpha(.5),
            heightReference: HeightReference.CLAMP_TO_GROUND,
            // height: 1,
            // extrudedHeight: 1,
            // outline: true,
            // outlineColor: color,
            // outlineWidth: 10
        },
        label: {
            show: false,
            text: text,
            font: "14px monospace",
            fillColor: Color.WHITE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            showBackground: true,
            backgroundColor: Color.BLACK.withAlpha(0.5),
            horizontalOrigin: HorizontalOrigin.CENTER,
            verticalOrigin: VerticalOrigin.BASELINE
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
