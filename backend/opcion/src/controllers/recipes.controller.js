const service = require('../services/recipes.service');

//solo administrador
exports.getAll = async (req, res) => {
  try {
    //acá creo que deberia ir user.id.roles
    const isAdmin = req.user.roles.includes('admin');
    const userId = req.user.id;

    const recipes = isAdmin
      ? await service.getAll()
      : await service.getAllByUserId(userId);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'no se encontraron recetas' });
  }
};


//administrador && usuario
exports.getOne = async (req, res) => {
  try {
    const recipe = await service.getById(req.params.id);
    const isAdmin = req.user.roles.includes('admin');
    const isOwner = recipe.user_id === req.user.id;

    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: 'No autorizado para ver esta receta' });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'no se encontró la receta' });
  }
};


//solo usuario bajo su username
exports.create = async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      user_id: req.user.id, 
    };
    const newRecipe = await service.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: 'error al crear receta' });
  }
};

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
    const isOwner = existingRecipe.user_id === req.user.id
    if (!isOwner) {
      return res.status(403).json({ error: "No autorizado para modificar esta receta" })
    }

    const recipeUpdated = await service.update(recipeId, req.body)
    res.json(recipeUpdated)
  } catch (err) {
    console.error("Error en update:", err)
    res.status(500).json({ error: "error al modificar receta" })
  }
};

//usuario y admin
exports.delete = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await service.getById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    const isAdmin = req.user.roles.includes('admin');
    const isOwner = recipe.user_id === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: 'No autorizado para eliminar esta receta' });
    }

    const deletedRecipe = await service.remove(recipeId);
    res.json(deletedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo eliminar la receta' });
  }
};
