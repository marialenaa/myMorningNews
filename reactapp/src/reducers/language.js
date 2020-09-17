export default function(language='fr', action){
        if(action.type === 'changeLgg'){

            return action.language
        }else{
            return language
        }
}