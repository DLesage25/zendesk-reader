export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_ALL_DATA':
            return {
                ...state,
                programData: action.payload.programData,
                userData: action.payload.userData,
                productivityData: action.payload.productivityData,
                appSettings: action.payload.appSettings
            }
    }
    return state;
}