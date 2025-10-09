import { Suspense } from "react"

type LazyWrapperProps = {
    children: React.ReactElement,
    fallback: React.ReactElement
}

const LazyComponentWrapper = ({ children, fallback }: LazyWrapperProps) => {
    return <Suspense fallback={fallback}>
        {children}
    </Suspense>
}

export default LazyComponentWrapper