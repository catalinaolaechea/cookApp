"use client"

import { Link } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import Logo from "../assets/Icon.png"
import { useSesion } from "./useSesion"
import { useNavigate } from "react-router-dom"
import { useAuthModal } from "./useAuthModal"
import { useMediaQuery } from "./useMediaQuery"
import AuthModal from "./authModal"
import "./estilos.css"

const NavBar = () => {
  const { isLoggedIn, getUsernameFromToken, logout, isInitialized } = useSesion()
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { showModal, loading, error, success, handleShowModal, handleCloseModal, handleLogin, handleRegister } =
    useAuthModal()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Renderizado para dispositivos móviles y tablets
  if (isMobile) {
    return (
      <>
        <Navbar bg="light" expand="lg" className="px-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src={Logo || "/placeholder.svg"} alt="logo" className="Icono" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown.Item as={Link} to="/">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/inspo">
                  Get inspired
                </NavDropdown.Item>

                {isLoggedIn && isInitialized && (
                  <>
                    <NavDropdown.Item as={Link} to="/create">
                      Create now
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                  </>
                )}
                {isInitialized ? ( isLoggedIn ? (
                  <NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <Nav.Link onClick={handleShowModal}>Sign in</Nav.Link>
                  </NavDropdown.Item>
                )
                ) : (
                  <Nav.Link disabled>Loading...</Nav.Link>
                )}
              </Nav>

              <Nav>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <AuthModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          loading={loading}
          error={error}
          success={success}
        />
      </>
    )
  }

  // Renderizado para desktop (tu diseño original)
  return (
    <>
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
            {isLoggedIn && isInitialized && (
              <ul className="nav-links">
                <li>
                  <Link to="/create">Create now</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            )}
          </ul>

          {isInitialized ? (
            isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-primary fw-bold">¡Hola, {getUsernameFromToken()}!</span>
                <button className="nav-button" onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            ) : (
              <button className="nav-button" onClick={handleShowModal}>
                Sign in
              </button>
            )
          ) : (
            <button className="nav-button" disabled>
              Loading...
            </button>
          )}
        </nav>
      </header>

      <AuthModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        loading={loading}
        error={error}
        success={success}
      />
    </>
  )
}

export default NavBar

