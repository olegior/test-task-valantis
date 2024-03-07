import { getGoods } from "../store/goodsSlice";

export const dispatchByPage = (dispatch, page) => {
    const offset = 50 * (+page - 1);
    const payload = { params: { offset, limit: +page == '1' ? 51 : 50 } };
    dispatch(getGoods(payload))
}