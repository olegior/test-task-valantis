import { Select, Flex } from "antd"
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { resetGoodsSearch, searchGoods, setFilter, setPage } from '../../store/goodsSlice';
import { useSearchParams } from "react-router-dom";
import { dispatchByPage } from "../../helpers/dispatchByPage";


export const SelectBrands = () => {

    const [_, setSearchParams] = useSearchParams()
    const dispatch = useDispatch();
    const { brands, filters } = useSelector(state => state.goods)
    const allBrands = brands?.map(brand => ({ label: brand, value: brand }));

    const handleSelectChange = (value) => {
        if (value) {
            const payload = { brand: value };
            setSearchParams(payload)
            dispatch(setPage(1))
            dispatch(setFilter(payload))
            dispatch(searchGoods(payload))
        }
    }

    const handleOnClear = () => {
        dispatch(setFilter({}))
        dispatch(resetGoodsSearch())
        setSearchParams({})
        dispatchByPage(dispatch, 1)
    }

    return (

        <Flex vertical justify="center" gap={20} >
            <Flex gap={20} vertical={true}>
                <Select
                    options={allBrands}
                    value={filters.brand}
                    size="large"
                    showSearch onChange={handleSelectChange} allowClear
                    onClear={handleOnClear} />
            </Flex>
        </Flex>
    )
}
