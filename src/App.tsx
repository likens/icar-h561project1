import { Key, useCallback, useEffect, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math as CesiumMath, Viewer, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, ScreenSpaceEventType, Entity, Cartesian2, Cartographic, ClockRange, Ion, Scene, HeadingPitchRange, defined } from "cesium";
// import CesiumNavigation from 'cesium-navigation-es6';
import { generateRectangle, generateEllipse, generatePointer, generateAnimatedBillboard, getStartTime, getStopTime, FIRE_RED } from "./Utils";
import { LANDMARK_CENTER_OUTLINE, LANDMARK_CENTER_WALLS, LANDMARK_CENTER_DOORS, LANDMARK_CENTER_WINDOWS, LANDMARK_CENTER_FIRES } from "./data/LandmarkCenter";
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
import Tab from './components/Tab';
import Modal from './components/Modal';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZWI3MDRlMi1hMGMyLTQzYjUtYTYxMy0zOGNlYjViOTdjMGIiLCJpZCI6ODM5MjksImlhdCI6MTY0OTExOTQ3MX0.j_tC4ZO5-0FDV4_n-edMAlcQK5EyuV9WyRhfv_4yjEU";

export let viewer: Viewer;
export let scene: Scene;

function App() {

    function startCesium() {
    
        // Mouse over the globe to see the cartographic position
        const handler = new ScreenSpaceEventHandler(scene?.canvas);
    
        setupViewer();
        setupTooltip();
        setupMouseHandlers();
        addLandmarkCenter();
            
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
            viewer.clock.multiplier = 3;
        
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
    
        function setupTooltip() {
    
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
    
        }

        function setupMouseHandlers() {

            handler.setInputAction(function onMouseMove(movement) {
                const tooltip: any = viewer.entities.getById('tooltip');
                const cartesian = scene.pickPosition(movement.endPosition);
                const pick = scene.pick(movement.endPosition);
    
                if (cartesian) {
                    const cartographic = Cartographic.fromCartesian(cartesian);
                    if (pick?.id?.name) {
                        tooltip.position = cartesian ? cartesian : scene.globe.pick(viewer.camera.getPickRay(movement.endPosition), scene);
                        tooltip.label.show = true;
                        tooltip.label.text = pick.id.name;
                        tooltip.label.font = "20px sans-serif";
                    }
                    else {
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
    
            viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
                clearState();
                if (defined(selectedEntity)) {
                    if (selectedEntity.id.includes("pointer_")) {
                        const resource = allResources.get(selectedEntity.name);
                        setActiveResource(resource);
                        updateModal(resource);
                    } else if (selectedEntity.id.includes("landmark")) {

                    }
                } else {
                    viewer.trackedEntity = undefined;
                    viewer.selectedEntity = undefined;
                }
            });
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
                    scale: .75
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
                    font: "16px sans-serif",
                    fillColor: Color.WHITE,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    heightReference: HeightReference.RELATIVE_TO_GROUND,
                    showBackground: true,
                    backgroundColor: Color.BLACK,
                    pixelOffset: new Cartesian2(0, -20)
                }
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
                viewer.entities.add({
                    id: `landmark_piece_floor_${i + 1}`,
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
                    FIRE_PERSONNEL.forEach((p) => {
                        if (p.landmark) {
                            generatePointer(true, p.name, p.symbol, p.lng, p.lat, p.brng, FIRE_RED, height + .5);
                        }
                    });
                    LANDMARK_CENTER_FIRES.forEach((fire, i) => {
                        generateEllipse(fire.lng, fire.lat, height + .5, fire.name, fire.color, fire.symbol, fire.scale);
                    });
                    LANDMARK_CENTER_WALLS.forEach((wall, i) => {
                        let entity = {
                            id: `landmark_piece_wall_${i + 1}`,
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
                            id: `landmark_piece_door_${i + 1}`,
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
                            id: `landmark_piece_window_${i + 1}`,
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
        
        AREAS_RECTANGLE.forEach((area: any) => generateRectangle(area[0], area[1], area[2], area[3], area[4], area[5], area[6], area[7]));
        AREAS_ELLIPSE.forEach((area: any) => generateEllipse(area.lng, area.lat, area.alt, area.name, area.color, area.symbol, area.scale));
    
        FIRE_PERSONNEL.forEach((unit: any) => {
            if (!unit.landmark) {
                generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color);
            }
        });
        FIRE_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        FIRE_AIR.forEach((unit: any) => generateAnimatedBillboard(unit.symbol, unit.name, unit.locations));
    
        POLICE_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        POLICE_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    
        MEDICAL_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        MEDICAL_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        MEDICAL_AIR.forEach((unit: any) => generateAnimatedBillboard(unit.symbol, unit.name, unit.locations));
    
        PUBLIC_WORKS_PERSONNEL.forEach((unit: any) => generatePointer(true, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
        PUBLIC_WORKS_VEHICLES.forEach((unit: any) => generatePointer(false, unit.name, unit.symbol, unit.lng, unit.lat, unit.brng, unit.color));
    
    }

    const resourceArr: any[] = [];
    const resourceMap = new Map();

    const [floors, setFloors] = useState(true);
    const [quickLinks, setQuickLinks] = useState(false);
    const [allResources, setAllResources] = useState(resourceMap);
    const [activeResource, setActiveResource] = useState({});
    const [activeTab, setActiveTab] = useState("");
    const [activeName, setActiveName] = useState("");
    const [activeVideo, setActiveVideo] = useState("");
    const [activeSub, setActiveSub] = useState("");
    const [activeImage, setActiveImage] = useState("");
    const [activeBubble, setActiveBubble] = useState("");
    
    if (!allResources.size) {
        FIRE_PERSONNEL.forEach((r: any) => resourceArr.push(r));
        FIRE_VEHICLES.forEach((r: any) => resourceArr.push(r));
        FIRE_AIR.forEach((r: any) => resourceArr.push(r));
        POLICE_PERSONNEL.forEach((r: any) => resourceArr.push(r));
        POLICE_VEHICLES.forEach((r: any) => resourceArr.push(r));
        MEDICAL_PERSONNEL.forEach((r: any) => resourceArr.push(r));
        MEDICAL_VEHICLES.forEach((r: any) => resourceArr.push(r));
        MEDICAL_AIR.forEach((r: any) => resourceArr.push(r));
        PUBLIC_WORKS_PERSONNEL.forEach((r: any) => resourceArr.push(r));
        PUBLIC_WORKS_VEHICLES.forEach((r: any) => resourceArr.push(r));
        resourceArr.forEach((r) => resourceMap.set(r.name, r));
    }

    const selectResource = useCallback((resource) => {
        clearState();
        goToResource(resource);
        setActiveResource(resource);
        setTimeout(() => updateModal(resource), 1000);
     }, []);

    const resetResource = useCallback((val) => clearState(), []);

    // function toggleFloors() {
    //     viewer?.entities?.values?.forEach((entity: Entity) => {
    //         const id = entity.id;
    //         if (id.includes("_full")) {
    //             entity.show = floors;
    //         } else if (id.includes("landmark_")) {
    //             entity.show = !floors;
    //         }
    //     });
    //     viewer.scene.requestRender();
    //     setFloors(!floors);
    // }

    function toggleQuickLinks() {
        setQuickLinks(!quickLinks)
    }

    function goToResource(resource: any) {
        if (resource.locations) {
            const entity = viewer.entities.getById(resource.name) as Entity;
            viewer.trackedEntity = entity;
            viewer.selectedEntity = entity;
        } else {
            const entity = viewer.entities.getById(`pointer_${resource.name}`) as Entity;
            viewer.flyTo(entity,
                { 
                    duration: 1.5, 
                    offset: new HeadingPitchRange(CesiumMath.toRadians(resource.brng), 
                    CesiumMath.toRadians(-40), 30) 
                }
            );
            viewer.selectedEntity = entity;
        }
    }

    function updateModal(resource: any) {
        setActiveName(resource.lname ? `${resource.lname} ${resource.fname}` : resource.name);
        setActiveImage(resource.image ? resource.image : `/image/${resource.name}.jpg`);
        setActiveSub(resource.sub);
        setActiveBubble(resource.bubble);
        setTimeout(() => setActiveVideo(resource.video), 1000);
    }

    function clearState() {
        setActiveName("");
        setActiveVideo("");
        setActiveImage("");
        setActiveSub("");
        setActiveBubble("");
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
                    {/* <div className='action'>
                        <button onClick={() => toggleFloors()}>View {floors ? `Full Structure` : `Structure Floors`}</button>
                    </div> */}
                </div>

                <div className={`tab-buttons ${activeTab != '' ? `tab-buttons--active` : ``}`}>
                    <button onClick={() => setActiveTab('fire')} 
                        className={`tab-button tab-button--fire ${activeTab === 'fire' ? `tab-button--active` : ``}`}>
                        <span>Fire</span>
                    </button>
                    <button onClick={() => setActiveTab('medical')} 
                        className={`tab-button tab-button--medical ${activeTab === 'medical' ? `tab-button--active` : ``}`}>
                        <span>Medical</span>
                    </button>
                    <button onClick={() => setActiveTab('police')} 
                        className={`tab-button tab-button--police ${activeTab === 'police' ? `tab-button--active` : ``}`}>
                        <span>Police</span>
                    </button>
                    <button onClick={() => setActiveTab('public')} 
                        className={`tab-button tab-button--public ${activeTab === 'public' ? `tab-button--active` : ``}`}>
                        <span>Pub. Works</span>
                    </button>
                    {/* <button onClick={() => setActiveTab('areas')} 
                        className={`tab-button tab-button--areas ${activeTab === 'areas' ? `tab-button--active` : ``}`}>
                        <span>Areas</span>
                    </button> */}
                </div>

                <div className={`tab-content ${activeTab != '' ? `tab-content--${activeTab} tab-content--active` : ``}`}>

                    <div className='filters'>
                        <button className='close-btn' title='Close Resource Menu' onClick={() => setActiveTab('')}>X</button>
                        <div className='filter-view'></div>
                        <div className='filter-all'></div>
                        <div className='filter-officers'></div>
                        <div className='filter-vehicles'></div>
                        <div className='filter-other'></div>
                    </div>

                    <Tab active={activeTab} 
                        type={'fire'}
                        personnel={FIRE_PERSONNEL}
                        vehicles={FIRE_VEHICLES} 
                        air={FIRE_AIR} 
                        activeResource={activeResource}
                        select={selectResource} />

                    <Tab active={activeTab} 
                        type={'medical'} 
                        personnel={MEDICAL_PERSONNEL} 
                        vehicles={MEDICAL_VEHICLES} 
                        air={MEDICAL_AIR} 
                        activeResource={activeResource}
                        select={selectResource} />

                    <Tab active={activeTab} 
                        type={'police'} 
                        personnel={POLICE_PERSONNEL} 
                        vehicles={POLICE_VEHICLES} 
                        activeResource={activeResource}
                        select={selectResource} />

                    <Tab active={activeTab} 
                        type={'public'} 
                        personnel={PUBLIC_WORKS_PERSONNEL} 
                        vehicles={PUBLIC_WORKS_VEHICLES} 
                        activeResource={activeResource}
                        select={selectResource} />
                    
                    {/* <div className={`tab tab--areas ${activeTab === 'areas' ? `tab--active` : ``}`}>
                        <div className='tab-title'>Areas of Operation</div>
                        <div className='units'>
                            <div className='aor'>
                                <div className='list-title'>Stagings</div>
                                <ul className='list'>
                                    {firePersonnel.map((p: any, i) => {
                                        return (
                                            <li key={i} className='list-item' onClick={() => pointerFly(`pointer_${p.name}`, p.brng)}>
                                                <div className='list-image'>
                                                    <img src={`/image/${p.name}.jpg`} alt='' />
                                                </div>
                                                <div className='list-name'>
                                                    {p.lname ? `${p.lname}` : p.name}
                                                    {p.fname ? <span>{`, ${p.fname}`}</span> : ``}
                                                </div>
                                                <div className='list-status'>{p.status ? p.status : `Status`}</div>
                                                <div className='list-sub'>{p.sub ? p.sub : `Subtitle`}</div>
                                                <div className={`list-loc`}>{p.loc ? p.loc : 'Location'}</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div> */}

                </div>
                <div id="cesiumContainer"></div>
            </div>

            <Modal reset={resetResource} 
                name={activeName} 
                image={activeImage}
                video={activeVideo}
                sub={activeSub}
                bubble={activeBubble} />

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
