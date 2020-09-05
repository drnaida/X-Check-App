import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [githubId, setGithubId] = useState(null);
  const [roles, setRoles] = useState(null);

  const login = useCallback((jwtToken, id, userRoles) => {
    setGithubId(id);
    setToken(jwtToken);
    setRoles(userRoles);

    localStorage.setItem(storageName, JSON.stringify({token: jwtToken, githubId: id, roles: userRoles}))
  }, []);

  const logout = useCallback(() => {
    setGithubId(null);
    setToken(null);
    setRoles(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.githubId, data.roles)
    }
  }, [login])

  return {login, logout, token, githubId, roles}
}