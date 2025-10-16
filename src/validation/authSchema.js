const { object, string, ref, date, boolean } = require("yup");

// signup schema
const signUpSchema = object().shape({
    body: object().shape({
        email: string().email('Email is not valid').required('Email is required'),
        password: string().required('Password is required'),
        retype_password: string()
            .oneOf([ref('password'), null], 'Passwords must match')
            .required('Please retype your password'),
    }),
});


// login Parameters Validation
const loginSchema = object().shape({
    body: object().shape({
        email: string()
            .required('Email or username is required')
            .test('emailOrUsername', 'Invalid email or username', function (value) {
                const { createError } = this;
                if (string().email().isValidSync(value)) {
                    return true; // Email is valid
                }
                if (/^[a-zA-Z0-9_]+$/.test(value)) {
                    return true; // Username is valid
                }
                return createError({ message: 'Invalid email or username' });
            }),
        password: string().required('password is Required'),
    }),
});

module.exports = {
    signUpSchema, loginSchema,
};