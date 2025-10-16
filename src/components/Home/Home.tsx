import { AxiosError } from 'axios';
import { request } from '../../api/requests';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { ShiftType } from '../../types';
import { ShiftItem } from './ShiftItem';

export function Home() {
  const [isRefresh, setIsRefresh] = useState(false);
  const [shifts, setShifts] = useState<ShiftType[] | null>();
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
    getShifts({ latitude: 45.039268, longitude: 38.987221 });
  }, []);

  useEffect(() => {
    if (!isRefresh) return;
    getShifts({ latitude: 45.039268, longitude: 38.987221 });
  }, [isRefresh]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Смены рядом с вами</Text>
      <FlatList
        data={shifts}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <ShiftItem data={item} />}
        keyExtractor={item => item.id}
        refreshing={isRefresh}
        onRefresh={() => {
          setIsRefresh(true);
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
  wrapper: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  contentContainerStyle: { gap: 6 },
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
});
