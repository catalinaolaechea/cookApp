"use client"

import { Modal, Button, Form, Card, Tabs, Tab, Alert } from "react-bootstrap"

const AuthModal = ({ showModal, handleCloseModal, handleLogin, handleRegister, loading, error, success }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered size="md" contentClassName="border-0 shadow">
      <Modal.Header closeButton className="bg-primary bg-opacity-10 border-0">
        <Modal.Title className="w-100 text-center text-primary fw-bold">User account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Tabs defaultActiveKey="login" className="mb-4" justify>
          <Tab eventKey="login" title="Login">
            <Card className="border-0 shadow-sm p-3">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="py-2"
                    required
                    autoComplete="email"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="py-2"
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" size="lg" className="py-2" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </div>
              </Form>
            </Card>
          </Tab>

          <Tab eventKey="register" title="Register">
            <Card className="border-0 shadow-sm p-3">
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="py-2"
                    required
                    autoComplete="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="py-2"
                    required
                    autoComplete="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="py-2"
                    required
                    autoComplete="username"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="py-2"
                    required
                    autoComplete="new-password"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" size="lg" className="py-2" type="submit" disabled={loading}>
                    {loading ? "Starting.." : "Create profile"}
                  </Button>
                </div>
              </Form>
            </Card>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default AuthModal
