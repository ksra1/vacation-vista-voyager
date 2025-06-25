
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DayItinerary from "@/components/DayItinerary";
import { ChevronDown, ChevronUp, Plane, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [defaultTab, setDefaultTab] = useState<string>("day-0");

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch('/vacation-vista-voyager/itinerary.json');
        const data: ItineraryData = await response.json();
        
        // Sort the itinerary by date
        const sortedData = {
          ...data,
          itinerary: data.itinerary.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        };
        
        setItineraryData(sortedData);

        // Find today's date or default to first tab
        const today = new Date().toISOString().split('T')[0];
        const todayIndex = sortedData.itinerary.findIndex(day => day.date === today);
        
        if (todayIndex !== -1) {
          setDefaultTab(`day-${todayIndex}`);
        } else {
          setDefaultTab("day-0");
        }
        
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
            Detroit → Paris → Venice → Milan → Lucerne → Grindelwald → Zurich → Munich → Athens → Milos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="mb-8 relative">
            <div className="flex items-center">
              <div className="flex-shrink-0 pr-2">
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </div>
              <ScrollArea className="flex-1">
                <TabsList className="flex w-max bg-white p-1 rounded-xl shadow-md h-auto">
                  {itineraryData.itinerary.map((day, index) => (
                    <TabsTrigger 
                      key={index}
                      value={`day-${index}`} 
                      className="flex flex-col items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-600 rounded-lg min-h-[60px] flex-shrink-0 min-w-[100px]"
                    >
                      <span className="font-semibold">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-xs opacity-75 mt-1">
                        {day.city}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <div className="flex-shrink-0 pl-2">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

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
