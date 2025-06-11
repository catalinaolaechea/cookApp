"use client"

import { Modal, Button, Row, Col, ListGroup } from "react-bootstrap"

export const RecipeDetail = ({ recipe, onClose }) => {
  const show = !!recipe

  const formatInstructions = (instructions) => {
    if (!instructions) return null
    return instructions.split("\n").map(
      (paragraph, index) =>
        paragraph.trim() && (
          <p key={index} className="mb-3">
            {paragraph}
          </p>
        ),
    )
  }

  return (
    <Modal show={show} onHide={onClose} size="xl" scrollable centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            <h1 className="fs-4 mb-1">{recipe?.strMeal}</h1>
            <p className="text-muted mb-0">
              {recipe?.strCategory} | {recipe?.strArea}
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={recipe?.strMealThumb || "/placeholder.svg?height=400&width=400"}
              alt={recipe?.strMeal}
              className="img-fluid rounded"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Col>

          <Col md={6}>
            <div className="mb-4">
              <h2 className="fs-5 fw-bold mb-3">Ingredientes</h2>
              <ListGroup variant="flush">
                {Array.from({ length: 20 }).map((_, i) => {
                  const ingredient = recipe?.[`strIngredient${i + 1}`]
                  const measure = recipe?.[`strMeasure${i + 1}`]

                  if (ingredient && ingredient.trim()) {
                    return (
                      <ListGroup.Item key={i} className="d-flex px-0">
                        {measure && measure.trim() && (
                          <span className="fw-medium me-2 text-nowrap">{measure.trim()} -</span>
                        )}
                        <span>{ingredient}</span>
                      </ListGroup.Item>
                    )
                  }
                  return null
                })}
              </ListGroup>
            </div>

            {recipe?.strYoutube && (
              <div className="mb-4">
                <h2 className="fs-5 fw-bold mb-3">Video Tutorial</h2>
                <Button variant="danger" href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                  Ver video en YouTube
                </Button>
              </div>
            )}
          </Col>
        </Row>

        <div className="mt-4">
          <h2 className="fs-5 fw-bold mb-3">Instrucciones</h2>
          <div>{formatInstructions(recipe?.strInstructions)}</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
