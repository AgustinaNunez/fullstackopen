import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" to='/'/>
      <AppBarTab text="SignIn" to='/signin'/>
    </ScrollView>
  </View>
);

export default AppBar;