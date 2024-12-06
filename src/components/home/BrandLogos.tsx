import { useBrands } from '../../hooks/useBrands';

export function BrandLogos() {
  const { data: brands, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Brand</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {brands?.map((brand) => (
            <a
              key={brand.id}
              href={`#${brand.name.toLowerCase()}`}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 mb-4 overflow-hidden rounded-full">
                <img
                  src={brand.logo_url}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-gray-900 font-medium">{brand.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}