import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../src/graphql/queries';

const useRepository = (id) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  return { repository: data?.repository, loading, refetch };
};

export default useRepository;