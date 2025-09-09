export const PRIVATE_ROUTES = {
  home: '/app',
  forms: {
    list: '/app/forms',
    new: '/app/forms/new',
    edit: '/app/forms/[id]',
    preview: '/app/forms/[id]/preview',
  },
  profile: '/app/me',
};

export const PUBLIC_ROUTES = {
  landing: '/',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
};
