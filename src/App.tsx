import { RefObject, useEffect, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange, Billboard, GroundPrimitive, Ion } from "cesium";
import fireCommercial from "./assets/img/napsg/fire_commercial.png";
import incidentCommandPost from "./assets/img/napsg/incident_command_post.png";
import triage from "./assets/img/napsg/triage.png";
import casualtyCollectionPoint from "./assets/img/napsg/casualty_collection_point.png";
import accessBlocked from "./assets/img/napsg/access_blocked.png";
import fireStaging from "./assets/img/napsg/fire_staging.png";
import emsStaging from "./assets/img/napsg/ems_staging.png";
import media from "./assets/img/napsg/media.png";
import fireHydrant from "./assets/img/napsg/fire_hydrant.png";
import noWaterSupply from "./assets/img/napsg/fire_no_water_supply.png";
import emergencyOperationsCenter from "./assets/img/napsg/emergency_operations_center.png";
import jointOperationsCenter from "./assets/img/napsg/joint_operations_center.png";
import usarTaskForce from "./assets/img/napsg/search_and_rescue_task_force.png";
import evacTeam from "./assets/img/napsg/evacuation_coordination_team.png";
import doNotEnter from "./assets/img/napsg/fire_do_not_enter.png";
import hazardousEntry from "./assets/img/napsg/fire_hazardous_entry.png";
import fireLadder from "./assets/img/napsg/fire_ladder.png";
import { UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, UNIT_TYPE_SINGLE, UNIT_TYPE_VEHICLE, AREAS_RECTANGLE, vincentyDirection } from "./Utils";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWI3MDRlMi1hMGMyLTQzYjUtYTYxMy0zOGNlYjViOTdjMGIiLCJpZCI6ODM5MjksImlhdCI6MTY0OTExOTQ3MX0.j_tC4ZO5-0FDV4_n-edMAlcQK5EyuV9WyRhfv_4yjEU";

let viewer: any = undefined;
let pointerEnabled = true;

