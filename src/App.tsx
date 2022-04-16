import { RefObject, useEffect, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTile, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType, Entity, Cartesian2, PostProcessStageLibrary, defined, Cesium3DTileFeature, Cartographic, PolylineOutlineMaterialProperty, IonImageryProvider, ConstantProperty, ArcType, Rectangle, JulianDate, ClockRange, Billboard, GroundPrimitive, Ion, TimeIntervalCollection, TimeInterval, VelocityOrientationProperty, PolylineGlowMaterialProperty, SampledPositionProperty, ImageMaterialProperty, LabelStyle, Polyline, LagrangePolynomialApproximation } from "cesium";
import { vincentyDirection, getRandomNumber, basicLabel, basicPoint } from "./Utils";
import { LANDMARK_CENTER_POSITION, LANDMARK_CENTER_OUTLINE, LANDMARK_CENTER_WALLS, BILLBOARDS, AREAS_RECTANGLE, AREAS_ELLIPSE, UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, FIRE_RED, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNIT_AIR, LANDMARK_CENTER_DOORS, LANDMARK_CENTER_WINDOWS, LANDMARK_CENTER_UNITS } from "./Data";
import fireCommercial from "./assets/img/napsg/hazard-fire-commercial.svg";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWI3MDRlMi1hMGMyLTQzYjUtYTYxMy0zOGNlYjViOTdjMGIiLCJpZCI6ODM5MjksImlhdCI6MTY0OTExOTQ3MX0.j_tC4ZO5-0FDV4_n-edMAlcQK5EyuV9WyRhfv_4yjEU";

let viewer: any = undefined;
let pointerEnabled = true;

