import { useContext } from 'react';
import AuthStorageContext from '../src/contexts/AuthStorageContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;