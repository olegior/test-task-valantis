import { Drawer, Descriptions } from 'antd'
import { SelectBrands } from './SelectBrands'
import { SearchForm } from './SearchForm'


export const FiltersPanel = ({ handleShowFilter, showFilter }) => {

    const items = [{
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
    },]

    return (
        <Drawer open={showFilter} onClose={handleShowFilter} placement='left'>
            <Descriptions bordered layout='vertical' items={items} column={1} />
        </Drawer>
    )
}
