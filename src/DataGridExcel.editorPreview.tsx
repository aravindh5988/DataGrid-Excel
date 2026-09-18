import { ReactElement } from "react";
import { DataGridExcelPreviewProps } from "../typings/DataGridExcelProps";
import "./ui/DataGridExcel.css";

export function preview(_props: DataGridExcelPreviewProps): ReactElement {
  return <div className="widget-dynamic-data-grid"><table><thead><tr><th>Metric</th><th>January</th><th>February</th></tr></thead><tbody><tr><td>Revenue</td><td>120</td><td>145</td></tr><tr><td>Cost</td><td>75</td><td>84</td></tr></tbody></table></div>;
}
export function getPreviewCss(): string { return require("./ui/DataGridExcel.css"); }
