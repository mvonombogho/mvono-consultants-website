"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileEdit, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/common/ConfirmDialog";

type ContentItem = {
  id: string;
  title: string;
  contentType: string;
  description?: string;
  content?: string;
  status: string;
  publishedDate?: string;
  metrics?: any[];
};

type CampaignContentProps = {
  campaignId: string;
  campaignContent: ContentItem[];
};

export default function CampaignContent({ campaignId, campaignContent }: CampaignContentProps) {
  const [content, setContent] = useState<ContentItem[]>(campaignContent || []);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  const confirmDelete = (contentId: string) => {
    setContentToDelete(contentId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!contentToDelete) return;

    try {
      const response = await fetch(`/api/marketing/content/${contentToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      // Remove content from state
      setContent((prev) => prev.filter((item) => item.id !== contentToDelete));

      toast({
        title: "Content deleted",
        description: "The content item has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting content:", error);
      toast({
        title: "Error",
        description: "Failed to delete the content item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setContentToDelete(null);
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: "bg-gray-200 text-gray-800",
      review: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      published: "bg-green-100 text-green-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-200 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Campaign Content</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      {content.length === 0 ? (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Content Found</h3>
            <p className="text-gray-500 mb-4">
              This campaign doesn't have any content items yet. Add your first content to get started.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{item.title}</CardTitle>
                <Badge className={getStatusColor(item.status)} variant="outline">
                  {item.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Content Type</p>
                    <p>{item.contentType}</p>
                  </div>
                  
                  {item.description && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  
                  {item.publishedDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Published Date</p>
                      <p className="text-sm">
                        {format(new Date(item.publishedDate), "PPP")}
                      </p>
                    </div>
                  )}

                  {item.metrics && item.metrics.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Performance</p>
                      <div className="flex gap-4 mt-1">
                        {item.metrics.map((metric, index) => (
                          <div key={index} className="text-center">
                            <p className="text-xl font-semibold">{metric.metricValue}</p>
                            <p className="text-xs text-gray-500">{metric.metricName}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button size="sm" variant="outline">
                      <FileEdit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500"
                      onClick={() => confirmDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Content"
        description="Are you sure you want to delete this content item? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="destructive"
      />
    </div>
  );
}
