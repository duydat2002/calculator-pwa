import { IButton } from "@/types";

export const BUTTONS: IButton[][] = [
  [
    {
      value: "AC",
      color: "secondary",
    },
    {
      value: "⌫",
      color: "secondary",
    },
    {
      value: "%",
      color: "secondary",
      fontSize: "text-2xl",
    },
    {
      value: "/",
      color: "primary",
      variant: "circle",
      fontSize: "text-xl",
    },
  ],
  [
    {
      value: "7",
    },
    {
      value: "8",
    },
    {
      value: "9",
    },
    {
      value: "*",
      color: "primary",
      variant: "circle",
      fontSize: "text-2xl",
    },
  ],
  [
    {
      value: "4",
    },
    {
      value: "5",
    },
    {
      value: "6",
    },
    {
      value: "-",
      color: "primary",
      variant: "circle",
      fontSize: "text-2xl",
    },
  ],
  [
    {
      value: "1",
    },
    {
      value: "2",
    },
    {
      value: "3",
    },
    {
      value: "+",
      color: "primary",
      variant: "circle",
      fontSize: "text-2xl",
    },
  ],
];
