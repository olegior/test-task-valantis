import { Button, Tag } from 'antd'

export const FilterTag = ({ tag, handleCloseTag }) => {
    return (
        <Button data-value={tag}
            style={{
                width: 'fit-content',
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent'
            }}
            onClick={handleCloseTag} type='text' size='large'>
            <Tag color="lime">{tag}</Tag>
        </Button>
    )
}