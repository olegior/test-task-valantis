import { Card as AntCard, Flex, Typography } from 'antd'
import '../styles/ProductCard.css'
const { Text, Paragraph } = Typography

export const Card = ({ item }) => {
    const { brand, id, price, product } = item;

    return (
        <AntCard className='product-card' hoverable>
            <Flex align='center' className='product-card__header'>
                <Paragraph className='product-card__title' strong >{product}</Paragraph>
            </Flex>
            <Flex className='product-card__body' justify='space-between'>
                <Text>{brand || 'Без бренда'}</Text>
                <Text strong className='product-card__price'>{price} ₽</Text>
            </Flex>
            <Paragraph type='secondary' className='product-card__id'>{id}</Paragraph>
        </AntCard>
    )
}
