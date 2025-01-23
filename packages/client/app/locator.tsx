import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import MapSheet from '~/components/Sheet/Map';

const CustomMarker = ({ type }) => {
  return (
    <View style={styles.markerContainer}>
      <View style={[styles.marker]}>
        {type === 'person' && <Ionicons name="woman-outline" size={20} color="white" />}
      </View>
    </View>
  );
};

export default function App() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 27.604376,
    longitude: 77.59686,
    latitudeDelta: 0.008,
    longitudeDelta: 0.009,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const mapSheet = useRef<{ openSheet: () => void }>(null);
  const [search, setSearch] = useState('');

  const [destination, setDestination] = useState({
    latitude: 27.6048624,
    longitude: 77.5944604,
  });

  const [origin, setOrigin] = useState({
    latitude: 27.6067624,
    longitude: 77.5963804,
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      type: 'person',
      name: 'Location 1',
      coordinate: {
        latitude: 27.609876,
        longitude: 77.592341,
      },
    },
    {
      id: 2,
      type: 'person',
      name: 'Location 2',
      coordinate: {
        latitude: 27.601234,
        longitude: 77.599876,
      },
    },
    {
      id: 3,
      type: 'person',
      name: 'Location 3',
      coordinate: {
        latitude: 27.607654,
        longitude: 77.594567,
      },
    },
    {
      id: 4,
      type: 'person',
      name: 'Location 4',
      coordinate: {
        latitude: 27.603421,
        longitude: 77.598765,
      },
    },
    {
      id: 5,
      type: 'person',
      name: 'Location 5',
      coordinate: {
        latitude: 27.605678,
        longitude: 77.593456,
      },
    },
    {
      id: 6,
      type: 'person',
      name: 'Location 6',
      coordinate: {
        latitude: 27.600987,
        longitude: 77.597654,
      },
    },
    {
      id: 7,
      type: 'person',
      name: 'Location 7',
      coordinate: {
        latitude: 27.608765,
        longitude: 77.595432,
      },
    },
    {
      id: 8,
      type: 'person',
      name: 'Location 8',
      coordinate: {
        latitude: 27.602345,
        longitude: 77.596789,
      },
    },
    {
      id: 9,
      type: 'person',
      name: 'Location 9',
      coordinate: {
        latitude: 27.606543,
        longitude: 77.591234,
      },
    },
    {
      id: 10,
      type: 'person',
      name: 'Location 10',
      coordinate: {
        latitude: 27.604789,
        longitude: 77.598901,
      },
    },
  ]);

  const handleMapReady = () => {
    setIsMapReady(true);
  };

  const handleMapError = (error) => {
    console.error('Map loading error:', error);
    Alert.alert('Error', 'Failed to load map properly. Please try again.');
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    mapRef.current?.animateToRegion(newRegion, 1000);
    setRegion(newRegion);
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          Alert.alert(
            'Location Permission Required',
            'Please enable location services to use this feature'
          );
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);

        const newRegion = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };

        setRegion(newRegion);

        if (mapRef.current && isMapReady) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      } catch (error) {
        setErrorMsg('Error getting location');
        console.error('Location error:', error);
      }
    })();
  }, [isMapReady]);

  useEffect(() => {
    getLocation();
    if (mapSheet.current) {
      mapSheet.current.openSheet();
    }
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          initialRegion={region}>
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyCMgVoITWEZsSnLbPRlZjGwMkZYfYvrwmg"
            strokeWidth={4}
            strokeColor="blue"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
          /> */}
          {markers.map((marker) => (
            <Marker key={marker.id} coordinate={marker.coordinate}>
              <CustomMarker type={marker.type} />
            </Marker>
          ))}
        </MapView>

        <TouchableOpacity style={styles.currentLocationButton} onPress={getLocation}>
          <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={{
                position: 'absolute',
                left: 25,
                zIndex: 1,
              }}
            />
            <TextInput
              className="border-1 w-full rounded-xl border-indigo-100 bg-white px-4 py-3 pl-10 text-base shadow-xl focus:border-gray-200"
              placeholder="Enter a location"
              keyboardType="default"
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholderTextColor="#9CA3AF"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <MapSheet ref={mapSheet} />

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
  },
  settingsButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: '12%',
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  markerPerson: {
    backgroundColor: '#2196F3',
  },
  currentLocationButton: {
    position: 'absolute',
    right: 20,
    bottom: '5%',
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
