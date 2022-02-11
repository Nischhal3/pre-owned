import React, {useState} from 'react';
import {FlatList, StyleSheet, Alert} from 'react-native';
import {Layout, Divider, Icon} from '@ui-kitten/components';
import {ListDetail} from '../components/ListItem';
import DeleteAction from '../components/elements/DeleteAction';
import colors from '../utils/colors';
import {PointRightArrow} from '../components/elements/Icons';

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
    <Layout>
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
        ItemSeparatorComponent={Divider}
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
