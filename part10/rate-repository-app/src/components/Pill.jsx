import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from "../theme";

const Pill = ({text}) => {
  const styles = StyleSheet.create({
    pill: {
      backgroundColor: theme.colors.blue,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      alignSelf: 'flex-start',
      marginVertical: 5,
    }
  });

  return (
    <View style={styles.pill}>
      <Text fontWeight="bold" style={{ color: 'white' }}>{text}</Text>
    </View>
  )
};

export default Pill;