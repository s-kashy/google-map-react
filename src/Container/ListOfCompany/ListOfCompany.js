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

            this.updateList(nextProps.city)
        }
    }
    updateList = (city) => {

        this.setState({ reRender: false }, () => {
            this.setState({ listOfCompany: this.props.list, reRender: true,
                chosenId:this.props.list[0].CompanyName }, () => { 
                    this.props.selectedCompany(this.props.list[0])
                })
        })


    }

    onClickHandler = (item) => {
        this.setState({ chosenId: item.CompanyName }, () => {
            this.props.selectedCompany(item)
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
        citySelect: state.map.citySelect
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