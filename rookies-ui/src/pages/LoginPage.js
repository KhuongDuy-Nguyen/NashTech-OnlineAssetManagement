import Login from "../components/login/Login"
import LoginProvider from "../contexts/providers/LoginProvider";

const LoginPage = props => {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  )
}

export default LoginPage;