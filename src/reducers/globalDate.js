export default (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_GLOBAL_DATE':
        console.log('CHANGE_GLOBAL_DATE red', {action})
            return {
                ...state,
                globalDate: action.payload
            }
    }
    return state;
}