export function findInString(subject: string, search: string): boolean {
  if (!search) {
    return true;
  }
  return subject.toLowerCase().includes(search.toLowerCase());
}

export function findStringInObject(search: string, obj: object): boolean {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      if (findInString(obj[key], search)) {
        return true;
      }
    }

    if (typeof obj[key] === 'number') {
      if (findInString(obj[key] + '', search)) {
        return true;
      }
    }

    if (typeof obj[key] === 'object') {
      if (findStringInObject(search, obj[key])) {
        return true;
      }
    }
  }
  return false;
}

export function mapIterator<T, K, I>(map: Map<T, K>, callback: (key: T, value: K) => I): I[] {
  const list = [];
  map.forEach((value, key) => {
    list.push( callback(key, value) );
  });
  return list;
}
