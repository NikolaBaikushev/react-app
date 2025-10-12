
import { createPortal } from 'react-dom';
import type { WithComponentProps } from '../../types/common/withComponentProps';

function withPortal<P>(
    WrappedComponent: React.ComponentType<WithComponentProps<P>>,
    portalId: string
) {
    return (props: WithComponentProps<P>) => {
        const portalRoot = document.getElementById(portalId);
        if (!portalRoot) return null;
        
        return createPortal(<WrappedComponent {...props} />, portalRoot);
    };
}

export default withPortal;