import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ModalImperativeHandle } from "../../../types/common/modalHandle";
import withPortal from "../../hoc/withPortal";
import { useDeleteProductMutation, type Product } from "../../../redux/api/api";
import useToast from "../../hooks/useToast";
import { ToastType } from "../../../redux/slices/toast/toastSlice";
import { useTheme } from "../../context/ThemeContext";



type DeleteProductModalComponentProps = {
    product: Product,
    onDeleteSuccess: () => void;
}


const DeleteProductModalComponent = forwardRef<ModalImperativeHandle, DeleteProductModalComponentProps>(
    ({ product, onDeleteSuccess }: DeleteProductModalComponentProps, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const [deleteProduct] = useDeleteProductMutation();
        const { setToast } = useToast();
        const {isCurrentThemeLight} = useTheme();

        useImperativeHandle(ref, () => {
            return {
                openModal: () => dialogRef.current?.showModal(),
                closeModal: () => dialogRef.current?.close()
            }
        })

        const handleDeleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {

            e.stopPropagation();

            const res = await deleteProduct(product.id);

            if ('data' in res) {
                setToast(`Successfully deleted product with ID: ${res.data?.id}\n Deleted ON: ${res.data?.deletedOn}`, ToastType.SUCCESS)
                onDeleteSuccess();
                dialogRef.current?.close();
            } else {
                setToast(`Error deleting product ${product.id}`, ToastType.ERROR)
            }
        }

        return <>
            <dialog ref={dialogRef} className="modal" onClick={(e) => e.stopPropagation()} >
                <div className={`modal-box space-y-3 ${!isCurrentThemeLight && 'bg-base-300'}`}>
                    <h3 className="font-bold text-xl text-left">Delete Product</h3>
                    <h2 className="text-base ">Are you sure you want to delete? </h2>

                    <div className="modal-action">
                        <button className="btn btn-outline btn-ghost" onClick={handleDeleteProduct}>
                            Yes
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); dialogRef.current?.close()}} className="btn btn-primary text-primary-content">
                            No
                        </button>

                    </div>
                </div>

                {/* This makes it possible to close the modal when clicking outside of the modal content */}
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </>
    })


const DeleteModalComponent = withPortal(DeleteProductModalComponent, 'modals');
export default DeleteModalComponent