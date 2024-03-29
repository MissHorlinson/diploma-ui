import React from 'react';
import cl from '../UI/MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [cl.myModal];

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} >
            <div className="container">
                <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;