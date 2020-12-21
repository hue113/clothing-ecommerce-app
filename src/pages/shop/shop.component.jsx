import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CollectionOverview from '../../components/collections-overview/collections-overview.component.jsx';
import CollectionPage from '../collection/collection.component.jsx';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import './shop.styles.scss'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'



const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    // state = {       
    //     loading: true               // write like this --> don't have to write constructor
    // }

    // unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync();
    }

    // componentDidMount() {
        // const  { updateCollections } = this.props
        // const collectionRef = firestore.collection('collections')
        // console.log('collectionRef', collectionRef)
        
        // 3. USING FETCH: (DON'T USE THIS)
        // (objects too nested to get value in this case --> better use convertCollectionsSnapshotToMap to navigate)
        // fetch('https://firestore.googleapis.com/v1/projects/clothing-db-28ed3/databases/(default)/documents/collections')
        //     .then(res => res.json())
        //     .then(collections => console.log(collections))

        // 2. USING PROMISE STYLE (GOOD):
        // collectionRef.get()
        //     .then(snapshot => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //         updateCollections(collectionsMap)
        //         this.setState({ loading: false })
        //     })

        // 1. USING ASYNC STYLE (ALSO GOOD):
        // this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
        //     // console.log('snapshot', snapshot)
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     // console.log(collectionsMap)
        //     updateCollections(collectionsMap)
        //     this.setState({ loading: false })
        // })
    // }

    // componentWillUnmount() { 
    //     this.unsubscribeFromSnapShot()
    // }

    render() {
        const { match, isCollectionFetching, isCollectionsLoaded } = this.props
        // const { loading } = this.state

        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>} 
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                />
                
                {/* BEFORE USING SPINNER: */}
                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}
                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage)
