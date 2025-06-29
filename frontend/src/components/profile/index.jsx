"use client"
import "./estilos.css"
import { Link } from "react-router-dom"
import { Search, CircleUserRound, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRecipeSearch } from "../../useRecipeSearcher"
import { useSesion } from "../NavBar/useSesion"
import { useCrud } from "./useCrud"
import {RecipeCard} from "./recipeCard"
import ViewRecipeModal from "./viewRecipe"
import EditRecipeModal from "./modifyRecipe"
import DeleteRecipeModal from "./deleteRecipe"


const useProfileLogic = () => {
  const [showInput, setShowInput] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState(null)
  const [recipeToEdit, setRecipeToEdit] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    steps: "",
  })

  const { recipes, recipesSearch, setRecipesSearch, isLoading, getRecipes } = useRecipeSearch("/recipes", {
    requireAuth: true,
    loadInitialData: true,
  })

  const { isLoggedIn, getUsernameFromToken, token } = useSesion()

  useEffect(() => {
    if (isLoggedIn) {
      getRecipes(true)
    }
  }, [isLoggedIn, getRecipes])

  useEffect(() => {
    if (isLoggedIn && recipesSearch.trim() !== "") {
      const timeoutId = setTimeout(() => {
        getRecipes()
      }, 300)
      return () => clearTimeout(timeoutId)
    } else if (isLoggedIn && recipesSearch.trim() === "") {
      getRecipes(true)
    }
  }, [recipesSearch, isLoggedIn, getRecipes])

  // Funciones de manejo
  const handleSearchChange = (e) => {
    setRecipesSearch(e.target.value)
  }

  const clearSearch = () => {
    setRecipesSearch("")
    setShowInput(false)
  }

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe)
    setShowRecipeModal(true)
  }

  const handleEditRecipe = (recipe) => {
    setRecipeToEdit(recipe)
    setEditFormData({
      name: recipe.name || "",
      description: recipe.description || "",
      ingredients: recipe.ingredients || "",
      steps: recipe.steps || "",
    })
    setShowEditModal(true)
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDeleteRecipe = (recipe) => {
    setRecipeToDelete(recipe)
    setShowDeleteModal(true)
  }

  return {

    showInput,
    setShowInput,
    selectedRecipe,
    showRecipeModal,
    setShowRecipeModal,
    showDeleteModal,
    showEditModal,
    recipeToDelete,
    recipeToEdit,
    isDeleting,
    isUpdating,
    editFormData,
    recipes,
    recipesSearch,
    isLoading,
    isLoggedIn,
    token,

    handleSearchChange,
    clearSearch,
    handleViewRecipe,
    handleEditRecipe,
    handleEditFormChange,
    handleDeleteRecipe,
    getUsernameFromToken,
    getRecipes,
    setIsDeleting,
    setIsUpdating,
    setShowDeleteModal,
    setRecipeToDelete,
    setShowEditModal,
    setRecipeToEdit,
    setEditFormData,
  }
}

const ProfileInfo = ({ username, recipeCount }) => {
  return (
    <div className="panel-usuario">
      <div className="user-avatar">
        <CircleUserRound size={40} />
      </div>
      <div className="user-info">
        <h2>{username}</h2>
        <p>
          {recipeCount} recipe{recipeCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}

const SearchSection = ({ showInput, setShowInput, recipesSearch, handleSearchChange, clearSearch }) => {
  return (
    <div className="search-section">
      <div className="search-header">
        <h3>Your recipes</h3>
        <div className="search-actions">
          <Link to="/create">
            <button className="add-recipe-btn" title="Start a new one!">
              <Plus size={20} />
            </button>
          </Link>
          {showInput ? (
            <div className="search-input-container">
              <input
                type="text"
                value={recipesSearch}
                onChange={handleSearchChange}
                placeholder="Cooking..."
                autoFocus
                className="search-input"
              />
              <button onClick={clearSearch} className="clear-search-btn">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowInput(true)} className="search-btn" title="Search recipes">
              <Search size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const RecipeGrid = ({ isLoading, recipes, recipesSearch, handleViewRecipe, handleEditRecipe, handleDeleteRecipe }) => {
  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Cooking...</p>
      </div>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="empty-state">
        {recipesSearch ? (
          <p>No recipes were found for "{recipesSearch}"</p>
        ) : (
          <div>
            <p>Empty recipe book.</p>
            <Link to="/create">
              <button className="create-first-recipe-btn">
                <Plus size={16} />
                Start your first recipe
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onView={handleViewRecipe}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      ))}
    </div>
  )
}

const Profile = () => {
  const {
    // Estados
    showInput,
    setShowInput,
    selectedRecipe,
    showRecipeModal,
    setShowRecipeModal,
    showDeleteModal,
    showEditModal,
    recipeToDelete,
    recipeToEdit,
    isDeleting,
    isUpdating,
    editFormData,
    recipes,
    recipesSearch,
    isLoading,
    isLoggedIn,
    token,

    // Funciones
    handleSearchChange,
    clearSearch,
    handleViewRecipe,
    handleEditRecipe,
    handleEditFormChange,
    handleDeleteRecipe,
    getUsernameFromToken,
    getRecipes,
    setIsDeleting,
    setIsUpdating,
    setShowDeleteModal,
    setRecipeToDelete,
    setShowEditModal,
    setRecipeToEdit,
    setEditFormData,
  } = useProfileLogic()

  const { confirmEditRecipe, confirmDeleteRecipe, cancelEdit, cancelDelete } = useCrud(token, getRecipes)

  const username = getUsernameFromToken()

  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <p>You need to Sign in.</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <ProfileInfo username={username} recipeCount={recipes ? recipes.length : 0} />

      <SearchSection
        showInput={showInput}
        setShowInput={setShowInput}
        recipesSearch={recipesSearch}
        handleSearchChange={handleSearchChange}
        clearSearch={clearSearch}
      />

      <div className="recipes-container">
        <RecipeGrid
          isLoading={isLoading}
          recipes={recipes}
          recipesSearch={recipesSearch}
          handleViewRecipe={handleViewRecipe}
          handleEditRecipe={handleEditRecipe}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      </div>

      {showRecipeModal && <ViewRecipeModal selectedRecipe={selectedRecipe} onClose={() => setShowRecipeModal(false)} />}

      {showEditModal && (
        <EditRecipeModal
          recipeToEdit={recipeToEdit}
          editFormData={editFormData}
          handleEditFormChange={handleEditFormChange}
          onConfirm={() =>
            confirmEditRecipe(
              recipeToEdit,
              editFormData,
              setIsUpdating,
              setShowEditModal,
              setRecipeToEdit,
              setEditFormData,
            )
          }
          onCancel={() => cancelEdit(setShowEditModal, setRecipeToEdit, setEditFormData)}
          isUpdating={isUpdating}
        />
      )}

      {showDeleteModal && (
        <DeleteRecipeModal
          recipeToDelete={recipeToDelete}
          onConfirm={() => confirmDeleteRecipe(recipeToDelete, setIsDeleting, setShowDeleteModal, setRecipeToDelete)}
          onCancel={() => cancelDelete(setShowDeleteModal, setRecipeToDelete)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}

export default Profile
