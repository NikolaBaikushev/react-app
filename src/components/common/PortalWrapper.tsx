// PortalWrapper.tsx

import React, { type JSX } from 'react';
import { createPortal } from 'react-dom';

function withPortal<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>, 
  portalId: string 
) {
  return (props: P) => {
    const portalRoot = document.getElementById(portalId);
    if (!portalRoot) return null;

    return createPortal(<WrappedComponent {...props} />, portalRoot);
  };
}

export default withPortal;