import { useCallback } from 'react';
import jwt_decode from 'jwt-decode';

export const useToken = () => {
  const checkIsTokenExpires = useCallback(token => {
    return token && jwt_decode(token).exp * 1000 < Date.now();
  }, []);

  return { checkIsTokenExpires };
};
