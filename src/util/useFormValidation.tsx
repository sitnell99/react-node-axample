import {useState} from "react";

export const useFormValidation = () => {

    const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [hasAnyFieldChanges, setHasAnyFieldChanges] = useState<boolean>(false);
    const hasAnyFieldError: boolean = phoneNumberError || passwordError || confirmPasswordError;

    const validatePhone = value => {
        if (value) {
            setHasAnyFieldChanges(true);
            const match = value.match(/\d/g) === null || value.match(/\d/g).length !== 12;
            if (match) {
                setPhoneNumberError(true)
            } else {
                setPhoneNumberError(false)
            }
        }
    }

    const validatePassword = value => {
        if (value) {
            setHasAnyFieldChanges(true);
            const count = {
                lower: 0,
                upper: 0,
                digit: 0,
                special: 0
            };

            for (const char of value) {
                if (/[a-z]/.test(char)) count.lower++;
                else if (/[A-Z]/.test(char)) count.upper++;
                else if (/\d/.test(char)) count.digit++;
                else if (/\S/.test(char)) count.special++;
            }

            if (Object.values(count).filter(Boolean).length < 3) {
                setPasswordError(true);
            } else {
                setCurrentPassword(value);
                setPasswordError(false);
            }
        }
    };

    const validateConfirmPassword = (value) => {
        if (value) {
            setHasAnyFieldChanges(true);
            if (value === currentPassword) {
                setConfirmPasswordError(false);
            } else {
                setConfirmPasswordError(true);
            }
        }

    };

    return {
        validatePhone,
        validatePassword,
        validateConfirmPassword,
        passwordError,
        confirmPasswordError,
        hasAnyFieldError,
        phoneNumberError,
        hasAnyFieldChanges,
        setHasAnyFieldChanges
    }
};

