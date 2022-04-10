import { RefObject, useEffect, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange, Billboard, GroundPrimitive, Ion, TimeIntervalCollection, TimeInterval, VelocityOrientationProperty, PolylineGlowMaterialProperty, SampledPositionProperty } from "cesium";
import { UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, UNIT_TYPE_SINGLE, UNIT_TYPE_VEHICLE, AREAS_RECTANGLE, BILLBOARDS, vincentyDirection } from "./Utils";
import fireCommercial from "./assets/img/napsg/fire_commercial.png";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWI3MDRlMi1hMGMyLTQzYjUtYTYxMy0zOGNlYjViOTdjMGIiLCJpZCI6ODM5MjksImlhdCI6MTY0OTExOTQ3MX0.j_tC4ZO5-0FDV4_n-edMAlcQK5EyuV9WyRhfv_4yjEU";

let viewer: any = undefined;
let pointerEnabled = true;

function startCesium() {

    // https://napsg-web.s3.amazonaws.com/symbology/index.html#/
    // https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
    // https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
    // https://sandcastle.cesium.com/?src=Interpolation.html

    const terrainProvider = createWorldTerrain();
    const osmBuildings = createOsmBuildings();
    
    viewer = new Viewer("cesiumContainer", {
        terrainProvider: terrainProvider,
        shouldAnimate: true
    });
    
  
    // //Set bounds of our simulation time
    const start = JulianDate.fromDate(new Date(2015, 2, 25, 16));
    const stop = JulianDate.addSeconds(start, 240, new JulianDate());

    // Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 10;

    viewer.timeline.zoomTo(start, stop);

    const layer = viewer.imageryLayers.addImageryProvider(
        new IonImageryProvider({ assetId: 3 })
    );

    const scene = viewer.scene;
    scene.primitives.add(osmBuildings);
    scene.globe.depthTestAgainstTerrain = true;

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

    // osmBuildings.tileLoad.addEventListener((tile: Cesium3DTile) => {
    //     const content = tile.content;
    //     const featuresLength = content.featuresLength;
    //     for (let i = 0; i < featuresLength; i++) {
    //         const name = content.getFeature(i).getProperty("name");
    //         if (name === "The Landmark Center") {
    //             console.log(content.getFeature(i));
    //             const lng = content.getFeature(i).getProperty("cesium#longitude");
    //             const lat = content.getFeature(i).getProperty("cesium#latitude");
    //             const alt = parseInt(content.getFeature(i).getProperty("cesium#estimatedHeight"));
    //             const str = `${lng}:${lat}:${alt}`;
    //             const ent = viewer.entities.getById(str);
    //     }
    // });

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
                ["${feature['name']} === 'The Landmark Center'", "color('white', 0)"],
                [true, "color('white', 1)"],
            ],
        }
    });

    addTooltip();
    addLandmarkCenter();

    addBasicPoint(-86.157073, 39.780962, 0, "TESTANIMATION");

    BILLBOARDS.forEach((billboard: any) => {
        addBillboard(billboard.symbol, billboard.name, billboard.lng, billboard.lat);
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
    
    function addTooltip() {

        viewer.entities.add({
            id: 'tooltip',
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
            const locationMouse: any = viewer.entities.getById('tooltip');
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
    }

    function addLandmarkCenter() {
        
        const landmarkPosition = Cartesian3.fromDegrees(-86.157, 39.78187, 38);
        const landmarkCenterPolygon = Cartesian3.fromDegreesArray([
            -86.156992, 39.782069,
            -86.157060, 39.782127,
            -86.157324, 39.781944,
            -86.157241, 39.781873,
            -86.157325, 39.781814,
            -86.157079, 39.781610,
            -86.157004, 39.781664,
            -86.156919, 39.781609,
            -86.156687, 39.781781,
            -86.156772, 39.781851,
            -86.156685, 39.781917,
            -86.156924, 39.782110
        ]);

        viewer.entities.add({
            position: landmarkPosition,
            name: "The Landmark Center",
            billboard: {
                image: fireCommercial,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                pixelOffset: new Cartesian2(0, -80)
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
                outlineWidth: 1
            },
            label: {
                show: true,
                text: "The Landmark Center",
                font: "16px monospace",
                fillColor: Color.WHITE,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                showBackground: true,
                backgroundColor: Color.BLACK,
                pixelOffset: new Cartesian2(0, -20)
            }
        });
    
        const totalHeight = 36;
        const levels = 13;
        const levelHeight = totalHeight / levels;
    
        for (let i = 0; i <= levels; i++) {
            const height = i * levelHeight;
            const extrudedHeight = height + levelHeight;
            let color = Color.GREEN;
            if (i === 5 || i === 9) {
                color = Color.YELLOW;
            } else if (i === 6 || i === 8) {
                color = Color.ORANGE;
            } else if (i === 7) {
                color = Color.RED;
            }
            viewer.entities.add({
                show: false,
                id: `landmark_floor_${i}`,
                name: `Floor ${i}`,
                position: landmarkPosition,
                polygon: {
                    hierarchy: {
                        positions: landmarkCenterPolygon,
                        holes: []
                    },
                    material: color.withAlpha(1),
                    height: height,
                    heightReference: HeightReference.RELATIVE_TO_GROUND,
                    extrudedHeight: extrudedHeight,
                    extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
                    outline: true,
                    outlineColor: Color.BLACK,
                    outlineWidth: 1
                }
            });
        }

        viewer.entities.add({
            position: landmarkPosition,
            name: "The Landmark Center",
            ellipse: {
                semiMinorAxis: 40,
                semiMajorAxis: 40,
                height: .05,
                extrudedHeight: .05,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                material: Color.fromCssColorString("rgba(254, 224, 144)").withAlpha(.5),
                outline: true,
                outlineColor: Color.fromCssColorString("#FEE090"),
                outlineWidth: 1
            },
        })

        viewer.entities.add({
            id: `landmark_center`,
            position: landmarkPosition,
            name: "The Landmark Center",
            polygon: {
                hierarchy: {
                    positions: landmarkCenterPolygon,
                    holes: []
                },
                material: Color.fromCssColorString("#aaa"),
                height: 0,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                extrudedHeight: 39,
                extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
                outline: true,
                outlineColor: Color.BLACK,
                outlineWidth: 1
            }
        });
    }

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

        const position = Cartesian3.fromDegrees(lng, lat, 0);

        viewer.entities.add({
            id: `pointer_unit_${label}`,
            name: label,
            position: position,
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
            }
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

    function addBillboard(symbol: string, label: string, lng: number, lat: number) {
        viewer.entities.add({
            position: Cartesian3.fromDegrees(lng, lat, 0),
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
            name: text,
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

    function addBasicPoint(lng: number, lat: number, alt: number = 0, text: string, color = Color.WHITE, outlineColor = Color.BLACK) {

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
        
        const property = new SampledPositionProperty();

        const positions = [
            { lng: lng, lat: lat },
            { lng: -86.157298, lat: 39.780967 },
            { lng: -86.157304, lat: 39.780772 },
            { lng: -86.157312, lat: 39.780560 },
            { lng: -86.157075, lat: 39.780552 },
            { lng: -86.156834, lat: 39.780560 },
            { lng: -86.156829, lat: 39.780756 },
            { lng: -86.156826, lat: 39.780961 },
            { lng: lng, lat: lat }
        ]

        let polygonPoints = undefined;

        positions.forEach((pos, i) => {
            const time = JulianDate.addSeconds(start, i * 30, new JulianDate());
            property.addSample(time, Cartesian3.fromDegrees(pos.lng, pos.lat));

            // const centerTop = vincentyDirection(pos.lng, pos.lat, 45, 1 * -.75);
            // const centerBot = vincentyDirection(pos.lng, pos.lat, 180 + 45, 1);
            // const centerPoint = vincentyDirection(pos.lng, pos.lat, 45, 1);
            // const cornerBotLeft = vincentyDirection(centerBot.lng, centerBot.lat, 270 + 45, 1 * .75);
            // const cornerBotRight = vincentyDirection(centerBot.lng, centerBot.lat, 90 + 45, 1 * .75);
            
            // polygonPoints = Cartesian3.fromDegreesArray([
            //     centerTop.lng,
            //     centerTop.lat,
            //     cornerBotRight.lng,
            //     cornerBotRight.lat,
            //     centerPoint.lng,
            //     centerPoint.lat,
            //     cornerBotLeft.lng,
            //     cornerBotLeft.lat
            // ]);

            //Also create a point for each sample we generate.
            viewer.entities.add({
                position: Cartesian3.fromDegrees(pos.lng, pos.lat),
                point: {
                    pixelSize: 10,
                    color: Color.TRANSPARENT,
                    outlineColor: Color.WHITE,
                    outlineWidth: 3,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    heightReference : HeightReference.CLAMP_TO_GROUND
                },
            });
        });
        
        viewer.entities.add({
            position: property,
            availability: new TimeIntervalCollection([
                new TimeInterval({
                    start: start,
                    stop: stop,
                }),
            ]),
            // polygon: {
            //     hierarchy: {
            //         positions: polygonPoints,
            //         holes: []
            //     },
            //     material: Color.fromCssColorString("#FFFFFF"),
            //     height: .5,
            //     heightReference: HeightReference.RELATIVE_TO_GROUND,
            //     extrudedHeight: 1,
            //     extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
            //     outline: true,
            //     outlineColor: Color.BLACK,
            //     outlineWidth: 1
            // },
            polyline: {
                positions: positions.map(pos => Cartesian3.fromDegrees(pos.lng, pos.lat)),
                material: new PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Color.WHITE,
                }),
                width: 10,
                clampToGround: true
            },
            orientation: new VelocityOrientationProperty(property),
            point: basicPoint,
            label: {
                ...basicLabel,
                text: text
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

function showBuildingView(floors: boolean) {
    viewer.entities.values.forEach((entity: Entity) => {
        const id = entity.id;
        if (id.startsWith("landmark_floor")) {
            entity.show = floors;
        } else if (id.startsWith("landmark_center")) {
            entity.show = !floors;
        }
    });
}

function show3DPointers() {
    showPointers(true);
}

function show2DPointers() {
    showPointers(false);
}

function showBuildingFloors() {
    showBuildingView(true);
}

function showBuildingSolid() {
    showBuildingView(false);
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
                <div className='action'>
                    <button onClick={showBuildingFloors}>View Building Floors</button>
                </div>
                <div className='action'>
                    <button onClick={showBuildingSolid}>View Solid Building</button>
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
