import { Router } from "express";
import { CartsManager } from "../dao/cartsManager.js";
import { ProductManager} from "../productManager.js";

const cartsService = new CartsManager ("carts.json");
const productsService = new ProductManager ('products.json') 
const router = Router();


router.post("/", async (req, res)=>{
     try {
        const cartCreated = await cartsService.addCart();
        res.json({status: "succes", data:cartCreated}) 
        
     } catch (error) {
        res.json({status:"error", message:error.message})
     }
})


router.get("/:cid", async (req, res)=>{
    try {
        const cartId =parseInt(req.params.cid);
        const cart = await cartsService.getById(cartId);
        res.json({status:"success", data:cart})
       
   }catch (error) {
        res.json({status:"error", message:error.message})
    }
})


router.post("/:cid/product/:pid", async (req, res)=>{
   try {
        const cartId = parseInt(req.params.cid);
         const productId = parseInt(req.params.pid);
         const cart = await cartsService.getById(cartId);
         console.log("cartiiii",cart)
    
      
        const product = await productsService.getproductById(productId);
        console.log("productobuscado por id",product)

       const products = cart.products;

       console.log("productscaaa", cart.products)
       const existProdInCart = cart.products.find((p) => p.id == productId);
       console.log("existProdInCart", existProdInCart)
   if(existProdInCart){
       let index = products.findIndex((p)=>p.id == productId)
       cart.products[ index ].quantity ++;
       cartsService.saveCart();
       res.json({status:"success", data: cart})
   }else{
      const newProd = {
         id: productId,
         quantity: 1
       }
       cart.products.push(newProd);
       await cartsService.saveCart()
       res.json({ status: 'success', data: cart });
      }
   }catch (error) {
      res.json({ status: 'errormalll', message: "error"});
   }
})  


export {router as cartsRouter};