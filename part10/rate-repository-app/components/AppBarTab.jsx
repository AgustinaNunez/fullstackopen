import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const AppBarTab = ({onPress, text}) => {
  const styles = StyleSheet.create({
    text: {
      flexGrow: 1,
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
    }
  });

  return (
    <Pressable onPress={onPress}>
      <Text fontSize="title" style={styles.text}>{text}</Text>
    </Pressable>
  )
};

export default AppBarTab;