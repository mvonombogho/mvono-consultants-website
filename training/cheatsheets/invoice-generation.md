# Invoice Generation Cheatsheet

## Quick Start

1. Navigate to **Financial** > **Invoices**
2. Click **Create Invoice** button
3. Select client from dropdown
4. Add line items
5. Review details
6. Click **Generate Invoice**

## Required Information

- Client (must be in the system)
- Invoice date
- Due date
- Payment terms
- At least one service item
- Tax rate (if applicable)

## Invoice Numbering

- Auto-generated following pattern: MVC-YYYY-XXXX
- YYYY = Current year
- XXXX = Sequential number
- Example: MVC-2024-0042

## Line Item Entry

1. Click **Add Line Item**
2. Select service from dropdown or enter custom description
3. Enter quantity
4. Verify unit price
5. Add notes if needed
6. System calculates line total automatically

## Tax Application

- Select **Apply VAT** to add 16% VAT
- Select **Zero-Rated** for exempt services
- Use **Custom Tax** for special rates
- Tax applies to all line items by default
- Can exempt specific line items via checkbox

## Payment Terms

Common preset terms:
- Due on receipt
- Net 15 days
- Net 30 days
- Net 60 days
- Custom terms available

## Invoice Actions

| Action | Button Location | Description |
|--------|-----------------|-------------|
| Save Draft | Bottom left | Save without finalizing |
| Preview | Bottom right | View before generating |
| Generate | Bottom right | Create final invoice |
| Email | After generation | Send directly to client |
| Download | After generation | Save as PDF |
| Print | After generation | Print hard copy |

## Invoice Status Codes

- **Draft**: Created but not finalized
- **Pending**: Sent but not yet due
- **Overdue**: Past due date, unpaid
- **Partially Paid**: Some payment received
- **Paid**: Fully paid
- **Cancelled**: Voided invoice

## Editing Invoices

- **Draft** invoices: Fully editable
- **Sent** invoices: Create credit note + new invoice
- **Paid** invoices: Cannot be edited

## Including Additional Information

- **LPO Number**: Enter in designated field
- **Project Reference**: Link to specific project
- **Custom Notes**: Add in notes section
- **Special Instructions**: Add at bottom of invoice

## Invoice Templates

- **Standard**: Default company template
- **Detailed**: Includes more service details
- **Simple**: Minimalist design
- **Custom**: Specialized templates

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Client missing | Add client first in Clients section |
| Tax calculation error | Verify tax settings and rates |
| Cannot save invoice | Check for required fields |
| Template not loading | Refresh page or try different browser |
| Number sequence issue | Contact system administrator |