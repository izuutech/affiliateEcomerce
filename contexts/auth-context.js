import React, { useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: "",
  });

  const setUserAuthInfo = ({ data }) => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({
        token,
      });
    } else if (data) {
      localStorage.setItem("token", data.userToken);
      const newToken = localStorage.getItem("token");
      setAuthState({
        token: newToken,
      });
    }
  };
  useEffect(() => {
    setUserAuthInfo({});
  }, []);
  // checks if the user is authenticated or not
  //If the token is not in localStorage, it returns false. If it is, it returns true
  const isUserAuthenticated = () => !!authState.token;

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
