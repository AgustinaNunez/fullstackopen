import { View, StyleSheet } from 'react-native';
import Text from './Text';

const CounterView = ({name, value}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{value}</Text>
      <Text color="description">{name}</Text>
    </View>
  )
};

export default CounterView;