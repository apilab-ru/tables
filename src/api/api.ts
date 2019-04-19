export enum Statuses { complete, warning, error }

export const StatusMap = new Map<Statuses, StatusDto>([
  [Statuses.complete, {
    name: 'Завершён',
    color: 'green'
  }],
  [Statuses.warning, {
    name: 'Требует внимания',
    color: 'yellow'
  }],
  [Statuses.error, {
    name: 'Ошибка',
    color: 'red'
  }]
]);

export interface StatusDto {
  name: string;
  color: string;
}

export enum StatusWorker { OnWork, OnHoliday, OnHouseWork, OnSick }

export const StatusWorkerMap = new Map<StatusWorker, string>([
  [StatusWorker.OnWork, 'В офисе'],
  [StatusWorker.OnHoliday, 'На праздниках'],
  [StatusWorker.OnHouseWork, 'На дому'],
  [StatusWorker.OnSick, 'Болеет'],
]);

export interface User {
  id: number;
  name: string;
  surname: string;
  description: string;
  card: UserCard;
  status: StatusWorker[];
}

export interface UserCard {
  phone: string;
  email: string;
}

export interface Relate {
  id: number;
  name: string;
  description: string;
  relateItems: RelateItem[];
  status: Statuses
}

export interface RelateItem {
  id: number;
  name: string;
}
