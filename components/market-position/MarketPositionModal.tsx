'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MarketPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  marketPosition?: any | null;
}

const MarketPositionModal = ({ isOpen, onClose, onSave, marketPosition }: MarketPositionModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    year: new Date().getFullYear(),
    quarter: 1,
    industry: '',
    marketSize: 0,
    companyShare: 0,
    growthRate: 0,
    competitors: [{ name: '', share: 0 }],
    notes: '',
  });

  // Generate years (current year - 5 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);
  
  // Generate quarters
  const quarters = [1, 2, 3, 4];

  // Initialize form data if marketPosition is provided
  useEffect(() => {
    if (marketPosition) {
      let competitorsParsed = [{ name: '', share: 0 }];
      
      try {
        if (marketPosition.topCompetitors) {
          competitorsParsed = JSON.parse(marketPosition.topCompetitors);
        }
      } catch (error) {
        console.error("Error parsing competitors data:", error);
      }
      
      setFormData({
        id: marketPosition.id || '',
        year: marketPosition.year || currentYear,
        quarter: marketPosition.quarter || 1,
        industry: marketPosition.industry || '',
        marketSize: marketPosition.marketSize || 0,
        companyShare: marketPosition.companyShare || 0,
        growthRate: marketPosition.growthRate || 0,
        competitors: competitorsParsed.length > 0 ? competitorsParsed : [{ name: '', share: 0 }],
        notes: marketPosition.notes || '',
      });
    } else {
      // Reset form for new market position
      setFormData({
        id: '',
        year: currentYear,
        quarter: getCurrentQuarter(),
        industry: '',
        marketSize: 0,
        companyShare: 0,
        growthRate: 0,
        competitors: [{ name: '', share: 0 }],
        notes: '',
      });
    }
  }, [marketPosition]);

  // Helper function to get the current quarter
  const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    if (month <= 3) return 1;
    if (month <= 6) return 2;
    if (month <= 9) return 3;
    return 4;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = parseFloat(value);
    
    // Ensure values are not negative
    if (isNaN(parsedValue)) parsedValue = 0;
    if (parsedValue < 0) parsedValue = 0;
    
    // For market share and growth rate, ensure they're not above reasonable limits
    if ((name === 'companyShare' || name.includes('share')) && parsedValue > 100) {
      parsedValue = 100;
    }
    
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompetitorNameChange = (index, value) => {
    const updatedCompetitors = [...formData.competitors];
    updatedCompetitors[index].name = value;
    setFormData((prev) => ({ ...prev, competitors: updatedCompetitors }));
  };

  const handleCompetitorShareChange = (index, value) => {
    const updatedCompetitors = [...formData.competitors];
    let parsedValue = parseFloat(value);
    
    // Ensure values are not negative or above 100%
    if (isNaN(parsedValue)) parsedValue = 0;
    if (parsedValue < 0) parsedValue = 0;
    if (parsedValue > 100) parsedValue = 100;
    
    updatedCompetitors[index].share = parsedValue;
    setFormData((prev) => ({ ...prev, competitors: updatedCompetitors }));
  };

  const addCompetitor = () => {
    setFormData((prev) => ({
      ...prev,
      competitors: [...prev.competitors, { name: '', share: 0 }]
    }));
  };

  const removeCompetitor = (index) => {
    if (formData.competitors.length <= 1) {
      return; // Keep at least one competitor
    }
    
    const updatedCompetitors = [...formData.competitors];
    updatedCompetitors.splice(index, 1);
    setFormData((prev) => ({ ...prev, competitors: updatedCompetitors }));
  };

  const handleSave = () => {
    if (!formData.industry) {
      toast({
        title: "Error",
        description: "Industry is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.marketSize <= 0) {
      toast({
        title: "Error",
        description: "Market size must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty competitors
    const validCompetitors = formData.competitors.filter(comp => comp.name.trim() !== '');
    
    // Calculate total market share
    const totalShare = formData.companyShare + validCompetitors.reduce((sum, comp) => sum + comp.share, 0);
    
    if (totalShare > 100) {
      toast({
        title: "Warning",
        description: "Total market share exceeds 100%. This may indicate an error in your data.",
      });
    }

    // Prepare data for saving
    const dataToSave = {
      ...formData,
      topCompetitors: JSON.stringify(validCompetitors)
    };
    
    setIsLoading(true);
    onSave(dataToSave);
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{marketPosition ? 'Edit Market Position' : 'Add Market Position'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="year">Year</Label>
              <Select 
                value={formData.year.toString()} 
                onValueChange={(value) => handleSelectChange('year', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="quarter">Quarter</Label>
              <Select 
                value={formData.quarter.toString()} 
                onValueChange={(value) => handleSelectChange('quarter', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map(quarter => (
                    <SelectItem key={quarter} value={quarter.toString()}>Q{quarter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Enter industry (e.g., Safety Consulting, Energy Management)"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="marketSize">Market Size ($)</Label>
              <Input
                id="marketSize"
                name="marketSize"
                type="number"
                min="0"
                step="1000"
                value={formData.marketSize}
                onChange={handleNumberChange}
                placeholder="Total market size in $"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="companyShare">Company Market Share (%)</Label>
              <Input
                id="companyShare"
                name="companyShare"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.companyShare}
                onChange={handleNumberChange}
                placeholder="Enter market share percentage"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="growthRate">Growth Rate (%)</Label>
              <Input
                id="growthRate"
                name="growthRate"
                type="number"
                step="0.1"
                value={formData.growthRate}
                onChange={handleNumberChange}
                placeholder="Market growth rate"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label>Top Competitors</Label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {formData.competitors.map((competitor, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6">
                        <Input
                          placeholder="Competitor name"
                          value={competitor.name}
                          onChange={(e) => handleCompetitorNameChange(index, e.target.value)}
                        />
                      </div>
                      <div className="col-span-4">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="Market share %"
                          value={competitor.share}
                          onChange={(e) => handleCompetitorShareChange(index, e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCompetitor(index)}
                          disabled={formData.competitors.length <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={addCompetitor}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Competitor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes or observations"
              rows={3}
            />
          </div>
          
          <div className="border-t pt-4 mt-2">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">Total Market Share:</span>{' '}
                {(formData.companyShare + formData.competitors.reduce((sum, comp) => sum + parseFloat(comp.share.toString()), 0)).toFixed(1)}%
              </div>
              {formData.companyShare > 0 && (
                <div>
                  <span className="font-medium">Mvono Share:</span>{' '}
                  {formData.companyShare.toFixed(1)}%
                </div>
              )}
              {formData.competitors.some(comp => comp.name && comp.share > 0) && (
                <div>
                  <span className="font-medium">Competitors Share:</span>{' '}
                  {formData.competitors.reduce((sum, comp) => sum + parseFloat(comp.share.toString()), 0).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : (marketPosition ? 'Update' : 'Create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPositionModal;
