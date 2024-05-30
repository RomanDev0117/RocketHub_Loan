import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import ReactPortal from 'react-overlays/esm/Portal';

type TProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  selectorOrRef?: string;
}

export const Portal = ({ children, selectorOrRef }: TProps) => {
  // TODO: implement logic for ref if it's needed
  const [portalRef, setPortalRef] = useState<any>(null);
  useEffect(() => {
    if (typeof selectorOrRef === 'string') {
      setPortalRef(document.querySelector(selectorOrRef));
    }
  }, [selectorOrRef]);

  return <ReactPortal container={portalRef}>{children}</ReactPortal>;
};
