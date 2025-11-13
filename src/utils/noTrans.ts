export function noTrans<T extends string>(s: T): T {
  return s;
}

export const raw = noTrans;
