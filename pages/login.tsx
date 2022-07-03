import { withBlitz } from 'app/blitz-client';
import LoginFallback from 'app/components/auth/LoginFallback';

function Login() {
  return <LoginFallback />;
}

Login.suppressFirstRenderFlicker = true;
export default withBlitz(Login);
