import React, { Component } from "react"
import Item from "../../Component/Component/Item"
import "./ListOfCities.css"
import * as typeAction from "../../Store/action/index"
import { connect } from "react-redux";
class ListOfCities extends Component {

componentDidMount(){
    this.setState({chosenId:this.props.list[0].City})
}
    constructor(props) {
        super(props)
        this.state = {
            listOfCities: this.props.list,
            chosenId:null
        }
    }
    onClickHandler=(item)=>{
        this.setState({chosenId:item.City},()=>{
            this.props.sortByCity(item.City)
        })
    }

    render() {
        let list = this.props.list.map((list, index) => {
            return (<Item item={list.City} key={index} 
            click={()=>this.onClickHandler(list)}
            id={list.City} chosenId={this.state.chosenId} />)
        })

        return (<div className="city">
            {list}

        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        sortCityList: state.map.sortCityList
    }
}
const mapStateDispatchToProps = dispatch => {
    return {
      sortByCity: (city) =>
        dispatch(typeAction.sortAllCompanyNameByCity(city))
    };
  };
export default connect(
    mapStateToProps,
    mapStateDispatchToProps
  )(ListOfCities);

