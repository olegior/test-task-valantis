import { Flex, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FilterTag } from './FilterTag';
import { resetGoodsSearch, setFilter } from '../../store/goodsSlice';
import { useSearchParams } from 'react-router-dom';
import { dispatchByPage } from '../../helpers/dispatchByPage';

export const ActiveFilters = () => {

    const [_, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { price, brand, product } = useSelector(state => state.goods.filters);
    const filters = [
        price,
        brand,
        product
    ]

    const resetField = () => {
        dispatch(setFilter({}))
        dispatch(resetGoodsSearch())
        dispatchByPage(dispatch, 1)
        setSearchParams({})
    }

    return (
        <Flex vertical style={{ width: '100%' }}>
            {filters.some(Boolean) &&
                <Flex align="center" gap={20} >
                    <Typography.Text
                        style={{ opacity: 0.5 }}>фильтр:</Typography.Text>
                    {filters.map(filter => !!filter &&
                        <FilterTag key={filter} tag={filter}
                            handleCloseTag={resetField} />)}
                </Flex>
            }
        </Flex>
    )
}
