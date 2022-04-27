import { Key, useEffect, useReducer, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, Viewer, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, ScreenSpaceEventType, Entity, Cartesian2, Cartographic, IonImageryProvider, ConstantProperty, ClockRange, Ion, Rectangle, Scene } from "cesium";
// import CesiumNavigation from 'cesium-navigation-es6';
import { generateBillboard, generateRectangle, generateEllipse, generatePointer, generateAnimatedBillboard, getStartTime, getStopTime, FIRE_RED } from "./Utils";
import { LANDMARK_CENTER_OUTLINE, LANDMARK_CENTER_WALLS, LANDMARK_CENTER_DOORS, LANDMARK_CENTER_WINDOWS, LANDMARK_CENTER_PERSONNEL } from "./data/LandmarkCenter";
import fireCommercial from "./assets/img/napsg/hazard-fire-commercial.svg";
import { FIRE_PERSONNEL } from './data/FirePersonnel';
import { FIRE_VEHICLES } from './data/FireVehicles';
import { POLICE_PERSONNEL } from './data/PolicePersonnel';
import { POLICE_VEHICLES } from './data/PoliceVehicles';
import { MEDICAL_PERSONNEL } from './data/MedicalPersonnel';
import { MEDICAL_VEHICLES } from './data/MedicalVehicles';
import { AREAS_RECTANGLE } from './data/AreasRectangle';
import { AREAS_ELLIPSE } from './data/AreasEllipse';
import { MEDICAL_AIR } from './data/MedicalAir';
import { FIRE_AIR } from './data/FireAir';
import { QUICK_LINKS } from './data/QuickLinks';
import { PUBLIC_WORKS_PERSONNEL } from './data/PublicWorksPersonnel';
import { PUBLIC_WORKS_VEHICLES } from './data/PublicWorksVehicles';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWI3MDRlMi1hMGMyLTQzYjUtYTYxMy0zOGNlYjViOTdjMGIiLCJpZCI6ODM5MjksImlhdCI6MTY0OTExOTQ3MX0.j_tC4ZO5-0FDV4_n-edMAlcQK5EyuV9WyRhfv_4yjEU";

export let viewer: Viewer;
export let scene: Scene;

