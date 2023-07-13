import { ReactNode, createContext, useState } from 'react';

const defaultConfig = {
  token: '',
  // refreshToken: '',
  isAuthenticated: false,
  authenticate: (token: string) => {}, //method for changing the state
  logout: () => {}, //erases token and so son
};

export type AuthConfig = typeof defaultConfig;

const AuthContext = createContext<AuthConfig>(defaultConfig);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [authToken, setAuthToken] = useState<string | undefined>();

  const authenticate = (token: string) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(undefined);
  };

  const value: AuthConfig = {
    token: authToken,
    isAuthenticated: Boolean(authToken),
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
