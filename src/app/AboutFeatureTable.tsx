import * as React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";
import { aboutFeatures } from "./about-table-data";

interface FeatureRow {
  feature: string;
  type: string;
  description: string;
}

export function AboutFeatureTable() {
  const [filter, setFilter] = React.useState("");
  const [sortAsc, setSortAsc] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const pageSize = 5;

  // Filtering
  const filtered = aboutFeatures.filter(row =>
    row.feature.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (a.feature < b.feature) return sortAsc ? -1 : 1;
    if (a.feature > b.feature) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(sorted.length / pageSize);

  return (
    <div className="my-8 cursor-none min-h-[300px]">
      <div className="flex flex-col sm:flex-row gap-2 mb-2 items-start sm:items-end">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Filter by feature name..."
          value={filter}
          onChange={e => {
            setFilter(e.target.value);
            setPage(0);
          }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="select-none"
              onClick={() => setSortAsc(s => !s)}
            >
              Feature {sortAsc ? "▲" : "▼"}
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.length > 0 ? (
            paged.map((row, i) => (
              <TableRow key={row.feature}>
                <TableCell>{row.feature}</TableCell>
                <TableCell>
                  <span
                    className={
                      row.type === "String"
                        ? "text-blue-600 dark:text-blue-400"
                        : row.type === "Integer"
                        ? "text-green-600 dark:text-green-400"
                        : row.type.startsWith("Float")
                        ? "text-teal-600 dark:text-teal-400"
                        : row.type === "Categorical"
                        ? "text-purple-600 dark:text-purple-400"
                        : row.type === "Array"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-muted-foreground"
                    }
                  >
                    {row.type}
                  </span>
                </TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                No more features to display.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex gap-2 mt-2 items-center cursor-none">
        <button
          className="px-2 py-1 border rounded disabled:opacity-50 bg-transparent cursor-none"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Prev
        </button>
        <span className="text-xs">
          Page {page + 1} of {pageCount}
        </span>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50 bg-transparent cursor-none"
          onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
