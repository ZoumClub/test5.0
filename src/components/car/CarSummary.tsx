import { Car, Droplets, Users, Shield, Key, Filter } from 'lucide-react';

interface CarSummaryProps {
  bodyType: string;
  exteriorColor: string;
  numberOfOwners: number;
  numberOfKeys?: string;
  interiorColor: string;
  condition: string;
}

export function CarSummary({ 
  bodyType,
  exteriorColor,
  numberOfOwners,
  numberOfKeys = 'n/a',
  interiorColor,
  condition
}: CarSummaryProps) {
  const items = [
    { icon: <Car className="w-5 h-5" />, label: 'Body Type', value: bodyType },
    { icon: <Droplets className="w-5 h-5" />, label: 'Exterior Color', value: exteriorColor },
    { icon: <Users className="w-5 h-5" />, label: 'Number Of Owners', value: numberOfOwners },
    { icon: <Key className="w-5 h-5" />, label: 'Number Of Keys', value: numberOfKeys },
    { icon: <Filter className="w-5 h-5" />, label: 'Interior Color', value: interiorColor },
    { icon: <Shield className="w-5 h-5" />, label: 'Condition', value: condition },
  ];

  return (
    <div className="w-full mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-4 border-blue-600 inline-block">
        Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-gray-600">{item.label}</span>
            </div>
            <span className="font-bold text-gray-900 uppercase">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}