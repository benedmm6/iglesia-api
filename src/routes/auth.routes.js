import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/auth.controller'

import {verifySingnup} from '../middlewares';

router.post('/signup', [
    verifySingnup.checkUsernameOrEmail,
    verifySingnup.checkRolesExisted
    ], authCtrl.singUp);

router.post('/signin', authCtrl.singIn);

export default router;