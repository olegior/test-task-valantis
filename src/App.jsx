import { Layout, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Goods } from './components/Goods/Goods';
import { Filters } from './components/Filters/Filters';
import { getInitial, resetGoodsSearch, searchGoods, setFilter, setPage } from './store/goodsSlice';
import { dispatchByPage } from './helpers/dispatchByPage';

function App() {

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const page = searchParams.has('page') ? +searchParams.get('page') : 1
  const filter = [...searchParams.keys()].find(filter => filter !== 'page');
  const value = filter == 'price' ? +searchParams.get(filter) : searchParams.get(filter);
  const payload = { [filter]: value };

  useEffect(() => {
    dispatch(setPage(page));
    dispatch(getInitial())
  }, [])

  useEffect(() => {
    if (filter) {
      dispatch(setFilter(payload));
      dispatch(searchGoods(payload))
    }
    else {
      dispatch(resetGoodsSearch());
      dispatchByPage(dispatch, page)
    }
  }, [searchParams])

  return (
    <Layout className='container'>
      <Typography.Title className='title-text'> Каталог ювелирных украшений</Typography.Title>
      <Filters />
      <Goods />
    </Layout>
  )
}

export default App
