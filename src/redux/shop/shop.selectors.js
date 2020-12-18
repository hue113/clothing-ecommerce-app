import { createSelector } from 'reselect'

// const COLLECTION_ID_MAP = {         // map string to number (because url :collectionId is number, but we want string)
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     women: 4,
//     mensss: 5
// }

const selectShop = state => state.shop

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectShopCollections], 
    collections => collections[collectionUrlParam]
)

// BEFORE convert SHOP_DATA array into object:
// export const selectCollection = collectionUrlParam => createSelector(
//     [selectShopCollections], 
//     collections => collections.find(collection => collection.routeName === collectionUrlParam)
// )
