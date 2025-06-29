# EXPRESS REST API recipes
>En este proyecto se construyó el backend de una página para crear recetas.

- autenticaciones via [JWT](https://jwt.io/)
- routes via [express](https://expressjs.com/)
- habilitar peticiones desde otros origenes [cors](https://www.npmjs.com/package/cors#usage)
- hashear contraseñas via [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- almacenamiento de variables de entorno via [ENV](https://www.npmjs.com/package/dotenv)
- conexión con la DB via [mysql2](https://www.npmjs.com/package/mysql2)
- consumo de api [mealDB](www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata)
  
## ✅ Endpoints disponibles

| Método | Ruta              | Descripción                |
| ------ | ----------------- | -------------------------- |
| GET    | /auth/register    | registrar nuevo usario     |
| GET    | /auth/login       | log in usuario             |
| GET    | /external-recipes | Listar todos los productos |
| GET    | /recipes          | Listar todos los productos |
| GET    | /recipes/:id      | Obtener recetas por ID     |
| POST   | /recipes          | Crear una nueva receta     |
| PUT    | /recipes/:id      | Actualizar una receta      |
| DELETE | /recipes/:id      | Eliminar una receta        |



---

## 🚀 Comandos:
comandos disponibles en `package.json`
### Desarrollo
```bash
  npm run dev:nodemon
# Ejecuta: nodemon server.js
# Alternativa usando nodemon para desarrollo con auto-reload
```
### Producción
```bash
 npm start
# Ejecuta: node server.js
# Comando estándar para correr el servidor 
```
## ⚙️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (crear archivo `.env`)

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

## Objetivos 📖
* aprender a consumir una API externa, conectarse con una DB, manejar rutas, hasheos, node.js , pool de conexiones, tokens y mentener seguridad.
