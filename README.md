# DataGrid Excel

  DataGrid Excel is a flexible Excel-style grid widget for Mendix web applications. It displays dynamic rows and columns from Mendix data sources, making it useful for planning, schedules, timesheets, resource
  allocation, and matrix-style data entry.

  ## Features

  - Dynamic rows, columns, and cells
  - Inline cell editing
  - Row and column filtering
  - Configurable sorting
  - Paging with adjustable page size
  - CSV export of the visible grid
  - Show or hide individual columns
  - Attribute or dynamic-text rendering
  - Dynamic CSS classes and tooltips
  - Row, column, and cell click actions
  - Optional action columns with Mendix widgets
  - Freeze row headers, data columns, and action columns
  - Grid or plain-table rendering

  ## Typical Use Cases

  - Resource and capacity planning
  - Employee timesheets
  - Project and sprint planning
  - Weekly or monthly schedules
  - Budget and financial matrices
  - Product and inventory planning
  - Data-entry matrices
  - Reporting dashboards

  ## Mendix Configuration

  Configure three list data sources:

  - **Cell data source** — the data displayed in each grid cell
  - **Row data source** — the records displayed as row headers
  - **Column data source** — the records displayed as column headers

  Configure the associations from each cell to its corresponding row and column. Then select the attributes or dynamic text templates to display for cells, row headers, and column headers.

  Optional settings include filters, sorting, paging, export, click actions, frozen columns, and action columns.

## Compatibility
- Mendix 11.12.1 or higher
- Web applications
- Offline-capable widget
- No third-party runtime dependencies

## Screenshots

