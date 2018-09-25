export default (state = null, action) => {
    switch (action.type) {
        case 'DRILLDOWN_MODAL_DATA':
            return {
                ...state,
                payload: action.payload
            }
    }
    return state;
}