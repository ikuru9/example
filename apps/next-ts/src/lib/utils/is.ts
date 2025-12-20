export const objectToString: typeof Object.prototype.toString = Object.prototype.toString;
export const toTypeString = (value: unknown): string => objectToString.call(value);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === "[object Map]";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === "[object Set]";

export const isDate = (val: unknown): val is Date => toTypeString(val) === "[object Date]";
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === "[object RegExp]";
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const isFunction = (val: unknown): val is Function => typeof val === "function";
export const isString = (val: unknown): val is string => typeof val === "string";
export const isSymbol = (val: unknown): val is symbol => typeof val === "symbol";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const isUndefined = (value?: unknown): value is undefined => {
  return value === undefined;
};

export const isEmpty = <T = unknown>(value?: T): value is T => {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
};

function looseCompareArrays(a: unknown[], b: unknown[]) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? (a as Date).getTime() === (b as Date).getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = Array.isArray(a);
  bValidType = Array.isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType
      ? looseCompareArrays(a as Array<unknown>, b as Array<unknown>)
      : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      const aHasKey = a.hasOwnProperty(key);
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
      const bHasKey = b.hasOwnProperty(key);
      if ((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}

export const isNull = (val: unknown): val is null => {
  return val === null;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isWindow = (value: any): value is Window => {
  return typeof window !== "undefined" && value !== null && value === value.window;
};

export const isMacOs = (): boolean => {
  const macRegex = /macintosh|mac os x/i;
  return macRegex.test(navigator.userAgent);
};

export const isWindowsOs = (): boolean => {
  const windowsRegex = /windows|win32/i;
  return windowsRegex.test(navigator.userAgent);
};

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export const isHttpUrl = (url?: string) => {
  if (!url) {
    return false;
  }

  const httpRegex = /^https?:\/\/.*$/;

  return httpRegex.test(url);
};

export const isDark = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
