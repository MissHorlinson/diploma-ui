import React from "react";

import MyInputValidator from "../UI/MyInputValdator";

const PersonalInfoForm = ({
    firstName, setFirstName,
    secondName, setSecondName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone }) => {

    return (
        <div>
            <div className="form-group">
                <label>Ім'я</label>
                <MyInputValidator
                    value={firstName}
                    onText={text => setFirstName(text)}
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    check="[А-Я][а-яїієґ]*$"
                />
                <div className="invalid-feedback">
                    Ім'я повинне прчинатися з великой літери і не може містити в собі цифри
                </div>
            </div>

            <div className="form-group">
                <label>По батькові</label>
                <MyInputValidator
                    value={secondName}
                    onText={text => setSecondName(text)}
                    name="secondName"
                    placeholder="Second Name"
                    className="form-control"
                    check="[А-Я][а-яїієґ]*$"
                />
                <div className="invalid-feedback">
                    По батькові повинне прчинатися з великой літери і не може містити в собі цифри
                </div>
            </div>

            <div className="form-group">
                <label>Прізвище</label>
                <MyInputValidator
                    value={lastName}
                    type="text"
                    onText={text => setLastName(text)}
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    check="^[А-Я][а-яїієґ]*$"
                />
                <div className="invalid-feedback">
                    Прізвище повинне прчинатися з великой літери і не може містити в собі цифри
                </div>
            </div>

            <div className="form-group">
                <label>Email</label>
                <MyInputValidator
                    value={email}
                    onText={text => setEmail(text)}
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    check="^[A-Za-z0-9@.]+$"
                />
                <div className="invalid-feedback">
                    Пошта повинна містити в собі літери, цифри та символ  @
                </div>
            </div>

            <div className="form-group">
                <label>Телефон</label>
                <MyInputValidator
                    value={phone}
                    onText={text => setPhone(text)}
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    check="^[0-9-]+$"
                />
                <div className="invalid-feedback">
                    Номер телефону може містити лише цифри
                </div>
            </div>
        </div>
    )

}

export default PersonalInfoForm;