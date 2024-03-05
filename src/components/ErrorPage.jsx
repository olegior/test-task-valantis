import { Flex, Typography, Image } from 'antd'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <Flex vertical align='center' justify='center' gap={30} style={{ height: '100dvh' }}>
            <Image preview={false} src={'val.svg'} />
            <Typography.Title level={3}>Произошла ошибка</Typography.Title>
            <Link to={'/'}>На главную</Link>
        </Flex>
    )
}
