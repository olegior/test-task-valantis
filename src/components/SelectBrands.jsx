import { Select, Flex } from "antd"
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { resetProductsSearch, searchProducts, setFilter } from '../store/productsSlice';
import { useSearchParams } from "react-router-dom";
import { dispatcher } from "../helpers/dispatcher";
import { dispatchByPage } from "../helpers/dispatchByPage";


export const SelectBrands = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch();
    const { brands, filters } = useSelector(state => state.products)
    const allBrands = brands.map(brand => ({ label: brand, value: brand }));

    const handleSelectChange = (value) => {
        if (value) {
            setSearchParams({ brand: value })
            dispatch(setFilter({ brand: value }))
            dispatcher(dispatch, searchProducts, { brand: value })
        }
    }

    const handleOnClear = () => {
        dispatch(setFilter({ brand: '' }))
        dispatch(resetProductsSearch())
        dispatchByPage(dispatch, 1)
        setSearchParams({})
    }

    return (

        <Flex vertical justify="center" gap={20} >
            <Flex gap={20} vertical={true}>
                <Select options={allBrands} showSearch onChange={handleSelectChange} allowClear
                    value={brands.includes(filters.brand) ? filters.brand : null}
                    onClear={handleOnClear} />
            </Flex>
        </Flex>
    )
}
