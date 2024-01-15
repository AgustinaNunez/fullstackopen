import FormikTextInput from "./FormikTextInput";
import {View, StyleSheet} from "react-native";
import Button from "./Button";
import {Formik} from "formik";

const SignIn = () => {
  const initialValues = {
    username: '',
    password: ''
  }
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <View>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
          <Button name='Sign in' onClick={onSubmit} />
        </View>
      </Formik>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  }
})

export default SignIn;