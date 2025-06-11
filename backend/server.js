require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")
const authRoutes = require("./src/routes/auth.routes")
const recipesRouter = require("./src/routes/recipes.routes")
const { authenticateToken, authorizeRole } = require("./src/middlewares/auth.middleware")

const app = express()
app.use(cors())
app.use(express.json())

// Rutas para la app
app.use("/auth", authRoutes)
app.use("/recipes", recipesRouter)
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Hola , ${req.user.username}!`, roles: req.user.roles })
})

// ✅ Ruta para API externa de MealDB
app.get("/external-recipes", async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ message: "Parámetro 'query' es requerido" })
  }

  console.log("Buscando recetas externas:", query)
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

    if (!response.data.meals) {
      return res.json({ meals: [] })
    }

    res.json(response.data)
  } catch (error) {
    console.error("Error en el backend:", error.message)
    res.status(500).json({ message: "Error al buscar datos" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor completo corriendo en http://localhost:${PORT}`)
})
