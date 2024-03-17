import DevReact, { ComponentType, JSX } from 'react';
import React from 'react';

// https://stackoverflow.com/a/72760489
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
export type GetRequiredKeys<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
export type PropsWithOptionalChildren<P> = P extends { children: any }
  ? Omit<P, 'children'> & {
      children?: P['children'];
    }
  : P;
export type TupleOrElement<C, P> = keyof GetRequiredKeys<P> extends never
  ? readonly [C, P] | readonly [C]
  : readonly [C, P];

export type ItemComponent<
  C extends ComponentType<any> = ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>,
  PCh = PropsWithOptionalChildren<P>,
> = TupleOrElement<C, PCh>;

export type ItemTag<TAG> = TupleOrElement<TAG, React.HTMLProps<TAG>>;

type ItemAbstract<C = ComponentType<any> | keyof JSX.IntrinsicElements> =
  C extends ComponentType<any> ? ItemComponent<C> : ItemTag<C>;

export const makeRewrapComponents =
  ({ React }: { React: typeof DevReact }) =>
  <
    ARR extends ReadonlyArray<ItemAbstract> &
      Record<0, ItemAbstract> & {
        [IDX in keyof ARR]: ARR[IDX][0] extends ComponentType<any>
          ? ItemComponent<ComponentType<React.ComponentProps<ARR[IDX][0]>>>
          : ItemTag<ARR[IDX][0]>;
      },
  >(
    items: ARR,
  ) => {
    let result: JSX.Element | undefined = undefined;
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!item) {
        continue;
      }
      const [Component, props] = item;
      if (!result) {
        result = React.createElement(Component, props);
      } else {
        result = React.createElement(Component, props, result);
      }
    }
    return result;
  };

export const rewrapComponents = makeRewrapComponents({ React: DevReact });
