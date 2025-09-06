export const privateRoutes = {
  home: '/app',
  forms: {
    list: '/app/forms',
    new: '/app/forms/new',
    edit: '/app/forms/[id]',
    preview: '/app/forms/[id]/preview',
  },
};

export const publicRoutes = {
  landing: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
};
