
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DayItinerary from "@/components/DayItinerary";
import { ChevronDown, ChevronUp, Plane, MapPin } from "lucide-react";

const Index = () => {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const handleExpandAll = (day: string) => {
    setExpandedDays(prev => ({ ...prev, [day]: true }));
  };

  const handleCollapseAll = (day: string) => {
    setExpandedDays(prev => ({ ...prev, [day]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Plane className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">European Adventure 2025</h1>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Detroit → Venice → Milan → Grindelwald → Munich → Athens → Greek Islands
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="july-2" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-8 bg-white shadow-sm">
            <TabsTrigger value="july-2" className="text-sm">Jul 2</TabsTrigger>
            <TabsTrigger value="july-3" className="text-sm">Jul 3</TabsTrigger>
            <TabsTrigger value="july-4" className="text-sm">Jul 4</TabsTrigger>
            <TabsTrigger value="july-6" className="text-sm">Jul 6</TabsTrigger>
            <TabsTrigger value="july-8" className="text-sm">Jul 8</TabsTrigger>
            <TabsTrigger value="july-9" className="text-sm">Jul 9</TabsTrigger>
            <TabsTrigger value="july-10" className="text-sm">Jul 10</TabsTrigger>
            <TabsTrigger value="july-11" className="text-sm">Jul 11</TabsTrigger>
          </TabsList>

          <TabsContent value="july-2" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-2")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-2")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 2, 2025"
              activities={[
                {
                  time: "Departure",
                  title: "Detroit To Venice",
                  category: "Flight",
                  bookingRef: "Delta Reference: HAFBMC",
                  address: "",
                  details: "Flight from Detroit to Venice, Italy"
                },
                {
                  time: "Check-in",
                  title: "Hotel Grand Carlton",
                  category: "Hotel",
                  bookingRef: "Priceline: 784-525-885-17 :: 4929039618",
                  address: "Santa Croce 578, Venice, Italy 30135",
                  details: "2-night stay at Hotel Grand Carlton in Venice"
                }
              ]}
              expandAll={expandedDays["july-2"]}
            />
          </TabsContent>

          <TabsContent value="july-3" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-3")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-3")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 3, 2025"
              activities={[
                {
                  time: "6:15 AM",
                  title: "Arrive at CDG",
                  category: "Flight",
                  bookingRef: "Flight Delta 96 from DTW",
                  address: "CDG Airport (Terminal 2E)",
                  details: "Follow 'Arrivals' signs. Check flight number on screens. Busy terminal."
                },
                {
                  time: "7:20 AM - 8:00 AM",
                  title: "Taxi to Trocadéro",
                  category: "Transport",
                  bookingRef: "Cost: €50-60 (Apple Pay)",
                  address: "Place du Trocadéro",
                  details: "Board taxi at Terminal 2E taxi stand. Drop off at Place du Trocadéro (near Palais de Chaillot). ~40 min journey."
                },
                {
                  time: "8:05 AM - 9:35 AM",
                  title: "Breakfast at Café Constant",
                  category: "Dining",
                  bookingRef: "Cost: €40-48 (Apple Pay)",
                  address: "135 Rue Saint-Dominique, Paris",
                  details: "Kid-friendly menu with pastries and omelettes. Cozy bistro known for classic French dishes."
                },
                {
                  time: "9:40 AM - 10:40 AM",
                  title: "Eiffel Tower view at Trocadéro Gardens",
                  category: "Sightseeing",
                  bookingRef: "Free",
                  address: "Trocadéro Gardens, Paris",
                  details: "Scenic spot with stunning Eiffel Tower views, ideal for photos and relaxing."
                },
                {
                  time: "10:55 AM - 11:55 AM",
                  title: "View Louvre Pyramid (outside)",
                  category: "Sightseeing",
                  bookingRef: "Free",
                  address: "Louvre Pyramid, Place du Carrousel, Paris",
                  details: "Iconic glass pyramid in the Louvre's courtyard, a modern architectural landmark."
                },
                {
                  time: "12:10 PM - 1:40 PM",
                  title: "Lunch at Café des Marronniers",
                  category: "Dining",
                  bookingRef: "Cost: €60 (Apple Pay)",
                  address: "Jardin des Tuileries, Paris",
                  details: "Outdoor seating with kid-friendly sandwiches and salads. Charming café with garden views."
                },
                {
                  time: "1:45 PM - 3:15 PM",
                  title: "Dinner at Le Soufflé",
                  category: "Dining",
                  bookingRef: "Cost: €80 (Apple Pay)",
                  address: "36 Rue du Mont Thabor, Paris",
                  details: "Kid-friendly menu with sweet and savory soufflés. Elegant bistro famous for its signature soufflés."
                },
                {
                  time: "4:05 PM - 5:45 PM",
                  title: "Flight to Venice",
                  category: "Flight",
                  bookingRef: "Flight Delta 8356",
                  address: "CDG to VCE (Marco Polo Airport)",
                  details: "Board by 3:45 PM. ~1h 40m flight. Prepare for Venice arrival."
                }
              ]}
              expandAll={expandedDays["july-3"]}
            />
          </TabsContent>

          <TabsContent value="july-4" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-4")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-4")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 4, 2025"
              activities={[
                {
                  time: "Departure",
                  title: "Venice to Milan",
                  category: "Train",
                  bookingRef: "XJTRUN",
                  address: "",
                  details: "Train journey from Venice to Milan"
                },
                {
                  time: "Check-in",
                  title: "Milan - NH Collection Porta Nuova",
                  category: "Hotel",
                  bookingRef: "Booking.com: 4672668380 | 9260",
                  address: "Via Melchiorre Gioia 6, Garibaldi Station, 20124 Milan, Italy",
                  details: "2-night stay at NH Collection Porta Nuova in Milan"
                }
              ]}
              expandAll={expandedDays["july-4"]}
            />
          </TabsContent>

          <TabsContent value="july-6" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-6")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-6")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 6, 2025"
              activities={[
                {
                  time: "10:00 AM",
                  title: "Train from Milan to Grindelwald",
                  category: "Train",
                  bookingRef: "Multiple tickets - See details",
                  address: "Milano Centrale → Luzern → Interlaken Ost → Grindelwald",
                  details: `Route: Milano Centrale to Luzern
Date: 06/07/2025
Time: Depart 10:10, Arrive 13:41
Train: EuroCity 178, 2nd Class, Coach 17, Seats 31, 32, 33, 38
Passengers: Saanvi Kollapudi (Child) + 3 others
Fare: Total €240.00
PNR: 3CEZV5

Route: Luzern to Interlaken Ost
Date: 06/07/2025
Time: Depart 14:06, Arrive 15:54
Train: PE2928, 2nd Class
Total: CHF 72.00

Route: Interlaken Ost to Grindelwald
Date: 06/07/2025
Total: CHF 35.40`
                },
                {
                  time: "Check-in",
                  title: "Eiger Mountain & Soul Resort",
                  category: "Hotel",
                  bookingRef: "Priceline: 788-948-295-17 :: 4561639090",
                  address: "Grindelwald, Switzerland",
                  details: `2-night stay with breakfast included

Adventure Activities Available:
• First Cliff Walk & Flyer at Grindelwald First - Suspended walkway and zipline with Eiger views
• Bachalpsee Lake hike from Grindelwald First - Stunning alpine lake reflecting Schreckhorn
• Glacier Gorge (Gletscherschlucht) walkway - Walk through dramatic glacier-carved canyon

July weather: Ideal, clear weather with comfortable temperatures`
                }
              ]}
              expandAll={expandedDays["july-6"]}
            />
          </TabsContent>

          <TabsContent value="july-8" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-8")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-8")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 8, 2025"
              activities={[
                {
                  time: "11:00 AM",
                  title: "Train from Grindelwald to Munich",
                  category: "Train",
                  bookingRef: "SBB + DB tickets",
                  address: "Grindelwald → Zürich HB → München Hbf",
                  details: "SBB Grindelwald-Zürich HB (flexible, no reservations); DB Zürich HB-München Hbf (1st class, train EC 195, coach 2, seats 93-96, 15:33-19:04)"
                },
                {
                  time: "Check-in",
                  title: "Novotel München City Arnulfpark",
                  category: "Hotel",
                  bookingRef: "Priceline: 790-150-755-17 :: 4311482997",
                  address: "Munich, Germany",
                  details: "2-night stay at Novotel München City Arnulfpark"
                }
              ]}
              expandAll={expandedDays["july-8"]}
            />
          </TabsContent>

          <TabsContent value="july-9" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-9")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-9")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 9, 2025"
              activities={[
                {
                  time: "9:00 AM",
                  title: "Day Trip to Innsbruck",
                  category: "Train",
                  bookingRef: "Return journey",
                  address: "Munich → Innsbruck → Munich",
                  details: "Train from Munich to Innsbruck. Start around 9:00 AM and return on same night around 8:00 PM"
                }
              ]}
              expandAll={expandedDays["july-9"]}
            />
          </TabsContent>

          <TabsContent value="july-10" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-10")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-10")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 10, 2025"
              activities={[
                {
                  time: "Departure",
                  title: "Athens Flight",
                  category: "Flight",
                  bookingRef: "Aegean Airlines: PKYIF7",
                  address: "",
                  details: "Flight from Munich to Athens"
                },
                {
                  time: "Check-in",
                  title: "Grand Hyatt Athens",
                  category: "Hotel",
                  bookingRef: "Priceline trip #: 831-046-835-16 :: 875797974",
                  address: "Athens, Greece",
                  details: "1-night stay with breakfast included at Grand Hyatt Athens"
                }
              ]}
              expandAll={expandedDays["july-10"]}
            />
          </TabsContent>

          <TabsContent value="july-11" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExpandAll("july-11")}
                className="flex items-center gap-2"
              >
                <ChevronDown className="w-4 h-4" />
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCollapseAll("july-11")}
                className="flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse All
              </Button>
            </div>
            <DayItinerary 
              date="July 11-13, 2025"
              activities={[
                {
                  time: "9:00 AM",
                  title: "Ferry to Milos",
                  category: "Ferry",
                  bookingRef: "",
                  address: "",
                  details: "Ferry from Athens to Milos island"
                },
                {
                  time: "Check-in",
                  title: "Arco Sollium Suites",
                  category: "Hotel",
                  bookingRef: "Priceline: 831-129-125-16 :: 5831936329",
                  address: "Milos, Greece",
                  details: "1-night stay at Arco Sollium Suites in Milos"
                },
                {
                  time: "July 12 - 11:00 AM",
                  title: "Ferry back to Athens",
                  category: "Ferry",
                  bookingRef: "",
                  address: "",
                  details: "Return ferry from Milos to Athens"
                },
                {
                  time: "July 12 Check-in",
                  title: "Athenaeum Eridanus Luxury Hotel",
                  category: "Hotel",
                  bookingRef: "Priceline: 830-974-425-18 :: 6608714765",
                  address: "Athens, Greece",
                  details: "1-night stay with breakfast included"
                },
                {
                  time: "July 13",
                  title: "Athens to Detroit",
                  category: "Flight",
                  bookingRef: "Turkish Reference: S67J58",
                  address: "",
                  details: "Return flight to Detroit"
                }
              ]}
              expandAll={expandedDays["july-11"]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
