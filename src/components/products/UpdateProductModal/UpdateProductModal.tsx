import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGetProductsCategoriesQuery, useUpdateProductMutation, type Product } from "../../../redux/api/api";
import withPortal from "../../hoc/withPortal";
import { CircleDollarSign, ScrollText, Tag, TextAlignJustify } from "lucide-react";
import useToast from "../../hooks/useToast";
import { ToastType } from "../../../redux/slices/toast/toastSlice";
import type { ModalImperativeHandle } from "../../../types/common/modalHandle";



type UpdateProductModalComponentProps = {
    product: Product
}

const UpdateProductModalComponent = forwardRef<ModalImperativeHandle, UpdateProductModalComponentProps>(
    ({ product }: UpdateProductModalComponentProps, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const formRef = useRef<HTMLFormElement>(null);
        const { data: categories, error, isLoading: isCategoriesLoading } = useGetProductsCategoriesQuery();
        const [updateProduct, result ] = useUpdateProductMutation();
        const { setToast } = useToast();
        

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

        const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const data = Object.fromEntries(form.entries());
            const res = await updateProduct({id: product.id, body: data});
            console.log(res);
            console.log(result);
            if ('data' in res) {
                setToast(`Product with ID: ${product.id} successfully updated!`,ToastType.SUCCESS);
                // console.log(result.data)
                closeModal();
            } else if (res.error) {
                setToast(`Something went wrong updating product! ${res.error}`, ToastType.ERROR)
            }
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
                                <input type="text" name="title" defaultValue={product.title} placeholder="Product name" className="" />
                            </label>
                            <label className="text-base input input-bordered w-full mb-4 size-10" >
                                <CircleDollarSign size={14} />
                                <input type="number" name="price" defaultValue={product.price} placeholder="Price" />

                            </label>

                            <label className="text-base textarea input w-full" >
                                <ScrollText size={14} />
                                <input type="text" name="description"  defaultValue={product.description} placeholder="Description" />
                            </label>

                            <label className="text-base select select-bordered w-full" >
                                <Tag size={14} className="z-50" />
                                {isCategoriesLoading ? <span className={`mx-1 loading loading-dots loading-sm bg-primary`}></span>
                                    : <select name="category" defaultValue={product.category}>
                                        {categories?.map(c => <option value={c.slug} key={c.slug}>{c.name}</option>)}
                                    </select>}
                            </label>

                            <button type="submit" className="btn btn-primary w-full">
                                Update
                            </button>
                        </form>
                    </div>
                </dialog>
            </>
        )
    })

const UpdateProductModal = withPortal(UpdateProductModalComponent, 'modals');
export default UpdateProductModal;