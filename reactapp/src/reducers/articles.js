export default function(articleList = [], action){

    if(action.type === 'addWishlistFromDB'){
        console.log('IN REDUX WISHLIST')
        let articlesCopy = action.wishlist

        // console.log(action.wishlist)
        // for(var i = 0; i< action.wishlist.length; i++){
        //     articlesCopy.push(action.wishlist[i])
        // }
        // console.log(articlesCopy)
        return articlesCopy
       } 

    else if(action.type === 'addArticle'){
        let articlesCopy =  [...articleList, action.articleLiked]
        // articlesCopy.push(action.articleLiked)
        console.log(articlesCopy)
        return articlesCopy       
    }

    else if(action.type === 'deleteArticle'){
        console.log(action)
        // let articlesCopy = [...articleList]
        let articlesCopy = articleList.filter(e => e.title != action.articleCanceled)
        console.log(articlesCopy)
        return articlesCopy
        } 
    else {
        return articleList
        }
    }


    