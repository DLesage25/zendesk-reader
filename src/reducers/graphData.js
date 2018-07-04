export default (state = null, action) => {
    switch (action.type) {
        case 'GRAPH_DATA':
            return {
                ...state,
                ...action.payload
            }
    }
    return state;
}