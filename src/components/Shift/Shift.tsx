import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ShiftType } from '../../types';
import { Header } from './Header';

interface Props {
  onBack: () => void;
  data: ShiftType;
}

export function Shift({ onBack, data }: Props) {
  const contentData = [
    {
      label: 'Адрес:',
      value: data.address,
    },
    {
      label: 'Рейтинг:',
      value: data.customerRating + ' из 5',
    },
    {
      label: 'Дата начала:',
      value: data.dateStartByCity,
    },
    {
      label: 'Время начала:',
      value: data.timeStartByCity,
    },
    {
      label: 'Время окончания:',
      value: data.timeEndByCity,
    },
    {
      label: 'Отзывов:',
      value: data.customerFeedbacksCount,
    },
    {
      label: 'Необходимо работников:',
      value: data.planWorkers,
    },
    {
      label: 'Набрано работников:',
      value: data.currentWorkers,
    },
    {
      label: 'Оплата:',
      value: data.priceWorker + ' ₽',
    },
  ];

  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Image style={styles.image} source={{ uri: data.logo }} />
        <Text style={styles.company}>{data.companyName}</Text>
        {contentData.map((el, index) => (
          <View style={styles.line} key={index}>
            <Text style={styles.text}>{el.label}</Text>
            <Text style={styles.textSmall}>{el.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  infoContainer: {
    flex: 1,
    gap: 16,
  },
  company: {
    fontSize: 24,
    lineHeight: 24,
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    height: 100,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 16,
  },
  line: {
    width: '100%',
    padding: 14,
    backgroundColor: '#171717ff',
    borderRadius: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 18,
    color: 'white',
  },
  textSmall: {
    fontSize: 16,
    lineHeight: 16,
    color: '#B3B3B3',
  },
});
