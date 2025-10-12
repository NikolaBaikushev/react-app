import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGetProductsCategoriesQuery, type Product } from "../../../redux/api/api";
import withPortal from "../../hoc/withPortal";
import { CircleDollarSign, ClipboardList, ScrollText, Tag, TextAlignJustify } from "lucide-react";


export type UpdateProductModalHandle = {
    openModal: () => void;
    closeModal: () => void;
}

type UpdateProductModalComponentProps = {
    product: Product
}

const UpdateProductModalComponent = forwardRef<UpdateProductModalHandle, UpdateProductModalComponentProps>(
    ({ product }: UpdateProductModalComponentProps, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const formRef = useRef<HTMLFormElement>(null);
        const { data: categories, error, isLoading: isCategoriesLoading } = useGetProductsCategoriesQuery()


        useImperativeHandle(ref, () => ({
            openModal,
            closeModal
        }))

        const openModal = () => {
            dialogRef.current?.showModal();
        };

        const closeModal = () => {
            dialogRef.current?.close();
        };

        const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            closeModal();
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
                            className="space-y-4"
                        >
                            <label className="text-base input input-bordered w-full mb-4 size-10">
                                <TextAlignJustify size={14} />
                                <input type="text" defaultValue={product.title} placeholder="Product name" className="" />
                            </label>
                            <label className="text-base input input-bordered w-full mb-4 size-10" >
                                <CircleDollarSign size={14} />
                                <input type="number" defaultValue={product.price} placeholder="Price" />

                            </label>

                            <label className="text-base textarea input w-full" >
                                <ScrollText size={14} />
                                <input type="text" defaultValue={product.description} placeholder="Description" /></label>

                            <label className="text-base select select-bordered w-full" >
                                <Tag size={14}/>
                                <select>
                                    {categories?.map(c => <option value={c.slug} key={c.slug}>{c.name}</option>)}
                                </select>
                            </label>

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