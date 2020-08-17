/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  Appbar,
  Divider,
  Provider as PaperProvider,
  useTheme,
  Portal,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import getFakeData from './dal/getFakeData';

const App = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    if (!data.length) {
      getFakeData
        .then((resp) => {
          setData(resp.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [data.length]);

  const {colors} = useTheme();

  const renderItem = ({item}) => {
    const {user} = item;
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          setItem(item);
        }}>
        <Text style={styles.listItemText}>{user}</Text>
        <Divider
          style={{
            backgroundColor: colors.primary,
            height: 3,
          }}
        />
      </TouchableOpacity>
    );
  };

  const {amount, datetime, user} = item;
  const {width, height} = Dimensions.get('window');

  const EmptyComponent = (
    <View
      style={{
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} size={'large'} />
    </View>
  );

  return (
    <PaperProvider>
      <Portal>
        <Modal
          dismissable
          visible={item.user}
          onDismiss={() => {
            setItem({});
          }}
          contentContainerStyle={{
            backgroundColor: colors.background,
            width: (width * 2) / 3,
            height: height / 3,
            position: 'absolute',
            top: height / 3,
            left: width / 6,
            borderRadius: 10,
            padding: 15,
          }}>
          <View style={styles.modalInfo}>
            <Text style={styles.modalText}>User: {user}</Text>
            <Text style={styles.modalText}>
              Date: {new Date(datetime).toLocaleDateString()}
            </Text>
            <Text style={styles.modalText}>
              Time: {new Date(datetime).toLocaleTimeString()}
            </Text>
            <Text style={styles.modalText}>Amount: {amount}</Text>
          </View>
          <Button
            mode="outlined"
            style={{
              borderColor: colors.primary,
              borderWidth: 2,
            }}
            onPress={() => {
              setItem({});
            }}>
            Hide
          </Button>
        </Modal>
      </Portal>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.Content title="Test App" subtitle="Sputnik Software Test App" />
      </Appbar.Header>
      <View style={{backgroundColor: colors.background}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(transaction) => transaction.user}
          style={{
            marginBottom: 50,
          }}
          ListEmptyComponent={EmptyComponent}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
  },
  listItemText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
  },
  modalInfo: {
    marginBottom: 20,
  },
});

export default App;
