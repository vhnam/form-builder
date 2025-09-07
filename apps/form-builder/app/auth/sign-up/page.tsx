import { BRAND_NAME } from '@/constants/branding';

import { SignUpForm } from '@/modules/auth/sign-up-form';

export const metadata = {
  title: `Sign Up | ${BRAND_NAME}`,
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
