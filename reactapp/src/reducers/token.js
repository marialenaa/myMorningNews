export default function(token = '', action){
    if(action.type === 'addToken'){
console.log(action)        
return action.tokenAdded
    }else{
        return token
    }
}