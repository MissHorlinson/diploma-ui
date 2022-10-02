import React from "react";

const AddBtn = ({ onClick }) => {
    return (
        <button style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
            <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={() => "click"} />
        </button>

    )
}

export default AddBtn;
