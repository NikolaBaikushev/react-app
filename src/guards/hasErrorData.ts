import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function hasErrorData(
  error: SerializedError | FetchBaseQueryError | undefined
): error is FetchBaseQueryError & { data: { message: string } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data
  );
}