export default function(wishList = [], action){
    if(action.type === 'addArticle'){
        var wishListCopy = [...wishList]
        return wishListCopy
    } else {
        return wishList
    }
}