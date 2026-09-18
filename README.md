# Data Grid Excel for Mendix

`datagridExcel` is a Mendix web pluggable widget that matches the installed Dynamic Data Grid under the `DataGridExcel` package identity.

It uses the Dynamic Data Grid's cell, row, and column data sources, reference associations, display modes, dynamic classes and tooltips, click actions, rendering choices, paging, and empty placeholder.

## Build

1. Run `npm install` in this folder.
2. Run `npm run release`.
3. Synchronize the Mendix app directory. The output is `widgets/com.testwidgets.DataGridExcel.mpk`.

Configure **Data source**, **Column 1 attribute**, and its caption in Studio Pro. Columns 2–6 are optional. In-cell edits call Mendix `setTextValue`, so normal widget validation and access rules apply.
