import Text from "./Text";
import {Pressable, StyleSheet} from "react-native";
import theme from "../theme";

const Button = ({onClick, name}) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Text fontWeight='bold' style={styles.text}>{name}</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blue,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: theme.colors.white,
    textAlign: 'center',
  }
});

export default Button;