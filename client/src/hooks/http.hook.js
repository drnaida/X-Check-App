import { useCallback, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import { useToken } from './token.hook';

export const useHttp = () => {
  const { token, refreshToken, githubId, roles, login } = useContext(AuthContext);
  const { checkIsTokenExpires } = useToken();

  const refreshAccessToken = async () => {
    const response = await fetch(`/auth/refresh-token/${refreshToken}/${githubId}`);
    const newTokens = await response.json();
    login(newTokens.token, newTokens.refreshToken, githubId, roles);
    return newTokens;
  };

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (body) {
        // eslint-disable-next-line no-param-reassign
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      if (checkIsTokenExpires(token)) {
        const { token: accessToken } = await refreshAccessToken();
        headers.authorization = accessToken;
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        return false;
        // throw new Error(data.statusCode);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }, []);

  return { request };
};
