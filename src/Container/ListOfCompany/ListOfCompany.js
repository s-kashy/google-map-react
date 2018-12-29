import React, { Component } from "react"
import "./ListOfCompany.css"
import SingletonClass from "../../SingletonClass/SingletonClass"
import *as actionType from "../../Store/action/index"
import { connect } from "react-redux";
import Item from "../../Component/Component/Item"
class ListOfCompany extends Component {
    componentDidMount() {
        let city = SingletonClass.getPosition()
        let newArray = this.props.list.filter(t => {
            return t.City === city
        })
        this.props.selectedCompany(newArray[0])

        this.setState({ listOfCompany: newArray, chosenId: newArray[0].CompanyName, filterCity: city })

    }
    state = {
        listOfCompany: this.props.list,
        chosenId: null,
        filterCity: null,
        reRender: true
    }
    componentWillReceiveProps(nextProps) {
     
        if (this.state.filterCity !== nextProps.city) {
       
            this.setState({ reRender: false }, () => {
                this.setState({ listOfCompany: nextProps.list, reRender: true,
                    chosenId:nextProps.list[0].CompanyName,filterCity:nextProps.city }, () => { 
                     
                    })
            })
        //    this.props.selectedCompany(nextProps.list[0])
        }
    }
  

    onClickHandler = (item) => {
        this.props.selectedCompany(item)
        this.setState({ chosenId: item.CompanyName }, () => {
            
        })
    }

    render() {

        let list = this.state.listOfCompany.map((list, index) => {
            return (<Item item={list.CompanyName} key={index}
                click={() => this.onClickHandler(list)}
                id={list.CompanyName} chosenId={this.state.chosenId} />)
        })
        return (this.state.reRender ? <div className="company">
            {list}
        </div> : null)
    }
}
const mapStateToProps = (state) => {
    return {
        listOfCompany: state.map.sortCompanyList,
        citySelect: state.map.citySelect,
        compSelected:state.map.compSelected
    }
}
const mapStateDispatchToProps = dispatch => {
    return {
        selectedCompany: (companyName) => dispatch(actionType.selectedCompany(companyName))
    };
};

export default connect(
    mapStateToProps,
    mapStateDispatchToProps
)(ListOfCompany);