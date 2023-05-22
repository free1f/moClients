export const debounce = <A = unknown, R = void>(
  // source: https://stackblitz.com/github/Bwca/demo__use-debounce-hook?file=src%2Fdebounce%2Fdebounce.ts
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] => {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
};

interface ClientName {
  name: string;
}

export const compareByName = (a: ClientName, b: ClientName) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareRevereByName = (a: ClientName, b: ClientName) => {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
};

interface Clients {
  name: string;
  date: string;
  email: string;
}

export const isValidForm = (inputValue: Clients) => {
  return !!(
    inputValue.name.trim().length &&
    inputValue.date.trim().length &&
    inputValue.email.trim().length
  );
};