function startCesium() {

    // https://napsg-web.s3.amazonaws.com/symbology/index.html#/
    // https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
    // https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
    // https://sandcastle.cesium.com/?src=Interpolation.html
  
    // //Set bounds of our simulation time
    // const start = JulianDate.fromDate(new Date(2015, 2, 25, 16));
    // const stop = JulianDate.addSeconds(start, 360, new JulianDate());

    // //Make sure viewer is at the desired time.
    // viewer.clock.startTime = start.clone();
    // viewer.clock.stopTime = stop.clone();
    // viewer.clock.currentTime = start.clone();
    // viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
    // viewer.clock.multiplier = 10;
    const terrainProvider = createWorldTerrain();
    const osmBuildings = createOsmBuildings();
    
    viewer = new Viewer("cesiumContainer", {
        terrainProvider: terrainProvider
    });
    
    const layer = viewer.imageryLayers.addImageryProvider(
        new IonImageryProvider({ assetId: 3 })
    );

    const scene = viewer.scene;
    scene.primitives.add(osmBuildings);
    // scene.globe.depthTestAgainstTerrain = true;

    // scene.camera.flyTo({
    //     destination: Cartesian3.fromDegrees(-86.15797, 39.77999, 300),
    //     orientation: {
    //         heading: CesiumMath.toRadians(20),
    //         pitch: CesiumMath.toRadians(-30),
    //     },
    //     duration: 10
    // });
    scene.camera.flyTo({
        destination: Cartesian3.fromDegrees(-86.156549, 39.781745, 300),
        duration: 3
    });

    setTimeout(() => {
        scene.camera.flyTo({
            destination: Cartesian3.fromDegrees(-86.157733, 39.780477, 300),
            orientation: {
                heading: CesiumMath.toRadians(30),
                pitch: CesiumMath.toRadians(-40),
            },
            duration: 3
        });
    }, 3000);

    osmBuildings.tileLoad.addEventListener((tile: Cesium3DTile) => {
        const content = tile.content;
        const featuresLength = content.featuresLength;
        for (let i = 0; i < featuresLength; i++) {
            const name = content.getFeature(i).getProperty("name");
            if (name === "The Landmark Center") {
                console.log(content.getFeature(i));
                const lng = content.getFeature(i).getProperty("cesium#longitude");
                const lat = content.getFeature(i).getProperty("cesium#latitude");
                const alt = parseInt(content.getFeature(i).getProperty("cesium#estimatedHeight"));
                const str = `${lng}:${lat}:${alt}`;
                const ent = viewer.entities.getById(str);
                if (!ent) {
                    viewer.entities.add({
                        id: str,
                        position: Cartesian3.fromDegrees(lng, lat, alt),
                        name: name,
                        billboard: {
                            image: fireCommercial,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            heightReference: HeightReference.RELATIVE_TO_GROUND,
                            pixelOffset: new Cartesian2(0, -60)
                        },
                        ellipse: {
                            semiMinorAxis: 35,
                            semiMajorAxis: 35,
                            heightReference: HeightReference.CLAMP_TO_GROUND,
                            material: Color.fromCssColorString("rgba(165, 0, 38)").withAlpha(.25),
                            height: .05,
                            extrudedHeight: .05,
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
                            height: .05,
                            extrudedHeight: .05,
                            heightReference: HeightReference.CLAMP_TO_GROUND,
                            material: Color.fromCssColorString("rgba(254, 224, 144)").withAlpha(.5),
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

    AREAS_RECTANGLE.forEach((area: any) => {
        addRectangle(area[0], area[1], area[2], area[3], area[4], area[5]);
    });

    UNITS_SINGLE_FIRE.forEach((unit: any) => {
        generateUnitPointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_FIRE.forEach((unit: any) => {
        generateVehiclePointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_SINGLE_POLICE.forEach((unit: any) => {
        generateUnitPointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_POLICE.forEach((unit: any) => {
        generateVehiclePointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_SINGLE_EMS.forEach((unit: any) => {
        generateUnitPointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_EMS.forEach((unit: any) => {
        generateVehiclePointer(unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });

    const landMarkCenterPolygon = Cartesian3.fromDegreesArray([
        -86.156989, 39.782047,
        -86.157047, 39.782091,
        -86.157261, 39.781942,
        -86.157196, 39.781887,
        -86.157258, 39.781838,
        -86.157090, 39.781702,
        -86.157040, 39.781735,
        -86.156919, 39.781690,
        -86.156737, 39.781820,
        -86.156771, 39.781852,
        -86.156697, 39.781919,
        -86.156927, 39.782097
    ]);

    viewer.entities.add({
        position: Cartesian3.fromDegrees(-86.157, 39.78187, 0),
        polygon: {
            hierarchy: {
                positions: landMarkCenterPolygon,
                holes: []
            },
            material: Color.fromCssColorString("#FFFFFF"),
            height: .5,
            heightReference: HeightReference.RELATIVE_TO_GROUND,
            extrudedHeight: 1,
            extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
            outline: true,
            outlineColor: Color.BLACK,
            outlineWidth: 1
        },
    });

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
    addBillboard(noWaterSupply, "No Water Supply", Cartesian3.fromDegrees(-86.156536, 39.782215));
    addBillboard(emergencyOperationsCenter, "Emergency Operations Center", Cartesian3.fromDegrees(-86.157625, 39.781609));
    addBillboard(jointOperationsCenter, "Joint Operations Center", Cartesian3.fromDegrees(-86.156554, 39.781168));
    addBillboard(usarTaskForce, "Search and Rescue Task Force", Cartesian3.fromDegrees(-86.156691, 39.782050));
    addBillboard(evacTeam, "Evacuation Coordination Team", Cartesian3.fromDegrees(-86.156442, 39.781821));
    addBillboard(doNotEnter, "Do Not Enter", Cartesian3.fromDegrees(-86.157211, 39.781712));
    addBillboard(hazardousEntry, "Hazardous Entry", Cartesian3.fromDegrees(-86.156781, 39.781999));

    function generateVehiclePointer(label: string, symbol: string, lng: number, lat: number, brng: number, color: string = "#ffffff", scale = 4) {

        const east = 90;
        const south = 180;
        const west = 270;

        const centerTop = vincentyDirection(lng, lat, brng, scale * .5);
        const centerBot = vincentyDirection(lng, lat, south + brng, scale * .5);
        const centerPoint = vincentyDirection(lng, lat, brng, scale);
        const cornerTopLeft = vincentyDirection(centerTop.lng, centerTop.lat, west + brng, scale * .25);
        const cornerTopRight = vincentyDirection(centerTop.lng, centerTop.lat, east + brng, scale * .25);
        const cornerBotLeft = vincentyDirection(centerBot.lng, centerBot.lat, west + brng, scale * .25);
        const cornerBotRight = vincentyDirection(centerBot.lng, centerBot.lat, east + brng, scale * .25);
        
        const polygonPoints = Cartesian3.fromDegreesArray([
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

        viewer.entities.add({
            id: `pointer_vehicle_${label}`,
            name: label,
            position: Cartesian3.fromDegrees(lng, lat, 0),
            show: pointerEnabled,
            polygon: {
                hierarchy: {
                    positions: polygonPoints,
                    holes: []
                },
                material: Color.fromCssColorString(color),
                height: .5,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                extrudedHeight: 1,
                extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
                outline: true,
                outlineColor: Color.BLACK,
                outlineWidth: 1
            },
            // label: {
            //     text: label,
            //     show: pointerEnabled,
            //     font: "12px monospace",
            //     fillColor: Color.BLACK,
            //     backgroundColor: Color.fromCssColorString(color),
            //     showBackground: true,
            //     horizontalOrigin: HorizontalOrigin.CENTER,
            //     verticalOrigin: VerticalOrigin.CENTER,
            //     disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //     heightReference: HeightReference.RELATIVE_TO_GROUND,
            //     eyeOffset: new Cartesian3(0, 1, 0),
            //     outlineColor: Color.BLACK,
            //     outlineWidth: 1
            // },
        });

        viewer.entities.add({
            id: `billboard_vehicle_${label}`,
            name: label,
            position: Cartesian3.fromDegrees(lng, lat, 0),
            show: !pointerEnabled,
            billboard: {
                image: symbol,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                pixelOffset: new Cartesian2(0, -60)
            },
            label: {
                text: label,
                font: "11px monospace",
                fillColor: Color.BLACK,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                showBackground: true,
                backgroundColor: Color.fromCssColorString(`rgba(255, 255, 255, .6)`),
                horizontalOrigin: HorizontalOrigin.LEFT,
                verticalOrigin: VerticalOrigin.BASELINE,
                pixelOffset: new Cartesian2(-10, -100)
            },
        });

    };

    function generateUnitPointer(label: string, symbol: string, lng: number, lat: number, brng: number, color: string = "#ffffff", scale = 1.5) {

        const east = 90;
        const south = 180;
        const west = 270;

        const centerTop = vincentyDirection(lng, lat, brng, scale * -.75);
        const centerBot = vincentyDirection(lng, lat, south + brng, scale);
        const centerPoint = vincentyDirection(lng, lat, brng, scale);
        const cornerBotLeft = vincentyDirection(centerBot.lng, centerBot.lat, west + brng, scale * .75);
        const cornerBotRight = vincentyDirection(centerBot.lng, centerBot.lat, east + brng, scale * .75);
        
        const polygonPoints = Cartesian3.fromDegreesArray([
            centerTop.lng,
            centerTop.lat,
            cornerBotRight.lng,
            cornerBotRight.lat,
            centerPoint.lng,
            centerPoint.lat,
            cornerBotLeft.lng,
            cornerBotLeft.lat
        ]);

        viewer.entities.add({
            id: `pointer_unit_${label}`,
            name: label,
            position: Cartesian3.fromDegrees(lng, lat, 0),
            show: pointerEnabled,
            polygon: {
                hierarchy: {
                    positions: polygonPoints,
                    holes: []
                },
                material: Color.fromCssColorString(color),
                height: .5,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                extrudedHeight: 1,
                extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
                outline: true,
                outlineColor: Color.BLACK,
                outlineWidth: 1
            },
            // label: {
            //     text: label,
            //     font: "12px monospace",
            //     fillColor: Color.BLACK,
            //     backgroundColor: Color.fromCssColorString(color),
            //     showBackground: true,
            //     horizontalOrigin: HorizontalOrigin.CENTER,
            //     verticalOrigin: VerticalOrigin.CENTER,
            //     disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //     heightReference: HeightReference.RELATIVE_TO_GROUND,
            //     eyeOffset: new Cartesian3(0, 1, 0),
            //     outlineColor: Color.BLACK,
            //     outlineWidth: 1
            // }
        });

        viewer.entities.add({
            id: `billboard_unit_${label}`,
            name: label,
            position: Cartesian3.fromDegrees(lng, lat, 0),
            show: !pointerEnabled,
            billboard: {
                image: symbol,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                pixelOffset: new Cartesian2(0, -60)
            },
            label: {
                text: label,
                font: "11px monospace",
                fillColor: Color.BLACK,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                showBackground: true,
                backgroundColor: Color.fromCssColorString(`rgba(255, 255, 255, .6)`),
                horizontalOrigin: HorizontalOrigin.LEFT,
                verticalOrigin: VerticalOrigin.BASELINE,
                pixelOffset: new Cartesian2(5, -95)
            },
        })

    };

    viewer.entities.add({
        id: 'mouse',
        label: {
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            fillColor: Color.WHITE,
            showBackground: true,
            backgroundColor: Color.BLACK.withAlpha(0.75),
            horizontalOrigin: HorizontalOrigin.LEFT,
            verticalOrigin: VerticalOrigin.CENTER,
            pixelOffset: new Cartesian2(15, 30)
        }
    });

    // Mouse over the globe to see the cartographic position
    const handler = new ScreenSpaceEventHandler(scene.canvas);

    handler.setInputAction(function onMouseMove(movement) {
        const locationMouse: any = viewer.entities.getById('mouse');
        const cartesian = scene.pickPosition(movement.endPosition);
        const pick = scene.pick(movement.endPosition);
        if (pick?.id?.name) {
            locationMouse.position = cartesian ? cartesian : scene.globe.pick(viewer.camera.getPickRay(movement.endPosition), scene);
            locationMouse.label.show = true;
            locationMouse.label.text = pick.id.name;
            locationMouse.label.font = "20px monospace";
        } else if (cartesian) {
            const cartographic = Cartographic.fromCartesian(cartesian);
            const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
            const heightString = CesiumMath.toDegrees(cartographic.height).toFixed(2);
            locationMouse.position = cartesian;
            locationMouse.label.show = true;
            locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
            locationMouse.label.font = "12px monospace";
        } else {
            locationMouse.label.show = false;
        }
        scene.requestRender();
    }, ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction(function onMouseMove(movement) {
        const cartesian = scene.pickPosition(movement.position)
        if (cartesian) {
            const cartographic = Cartographic.fromCartesian(cartesian);
            const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
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
            label: {
                ...basicLabel,
                text: text
            }
        });
    }

    function addBillboard(symbol: string, label: string, position: Cartesian3) {

        viewer.entities.add({
            position: position,
            name: label,
            billboard: {
                image: symbol,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                scale: .5
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

    function addRectangle(west: number, south: number, east: number, north: number, text: string, color: string) {
        const rectangle = Rectangle.fromDegrees(west, south, east, north);
        const center = Rectangle.center(rectangle);
        const position = Cartographic.toCartesian(center);
        // const colorAlpha: Color = color.withAlpha(.5);
        viewer.entities.add({
            position: position,
            rectangle: {
                coordinates: rectangle, // left middle, bot middle, right middle, top middle
                material: Color.fromCssColorString(color).withAlpha(.25),
                heightReference: HeightReference.CLAMP_TO_GROUND,
                height: 0,
                extrudedHeight: .25,
                outline: true,
                outlineColor: Color.fromCssColorString(color),
                outlineWidth: 10
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
}

function showPointers(threeD: boolean) {

    viewer.entities.values.forEach((entity: Entity) => {
        const id = entity.id;
        if (id.startsWith("pointer")) {
            entity.show = threeD;
        } else if (id.startsWith("billboard")) {
            entity.show = !threeD;
        }
    });
}

function show3DPointers() {
    showPointers(true);
}

function show2DPointers() {
    showPointers(false);
}

function App() {
    
	const [count, setCount] = useState(0)

    useEffect(() => {
        startCesium();
    });

	return (
        <div className='app'>
            <div className='actions'>
                <div className='action'>
                    <button onClick={show3DPointers}>View 3D Pointers</button>
                </div>
                <div className='action'>
                    <button onClick={show2DPointers}>View 2D Pointers</button>
                </div>
            </div>
            <div className='tab-buttons'>
                <button><span>Fire</span></button>
                <button><span>Police</span></button>
                <button><span>Medical</span></button>
                <button><span>Public Works</span></button>
            </div>
            <div className='tab-content'>
                <div className='tab'></div>
                <div className='tab'></div>
                <div className='tab'></div>
                <div className='tab'></div>
            </div>
            <div id="cesiumContainer"></div>
        </div>
	)
}

export default App
