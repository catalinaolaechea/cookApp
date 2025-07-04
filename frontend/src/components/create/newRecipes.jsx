"use client"

import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { useSesion } from "../NavBar/useSesion"
import './estilos.css'

const CreateRecipe = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { isLoggedIn } = useSesion()
  const navigate = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    // Validaciones
    if (!name.trim() || !description.trim() || !ingredients.trim() || !steps.trim()) {
      setError("Your recipe need to be finish!")
      setIsSubmitting(false)
      return
    }

    const formData = {
      name: name.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      steps: steps.trim(),
    }

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        setError("please, sign in.")
        setIsSubmitting(false)
        return
      }

      console.log("=== Enviando receta ===")
      console.log("Datos:", formData)
      console.log("URL:", "http://localhost:3000/recipes")
      console.log("Token presente:", !!token)

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      console.log("Status de respuesta:", response.status)
      console.log("Headers de respuesta:", response.headers)

      const result = await response.json()
      console.log("Respuesta completa:", result)

      if (response.ok) {
        setSuccess(`"${name}" is now in your recipe book !`)

        setName("")
        setDescription("")
        setIngredients("")
        setSteps("")

      } else {
        setError(result.error || result.message || "Error al guardar la receta")
      }
    } catch (error) {
      console.error("Error completo:", error)
      setError("Error al conectar con el servidor. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create">
      <div className="create-container">
        <div className="card-container">
          <div className="mb-3 mt-3">
            <h2>Create your recipe</h2>
          </div>

          <div className="create-body">

            {!isLoggedIn && (
              <div className="alert alert-warning" role="alert">
                It seems that you are not logged in. Make sure you have logged in.
                <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => navigate("/")}>
                  Home
                </button>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
          
              <div className="form-to-complete">
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <textarea
                  placeholder="About the recipe"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Ingredients (separated by commas)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  required
                />
              </div>
            
              <button type="submit" className="btn btn-primary btn-lg px-4" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Cooking...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe
