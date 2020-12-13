import React from 'react'
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.styles.scss'
// import { withRouter } from  'react-router-dom' 

const CollectionPreview = ({ title, items }) => {
    return (
        <div className="collection-preview">
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="preview">
                {items
                    .filter((item,index) => index < 4)
                    .map(({id, ...props}) => (                        
                        <CollectionItem key={id} {...props} />
                ))}
            </div>
        </div>
    )
}

export default CollectionPreview;