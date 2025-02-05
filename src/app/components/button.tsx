import { JSX } from "react";

export default function Button(label: string, type: "primary" | "secondary" | "link" = "primary", onClick: () => void, ): JSX.Element {
    return <button className={type + "btn"} onClick={onClick}>{label}</button>;
}
