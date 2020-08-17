/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {Appbar, Divider, Provider as PaperProvider} from 'react-native-paper';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import getFakeData from './dal/getFakeData';

const App = () => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!fetching && !data.length) {
      setFetching(true);
      getFakeData
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          alert('err');
        })
        .finally(() => {
          setFetching(false);
          alert('Finally');
        });
    }
  });

  const renderItem = ({item}) => {
    const {amount, user, datetime} = item;
    return (
      <View style={styles.listItem}>
        <Text>{amount}</Text>
        <Text>{user}</Text>
        <Text>{datetime}</Text>
        <Divider />
      </View>
    );
  };

  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.Content title="Test App" subtitle="Sputnik Software Test App" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={({user}) => user}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaccbb',
  },
  listItem: {
    padding: 20,
  },
});

export default App;
