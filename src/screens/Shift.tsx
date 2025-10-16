import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types';
import { useTypedNavigation } from '../hooks/useTypedNavigation';
import { Shift } from '../components/Shift';

export function ShiftScreen({
  route,
}: NativeStackScreenProps<StackParamList, 'shift'>) {
  const data = route.params;
  const { goBack } = useTypedNavigation();

  return <Shift onBack={goBack} data={data} />;
}
