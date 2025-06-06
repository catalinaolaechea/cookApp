"use client"

import { Link } from "react-router-dom"
import { Modal, Button, Row, Col, Form, Card, Tabs, Tab, Alert } from "react-bootstrap"
import { useState, useEffect } from "react"
import Logo from "../assets/Icon.png"
import "./estilos.css"

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Estados para los formularios
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  })

  const handleShowModal = () => {
    setShowModal(true)
    setError("")
    setSuccess("")
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setError("")
    setSuccess("")
  }

  // Verificar si hay token al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Verificar si el token es válido
      verifyToken(token)
    }
  }, [])

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
      } else {
        // Token inválido, remover del localStorage
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUser(null)
      }
    } catch (error) {
      console.error("Error verificando token:", error)
      localStorage.removeItem("token")
      setIsLoggedIn(false)
      setUser(null)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        // Login exitoso
        localStorage.setItem("token", data.token)
        setIsLoggedIn(true)
        setSuccess("¡Login exitoso!")

        // Obtener datos del usuario
        await verifyToken(data.token)

        setTimeout(() => {
          handleCloseModal()
          setLoginData({ email: "", password: "" })
        }, 1500)
      } else {
        setError(data.message || data.error || "Error al iniciar sesión")
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.")
      console.error("Error en login:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerData.username,
          name: `${registerData.name} ${registerData.lastname}`,
          email: registerData.email,
          password: registerData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.")
        setRegisterData({
          name: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
        })
      } else {
        setError(data.message || "Error al crear la cuenta")
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.")
      console.error("Error en registro:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <header>
      <nav>
        <div className="Icon">
          <img src={Logo || "/placeholder.svg"} alt="logo" className="Icono" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/inspo">Get inspired</Link>
          </li>
          {/* ✅ Solo mostrar "Create now" si está loggeado */}
          {isLoggedIn && (
            <li>
              <Link to="/create">Create now</Link>
            </li>
          )}
        </ul>

        {/* ✅ Cambiar botón según estado de autenticación */}
        {isLoggedIn ? (
          <div className="d-flex align-items-center gap-3">
            <span className="text-primary fw-bold">¡Hola, {user?.username}!</span>
            <button className="nav-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button className="nav-button" onClick={handleShowModal}>
            start now
          </button>
        )}
      </nav>

      <Modal show={showModal} onHide={handleCloseModal} centered size="md" contentClassName="border-0 shadow">
        <Modal.Header closeButton className="bg-primary bg-opacity-10 border-0">
          <Modal.Title className="w-100 text-center text-primary fw-bold">Acceso de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Tabs defaultActiveKey="login" className="mb-4" justify>
            <Tab eventKey="login" title="Iniciar Sesión">
              <Card className="border-0 shadow-sm p-3">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico"
                      className="py-2"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      className="py-2"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" size="lg" className="py-2" type="submit" disabled={loading}>
                      {loading ? "Iniciando..." : "Iniciar Sesión"}
                    </Button>
                  </div>
                </Form>
              </Card>
            </Tab>

            <Tab eventKey="register" title="Crear Cuenta">
              <Card className="border-0 shadow-sm p-3">
                <Form onSubmit={handleRegister}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        className="py-2"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Apellido"
                        className="py-2"
                        value={registerData.lastname}
                        onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
                        required
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico"
                      className="py-2"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nombre de usuario"
                      className="py-2"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      className="py-2"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" size="lg" className="py-2" type="submit" disabled={loading}>
                      {loading ? "Creando..." : "Crear Cuenta"}
                    </Button>
                  </div>
                </Form>
              </Card>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </header>
  )
}

export default Home
