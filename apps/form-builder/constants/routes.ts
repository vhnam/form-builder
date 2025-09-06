const privateRoutes = {};

const publicRoutes = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
};

export { privateRoutes, publicRoutes };
