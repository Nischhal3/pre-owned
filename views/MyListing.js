import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {ProductList} from '../components/ListItem';
import DeleteAction from '../components/elements/DeleteAction';
import colors from '../utils/colors';

const initialMessages = [
  {
    id: 1,
    title: 'T1',
    description: 'D1',
    image: require('../assets/products/profilepic.jpg'),
  },
  {
    id: 2,
    title: 'T2',
    description: 'D2',
    image: require('../assets/products/books.jpg'),
  },
];
const MyListing = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // delete the message from messages array
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Layout>
      <FlatList
        data={messages}
        keyExTractor={(message) => message.id.toString()}
        renderItem={({item}) => (
          <ProductList
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log('message selected', item)}
            renderRightActions={() => (
              <DeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={
          <Layout
            style={{width: '100%', height: 1, backgroundColor: colors.stroke}}
          />
        }
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
export default MyListing;
