"use client"

import { useState, useCallback } from "react"

export const useRecipeSearch = (endpoint, options = {}) => {
  const [recipes, setRecipes] = useState(null)
  const [recipesSearch, setRecipesSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { requireAuth = false, loadInitialData = false, baseUrl = "http://localhost:3000" } = options

  const getRecipes = useCallback(
    async (forceLoad = false) => {
    
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

       
        if (requireAuth) {
          const token = localStorage.getItem("token")
          if (!token) {
            throw new Error("There is no authentication token")
          }
          headers.Authorization = `Bearer ${token}`
        }

        let url = `${baseUrl}${endpoint}`
        if (recipesSearch.trim() !== "") {
          url += `?query=${encodeURIComponent(recipesSearch)}`
        }

        const response = await fetch(url, { headers })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

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

