import React, { useState } from "react";

import MyInputValidator from "../UI/MyInputValdator";

const CourseSemesterOption = ({ option, download, onCancel }) => {

    const [num, setNum] = useState();

    const clearStates = () => {
        setNum('');
    }

    const cancelBtn = () => {
        clearStates();
        onCancel();
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
                    Може складатися лише з цифр
                </div>
            </div>

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={() => download(num)}>Завантажити</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    )

}

export default CourseSemesterOption;