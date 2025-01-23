import { Feather } from '@expo/vector-icons';
import { Text } from 'expo-dynamic-fonts';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Animated,
} from 'react-native';

import { stores } from '~/types/constant';

const SPACING = 16;

const HealthStoreExpo = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [activeTab, setActiveTab] = useState('nearby');
  const tabs = ['nearby', 'popular', 'new'];
  const scrollY = new Animated.Value(0);
  const [loaded, error] = useFonts({
    Poppins: require('../assets/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const ProductCard = ({ product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={require('../assets/medicine.jpg')}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productBadge}>
          <Text style={[styles.badgeText, { fontFamily: 'Poppins' }]}>{product.category}</Text>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { fontFamily: 'Poppins' }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text font="PoppinsBold" style={styles.productPrice}>
          Rs.{product.price}
        </Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const StoreCard = useCallback(
    ({ store }) => (
      <Animated.View style={styles.storeCard}>
        <TouchableOpacity
          onPress={() => setSelectedStore(store.id === selectedStore ? null : store.id)}
          style={styles.storeInfo}>
          <Image source={require('../assets/medicine.jpg')} style={styles.storeImage} />
          <View style={styles.storeDetails}>
            <Text font="PoppinsBold" style={styles.storeName}>
              {store.name}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBadge}>
                <Feather name="star" size={14} color="#FFB800" />
                <Text style={[styles.rating, { fontFamily: 'Poppins' }]}>{store.rating}</Text>
              </View>
              <Text style={[styles.distance, { fontFamily: 'Poppins' }]}>{store.distance}</Text>
            </View>
          </View>
          <Feather
            name={selectedStore === store.id ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {selectedStore === store.id && (
          <View style={styles.productsContainer}>
            <Text font="PoppinsSemiBold" style={styles.sectionTitle}>
              Featured Products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScroll}>
              {store.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ScrollView>
          </View>
        )}
      </Animated.View>
    ),
    [selectedStore]
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Animated.View
          style={[
            styles.header,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -50],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <View>
            <Text style={styles.title} font="PoppinsBold">
              Health Store
            </Text>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={16} color="#666" />
              <Text style={[styles.locationText, { fontFamily: 'Poppins' }]}>Current Location</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="heart" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for health products..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                  { fontFamily: 'Poppins' },
                ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}>
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4FF',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
    backgroundColor: '#F1F4FF',
    zIndex: 1000,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 1,
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: SPACING,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    padding: SPACING,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  storeDetails: {
    flex: 1,
    marginLeft: 16,
  },
  storeName: {
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  rating: {
    marginLeft: 4,
    color: '#FFB800',
    fontSize: 14,
    fontWeight: '600',
  },
  distance: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    marginVertical: 12,
  },
  productsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  productsScroll: {
    paddingRight: SPACING,
    paddingVertical: 8,
  },
  productCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#2196F3',
  },
  addToCartButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#2196F3',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HealthStoreExpo;
