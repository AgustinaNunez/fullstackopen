import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import Pill from './Pill';
import CounterView from './CounterView';
import theme from '../theme';

const RepositoryInfo = ({ repository }) => {
  const parseToK = n => n >= 1000 ? (n/1000).toFixed(1) + 'k' : n

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{uri: repository.ownerAvatarUrl}} style={styles.image}/>
        <View style={styles.cardHeaderText}>
          <Text fontSize="heading" fontWeight="bold">{repository.fullName}</Text>
          <Text color="description" style={styles.description}>{repository.description}</Text>
          <Pill text={repository.language}/>
        </View>
      </View>
      <View style={styles.cardContent}>
        <CounterView style={styles.contentItem} name="Stars" value={parseToK(repository.stargazersCount)}/>
        <CounterView style={styles.contentItem} name="Forks" value={parseToK(repository.forksCount)}/>
        <CounterView style={styles.contentItem} name="Reviews" value={parseToK(repository.reviewCount)}/>
        <CounterView style={styles.contentItem} name="Rating" value={parseToK(repository.ratingAverage)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '92%',
    backgroundColor: theme.colors.white,
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentItem: {
    flexGrow: 1,
  },
  description: {
    flexWrap: 'wrap',
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
});

export default RepositoryInfo;