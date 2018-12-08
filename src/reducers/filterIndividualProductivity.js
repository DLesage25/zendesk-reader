export default (state = null, action) => {
    switch (action.type) {
        case 'FILTER_INDIVIDUAL_PRODUCTIVITY':
            return {
                ...state,
                data: action.payload
            }
    }
    return state;
}