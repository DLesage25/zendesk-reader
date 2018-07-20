export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_ALL_DATA':
            return {
                ...state,
                userData: action.payload.userData,
                programData: action.payload.programData,
                globalDate: action.payload.globalDate,
                selectedProgram: action.payload.selectedProgram
            }
    }
    return state;
}