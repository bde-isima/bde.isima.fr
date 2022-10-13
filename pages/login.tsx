import LoginFallback from 'app/components/auth/LoginFallback';

function Login() {
  return <LoginFallback />;
}

Login.suppressFirstRenderFlicker = true;
export default Login;
