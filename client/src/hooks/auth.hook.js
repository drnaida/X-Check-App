import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [githubId, setGithubId] = useState(null);
  const [roles, setRoles] = useState(null);

  const login = useCallback((jwtToken, jwtRefreshToken, id, userRoles) => {
    setGithubId(id);
    setToken(jwtToken);
    setRefreshToken(jwtRefreshToken);
    setRoles(userRoles);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        refreshToken: jwtRefreshToken,
        githubId: id,
        roles: userRoles
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setGithubId(null);
    setRoles(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.refreshToken, data.githubId, data.roles);
    }
  }, [login]);

  return { login, logout, token, refreshToken, githubId, roles };
};
