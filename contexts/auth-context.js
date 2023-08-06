import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProfile } from "../endpoints/user";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: "",
    user: {},
  });

  const setUserAuthInfo = ({ data }) => {
    window.localStorage.setItem("token", data.userToken);
    window.localStorage.setItem("loggedInUser", JSON.stringify(data));
    const newToken = localStorage.getItem("token");
    const newUser = localStorage.getItem("loggedInUser");
    setAuthState({
      token: newToken,
      user: newUser,
    });
  };

  // checks if the user is authenticated or not
  //If the token is not in localStorage, it returns false. If it is, it returns true
  const isUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser");
    setAuthState({
      ...authState,
      token,
      user: JSON.parse(user),
    });
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const updateUser = async (userData) => {
    if (userData) {
      setAuthState({ ...authState, user: userData });
    } else {
      const [user, userErr] = await fetchProfile();
      if (user) {
        window.localStorage.setItem("loggedInUser", JSON.stringify(user.data));
        setAuthState({ ...authState, user: user.data });
      }
    }
  };

  return (
    <Provider
      value={{
        authState,
        user: authState.user,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        updateUser,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
