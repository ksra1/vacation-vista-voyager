
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import DayItinerary from "@/components/DayItinerary";
import { ChevronDown, ChevronUp, Plane, MapPin, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  const [defaultTab, setDefaultTab] = useState<string>("day-0");
  const [headerExpanded, setHeaderExpanded] = useState(false);

  const cities = ["Detroit", "Paris", "Venice", "Milan", "Lucerne", "Grindelwald", "Zurich", "Munich", "Athens", "Milos"];

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        console.log('Starting fetch from: /vacation-vista-voyager/itinerary.json');
        const response = await fetch('/vacation-vista-voyager/itinerary.json');
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch itinerary: ${response.status} ${response.statusText}`);
        }
        
        const data: ItineraryData = await response.json();
        console.log('Raw data received:', data);
        
        if (!data || !data.itinerary) {
          throw new Error('Invalid data structure received');
        }
        
        // Sort the itinerary by date
        const sortedData = {
          ...data,
          itinerary: data.itinerary.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        };
        
        console.log('Sorted data:', sortedData);
        setItineraryData(sortedData);

        // Find today's date or default to first tab
        const today = new Date().toISOString().split('T')[0];
        const todayIndex = sortedData.itinerary.findIndex(day => day.date === today);
        
        if (todayIndex !== -1) {
          setDefaultTab(`day-${todayIndex}`);
          console.log(`Setting default tab to today: day-${todayIndex}`);
        } else {
          setDefaultTab("day-0");
          console.log('Today not found, defaulting to day-0');
        }
        
      } catch (error) {
        console.error('Error loading itinerary data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-blue-800 text-xl font-medium">Loading your adventure...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-600 text-xl mb-4 font-medium">Error loading itinerary</div>
          <div className="text-gray-600 mb-6">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!itineraryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-blue-800 text-xl font-medium">No itinerary data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Light Header - Not Sticky */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-xl shadow-md">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-800">European Adventure</h1>
                  <p className="text-sm text-blue-600">2025</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHeaderExpanded(!headerExpanded)}
                className="text-blue-700 hover:bg-blue-50"
              >
                {headerExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Expandable Route Display */}
            {headerExpanded && (
              <div className="mt-4 animate-accordion-down">
                <div className="flex flex-wrap gap-2">
                  {cities.map((city, index) => (
                    <div key={city} className="flex items-center">
                      <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-700 border border-blue-200">
                        {city}
                      </span>
                      {index < cities.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-blue-400 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-md">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-blue-800">European Adventure 2025</h1>
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin className="w-4 h-4" />
                <div className="flex items-center gap-2 flex-wrap">
                  {cities.map((city, index) => (
                    <div key={city} className="flex items-center">
                      <span className="px-2 py-1 bg-blue-100 rounded-lg text-sm border border-blue-200 hover:bg-blue-150 transition-colors">
                        {city}
                      </span>
                      {index < cities.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-blue-400 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue={defaultTab} className="w-full">
          {/* Sticky Tabs Navigation */}
          <div className="mb-8 relative sticky top-0 z-50 bg-white/90 backdrop-blur-sm py-4 border-b border-blue-200">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <ScrollArea className="flex-1">
                <TabsList className="flex w-max bg-white shadow-lg p-1 rounded-2xl h-auto border border-blue-200">
                  {itineraryData.itinerary.map((day, index) => (
                    <TabsTrigger 
                      key={index}
                      value={`day-${index}`} 
                      className="flex flex-col items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md text-blue-600 rounded-xl min-h-[60px] flex-shrink-0 min-w-[100px] border border-transparent data-[state=active]:border-blue-300 hover:bg-blue-50"
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
              <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
            </div>
          </div>

          {itineraryData.itinerary.map((day, index) => (
            <TabsContent key={index} value={`day-${index}`} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExpandAll(`day-${index}`)}
                  className="flex items-center gap-2 bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                >
                  <ChevronDown className="w-4 h-4" />
                  Expand All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCollapseAll(`day-${index}`)}
                  className="flex items-center gap-2 bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
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
