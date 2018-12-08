export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_ALL_DATA':
            return {
                ...state,
                globalDate: action.payload.globalDate,
                globalProgram: action.payload.globalProgram,
                userData: action.payload.userData,
                productivityData: action.payload.productivityData,
                appSettings: action.payload.appSettings
            }
    }
    return state;
}