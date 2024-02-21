import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

const images = [
  { uri: 'https://esnaalto.org/sites/esnaalto.org/files/styles/spotlight/public/news/spotlight/DNA_emblem_pink_RGB_23102015.jpg?itok=46MOjFaA' },
  { uri: 'https://ehandel.fi/wp-content/uploads/sites/2/2018/06/zalando.jpg' },
  { uri: 'https://image.cnbcfm.com/api/v1/image/107228387-1681972090691-gettyimages-1247510608-raa-nokianew230226_npJYU.jpeg?v=1706171260&w=1920&h=1080' },
];

const { width } = Dimensions.get('window');

const CarouselComponent = () => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
  },
});

export default CarouselComponent;
