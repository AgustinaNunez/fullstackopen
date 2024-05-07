import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns'
import Text from './Text';
import theme from '../theme';

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.icon}>
          <Text fontWeight="bold" style={styles.iconText}>
            {item.rating}
          </Text>
        </View>
        <View style={styles.cardHeaderText}>
          <Text fontSize="heading" fontWeight="bold">
            {item.user?.username}
          </Text>
          <Text color="description" style={styles.date}>
            {format(item.createdAt, 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.description}>
            {item.text}
          </Text>
        </View>
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardHeaderText: {
    flex: 1,
  },
  contentItem: {
    flexGrow: 1,
  },
  description: {
    flexWrap: 'wrap',
    width: '100%',
  },
  icon: {
    width: 50,
    height: 50,
    borderColor: theme.colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    marginRight: 16,
  },
  iconText: {
    color: theme.colors.blue,
  }
});

export default ReviewItem;