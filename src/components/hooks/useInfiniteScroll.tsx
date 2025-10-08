import { useEffect, useRef } from "react";



export function useInfiniteScroll(callback: () => void, hasMore: boolean, isFetching: boolean) {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isFetching || !hasMore) return;

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting) {
                callback();
            }
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.25,
        });

        const current = sentinelRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current); observer.disconnect();
        };
    }, [callback, hasMore, isFetching]);

    return sentinelRef;
}
