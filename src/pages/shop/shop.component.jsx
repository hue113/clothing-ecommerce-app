import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectShopCollections } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';

const ShopPage = ({ collections }) => {
        return (
            <div className="shop-page">
                {collections.map( ({id, ...props}) => {
                    return <CollectionPreview key={id} {...props} />
                })}
            </div>
        )
}

const mapStateToProps = createStructuredSelector ({
    collections: selectShopCollections
})

export default connect(mapStateToProps)(ShopPage)
