import UserDAO from "./user.dao.js";

// Archive DAO
import ProductDaoArchive from "./product/ProductDaoArchive.js";
import CartDaoArchive from "./cart/CartDaoArchive.js";

// Memory DAO
import ProductDaoMemory from "./product/ProductDaoMemory.js";
import CartDaoMemory from "./cart/CartDaoMemory.js";

// Firebase DAO
import ProductDaoFirebase from "./product/ProductDaoFirebase.js";
import CartDaoFirebase from "./cart/CartDaoFirebase.js";

// Mongo DAO
import ProductDaoMongo from "./product/ProductDaoMongo.js";
import CartDaoMongo from "./cart/CartDaoMongo.js";

let ProductDAO = null;
let CartDAO = null;

const PERS = process.env.PERS || "mongo";

switch (PERS) {
  case "archive":
    ProductDAO = ProductDaoArchive.getInstance();
    CartDAO = CartDaoArchive.getInstance();
    break;

  case "memory":
    ProductDAO = ProductDaoMemory.getInstance();
    CartDAO = CartDaoMemory.getInstance();
    break;

  case "firebase":
    ProductDAO = ProductDaoFirebase.getInstance();
    CartDAO = CartDaoFirebase.getInstance();
    break;

  case "mongo":
    ProductDAO = ProductDaoMongo.getInstance();
    CartDAO = CartDaoMongo.getInstance();
    break;
}

export { ProductDAO, CartDAO, UserDAO };
