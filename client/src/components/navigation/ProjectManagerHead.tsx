import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from "@mui/material";
import { Box } from "@mui/system";
import { visuallyHidden } from "@mui/utils";
import { orderBy } from "lodash";

interface ProjectManagerHeadProps {
  numSelected: number;
  rowCount: number;
  sortOrder: "asc" | "desc";
  sortFilter: string;
  onSelectAll: () => void;
  onSortBy: (label: string) => void;
}

const HEAD_CELLS: readonly { [key: string]: string }[] = [
  {
    id: "fileName",
    label: "Project name",
  },
  {
    id: "tags",
    label: ""
  },
  {
    id: "owner",
    label: "Owned by"
  },
  {
    id: "timeStamp",
    label: "Last modified at"
  },
  {
    id: "actions",
    label: "Actions"
  }
]

export default function ProjectManagerHead(props: ProjectManagerHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          onClick={props.onSelectAll}
        >
          <Checkbox
            color="primary"
            indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
          />
        </TableCell>
        {HEAD_CELLS.map(headCell => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="none"
            sx={{ fontWeight: "bold" }}
            sortDirection={props.sortFilter === headCell.id ? props.sortOrder : undefined}
          >
            {headCell.id === "head-label-tags" || headCell.id === "actions"
              ? headCell.label
              : <TableSortLabel
                active={props.sortFilter === headCell.id}
                direction={props.sortFilter === headCell.id ? props.sortOrder : "asc"}
                onClick={() => props.onSortBy(headCell.id)}
              >
                {headCell.label}
                {props.sortFilter === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {props.sortOrder === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}