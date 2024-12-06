import { Check } from 'lucide-react';

interface Feature {
  name: string;
  available: boolean;
}

interface CarFeaturesProps {
  features: Feature[];
}

export function CarFeatures({ features }: CarFeaturesProps) {
  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600 inline-block">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            {feature.available ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <span className="w-5 h-5 block" />
            )}
            <span className="text-gray-700">{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}