import { AxiosError } from 'axios';
import { request } from '../api/requests';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Shift } from '../types';

export function Home() {
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
    }
  };

  useEffect(() => {
    getShifts({ latitude: 45.039268, longitude: 38.987221 });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {shifts === undefined
          ? 'Загружаем подходящие для вас смены...'
          : shifts
          ? 'Смены загружены!'
          : 'Ошибка загрузки.'}
      </Text>
      {shifts === undefined ? <ActivityIndicator size={'large'} /> : null}
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
  },
});
