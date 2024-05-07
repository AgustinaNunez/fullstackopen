import AppBar from './AppBar';
import { StyleSheet, View } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:id" element={<RepositoryItem />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;