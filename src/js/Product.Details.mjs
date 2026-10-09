import { getLocalStorage, setLocalStorage } from "./utils.mjs";

import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { ProductDetails } from "./Product.Details.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
