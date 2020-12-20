import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    // collections => Object.keys(collections).map(key=>collections[key])                   // TypeError: Cannot convert undefined or null to object
    collections => collections ? Object.keys(collections).map(key=>collections[key]) : []
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectShopCollections], 
    // collections => collections[collectionUrlParam]           // Cannot read property 'hats' of null
    collections => collections ? collections[collectionUrlParam] : null
)

// BEFORE convert SHOP_DATA array into object:
// export const selectCollection = collectionUrlParam => createSelector(
//     [selectShopCollections], 
//     collections => collections.find(collection => collection.routeName === collectionUrlParam)
// )
