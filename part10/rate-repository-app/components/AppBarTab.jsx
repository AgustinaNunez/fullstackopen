import {StyleSheet} from "react-native";
import Text from "./Text";
import theme from "../theme";
import {Link} from "react-router-native";

const AppBarTab = ({to, text}) => {
  const styles = StyleSheet.create({
    text: {
      flexGrow: 1,
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
    }
  });

  return (
    <Link to={to}>
      <Text fontSize="title" style={styles.text}>
        {text}
      </Text>
    </Link>
  )
};

export default AppBarTab;