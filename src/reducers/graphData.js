export default (state = null, action) => {
    switch (action.type) {
        case 'GRAPH_DATA':

            console.log('reducer 3 running')
            /**
             * TODO: Work case:
             * What happens if email by provided google authenticator,
             * which has been determined to below to the same domain name
             * is not included in the firebase database?
             */
            return {
                ...state,
                graphData: action.payload
            }
    }
    return state;
}