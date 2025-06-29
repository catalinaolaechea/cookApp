export const useCrud = (token, getRecipes) => {
  const confirmEditRecipe = async (
    recipeToEdit,
    editFormData,
    setIsUpdating,
    setShowEditModal,
    setRecipeToEdit,
    setEditFormData,
  ) => {
    if (!recipeToEdit) return

    if (!editFormData.name.trim()) {
      alert("El nombre de la receta es obligatorio")
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch(`http://localhost:3000/recipes/${recipeToEdit.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      if (response.ok) {
        getRecipes(true)
        setShowEditModal(false)
        setRecipeToEdit(null)
        setEditFormData({
          name: "",
          description: "",
          ingredients: "",
          steps: "",
        })
        console.log("Receta actualizada exitosamente")
      } else {
        const errorData = await response.json()
        alert("Error al actualizar la receta: " + (errorData.error || "Error desconocido"))
      }
    } catch (error) {
      console.error("Error al actualizar receta:", error)
      alert("Error al actualizar la receta")
    } finally {
      setIsUpdating(false)
    }
  }

  const confirmDeleteRecipe = async (recipeToDelete, setIsDeleting, setShowDeleteModal, setRecipeToDelete) => {
    if (!recipeToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`http://localhost:3000/recipes/${recipeToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        getRecipes(true)
        setShowDeleteModal(false)
        setRecipeToDelete(null)
        console.log("Receta eliminada exitosamente")
      } else {
        const errorData = await response.json()
        alert("Error al eliminar la receta: " + (errorData.error || "Error desconocido"))
      }
    } catch (error) {
      console.error("Error al eliminar receta:", error)
      alert("Error al eliminar la receta")
    } finally {
      setIsDeleting(false)
    }
  }

  const cancelEdit = (setShowEditModal, setRecipeToEdit, setEditFormData) => {
    setShowEditModal(false)
    setRecipeToEdit(null)
    setEditFormData({
      name: "",
      description: "",
      ingredients: "",
      steps: "",
    })
  }

  const cancelDelete = (setShowDeleteModal, setRecipeToDelete) => {
    setShowDeleteModal(false)
    setRecipeToDelete(null)
  }

  return {
    confirmEditRecipe,
    confirmDeleteRecipe,
    cancelEdit,
    cancelDelete,
  }
}
