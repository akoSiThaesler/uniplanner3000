import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <span className="flex items-center gap-2">Made by</span>
      <span className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Julian Thäsler
      </span>
      <span className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Luis Sayer
      </span>
      <span className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Tom Weise
      </span>
    </footer>
  );
}
