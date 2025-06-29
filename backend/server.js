require("dotenv").config()
const express = require("express")
const cors = require("cors")
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

app.get("/external-recipes", async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ message: "se requiere un parametro de busqueda" })
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const data = await response.json()

    if (!data.meals) {
      return res.json({ meals: [] })
    }

    res.json(data)
  } catch (error) {
    console.error("Error en el backend:", error.message)
    res.status(500).json({ message: "Error al buscar datos" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
