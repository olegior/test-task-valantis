import { Input, } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { resetGoodsSearch, searchGoods, setFilter, setPage } from '../../store/goodsSlice';
import { useSearchParams } from 'react-router-dom';
import { dispatchByPage } from '../../helpers/dispatchByPage';

export const SearchForm = ({ name }) => {

    const [_, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { filters } = useSelector(store => store.goods);

    const handleSearch = (data) => {
        if (!data) {
            dispatch(setFilter({}));
            dispatch(resetGoodsSearch());
            setSearchParams({});
            dispatchByPage(dispatch, 1);
        }
        if (data) {
            const value = name === 'price' ? + data.trim() : data.trim();
            const payload = { [name]: value };
            dispatch(setPage(1));
            dispatch(setFilter(payload));
            dispatch(searchGoods(payload));
            setSearchParams(payload);
        }
    }

    return (
        <Input.Search placeholder='введите название'
            allowClear
            size='large'
            onSearch={handleSearch}
            value={filters[name]}
            enterKeyHint='search'
        />
    )
}
