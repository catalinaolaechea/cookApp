"use client"

import { X } from "lucide-react"

const ViewRecipeModal = ({ selectedRecipe, onClose }) => {
  if (!selectedRecipe) return null

  return (
    <div className="recipe-modal-overlay" onClick={onClose}>
      <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="recipe-modal-header">
          <h2>{selectedRecipe.name}</h2>
          <button onClick={onClose} className="close-modal-btn">
            <X size={24} />
          </button>
        </div>
        <div className="recipe-modal-content">
          <div className="recipe-section">
            <h3>Descripción</h3>
            <p>{selectedRecipe.description}</p>
          </div>
          <div className="recipe-section">
            <h3>Ingredientes</h3>
            <p>{selectedRecipe.ingredients}</p>
          </div>
          <div className="recipe-section">
            <h3>Pasos</h3>
            <p>{selectedRecipe.steps}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewRecipeModal
