import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type CampaignDetailsProps = {
  campaign: any;
};

export default function CampaignDetails({ campaign }: CampaignDetailsProps) {
  // Helper to format currency
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // Helper to format dates
  const formatDate = (date: string | Date) => {
    return format(new Date(date), "PPP");
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: "bg-gray-200 text-gray-800",
      scheduled: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusMap[status.toLowerCase()] || "bg-gray-200 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge className={getStatusColor(campaign.status)} variant="outline">
                {campaign.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Campaign Type</h3>
              <p>{campaign.campaignType}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
              <p>{formatDate(campaign.startDate)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">End Date</h3>
              <p>{formatDate(campaign.endDate)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Budget</h3>
              <p>{formatCurrency(campaign.budget)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Actual Spent</h3>
              <p>{formatCurrency(campaign.actualSpent)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ROI</h3>
              <p>{campaign.ROI ? `${campaign.ROI}%` : "N/A"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created By</h3>
              <p>{campaign.createdBy?.name || "Unknown"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p>{formatDate(campaign.createdAt)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
              <p>{formatDate(campaign.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {campaign.objective && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Objective</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{campaign.objective}</p>
          </CardContent>
        </Card>
      )}

      {campaign.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{campaign.description}</p>
          </CardContent>
        </Card>
      )}

      {campaign.tags && (
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {campaign.tags.split(',').map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
