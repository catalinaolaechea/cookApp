"use client"

import { Trash2 } from "lucide-react"

const DeleteRecipeModal = ({ recipeToDelete, onConfirm, onCancel, isDeleting }) => {
  if (!recipeToDelete) return null

  return (
    <div className="recipe-modal-overlay">
      <div className="delete-modal">
        <div className="delete-modal-header">
          <h3>Confirmar eliminación</h3>
        </div>
        <div className="delete-modal-content">
          <div className="delete-warning">
            <Trash2 size={48} className="delete-icon" />
            <p>¿Estás seguro de que quieres eliminar la receta?</p>
            <p className="recipe-name-to-delete">"{recipeToDelete.name}"</p>
            <p className="delete-warning-text">Esta acción no se puede deshacer.</p>
          </div>
        </div>
        <div className="delete-modal-actions">
          <button onClick={onCancel} className="cancel-delete-btn" disabled={isDeleting}>
            Cancelar
          </button>
          <button onClick={onConfirm} className="confirm-delete-btn" disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="spinner"></span>
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Eliminar receta
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecipeModal
