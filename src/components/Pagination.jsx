import { Pagination as AntPagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { setPage } from '../store/productsSlice';

export const Pagination = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const { filtered, data, totalLength, page } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const total = filtered ? data.length : totalLength;

    const handlePageChange = (current) => {
        const allParams = Object.fromEntries([...searchParams.entries()]);
        setSearchParams({ ...allParams, page: current })
        dispatch(setPage(+current))
    }

    return (
        <AntPagination
            current={page}
            total={total}
            pageSize={50}
            showSizeChanger={false}
            showPrevNextJumpers
            showTitle
            onChange={handlePageChange}
        />
    )
}
