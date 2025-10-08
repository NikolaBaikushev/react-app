import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean, isFetching: boolean) {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. If currently fetching OR no more data, simply return and allow cleanup to run.
        if (isFetching || !hasMore) return; 

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            
            // 2. Only call the load function if the sentinel is intersecting (visible/near viewport).
            // The isFetching check is primarily handled by the outer 'if' condition 
            // and the 'loadMore' logic in the component.
            if (entry.isIntersecting) {
                callback();
            }
        }, {
            root: null,
            // 🔑 FIX: Use rootMargin to expand the detection area (e.g., 300px before end).
            // This prevents the huge gap by loading content early.
            rootMargin: "0px 0px 300px 0px", // Top, Right, Bottom (preload), Left
            // 🔑 FIX: Change threshold to 0.0 to trigger as soon as the element is visible 
            // within the expanded rootMargin area.
            threshold: 0.0,
        });

        const current = sentinelRef.current;
        if (current) observer.observe(current);

        // 3. Cleanup: This runs when dependencies change (i.e., when isFetching becomes true), 
        // effectively stopping the observer while data is loading.
        return () => {
            if (current) observer.unobserve(current); 
            observer.disconnect(); 
        };
        
        // 4. Dependencies: The callback dependency ensures we always use the latest loadMore function.
        // isFetching and hasMore ensure the observer is properly stopped/started.
    }, [callback, hasMore, isFetching]);

    return sentinelRef;
}