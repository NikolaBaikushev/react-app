import type { JSX } from "react";
import SkeletonCard from "./SkeletonCard";

type SkeletonProps = {
    container: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    length: number,
} & React.ComponentProps<any>;

export const Skeleton = ({ length = 10, container, ...props }: SkeletonProps) => {
    const data = Array.from({length});
    const Container = container;
    return <Container {...props}>
        {data.map((_, index) => <SkeletonCard key={index} />)}
    </Container>
}