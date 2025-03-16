'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  ChevronDown,
  ChevronUp,
  Filter,
  Calendar
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import MarketPositionModal from '@/components/market-position/MarketPositionModal';

export default function MarketPositionPage() {
  const [marketData, setMarketData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarketPosition, setSelectedMarketPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [industries, setIndustries] = useState([]);
  const [years, setYears] = useState([]);
  const { toast } = useToast();

  // Fetch market position data
  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/market-position');
      const data = await response.json();
      
      if (data.success) {
        setMarketData(data.marketPositions);
        
        // Extract unique industries and years
        const uniqueIndustries = [...new Set(data.marketPositions.map(item => item.industry))];
        const uniqueYears = [...new Set(data.marketPositions.map(item => item.year))];
        
        setIndustries(uniqueIndustries);
        setYears(uniqueYears.sort((a, b) => b - a)); // Sort years in descending order
        
        // Set default selections
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0].toString()); // Select most recent year by default
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch market position data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching market position data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch market position data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const handleCreateMarketPosition = () => {
    setSelectedMarketPosition(null);
    setIsModalOpen(true);
  };

  const handleSelectMarketPosition = (position) => {
    setSelectedMarketPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMarketPosition(null);
  };

  const handleSaveMarketPosition = async (marketData) => {
    try {
      const url = marketData.id 
        ? `/api/market-position/${marketData.id}` 
        : '/api/market-position';
      
      const method = marketData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: marketData.id 
            ? "Market position updated successfully" 
            : "Market position created successfully",
        });
        setIsModalOpen(false);
        fetchMarketData();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save market position",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving market position:", error);
      toast({
        title: "Error",
        description: "Failed to save market position",
        variant: "destructive",
      });
    }
  };

  // Filter market data based on selected year and industry
  const filteredMarketData = marketData.filter(item => {
    const yearMatch = selectedYear === 'all' || item.year.toString() === selectedYear;
    const industryMatch = selectedIndustry === 'all' || item.industry === selectedIndustry;
    return yearMatch && industryMatch;
  });

  // Get most recent data for market summary
  const getLatestMarketData = () => {
    if (!marketData.length) return null;
    
    // Group by industry and get the most recent data for each
    const industryGroups = {};
    
    marketData.forEach(item => {
      if (!industryGroups[item.industry] || 
          (item.year > industryGroups[item.industry].year || 
           (item.year === industryGroups[item.industry].year && 
            item.quarter > industryGroups[item.industry].quarter))) {
        industryGroups[item.industry] = item;
      }
    });
    
    return Object.values(industryGroups);
  };

  const latestMarketData = getLatestMarketData();
  
  // Prepare data for charts
  const prepareMarketShareData = () => {
    if (!filteredMarketData.length) return [];
    
    // For pie chart, we'll use the most recent data
    let mostRecentData = [...filteredMarketData];
    mostRecentData.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.quarter - a.quarter;
    });
    
    // Take the first item (most recent) or filter by selected industry
    const dataToUse = selectedIndustry !== 'all' 
      ? mostRecentData.find(item => item.industry === selectedIndustry)
      : mostRecentData[0];
    
    if (!dataToUse) return [];
    
    // Parse topCompetitors JSON
    let competitors = [];
    try {
      competitors = JSON.parse(dataToUse.topCompetitors);
    } catch (error) {
      console.error("Error parsing competitors data:", error);
      competitors = []; 
    }
    
    // Create pie chart data
    const pieData = [
      { name: 'Mvono Consultants', value: dataToUse.companyShare },
      ...competitors.map(comp => ({ name: comp.name, value: comp.share }))
    ];
    
    return pieData;
  };

  const prepareTrendData = () => {
    if (!filteredMarketData.length) return [];
    
    // Only use data for the selected industry or all if none selected
    const relevantData = selectedIndustry !== 'all' 
      ? filteredMarketData.filter(item => item.industry === selectedIndustry)
      : filteredMarketData;
    
    // Sort by year and quarter
    relevantData.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.quarter - b.quarter;
    });
    
    // Create trend data with year-quarter as x-axis
    return relevantData.map(item => ({
      period: `${item.year} Q${item.quarter}`,
      marketShare: item.companyShare,
      marketSize: item.marketSize / 1000000, // Convert to millions
      growth: item.growthRate
    }));
  };

  const marketShareData = prepareMarketShareData();
  const trendData = prepareTrendData();
  
  // Colors for pie chart
  const COLORS = ['#2563eb', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
  
  // Calculate summary statistics
  const calculateSummaryStats = () => {
    if (!latestMarketData || !latestMarketData.length) return {};
    
    const totalMarketSize = latestMarketData.reduce((sum, item) => sum + item.marketSize, 0);
    const avgMarketShare = latestMarketData.reduce((sum, item) => sum + item.companyShare, 0) / latestMarketData.length;
    const avgGrowthRate = latestMarketData.reduce((sum, item) => sum + item.growthRate, 0) / latestMarketData.length;
    
    let dominantIndustry = '';
    let highestShare = 0;
    
    latestMarketData.forEach(item => {
      if (item.companyShare > highestShare) {
        highestShare = item.companyShare;
        dominantIndustry = item.industry;
      }
    });
    
    return {
      totalMarketSize,
      avgMarketShare,
      avgGrowthRate,
      dominantIndustry,
      highestShare
    };
  };

  const summaryStats = calculateSummaryStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Market Position Dashboard</h1>
        <Button onClick={handleCreateMarketPosition} className="flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Add Market Data</span>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : latestMarketData && latestMarketData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Total Market Size</span>
                  <span className="text-2xl font-bold">${(summaryStats.totalMarketSize / 1000000).toFixed(2)}M</span>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Avg. Market Share</span>
                  <span className="text-2xl font-bold">{summaryStats.avgMarketShare.toFixed(1)}%</span>
                </div>
                <PieChart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Avg. Growth Rate</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{summaryStats.avgGrowthRate.toFixed(1)}%</span>
                    {summaryStats.avgGrowthRate > 0 ? (
                      <ChevronUp className="h-5 w-5 text-green-500 ml-1" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-red-500 ml-1" />
                    )}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Strongest Industry</span>
                  <span className="text-2xl font-bold">{summaryStats.dominantIndustry}</span>
                  <span className="text-xs text-muted-foreground">{summaryStats.highestShare.toFixed(1)}% market share</span>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground pb-4">No market position data available. Add your first entry to get started.</p>
              <Button onClick={handleCreateMarketPosition} className="flex items-center gap-2 mx-auto">
                <PlusCircle size={16} />
                <span>Add Market Data</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {marketData.length > 0 && (
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Year" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Industry" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {filteredMarketData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Share Distribution</CardTitle>
              <CardDescription>
                {selectedIndustry !== 'all' 
                  ? `${selectedIndustry} industry` 
                  : 'Most recent data'
                }
                {selectedYear !== 'all' && ` - ${selectedYear}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Share Trend</CardTitle>
              <CardDescription>
                {selectedIndustry !== 'all' 
                  ? `${selectedIndustry} industry` 
                  : 'All industries average'
                }
                {selectedYear !== 'all' && ` - ${selectedYear}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="marketShare"
                      name="Market Share (%)"
                      stroke="#2563eb"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="growth"
                      name="Growth Rate (%)"
                      stroke="#10b981"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Industry Market Size</CardTitle>
              <CardDescription>
                Market size in millions ($)
                {selectedYear !== 'all' && ` - ${selectedYear}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}M`} />
                    <Legend />
                    <Bar
                      dataKey="marketSize"
                      name="Market Size ($M)"
                      fill="#8884d8"
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {isModalOpen && (
        <MarketPositionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveMarketPosition}
          marketPosition={selectedMarketPosition}
        />
      )}
    </div>
  );
}
