"use client"

import { X, Edit } from "lucide-react"

const EditRecipeModal = ({ recipeToEdit, editFormData, handleEditFormChange, onConfirm, onCancel, isUpdating }) => {
  if (!recipeToEdit) return null

  return (
    <div className="recipe-modal-overlay">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h3>Modify secret recipe</h3>
          <button onClick={onCancel} className="close-modal-btn">
            <X size={24} />
          </button>
        </div>
        <div className="edit-modal-content">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="edit-name">Title</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-ingredients">Ingredients</label>
              <textarea
                id="edit-ingredients"
                name="ingredients"
                value={editFormData.ingredients}
                onChange={handleEditFormChange}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-steps">Steps</label>
              <textarea
                id="edit-steps"
                name="steps"
                value={editFormData.steps}
                onChange={handleEditFormChange}
                className="form-textarea"
                rows="5"
              />
            </div>
          </form>
        </div>
        <div className="edit-modal-actions">
          <button onClick={onCancel} className="cancel-edit-btn" disabled={isUpdating}>
            Go back
          </button>
          <button onClick={onConfirm} className="confirm-edit-btn" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <span className="spinner"></span>
                Cooking...
              </>
            ) : (
              <>
                <Edit size={16} />
                Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditRecipeModal
