export default (state = null, action) => {
    switch (action.type) {
        case 'SET_ENTRY':
            return action.payload;
    }
    return state;
}