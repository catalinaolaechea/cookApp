const pool = require('../config/db');

exports.getAll = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.recipe_id as id,
        r.name,
        r.description,
        r.steps,
        r.ingredients,
        u.username 
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
    `);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener recetas');
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        r.recipe_id,
        r.name,
        r.description,
        r.steps,
        r.ingredients,
        u.username
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.recipe_id = ?
      `, [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener receta por su id');
  }
};

//chequear
exports.getAllByUserId = async (userId) =>{
  try{const [rows] = await pool.query(
      `
      SELECT 
        r.recipe_id as id,
        r.name,
        r.description,
        r.steps,
        r.ingredients,
        u.username
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.user_id = ?
      `, 
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error('Error al obtener recetas por id de usuario');
  }
}

exports.create = async ({ name, description, steps, ingredients, user_id }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO recipes (name, description, steps, ingredients, user_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, steps, ingredients, user_id]
    );
    return { recipe_id: result.insertId, name, description, steps, ingredients, user_id };
  } catch (error) {
    throw new Error('Error al crear receta');
  }
};

exports.update = async (id, { name, description, steps, ingredients}) => {
  try {
    const [result] = await pool.query(
      'UPDATE recipes SET name = ?, description = ?, steps = ?, ingredients = ? WHERE recipe_id = ?',
      [name, description, steps, ingredients, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Receta no encontrada para actualizar');
    }

    const [updatedRows] = await pool.query(
      "SELECT recipe_id as id, name, description, steps, ingredients, user_id FROM recipes WHERE recipe_id = ?",
      [id],
    )

    return updatedRows[0]

  } catch (error) {
    throw new Error("Error al actualizar receta")
  }
};

exports.remove = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM recipes WHERE recipe_id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Receta no encontrada para eliminar');
    }
    return { deleted: true };
  } catch (error) {
    throw new Error('Error al eliminar receta');
  }
};
