import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './collections-overview.styles.scss'
import CollectionPreview from '../../components/collection-preview/collection-preview.component.jsx';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors'

const CollectionsOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            {collections.map( ({id, ...props}) => {
                return <CollectionPreview key={id} {...props} />
            })}
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionForPreview         // BEFORE: selectShopCollections
})

export default connect(mapStateToProps)(CollectionsOverview)