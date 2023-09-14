import express from 'express';
import fileCntrl from '../controller/fileCntrl';


const routes = express.Router();

routes.get('/', fileCntrl.rend);
routes.post('/api/files', fileCntrl.create);
routes.get('/files/:uuid', fileCntrl.show)
routes.get('/files/download/:uuid', fileCntrl.download)

export default routes;