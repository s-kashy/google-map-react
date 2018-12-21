import React, { Component } from "react"
import "./ListOfCountry.css"
import { connect } from "react-redux";
import * as typeAction from "../../Store/action/index"
import Item from "../../Component/Component/Item"
class ListOfCountry extends Component {

    state = {
        listOfCountry: this.props.list,
        chosenId: null
    }
    componentDidMount() {
        this.setState({ chosenId: this.props.list[0].Country })
    }
    onClickHandler=(item)=>{
        this.setState({chosenId:item.Country})
        this.props.sortByCountry(item.Country)
    }
    render() {
        let list = this.state.listOfCountry.map((list, index) => {
            return (<Item item={list.Country} key={index} id={list.Country} 
            chosenId={this.state.chosenId} click={()=>this.onClickHandler(list)} />)
        })
        return (<div className="country">
            {list}
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        listOfCompany: state.map.sortCountryList
    }
}
const mapStateDispatchToProps = dispatch => {
    return {
      sortByCountry: (country) =>
        dispatch(typeAction.sortAllCityByCountry(country))
    };
  };
export default connect(
    mapStateToProps,
    mapStateDispatchToProps
  )(ListOfCountry);