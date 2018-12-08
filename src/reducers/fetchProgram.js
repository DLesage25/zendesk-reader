export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_PROGRAM':
            return {
                ...state,
                ...action.payload
            }
    }
    return state;
}