
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/NavBar/index"
import Home from "./components/Homepage/Home"
import Error404 from "./components/error404/index"
import Create from './components/create/newRecipes'
import Profile from './components/profile/index'
import InspoPage from './inspoPage'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.SCSS'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inspo" element={<InspoPage />} />
            <Route path="/create" element = {<Create/>}/>
            <Route path="/profile" element = {<Profile/>}/>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
