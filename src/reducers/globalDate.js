export default (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_GLOBAL_DATE':
            return {
                ...state,
                globalDate: action.payload
            }
    }
    return state;
}