import { forwardRef, useImperativeHandle, useRef, type JSX } from "react";
import type { Product } from "../../../redux/api/api";
import withPortal from "../../hoc/withPortal";


export type UpdateProductModalHandle = {
    openModal: () => void;
    closeModal: () => void;
}

type UpdateProductModalComponentProps = {
    product: Product
}

const UpdateProductModalComponent = forwardRef<UpdateProductModalHandle, UpdateProductModalComponentProps>(({ product }: UpdateProductModalComponentProps, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);


    useImperativeHandle(ref, () => ({
        openModal,
        closeModal,
    }))

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => dialogRef.current?.close();
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {

    }

    return (
        <>
            <dialog className="modal" ref={dialogRef}>
                <div className="modal-box space-y-6">
                    <h3 className="font-bold text-2xl text-left">Update Product</h3>
                    <button
                        className="btn btn-xl btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}
                    >
                        ✕
                    </button>

                    <form
                        onSubmit={handleSubmit}
                        ref={formRef}
                    >
                        <input type="text" placeholder="Product name" className="input input-bordered w-full mb-4 size-10" required />
                        <input type="number" placeholder="Price" className="input input-bordered w-full mb-4 size-10" required />
                        <button type="submit" className="btn btn-primary w-full">
                            Save
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
})

const UpdateProductModal = withPortal(UpdateProductModalComponent, 'modals');
export default UpdateProductModal;