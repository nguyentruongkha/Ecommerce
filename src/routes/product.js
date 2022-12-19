import  express  from "express";
import ProdService from "../services/product.service.js";
import auth from "../middleware/auth.js";
import { uploadCloud } from "../helper/uploadimg.js";

const router = new express.Router()

router.post("/add/product", auth.verifiAdmin, ProdService.createProd);
router.put("/product/:id", auth.verifiAdmin, ProdService.updateProd);
router.delete("/:id", auth.verifiAdmin, ProdService.deleteProd);
router.get("/find/:id", ProdService.getProd);
router.post('/product/img', auth.verifiAdmin, uploadCloud.single('img'), ProdService.uploadImg)
router.post('/search', ProdService.searchProd)

export {router}