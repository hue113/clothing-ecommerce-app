import React,  { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'

// import CollectionOverview from '../../components/collections-overview/collections-overview.component.jsx';
// import CollectionPage from '../collection/collection.component.jsx';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import './shop.styles.scss'
// import { updateCollections } from '../../redux/shop/shop.actions'
// import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import Spinner from '../../components/spinner/spinner.component'
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container.jsx'))
const CollectionPageContainer = lazy(() => import('../collection/collection.container.jsx'))



// const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview)
// const CollectionPageWithSpinner = WithSpinner(CollectionPage)

const ShopPage = ({ fetchCollectionsStart, match }) => {
    // state = {       
    //     loading: true               // write like this --> don't have to write constructor
    // }

    // unsubscribeFromSnapShot = null;

    useEffect( () => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])
    // componentDidMount() {
    //     // const { fetchCollectionsStart } = this.props
    //     fetchCollectionsStart();
    // }

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

    // render() {
        // const { match } = this.props
        // const { match, isCollectionFetching, isCollectionsLoaded } = this.props
        // const { loading } = this.state

        return (
            <div className="shop-page">
                <Suspense fallback={<Spinner />}>
                    <Route 
                        exact 
                        path={`${match.path}`} 
                        // render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>} 
                        component={CollectionsOverviewContainer}
                    />
                    <Route 
                        path={`${match.path}/:collectionId`} 
                        // render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                        component={CollectionPageContainer}
                    />
                </Suspense>
                
                {/* BEFORE USING SPINNER: */}
                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}
                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
            </div>
        )
    // }

}

// const mapStateToProps = createStructuredSelector({
    // isCollectionFetching: selectIsCollectionFetching,
    // isCollectionsLoaded: selectIsCollectionsLoaded
// })

const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(
    null,
    mapDispatchToProps
)(ShopPage)
