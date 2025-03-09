// src/utils.js
export const validatePassword = (password) => {
    const minLength = 6;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasCapitalLetter &&
      hasSmallLetter &&
      hasDigit &&
      hasSpecialChar
    );
  };