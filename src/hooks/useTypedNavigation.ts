import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types';

export const useTypedNavigation = () =>
  useNavigation<NativeStackNavigationProp<StackParamList>>();
