// import {FlatList, Text, List} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Avatar} from '@ui-kitten/components';
// // import AvatarComponent from '../components/AvatarComponent';
// // import {useTime} from '../hooks/helpersHooks';

// const MessageItem = ({singleCommment}) => {
//   const {getUserById} = useUser();
//   const [sender, setSender] = useState({username: 'fetching...'});

//   const fetchCommentOwner = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       const userData = await getUserById(singleCommment.user_id, token);
//       setSender(userData);
//     } catch (error) {
//       console.error('fetchCommentOwner error ', error.message);
//       setSender({username: '[not available]'});
//     }
//   };

//   useEffect(() => {
//     fetchCommentOwner();
//   }, []);

//   return (
//     <FlatList
//       title={commentOwner.username}
//       titleStyle={{fontSize: 14, fontWeight: '500'}}
//       description={singleCommment.comment}
//       left={() => <Avatar userId={singleCommment.user_id} />}
//       right={() => (
//         <Text
//           style={{
//             position: 'absolute',
//             top: 7,
//             right: 0,
//           }}
//         >
//           {/* {convertUTCToLocalTime(singleCommment.time_added)} */}
//         </Text>
//       )}
//       style={{padding: 5}}
//     />
//   );
// };

// export default MessageItem;
