const express = require('express');
const router = express.Router();
const noteActions= require('../actions/api/noteActions');
//get urzywamy jak chcemy pobrać jakieś zasoby z serwera
router.get('/notes',noteActions.getAllNotes);//pobieranie notatek (end point)np. getAllNotes to są akcje do wykonania
router.get('/notes/:id',noteActions.getNote);//pobieranie konkretnej notatki
router.post('/notes',noteActions.saveNote);//post służy do zapisywania nowych danych
router.put('/notes/:id',noteActions.updateNote);//put służy do edycji danych
router.delete('/notes/:id',noteActions.deleteNote);//delete służy do usuwania danych

module.exports = router;