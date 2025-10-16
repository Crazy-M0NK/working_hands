import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTypedNavigation } from '../../hooks/useTypedNavigation';
import { ShiftType } from '../../types';

export const ShiftItem = ({ data }: { data: ShiftType }) => {
  const { navigate } = useTypedNavigation();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigate('shift', data)}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: data.logo }} />
        <View style={styles.content}>
          <Text style={styles.text}>{data.companyName}</Text>
          <Text style={styles.textSmall}>
            {data.dateStartByCity} {data.timeStartByCity}
          </Text>
          <Text style={[styles.text, styles.textOrange]}>
            {data.priceWorker} ₽
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    width: '100%',
    backgroundColor: '#171717ff',
    borderRadius: 14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    borderRadius: 16,
    height: 75,
    aspectRatio: 1,
  },
  content: { gap: 6, alignItems: 'flex-start' },
  text: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  textOrange: {
    color: '#FE5900',
  },
  textSmall: {
    fontSize: 16,
    lineHeight: 16,
    color: '#B3B3B3',
  },
});
