export default (state = null, action) => {
	console.log('fetchprogram reducer running', {action})
    switch (action.type) {
        case 'FETCH_PROGRAM':
            return {
                ...state,
                ...action.payload
            }
    }
    return state;
}