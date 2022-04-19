import { Key, useEffect, useReducer, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, Viewer, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, ScreenSpaceEventType, Entity, Cartesian2, Cartographic, IonImageryProvider, ConstantProperty, ClockRange, Ion, Rectangle, Scene } from "cesium";
import { generateBillboard, generateRectangle, generateEllipse, generatePointer, generateAnimatedBillboard, getStartTime, getStopTime } from "./Utils";
import { QUICK_LINKS, ION_ACCESS_TOKEN, LANDMARK_CENTER_POSITION, LANDMARK_CENTER_OUTLINE, LANDMARK_CENTER_WALLS, BILLBOARDS, AREAS_RECTANGLE, AREAS_ELLIPSE, UNITS_SINGLE_FIRE, UNITS_VEHICLE_FIRE, UNITS_SINGLE_POLICE, UNITS_VEHICLE_POLICE, UNITS_SINGLE_EMS, UNITS_VEHICLE_EMS, UNIT_AIR, LANDMARK_CENTER_DOORS, LANDMARK_CENTER_WINDOWS, LANDMARK_CENTER_UNITS } from "./Data";
import fireCommercial from "./assets/img/napsg/hazard-fire-commercial.svg";
import CesiumNavigation from 'cesium-navigation-es6';

Ion.defaultAccessToken = ION_ACCESS_TOKEN;

export let viewer: Viewer;
export let scene: Scene;

function startCesium() {
    
    // https://napsg-web.s3.amazonaws.com/symbology/index.html#/
    // https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html
    // https://sandcastle.cesium.com/index.html?src=HeadingPitchRoll.html&label=Tutorials
    // https://sandcastle.cesium.com/?src=Interpolation.html

    setupViewer();
    addTooltip();
    addLandmarkCenter();

    // generatePoint(-86.157074, 39.780615, 0, "TESTSTATIC");
    // generateAnimatedPoint(TEST_ANIMATION_POSITIONS, "TESTANIMATION");

    BILLBOARDS.forEach((billboard: any) => generateBillboard(billboard.symbol, billboard.name, billboard.lng, billboard.lat, billboard.alt));
    AREAS_RECTANGLE.forEach((area: any) => generateRectangle(area[0], area[1], area[2], area[3], area[4], area[5], area[6], area[7]));
    AREAS_ELLIPSE.forEach((area: any) => generateEllipse(area.lng, area.lat, area.name, area.color, area.symbol, area.scale));
    UNITS_SINGLE_FIRE.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNITS_SINGLE_POLICE.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNITS_SINGLE_EMS.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNITS_VEHICLE_FIRE.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNITS_VEHICLE_POLICE.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNITS_VEHICLE_EMS.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    UNIT_AIR.forEach((unit: any) => generateAnimatedBillboard(unit.symbol, unit.label, unit.positions));
    
    function setupViewer() {

        const terrainProvider = createWorldTerrain();
        
        viewer = new Viewer("cesiumContainer", {
            terrainProvider: terrainProvider,
            shouldAnimate: true,
            infoBox: false
        });
    
        const cesiumNavigationOptions = {
            defaultResetView: Rectangle.fromDegrees(-86.159431, 39.779762, -86.153759, 39.783698),
            enableCompass: true,
            enableZoomControls: true,
            enableDistanceLegend: true,
            enableCompassOuterRing: true,
            resetTooltip: "Reset to Default View",
            zoomInTooltip: "Zoom In",
            zoomOutTooltip: "Zoom Out"
        }
    
        new CesiumNavigation(viewer, cesiumNavigationOptions);
    
        // Make sure viewer is at the desired time.
        viewer.clock.startTime = getStartTime().clone();
        viewer.clock.stopTime = getStopTime().clone();
        viewer.clock.currentTime = getStartTime().clone();
        viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
        viewer.clock.multiplier = 5;
    
        viewer.timeline.zoomTo(getStartTime(), getStopTime());
        viewer.imageryLayers.addImageryProvider(new IonImageryProvider({ assetId: 3 }));

        scene = viewer.scene;
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
    }

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
            
            const cartographic = Cartographic.fromCartesian(cartesian);
            const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
            const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
            const heightString = CesiumMath.toDegrees(cartographic.height).toFixed(2);
            // setLongitude(longitudeString);
            // setLatitude(latitudeString);
            // setAltitude(heightString);

            if (pick?.id?.name) {
                locationMouse.position = cartesian ? cartesian : scene.globe.pick(viewer.camera.getPickRay(movement.endPosition), scene);
                locationMouse.label.show = true;
                locationMouse.label.text = pick.id.name;
                locationMouse.label.font = "20px sans-serif";
            } 
            else if (cartesian) {
                locationMouse.position = cartesian;
                locationMouse.label.show = true;
                locationMouse.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
                locationMouse.label.font = "12px sans-serif";
            } 
            else {
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
                //         generatePoint(lng, lat, height + .5, `${lng}, ${lat}`);
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

}

function App() {
    
    const [floors, setFloors] = useState(true);
    const [quickLinks, setQuickLinks] = useState(false);
    const [longitude, setLongitude] = useState("0");
    const [latitude, setLatitude] = useState("0");
    const [altitude, setAltitude] = useState("0");

    function toggleFloors() {
        viewer?.entities?.values?.forEach((entity: Entity) => {
            const id = entity.id;
            if (id.includes("_full")) {
                entity.show = floors;
            } else if (id.includes("landmark_")) {
                entity.show = !floors;
            }
        });
        viewer.scene.requestRender();
        setFloors(!floors);
    }

    function toggleQuickLinks() {
        setQuickLinks(!quickLinks)
    }

    useEffect(() => {
        startCesium();
    }, []);

	return (
        <div className='app'>
            <div className={`cesium${quickLinks ? ` cesium--ql` : ``}`}>
                <div className='actions'>
                    <div className='action'>
                        <button onClick={() => toggleQuickLinks()}>{quickLinks ? 'Hide' : 'View'} Quick Links</button>
                    </div>
                    <div className='action'>
                        <button onClick={() => toggleFloors()}>View {floors ? `Full Structure` : `Structure Floors`}</button>
                    </div>
                </div>
                <div className='tab-buttons'>
                    <button><span>Fire</span></button>
                    <button><span>Police</span></button>
                    <button><span>Medical</span></button>
                    <button><span>Pub. Works</span></button>
                </div>
                <div className='tab-content'>
                    <div className='tab'></div>
                    <div className='tab'></div>
                    <div className='tab'></div>
                    <div className='tab'></div>
                </div>
                <div id="cesiumContainer">
                    {/* <div className='infobar'>
                        <div className='location'>
                            <div className='longitude'>{longitude}</div>
                            <div className='latitude'>{latitude}</div>
                            <div className='altitude'>{altitude}</div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='quick-links'>
                <div className="title">AR in COP for ICS Quick Links</div>
                <div className="links">
                    {QUICK_LINKS.map((link: any, i: Key) => {
                        return (
                            <div key={i} className="section">
                                <a href={link.url}>{link.text}</a>
                                {link.children ?
                                    <ul>
                                        {link.children.map((child: any, i: Key) => {
                                            return (
                                                <li key={i}>
                                                    <a href={child.url}>{child.text}</a>
                                                    {child.children ?
                                                        <ul>
                                                            {child.children.map((grandchild: any, i: Key) => {
                                                                return (
                                                                    <li key={i}>
                                                                        <a href={grandchild.url}>{grandchild.text}</a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    : undefined}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                : undefined}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
	)
}

export default App
