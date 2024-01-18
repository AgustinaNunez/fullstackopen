import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.grey,
    padding: 15,
  },
  error: {
    borderColor: theme.colors.red,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.input,
    error && styles.error,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;