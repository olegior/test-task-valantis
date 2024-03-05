import { Card as AntCard, Flex, Typography } from 'antd'
import '../styles/ProductCard.css'
const { Paragraph } = Typography

export const Card = ({ item }) => {
    const { brand, id, price, product } = item;

    return (
        <AntCard className='product-card' hoverable>
            <Flex align='center' className='product-card__header'>
                <Paragraph className='product-card__title' strong >{product}</Paragraph>
            </Flex>
            <Flex className='product-card__body' justify='space-between'>
                <Paragraph style={{ wordWrap: 'break-word', paddingInlineEnd: 10 }}>{brand || 'Без бренда'}</Paragraph>
                <Paragraph strong className='product-card__price'>{price} ₽</Paragraph>
            </Flex>
            <Paragraph type='secondary' className='product-card__id'>{id}</Paragraph>
        </AntCard>
    )
}
