import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Gamelist from './components/GameList.jsx'
import GameUI from './components/GameUI.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Gamelist/>
    <GameUI/>
  </React.StrictMode>,
)
