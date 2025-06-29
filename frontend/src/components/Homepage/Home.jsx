"use client"

import "./estilos.css"
import { Link } from "react-router-dom"
import { useSesion } from "../NavBar/useSesion"
import { useAuthModal } from "../NavBar/useAuthModal"
import AuthModal from "../NavBar/authModal"

const Home = () => {
  const { isLoggedIn, isInitialized } = useSesion()
  const { showModal, loading, error, success, handleShowModal, handleCloseModal, handleLogin, handleRegister } =
    useAuthModal()

  const handleButtonClick = () => {
    if (isLoggedIn) {
      return
    } else {
      handleShowModal()
    }
  }

  if (!isInitialized) {
    return (
      <div>
        <div className="Hero-title">
          <div className="Hero-info">
            <h1>Get creative by creating recipes</h1>
            <button disabled>Loading...</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="Hero-title">
        <div className="Hero-info">
          <h1>Get creative by creating recipes</h1>
          {isLoggedIn ? (
            <Link to="/create">
              <button>Start Now!</button>
            </Link>
          ) : (
            <button onClick={handleButtonClick}>Start Now!</button>
          )}
        </div>
      </div>

      <AuthModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  )
}

export default Home
