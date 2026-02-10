import { LeaseType } from '@/types';
import { create } from 'zustand';

export interface PropertyData {
  lease_type: LeaseType;
  deposit: number;
  monthly_fee: number;
  maintenance_fee: number;
  available_date: string;
  name: string;
  address: string;
  address_detail: string;
  lat: number;
  lng: number;
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
    lease_type: 'monthly_rent',
    deposit: 0,
    monthly_fee: 0,
    maintenance_fee: 0,
    available_date: '',
    name: '',
    address: '',
    address_detail: '',
    lat: 0,
    lng: 0,
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
        lease_type: 'monthly_rent',
        deposit: 0,
        monthly_fee: 0,
        maintenance_fee: 0,
        available_date: '',
        name: '',
        address: '',
        address_detail: '',
        lat: 0,
        lng: 0,
      },
      images: [],
    }),
}));
