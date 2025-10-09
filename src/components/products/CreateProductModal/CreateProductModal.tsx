import { forwardRef, useImperativeHandle, useState } from "react";
import { useAddProductMutation } from "../../../redux/api/api";
interface CreateProductModalProps {
    setToast: React.Dispatch<React.SetStateAction<{ message: string, type: 'error' | 'success' } | null>>;
}
const CreateProductModal = forwardRef(({ setToast }: CreateProductModalProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addProduct, result] = useAddProductMutation()

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
    }));

    if (!isOpen) return null;

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string;
        const price = parseFloat(formData.get('price') as string);

        const res = await addProduct({ title: name, price });
        if ('data' in res) {
            setIsOpen(false);
            setToast({ message: `Created successfully with id ${res.data?.id}.`, type: 'success' });
        } else {
            setToast({ message: 'Error creating product', type: 'error' });
        }
    }

    return (
        <>
            <dialog className="modal" open={isOpen}>
                <div className="modal-box space-y-6">
                    <h3 className="font-bold text-2xl text-left">Create Product</h3>
                    <button
                        className="btn btn-xl btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>

                    <form
                        onSubmit={handleSubmit}
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