import express from 'express'
import oderService from '../services/oder.service.js';
import auth from '../middleware/auth.js';

const router = new express.Router()


router.get("/orders", auth.verifyUser, oderService.addOder);
router.delete("/:id", auth.verifyUser, oderService.deleteOder);
router.get("/oder/check", auth.verifyUser, oderService.getOder);

export {
    router
}