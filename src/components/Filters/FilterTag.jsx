import { Button, Tag } from 'antd'
import { CloseOutlined } from '@ant-design/icons';


export const FilterTag = ({ tag, handleCloseTag }) => {
    return (
        <Button data-value={tag}
            size='large'
            style={{
                padding: 0,
                backgroundColor: 'transparent'
            }}
            onClick={handleCloseTag} type='text'>
            <Tag color="gold" style={{ fontSize: '0.8rem' }}><CloseOutlined /> {tag}</Tag>
        </Button>
    )
}