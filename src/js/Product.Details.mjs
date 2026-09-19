import { getLocalStorage, setLocalStorage } from "./utils.mjs";

import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { ProductDetails } from "./Product.Details.mjs";

const productId = getParam("product");
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
