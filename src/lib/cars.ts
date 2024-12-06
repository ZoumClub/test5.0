import { supabase } from '../config/supabase';
import type { Car } from '../config/supabase';

export async function getCars() {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        *,
        brand:brands (
          id,
          name,
          logo_url
        ),
        images:car_images (
          id,
          image_url,
          display_order
        ),
        features:car_features (
          id,
          name,
          available
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
}

export async function getCar(id: string) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        *,
        brand:brands (
          id,
          name,
          logo_url
        ),
        images:car_images (
          id,
          image_url,
          display_order
        ),
        features:car_features (
          id,
          name,
          available
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
}

export async function createCar(car: Omit<Car, 'id' | 'created_at' | 'updated_at' | 'brand'>) {
  try {
    const { features, ...carData } = car;
    
    // First create the car
    const { data: newCar, error: carError } = await supabase
      .from('cars')
      .insert([carData])
      .select()
      .single();

    if (carError) throw carError;

    // Then manage its features
    if (features && features.length > 0) {
      const { error: featuresError } = await supabase
        .rpc('manage_car_features', {
          p_car_id: newCar.id,
          p_features: features
        });

      if (featuresError) throw featuresError;
    }

    return newCar;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
}

export async function updateCar(id: string, updates: Partial<Car>) {
  try {
    const { features, ...carData } = updates;
    
    // First update the car
    const { data: updatedCar, error: carError } = await supabase
      .from('cars')
      .update(carData)
      .eq('id', id)
      .select()
      .single();

    if (carError) throw carError;

    // Then manage its features
    if (features && features.length > 0) {
      const { error: featuresError } = await supabase
        .rpc('manage_car_features', {
          p_car_id: id,
          p_features: features
        });

      if (featuresError) throw featuresError;
    }

    return updatedCar;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
}

export async function deleteCar(id: string) {
  try {
    const { error } = await supabase
      .from('cars')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
}

export async function addCarImages(carId: string, imageUrls: string[]) {
  try {
    const { data: existingImages } = await supabase
      .from('car_images')
      .select('display_order')
      .eq('car_id', carId)
      .order('display_order', { ascending: false })
      .limit(1);

    const startOrder = (existingImages?.[0]?.display_order ?? -1) + 1;

    const images = imageUrls.map((url, index) => ({
      car_id: carId,
      image_url: url,
      display_order: startOrder + index
    }));

    const { error } = await supabase
      .from('car_images')
      .insert(images);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding car images:', error);
    throw error;
  }
}