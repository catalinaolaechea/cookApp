"use client"

import { Trash2 } from "lucide-react"

const DeleteRecipeModal = ({ recipeToDelete, onConfirm, onCancel, isDeleting }) => {
  if (!recipeToDelete) return null

  return (
    <div className="recipe-modal-overlay">
      <div className="delete-modal">
        <div className="delete-modal-header">
          <h3>Confirm delete</h3>
        </div>
        <div className="delete-modal-content">
          <div className="delete-warning">
            <Trash2 size={48} className="delete-icon" />
            <p>¿Are you shure you want to delete this recipe?</p>
            <p className="recipe-name-to-delete">"{recipeToDelete.name}"</p>
            <p className="delete-warning-text">the secret recipe will be lost.</p>
          </div>
        </div>
        <div className="delete-modal-actions">
          <button onClick={onCancel} className="cancel-delete-btn" disabled={isDeleting}>
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-delete-btn" disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="spinner"></span>
                throwing recipe...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                I'm sure
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecipeModal
