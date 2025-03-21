// import { ReactNode } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
//       <div className="bg-gray-900 text-white p-6 rounded-xl shadow-2xl w-96 transform transition-all duration-300 scale-95 animate-fade-in">
//         <button
//           className="absolute top-2 right-2 text-xl text-red-400 hover:text-red-600 transition"
//           onClick={onClose}
//         >
//           ✖
//         </button>
//         <div className="text-center">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;



import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-md z-50">
      <div className="bg-blue-800 text-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-2xl text-red-400 hover:text-red-600 transition"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;