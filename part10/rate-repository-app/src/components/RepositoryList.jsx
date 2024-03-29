import {FlatList, StyleSheet, View} from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
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