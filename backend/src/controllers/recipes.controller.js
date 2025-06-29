const service = require("../services/recipes.service")

//solo administrador
exports.getAll = async (req, res) => {
  try {
    const isAdmin = req.user.roles.includes("admin")
    const userId = req.user.id

    const recipes = isAdmin ? await service.getAll() : await service.getAllByUserId(userId)

    res.json(recipes)
  } catch (err) {
    console.error("Error en getAll:", err)
    res.status(500).json({ error: "no se encontraron recetas" })
  }
}

//administrador && usuario
exports.getOne = async (req, res) => {
  try {
    const recipe = await service.getById(req.params.id)

    if (!recipe) {
      return res.status(404).json({ error: "Receta no encontrada" })
    }

    const isAdmin = req.user.roles.includes("admin")
    const isOwner = Number.parseInt(recipe.user_id) === Number.parseInt(req.user.id)

    console.log("Debug getOne:", {
      recipeUserId: recipe.user_id,
      currentUserId: req.user.id,
      isAdmin,
      isOwner,
      userRoles: req.user.roles,
    })

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "No autorizado para ver esta receta" })
    }

    res.json(recipe)
  } catch (err) {
    console.error("Error en getOne:", err)
    res.status(500).json({ error: "no se encontró la receta" })
  }
}

//usuario bajo su username
exports.create = async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      user_id: req.user.id,
    }
    const newRecipe = await service.create(recipeData)
    res.status(201).json(newRecipe)
  } catch (err) {
    console.error("Error en create:", err)
    res.status(500).json({ error: "error al crear receta" })
  }
}

//solo usuario
exports.update = async (req, res) => {
  try {
    const recipeId = req.params.id

    // Verificar que la receta existe y obtener sus datos
    const existingRecipe = await service.getById(recipeId)
    if (!existingRecipe) {
      return res.status(404).json({ error: "Receta no encontrada" })
    }

    // Verificar que el usuario es el dueño de la receta
    const isOwner = Number.parseInt(existingRecipe.user_id) === Number.parseInt(req.user.id)

    console.log("Debug update:", {
      recipeUserId: existingRecipe.user_id,
      currentUserId: req.user.id,
      isOwner,
      userRoles: req.user.roles,
    })

    if (!isOwner) {
      return res.status(403).json({ error: "No autorizado para modificar esta receta" })
    }

    const recipeUpdated = await service.update(recipeId, req.body)
    res.json(recipeUpdated)
  } catch (err) {
    console.error("Error en update:", err)
    res.status(500).json({ error: "error al modificar receta" })
  }
}

//admin y usuario solo si es el dueño de la receta
exports.delete = async (req, res) => {
  try {
    const recipeId = req.params.id

    const recipe = await service.getById(recipeId)
    if (!recipe) {
      return res.status(404).json({ error: "Receta no encontrada" })
    }

    const isAdmin = req.user.roles.includes("admin")
    const isOwner = Number.parseInt(recipe.user_id) === Number.parseInt(req.user.id)

    console.log("Debug delete:", {
      recipeId,
      recipeUserId: recipe.user_id,
      currentUserId: req.user.id,
      isAdmin,
      isOwner,
      userRoles: req.user.roles,
      recipeUserIdType: typeof recipe.user_id,
      currentUserIdType: typeof req.user.id,
    })

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        error: "No autorizado para eliminar esta receta",
        debug: {
          recipeUserId: recipe.user_id,
          currentUserId: req.user.id,
          isAdmin,
          isOwner,
        },
      })
    }

    const deletedRecipe = await service.remove(recipeId)
    res.json(deletedRecipe)
  } catch (err) {
    console.error("Error en delete:", err)
    res.status(500).json({ error: "No se pudo eliminar la receta" })
  }
}
