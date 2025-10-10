import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { useAddProductMutation } from "../../../redux/api/api";
interface CreateProductModalProps {
    setToast: React.Dispatch<React.SetStateAction<{ message: string, type: 'error' | 'success' } | null>>;
}


const CreateProductModal = forwardRef(({ setToast }: CreateProductModalProps, ref) => {
    const [addProduct, result] = useAddProductMutation()

    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        openModal,
    }));

    const openModal = useCallback(() => {
        dialogRef.current?.showModal();
    }, [])

    const closeModal = useCallback(() => {
        dialogRef.current?.close()
    }, [])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);

        const res = await addProduct({ title: name, price });
        if ('data' in res) {
            setToast({ message: `Created successfully with id ${res.data?.id}.`, type: 'success' });
            closeModal();
            formRef.current?.reset();
        } else {
            setToast({ message: 'Error creating product', type: 'error' });
        }
    }

    return (
        <>
            <dialog className="modal" ref={dialogRef} onClose={closeModal}>
                <div className="modal-box space-y-6">
                    <h3 className="font-bold text-2xl text-left">Create Product</h3>
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
    );
});
export default CreateProductModal;