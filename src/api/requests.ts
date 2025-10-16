import { AxiosResponse } from 'axios';
import { instance } from './instance';
import { ShiftType } from '../types';

export const request = {
  getShifts(coords: {
    latitude: number;
    longitude: number;
  }): Promise<AxiosResponse<{ data: ShiftType[]; status: number }>> {
    return instance.get('shifts/map-list-unauthorized', { params: coords });
  },
};
