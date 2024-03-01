import { Layout, Button, Flex, } from 'antd';
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShowFilter, getInitial, searchProducts, setFilter, setPage } from './store/productsSlice';
import { Products } from './components/Products';
import { FiltersPanel } from './components/FiltersPanel';
import { Pagination } from './components/Pagination';
import { ActiveFilters } from './components/ActiveFilters';
import { dispatcher } from './helpers/dispatcher';
import { dispatchByPage } from './helpers/dispatchByPage';

function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  const { page, filtered, showFilter, filters } = useSelector(state => state.products)
  const dispatch = useDispatch();

  const handleShowFilter = () => {
    dispatch(changeShowFilter())
  }


  useEffect(() => {
    const filters = [...searchParams.keys()].filter(filter => filter !== 'page');
    if (filters?.length) {
      const key = filters[0];
      const value = searchParams.get(key);
      dispatch(setFilter({ [key]: key == 'price' ? +value : value }));
      dispatcher(dispatch, searchProducts, { [key]: value })
    }

    if (searchParams.has('page')) {
      console.log('sadasdas');
      dispatch(setPage(+searchParams.get('page')))
    }

    dispatcher(dispatch, getInitial, null)
  }, [])

  useEffect(() => {
    if (!Object.keys(filters).length)
      if (!filtered) {
        dispatchByPage(dispatch, page)
      }
  }, [page])


  return (
    <Layout className='container'>
      <FiltersPanel showFilter={showFilter} handleShowFilter={handleShowFilter} />

      <Flex justify='space-between' align='center'
        style={{ paddingBlock: 20 }}    >
        <Button onClick={handleShowFilter}>Фильтры</Button>
        <ActiveFilters />
      </Flex>
      <Products />
      <Flex justify='center'>
        <Pagination />
      </Flex>
    </Layout>
  )
}

export default App
