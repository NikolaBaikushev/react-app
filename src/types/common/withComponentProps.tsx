import type { JSX, PropsWithChildren } from "react";

export type WithComponentProps<T> = JSX.IntrinsicAttributes & PropsWithChildren<T>;