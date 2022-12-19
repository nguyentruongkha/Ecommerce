import express from 'express'
import CartService from '../services/cart.service.js';
import auth from '../middleware/auth.js';

const router = new express.Router()

router.post("/cart/add", auth.verifyUser, CartService.addProdintoCart);
router.put("/:id", auth.verifyUser, CartService.updatedCart);
router.delete("/prod/:id", auth.verifyUser, CartService.deleteProdinCart);
router.get("/cart/find/:id", auth.verifiAdmin, CartService.getProdinCart);
router.get("/check",auth.verifyUser, CartService.getAllProdinCart);

export {
    router
}