
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
        return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
      case 'train':
        return 'bg-green-500/20 text-green-200 border-green-400/30';
      case 'hotel':
        return 'bg-purple-500/20 text-purple-200 border-purple-400/30';
      case 'ferry':
        return 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30';
      case 'dining':
        return 'bg-orange-500/20 text-orange-200 border-orange-400/30';
      case 'sightseeing':
        return 'bg-pink-500/20 text-pink-200 border-pink-400/30';
      case 'transport':
        return 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30';
      case 'activity':
        return 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30';
      case 'travel':
        return 'bg-teal-500/20 text-teal-200 border-teal-400/30';
      default:
        return 'bg-gray-500/20 text-gray-200 border-gray-400/30';
    }
  };

  const getGoogleMapsUrl = (address: string) => {
    if (!address) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
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
              className="border border-white/20 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-white/10 text-left border-0">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-blue-200">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{activity.title}</h3>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(activity.category)} text-xs font-medium`}>
                    {activity.category}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4 pt-2">
                  {activity.bookingRef && activity.bookingRef !== 'N/A' && (
                    <div>
                      <h4 className="font-medium text-blue-200 mb-2">Booking Reference</h4>
                      <p className="text-sm text-gray-300 font-mono bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                        {activity.bookingRef}
                      </p>
                    </div>
                  )}
                  
                  {activity.address && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-200">Location</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(getGoogleMapsUrl(activity.address), '_blank')}
                          className="text-xs bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          View on Maps
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-300">{activity.address}</p>
                    </div>
                  )}
                  
                  {activity.details && (
                    <div>
                      <h4 className="font-medium text-blue-200 mb-2">Details</h4>
                      <div className="text-sm text-gray-300 whitespace-pre-line bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
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
