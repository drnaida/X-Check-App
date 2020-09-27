import { useCallback } from 'react';
import jwtDecode from 'jwt-decode';

export const useToken = () => {
  const checkIsTokenExpires = useCallback(token => {
    return token && jwtDecode(token).exp * 1000 < Date.now();
  }, []);

  return { checkIsTokenExpires };
};
