import { BlitzPage } from '@blitzjs/auth';

import LoginFallback from 'app/components/auth/LoginFallback';

const Login: BlitzPage = () => {
  return <LoginFallback />;
};

Login.suppressFirstRenderFlicker = true;
Login.redirectAuthenticatedTo = '/hub';
export default Login;
