// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import Carousel from 'react-native-snap-carousel';


// const images = [
//   { uri: 'https://esnaalto.org/sites/esnaalto.org/files/styles/spotlight/public/news/spotlight/DNA_emblem_pink_RGB_23102015.jpg?itok=46MOjFaA' },
//   { uri: 'https://ehandel.fi/wp-content/uploads/sites/2/2018/06/zalando.jpg' },
//   { uri: 'https://image.cnbcfm.com/api/v1/image/107228387-1681972090691-gettyimages-1247510608-raa-nokianew230226_npJYU.jpeg?v=1706171260&w=1920&h=1080' },
// ];

// export default function CarouselComponent() {

//   const renderItem = ({ item }) => (
//     <View style={styles.slide}>
//       <Image source={{ uri: item.uri }} style={styles.image} />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Carousel
//         layout="default"
//         data={images}
//         sliderWidth={300}
//         itemWidth={300}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slide: {
//     width: 300,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
// });
