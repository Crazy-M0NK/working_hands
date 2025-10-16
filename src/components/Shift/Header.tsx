import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textContainer} onPress={onBack}>
        <Text style={styles.text}>{'<'} Назад</Text>
      </TouchableOpacity>
      <Text style={styles.text}>КАРТОЧКА СМЕНЫ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  textContainer: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    color: 'white',
  },
});
