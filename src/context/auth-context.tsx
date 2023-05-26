import { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthUserType } from '@app/types';
import auth from '@react-native-firebase/auth';

type AuthCtxType = {
  user: AuthUserType | null;
  authenticate: (user: AuthUserType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthCtxType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authenticate: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUserType | null>(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const authenticate = (userAuth: AuthUserType) => {
    setUser(userAuth);
  };

  const logout = async () => {
    await auth().signOut();
    setUser(null);
  };

  const value = {
    user,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
