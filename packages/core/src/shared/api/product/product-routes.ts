const rota = "http://172.17.10.134:4000/products";

const GetProductAll = `${rota}/get`;
const GetProductDescription = `${rota}/get/?search=`;

export default {
  GetProductAll,
  GetProductDescription,
};
