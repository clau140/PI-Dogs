const express = require('express');
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRouter = require('./dogs')
const temperamentsRouter = require('./temperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json());

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);

module.exports = router;
