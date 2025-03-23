import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiCall from "../api/aadhar";

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
                // setIsModalOpen(true);
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

    const clearAll = () => {
        setExtractedData({});
        setFrontImage(null);
        setBackImage(null);

        // Reset file input fields manually
        const frontInput = document.getElementById("Front Image") as HTMLInputElement;
        const backInput = document.getElementById("Back Image") as HTMLInputElement;
        if (frontInput) frontInput.value = "";
        if (backInput) backInput.value = "";

        toast.info("All data cleared!");
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center py-12 px-4 animate-fade-in">
                <h1 className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg tracking-wider">
                    OCR Scanner
                </h1>

                {/* Image Upload Section */}
                <div>
                    <div className="upload-container flex flex-col md:flex-row gap-8">
                        {[
                            { isFront: true, image: frontImage, label: "Front Image" },
                            { isFront: false, image: backImage, label: "Back Image" },
                        ].map(({ isFront, image, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
                            >
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={label}
                                        className="h-48 w-48 object-cover rounded-lg mb-6 border-2 border-yellow-500"
                                    />
                                )}
                                <input
                                    type="file"
                                    id={label}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, isFront)}
                                />
                                {Object.keys(extractedData).length === 0 && !error && (
                                    <label
                                        htmlFor={label}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transition cursor-pointer"
                                    >
                                        {label}
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                    {Object.keys(extractedData).length === 0 && !error && (
                        <button
                            onClick={processOCR}
                            className="mt-12 bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:from-green-500 hover:to-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || !frontImage || !backImage}
                        >
                            {loading ? "Please Wait..." : "Submit"}
                        </button>
                    )}

                </div>
            </div>

            {/* Data Section */}
            <div>
                {Object.keys(extractedData).length > 0 && !error && (
                    <div className="data-section mt-6 bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl flex flex-col md:flex-row justify-between">
                        {/* Left Side - Person Details */}
                        <div className="personal w-full md:w-1/2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Person Details</h2>
                            <p><strong>Name:</strong> {extractedData.name}</p>
                            <p><strong>DOB:</strong> {extractedData.dob}</p>
                            <p><strong>Aadhaar No:</strong> {extractedData.aadhaarNumber}</p>
                            <p><strong>Gender:</strong> {extractedData.gender}</p>
                        </div>

                        {/* Right Side - Address */}
                        {extractedData.address && (
                            <div className="address w-full md:w-1/2">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Address</h2>
                                <p><strong></strong> {extractedData.address.doorNo},</p>
                                <p><strong></strong> {extractedData.address.street},</p>
                                <p><strong></strong> {extractedData.address.village},</p>
                                <p><strong></strong> {extractedData.address.taluk},</p>
                                <p><strong></strong> {extractedData.address.district},</p>
                                <p><strong></strong> {extractedData.address.pincode},</p>
                            </div>
                        )}
                    </div>
                )}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>

            {Object.keys(extractedData).length > 0 && !error && (
                <button
                    onClick={clearAll}
                    className="mt-4 bg-red-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                    Close
                </button>
            )}

        </>
    );


}

export default Aadhar;
