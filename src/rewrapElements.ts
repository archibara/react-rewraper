import DevReact, { JSX } from 'react';

export const makeRewrapElements =
  ({ React = DevReact }: { React: typeof DevReact }) =>
  (...items: JSX.Element[]) => {
    let result: JSX.Element | undefined = undefined;
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!item) {
        continue;
      }
      if (!result) {
        result = item;
      } else {
        result = React.cloneElement(item, undefined, result);
      }
    }
    return result;
  };

export const rewrapElements = makeRewrapElements({ React: DevReact });
