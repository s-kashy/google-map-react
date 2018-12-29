
import * as actionType from "../action/actionType"
import { updateObject } from "../utility";
const initialState = {
    allJsonFile: null,
    sortCountryList: null,
    sortCityList: null,
    sortCompanyList: null,
    loadingData: false,
    companySelected: null,
    citySelect: null,
    cityRequestList: null

}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.GET_JSON_FILE:
            return updateObject(state, { allJsonFile: action.payload })
        case actionType.LOADING:
            return updateObject(state, { loadingData: true })

        case actionType.SORT_COUNTRY:
            return updateObject(state, { sortCountryList: action.payload })

        case actionType.SORT_CITY:
            return updateObject(state, { sortCityList: action.payload })

        case actionType.SORT_COMPANY:
            return updateObject(state, { sortCompanyList: action.payload })

        case actionType.CLOSE_LOADING:
            return updateObject(state, { loadingData: false })
        case actionType.COMPANY_SELECTED:
            return updateObject(state, { companySelected: action.payload })
        case actionType.CITY_SELECTED:

            return updateObject(state, { citySelect: action.payload })

        case actionType.LOAD_REQUEST_CITY_LIST:
            return updateObject(state, { cityRequestList: action.payload })
        default:
            return state;

    }

}
export default reducer