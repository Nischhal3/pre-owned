import React, {useState} from 'react';
import {FlatList, StyleSheet, Alert} from 'react-native';
import {Layout, Divider} from '@ui-kitten/components';
import DeleteAction from '../components/elements/DeleteAction';
import ListDetail from '../components/lists/ListDetail';
import ItemSeparator from '../components/elements/ItemSeparator';
const initialMessages = [
  {
    id: 1,
    title: 'T1',
    description: 'Is this avalable?',
    image: require('../assets/products/profilepic.jpg'),
  },
  {
    id: 2,
    title: 'T2',
    description: 'I am interested in buying the product, can you tell me more',
    image: require('../assets/products/profilepic.jpg'),
  },
  {
    id: 3,
    title: 'T2',
    description: 'Do you offer delivery?',
    image: require('../assets/products/profilepic.jpg'),
  },
];
const Message = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    Alert.alert(
      'Delete message',
      'Are you sure you want to delete this message?',
      [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: () => {
            // delete the message from messages array
            setMessages(messages.filter((m) => m.id !== message.id));
          },
        },
      ]
    );
  };

  return (
    <Layout style={{flex: 1, backgroundColor: '#f2f5fa'}}>
      <FlatList
        data={messages}
        keyExTractor={(message) => message.id.toString()}
        renderItem={({item}) => (
          <ListDetail
            title={item.title}
            description={item.description}
            image={item.image}
            renderRightActions={() => <DeleteAction onPress={handleDelete} />}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: 'T2',
              description: 'D2',
              image: require('../assets/products/profilepic.jpg'),
            },
          ]);
        }}
      />
    </Layout>
  );
};
const styles = StyleSheet.create({
  message: {width: 200},
});
export default Message;
