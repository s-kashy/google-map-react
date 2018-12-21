import React, { Component } from "react"
import "./ListOfCompany.css"
import *as actionType from "../../Store/action/index"
import { connect } from "react-redux";
import Item from "../../Component/Component/Item"
class ListOfCompany extends Component {

    state = {
        listOfCompany: this.props.list,
        chosenId: null
    }
    componentDidMount() {
        this.setState({ chosenId: this.props.list[0].CompanyName })
    }
    onClickHandler = (item) => {
        this.setState({ chosenId: item.CompanyName },()=>{
            this.props.selectedCompany(item)
        })
    }

    render() {
        let list = this.props.list.map((list, index) => {
            return (<Item item={list.CompanyName} key={index}
                click={() => this.onClickHandler(list)}
                id={list.CompanyName} chosenId={this.state.chosenId} />)
        })
        return (<div className="company">
            {list}
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        listOfCompany: state.map.sortCompanyList
    }
}
const mapStateDispatchToProps = dispatch => {
    return {
        selectedCompany:(companyName)=>dispatch(actionType.selectedCompany(companyName))
    };
};

export default connect(
    mapStateToProps,
    mapStateDispatchToProps
)(ListOfCompany);