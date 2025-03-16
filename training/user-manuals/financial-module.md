# Financial Module User Guide

## Introduction

The financial module of the Mvono Consultants management system provides powerful tools for managing invoices, tracking expenses, recording payments, and generating financial reports. This guide will help you navigate and utilize these features effectively.

## Accessing the Financial Module

1. Log in to the management system
2. Click on **Financial** in the main navigation sidebar
3. The financial dashboard displays key financial metrics:
   - Outstanding invoices amount
   - Total revenue this month/year
   - Recent payment activity
   - Upcoming invoice due dates
   - Expense summary

## Invoice Management

### Viewing Invoices

1. Navigate to **Financial** > **Invoices**
2. The invoice list displays:
   - Invoice number
   - Client name
   - Issue date
   - Due date
   - Amount
   - Status (Draft, Pending, Paid, Overdue, Partially Paid)
3. Use filters to find specific invoices:
   - By date range
   - By client
   - By status
   - By amount range
4. Click on any invoice to view details

### Creating a New Invoice

1. Navigate to **Financial** > **Invoices**
2. Click the **Create Invoice** button
3. Complete the invoice form:
   - Select client from dropdown
   - Set invoice date
   - Set due date
   - Select payment terms
   - Enter LPO number (if applicable)
   - Add reference number (if applicable)
4. Add line items:
   - Click **Add Item**
   - Select service from dropdown or enter custom description
   - Enter quantity
   - Verify unit price
   - Add item notes if needed
   - System automatically calculates subtotal
5. Apply taxes if applicable:
   - Check **Apply VAT (16%)** box
   - Or select other tax options as needed
6. Add notes or terms at bottom of invoice
7. Click **Preview** to review the invoice
8. Click **Generate Invoice** to create final invoice

### Managing Invoice Status

1. Open the invoice details page
2. Current status is displayed at the top
3. Update status using the status dropdown:
   - **Draft**: Still being prepared, not sent to client
   - **Pending**: Sent to client, awaiting payment
   - **Paid**: Payment received in full
   - **Partially Paid**: Some payment received
   - **Overdue**: Past due date, not paid
   - **Cancelled**: Voided invoice
4. Save status change

### Recording Payments

1. Open the invoice details page
2. Click **Record Payment** button
3. Enter payment details:
   - Payment date
   - Amount received
   - Payment method (Bank Transfer, Cash, Check, Mobile Money)
   - Reference number
   - Notes
4. Click **Save Payment**
5. System will update invoice status automatically based on payment amount

### Sending Invoices to Clients

1. Open the invoice details page
2. Click **Send Invoice** button
3. Review the email template
4. Modify email content if needed
5. Add additional recipients if required
6. Click **Send** to deliver invoice via email

### Downloading and Printing Invoices

1. Open the invoice details page
2. Click **Download** to save as PDF
3. Click **Print** to print directly
4. Click **Export to Excel** for spreadsheet format

## Expense Management

### Recording Expenses

1. Navigate to **Financial** > **Expenses**
2. Click **Add Expense** button
3. Complete the expense form:
   - Date of expense
   - Category (select from dropdown)
   - Amount
   - Description
   - Associate with client/project (optional)
   - Receipt upload (if available)
   - Payment method
   - Notes
4. Click **Save Expense**

### Viewing and Filtering Expenses

1. Navigate to **Financial** > **Expenses**
2. View expense list with details:
   - Date
   - Category
   - Amount
   - Description
   - Associated client/project
3. Filter expenses by:
   - Date range
   - Category
   - Amount range
   - Client/project
   - Payment method

### Expense Reports

1. Navigate to **Financial** > **Expenses** > **Reports**
2. Select report type:
   - Summary by category
   - Summary by client/project
   - Detailed expense report
3. Set parameters:
   - Date range
   - Categories to include
   - Clients to include
4. Click **Generate Report**
5. Download or print report as needed

## Financial Reports

### Available Reports

1. Navigate to **Financial** > **Reports**
2. Select from available report types:
   - **Revenue Report**: Income breakdown by period
   - **Expense Report**: Expense breakdown by category
   - **Profit & Loss**: Simple P&L statement
   - **Client Financial Summary**: Financial status by client
   - **Outstanding Invoices**: List of unpaid invoices
   - **Tax Summary**: Summary of collected taxes
   - **Payment Collection**: Payment history and methods

### Generating Reports

1. Select the desired report type
2. Configure report parameters:
   - Date range
   - Grouping options (daily, weekly, monthly, quarterly, yearly)
   - Clients to include/exclude
   - Categories to include/exclude
3. Click **Generate Report**
4. View the report on screen
5. Export options:
   - PDF download
   - Excel export
   - Print directly
   - Email report

### Scheduled Reports

1. Navigate to **Financial** > **Reports** > **Scheduled Reports**
2. Click **Create Scheduled Report**
3. Select report type and parameters
4. Set schedule:
   - Frequency (daily, weekly, monthly)
   - Delivery day/time
   - Recipients
5. Click **Save Schedule**

## Client Financial Management

### Client Financial Overview

1. Navigate to **Clients** > select a client > **Financial** tab
2. View client financial summary:
   - Total invoiced amount
   - Total paid amount
   - Outstanding balance
   - Average payment time
   - Credit status

### Client Statements

1. Navigate to **Clients** > select a client > **Financial** tab
2. Click **Generate Statement**
3. Set statement parameters:
   - Date range
   - Include paid/unpaid invoices
   - Show payment details
4. Click **Generate Statement**
5. Send statement to client or download as needed

## Best Practices

### Invoice Management

- Create invoices promptly after service delivery
- Use standardized service descriptions from the catalog
- Include detailed information to prevent payment delays
- Follow up on overdue invoices regularly
- Record payments immediately upon receipt

### Expense Tracking

- Record expenses as they occur
- Always upload receipt images when available
- Categorize expenses consistently
- Associate expenses with clients/projects when applicable
- Review expense reports monthly

### Financial Reporting

- Generate monthly revenue reports
- Review outstanding invoices weekly
- Analyze expense categories quarterly
- Use client financial summaries for account reviews
- Export financial data for accounting system as needed

## Troubleshooting

### Common Issues

#### Invoice Generation Errors

- Verify client information is complete
- Ensure all line items have valid prices
- Check that tax settings are configured correctly
- Verify your user permissions include invoice creation

#### Payment Recording Problems

- Check that invoice exists and is in valid status
- Verify payment amount does not exceed invoice balance
- Ensure payment date is valid
- Check that payment method is selected

#### Report Generation Issues

- Try narrowing date range if report times out
- Verify filters are not excluding all data
- Check that you have permission to access the report
- Try generating the report in a different format

### Getting Help

For assistance with the financial module:

- Check the help documentation by clicking the **?** icon
- Contact the system administrator at admin@mvonoconsultants.com
- Email support@mvonoconsultants.com for technical issues
- Call +254 720 270 694 for urgent assistance during business hours