function startCesium() {

    // https://napsg-web.s3.amazonaws.com/symbology/index.html#/
    // https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
    // https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
    // https://sandcastle.cesium.com/?src=Interpolation.html

    const terrainProvider = createWorldTerrain();
    // const osmBuildings = createOsmBuildings();
    
    viewer = new Viewer("cesiumContainer", {
        terrainProvider: terrainProvider,
        shouldAnimate: true,
        infoBox: false
    });
    
  
    // //Set bounds of our simulation time
    const start = JulianDate.fromDate(new Date());
    const stop = JulianDate.addSeconds(start, 240, new JulianDate());

    // Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 5;

    viewer.timeline.zoomTo(start, stop);

    const layer = viewer.imageryLayers.addImageryProvider(
        new IonImageryProvider({ assetId: 3 })
    );

    const scene = viewer.scene;
    // scene.primitives.add(osmBuildings);
    // scene.globe.depthTestAgainstTerrain = true;

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

    addTooltip();
    addLandmarkCenter();

    // addBasicPoint(-86.157074, 39.780615, 0, "TESTSTATIC");
    // addAnimatedPoint(TEST_ANIMATION_POSITIONS, "TESTANIMATION");

    BILLBOARDS.forEach((billboard: any) => {
        addBillboard(billboard.symbol, billboard.name, billboard.lng, billboard.lat, billboard.alt);
    });
    AREAS_RECTANGLE.forEach((area: any) => {
        addRectangle(area[0], area[1], area[2], area[3], area[4], area[5], area[6], area[7]);
    });
    AREAS_ELLIPSE.forEach((area: any) => {
        addEllipse(area.lng, area.lat, area.name, area.color, area.symbol, area.scale);
    });
    UNITS_SINGLE_FIRE.forEach((unit: any) => {
        generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_FIRE.forEach((unit: any) => {
        generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_SINGLE_POLICE.forEach((unit: any) => {
        generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_POLICE.forEach((unit: any) => {
        generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_SINGLE_EMS.forEach((unit: any) => {
        generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNITS_VEHICLE_EMS.forEach((unit: any) => {
        generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
    });
    UNIT_AIR.forEach((unit: any) => {
        addAnimatedBillboard(unit.symbol, unit.label, unit.positions);
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
                locationMouse.label.font = "20px sans-serif";
            } else if (cartesian) {
                const cartographic = Cartographic.fromCartesian(cartesian);
                const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
                const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
                const heightString = CesiumMath.toDegrees(cartographic.height).toFixed(2);
                locationMouse.position = cartesian;
                locationMouse.label.show = true;
                locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
                locationMouse.label.font = "12px sans-serif";
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

        viewer.entities.add({
            position: LANDMARK_CENTER_POSITION,
            name: "The Landmark Center",
            billboard: {
                image: fireCommercial,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                pixelOffset: new Cartesian2(0, -80),
                scale: .5
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
            // label: {
            //     show: true,
            //     text: "The Landmark Center",
            //     font: "16px sans-serif",
            //     fillColor: Color.WHITE,
            //     disableDepthTestDistance: Number.POSITIVE_INFINITY,
            //     heightReference: HeightReference.RELATIVE_TO_GROUND,
            //     showBackground: true,
            //     backgroundColor: Color.BLACK,
            //     pixelOffset: new Cartesian2(0, -20)
            // }
        });
    
        const totalHeight = 36;
        const levels = 12;
        const levelHeight = totalHeight / levels;
    
        for (let i = 0; i <= levels; i++) {
            const height = i * levelHeight;
            const extrudedHeight = height + levelHeight;
            const polygonDefs = {
                height: height,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                extrudedHeight: extrudedHeight,
                extrudedHeightReference: HeightReference.RELATIVE_TO_GROUND,
                outline: true,
                outlineColor: Color.BLACK,
                outlineWidth: 1
            }
            let color = Color.fromCssColorString("#aaa");
            // if (i === 5 || i === 9) {
            //     color = Color.YELLOW;
            // } else if (i === 6 || i === 8) {
            //     color = Color.ORANGE;
            // } else if (i === 7) {
            //     color = Color.RED;
            // } else {
            //     color = Color.GREEN;
            // }
            viewer.entities.add({
                id: `landmark_floor_${i + 1}`,
                name: `Floor ${i + 1}`,
                position: LANDMARK_CENTER_POSITION,
                polygon: {
                    ...polygonDefs,
                    hierarchy: { positions: Cartesian3.fromDegreesArray(LANDMARK_CENTER_OUTLINE), holes: [] },
                    closeTop: false,
                    material: color
                }
            });
            if (i === 5) {
                // LANDMARK_CENTER_OUTLINE.forEach((pos, i) => {
                //     if (i % 2 == 0) {
                //         const lng = pos;
                //         const lat = LANDMARK_CENTER_OUTLINE[i+1];
                //         addBasicPoint(lng, lat, height + .5, `${lng}, ${lat}`);
                //     }
                // });
                LANDMARK_CENTER_UNITS.forEach((unit) => {
                    generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color, height + .5);
                });
                LANDMARK_CENTER_WALLS.forEach((wall, i) => {
                    let entity = {
                        id: `landmark_wall_${i + 1}`,
                        name: `Wall ${i + 1}`,
                        polygon: {
                            ...polygonDefs,
                            hierarchy: { positions: Cartesian3.fromDegreesArray(wall), holes: [] },
                            material: Color.fromCssColorString("#aaa"),
                            extrudedHeight: height + 3,
                        }
                    }
                    viewer.entities.add(entity);
                });
                LANDMARK_CENTER_DOORS.forEach((door, i) => {
                    let entity = {
                        id: `landmark_door_${i + 1}`,
                        name: `Door ${i + 1}`,
                        polygon: {
                            ...polygonDefs,
                            hierarchy: { positions: Cartesian3.fromDegreesArray(door), holes: [] },
                            material: Color.fromCssColorString("#9d7148"),
                            extrudedHeight: height + 2.5,
                        }
                    }
                    viewer.entities.add(entity);
                });
                LANDMARK_CENTER_WINDOWS.forEach((window, i) => {
                    let entity = {
                        id: `landmark_window_${i + 1}`,
                        name: `Window ${i + 1}`,
                        polygon: {
                            ...polygonDefs,
                            hierarchy: { positions: Cartesian3.fromDegreesArray(window), holes: [] },
                            material: Color.fromCssColorString("#36c3ff"),
                            height: height + 1,
                            extrudedHeight: height + 2.5
                        }
                    }
                    viewer.entities.add(entity);
                });
                break;
            }
        }

        viewer.entities.add({
            position: LANDMARK_CENTER_POSITION,
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
            id: `landmark_full`,
            position: LANDMARK_CENTER_POSITION,
            show: false,
            name: "The Landmark Center",
            polygon: {
                hierarchy: {
                    positions: Cartesian3.fromDegreesArray(LANDMARK_CENTER_OUTLINE),
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

    function generatePointer(unit: boolean, label: string, symbol: string, lng: number, lat: number, brng: number, color: string = "#ffffff", height?: number) {

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
            id: `pointer_${unit ? `unit` : `vehicle`}_${label}`,
            name: label,
            position: position,
            show: pointerEnabled,
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
                text: label,
                font: "14px sans-serif",
                fillColor: Color.WHITE,
                backgroundColor: Color.BLACK,
                showBackground: true,
                horizontalOrigin: HorizontalOrigin.CENTER,
                verticalOrigin: VerticalOrigin.CENTER,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                eyeOffset: new Cartesian3(0, 3, -2),
                // translucencyByDistance: new NearFarScalar(1.25e2, 1, 2.5e2, 0),
            },
        }

        viewer.entities.add(entity);

        if (!unit) {
            // viewer.entities.add({
            //     position: position,
            //     show: pointerEnabled,
            //     polygon: {
            //         hierarchy: {
            //             positions: Cartesian3.fromDegreesArray([
            //                 cornerTopLeft.lng,
            //                 cornerTopLeft.lat,
            //                 cornerBotLeft.lng,
            //                 cornerBotLeft.lat,
            //                 cornerBotRight.lng,
            //                 cornerBotRight.lat,
            //                 cornerTopRight.lng,
            //                 cornerTopRight.lat
            //             ]),
            //             holes: []
            //         },
            //         material: new ImageMaterialProperty({
            //             image: symbol,
            //             transparent: true
            //         }),
            //         height: extrudedHeight,
            //         heightReference: HeightReference.RELATIVE_TO_GROUND
            //     },
            // })
        }

        // 2D Billboards
        viewer.entities.add({
            id: `billboard_${unit ? `unit` : `vehicle`}_${label}`,
            name: label,
            position: position,
            show: !pointerEnabled,
            billboard: {
                image: symbol,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                pixelOffset: new Cartesian2(0, -60)
            },
            label: {
                text: label,
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

    function addBillboard(symbol: string, label: string, lng: number, lat: number, alt = 0) {
        viewer.entities.add({
            position: Cartesian3.fromDegrees(lng, lat, alt),
            name: label,
            billboard: {
                image: symbol,
                // disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: HeightReference.RELATIVE_TO_GROUND,
                scale: .4,
                eyeOffset: new Cartesian3(0, 1.5, 0),
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

    function addAnimatedBillboard(symbol: string, label: string, positions: any[]) {
        
        const property = new SampledPositionProperty();

        // add first position as last for looping
        positions.push(positions[0]);
        positions.forEach((pos: any, i) => {
            const time = JulianDate.addSeconds(start, i * 30, new JulianDate());
            property.addSample(time, Cartesian3.fromDegrees(pos.lng, pos.lat, pos.alt ? pos.alt : 0));
        });

        
        property.setInterpolationOptions({
            interpolationDegree: 5,
            interpolationAlgorithm: LagrangePolynomialApproximation,
        })

        viewer.entities.add({
            position: property,
            availability: new TimeIntervalCollection([
                new TimeInterval({
                    start: start,
                    stop: stop,
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

    function addRectangle(west: number, south: number, east: number, north: number, text: string, color: string, symbol = "", scale = 5) {
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
            }
        });

    }

    function addEllipse(lng: number, lat: number, text: string, color: string, symbol: string, scale = 2) {

        // "flat" symbology
        const position = Cartesian3.fromDegrees(lng, lat);
        const topLeft = vincentyDirection(lng, lat, 315, scale);
        const botLeft = vincentyDirection(lng, lat, 225, scale);
        const botRight = vincentyDirection(lng, lat, 135, scale);
        const topRight = vincentyDirection(lng, lat, 45, scale);

        viewer.entities.add({
            name: text,
            position: position,
            ellipse: {
                semiMinorAxis: 2,
                semiMajorAxis: 2,
                heightReference: HeightReference.CLAMP_TO_GROUND,
                material: Color.fromCssColorString(color).withAlpha(.25),
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
            }
        });
    }

    function addBasicPoint(lng: number, lat: number, alt: number = 0, text: string, color = Color.WHITE, outlineColor = Color.BLACK) {
        
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

    function addAnimatedPoint(positions: any[], text: string, line = true, color = Color.WHITE, outlineColor = Color.BLACK) {

        const property = new SampledPositionProperty();

        // add first position as last for looping
        positions.push(positions[0]);
        positions.forEach((pos: any, i) => {
            const time = JulianDate.addSeconds(start, i * 30, new JulianDate());
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
                    start: start,
                    stop: stop,
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
        if (id.startsWith("landmark_floor") || id.startsWith("landmark_outline")) {
            entity.show = floors;
        } else if (id.startsWith("landmark_full")) {
            entity.show = !floors;
        }
    });
}

function showPointerLabels(show: boolean) {
    viewer.entities.values.forEach((entity: Entity) => {
        const id = entity.id;
        if (id.startsWith("pointer")) {
            const label = entity.label;
            if (label) {
                label.show = new ConstantProperty(show);
            }
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

function hide3DPointerLabels() {
    showPointerLabels(false);
}

function show3DPointerLabels() {
    showPointerLabels(true);
}

function App() {
    
	// const [count, setCount] = useState(0)

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
                <div className='action'>
                    <button onClick={hide3DPointerLabels}>Hide 3D Pointer Labels</button>
                </div>
                <div className='action'>
                    <button onClick={show3DPointerLabels}>Show 3D Pointer Labels</button>
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
