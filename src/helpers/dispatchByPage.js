import { getProducts } from "../store/productsSlice";
import { dispatcher } from "./dispatcher";

export const dispatchByPage = (dispatch, page) => {
    const offset = 50 * (+page - 1);
    const payload = { action: 'get_ids', params: { offset, limit: +page == '1' ? 51 : 50 } };
    dispatcher(dispatch, getProducts, payload)
}