// auth base layout
export const layout = () => import('source/modules/Auth/AuthLayout.vue')

// default page of auth
export const signIn = () => import('resources/views/auth/SignIn.vue')

// recover password page
export const recoverPassword = () => import('resources/views/auth/RecoverPassword.vue')
