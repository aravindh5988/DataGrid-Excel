// @ts-nocheck
// The runtime behavior and property model intentionally mirror the installed
// Dynamic Data Grid widget while retaining this widget's own Mendix identity.
import {
  createElement as e,
  Fragment as l,
  useState as t,
  useEffect as o,
  useCallback as n,
} from "react";
function i(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var r,
  a = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ var d,
  s =
    (r ||
      ((r = 1),
      (d = a),
      (function () {
        var e = {}.hasOwnProperty;
        function l() {
          for (var e = "", l = 0; l < arguments.length; l++) {
            var n = arguments[l];
            n && (e = o(e, t(n)));
          }
          return e;
        }
        function t(t) {
          if ("string" == typeof t || "number" == typeof t) return t;
          if ("object" != typeof t) return "";
          if (Array.isArray(t)) return l.apply(null, t);
          if (
            t.toString !== Object.prototype.toString &&
            !t.toString.toString().includes("[native code]")
          )
            return t.toString();
          var n = "";
          for (var i in t) e.call(t, i) && t[i] && (n = o(n, i));
          return n;
        }
        function o(e, l) {
          return l ? (e ? e + " " + l : e + l) : e;
        }
        d.exports
          ? ((l.default = l), (d.exports = l))
          : (window.classNames = l);
      })()),
    a.exports),
  u = i(s);
function c(l) {
  if ("grid" === l.renderAs) {
    const t = {
      "--widgets-grid-template-columns": "150px ".repeat(l.columnCount),
    };
    return e(
      "div",
      { className: u(l.className, "widget-dynamic-data-grid"), style: l.style },
      e(
        "div",
        { className: "widget-datagrid-top-bar table-header" },
        l.paging &&
          ("top" === l.pagingPosition || "both" === l.pagingPosition) &&
          l.pagination
      ),
      e(
        "div",
        { className: "widget-datagrid-content" },
        e(
          "div",
          { className: "widget-datagrid-grid table", role: "grid", style: t },
          l.children
        )
      ),
      e(
        "div",
        { className: "widget-datagrid-footer table-footer" },
        l.paging &&
          ("bottom" === l.pagingPosition || "both" === l.pagingPosition) &&
          l.pagination
      )
    );
  }
  return e(
    "table",
    { className: u(l.className, "widget-dynamic-data-grid"), style: l.style },
    l.children
  );
}
function g(t) {
  return "grid" === t.renderAs
    ? e(
        "div",
        { className: "widget-datagrid-grid-head", role: "rowgroup" },
        t.children
      )
    : e(l, null, t.children);
}
function v(t) {
  return "grid" === t.renderAs
    ? e(
        "div",
        {
          className: "widget-datagrid-grid-body table-content",
          role: "rowgroup",
        },
        t.children
      )
    : e(l, null, t.children);
}
function m(l) {
  const {
    onClick: t,
    clickTrigger: o,
    className: n,
    tooltipText: r,
    children: a,
    renderAs: d,
    style: s,
  } = l;
  return "grid" === d
    ? e(
        "div",
        {
          className: u("th", n, { clickable: !!t }),
          role: "columnheader",
          title: r,
          style: s,
          onClick: "single" === o ? t : void 0,
          onDoubleClick: "double" === o ? t : void 0,
        },
        e(
          "div",
          { className: "column-container" },
          e("div", { className: "column-header align-column-left" }, a)
        )
      )
    : e(
        "th",
        {
          className: u(n, { clickable: !!t }),
          title: r,
          style: s,
          onClick: "single" === o ? t : void 0,
          onDoubleClick: "double" === o ? t : void 0,
        },
        a
      );
}
function p(e, l) {
  const { tooltipColumn: t } = e;
  let o = "";
  return l
    ? ((o =
        null !==
          (n =
            null == t || null === (i = t.get(l)) || void 0 === i
              ? void 0
              : i.value) && void 0 !== n
          ? n
          : " "),
      o)
    : " ";
  var n, i;
}
function B(t, column, index) {
  if (!(null == t.freezeColumn ? void 0 : t.freezeColumn.get(column).value)) return void 0;
  const priorFrozen = (t.dataSourceColumn.items || []).slice(0, index).filter(item => t.freezeColumn.get(item).value).length;
  return { background: "#fff", left: "".concat((t.freezeRowHeader ? t.frozenRowHeaderWidth || 150 : 0) + priorFrozen * (t.frozenColumnWidth || 150), "px"), minWidth: "".concat(t.frozenColumnWidth || 150, "px"), position: "sticky", zIndex: 3 };
}
function E(t, actionColumn, index) {
  const isFrozen = actionColumn.freeze || t.freezeActionColumns;
  if (!isFrozen) return { minWidth: "".concat(actionColumn.width || 120, "px") };
  const right = (t.actionColumns || []).slice(index + 1).filter(item => item.freeze || t.freezeActionColumns).reduce((total, item) => total + (item.width || 120), 0);
  return { background: "#fff", minWidth: "".concat(actionColumn.width || 120, "px"), position: "sticky", right: "".concat(right, "px"), zIndex: 4 };
}
function f(t) {
  var o, n;
  const {
      dataSourceColumn: i,
      showRowAs: r,
      showRowColumnNameAs: a,
      rowColumnNameWidgets: d,
      columnClass: s,
    } = t,
    {
      onClickTrigger: u,
      onClickColumnHeader: c,
      onClickColumn: g,
      rowColumnNameTextTemplate: v,
      renderAs: f,
    } = t,
    w =
      null !==
        (o =
          null === (n = i.items) || void 0 === n
            ? void 0
            : n.map((l, index) => {
                var o;
                const n =
                  l && c
                    ? () => (null == c ? void 0 : c.get(l).execute())
                    : g
                    ? () => (null == g ? void 0 : g.get(l).execute())
                    : void 0;
                return e(
                  m,
                  {
                    className:
                      null !== (o = null == s ? void 0 : s.get(l).value) &&
                      void 0 !== o
                        ? o
                        : "",
                    tooltipText: p(t, l),
                    clickTrigger: u,
                    onClick: n,
                    key: l.id,
                    renderAs: f,
                    style: B(t, l, index),
                  },
                  (function (e, l) {
                    const {
                      headerAttribute: t,
                      headerWidgets: o,
                      headerTextTemplate: n,
                      showHeaderAs: i,
                    } = e;
                    let r = "";
                    if (!l) return " ";
                    var a, d;
                    if ("attribute" === i)
                      r =
                        null !==
                          (a =
                            null == t || null === (d = t.get(l)) || void 0 === d
                              ? void 0
                              : d.displayValue) && void 0 !== a
                          ? a
                          : " ";
                    else if ("dynamicText" === i) {
                      var s, u;
                      r =
                        null !==
                          (s =
                            null == n || null === (u = n.get(l)) || void 0 === u
                              ? void 0
                              : u.value) && void 0 !== s
                          ? s
                          : " ";
                    } else r = "custom" === i ? o.get(l) : "n/a";
                    return r;
                  })(t, l)
                );
              })) && void 0 !== o
        ? o
        : [];
  if ("none" !== r) {
    var C;
    const l =
      "dynamicText" === a
        ? null !== (C = null == v ? void 0 : v.value) && void 0 !== C
          ? C
          : ""
        : d;
    null == w || w.unshift(e(m, { key: "row_header", renderAs: f, style: t.freezeRowHeader ? { background: "#fff", left: 0, minWidth: "".concat(t.frozenRowHeaderWidth || 150, "px"), position: "sticky", zIndex: 5 } : void 0 }, l));
  }
  (t.actionColumns || []).forEach((actionColumn, index) => {
    w.push(
      e(
        m,
        {
          key: "action_column_header_".concat(index),
          renderAs: f,
          style: E(t, actionColumn, index),
        },
        actionColumn.caption || "Action"
      )
    );
  });
  t.columnFilterRow &&
    w.push(e(m, { className: "datagrid-excel-tools__column-picker-header", key: "column_selector_header", renderAs: f }, ""));
  return e(l, null, w);
}
function w(l) {
  return "grid" === l.renderAs
    ? e("div", { className: u("tr", l.className), role: "row" }, l.children)
    : e("tr", { className: l.className }, l.children);
}
function C(l) {
  const {
    onClick: t,
    clickTrigger: o,
    className: n,
    tooltipText: r,
    children: a,
    renderAs: d,
    style: s,
  } = l;
  return "grid" === d
    ? e(
        "div",
        {
          className: u("td", n, {
            "td-borders": 0 === l.rowIndex,
            clickable: !!t,
          }),
          role: t ? "button" : "gridcell",
          title: r,
          style: s,
          onClick: "single" === o ? t : void 0,
          onDoubleClick: "double" === o ? t : void 0,
          tabIndex: t ? 0 : void 0,
          onKeyDown: t
            ? (e) => {
                ("Enter" !== e.key && " " !== e.key) ||
                  e.target !== e.currentTarget ||
                  !t ||
                  (e.preventDefault(), t());
              }
            : void 0,
        },
        a
      )
    : e(
        "td",
        {
          className: n,
          title: r,
          style: s,
          onClick: "single" === o ? t : void 0,
          onDoubleClick: "double" === o ? t : void 0,
          tabIndex: t ? 0 : void 0,
          onKeyDown: t
            ? (e) => {
                ("Enter" !== e.key && " " !== e.key) ||
                  e.target !== e.currentTarget ||
                  !t ||
                  (e.preventDefault(), t());
              }
            : void 0,
        },
        a
      );
}
function b(e, l) {
  const {
    cellAttribute: t,
    cellWidgets: o,
    cellTextTemplate: n,
    showCellAs: i,
  } = e;
  let r = "";
  if (!l) return " ";
  var a, d;
  if ("attribute" === i)
    r =
      null !==
        (a =
          null == t || null === (d = t.get(l)) || void 0 === d
            ? void 0
            : d.displayValue) && void 0 !== a
        ? a
        : " ";
  else if ("dynamicText" === i) {
    var s, u;
    r =
      null !==
        (s =
          null == n || null === (u = n.get(l)) || void 0 === u
            ? void 0
            : u.value) && void 0 !== s
        ? s
        : " ";
  } else r = "custom" === i ? o.get(l) : "n/a";
  return r;
}
function h(e, l) {
  const { tooltipCell: t } = e;
  let o = "";
  return l
    ? ((o =
        null !==
          (n =
            null == t || null === (i = t.get(l)) || void 0 === i
              ? void 0
              : i.value) && void 0 !== n
          ? n
          : " "),
      o)
    : " ";
  var n, i;
}
function y(e, l) {
  const { tooltipRow: t } = e;
  let o = "";
  return l
    ? ((o =
        null !==
          (n =
            null == t || null === (i = t.get(l)) || void 0 === i
              ? void 0
              : i.value) && void 0 !== n
          ? n
          : " "),
      o)
    : " ";
  var n, i;
}
function k(e, l) {
  const {
    rowAttribute: t,
    rowWidgets: o,
    rowTextTemplate: n,
    showRowAs: i,
  } = e;
  let r = "";
  if (!l) return " ";
  var a, d;
  if ("attribute" === i)
    r =
      null !==
        (a =
          null == t || null === (d = t.get(l)) || void 0 === d
            ? void 0
            : d.displayValue) && void 0 !== a
        ? a
        : " ";
  else if ("dynamicText" === i) {
    var s, u;
    r =
      null !==
        (s =
          null == n || null === (u = n.get(l)) || void 0 === u
            ? void 0
            : u.value) && void 0 !== s
        ? s
        : " ";
  } else r = "custom" === i ? o.get(l) : "n/a";
  return r;
}
function x(t) {
  var o, n;
  const {
      dataSourceCell: i,
      referenceRow: r,
      referenceColumn: a,
      dataSourceColumn: d,
      renderAs: s,
      pageCell: c,
    } = t,
    { showRowAs: g, columnClass: v, cellClass: p } = t,
    { row: f, rowIndex: w, isHeader: x, loading: N } = t,
    {
      onClickTrigger: P,
      onClickRow: A,
      onClickCell: T,
      onClickColumn: I,
      onClickRowHeader: S,
    } = t,
    O =
      null !==
        (o =
          null === (n = d.items) || void 0 === n
            ? void 0
            : n.map((l, index) => {
                var o, n, d;
                const g =
                  null === (o = i.items) || void 0 === o
                    ? void 0
                    : o.find((e) => {
                        var t, o;
                        return (
                          (null === (t = r.get(e).value) || void 0 === t
                            ? void 0
                            : t.id) === f.id &&
                          (null === (o = a.get(e).value) || void 0 === o
                            ? void 0
                            : o.id) === l.id
                        );
                      });
                c &&
                  void 0 === g &&
                  !N &&
                  console.error(
                    "Dynamic Data Grid widget - No cell found for row "
                      .concat(f.id, " column ")
                      .concat(
                        l.id,
                        " while 'Optimize cell paging' is enabled.\nPlease make sure your cell sort order and row sort order are matching, and cell do exists, or switch of the 'Optimize cell paging' option."
                      )
                  );
                const y =
                    g && T
                      ? () => (null == T ? void 0 : T.get(g).execute())
                      : A
                      ? () => (null == A ? void 0 : A.get(f).execute())
                      : I
                      ? () => (null == I ? void 0 : I.get(l).execute())
                      : void 0,
                  k =
                    null !== (n = null == v ? void 0 : v.get(l).value) &&
                    void 0 !== n
                      ? n
                      : void 0,
                  S =
                    null !== (d = g && (null == p ? void 0 : p.get(g).value)) &&
                    void 0 !== d
                      ? d
                      : void 0;
                return x
                  ? e(
                      m,
                      {
                        className: u(k, S),
                        tooltipText: h(t, g),
                        clickTrigger: P,
                        onClick: y,
                        key: l.id,
                        renderAs: s,
                        style: B(t, l, index),
                      },
                      b(t, g)
                    )
                  : e(
                      C,
                      {
                        className: u(k, S),
                        key: "row_"
                          .concat(f.id, "_coll_")
                          .concat(l.id, "_cell_")
                          .concat(null == g ? void 0 : g.id),
                        tooltipText: h(t, g),
                        clickTrigger: P,
                        onClick: y,
                        rowIndex: w,
                        renderAs: s,
                        style: B(t, l, index),
                      },
                      b(t, g)
                    );
              })) && void 0 !== o
        ? o
        : [];
  if ("none" !== g) {
    const l = S
      ? () => (null == S ? void 0 : S.get(f).execute())
      : A
      ? () => (null == A ? void 0 : A.get(f).execute())
      : void 0;
    x
      ? O.unshift(
          e(
            m,
            {
              key: "row_".concat(f.id, "_cell_header"),
              tooltipText: y(t, f),
              clickTrigger: P,
              onClick: l,
              renderAs: s,
              style: t.freezeRowHeader ? { background: "#fff", left: 0, minWidth: "".concat(t.frozenRowHeaderWidth || 150, "px"), position: "sticky", zIndex: 4 } : void 0,
            },
            k(t, f)
          )
        )
      : O.unshift(
          e(
            C,
            {
              key: "row_".concat(f.id, "_cell_header"),
              tooltipText: y(t, f),
              clickTrigger: P,
              onClick: l,
              rowIndex: w,
              renderAs: s,
              style: t.freezeRowHeader ? { background: "#fff", left: 0, minWidth: "".concat(t.frozenRowHeaderWidth || 150, "px"), position: "sticky", zIndex: 4 } : void 0,
            },
            k(t, f)
          )
        );
  }
  (t.actionColumns || []).forEach((actionColumn, index) => {
    const content = x ? actionColumn.caption || "Action" : actionColumn.content.get(f);
    O.push(
      x
        ? e(m, { key: "action_column_header_".concat(index), renderAs: s }, content)
        : e(
            C,
            {
              key: "row_".concat(f.id, "_action_").concat(index),
              className: "datagrid-excel-tools__action-cell",
              rowIndex: w,
              renderAs: s,
              style: E(t, actionColumn, index),
            },
            e("div", { className: "datagrid-excel-tools__action-content" }, content)
          )
    );
  });
  t.columnFilterRow &&
    !x &&
    O.push(
      e(
        C,
        {
          key: "row_".concat(f.id, "_filter_spacer"),
          rowIndex: w,
          renderAs: s,
        },
        ""
      )
    );
  return e(l, null, O);
}
function N(l) {
  let { direction: t } = l;
  const o = "pagination-icon ".concat(t);
  switch (t) {
    case "forward":
      return e(
        "span",
        { "aria-hidden": !0 },
        e(
          "svg",
          {
            className: o,
            viewBox: "0 0 32 32",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e("path", {
            d: "M17.81 6.63C17.48 6.37 17 6.61 17 7.02V24.98C17 25.4 17.48 25.63 17.81 25.37L28.5 16.39C28.76 16.19 28.76 15.8 28.5 15.6L17.81 6.63Z",
            fill: "currentColor",
          }),
          e("path", {
            d: "M4.81 6.63C4.48 6.37 4 6.61 4 7.02V24.98C4 25.4 4.48 25.63 4.81 25.37L15.5 16.39C15.76 16.19 15.76 15.8 15.5 15.6L4.81 6.63Z",
            fill: "currentColor",
          })
        )
      );
    case "step-forward":
      return e(
        "span",
        { "aria-hidden": !0 },
        e(
          "svg",
          {
            className: o,
            viewBox: "0 0 32 32",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e("path", {
            d: "M8.81 6.63C8.48 6.37 8 6.61 8 7.02V24.98C8 25.4 8.48 25.63 8.81 25.37L20.5 16.39C20.76 16.19 20.76 15.8 20.5 15.6L8.81 6.63Z",
            fill: "currentColor",
          }),
          e("path", { d: "M24 6H22V26H24V6Z", fill: "currentColor" })
        )
      );
    case "backward":
      return e(
        "span",
        { "aria-hidden": !0 },
        e(
          "svg",
          {
            className: o,
            viewBox: "0 0 32 32",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e("path", {
            d: "M14.19 6.63L3.51 15.61C3.25 15.81 3.25 16.2 3.51 16.4L14.2 25.38C14.53 25.64 15.01 25.4 15.01 24.99V7.02C15.01 6.6 14.53 6.37 14.2 6.63H14.19Z",
            fill: "currentColor",
          }),
          e("path", {
            d: "M27.19 6.63L16.5 15.61C16.24 15.81 16.24 16.2 16.5 16.4L27.19 25.38C27.52 25.64 28 25.4 28 24.99V7.02C28 6.6 27.52 6.37 27.19 6.63Z",
            fill: "currentColor",
          })
        )
      );
    case "step-backward":
      return e(
        "span",
        { "aria-hidden": !0 },
        e(
          "svg",
          {
            className: o,
            viewBox: "0 0 32 32",
            fill: "currentColor",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e("path", {
            d: "M23.19 6.63L11.51 15.61C11.25 15.81 11.25 16.2 11.51 16.4L23.2 25.38C23.53 25.64 24.01 25.4 24.01 24.99V7.02C24.01 6.6 23.53 6.37 23.2 6.63H23.19Z",
            fill: "currentColor",
          }),
          e("path", { d: "M10 6H8V26H10V6Z", fill: "currentColor" })
        )
      );
    default:
      return e("div", null);
  }
}
function P(l) {
  var t, o, n, i, r, a, d;
  const s =
      void 0 !== l.numberOfItems
        ? Math.ceil(l.numberOfItems / l.pageSize)
        : void 0,
    u = void 0 !== s ? s - 1 : 0,
    c = void 0 !== s,
    g = l.page * l.pageSize + 1,
    v =
      l.canNextPage || !l.numberOfItems
        ? (l.page + 1) * l.pageSize
        : l.numberOfItems,
    m = (e) => {
      l.setPaginationIndex && l.setPaginationIndex(e);
    };
  if (0 === l.numberOfItems) return null;
  const p = ""
    .concat(g, " to ")
    .concat(v, " ")
    .concat(
      c
        ? "of ".concat(
            null !== (t = l.numberOfItems) && void 0 !== t
              ? t
              : (null != s ? s : 1) * l.pageSize
          )
        : ""
    );
  return e(
    "div",
    {
      "aria-label":
        null !== (o = l.labelPagination) && void 0 !== o ? o : "Pagination",
      className: "pagination-bar",
    },
    e(
      "button",
      {
        className: "btn pagination-button",
        disabled: 0 === l.page,
        ...A(() => {
          l.gotoPage(0), m(0);
        }),
        "aria-label":
          null !== (n = l.labelFirstPage) && void 0 !== n
            ? n
            : "Go to first page",
      },
      e(N, { direction: "step-backward" })
    ),
    e(
      "button",
      {
        className: "btn pagination-button",
        disabled: !l.canPreviousPage,
        ...A(() => {
          l.previousPage(), m(l.page - 1);
        }),
        "aria-label":
          null !== (i = l.labelPreviousPage) && void 0 !== i
            ? i
            : "Go to previous page",
      },
      e(N, { direction: "backward" })
    ),
    e(
      "span",
      { className: "sr-only sr-only-focusable" },
      null !== (r = l.labelPagingStatus) && void 0 !== r
        ? r
        : "Currently showing",
      " ",
      p
    ),
    e("div", { "aria-hidden": !0, className: "paging-status" }, p),
    e(
      "button",
      {
        "aria-label":
          null !== (a = l.labelNextPage) && void 0 !== a
            ? a
            : "Go to next page",
        className: "btn pagination-button",
        disabled: !l.canNextPage,
        ...A(() => {
          l.nextPage(), m(l.page + 1);
        }),
      },
      e(N, { direction: "forward" })
    ),
    c &&
      e(
        "button",
        {
          "aria-label":
            null !== (d = l.labelLastPage) && void 0 !== d
              ? d
              : "Go to last page",
          className: "btn pagination-button",
          disabled: l.page === u,
          ...A(() => {
            l.gotoPage(u), m(u);
          }),
        },
        e(N, { direction: "step-forward" })
      )
  );
}
function A(e) {
  return {
    onClick: e,
    onKeyDown: (l) => {
      (" " !== l.key && "Enter" !== l.key) ||
        (l.preventDefault(), l.stopPropagation(), e());
    },
  };
}
function T(l) {
  const {
    emptyPlaceholder: t,
    showEmptyPlaceholder: o,
    renderAs: n,
    columnCount: i,
  } = l;
  return "grid" === n
    ? e(
        "div",
        {
          key: "row-footer",
          className: "td td-borders",
          style: { gridColumn: "span ".concat(i) },
        },
        e(
          "div",
          { className: "empty-placeholder" },
          "custom" === o ? t : e("div", null)
        )
      )
    : e("tr", null, e("td", null, "custom" === o ? t : " "));
}
function I(l) {
  var i, r, a, d;
  const {
      style: s,
      showRowAs: m,
      rowClass: p,
      renderAs: C,
      showHeaderAs: b,
    } = l,
    {
      dataSourceCell: h,
      dataSourceColumn: y,
      pageSize: k,
      pageCell: N,
      paging: A,
      pagingPosition: I,
      dataSourceRow: S,
    } = l,
    O = null !== (i = S.items) && void 0 !== i ? i : [],
    _ = "row" === A ? S.offset / k : y.offset / k,
    [L, V] = t(!0);
  o(() => {
    "available" === h.status && 0 !== h.limit && V(!1);
  }, [h]),
    o(() => {
      "row" === A &&
        (S.requestTotalCount(!0),
        S.limit === Number.POSITIVE_INFINITY && S.setLimit(k)),
        "column" === A &&
          (y.requestTotalCount(!0),
          y.limit === Number.POSITIVE_INFINITY && y.setLimit(k));
    }, [S, y, k, A]),
    o(() => {
      var e, l, t, o;
      const n =
          "row" === A
            ? null !==
                (e =
                  null === (l = y.items) || void 0 === l ? void 0 : l.length) &&
              void 0 !== e
              ? e
              : 0
            : null !==
                (t =
                  null === (o = S.items) || void 0 === o ? void 0 : o.length) &&
              void 0 !== t
            ? t
            : 0,
        i = k * n;
      N && h.limit !== i && h.setLimit(i);
    }, [h, y, k, N, A, S]);
  const R = n(
    (e) => {
      const l = e(_);
      if (
        ("row" === A && S.setOffset(l * k),
        "column" === A && y.setOffset(l * k),
        N)
      ) {
        var t, o;
        const e =
          null !==
            (t = null === (o = y.items) || void 0 === o ? void 0 : o.length) &&
          void 0 !== t
            ? t
            : 0;
        h.setOffset(l * k * e), V(!0);
      }
    },
    [_, S, A, k, y, h, N]
  );
  let D = (null === (r = y.items) || void 0 === r ? void 0 : r.length) || 0;
  "none" !== m && (D += 1);
  l.columnFilterRow && (D += 1);
  D += (l.actionColumns || []).length;
  const H = e(
    P,
    "row" === A
      ? {
          canNextPage: null !== (a = S.hasMoreItems) && void 0 !== a && a,
          canPreviousPage: 0 !== _,
          gotoPage: (e) => R && R(() => e),
          nextPage: () => R && R((e) => e + 1),
          numberOfItems: S.totalCount,
          page: _,
          pageSize: k,
          previousPage: () => R && R((e) => e - 1),
        }
      : {
          canNextPage: null !== (d = y.hasMoreItems) && void 0 !== d && d,
          canPreviousPage: 0 !== _,
          gotoPage: (e) => R && R(() => e),
          nextPage: () => R && R((e) => e + 1),
          numberOfItems: y.totalCount,
          page: _,
          pageSize: k,
          previousPage: () => R && R((e) => e - 1),
        }
  );
  return e(
    c,
    {
      columnCount: D,
      className: u(l.class, "mx-name-".concat(l.name)),
      style: s,
      renderAs: C,
      paging: "none" !== A,
      pagination: H,
      pagingPosition: I,
    },
    "none" !== b &&
      e(
        g,
        { renderAs: C },
        "firstRow" !== b &&
          e(w, { key: "header", renderAs: C }, e(f, { ...l })),
        "firstRow" === b &&
          O[0] &&
          e(
            w,
            { key: "header", renderAs: C },
            e(x, { ...l, row: O[0], rowIndex: 0, loading: L, isHeader: !0 })
          )
      ),
    l.columnFilterRow &&
      e(w, { key: "filters", renderAs: C }, l.columnFilterRow),
    e(
      v,
      { renderAs: C },
      O.map((t, o) => {
        var n, i;
        return "firstRow" === b && 0 === o
          ? null
          : e(
              w,
              {
                className:
                  null !== (n = null == p ? void 0 : p.get(t).value) &&
                  void 0 !== n
                    ? n
                    : "",
                key: null !== (i = t.id) && void 0 !== i ? i : "loader",
                renderAs: C,
              },
              e(x, { ...l, row: t, rowIndex: o, loading: L })
            );
      })
    ),
    0 === O.length &&
      e(T, {
        showEmptyPlaceholder: l.showEmptyPlaceholder,
        columnCount: D,
        emptyPlaceholder: l.emptyPlaceholder,
        renderAs: C,
      })
  );
}
export { I as default };
