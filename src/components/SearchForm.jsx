import { Input, } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { resetProductsSearch, searchProducts, setFilter } from '../store/productsSlice';
import { dispatcher } from '../helpers/dispatcher';
import { useSearchParams } from 'react-router-dom';
import { dispatchByPage } from '../helpers/dispatchByPage';

export const SearchForm = ({ name }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const filters = useSelector(store => store.products.filters);

    const handleSearch = (data) => {
        if (!data) {
            dispatch(setFilter({}))
            dispatch(resetProductsSearch())
            dispatchByPage(dispatch, 1)
            setSearchParams({})
        }
        if (data) {
            const value = name === 'price' ? +data.trim() : data.trim();
            dispatch(setFilter(data))
            dispatcher(dispatch, searchProducts, { [name]: value });
            setSearchParams({ [name]: value })
        }
    }
    return (
        <Input.Search placeholder='введите название' 
        allowClear 
        size='large' onSearch={handleSearch} 
        defaultValue={filters[name]} />
    )
}
