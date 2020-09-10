export default function(language='fr', action){
        if(action.type === 'changeLgg'){
            console.log(action)
            return action.language
        }else{
            return language
        }
}