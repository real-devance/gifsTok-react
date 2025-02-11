// AuthProvider.tsx
import { ReactNode } from 'react';

import useAuthListener from '../hooks/useAuthListener';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  
  useAuthListener();

  return <>{children}</>; 
};

export default AuthProvider;
