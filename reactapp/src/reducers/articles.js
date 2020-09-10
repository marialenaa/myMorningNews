export default function(articleList = [], action){
    if(action.type === 'addArticle'){
        let articlesCopy = [...articleList]
        let alreadyExist = false

        for(var i = 0; i< articlesCopy.length; i++){
            if(action.articleLiked.title === articlesCopy[i].title){
                alreadyExist = true
            }
        }

        if(!alreadyExist){
            articlesCopy.push(action.articleLiked)            
        }
        return articlesCopy

    } else if(action.type === 'deleteArticle'){
        let articlesCopy = [...articleList]
        const deleted = articlesCopy.filter(e => e.title != action.articleCanceled.title)
        return deleted

        } else {
        return articleList
        }}

    