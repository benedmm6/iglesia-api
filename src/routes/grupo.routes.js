import { Router } from 'express';

const router = Router();

import * as gruposCtrl from '../controllers/grupos.controller';
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isCoordinador], gruposCtrl.createGrupo);

router.get('/', gruposCtrl.getGrupos);

router.get('/:grupoId', gruposCtrl.getGrupoById);

router.put('/:grupoId', [authJwt.verifyToken, authJwt.isCoordinador], gruposCtrl.updateGrupoById);

router.delete('/:grupoId', [authJwt.verifyToken, authJwt.isCoordinador], gruposCtrl.deleteGrupoById);

export default router;

