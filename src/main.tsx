import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Ion } from "cesium"

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYTE4OWQ5Yi1iZGRiLTRkNzItYTlhOC1kNmZlZWMyM2MwMTYiLCJpZCI6ODM5MjksImlhdCI6MTY0NTk4MTU2NH0.W5C6MZMkNTrPlTXFs42_F_yR8QjSlVR8OCgAWjtUagA";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
