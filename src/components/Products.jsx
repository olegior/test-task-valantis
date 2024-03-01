import { Layout, List, Spin, Image, Flex, Typography } from "antd"
import { Loader } from './Loader'
import { useSelector } from 'react-redux'
import { Card } from "./Card";

const { Content } = Layout

export const Products = () => {

    const { data, filtered, page, isLoading } = useSelector(store => store.products)
    const showedData = (filtered || data.length > 50) ? data.slice((page - 1) * 50, page * 50) : data;

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
        <Typography.Title >Ничего не найдено</Typography.Title>
    </Flex>

    return (
        <Layout>
            <Content>
                <Spin fullscreen spinning={isLoading} indicator={<Loader />} />
                {!!showedData.length &&
                    <List
                        dataSource={showedData}
                        grid={grid}
                        renderItem={(item) => <List.Item><Card item={item} /></List.Item>}
                    />
                }

                {filtered && !isLoading && !data.length && noData}
            </Content>
        </Layout>
    )
}
