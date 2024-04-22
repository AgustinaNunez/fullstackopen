import FormikTextInput from "./FormikTextInput";
import {View, StyleSheet} from "react-native";
import Button from "./Button";
import {Formik} from "formik";
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: ''
  }

  const onSubmit = async (values) => {
    const {username, password} = values;
    try {
      const { accessToken } = await signIn({username, password});
      if (accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
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