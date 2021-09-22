import { resolve } from 'path';
import db from '../models/index.mjs';

// ========================================================== IMPORT CONTROLLERS
import initDiagramsController from '../controllers/diagramsController.mjs';

// =============================================================== EXPORT ROUTES
export default function apiRoutes(app) {
  const diagramsController = initDiagramsController(db);

  //= ==================================== SET ROUTES

  // get all user diagrams
  app.get('/api/diagrams/:userId', diagramsController.index);

  // get selected diagram
  app.get('/api/diagrams/select/:diagramId', diagramsController.find);

  // create new diagram
  app.post('/api/diagrams/create/:userId', diagramsController.create);

  // update selected diagram
  app.put('/api/diagrams/update/:diagramId', diagramsController.update);

  // update selected diagram
  app.delete('/api/diagrams/delete/:diagramId', diagramsController.destroy);

  // misc
  app.get('/', (request, response) => {
    response.send('DBRAMA API');
  });
}
