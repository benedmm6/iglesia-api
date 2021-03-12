import { Router } from 'express';

import * as usuarioCtrl from '../controllers/user.controller';

const router = Router();

import { authJwt, verifySingnup } from '../middlewares'

router.post('/', [
    authJwt.verifyToken, 
    authJwt.isCoordinador, 
    verifySingnup.checkRolesExisted, 
    verifySingnup.checkUsernameOrEmail
    ], usuarioCtrl.createUsuario)



export default router;