import *as type from "./actionType"
import data from "../../JsonData/clients.json"

import sortObjectArray from "sort-objects-array"
import _ from "lodash"

export const loadJson = () => {
    return {
        type: type.GET_JSON_FILE,
        payload: data.Customers
    }
}
export const closeLoading = () => {
    return {
        type: type.CLOSE_LOADING
    }
}
export const loading = () => {
    return {
        type: type.LOADING
    }
}

export const sortByCity = () => {
    return (dispatch, getState) => {
        let listOfCountrySorted = getState().map
        listOfCountrySorted = listOfCountrySorted.sortCountryList
        let listOfUniqCity = getState().map
        listOfUniqCity = listOfUniqCity.allJsonFile
        let defulatArray = getState().map
        defulatArray = defulatArray.allJsonFile
        listOfUniqCity = _.uniqBy(listOfUniqCity, "City")
        let cityArray = []
        let counter = 0
        for (let i = 0; i < listOfCountrySorted.length; i++) {
            counter = 0
            for (let j = 0; j < listOfUniqCity.length; j++) {
                if (listOfCountrySorted[i].Country === listOfUniqCity[j].Country) {
                    counter = checkAmountOfCompanyInCity(defulatArray, listOfUniqCity[j].City)
                    cityArray.push({
                        City: listOfUniqCity[j].City, amount: counter,
                        Address: listOfUniqCity[j].Address, Country: listOfUniqCity[j].Country
                    })
                }
            }
        }
     
        sortArrayAmount(cityArray)
       dispatch(loadCitSortList(cityArray))
   

    }

}

export const citySelected = (city) => {

    return {
        type: type.CITY_SELECTED,
        payload: city
    }
}
export const dispatchChossenCity=(city)=>{
return dispatch=>{
    dispatch(citySelected(city))
}


}
export const checkAmountOfCompanyInCity = (array, cityName) => {
    let counter = 0
    for (let i = 0; i < array.length; i++) {
        if (cityName === array[i].City) {
            counter++
        }
    }
    return counter

}
export const loadCitSortList = (arr) => {
    return {
        type: type.SORT_CITY,
        payload: arr
    }
}
export const loadCompanyName = (arr) => {
    return {
        type: type.SORT_COMPANY,
        payload: arr
    }
}
export const sortByCompany = () => {
    return (dispatch, getState) => {
        let data = getState().map
       let  citySelected=data.sortCityList

       
        data = data.allJsonFile
        sortObjectArray(data, "CompanyName")
        dispatch(loadCompanyName(data))
      

    }
}
export const sortByCountry = () => {
    return (dispatch, getState) => {
        let data = getState().map;
        data = data.allJsonFile
        let uniqByCity = _.uniqBy(data, "City")
        let uniqByCountry = _.uniqBy(data, "Country")
        let arr = []
        let counter = 0
        for (let i = 0; i < uniqByCountry.length; i++) {
            counter = 0
            for (let j = 0; j < uniqByCity.length; j++) {
                if (uniqByCity[j].Country === uniqByCountry[i].Country) {
                    counter++
                }
            }
            arr.push({ Country: uniqByCountry[i].Country, amount: counter })
        }
        arr = sortArrayAmount(arr)
        dispatch(loadCountryLIst(arr))
    }
}
export const loadCountryLIst = (arr) => {
    return {
        type: type.SORT_COUNTRY,
        payload: arr
    }
}
export const sortArrayAmount = (arr) => {
    return arr.sort(function (a, b) { return b.amount - a.amount })
}
export const getAllJsonFileAndSort = () => {
    return dispatch => {
        dispatch(loading())
        dispatch(loadJson())
        dispatch(sortByCountry())
        dispatch(sortByCity())
        dispatch(sortByCompany())
        dispatch(closeLoading())


    }
}

export const sortAllCompanyNameByCity = (city) => {
 
    return dispatch => {
        let jsonOriginalList = dispatch(loadTypeOfList())
        let newSortedList = jsonOriginalList.filter(list => {
            return list.City === city
        })
       
        sortObjectArray(newSortedList, "CompanyName")
        dispatch(citySelected(city))
        dispatch(loadCompanyName(newSortedList))


    }
}
export const selectedCompany = (company) => {
    return {
        type: type.COMPANY_SELECTED,
        payload: company
    }

}
export const sortAllCityByCountry = (country) => {
    return dispatch => {
        let jsonOriginalList = dispatch(loadTypeOfList())
        jsonOriginalList = _.uniqBy(jsonOriginalList, "City")
        let newSortedList = jsonOriginalList.filter(list => {
            return list.Country === country
        })
        newSortedList = sortArrayAmount(newSortedList)
        dispatch(loadCitSortList(newSortedList))

    }


}
export const loadTypeOfList = () => {
    return (dispatch, getState) => {
        let data = getState().map
        return data.allJsonFile

    }
}