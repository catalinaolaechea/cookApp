"use client"

import { useState } from "react"
import { useSesion } from "../NavBar/useSesion"

export const useAuthModal = () => {
  const [showModal, setShowModal] = useState(false)
  const { loading, error, success, login, register, clearMessages } = useSesion()

  const handleShowModal = () => {
    setShowModal(true)
    clearMessages()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    clearMessages()
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    const result = await login(email, password)

    if (result.success) {
      setTimeout(() => {
        handleCloseModal()
        e.target.reset()
      }, 1500)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get("name")
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")

    const result = await register(name, email, username, password)

    if (result.success) {
      e.target.reset()
    }
  }

  return {
    showModal,
    loading,
    error,
    success,
    handleShowModal,
    handleCloseModal,
    handleLogin,
    handleRegister,
  }
}
