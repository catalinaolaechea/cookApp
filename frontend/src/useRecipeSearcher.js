"use client"

import { useState, useCallback } from "react"

export const useRecipeSearch = (endpoint, options = {}) => {
  const [recipes, setRecipes] = useState(null)
  const [recipesSearch, setRecipesSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { requireAuth = false, loadInitialData = false, baseUrl = "http://localhost:3000" } = options

  const getRecipes = useCallback(
    async (forceLoad = false) => {
      // Para endpoints que requieren cargar datos iniciales (como /recipes del usuario)
      // o cuando hay texto de búsqueda
      const shouldLoad = forceLoad || loadInitialData || recipesSearch.trim() !== ""

      if (!shouldLoad) {
        setRecipes(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const headers = {
          "Content-Type": "application/json",
        }

        // Agregar autenticación si es requerida
        if (requireAuth) {
          const token = localStorage.getItem("token")
          if (!token) {
            throw new Error("There is no authentication token")
          }
          headers.Authorization = `Bearer ${token}`
        }

        // Construir URL con query params solo si hay búsqueda
        let url = `${baseUrl}${endpoint}`
        if (recipesSearch.trim() !== "") {
          url += `?query=${encodeURIComponent(recipesSearch)}`
        }

        const response = await fetch(url, { headers })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        // Manejar diferentes formatos de respuesta
        setRecipes(data.meals || data)
      } catch (error) {
        console.error("Error obtaining recipes:", error)
        setRecipes(null)
      } finally {
        setIsLoading(false)
      }
    },
    [recipesSearch, endpoint, requireAuth, loadInitialData, baseUrl],
  )

  return {
    recipes,
    recipesSearch,
    setRecipesSearch,
    isLoading,
    getRecipes,
  }
}

