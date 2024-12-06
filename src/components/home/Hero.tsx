import { Search } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find your perfect car
          </h1>
          <p className="mt-6 text-xl text-gray-100">
            Compare prices from trusted dealers and get the best deal
          </p>
          
          <div className="mt-10 max-w-xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or type..."
                  className="ml-3 flex-1 outline-none text-gray-700"
                />
                <button className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}