function startCesium() {

        setupViewer();
        addTooltip();
        addLandmarkCenter();

        AREAS_RECTANGLE.forEach((area: any) => generateRectangle(area[0], area[1], area[2], area[3], area[4], area[5], area[6], area[7]));
        AREAS_ELLIPSE.forEach((area: any) => generateEllipse(area.lng, area.lat, area.name, area.color, area.symbol, area.scale));

        FIRE_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        FIRE_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        FIRE_AIR.forEach((unit: any) => generateAnimatedBillboard(unit.symbol, unit.name, unit.locations));

        POLICE_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        POLICE_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));

        MEDICAL_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        MEDICAL_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        MEDICAL_AIR.forEach((unit: any) => generateAnimatedBillboard(unit.symbol, unit.name, unit.locations));

        PUBLIC_WORKS_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        PUBLIC_WORKS_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        
        function setupViewer() {

            const terrainProvider = createWorldTerrain();
            
            viewer = new Viewer("cesiumContainer", {
                terrainProvider: terrainProvider,
                shouldAnimate: true,
                infoBox: false
            });
        
            // const cesiumNavigationOptions = {
            //     defaultResetView: Rectangle.fromDegrees(-86.159431, 39.779762, -86.153759, 39.783698),
            //     enableCompass: true,
            //     enableZoomControls: true,
            //     enableDistanceLegend: true,
            //     enableCompassOuterRing: true,
            //     resetTooltip: "Reset to Default View",
            //     zoomInTooltip: "Zoom In",
            //     zoomOutTooltip: "Zoom Out"
            // }
        
            // new CesiumNavigation(viewer, cesiumNavigationOptions);
        
            // Make sure viewer is at the desired time.
            viewer.clock.startTime = getStartTime().clone();
            viewer.clock.stopTime = getStopTime().clone();
            viewer.clock.currentTime = getStartTime().clone();
            viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
            viewer.clock.multiplier = 5;
        
            viewer.timeline.zoomTo(getStartTime(), getStopTime());
            // viewer.imageryLayers.addImageryProvider(new IonImageryProvider({ assetId: 3 }));

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
                const tooltip: any = viewer.entities.getById('tooltip');
                const cartesian = scene.pickPosition(movement.endPosition);
                const pick = scene.pick(movement.endPosition);

                if (cartesian) {

                    const cartographic = Cartographic.fromCartesian(cartesian);
                    const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
                    const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
                    const heightString = CesiumMath.toDegrees(cartographic.height).toFixed(2);
    
                    if (pick?.id?.name) {
                        tooltip.position = cartesian ? cartesian : scene.globe.pick(viewer.camera.getPickRay(movement.endPosition), scene);
                        tooltip.label.show = true;
                        tooltip.label.text = pick.id.name;
                        tooltip.label.font = "20px sans-serif";
                    } else if (cartesian) {
                        tooltip.position = cartesian;
                        tooltip.label.show = true;
                        tooltip.label.text = `Lon: ${longitudeString}\u00B0\nLat: ${latitudeString}\u00B0\nAlt: ${heightString}m`;
                        tooltip.label.font = "12px sans-serif";
                    } else {
                        tooltip.label.show = false;
                    }
                    scene.requestRender();

                } else {
                    tooltip.label.show = false;
                }
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

            const LANDMARK_CENTER_POSITION = Cartesian3.fromDegrees(-86.157, 39.78187, 38);
    
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
                    LANDMARK_CENTER_PERSONNEL.forEach((p) => {
                        generatePointer(true, p.name, p.symbol, p.lng, p.lat, p.brng, FIRE_RED, height + .5);
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
    const [firePersonnel, setFirePersonnel] = useState([{}]);
    const [activeTab, setActiveTab] = useState("");
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
        if (FIRE_PERSONNEL.length) {
            const firePersonnel: any = [];
            LANDMARK_CENTER_PERSONNEL.forEach((p: any) => {
                firePersonnel.push(p);
            });
            FIRE_PERSONNEL.forEach((p: any) => {
                firePersonnel.push(p);
            });
            setFirePersonnel(firePersonnel);
        }
    }, []);

	return (
        <div className='app'>
            <div className={`cesium${quickLinks ? ` cesium--ql` : ``}`}>
                <div className='actions'>
                    <div className='action'>
                        <button onClick={() => toggleQuickLinks()}>{quickLinks ? 'Hide' : 'View'} Quick Links</button>
                    </div>
                    {/* <div className='action'>
                        <button onClick={() => toggleFloors()}>View {floors ? `Full Structure` : `Structure Floors`}</button>
                    </div> */}
                </div>
                <div className={`tab-buttons ${activeTab != '' ? `tab-buttons--active` : ``}`}>
                    <button onClick={() => setActiveTab('fire')} 
                        className={`tab-button tab-button--fire ${activeTab === 'fire' ? `tab-button--active` : ``}`}>
                        <span>Fire</span>
                    </button><button onClick={() => setActiveTab('medical')} 
                        className={`tab-button tab-button--medical ${activeTab === 'medical' ? `tab-button--active` : ``}`}>
                        <span>Medical</span>
                    </button><button onClick={() => setActiveTab('police')} 
                        className={`tab-button tab-button--police ${activeTab === 'police' ? `tab-button--active` : ``}`}>
                        <span>Police</span>
                    </button><button onClick={() => setActiveTab('public')} 
                        className={`tab-button tab-button--public ${activeTab === 'public' ? `tab-button--active` : ``}`}>
                        <span>Pub. Works</span>
                    </button>
                </div>
                <div className={`tab-content ${activeTab != '' ? `tab-content--${activeTab} tab-content--active` : ``}`}>
                    <div className='filters'>
                        <button onClick={() => setActiveTab('')}>close menu</button>
                        <div className='filter-view'></div>
                        <div className='filter-all'></div>
                        <div className='filter-officers'></div>
                        <div className='filter-vehicles'></div>
                        <div className='filter-other'></div>
                    </div>
                    <div className={`tab tab--fire ${activeTab === 'fire' ? `tab--active` : ``}`}>
                        <div className='units'>
                            <div className='personnel'>
                                <div className='list-title'>Personnel</div>
                                <ul className='list'>
                                    {firePersonnel.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/${p.name}.jpg`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-status'>{p.status ? p.status : `Available`}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='vehicles'>
                                <div className='list-title'>Vehicles</div>
                                <ul className='list'>
                                    {FIRE_VEHICLES.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/FireVehicle.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='air'>
                                <div className='list-title'>Air</div>
                                <ul className='list'>
                                    {FIRE_AIR.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/FireDrone.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`tab tab--medical ${activeTab === 'medical' ? `tab--active` : ``}`}>
                        <div className='units'>
                            <div className='personnel'>
                                <div className='list-title'>Personnel</div>
                                <ul className='list'>
                                    {MEDICAL_PERSONNEL.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/${p.name}.jpg`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-status'>{p.status ? p.status : `Available`}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='vehicles'>
                                <div className='list-title'>Vehicles</div>
                                <ul className='list'>
                                    {MEDICAL_VEHICLES.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/MedicalVehicle.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='air'>
                                <div className='list-title'>Air</div>
                                <ul className='list'>
                                    {MEDICAL_AIR.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/MedicalAir.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`tab tab--police ${activeTab === 'police' ? `tab--active` : ``}`}>
                        <div className='units'>
                            <div className='personnel'>
                                <div className='list-title'>Personnel</div>
                                <ul className='list'>
                                    {POLICE_PERSONNEL.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/${p.name}.jpg`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-status'>{p.status ? p.status : `Available`}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='vehicles'>
                                <div className='list-title'>Vehicles</div>
                                <ul className='list'>
                                    {POLICE_VEHICLES.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/PoliceVehicle.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <div className='air'>
                                <div className='list-title'>Air</div>
                                <ul className='list'>
                                    {POLICE_AIR.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/PoliceAir.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    <div className={`tab tab--public ${activeTab === 'public' ? `tab--active` : ``}`}>
                        <div className='units'>
                            <div className='personnel'>
                                <div className='list-title'>Personnel</div>
                                <ul className='list'>
                                    {PUBLIC_WORKS_PERSONNEL.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/${p.name}.jpg`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-status'>{p.status ? p.status : `Available`}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='vehicles'>
                                <div className='list-title'>Vehicles</div>
                                <ul className='list'>
                                    {PUBLIC_WORKS_VEHICLES.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/PublicVehicle.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <div className='air'>
                                <div className='list-title'>Air</div>
                                <ul className='list'>
                                    {POLICE_AIR.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item'>
                                                <div className='list-image'>
                                                    <img src={`/photos/PoliceAir.png`} alt='' />
                                                </div>
                                                <div className='list-name'>{p.name}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Captain`}</div>
                                                <div className='list-loc'>{p.loc ? p.loc : 'Landmark Center - Floor 5'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div id="cesiumContainer"></div>
            </div>
            <div className='modal'>
                <div className='modal-video'></div>
                <div className='modal-body'></div>
                <div className='modal-audio'></div>
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
