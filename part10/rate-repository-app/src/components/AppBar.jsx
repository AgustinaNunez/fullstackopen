import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useUserSession from '../../hooks/useUserSession';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  const {user} = useUserSession();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onSignOut = async() => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" to="/" />
        { user?.id
          ? <AppBarTab text="Sign out" onClick={onSignOut}/>
          : <AppBarTab text="Sign in" to="/signin" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;