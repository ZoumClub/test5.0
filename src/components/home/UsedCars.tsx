import { useUsedCars } from '../../hooks/useCars';
import { CarCard } from './CarCard';

export function UsedCars() {
  const { data: cars, isLoading, error } = useUsedCars();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        Failed to load used cars. Please try again later.
      </div>
    );
  }

  if (!cars?.length) {
    return (
      <div className="text-center py-16 text-gray-600">
        No used cars available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Used Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}