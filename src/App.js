import React, { Component } from 'react';

import Spinner from "./UI/Spinner/Spinner"
import ListOfCities from "./Container/ListOfCities/ListOfCities"
import ListOfCompany from "./Container/ListOfCompany/ListOfCompany"
import ListOfCountry from "./Container/ListOfCountry/ListOfCountry"
import Header from "./Component/Header/Header"
import MapContainer from "./Container/MapContianer/MapContainer"
import * as actionType from "./Store/action/index"

import './App.css';

import { connect } from "react-redux";

const titles = ["Countries", "Cities", "Company", "Map"]
class App extends Component {

  state = {
    sortCityList:this.props.sortCityList
  }

  componentDidMount() {

    this.props.getAllJsonFileAndSort()
  }
  // onClickDefault=()=>{
  //   this.props.getAllJsonFileAndSort()
  // }
  render() {
    let headerTitle = titles.map((t, index) => {
      return <Header key={index} title={t} />
    })


    return (
      <div className="App">
        {!this.props.sortCompanyList ? <Spinner /> : <div>
      <div className="header-app">{headerTitle}</div>
      <hr />
      <div className="childApp">
        <div className="left">
          <ListOfCountry list={this.props.sortCountryList}  />
          <ListOfCities list ={this.props.sortCityList}/>
          <ListOfCompany list ={this.props.sortCompanyList} />

        </div>
        <div className="right">
          <MapContainer  selected={this.props.selectedCompany}/>
        </div>
      
      </div>
    </div>}
    {/* <button onClick={this.onClickDefault}>Click me </button> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sortCityList: state.map.sortCityList,
    sortCountryList: state.map.sortCountryList,
    sortCompanyList: state.map.sortCompanyList,
    loadingData: state.map.loadingData,
    selectedCompany:state.map.companySelected


  };
};
const mapStateDispatchToProps = dispatch => {
  return {
    getAllJsonFileAndSort: () => dispatch(actionType.getAllJsonFileAndSort()),
  };
};

export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(App);
