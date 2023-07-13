import { __dirname } from "../utils.js";
import path from "path";
//import { CartManager } from "../dao/CartManager.js"   
import fs from "fs";    
  
export class CartsManager {
    constructor(fileName){
        this.path=path.join( __dirname,`/files/${fileName}`);
        this.carts = [];
    }


fileExist(){
  return  fs.existsSync(this.path) //chequeo si existe un archivo, devuelve true o false
         };

         async saveCart() {
          try {
              await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
          } catch (error) {
              console.error('Error saving products:', error);
          }
      }     

         
        
    async getAll(){
          try {
               if(this.fileExist()){
               //   console.log("existe archivo")
                      const contenido = await fs.promises.readFile(this.path, "utf-8");
                      const cartJson = JSON.parse(contenido);
                     // console.log("getproduct",prodJson)
                      return cartJson;                    
              } else{
                  return console.log("no hay achivos")
                  }
          }catch (error) {
              console.error(error.message);
              return undefined;
          };
      };           

// async upDateCart(){
//   try {
//       if(this.fileExist()){
//           this.carts = await this.getCarts()
//           return console.log("Datos cargados");
//        }else{
//         return console.log( "No seencontraron datos");
//          };
//   } 
//   catch (error) {
//       console.error(error.message)
//      };
//   };


async addCart(){
  try {
       if(this.fileExist()){
          const info = await fs.promises.readFile(this.path, "utf-8")
          const carts =  JSON.parse(info);
          console.log("productJSON", carts)
          let newId;
        if(carts.length===0){
              newId=1;
              console.log("primer carrito !!!!!!!!!!");

      }else{
            newId=carts[carts.length -1].id+1;
            carts.id= newId;
            };
      
         const newCart ={
            id:newId,
            products:[]
         }
          carts.push(newCart);
      
         await fs.promises.writeFile(this.path, JSON.stringify(carts, null,'\t'));//lo primero es lo que quiero convertir a json
         return newCart;
     }

  } 
  catch (error) {
      console.error(error.message);
  };
};


  async getById(id){
    try {
       
        if(this.fileExist){
          
            const carts = await this.getAll()
            const cartId = carts.find(p => p.id === id)
            console.log("cartsbyid",cartId)
            return cartId;     
        }else{
             console.error("Result Cart seach byId : Dont Found");
           };
        }
    catch (error) {
        console.error(error.message);
        return undefined;
    }
};


async deleteCars(id){
  try {
    const carts = await this.getAll();
    let existenProducts = carts.some(cart)  
  } catch (error) {
    
  }
}}
