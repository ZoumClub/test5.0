import { useQuery } from 'react-query';
import { getCars, getCarsByBrand, getNewCars, getUsedCars } from '../lib/database';
import type { Car } from '../config/supabase';

export function useCars(brandName?: string) {
  return useQuery(
    ['cars', brandName],
    () => brandName ? getCarsByBrand(brandName) : getCars(),
    {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    }
  );
}

export function useNewCars() {
  return useQuery('newCars', getNewCars, {
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}

export function useUsedCars() {
  return useQuery('usedCars', getUsedCars, {
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}