export type SortFunction = (a, b) => number;

type SortItem = string | number;

export function baseSort(a: SortItem, b: SortItem): number {
  if (typeof a === 'string' || typeof b === 'string') {
    return compareString(a as string, b as string);
  } else {
    if (!a && !b) {
      return 0;
    }
    if (!a || !b) {
      return a ? 1 : -1;
    }
    return a === b ? 0 :
      ((a > b) ? 1 : -1);
  }
}

export function compareString(a: string, b: string): number {
  if (!a && !b) {
    return 0;
  }

  if (!a || !b) {
    return a ? 1 : -1;
  }

  return a.toLowerCase().localeCompare(b.toLowerCase());
}
