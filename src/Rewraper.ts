import DevReact, { ComponentType, PropsWithChildren } from 'react';

import { makeRewrapElements } from './rewrapElements';

export const makeRewraper = ({ React = DevReact }: { React: typeof DevReact }) => {
  const rewrapElements = makeRewrapElements({ React });
  const Rewraper: ComponentType<PropsWithChildren> = ({ children }) => {
    const elements = Array.isArray(children) ? children : [children];
    return rewrapElements(...elements);
  };
  Rewraper.displayName = 'Rewraper';
  return Rewraper;
};

export const Rewraper = makeRewraper({ React: DevReact });
