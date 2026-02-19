function Modal({ isOpen, title, children, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px]">

                <h2 className="text-xl font-semibold mb-4 text-black">
                    {title}
                </h2>

                {/* Dynamic Content */}
                <div className="mb-6 text-black">
                    {children}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                    >
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Modal;
