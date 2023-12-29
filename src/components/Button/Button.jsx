import React from 'react'
import './Button.scss'


const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    shop: 'shop',
};
const Button = ({children, buttonType, ...otherprops}) => {
  return (
    <button 
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
        {...otherprops}
    >
        {children}
    </button>
  );
};

export default Button;