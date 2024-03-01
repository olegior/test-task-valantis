import { Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FilterTag } from './FilterTag';
import { resetProductsSearch, setFilter } from '../store/productsSlice';
import { useSearchParams } from 'react-router-dom';
import { dispatchByPage } from '../helpers/dispatchByPage';


export const ActiveFilters = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    const { price, brand, product } = products.filters;
    const filters = [
        price,
        brand,
        product
    ]

    const resetField = () => {
        dispatch(setFilter({}))
        dispatch(resetProductsSearch())
        dispatchByPage(dispatch, products.page)
        setSearchParams({})
    }

    return (
        <Flex vertical style={{width: '100%', paddingInlineStart: 20}}>
            {filters.some(Boolean) &&
                <Flex align="center" gap={10}>
                    <span style={{ opacity: 0.5 }}>фильтр:</span>
                    {filters.map(filter => !!filter && <FilterTag key={filter} tag={filter} handleCloseTag={resetField} />)}
                </Flex>
            }
        </Flex>
    )
}
