import {useCallback, useState} from 'react';

export const useHttp = () => {

  const request = useCallback(async (url, method = 'GET', body = null, headers = {} ) => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      return data;
    } catch (e) {
      throw e;
    }
  }, [])


  return { request }
}