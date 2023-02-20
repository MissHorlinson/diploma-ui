import React from 'react';
import { useState } from 'react';

const MyInputValidator = (props) => {
    const checkPattern = props.check;
    const onText = props.onText;
    const minLength = props.minLength || 1;
    const className = props.className || '';
    const [valid, setValid] = useState(null);
    return (<input
        {...props}
        type="text"
        className={valid ? className : valid === null ? className : className + ' is-invalid'}
        onChange={e => {
            const text = e.target.value
            if (text.length < minLength) {
                setValid(null)
            } else if (text.match(checkPattern)) {
                setValid(true)
            } else {
                setValid(false)
            }
            onText(text)
        }}
    />)
};

export default MyInputValidator;