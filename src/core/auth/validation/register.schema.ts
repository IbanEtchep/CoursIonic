import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const registerSchema = yup.object({
    email: yup
        .string()
        .required('Email requis')
        .email('Email invalide'),
    password: yup
        .string()
        .required('Mot de passe requis')
        .min(8, 'Minimum 8 caractères')
        .matches(
            passwordRules,
            'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre.'
        ),
    confirmPassword: yup
        .string()
        .required('Confirmation requise')
        .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
});