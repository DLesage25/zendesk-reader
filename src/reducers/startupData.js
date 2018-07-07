export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_ALL_DATA':
            /**
             * TODO: Work case:
             * What happens if email by provided google authenticator,
             * which has been determined to below to the same domain name
             * is not included in the firebase database?
             */
            return {
                ...state,
                userData: action.payload.userData,
                programData: action.payload.programData,
                globalDate: action.payload.globalDate
            }
    }
    return state;
}