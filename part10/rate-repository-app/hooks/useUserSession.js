import { useQuery } from '@apollo/client';
import { GET_ME } from '../src/graphql/queries';

const useUserSession = () => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { user: data?.me, loading, refetch };
};

export default useUserSession;