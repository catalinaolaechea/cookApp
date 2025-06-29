"use client"

import "./estilos.css"
import { useState } from "react"
import { RecipeDetail } from "./moreInfo"

export const Recipes = ({ recipes, isLoading }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  if (!recipes && !isLoading) {
    return (
      <div className="container-message">
        <div>
          <p>¡It's time to get inspired!</p>
          <p>What do you want to cook today?</p>
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
        <div className="container-message">
          <div className="error-message">
            <p>no recipes were found</p>
            <p>encourage to create it or search for another idea</p>
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
        <p>{recipe.strMeal}</p>
        <img src={recipe.strMealThumb || "/placeholder.svg"} alt={recipe.strMeal} />
      </div>
      <button className="btn-show" onClick={handleShowMoreClick}>
        See more
      </button>
    </div>
  )
}
