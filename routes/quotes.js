const express = require('express');
const Quote = require('../models/Quote');

const router = express.Router();

// -------- crear quote
router.post('/quotes', async (req, res, next) => {
  const { text, date, location, theme, owner } = req.body;
  try {
    const newQuote = await Quote.create({
      text,
      owner,
      date,
      location,
      theme,
    });
    return res.json(newQuote);
  } catch (error) {
    next(error);
  }
});

// ---- listar mis quote creadas userHome
router.get('/quotes/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const quote = await Quote.findById({ _id: id });
    return res.json(quote);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

// ----- listar todas las quotes creadas
router.get('/quotes', async (req, res, next) => {
  try {
    const quotes = await Quote.find();
    return res.json(quotes);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

// ---- editar quote userHome
router.get('/quotes/edit/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const quote = await Quote.findById();
    return res.json(quote);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

// ---- mostrar mi owner de la quote seleccionada
router.get('/quotes/user/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const quotes = await Quote.find({ owner: id });
    console.log(quotes);
    return res.json(quotes);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

// --- actualizar quote seleccionada
router.put('/quotes/:id', async (req, res, next) => {
  const { id } = req.params;
  const { text, date, location, theme } = req.body;
  try {
    const quote = await Quote.findByIdAndUpdate(id, {
      text,
      date,
      location,
      theme,
    });
    return res.json(quote);
  } catch (error) {
    next(error);
  }
});

// --- eliminar quote seleccionada
router.delete('/quotes/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Quote.findByIdAndDelete(id);
    return res.json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
