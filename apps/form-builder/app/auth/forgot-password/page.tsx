import { BRAND_NAME } from '@/constants/branding';

import { ForgotPasswordForm } from '@/modules/auth/forgot-password-form';

export const metadata = {
  title: `Forgot Password | ${BRAND_NAME}`,
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
