
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MapPin, Clock } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  category: string;
  bookingRef: string;
  address: string;
  details: string;
}

interface DayItineraryProps {
  date: string;
  activities: Activity[];
  expandAll?: boolean;
}

const DayItinerary = ({ date, activities, expandAll }: DayItineraryProps) => {
  const [accordionValue, setAccordionValue] = useState<string>("");

  useEffect(() => {
    if (expandAll === true) {
      setAccordionValue(activities.map((_, index) => `item-${index}`).join(","));
    } else if (expandAll === false) {
      setAccordionValue("");
    }
  }, [expandAll, activities]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'flight':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'train':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hotel':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ferry':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'dining':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'sightseeing':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'transport':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'activity':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'travel':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGoogleMapsUrl = (address: string) => {
    if (!address) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <Card className="bg-white shadow-lg border border-gray-200">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {date}
        </h2>
        
        <Accordion 
          type="multiple" 
          value={accordionValue.split(",").filter(Boolean)}
          onValueChange={(value) => setAccordionValue(value.join(","))}
          className="space-y-3"
        >
          {activities.map((activity, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all duration-200"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 text-left border-0">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(activity.category)} text-xs font-medium`}>
                    {activity.category}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-2">
                  {activity.bookingRef && activity.bookingRef.trim() && activity.bookingRef !== 'N/A' && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Booking Reference</h4>
                      <p className="text-sm text-gray-600 font-mono bg-gray-100 p-3 rounded-lg border border-gray-200">
                        {activity.bookingRef}
                      </p>
                    </div>
                  )}
                  
                  {activity.address && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Location</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(getGoogleMapsUrl(activity.address), '_blank')}
                          className="text-xs"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          View on Maps
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{activity.address}</p>
                    </div>
                  )}
                  
                  {activity.details && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Details</h4>
                      <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-100 p-4 rounded-lg border border-gray-200">
                        {activity.details}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default DayItinerary;
