import { useState ,  useCallback} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios";
import { SearchBar } from './components/SearchBar/index';
import { Recipes } from './components/Recipes/index';
import Spinner from 'react-bootstrap/Spinner';
import Nav from "./components/NavBar/index"
import Home from "./components/Homepage/Home"
import Footer from "./components/footer/Footer"
import Error404 from "./components/error404/index"
import Create from './components/create/newRecipes'

import './App.SCSS'; 

function InspoPage() {
  const [recipes, setRecipes] = useState(null)
  const [recipesSearch, setRecipesSearch] = useState('')
  const [isLoading, setIsLoading] = useState (false)

  const getRecipes = useCallback (async () => {
    if(recipesSearch.trim() !== ""){
      setIsLoading(true)
      try{
        const {data}= await axios.get(`http://localhost:3000/?query=${recipesSearch}`);
        setRecipes(data.meals);
      } catch(error){
        console.error('error al obtener receta: ', error);
      }
      finally{
        setIsLoading(false);
      }
    }
    else {
      setRecipes(null)
      setIsLoading(false)
    }
      
    
    }, [recipesSearch] )

// si pones el useEffect inhibis la accion de onClick para buscar por el usuario

  return (
    <div>
      <SearchBar
        value={recipesSearch}
        onChange={(e) => setRecipesSearch(e.target.value)}
        onSearch={getRecipes}
      />
      {isLoading ? (
        <Spinner 
          animation="border" 
        />
      ) : (
        <Recipes 
          recipes={recipes} 
          isLoading={isLoading}
        />
      )}
    </div>
  );
}


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
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App