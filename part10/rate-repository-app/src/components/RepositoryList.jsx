import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';

const RepositoryItem = ({item}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${item.id}`);
  }

  return (
    <Pressable onPress={onClick}>
      <RepositoryInfo repository={item}/>
    </Pressable>
  )
};

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories?.edges?.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.list}
      data={repositoryNodes}
      renderItem={({item}) => <RepositoryItem item={item}/>}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
    flex: 1,
    width: '100%'
  },
  separator: {
    height: 10,
  },
});

export default RepositoryList;