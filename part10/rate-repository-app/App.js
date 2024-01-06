import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';

export default function App() {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
