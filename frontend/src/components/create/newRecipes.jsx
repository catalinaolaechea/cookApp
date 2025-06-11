"use client"

import { useState } from "react"
import "./estilos.css"

const CreateRecipe = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!name.trim() || !description.trim() || !ingredients.trim() || !steps.trim() || prepTime <= 0) {
      alert("Por favor, completa todos los campos correctamente.")
      setIsSubmitting(false)
      return
    }

    const formData = {
      name: name.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      steps: steps.trim(),
      prepTime: Number(prepTime),
    }

    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        alert(`¡Receta "${name}" guardada exitosamente en la base de datos!`)

        setName("")
        setDescription("")
        setIngredients("")
        setSteps("")
        setPrepTime("")
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error("Error al guardar receta:", error)
      alert("Error al conectar con el servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-wrapper">
      <div className="container">
        <div className="container2">
          <h2>Crea tu receta</h2>
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="form-left">
                <input
                  type="text"
                  placeholder="Nombre de la receta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Descripción breve"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-right">
                <input
                  type="number"
                  placeholder="Tiempo de preparación (en minutos)"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  min="1"
                  required
                />

                <textarea
                  placeholder="Ingredientes (separados por comas)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Pasos a seguir"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar receta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe
