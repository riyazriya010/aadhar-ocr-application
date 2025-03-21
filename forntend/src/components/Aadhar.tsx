// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiCall from "../api/aadhar";

// interface Address {
//   doorNo?: string;
//   street?: string;
//   village?: string;
//   taluk?: string;
//   district?: string;
//   state?: string;
//   pincode?: string;
//   postOffice?: string;
//   block?: string;
// }

// interface ExtractedData {
//   name?: string;
//   gender?: string;
//   dob?: string;
//   aadhaarNumber?: string;
//   address?: Address;
// }

// function Aadhar() {
//   const [frontImage, setFrontImage] = useState<File | null>(null);
//   const [backImage, setBackImage] = useState<File | null>(null);

// const [extractedData, setExtractedData] = useState<ExtractedData>({})
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isFront: boolean) => {
//     setError(null);
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!allowedFormats.includes(file.type)) {
//       toast.error("Only JPEG, JPG, and PNG images are allowed.");
//       return;
//     }

//     if (isFront) setFrontImage(file);
//     else setBackImage(file);
//   };

//   const processOCR = async () => {
//     setError(null);
//     if (!frontImage || !backImage) {
//       toast.error("Both Front and Back Aadhaar images are required.");
//       return;
//     }

//     setLoading(true);
//     setExtractedData({});

//     try {
//       const formData = new FormData();
//     formData.append("files", frontImage);
//     formData.append("files", backImage)

//     //   const response = await axios.post(`${import.meta.env.VITE_USER_BACKEND_URL}/extractData`, formData);
//     const response = await apiCall.extractAadhar(formData)
//       console.log('res ',response)
//      if(response.data){
//       toast.success('Success fully extracted')
//       setExtractedData(response.data)
//      }

//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log(error);
//         const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
//         console.log(errorMessage);
//         toast.error(errorMessage || "An error occurred during sign-up.");
//       } else {
//         console.log(error)
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center py-10 px-4">
//       <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">Aadhaar OCR Scanner</h1>

//       {error && (
//         <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 w-full max-w-3xl text-center">
//           {error}
//         </div>
//       )}

//       <div className="upload-container">
//         <div className="flex flex-col items-center">
//           {frontImage && <img src={URL.createObjectURL(frontImage)} alt="Front" className="h-40 rounded-md mb-4" />}
//           <input type="file" id="front-upload" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, true)} />
//           <label htmlFor="front-upload" className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer">
//             Upload Front Side
//           </label>
//         </div>
//       </div>

//       <div className="upload-container">
//         <div className="flex flex-col items-center">
//           {backImage && <img src={URL.createObjectURL(backImage)} alt="Back" className="h-40 rounded-md mb-4" />}
//           <input type="file" id="back-upload" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, false)} />
//           <label htmlFor="back-upload" className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer">
//             Upload Back Side
//           </label>
//         </div>
//       </div>

//       <button
//         onClick={processOCR}
//         className="mt-6 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//         disabled={loading || !frontImage || !backImage}
//       >
//         {loading ? "Processing..." : "Extract Aadhaar Data"}
//       </button>

//       {Object.keys(extractedData).length > 0 && !error && (
//   <div className="mt-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl">
//     <h2 className="text-2xl font-bold text-gray-800 mb-4">Extracted Aadhaar Details</h2>
//     <p><strong>Name:</strong> {extractedData.name}</p>
//     <p><strong>Athaar No:</strong>{extractedData.aadhaarNumber}</p>
//     <p><strong>Gender:</strong> {extractedData.gender}</p>
//     <p><strong>Date of Birth:</strong> {extractedData.dob}</p>

//     {extractedData.address && (
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold text-gray-700">Address:</h3>
//         <p><strong>Door No:</strong> {extractedData.address.doorNo}</p>
//         <p><strong>Street:</strong> {extractedData.address.street}</p>
//         <p><strong>Village:</strong> {extractedData.address.village}</p>
//         <p><strong>Taluk:</strong> {extractedData.address.taluk}</p>
//         <p><strong>District:</strong> {extractedData.address.district}</p>

//         <p><strong>Pincode:</strong> {extractedData.address.pincode}</p>
//       </div>
//     )}
//   </div>
// )}
//  <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Aadhar;





import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiCall from "../api/aadhar";
import Modal from "../components/Modal";

interface Address {
    doorNo?: string;
    street?: string;
    village?: string;
    taluk?: string;
    district?: string;
    state?: string;
    pincode?: string;
    postOffice?: string;
    block?: string;
}

interface ExtractedData {
    name?: string;
    gender?: string;
    dob?: string;
    aadhaarNumber?: string;
    address?: Address;
}

function Aadhar() {
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [extractedData, setExtractedData] = useState<ExtractedData>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isFront: boolean) => {
        setError(null);
        console.log(error)
        const file = event.target.files?.[0];
        if (!file) return;

        if (!allowedFormats.includes(file.type)) {
            toast.error("Only JPEG, JPG, and PNG images are allowed.");
            return;
        }

        if (isFront) setFrontImage(file);
        else setBackImage(file);
    };

    const processOCR = async () => {
        setError(null);
        if (!frontImage || !backImage) {
            toast.error("Both Front and Back Aadhaar images are required.");
            return;
        }

        setLoading(true);
        setExtractedData({});

        try {
            const formData = new FormData();
            formData.append("files", frontImage);
            formData.append("files", backImage);

            const response = await apiCall.extractAadhar(formData);
            if (response.data) {
                toast.success("Successfully extracted Aadhaar details");
                setExtractedData(response.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
                toast.error(errorMessage);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div className="min-h-screen bg-gray-900 from-blue-700 to-purple-900 flex flex-col items-center py-10 px-4 animate-fade-in">
    //         <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-xl tracking-widest animate-bounce">Aadhaar OCR Scanner</h1>

    //         <div className="upload-container flex flex-col md:flex-row gap-8">
    //             {[{ isFront: true, image: frontImage, label: "Upload Front Side" }, { isFront: false, image: backImage, label: "Upload Back Side" }].map(({ isFront, image, label }) => (
    //                 <div key={label} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
    //                     {image && <img src={URL.createObjectURL(image)} alt={label} className="h-48 rounded-md mb-4" />}
    //                     <input type="file" id={label} accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, isFront)} />
    //                     <label htmlFor={label} className="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition cursor-pointer">
    //                         {label}
    //                     </label>
    //                 </div>
    //             ))}
    //         </div>

    //         <button
    //             onClick={processOCR}
    //             className="mt-8 bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed animate-pulse"
    //             disabled={loading || !frontImage || !backImage}
    //         >
    //             {loading ? "Processing..." : "Extract Aadhaar Data"}
    //         </button>

    //         {isModalOpen && (
    //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    //                 <h2 className="text-2xl font-bold mb-4">Extracted Aadhaar Details</h2>
    //                 <p><strong>Name:</strong> {extractedData.name}</p>
    //                 <p><strong>Aadhaar No:</strong> {extractedData.aadhaarNumber}</p>
    //                 <p><strong>Gender:</strong> {extractedData.gender}</p>
    //                 <p><strong>Date of Birth:</strong> {extractedData.dob}</p>

    //                 {extractedData.address && (
    //                     <div className="mt-4">
    //                         <h3 className="text-lg font-semibold text-gray-300">Address:</h3>
    //                         <p><strong>Door No:</strong> {extractedData.address.doorNo}</p>
    //                         <p><strong>Street:</strong> {extractedData.address.street}</p>
    //                         <p><strong>Village:</strong> {extractedData.address.village}</p>
    //                         <p><strong>Taluk:</strong> {extractedData.address.taluk}</p>
    //                         <p><strong>District:</strong> {extractedData.address.district}</p>
    //                         <p><strong>Pincode:</strong> {extractedData.address.pincode}</p>
    //                     </div>
    //                 )}
    //                 {/* <button className="mt-6 bg-red-500 px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition w-full text-white" onClick={() => setIsModalOpen(false)}>
    //                     Close
    //                 </button> */}
    //             </Modal>
    //         )}


    //         <ToastContainer position="top-right" autoClose={3000} />
    //     </div>
    // );

    // return (
    //     <div className="min-h-screen bg-gray-900 from-blue-700 to-purple-900 flex flex-col items-center py-10 px-4 animate-fade-in">
    //         <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-xl tracking-widest animate-bounce">Aadhaar OCR Scanner</h1>

    //         <div className="upload-container flex flex-col md:flex-row gap-8">
    //             {[{ isFront: true, image: frontImage, label: "Upload Front Side" }, { isFront: false, image: backImage, label: "Upload Back Side" }].map(({ isFront, image, label }) => (
    //                 <div key={label} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
    //                     {image && <img src={URL.createObjectURL(image)} alt={label} className="h-48 rounded-md mb-4" />}
    //                     <input type="file" id={label} accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, isFront)} />
    //                     <label htmlFor={label} className="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition cursor-pointer">
    //                         {label}
    //                     </label>
    //                 </div>
    //             ))}
    //         </div>

    //         <button
    //             onClick={processOCR}
    //             className="mt-8 bg-green-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed animate-pulse"
    //             disabled={loading || !frontImage || !backImage}
    //         >
    //             {loading ? "Processing..." : "Extract Aadhaar Data"}
    //         </button>

    //         {isModalOpen && (
    //             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    //                 <h2 className="text-2xl font-bold mb-4">Extracted Aadhaar Details</h2>
    //                 <p><strong>Name:</strong> {extractedData.name}</p>
    //                 <p><strong>Aadhaar No:</strong> {extractedData.aadhaarNumber}</p>
    //                 <p><strong>Gender:</strong> {extractedData.gender}</p>
    //                 <p><strong>Date of Birth:</strong> {extractedData.dob}</p>

    //                 {extractedData.address && (
    //                     <div className="mt-4">
    //                         <h3 className="text-lg font-semibold text-gray-300">Address:</h3>
    //                         <p><strong>Door No:</strong> {extractedData.address.doorNo}</p>
    //                         <p><strong>Street:</strong> {extractedData.address.street}</p>
    //                         <p><strong>Village:</strong> {extractedData.address.village}</p>
    //                         <p><strong>Taluk:</strong> {extractedData.address.taluk}</p>
    //                         <p><strong>District:</strong> {extractedData.address.district}</p>
    //                         <p><strong>Pincode:</strong> {extractedData.address.pincode}</p>
    //                     </div>
    //                 )}
    //                 <button className="mt-6 bg-red-500 px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition w-full text-white" onClick={() => setIsModalOpen(false)}>
    //                     Close
    //                 </button>
    //             </Modal>
    //         )}

    //         <ToastContainer position="top-right" autoClose={3000} />
    //     </div>
    // );


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center py-12 px-4 animate-fade-in">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12 drop-shadow-2xl tracking-wider animate-bounce">
                Aadhaar OCR Scanner
            </h1>

            <div className="upload-container flex flex-col md:flex-row gap-8">
                {[
                    { isFront: true, image: frontImage, label: "Upload Front Side" },
                    { isFront: false, image: backImage, label: "Upload Back Side" },
                ].map(({ isFront, image, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center bg-gray-700 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300 hover:shadow-purple-500/50"
                    >
                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt={label}
                                className="h-48 w-48 object-cover rounded-lg mb-6 border-2 border-purple-500"
                            />
                        )}
                        <input
                            type="file"
                            id={label}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, isFront)}
                        />
                        <label
                            htmlFor={label}
                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600 transition cursor-pointer"
                        >
                            {label}
                        </label>
                    </div>
                ))}
            </div>

            <button
                onClick={processOCR}
                className="mt-12 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-12 py-4 rounded-xl shadow-2xl hover:from-green-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
                disabled={loading || !frontImage || !backImage}
            >
                {loading ? "Processing..." : "Extract Aadhaar Data"}
            </button>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Extracted Aadhaar Details
                    </h2>
                    <div className="space-y-4 text-left">
                        {/* Unique Data Section */}
                        <div className="bg-gradient-to-r from-purple-700 to-blue-800 p-6 rounded-xl shadow-lg">
                            <p className="text-white"><strong>Name:</strong> {extractedData.name}</p>
                            <p className="text-white"><strong>Aadhaar No:</strong> {extractedData.aadhaarNumber}</p>
                            <p className="text-white"><strong>Gender:</strong> {extractedData.gender}</p>
                            <p className="text-white"><strong>Date of Birth:</strong> {extractedData.dob}</p>
                        </div>

                        {/* Address Section (if available) */}
                        {extractedData.address && (
                            <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 text-gray-300">Address:</h3>
                                <p className="text-gray-200"><strong>Door No:</strong> {extractedData.address.doorNo}</p>
                                <p className="text-gray-200"><strong>Street:</strong> {extractedData.address.street}</p>
                                <p className="text-gray-200"><strong>Village:</strong> {extractedData.address.village}</p>
                                <p className="text-gray-200"><strong>Taluk:</strong> {extractedData.address.taluk}</p>
                                <p className="text-gray-200"><strong>District:</strong> {extractedData.address.district}</p>
                                <p className="text-gray-200"><strong>Pincode:</strong> {extractedData.address.pincode}</p>
                            </div>
                        )}
                    </div>
                    <button
                        className="mt-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:from-red-600 hover:to-pink-600 transition w-full"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                </Modal>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default Aadhar;
