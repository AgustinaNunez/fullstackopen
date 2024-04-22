import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const AppBarTab = ({to, text, onClick}) => {
  const styles = StyleSheet.create({
    text: {
      flexGrow: 1,
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes.heading,
      paddingRight: 20,
    }
  });

  if (to) {
    return (
      <Link to={to}>
        <Text style={styles.text}>
          {text}
        </Text>
      </Link>
    )
  }
  if (onClick) {
    return (
      <Pressable onPress={onClick}>
        <Text fontWeight='bold' style={styles.text}>{text}</Text>
      </Pressable>
    )
  }
};

export default AppBarTab;