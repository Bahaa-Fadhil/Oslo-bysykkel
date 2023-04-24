import { create } from 'zustand';
import { StationsInformation } from '@oslo-bysykkel/shared/web-hooks';

type State = {
  stationData: StationsInformation;
  setStationData: (stationData: StationsInformation) => void;
};
export const useStationData = create<State>((set) => ({
  stationData: [],
  setStationData: (stationData: StationsInformation) =>
    set((state) => ({ ...state, stationData })),
}));
