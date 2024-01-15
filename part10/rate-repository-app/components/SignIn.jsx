import FormikTextInput from "./FormikTextInput";
import {View, StyleSheet} from "react-native";
import Button from "./Button";
import {Formik} from "formik";
import * as yup from 'yup';

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
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
          ({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>
        }
      </Formik>
    </View>
  )
};

const SignInForm = ({onSubmit}) => (
  <View>
    <FormikTextInput name='username' placeholder='Username' />
    <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
    <Button name='Sign in' onClick={onSubmit} />
  </View>
)

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must have al least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must  have al least 8 characters')
    .required('Password is required'),
});

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