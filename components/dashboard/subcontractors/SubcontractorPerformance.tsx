"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Star, ShieldCheck, PieChart, Users } from 'lucide-react';
import { format } from 'date-fns';

type WorkHistoryItem = {
  id: string;
  date: string;
  description: string;
};

type PerformanceMetrics = {
  completionRate: number;
  onTimePercentage: number;
  qualityScore: number;
  safetyIncidents: number;
  clientSatisfaction: number;
};

type Props = {
  subcontractorId: string;
  performanceMetrics: PerformanceMetrics;
  workHistory: WorkHistoryItem[];
};

export default function SubcontractorPerformance({ 
  subcontractorId, 
  performanceMetrics, 
  workHistory 
}: Props) {
  const { completionRate, onTimePercentage, qualityScore, safetyIncidents, clientSatisfaction } = performanceMetrics;

  // Function to get color based on score percentage
  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return 'text-green-500';
    if (percentage >= 75) return 'text-blue-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Function to get progress color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Convert 5-star rating to percentage
  const ratingToPercentage = (rating: number) => (rating / 5) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 flex items-baseline">
              <span className={getColorClass(completionRate)}>{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" indicatorClassName={getProgressColor(completionRate)} />
            <p className="text-xs text-muted-foreground mt-2">Percentage of projects successfully completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              <span className={getColorClass(onTimePercentage)}>{onTimePercentage}%</span>
            </div>
            <Progress value={onTimePercentage} className="h-2" indicatorClassName={getProgressColor(onTimePercentage)} />
            <p className="text-xs text-muted-foreground mt-2">Percentage of deliverables completed on schedule</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 flex items-baseline">
              <span className={getColorClass(ratingToPercentage(clientSatisfaction))}>{clientSatisfaction}</span>
              <span className="text-sm text-muted-foreground ml-1">/5</span>
            </div>
            <Progress 
              value={ratingToPercentage(clientSatisfaction)} 
              className="h-2" 
              indicatorClassName={getProgressColor(ratingToPercentage(clientSatisfaction))} 
            />
            <p className="text-xs text-muted-foreground mt-2">Average rating from client feedback</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2 flex items-baseline">
              <span className={getColorClass(ratingToPercentage(qualityScore))}>{qualityScore}</span>
              <span className="text-sm text-muted-foreground ml-1">/5</span>
            </div>
            <Progress 
              value={ratingToPercentage(qualityScore)} 
              className="h-2" 
              indicatorClassName={getProgressColor(ratingToPercentage(qualityScore))} 
            />
            <p className="text-xs text-muted-foreground mt-2">Average quality rating of delivered work</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Safety Record</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              <span className="text-green-500">{safetyIncidents}</span>
            </div>
            <p className="text-xs text-muted-foreground">Safety incidents reported in the last 12 months</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workHistory.length > 0 ? (
              workHistory.map((item) => (
                <div key={item.id} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-0.5 bg-border"></div>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {item.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(item.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent activity recorded</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}