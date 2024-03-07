import { Drawer, Descriptions, Flex, Button } from 'antd'
import { SelectBrands } from './SelectBrands'
import { SearchForm } from './SearchForm'
import { ActiveFilters } from './ActiveFilters'
import { useDispatch, useSelector } from 'react-redux'
import { changeShowFilter } from '../../store/goodsSlice'
import '../../styles/Filters.css'


export const Filters = () => {

    const dispatch = useDispatch();
    const { showFilter } = useSelector(state => state.goods)
    const handleShowFilter = () => {
        dispatch(changeShowFilter())
    }

    const items = [
        {
            key: '1',
            label: 'Поиск',
            children: <SearchForm name="product" />
        },
        {
            key: '2',
            label: 'Цена',
            children: <SearchForm name='price' />
        },
        {
            key: '3',
            label: 'Брэнды',
            children: <SelectBrands />,
        },
    ]

    return (
        <>
            <Flex className='filters__panel'>
                <Button size='large' onClick={handleShowFilter}>Фильтры</Button>
                <ActiveFilters />
            </Flex>
            {showFilter && <Drawer open={true} onClose={handleShowFilter} placement='left'>
                <Descriptions bordered layout='vertical' items={items} column={1} />
            </Drawer>}
        </>
    )
}
