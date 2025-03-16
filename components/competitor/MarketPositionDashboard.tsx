"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         PieChart, Pie, Cell, LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Sample data for demonstration
const sampleCompetitors = [
  { id: '1', name: 'Mvono Consultants', marketShare: 25, strengths: 'Safety expertise, Local knowledge', weaknesses: 'Limited international presence' },
  { id: '2', name: 'SGS Kenya', marketShare: 30, strengths: 'Global brand, Wide service range', weaknesses: 'Higher prices, Less personalized service' },
  { id: '3', name: 'Bureau Veritas', marketShare: 20, strengths: 'International standards, Brand recognition', weaknesses: 'Slower response times' },
  { id: '4', name: 'Kenyan Safety Services', marketShare: 15, strengths: 'Competitive pricing, Specialization', weaknesses: 'Limited service range' },
  { id: '5', name: 'SafetyFirst EA', marketShare: 10, strengths: 'Growing quickly, Innovative', weaknesses: 'New entrant, Smaller team' },
];

const sampleDeals = [
  { month: 'Jan', won: 4, lost: 3 },
  { month: 'Feb', won: 6, lost: 2 },
  { month: 'Mar', won: 5, lost: 4 },
  { month: 'Apr', won: 8, lost: 1 },
  { month: 'May', won: 7, lost: 3 },
  { month: 'Jun', won: 9, lost: 2 },
];

const sampleStrengthsData = [
  { subject: 'Technical Expertise', A: 90, B: 80, C: 85, fullMark: 100 },
  { subject: 'Customer Service', A: 80, B: 65, C: 75, fullMark: 100 },
  { subject: 'Pricing', A: 70, B: 85, C: 60, fullMark: 100 },
  { subject: 'Response Time', A: 85, B: 60, C: 70, fullMark: 100 },
  { subject: 'Service Range', A: 75, B: 90, C: 80, fullMark: 100 },
  { subject: 'Local Knowledge', A: 95, B: 60, C: 70, fullMark: 100 },
];

// COLORS for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

type CompetitorType = {
  id: string;
  name: string;
  marketShare: number;
  strengths: string;
  weaknesses: string;
};

export default function MarketPositionDashboard() {
  const [competitors, setCompetitors] = useState<CompetitorType[]>([]);
  const [deals, setDeals] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('marketShare');
  
  useEffect(() => {
    // In a real implementation, we'd fetch this from an API
    // fetchMarketPositionData();
    setCompetitors(sampleCompetitors);
    setDeals(sampleDeals);
    setStrengths(sampleStrengthsData);
    setIsLoading(false);
  }, []);
  
  const fetchMarketPositionData = async () => {
    setIsLoading(true);
    try {
      // Fetch competitors
      const competitorsResponse = await fetch('/api/competitor');
      const competitorsData = await competitorsResponse.json();
      setCompetitors(competitorsData);
      
      // Fetch deals
      const dealsResponse = await fetch('/api/deals/win-loss');
      const dealsData = await dealsResponse.json();
      setDeals(dealsData);
      
      // Fetch strengths comparison
      const strengthsResponse = await fetch('/api/competitor/strengths-comparison');
      const strengthsData = await strengthsResponse.json();
      setStrengths(strengthsData);
    } catch (error) {
      console.error('Error fetching market position data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="marketMap">Market Map</TabsTrigger>
          <TabsTrigger value="marketShare">Market Share</TabsTrigger>
          <TabsTrigger value="winLoss">Win/Loss Analysis</TabsTrigger>
          <TabsTrigger value="strengths">Strengths Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketMap" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Market Positioning</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/images/market-position.svg"
                    alt="Market Position Map"
                    width={400}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketShare" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Share Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={competitors}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="marketShare"
                    >
                      {competitors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="winLoss" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deals}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="won" fill="#0088FE" name="Deals Won" />
                    <Bar dataKey="lost" fill="#FF8042" name="Deals Lost" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strengths" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Strengths Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengths}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Mvono Consultants" dataKey="A" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
                    <Radar name="SGS Kenya" dataKey="B" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
                    <Radar name="Bureau Veritas" dataKey="C" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
