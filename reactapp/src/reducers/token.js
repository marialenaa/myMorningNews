export default function(token = '', action){
    if(action.type === 'addToken'){
return action.token
    }else if(action.type === 'resetTokenType'){
        let tokenCopy = undefined
        return tokenCopy
    }else{
        return token
    }
}