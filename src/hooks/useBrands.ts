import { useQuery } from 'react-query';
import { getBrands } from '../lib/database';

export interface Brand {
  id: string;
  name: string;
  logo_url: string;
  created_at: string;
}

export function useBrands() {
  return useQuery('brands', getBrands, {
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 3,
  });
}