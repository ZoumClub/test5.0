import { X } from 'lucide-react';
import type { PrivateCarListing } from '../../types/privateListings';

interface ListingModalProps {
  listing: PrivateCarListing;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isUpdating?: boolean;
}

export function ListingModal({ listing, onClose, onApprove, onReject, isUpdating }: ListingModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">
              Car Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <img
                src={listing.image}
                alt={`${listing.make} ${listing.model}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">Client Information</h3>
                <p className="text-gray-600">Name: {listing.client_name}</p>
                <p className="text-gray-600">Phone: {listing.client_phone}</p>
                <p className="text-gray-600">City: {listing.client_city}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Car Information</h3>
                <p className="text-gray-600">
                  {listing.year} {listing.make} {listing.model}
                </p>
                <p className="text-gray-600">Price: £{listing.price.toLocaleString()}</p>
                <p className="text-gray-600">Mileage: {listing.mileage}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Technical Details</h3>
                <p className="text-gray-600">Fuel Type: {listing.fuel_type}</p>
                <p className="text-gray-600">Transmission: {listing.transmission}</p>
                <p className="text-gray-600">Body Type: {listing.body_type}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Additional Details</h3>
                <p className="text-gray-600">Exterior Color: {listing.exterior_color}</p>
                <p className="text-gray-600">Interior Color: {listing.interior_color}</p>
                <p className="text-gray-600">Previous Owners: {listing.number_of_owners}</p>
              </div>
            </div>

            {listing.video_url && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Video</h3>
                <video
                  src={listing.video_url}
                  controls
                  className="w-full rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {listing.status === 'pending' && onApprove && onReject && (
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={onApprove}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={onReject}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}