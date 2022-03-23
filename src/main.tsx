import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Ion } from "cesium"

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYzBlNWQ2My1jMjk1LTQxOWQtYmZmNC1kYjQwOWIyMDU0MDciLCJpZCI6ODM5MjksImlhdCI6MTY0NTk4MzM1OH0.m0c3i42EidYlImKwNh6E2Ylvy2XnTGj7L2Nmu7QBLJM";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
