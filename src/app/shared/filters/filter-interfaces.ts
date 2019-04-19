export type FilterSet = FilterItem[];

export type FilterValueVal = string | number;

export interface SendFilter {
  [key: string]: FilterValueVal[];
}

export interface FilterItem {
  key: string;
  label: string;
  values: FilterValue[];
}

export interface FilterValue {
  label: string;
  value: FilterValueVal;
}
