import { CSSProperties, MouseEvent as ReactMouseEvent, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ObjectItem } from "mendix";
// Use SheetJS' CommonJS browser build: Mendix packages both AMD and ES module
// bundles, while SheetJS' ESM entry is not compatible with the release transform.
import CoreGrid from "./DynamicDataGridCore";
import { DataGridExcelContainerProps } from "../typings/DataGridExcelProps";
import "./ui/DataGridExcel.css";

function valueFor(item: ObjectItem, mode: string, attribute: any, text: any): string {
    return mode === "dynamicText" ? text?.get(item)?.value ?? "" : attribute?.get(item)?.displayValue ?? "";
}

function dateFilterValue(value: unknown): string {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${value.getFullYear()}-${month}-${day}`;
}

export default function DataGridExcel(props: DataGridExcelContainerProps): ReactElement {
    const [employeeQuery, setEmployeeQuery] = useState("");
    const [cellQueries, setCellQueries] = useState<Record<string, string>>({});
    const [visibleColumnIds, setVisibleColumnIds] = useState<Set<string> | undefined>();
    const [columnMenuOpen, setColumnMenuOpen] = useState(false);
    const [columnMenuPosition, setColumnMenuPosition] = useState({ left: 0, top: 0, maxHeight: 0 });
    const [sortColumnId, setSortColumnId] = useState<string | undefined>();
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const columnMenuRef = useRef<HTMLDivElement>(null);
    const columnMenuPopupRef = useRef<HTMLDivElement>(null);
    const columnMenuButtonRef = useRef<HTMLButtonElement>(null);
    const rowItems = props.dataSourceRow.items ?? [];
    const columnItems = props.dataSourceColumn.items ?? [];
    const cellAttributeType = props.showCellAs === "attribute" ? props.cellAttribute?.type : "String";
    const cellFilterKind = cellAttributeType === "Enum" || cellAttributeType === "Boolean"
        ? "select"
        : cellAttributeType === "DateTime"
          ? "date"
          : ["AutoNumber", "Decimal", "Integer", "Long", "Float", "Currency"].includes(cellAttributeType ?? "")
            ? "number"
            : "text";

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!columnMenuRef.current?.contains(target) && !columnMenuPopupRef.current?.contains(target)) setColumnMenuOpen(false);
        };
        document.addEventListener("mousedown", closeMenu);
        return () => {
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    const filteredRows = useMemo(() => {
        const query = employeeQuery.trim().toLocaleLowerCase();
        const cells = props.dataSourceCell.items ?? [];
        const rows = rowItems.filter(row => {
            const matchesRowHeader = !query || valueFor(row, props.showRowAs, props.rowAttribute, props.rowTextTemplate).toLocaleLowerCase().includes(query);
            if (!matchesRowHeader) return false;
            return Object.entries(cellQueries).every(([columnId, cellQuery]) => {
                const filter = cellQuery.trim().toLocaleLowerCase();
                if (!filter) return true;
                const cell = cells.find(candidate => props.referenceRow.get(candidate).value?.id === row.id && props.referenceColumn.get(candidate).value?.id === columnId);
                if (!cell) return false;
                if (cellFilterKind === "date") return dateFilterValue(props.cellAttribute?.get(cell)?.value) === filter;
                return valueFor(cell, props.showCellAs, props.cellAttribute, props.cellTextTemplate).toLocaleLowerCase().includes(filter);
            });
        });
        if (!props.showSorting || !sortColumnId) return rows;
        const valueToSort = (row: ObjectItem) => {
            if (sortColumnId === "__row__") return valueFor(row, props.showRowAs, props.rowAttribute, props.rowTextTemplate);
            const cell = cells.find(candidate => props.referenceRow.get(candidate).value?.id === row.id && props.referenceColumn.get(candidate).value?.id === sortColumnId);
            return cell ? valueFor(cell, props.showCellAs, props.cellAttribute, props.cellTextTemplate) : "";
        };
        return [...rows].sort((left, right) => valueToSort(left).localeCompare(valueToSort(right), undefined, { numeric: true }) * (sortDirection === "asc" ? 1 : -1));
    }, [rowItems, employeeQuery, cellQueries, props.dataSourceCell, props.referenceRow, props.referenceColumn, props.showCellAs, props.cellAttribute, props.cellTextTemplate, props.showRowAs, props.rowAttribute, props.rowTextTemplate, props.showSorting, sortColumnId, sortDirection]);
    const filteredColumns = useMemo(() => {
        const columns = visibleColumnIds === undefined ? columnItems : columnItems.filter(item => visibleColumnIds.has(item.id));
        return columns;
    }, [columnItems, visibleColumnIds]);
    const toggleColumn = (id: string) => setVisibleColumnIds(current => {
        const next = new Set(current ?? columnItems.map(item => item.id));
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });
    const setCellQuery = (id: string, query: string) => setCellQueries(current => ({ ...current, [id]: query }));
    const exportExcel = () => {
        const cells = props.dataSourceCell.items ?? [];
        const lines = [[props.showRowAs === "none" ? "" : "Employee", ...filteredColumns.map(column => valueFor(column, props.showHeaderAs, props.headerAttribute, props.headerTextTemplate))], ...filteredRows.map(row => [valueFor(row, props.showRowAs, props.rowAttribute, props.rowTextTemplate), ...filteredColumns.map(column => {
            const cell = cells.find(candidate => props.referenceRow.get(candidate).value?.id === row.id && props.referenceColumn.get(candidate).value?.id === column.id);
            return cell ? valueFor(cell, props.showCellAs, props.cellAttribute, props.cellTextTemplate) : "";
        })])];
        const csv = lines.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
        const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "excel-data-grid.csv";
        link.click();
        URL.revokeObjectURL(url);
    };
    const openColumnMenu = () => {
        const bounds = columnMenuButtonRef.current?.getBoundingClientRect();
        if (bounds) {
            const viewportPadding = 12;
            setColumnMenuPosition({
                left: Math.max(viewportPadding, bounds.right - 220),
                top: bounds.bottom + 5,
                maxHeight: Math.max(120, window.innerHeight - bounds.bottom - viewportPadding)
            });
        }
        setColumnMenuOpen(current => !current);
    };
    const columnMenu = columnMenuOpen ? createPortal(<div className="datagrid-excel-tools__columns-menu datagrid-excel-tools__columns-menu--fixed" ref={columnMenuPopupRef} role="menu" aria-label="Visible columns" style={columnMenuPosition}>
        {columnItems.map(column => {
            const isVisible = visibleColumnIds === undefined || visibleColumnIds.has(column.id);
            return <label key={column.id}><input type="checkbox" checked={isVisible} onChange={() => toggleColumn(column.id)} /><span>{valueFor(column, props.showHeaderAs, props.headerAttribute, props.headerTextTemplate) || "Unnamed column"}</span></label>;
        })}
    </div>, document.body) : null;
    const columnPicker = <div className="datagrid-excel-tools__columns" ref={columnMenuRef}>
        <button ref={columnMenuButtonRef} type="button" className="datagrid-excel-tools__columns-button" aria-label="Choose visible columns" aria-expanded={columnMenuOpen} onClick={openColumnMenu}>
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>
        </button>
        {columnMenu}
    </div>;
    const frozenFilterStyle = (column: ObjectItem, index: number) => {
        if (!props.freezeColumn?.get(column).value) return undefined;
        const precedingFrozenColumns = filteredColumns.slice(0, index).filter(item => props.freezeColumn?.get(item).value).length;
        return { background: "#fff", left: `${(props.freezeRowHeader ? props.frozenRowHeaderWidth || 150 : 0) + precedingFrozenColumns * (props.frozenColumnWidth || 150)}px`, minWidth: `${props.frozenColumnWidth || 150}px`, position: "sticky" as const, zIndex: 6 };
    };
    const filterCell = (key: string, label: string, value: string, onChange: (query: string) => void, kind: "text" | "number" | "date" | "select" = "text", options: string[] = [], style?: CSSProperties) => <div className="datagrid-excel-tools__filter-cell" key={key} style={style}>
        {kind === "select"
            ? <select aria-label={`Filter ${label}`} value={value} onChange={event => onChange(event.target.value)}><option value="">All</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select>
            : <input aria-label={`Filter ${label}`} type={kind} placeholder={kind === "date" ? undefined : "Filter..."} value={value} onChange={event => onChange(event.target.value)} />}
    </div>;
    const filterOptionsForColumn = (columnId: string) => Array.from(new Set((props.dataSourceCell.items ?? [])
        .filter(cell => props.referenceColumn.get(cell).value?.id === columnId)
        .map(cell => valueFor(cell, props.showCellAs, props.cellAttribute, props.cellTextTemplate))
        .filter(Boolean))).sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
    const sortFromHeader = (event: ReactMouseEvent<HTMLDivElement>) => {
        if (!props.showSorting || (event.target as HTMLElement).closest("button, input, select")) return;
        const header = (event.target as HTMLElement).closest(".widget-datagrid-grid-head .th, .widget-dynamic-data-grid th");
        if (!header) return;
        const headerBounds = header.getBoundingClientRect();
        if (event.clientX < headerBounds.right - 28) return;
        const headerIndex = Array.prototype.indexOf.call(header.parentElement?.children ?? [], header);
        const columnIndex = headerIndex - (props.showRowAs === "none" ? 0 : 1);
        const nextColumnId = columnIndex === -1 ? "__row__" : filteredColumns[columnIndex]?.id;
        if (!nextColumnId) return;
        setSortDirection(current => sortColumnId === nextColumnId ? (current === "asc" ? "desc" : "asc") : "asc");
        setSortColumnId(nextColumnId);
    };
    const columnFilterRow = <>
        {props.showRowAs !== "none" && (props.showRowFilter
            ? filterCell("row-filter", "employees", employeeQuery, setEmployeeQuery, "text", [], props.freezeRowHeader ? { background: "#fff", left: 0, minWidth: `${props.frozenRowHeaderWidth || 150}px`, position: "sticky", zIndex: 7 } : undefined)
            : <div className="datagrid-excel-tools__filter-cell datagrid-excel-tools__filter-cell--empty" key="row-filter" style={props.freezeRowHeader ? { background: "#fff", left: 0, minWidth: `${props.frozenRowHeaderWidth || 150}px`, position: "sticky", zIndex: 7 } : undefined} />)}
        {filteredColumns.map((column, index) => props.showColumnFilter?.get(column).value ?? true
            ? filterCell(column.id, valueFor(column, props.showHeaderAs, props.headerAttribute, props.headerTextTemplate), cellQueries[column.id] ?? "", query => setCellQuery(column.id, query), cellFilterKind, cellFilterKind === "select" ? filterOptionsForColumn(column.id) : [], frozenFilterStyle(column, index))
            : <div className="datagrid-excel-tools__filter-cell datagrid-excel-tools__filter-cell--empty" key={column.id} style={frozenFilterStyle(column, index)} />)}
        {(props.actionColumns ?? []).map((actionColumn, index) => <div className="datagrid-excel-tools__filter-action-spacer" key={`action-column-spacer-${index}`} style={{ minWidth: `${actionColumn.width || 120}px` }} />)}
        <div className="datagrid-excel-tools__filter-picker" key="column-picker">{columnPicker}</div>
    </>;
    const gridProps = { ...props, dataSourceRow: { ...props.dataSourceRow, items: filteredRows }, dataSourceColumn: { ...props.dataSourceColumn, items: filteredColumns }, columnFilterRow: props.showSearch ? columnFilterRow : undefined };
    return <div className={`datagrid-excel-tools ${props.showSorting ? "datagrid-excel-tools--column-sorting" : ""} ${props.showSearch ? "datagrid-excel-tools--filter-visible" : "datagrid-excel-tools--filters-hidden"} ${(props.actionColumns ?? []).length ? "datagrid-excel-tools--action-column" : ""}`} onClickCapture={sortFromHeader}>
        <div className="datagrid-excel-tools__toolbar">
            {props.showExport && <button type="button" className="datagrid-excel-tools__export" onClick={exportExcel}>Export</button>}
        </div>
        <CoreGrid {...gridProps} />
        {!props.showSearch && <div className="datagrid-excel-tools__header-picker">{columnPicker}</div>}
    </div>;
}
