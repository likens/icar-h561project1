import { RefObject, useState } from 'react'
import { Cartesian3, createWorldTerrain, Math, createOsmBuildings, PrimitiveCollection, Viewer, Cesium3DTileStyle, HorizontalOrigin, VerticalOrigin, HeightReference, Color, ScreenSpaceEventHandler, NearFarScalar, ScreenSpaceEventType } from "cesium";

const locationDiv = document.getElementById("location");
const terrainProvider = createWorldTerrain();
const osmBuildings = createOsmBuildings();

const viewer = new Viewer("cesiumContainer", {
    terrainProvider: createWorldTerrain(),
});

const position = Cartesian3.fromDegrees(-86.15797, 39.77999, 300);
const orientation = {heading: Math.toRadians(20), pitch: Math.toRadians(-30)};

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

osmBuildings.initialTilesLoaded.addEventListener(() => {
    console.log("initial osm buildings loaded");
});

osmBuildings.allTilesLoaded.addEventListener(() => {
    console.log("all osm buildings loaded");
});

console.log(osmBuildings);

osmBuildings.style = new Cesium3DTileStyle({
    color: {
        conditions: [
            [
                "${feature['building']} === 'apartments' || ${feature['building']} === 'residential'",
                "color('cyan', 0.9)",
            ],
            [
                "${feature['building']} === 'civic'",
                "color('blue', 0.9)",
            ],
            [
                "${feature['building']} === 'office'",
                "color('yellow', 0.9)",
            ],
            [
                "${feature['building']} === 'commercial' || ${feature['building']} === 'retail'",
                "color('green', 0.9)",
            ],
            [
                "${feature['building']} === 'hospital'",
                "color('red', 0.9)",
            ],
            [
                "${feature['building']} === 'construction'",
                "color('orange', 0.9)",
            ],
            [
                "${feature['building']} === 'school'",
                "color('purple', 0.9)",
            ],
            [
                "${feature['building']} === 'parking'",
                "color('pink', 0.9)",
            ],
            [true, "color('white')"],
        ],
    }
});

const redRectangle = viewer.entities.add({
    name: "AOR",
    // 	rectangle: {
    // 		coordinates: Cesium.Rectangle.fromDegrees(
    // 			-86.157800,
    // 			39.780870,
    // 			-86.155650,
    // 			39.782690
    // 		),
    // 		outlineColor: "black",
    // 		material: Cesium.Color.RED.withAlpha(0.5),
    // 	},
    // polygon: {
    //     hierarchy: Cartesian3.fromDegreesArray([
    //         -86.157512,
    //         39.782360,
    //         -86.155555,
    //         39.782360,
    //         -86.155555,
    //         39.7811111,
    //         -86.157512,
    //         39.7811111
    //     ]),
    //     material: Color.RED.withAlpha(0.5),
    //     outline: true,
    //     outlineColor: Color.BLACK,
    // },
});

// Mouse over the globe to see the cartographic position
const handler = new ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function (movement) {
    const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        scene.globe.ellipsoid
    );
    if (cartesian) {
        const cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        const longitudeString = Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitudeString = Math.toDegrees(cartographic.latitude).toFixed(6);
		if (locationDiv) {
			locationDiv.innerHTML = `${longitudeString}, ${latitudeString}`;
		}
    }
}, ScreenSpaceEventType.MOUSE_MOVE);

// const landmarkCenterLabel = viewer.entities.add({
//     id: "landmark",
//     position: Cartesian3.fromDegrees(-86.157, 39.78187, 230),
//     disableDepthTestDistance: Number.POSITIVE_INFINITY,
//     heightReference: HeightReference.CLAMP_TO_GROUND,
//     billboard: {
//         position: Cartesian3.fromDegrees(-75.1641667,39.9522222),
//         scaleByDistance: new NearFarScalar(
//             1.5e2,
//             5.0,
//             1.5e7,
//             0.5
//         )
//     },
//     label: {
//         text: "The Landmark Center",
//         font: "20px sans-serif",
//         showBackground: true,
//         horizontalOrigin: HorizontalOrigin.CENTER,
//         pixelOffsetScaleByDistance: new NearFarScalar(
//             1.5e2,
//             3.0,
//             1.5e7,
//             0.5
//         ),
//     },
// });

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
