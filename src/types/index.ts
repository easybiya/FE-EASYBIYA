import { Database } from '../../database.types';

export type FeeType = 'DEPOSIT' | 'MONTHLY_RENT' | 'MAINTENANCE_FEE';

export interface PropertyImage {
  imageUrl: string;
  file?: File;
}

export type LeaseType = Database['public']['Enums']['leaseType'];

export const LEASE_TYPE = ['jeonse', 'monthly_rent', 'half_jeonse'] as const;

export type User = Database['public']['Tables']['users']['Row'];

export type Property = Database['public']['Tables']['property']['Row'];

export type PropertyInsert = Database['public']['Tables']['property']['Insert'];

export interface MapProperty {
  id: number;
  name: string;
  address: string;
  address_detail: string;
  lat: number;
  lng: number;
}

export interface Institution {
  institutionName: string;
  institutionAddress: string;
  institutionLatitude: number;
  institutionLongitude: number;
}

export const PropertyPurpose = {
  FIND_HOME: 'find_home',
  FIELD_SURVEY: 'field_survey',
} as const;

export type PropertyPurpose =
  typeof PropertyPurpose[keyof typeof PropertyPurpose];
