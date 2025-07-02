"use client"

import { useState, useEffect } from "react"

export const useSesion = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)

  // decodificacion para obtener username a partir del token
  const getUsernameFromToken = () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return null

      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      )

      const decoded = JSON.parse(jsonPayload)
      return decoded.username || null
    } catch (error) {
      return null
    }
  }

  //para verificar token
  const verifyToken = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setIsLoggedIn(true)
        setUser(userData)
        return true
      } else {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUser(null)
        return false
      }
    } catch (error) {
      console.error("Error verificando token:", error)
      localStorage.removeItem("token")
      setIsLoggedIn(false)
      setUser(null)
      return false
    }
  }

  // para el login
  const login = async (email, password) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        setSuccess("Welcome to cookApp!")

        // ✅ Actualizar estado inmediatamente después del login exitoso
        setIsLoggedIn(true)

        // Verificar token para obtener datos del usuario
        try {
          await verifyToken(data.token)
        } catch (verifyError) {
          console.error("Error verificando token después del login:", verifyError)
          // Mantener isLoggedIn como true aunque falle la verificación
        }

        // ✅ Disparar evento personalizado para notificar a otros componentes
        window.dispatchEvent(
          new CustomEvent("authStateChanged", {
            detail: { isLoggedIn: true, token: data.token },
          }),
        )

        return { success: true }
      } else {
        setError(data.message || data.error || "Error al iniciar sesión")
        return { success: false, error: data.message }
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.")
      console.error("Error en login:", error)
      return { success: false, error: "Error de conexión" }
    } finally {
      setLoading(false)
    }
  }

  // para registrarse
  const register = async (name, email, username, password) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Account created successfully! Log in to start.")
        return { success: true }
      } else {
        setError(data.message || "Error al crear la cuenta")
        return { success: false, error: data.message }
      }
    } catch (error) {
      setError("Error :(")
      console.error("Error en registro:", error)
      return { success: false, error: "Error de conexión" }
    } finally {
      setLoading(false)
    }
  }

  // desloggeo
  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)

    // ✅ Disparar evento personalizado para notificar logout
    window.dispatchEvent(
      new CustomEvent("authStateChanged", {
        detail: { isLoggedIn: false, token: null },
      }),
    )
  }

  // Limpiar mensajes
  const clearMessages = () => {
    setError("")
    setSuccess("")
  }

  // ✅ Verificar token al cargar y escuchar cambios de autenticación
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        await verifyToken(token)
      }
      setIsInitialized(true)
    }

    // ✅ Escuchar eventos de cambio de autenticación
    const handleAuthChange = (event) => {
      const { isLoggedIn: newIsLoggedIn } = event.detail
      setIsLoggedIn(newIsLoggedIn)
      if (!newIsLoggedIn) {
        setUser(null)
      }
    }

    // ✅ Escuchar cambios en localStorage (para sincronizar entre pestañas)
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        if (event.newValue) {
          verifyToken(event.newValue)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      }
    }

    initializeAuth()
    window.addEventListener("authStateChanged", handleAuthChange)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  return {
    // Estados
    isLoggedIn,
    users,
    loading,
    error,
    success,
    token,
    isInitialized,
    // Funciones
    login,
    register,
    logout,
    getUsernameFromToken,
    clearMessages,
  }
}
