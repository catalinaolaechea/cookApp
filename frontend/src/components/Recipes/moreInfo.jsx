"use client"
import { useEffect, useCallback } from "react"

export const RecipeDetail = ({ recipe, onClose }) => {
 
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    // Solo agregar el event listener si el modal está abierto
    if (recipe) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.classList.add("modal-open")
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("modal-open")
    }
  }, [recipe, handleKeyDown])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!recipe) return null

  const formatInstructions = (instructions) => {
    if (!instructions) return null
    return instructions.split("\n").map(
      (paragraph, index) =>
        paragraph.trim() && (
          <p key={index} className="mb-3">
            {paragraph}
          </p>
        ),
    )
  }

  return (
    <div
      className="modal-backdrop show d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable" style={{ maxWidth: "90%", margin: "30px auto" }}>
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h1 className="modal-title fs-4">{recipe.strMeal}</h1>
              <p className="text-muted">
                {recipe.strCategory} | {recipe.strArea}
              </p>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src={recipe.strMealThumb || "/placeholder.svg?height=400&width=400"}
                  alt={recipe.strMeal}
                  className="img-fluid rounded"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <h2 className="fs-5 fw-bold mb-3">Ingredientes</h2>
                  <ul className="list-group list-group-flush">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const ingredient = recipe[`strIngredient${i + 1}`]
                      const measure = recipe[`strMeasure${i + 1}`]

                      if (ingredient && ingredient.trim()) {
                        return (
                          <li key={i} className="list-group-item d-flex px-0">
                            {measure && measure.trim() && (
                              <span className="fw-medium me-2 text-nowrap">{measure.trim()} -</span>
                            )}
                            <span>{ingredient}</span>
                          </li>
                        )
                      }
                      return null
                    })}
                  </ul>
                </div>

                {recipe.strYoutube && (
                  <div className="mb-4">
                    <h2 className="fs-5 fw-bold mb-3">Video Tutorial</h2>
                    <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-danger">
                      Ver video en YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h2 className="fs-5 fw-bold mb-3">Instrucciones</h2>
              <div>{formatInstructions(recipe.strInstructions)}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
