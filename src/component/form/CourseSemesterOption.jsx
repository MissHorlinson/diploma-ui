import React, { useState } from "react";
import MyInputValidator from "../UI/MyInputValdator";

const CourseSemesterOption = ({ option, download, onCancel }) => {

    const [num, setNum] = useState();

    const clearStates = () => {
        setNum('');
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>{option}</label>
                <MyInputValidator
                    value={num}
                    onText={text => setNum(text)}
                    className="form-control"
                    check="[0-9]"
                />
                <div className="invalid-feedback">
                    Can contain onle numbers
                </div>
            </div>

            <div>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={() => download(num)}>Download</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => {
                    clearStates();
                    onCancel();
                }}>Cancel</button>
            </div>
        </div>
    )

}

export default CourseSemesterOption;