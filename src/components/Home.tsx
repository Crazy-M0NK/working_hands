import { AxiosError } from 'axios';
import { request } from '../api/requests';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Shift } from '../types';

const Item = ({ data }: { data: Shift }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{data.companyName}</Text>
    </TouchableOpacity>
  );
};

export function Home() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [shifts, setShifts] = useState<Shift[] | null>();

  const getShifts = async (coords: { latitude: number; longitude: number }) => {
    try {
      const { data } = (await request.getShifts(coords)).data;
      console.log('Shifts:', data);
      setShifts(data);
    } catch (e) {
      const error = e as AxiosError;
      setShifts(null);
      console.log('Failing shifts load, error', error);
    } finally {
      setIsRefresh(false);
    }
  };

  useEffect(() => {
    if (shifts !== undefined) return;
    getShifts({ latitude: 45.039268, longitude: 38.987221 });
  }, [shifts]);

  return (
    <View style={styles.container}>
      <FlatList
        data={shifts}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={item => item.id}
        refreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
          getShifts({ latitude: 45.039268, longitude: 38.987221 });
        }}
      />
      {shifts === undefined ? (
        <View style={styles.placeholder}>
          <Text style={styles.text}>Загружаем подходящие для вас смены...</Text>
          {shifts === undefined ? (
            <ActivityIndicator size={'large'} color={'orange'} />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
  },
  placeholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: 16,
    width: '100%',
  },
  itemText: {
    color: 'white',
    textAlign: 'center',
  },
});
