/**
 * This file was generated from DataGridExcel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import {
    DynamicValue,
    ListActionValue,
    ListAttributeValue,
    ListExpressionValue,
    ListReferenceValue,
    ListValue,
    ListWidgetValue
} from "mendix";
import { ComponentType, CSSProperties, ReactNode } from "react";
import { Big } from "big.js";

export type ShowCellAsEnum = "attribute" | "dynamicText";

export type ShowRowAsEnum = "none" | "attribute" | "dynamicText";

export type ShowRowColumnNameAsEnum = "dynamicText";

export type ShowHeaderAsEnum = "none" | "firstRow" | "attribute" | "dynamicText";

export type OnClickTriggerEnum = "single" | "double";

export interface ActionColumnsType {
    caption: string;
    width: number;
    freeze: boolean;
    content: ListWidgetValue;
}

export type RenderAsEnum = "grid" | "table";

export type ShowEmptyPlaceholderEnum = "none";

export type PagingEnum = "none" | "row" | "column";

export type PagingPositionEnum = "bottom" | "top" | "both";

export interface ActionColumnsPreviewType {
    caption: string;
    width: number | null;
    freeze: boolean;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}

export interface DataGridExcelContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSourceCell: ListValue;
    showCellAs: ShowCellAsEnum;
    cellTextTemplate?: ListExpressionValue<string>;
    cellAttribute?: ListAttributeValue<Big | boolean | any | Date | string>;
    tooltipCell?: ListExpressionValue<string>;
    cellClass?: ListExpressionValue<string>;
    referenceRow: ListReferenceValue;
    dataSourceRow: ListValue;
    showRowAs: ShowRowAsEnum;
    rowTextTemplate?: ListExpressionValue<string>;
    rowAttribute?: ListAttributeValue<Big | boolean | any | Date | string>;
    showRowColumnNameAs: ShowRowColumnNameAsEnum;
    rowColumnNameTextTemplate?: DynamicValue<string>;
    tooltipRow?: ListExpressionValue<string>;
    rowClass?: ListExpressionValue<string>;
    referenceColumn: ListReferenceValue;
    dataSourceColumn: ListValue;
    showHeaderAs: ShowHeaderAsEnum;
    headerAttribute?: ListAttributeValue<Big | boolean | any | Date | string>;
    headerTextTemplate?: ListExpressionValue<string>;
    tooltipColumn?: ListExpressionValue<string>;
    columnClass?: ListExpressionValue<string>;
    onClickTrigger: OnClickTriggerEnum;
    onClickRowHeader?: ListActionValue;
    onClickRow?: ListActionValue;
    onClickColumnHeader?: ListActionValue;
    onClickColumn?: ListActionValue;
    onClickCell?: ListActionValue;
    actionColumns: ActionColumnsType[];
    freezeRowHeader: boolean;
    frozenRowHeaderWidth: number;
    freezeColumn?: ListExpressionValue<boolean>;
    frozenColumnWidth: number;
    freezeActionColumns: boolean;
    showRowFilter: boolean;
    showColumnFilter?: ListExpressionValue<boolean>;
    renderAs: RenderAsEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    paging: PagingEnum;
    pagingPosition: PagingPositionEnum;
    pageSize: number;
    pageCell: boolean;
    showSearch: boolean;
    showExport: boolean;
    showSorting: boolean;
}

export interface DataGridExcelPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    dataSourceCell: {} | { caption: string } | { type: string } | null;
    showCellAs: ShowCellAsEnum;
    cellTextTemplate: string;
    cellAttribute: string;
    tooltipCell: string;
    cellClass: string;
    referenceRow: string;
    dataSourceRow: {} | { caption: string } | { type: string } | null;
    showRowAs: ShowRowAsEnum;
    rowTextTemplate: string;
    rowAttribute: string;
    showRowColumnNameAs: ShowRowColumnNameAsEnum;
    rowColumnNameTextTemplate: string;
    tooltipRow: string;
    rowClass: string;
    referenceColumn: string;
    dataSourceColumn: {} | { caption: string } | { type: string } | null;
    showHeaderAs: ShowHeaderAsEnum;
    headerAttribute: string;
    headerTextTemplate: string;
    tooltipColumn: string;
    columnClass: string;
    onClickTrigger: OnClickTriggerEnum;
    onClickRowHeader: {} | null;
    onClickRow: {} | null;
    onClickColumnHeader: {} | null;
    onClickColumn: {} | null;
    onClickCell: {} | null;
    actionColumns: ActionColumnsPreviewType[];
    freezeRowHeader: boolean;
    frozenRowHeaderWidth: number | null;
    freezeColumn: string;
    frozenColumnWidth: number | null;
    freezeActionColumns: boolean;
    showRowFilter: boolean;
    showColumnFilter: string;
    renderAs: RenderAsEnum;
    showEmptyPlaceholder: ShowEmptyPlaceholderEnum;
    paging: PagingEnum;
    pagingPosition: PagingPositionEnum;
    pageSize: number | null;
    pageCell: boolean;
    showSearch: boolean;
    showExport: boolean;
    showSorting: boolean;
}
