export default function ProposalStatusBadge({ status }) {
  let styles = '';
  
  switch (status) {
    case 'draft':
      styles = 'bg-gray-100 text-gray-800';
      break;
    case 'sent':
      styles = 'bg-blue-100 text-blue-800';
      break;
    case 'viewed':
      styles = 'bg-indigo-100 text-indigo-800';
      break;
    case 'accepted':
      styles = 'bg-green-100 text-green-800';
      break;
    case 'declined':
      styles = 'bg-red-100 text-red-800';
      break;
    case 'expired':
      styles = 'bg-amber-100 text-amber-800';
      break;
    default:
      styles = 'bg-gray-100 text-gray-800';
  }

  // Format the status for display
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {formattedStatus}
    </span>
  );
}