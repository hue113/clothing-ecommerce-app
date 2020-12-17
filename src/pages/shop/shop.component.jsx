import React from 'react'
// import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'

// import { selectShopCollections } from '../../redux/shop/shop.selectors'
// import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';
import CollectionOverview from '../../components/collections-overview/collections-overview.component.jsx';

const ShopPage = () => {
        return (
            <div className="shop-page">
                <CollectionOverview />
            </div>
        )
}

// const mapStateToProps = createStructuredSelector ({
//     collections: selectShopCollections
// })

export default ShopPage
