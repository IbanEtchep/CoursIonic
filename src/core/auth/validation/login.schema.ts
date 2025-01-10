import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email requis')
        .email('Email invalide'),
    password: yup
        .string()
        .required('Mot de passe requis')
        .min(6, 'Minimum 6 caractères')
});
