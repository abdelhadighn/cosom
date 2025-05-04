
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ProductCardProps {
  id: string | number;
  name: string;
  category_id?: string;
  category?: string;
  image_url?: string;
  image?: string;
  description: string;
  brand?: string;
  price?: string;
  isPromoted?: boolean;
  is_promoted?: boolean;
  promotional_price?: string;
  original_price?: string;
}

export function ProductCard({ 
  name, 
  image, 
  image_url,
  description, 
  brand, 
  price, 
  isPromoted = false,
  is_promoted = false,
  original_price
}: ProductCardProps) {
  // Use either is_promoted or isPromoted, whichever is available
  const promoted = isPromoted || is_promoted;
  // Use either image or image_url, whichever is available
  const imageSource = image || image_url;
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <div 
        className={`group rounded-lg overflow-hidden border ${promoted ? 'border-consom shadow-md' : 'border-gray-200'} cursor-pointer`}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img 
            src={imageSource} 
            alt={name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {promoted && (
            <div className="absolute top-2 right-2 bg-consom text-white text-xs font-bold py-1 px-3 rounded-full">
              Promotion
            </div>
          )}
        </div>
        <div className="p-4">
          {brand && (
            <p className="text-xs text-gray-500 uppercase">{brand}</p>
          )}
          <h3 className="font-medium text-base mt-1">{name}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
          
          {promoted && original_price ? (
            <div className="mt-4">
              <p className="text-red-500 line-through text-sm">{original_price} DA</p>
              <p className="text-green-600 font-medium">{price} DA</p>
            </div>
          ) : (
            price && <p className="font-medium mt-4">{price} DA</p>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">{name}</DialogTitle>
            {brand && <p className="text-sm text-gray-500">{brand}</p>}
          </DialogHeader>
          <div className="grid gap-4">
            <div className="aspect-square overflow-hidden rounded-md">
              <img 
                src={imageSource} 
                alt={name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">{description}</p>
              {promoted && original_price ? (
                <div className="mt-4">
                  <p className="text-red-500 line-through">{original_price} DA</p>
                  <p className="text-green-600 font-semibold text-lg">{price} DA</p>
                </div>
              ) : (
                price && <p className="text-lg font-semibold text-consom mt-2">{price} DA</p>
              )}
              {promoted && (
                <div className="text-sm mt-2 bg-consom/10 text-consom inline-block px-3 py-1 rounded-full">
                  Promotion
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
