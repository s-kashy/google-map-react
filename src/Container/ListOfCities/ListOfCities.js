import React, { Component } from "react"
import Item from "../../Component/Component/Item"
import "./ListOfCities.css"
import * as typeAction from "../../Store/action/index"
import { connect } from "react-redux";
class ListOfCities extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.state.listOfCities[0].Id !== nextProps.list[0].Id) {

            this.setState({ listOfCities: nextProps.list }, () => { })
        }
    }
    componentDidMount() {
        let country = this.props.sortCountry[0].Country
        let arr = this.props.list.filter(t => {
            return t.Country === country
        })
        this.setState({ chosenId: arr[0].City, listOfCities: arr }, () => {
            console.log("state",arr[0])
            this.props.citySelected(arr[0].City)

        })
    }
    constructor(props) {
        super(props)
        this.state = {
            listOfCities: this.props.list,
            chosenId: null
        }
    }
    onClickHandler = (item) => {
        this.setState({ chosenId: item.City }, () => {
            this.props.sortByCity(item.City)
        })
    }

    render() {
        let list = this.state.listOfCities.map((list, index) => {
            return (<Item item={list.City} key={index}
                click={() => this.onClickHandler(list)}
                id={list.City} chosenId={this.state.chosenId} />)
        })

        return (<div className="city">
            {list}

        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        sortCityList: state.map.sortCityList,
        sortCountry: state.map.sortCountryList
    }
}
const mapStateDispatchToProps = dispatch => {
    return {
        sortByCity: (city) =>
            dispatch(typeAction.sortAllCompanyNameByCity(city)),
        citySelected: (city) => dispatch(typeAction.cityDispatch(city))
    };
};
export default connect(
    mapStateToProps,
    mapStateDispatchToProps
)(ListOfCities);

