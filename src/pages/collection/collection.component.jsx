import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { firestore } from '../../firebase/firebase.utils'
import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection, selectShopCollections } from '../../redux/shop/shop.selectors'

const CollectionPage = ({ collection }) => {

    // useEffect(() => {
    //     console.log('I am subscribing')
    //     const unsubscribeFromCollections = firestore
    //         .collection('collections')
    //         .onSnapshot( snapshot => console.log(snapshot))

    //     return () => {              // clean up when unmount
    //         console.log('I am UNsubscribing')
    //         unsubscribeFromCollections()
    //     }
    // }, [])

    
    const { title, items } = collection
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map(item => <CollectionItem key={item.id} item={item}/>)}
            </div>
        </div>
    )
}

// const mapStateToProps = (state, ownProps) => {
//     // console.log('state',state)
//     // console.log('own',ownProps)
//     // console.log(ownProps.match.params.collectionId)
//     console.log(selectCollection(ownProps.match.params.collectionId))
//     console.log(selectCollection(ownProps.match.params.collectionId)(state))
//     return {
//         collection: selectCollection(ownProps.match.params.collectionId)(state)
//     }
// }

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});


export default connect(mapStateToProps)(CollectionPage)