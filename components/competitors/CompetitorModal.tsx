'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { 
  Building2, 
  FileText, 
  Globe, 
  TrendingUp, 
  ListChecks,
  Briefcase,
  ShieldAlert,
  PlusCircle,
  BarChart3
} from 'lucide-react';

interface CompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  competitor?: any | null;
}

const CompetitorModal = ({ isOpen, onClose, onSave, competitor }: CompetitorModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    website: '',
    industry: '',
    description: '',
    strengths: '',
    weaknesses: '',
    services: '',
    marketShare: null as number | null,
    isActive: true,
    newNote: '',
    newNoteTitle: '',
  });
  const [competitorDetails, setCompetitorDetails] = useState(null);

  // Initialize form data if competitor is provided
  useEffect(() => {
    if (competitor) {
      setFormData({
        id: competitor.id || '',
        name: competitor.name || '',
        website: competitor.website || '',
        industry: competitor.industry || '',
        description: competitor.description || '',
        strengths: competitor.strengths || '',
        weaknesses: competitor.weaknesses || '',
        services: competitor.services || '',
        marketShare: competitor.marketShare || null,
        isActive: competitor.isActive !== undefined ? competitor.isActive : true,
        newNote: '',
        newNoteTitle: '',
      });
      
      // If we have an ID, fetch the complete competitor details with notes and deals
      if (competitor.id) {
        fetchCompetitorDetails(competitor.id);
      }
    } else {
      // Reset form for new competitor
      setFormData({
        id: '',
        name: '',
        website: '',
        industry: '',
        description: '',
        strengths: '',
        weaknesses: '',
        services: '',
        marketShare: null,
        isActive: true,
        newNote: '',
        newNoteTitle: '',
      });
      setCompetitorDetails(null);
    }
  }, [competitor]);

  const fetchCompetitorDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/competitors/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setCompetitorDetails(data.competitor);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch competitor details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching competitor details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch competitor details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    setFormData((prev) => ({ ...prev, [name]: isNaN(parsedValue) ? null : parsedValue }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Competitor name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    onSave(formData);
    setIsLoading(false);
  };

  const handleAddNote = () => {
    if (!formData.newNote) {
      toast({
        title: "Error",
        description: "Note content is required",
        variant: "destructive",
      });
      return;
    }

    // Update the formData with the note, which will be sent along with the competitor data during onSave
    setFormData(prev => ({
      ...prev,
      newNoteTitle: formData.newNoteTitle || `Note about ${formData.name}`,
    }));

    // Submit the form with the note
    handleSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{competitor ? 'Edit Competitor' : 'Add Competitor'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Building2 size={16} />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notes" 
              className="flex items-center gap-2"
              disabled={!competitor}
            >
              <FileText size={16} />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="deals" 
              className="flex items-center gap-2"
              disabled={!competitor}
            >
              <Briefcase size={16} />
              <span>Deal Opportunities</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter competitor name"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="Enter industry"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="marketShare">Market Share (%)</Label>
                  <Input
                    id="marketShare"
                    name="marketShare"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.marketShare !== null ? formData.marketShare : ''}
                    onChange={handleNumberChange}
                    placeholder="Enter estimated market share"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description of the competitor"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="services">Services (comma-separated)</Label>
                <Textarea
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="e.g., Safety Audits, Environmental Assessment, Energy Audit"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">List services separated by commas</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="strengths">Key Strengths (comma-separated)</Label>
                  <Textarea
                    id="strengths"
                    name="strengths"
                    value={formData.strengths}
                    onChange={handleInputChange}
                    placeholder="e.g., Strong Brand, Innovative, Low Prices"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="weaknesses">Key Weaknesses (comma-separated)</Label>
                  <Textarea
                    id="weaknesses"
                    name="weaknesses"
                    value={formData.weaknesses}
                    onChange={handleInputChange}
                    placeholder="e.g., Slow Response Time, Limited Coverage, Higher Prices"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Active Competitor</Label>
              </div>
              
              {competitor && (
                <div className="grid grid-cols-1 gap-2 pt-4 border-t">
                  <Label htmlFor="newNote">Add Note</Label>
                  <Input
                    id="newNoteTitle"
                    name="newNoteTitle"
                    value={formData.newNoteTitle}
                    onChange={handleInputChange}
                    placeholder="Note title (optional)"
                    className="mb-2"
                  />
                  <Textarea
                    id="newNote"
                    name="newNote"
                    value={formData.newNote}
                    onChange={handleInputChange}
                    placeholder="Enter note about this competitor"
                    rows={3}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2 w-fit"
                    onClick={handleAddNote}
                  >
                    <PlusCircle size={16} />
                    <span>Add Note</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notes">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Loading notes...</p>
              </div>
            ) : competitorDetails && competitorDetails.notes?.length > 0 ? (
              <div className="space-y-4 py-4">
                {competitorDetails.notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(note.createdAt), 'MMM dd, yyyy')}
                        </div>
                      </div>
                      <CardDescription>
                        By {note.createdBy?.name || 'Unknown'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="pt-4">
                  <Label htmlFor="modalNewNote">Add New Note</Label>
                  <Input
                    id="modalNewNoteTitle"
                    name="newNoteTitle"
                    value={formData.newNoteTitle}
                    onChange={handleInputChange}
                    placeholder="Note title (optional)"
                    className="mb-2 mt-1"
                  />
                  <Textarea
                    id="modalNewNote"
                    name="newNote"
                    value={formData.newNote}
                    onChange={handleInputChange}
                    placeholder="Enter note about this competitor"
                    rows={3}
                    className="mt-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2 w-fit mt-2"
                    onClick={handleAddNote}
                  >
                    <PlusCircle size={16} />
                    <span>Add Note</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No notes found for this competitor.</p>
                <div className="mt-4">
                  <Label htmlFor="emptyNewNote">Add First Note</Label>
                  <Input
                    id="emptyNewNoteTitle"
                    name="newNoteTitle"
                    value={formData.newNoteTitle}
                    onChange={handleInputChange}
                    placeholder="Note title (optional)"
                    className="mb-2 mt-1"
                  />
                  <Textarea
                    id="emptyNewNote"
                    name="newNote"
                    value={formData.newNote}
                    onChange={handleInputChange}
                    placeholder="Enter note about this competitor"
                    rows={3}
                    className="mt-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2 w-fit mt-2"
                    onClick={handleAddNote}
                  >
                    <PlusCircle size={16} />
                    <span>Add Note</span>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="deals">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Loading deal opportunities...</p>
              </div>
            ) : competitorDetails && competitorDetails.dealOpportunities?.length > 0 ? (
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Deal Opportunities vs. This Competitor</h3>
                  <div className="space-y-2">
                    {competitorDetails.dealOpportunities.map((deal) => (
                      <Card key={deal.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{deal.title}</CardTitle>
                            <Badge 
                              variant="outline" 
                              className={
                                deal.status === 'won' 
                                  ? 'bg-green-100 text-green-800' 
                                  : deal.status === 'lost' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>
                            Client: {deal.client?.name || 'Unknown'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Value:</span> ${deal.value?.toLocaleString() || 'N/A'}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Win Probability:</span> {deal.winProbability ? `${deal.winProbability}%` : 'N/A'}
                            </div>
                            {deal.closingDate && (
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Closing Date:</span> {format(new Date(deal.closingDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No deal opportunities found involving this competitor.</p>
                <p className="text-sm mt-2">Deal opportunities will appear here when this competitor is added to deals in the sales pipeline.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === 'details' && (
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : (competitor ? 'Update' : 'Create')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitorModal;
