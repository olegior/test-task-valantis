import { Layout, List, Spin, Image, Flex, Typography } from "antd"
import { Loader } from '../Loader'
import { useSelector } from 'react-redux'
import { Card } from "./Card";
import { Pagination } from "../Pagination";
import { useEffect } from "react";

const { Content } = Layout

export const Goods = () => {

    const { data, filtered, isLoading, page } = useSelector(store => store.goods);

    const grid = {
        column: 5,
        lg: 4,
        md: 3,
        sm: 2,
        xs: 1,
        gutter: 16
    }

    const noData = <Flex justify="center" align="center" gap={20} vertical style={{ filter: 'grayscale(80%) opacity(0.1)' }} >
        <Image preview={false} src="val.svg" />
        <Typography.Title style={{ textAlign: 'center' }} >Ничего не найдено</Typography.Title>
    </Flex>

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    return (
        <Layout>
            <Content>
                <Spin fullscreen spinning={isLoading} indicator={<Loader />} />
                {!!data?.length &&
                    <List
                        dataSource={data}
                        grid={grid}
                        renderItem={(item) => <List.Item>
                            <Card item={item} />
                        </List.Item>}
                    />
                }
                {filtered && !isLoading && !data?.length && noData}
                {!isLoading && <Pagination />}
            </Content>
        </Layout>
    )
}
