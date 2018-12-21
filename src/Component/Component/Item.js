import React from "react"
import "./Item.css"

const Item = (props) => {

     let isActive = {
        backgroundColor: " #0775FF",
        color: "white",
        borderRadius: "10px",
        padding: "5px",
        margin:"2px",
        boxSizing:"border-box",
        cursor:"pointer"

        
    }
    let notActive = {
        color: "#0775FF",
        width: "100%",
        padding: "5px",
        margin:"2px",
        boxSizing:"border-box",
        cursor:"pointer"
    }


    let iSItemSelectedClass = props.id===props.chosenId ? isActive : notActive

    return (<div onClick={props.click} id={props.id} style={iSItemSelectedClass} >
        <p>{props.item}</p>
    </div>)
}
export default Item

