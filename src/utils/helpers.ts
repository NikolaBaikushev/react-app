// Demoing 


/**
 * @description
 * Artificially slow the loading of lazy loaded component in order to show the Suspense fallback ...
 */
export function delayImport<T>(ms: number, importPromise: Promise<T>): Promise<T>{
  return new Promise((resolve) => setTimeout(() => {
    resolve(importPromise)
  }, ms))
}