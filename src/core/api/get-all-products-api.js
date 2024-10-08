import * as http from "../axios.config";

export const GetAllProductsApi = async (str) => {
  try {
    const res = await http.default.get(str);

    return res;
  } catch (e) {
    console.log(e);
  }
};
