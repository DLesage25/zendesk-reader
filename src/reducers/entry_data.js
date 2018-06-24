export default (state = null, action) => {
    switch(action.type){
        case 'SET_ENTRY' : 
            /**
             * TODO: Work case:
             * What happens if email by provided google authenticator,
             * which has been determined to below to the same domain name
             * is not included in the firebase database?
             */
            return action.payload;
    }
    return state;
}