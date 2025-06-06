"use client"

import "./estilos.css"
import { useState } from "react"
import { RecipeDetail } from "./RecipeDetail"

export const Recipes = ({ recipes, isLoading }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  if (!recipes && !isLoading) {
    return (
      <div className="container-error-message">
        <div className="error-message">
          <div className="error-title">¡Hora de inspirarse!</div>
          <p className="error-subtitle">Busca una receta para comenzar</p>
        </div>
      </div>
    )
  }

  const handleShowMore = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleCloseDetail = () => {
    setSelectedRecipe(null)
  }

  return (
    <>
      {recipes && recipes.length > 0 ? (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.idMeal} onShowMore={handleShowMore} />
          ))}
        </div>
      ) : recipes && recipes.length === 0 ? (
        <div className="container-error-message">
          <div className="error-message">
            <div className="error-title">No se encontraron resultados</div>
            <p className="error-subtitle">Intenta con otra búsqueda</p>
          </div>
        </div>
      ) : null}

      {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />}
    </>
  )
}

const Recipe = ({ recipe, onShowMore }) => {
  const handleShowMoreClick = () => {
    onShowMore(recipe)
  }

  return (
    <div className="card-container">
      <div className="card-info">
        <h2 style={{ textAlign: "center" }}>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb || "/placeholder.svg"} alt={recipe.strMeal} className="card-recipe-img" />
      </div>
      <div>
        <button className="btn-show" onClick={handleShowMoreClick}>
          Ver más
        </button>
      </div>
    </div>
  )
}
