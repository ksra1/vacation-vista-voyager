
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DayItinerary from "@/components/DayItinerary";
import { ChevronDown, ChevronUp, Plane, MapPin } from "lucide-react";

interface Activity {
  time: string;
  activity: string;
  location: string;
  mapLink: string | string[];
  directions: string[];
  transportation: string[];
  thingsToDo: string[];
  ticketsToBuy: string[];
  costsAndNotes: string[];
  type: string[];
}

interface ItineraryDay {
  city: string;
  date: string;
  activities: Activity[];
}

interface ItineraryData {
  itinerary: ItineraryDay[];
}

const Index = () => {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch('/vacation-vista-voyager/itinerary.json');
        const data: ItineraryData = await response.json();
        setItineraryData(data);
      } catch (error) {
        console.error('Error loading itinerary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, []);

  const handleExpandAll = (day: string) => {
    setExpandedDays(prev => ({ ...prev, [day]: true }));
  };

  const handleCollapseAll = (day: string) => {
    setExpandedDays(prev => ({ ...prev, [day]: false }));
  };

  const convertActivityToLegacyFormat = (activity: Activity) => {
    const mapLink = Array.isArray(activity.mapLink) ? activity.mapLink.join('') : activity.mapLink;
    
    return {
      time: activity.time,
      title: activity.activity,
      category: activity.type[0] || 'activity',
      bookingRef: activity.ticketsToBuy.join(', ') || '',
      address: activity.location,
      details: [
        ...activity.thingsToDo,
        ...activity.directions,
        ...activity.transportation,
        ...activity.costsAndNotes
      ].join('\n\n')
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading your adventure...</div>
      </div>
    );
  }

  if (!itineraryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-800 text-xl">Failed to load itinerary data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              European Adventure 2025
            </h1>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Detroit → Venice → Milan → Grindelwald → Munich → Athens → Greek Islands
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue={`day-0`} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-8 bg-white p-2 rounded-xl shadow-md">
            {itineraryData.itinerary.map((day, index) => (
              <TabsTrigger 
                key={index}
                value={`day-${index}`} 
                className="text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-600 border-0 rounded-lg transition-all duration-200 hover:bg-gray-100"
              >
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </TabsTrigger>
            ))}
          </TabsList>

          {itineraryData.itinerary.map((day, index) => (
            <TabsContent key={index} value={`day-${index}`} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExpandAll(`day-${index}`)}
                  className="flex items-center gap-2"
                >
                  <ChevronDown className="w-4 h-4" />
                  Expand All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCollapseAll(`day-${index}`)}
                  className="flex items-center gap-2"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse All
                </Button>
              </div>
              <DayItinerary 
                date={`${day.date} - ${day.city}`}
                activities={day.activities.map(convertActivityToLegacyFormat)}
                expandAll={expandedDays[`day-${index}`]}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
