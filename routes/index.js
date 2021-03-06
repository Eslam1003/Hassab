var { Router } = require('express');

var router = Router();
const {
  search,
  visitEdit,
  newVisit,
  visitsPrint,
  visitupdate,
  visitSave,
  chimistNote,
  chimistsave,
  analysis,
  analysisSearch,
  creatnew,
  deleteVisit,
} = require('./../controller/controller');

/* app routes */
router.get('/', search);
router.get('/visits/print/:id', visitsPrint);
router.delete('/visits/print/:id', deleteVisit);
router.get('/visits/new', newVisit);
router.get('/visits/chimist', chimistNote);
router.get('/visits/analysis', analysis);
router.get('/visits/edit/:id', visitEdit);
router.get('/visits/newvisit/:id', creatnew);
router.post('/visits/analysis', analysisSearch);
router.post('/visits/edit/:id', visitupdate);
router.post('/visits/chimist', chimistsave);
router.post('/', visitSave);

module.exports = router;
