import {View, StyleSheet} from 'react-native';
import {useField} from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  errorText: {
    color: theme.colors.red,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;