const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes.controller');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

router.get(
    '/', 
    authenticateToken,
    controller.getAll
);

router.get(
    '/:id', 
    authenticateToken,
    controller.getById
);

router.delete(
    '/:id',
    authenticateToken,
    controller.delete
);

router.post(
    '/',  
    authenticateToken,
    authorizeRole('user'),
    controller.create
);

router.put(
    '/:id',
    authenticateToken,
    authorizeRole('user'),
    controller.update
);

module.exports = router;