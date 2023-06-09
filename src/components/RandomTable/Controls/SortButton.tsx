import { ArrowCircleUp, ArrowCircleDown, Adjust } from "@mui/icons-material";

import { SortType } from "../types";
import { IconButton, IconButtonProps } from "@mui/material";

export type SortButtonProps = {
  sortState: SortType;
  buttonType: SortType;
} & IconButtonProps;

function getSortButtonColor(
  sortState: SortType,
  buttonType: SortType
) {
  switch (buttonType) {
    case "asc":
      return sortState === SortType.ASC ? "primary" : "secondary";
    case "desc":
      return sortState === SortType.DESC ? "primary" : "secondary";
    case "default":
    default:
      return sortState === SortType.DEFAULT ? "primary" : "secondary";
  }
}

function getSortButtonComponent(buttonType: SortType) {
  switch (buttonType) {
    case "asc":
      return ArrowCircleUp;
    case "desc":
      return ArrowCircleDown;
    case "default":
    default:
      return Adjust;
  }
}

function SortButton({ sortState, buttonType, ...rest }: SortButtonProps) {
  const Component = getSortButtonComponent(buttonType);
  return (
    <IconButton color={getSortButtonColor(sortState, buttonType)} {...rest}>
      <Component />
    </IconButton>
  );
}

export default SortButton;
