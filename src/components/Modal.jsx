import { createPortal } from "react-dom";

import { MdOutlineClose } from "react-icons/md";

function Modal({ deleteItem, setIsOpenModal, selectedUserId }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-80 rounded-2xl bg-white p-8 text-center shadow-lg">
        <button
          onClick={() => setIsOpenModal(false)}
          className="absolute right-2 top-2"
        >
          <MdOutlineClose className="text-3xl font-bold text-primary" />
        </button>
        <h2 className="text-xl font-semibold">Tasdiqlaysizmi?</h2>
        <p className="mt-2 text-gray-600">
          Siz ushbu elementni o‘chirmoqchimisiz?
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
            onClick={() => setIsOpenModal(false)}
          >
            Yo‘q
          </button>
          <button
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => {
              setIsOpenModal(false);
              deleteItem(selectedUserId);
            }}
          >
            Ha
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
