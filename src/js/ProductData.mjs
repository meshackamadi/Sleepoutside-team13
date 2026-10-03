function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category || 'tents';
    const baseUrl = import.meta.env.BASE_URL || '/';
    this.path = `${baseUrl}json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    let products = [];
    try {
      products = await this.getData();
    } catch (e) {
      products = [];
    }
    let product = products.find((item) => item.Id === id);
    if (!product) {
      const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
      const baseUrl = import.meta.env.BASE_URL || '/';
      for (const cat of categories) {
        if (cat === this.category) continue;
        try {
          const res = await fetch(`${baseUrl}json/${cat}.json`);
          if (res.ok) {
            const data = await res.json();
            product = data.find((item) => item.Id === id);
            if (product) break;
          }
        } catch (err) {
          // ignore missing optional category
        }
      }
    }
    return product;
  }
}
