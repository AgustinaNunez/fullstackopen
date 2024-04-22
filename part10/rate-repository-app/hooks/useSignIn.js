import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../src/graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const {data} = await mutate({
        variables: {username, password}
      });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      return data.authenticate;
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;