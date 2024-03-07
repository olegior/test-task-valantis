import { Card as AntCard, Flex, Typography } from 'antd'
import '../../styles/Card.css'
const { Paragraph } = Typography

export const Card = ({ item }) => {
    const { brand, id, price, product } = item;

    return (
        <AntCard className='product-card' hoverable>
            <Flex align='center' className='product-card__header'>
                <Paragraph className='product-card__title' strong >{product}</Paragraph>
            </Flex>
            <Flex className='product-card__body' justify='space-between' align='center'>
                <Paragraph className='product-card__brand'>{brand || 'Без бренда'}</Paragraph>
                <Paragraph className='product-card__price'>{price} ₽</Paragraph>
            </Flex>
            <Paragraph type='secondary' className='product-card__id'>{id}</Paragraph>
        </AntCard>
    )
}
