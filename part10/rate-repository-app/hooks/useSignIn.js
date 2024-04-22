import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../src/graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const {data} = await mutate({
        variables: {username, password}
      });
      console.log('hook',data.authenticate.user.id, data.authenticate.accessToken);
      return data.authenticate;
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;