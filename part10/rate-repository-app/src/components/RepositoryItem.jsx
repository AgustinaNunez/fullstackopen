import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryInfo from './RepositoryInfo';
import Text from './Text';
import theme from '../theme';
import ReviewItem from './ReviewItem';

export const ReviewListContainer = ({ reviews }) => {
  const list = reviews?.edges?.map(edge => edge.node) || []
  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <FlatList
      style={styles.list}
      data={list}
      renderItem={({item}) => <ReviewItem item={item}/>}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryItem = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) return;
  return (
    <View style={styles.container}>
      <RepositoryInfo repository={repository}/>
      <Pressable style={styles.button.container} onPress={null}>
        <Text fontWeight='bold' style={styles.button.text}>Open in GitHub</Text>
      </Pressable>
      <ReviewListContainer reviews={repository?.reviews} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  button: {
    container: {
      backgroundColor: theme.colors.blue,
      borderRadius: 5,
      padding: 15,
      width: '92%',
      marginVertical: 10,
    },
    text: {
      color: theme.colors.white,
      textAlign: 'center',
    },
  },
  list: {
    backgroundColor: theme.colors.background,
    flex: 1,
    width: '100%'
  },
  separator: {
    height: 10,
  },
});

export default RepositoryItem;