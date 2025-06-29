import {Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

export const RecipeCard = ({ recipe, onEdit, onDelete, onView }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <h3 className="recipe-title">{recipe.name}</h3>
        <div className="recipe-actions">
          <button onClick={() => onView(recipe)} className="action-btn view-btn" title="Ver receta">
            <Eye size={16} />
          </button>
          <button onClick={() => onEdit(recipe)} className="action-btn edit-btn" title="Editar receta">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(recipe)} className="action-btn delete-btn" title="Eliminar receta">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <p className="recipe-description">
          {showFullDescription ? recipe.description : truncateText(recipe.description)}
          {recipe.description && recipe.description.length > 100 && (
            <button onClick={() => setShowFullDescription(!showFullDescription)} className="toggle-description">
              {showFullDescription ? " See less " : " See more "}
            </button>
          )}
        </p>

        <div className="recipe-ingredients">
          <strong>Ingredients:</strong>
          <p>{truncateText(recipe.ingredients, 80)}</p>
        </div>
      </div>
    </div>
  )
}
