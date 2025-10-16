import { AxiosError } from 'axios';
import { request } from '../api/requests';
import {
  ActivityIndicator,
  FlatList,
  Image,
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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Image
          style={{ borderRadius: 16, height: 75, aspectRatio: 1 }}
          source={{ uri: data.logo }}
        />
        <View style={{ gap: 6, alignItems: 'flex-start' }}>
          <Text style={styles.itemText}>{data.companyName}</Text>
          <Text style={styles.itemTextSmall}>
            {data.dateStartByCity} {data.timeStartByCity}
          </Text>
          <Text style={[styles.itemText, styles.itemsTextOrange]}>
            {data.priceWorker} ₽
          </Text>
        </View>
      </View>
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
      <Text style={styles.text}>Смены рядом с вами</Text>
      <FlatList
        data={shifts}
        contentContainerStyle={{ gap: 6 }}
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
    padding: 10,
    gap: 10,
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
    padding: 10,
    width: '100%',
    backgroundColor: '#171717ff',
    borderRadius: 14,
  },
  itemText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  itemsTextOrange: {
    color: '#FE5900',
  },
  itemTextSmall: {
    fontSize: 16,
    lineHeight: 16,
    color: '#B3B3B3',
  },
});
