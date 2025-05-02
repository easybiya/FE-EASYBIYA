import { create } from 'zustand';

interface PropertyData {
  leaseType: 'JEONSE' | 'BANJEONSE' | 'MONTHLY_RENT' | '';
  deposit: number | null;
  monthlyFee: number | null;
  maintenanceFee: number | null;
  availableDate: string;
  propertyName: string;
  propertyAddress: string;
  propertyDetailedAddress: string;
  propertyLatitude: number | null;
  propertyLongitude: number | null;
}

interface PropertyStore {
  property: PropertyData;
  images: File[];
  setProperty: (data: Partial<PropertyData>) => void;
  setImages: (files: File[]) => void;
  resetAll: () => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  property: {
    leaseType: '',
    deposit: null,
    monthlyFee: null,
    maintenanceFee: null,
    availableDate: '',
    propertyName: '',
    propertyAddress: '',
    propertyDetailedAddress: '',
    propertyLatitude: null,
    propertyLongitude: null,
  },
  images: [],
  setProperty: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        ...data,
      },
    })),
  setImages: (files) => set({ images: files }),
  resetAll: () =>
    set({
      property: {
        leaseType: '',
        deposit: null,
        monthlyFee: null,
        maintenanceFee: null,
        availableDate: '',
        propertyName: '',
        propertyAddress: '',
        propertyDetailedAddress: '',
        propertyLatitude: null,
        propertyLongitude: null,
      },
      images: [],
    }),
}));
