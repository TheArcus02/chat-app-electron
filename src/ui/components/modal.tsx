const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50'>
      <div className='bg-white text-black p-6 rounded-xl w-1/3 shadow-xl'>
        <h3 className='text-2xl font-semibold mb-4'>{title}</h3>
        <div>{children}</div>
        <div className='mt-4 text-center'>
          <button
            className='btn btn-sm btn-primary'
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
