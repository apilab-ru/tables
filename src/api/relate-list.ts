import { Statuses } from './api';

export const RELATE_LIST = [
  {
    id: 1,
    name: 'name 1',
    description: 'какое-то длинное описание текста размер не меньше 300 символов',
    relateItems: [
      {
        id: 1,
        name: 'item child 1'
      },
      {
        id: 2,
        name: 'item child 2'
      },
      {
        id: 3,
        name: 'item child 3'
      },
      {
        id: 4,
        name: 'item child 4'
      }],
    status: Statuses.complete
  },
  {
    id: 2,
    name: 'name 2',
    description: 'какое-то длинное описание текста размер не меньше 300 символов',
    relateItems: [
      {
        id: 2,
        name: 'item child 2'
      },
      {
        id: 3,
        name: 'item child 3'
      },
      {
        id: 5,
        name: 'item child 5'
      }],
    status: Statuses.warning
  },
  {
    id: 3,
    name: 'name 3',
    description: 'какое-то длинное описание текста размер не меньше 300 символов',
    relateItems: [
      {
        id: 5,
        name: 'item child 5'
      },
      {
        id: 6,
        name: 'item child 6'
      },
      {
        id: 7,
        name: 'item child 7'
      }],
    status: Statuses.error
  },
  {
    id: 4,
    name: 'name 4',
    description: 'какое-то длинное описание текста размер не меньше 300 символов',
    relateItems: [
      {
        id: 2,
        name: 'item child 2'
      },
      {
        id: 5,
        name: 'item child 5'
      },
      {
        id: 8,
        name: 'item child 8'
      }],
    status: Statuses.complete
  }
];
