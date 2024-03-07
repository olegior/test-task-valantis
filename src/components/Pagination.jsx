import { Pagination as AntPagination, Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { setPage } from '../store/goodsSlice';

export const Pagination = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { totalLength, page } = useSelector(state => state.goods);

    const handlePageChange = (current) => {
        const allParams = Object.fromEntries([...searchParams.entries()]);
        setSearchParams({ ...allParams, page: current })
        dispatch(setPage(+current))
    }

    return (
        <Flex justify='center' align='center' style={{ paddingTop: 20 }}>
            <AntPagination
                locale={{
                    jump_to: 'К',
                    page: 'странице'
                }}
                showQuickJumper
                current={page}
                total={totalLength}
                pageSize={50}
                showSizeChanger={false}
                showPrevNextJumpers
                responsive
                style={{ fontSize: '1.2rem' }}
                hideOnSinglePage
                onChange={handlePageChange}
            />
        </Flex>
    )
}
