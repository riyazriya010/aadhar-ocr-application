import Tesseract from "tesseract.js";
import sharp from 'sharp';

// export const extractText = async (imagePath: string): Promise<string | any> => {
//     try {
//       const { data } = await Tesseract.recognize(imagePath, "eng");
//       console.log()
//       console.log()
//       console.log('extract text :::',data)
//       return data.text;
//     } catch (err: any) {
//       console.error("Error extracting text from image:", err);
//       return "Error extracting text";
//     }
//   }


export const extractText = async (imagePath: string): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), // Logs progress
      // `oem` and `psm` should be inside `Tesseract.recognize`, not in WorkerOptions
    });

    console.log("\nExtracted text:\n", data.text);
    return data.text.trim();
  } catch (err) {
    console.error("Error extracting text from image:", err);
    return "Error extracting text";
  }
};



  
// export const parseAadhaarData = async (frontText: string, backText: string): Promise<any> => {
//     console.log()
//       console.log()
//       console.log('frontText :::',frontText)
//       console.log('backText :::',backText)
//     const aadhaarRegex = /\b(\d{4}\s\d{4}\s\d{4})\b/;
//     const dobRegex = /DOB[:\s]+(\d{2}\/\d{2}\/\d{4})/;
//     const genderRegex = /\b(MALE|FEMALE|OTHER)\b/i;
//     const nameRegex = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/m;
//     const pincodeRegex = /\b\d{6}\b/;

//     let aadhaarNumber =
//       frontText.match(aadhaarRegex)?.[1] ||
//       backText.match(aadhaarRegex)?.[1] ||
//       "Not found";
//     const dob = frontText.match(dobRegex)?.[1] || "Not found";
//     const gender = frontText.match(genderRegex)?.[1] || "Not found";
//     const name = frontText.match(nameRegex)?.[0] || "Not found";

//     const lines = backText
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line);
//     let address = "Not found";
//     let structuredAddress: any = {};

//     for (let i = 0; i < lines.length; i++) {
//       if (lines[i].toLowerCase().includes("address")) {
//         address = lines.slice(i + 1).join(" ");
//         break;
//       }
//     }

//     const addressParts = address.split(",");

//     const unwantedPatterns = /(\bS\/O\b|\bD\/O\b|\bW\/O\b|\b[0-9]+\/[0-9]+:)/gi;

//     structuredAddress = {
//       // doorNo: addressParts[1]?.trim() || "Not found",
//       doorNo: addressParts[1]?.replace(unwantedPatterns, "").trim() || "Not found",
//       street:
//         addressParts[2]
//           ?.trim()
//           .replace(/EE ed RS S/g, "")
//           .replace(/\s+/g, " ")
//           .trim() || "Not found",
//       village: addressParts[3]?.trim() || "Not found",
//       taluk: addressParts[4]?.trim() || "Not found",
//       block: addressParts[5]?.trim() || "Not found",
//       postOffice: addressParts[6]?.trim() || "Not found",
//       district: addressParts[7]?.replace(/DIST:\s*/i, "").trim() || "Not found",
//       state: addressParts[8]?.trim() || "Not found",
//       pincode: backText.match(pincodeRegex)?.[0] || "Not found",
//     };

//     const fields = [
//       aadhaarNumber,
//       dob,
//       gender,
//       name,
//       structuredAddress.doorNo,
//       structuredAddress.street,
//       structuredAddress.village,
//       structuredAddress.pincode,
//     ]
//     console.log()
//     console.log()
//     console.log(' fields  :::',fields)

//     const missingFields = [
//       aadhaarNumber,
//       dob,
//       gender,
//       name,
//       structuredAddress.doorNo,
//       structuredAddress.street,
//       structuredAddress.village,
//       structuredAddress.pincode,
//     ].filter((value) => value === "Not found").length;

//     if (missingFields > 2) {
//       throw new Error("Upload a valid Aadhaar image");
//     }

//     return { aadhaarNumber, dob, gender, name, address: structuredAddress };
//   }


export const parseAadhaarData = async (frontText: string, backText: string): Promise<any> => {
  console.log("Extracted Front Text:", frontText);
  console.log("Extracted Back Text:", backText);

  // Improved Aadhaar number regex to handle extra spaces and OCR errors
  const aadhaarRegex = /(\d{4}\s?\d{4}\s?\d{4})/;
  const dobRegex = /(?:DOB[:\s]*|D.O.B[:\s]*)(\d{2}\/\d{2}\/\d{4})/i;
  const genderRegex = /\b(MALE|FEMALE|OTHER|M|F|O)\b/i;

  // Improved Name Regex to allow variations
  const nameRegex = /(?:Name[:\s]*|)\b([A-Za-z\s]+)\b/;

  // Address-related regex
  const pincodeRegex = /\b\d{6}\b/;
  const addressRegex = /(S\/O|D\/O|W\/O|Address|Add:|House No[:\s]*|[A-Za-z\s,]*)/;

  // Extracting Aadhaar number
  let aadhaarNumber = frontText.match(aadhaarRegex)?.[1] || backText.match(aadhaarRegex)?.[1] || "Not found";

  // Extracting DOB, Gender, and Name
  const dob = frontText.match(dobRegex)?.[1] || backText.match(dobRegex)?.[1] || "Not found";
  const gender = frontText.match(genderRegex)?.[1]?.toUpperCase() || "Not found";
  const name = frontText.match(nameRegex)?.[1]?.trim() || "Not found";

  // Extracting Address
  const addressLines = backText.split("\n").map(line => line.trim());
  let address = "Not found";
  let structuredAddress: any = {};

  for (let i = 0; i < addressLines.length; i++) {
      if (addressLines[i].match(addressRegex)) {
          address = addressLines.slice(i + 1).join(" ");
          break;
      }
  }

  structuredAddress = {
      doorNo: address.split(",")[1]?.trim() || "Not found",
      street: address.split(",")[2]?.trim() || "Not found",
      village: address.split(",")[3]?.trim() || "Not found",
      district: address.split(",")[4]?.replace(/DIST[:\s]*/i, "").trim() || "Not found",
      state: address.split(",")[5]?.trim() || "Not found",
      pincode: backText.match(pincodeRegex)?.[0] || "Not found",
  };

  // Checking missing fields
  const missingFields = [aadhaarNumber, dob, gender, name, structuredAddress.pincode].filter(value => value === "Not found").length;

  if (missingFields > 2) {
      throw new Error("Upload a valid Aadhaar image");
  }

  return { aadhaarNumber, dob, gender, name, address: structuredAddress };
};






export const preprocessImage = async (imagePath: string): Promise<string> => {
    const processedPath = imagePath.replace(/\.(png|jpg|jpeg)$/, '_processed.png');
    await sharp(imagePath)
        .grayscale()
        .threshold(180)
        .toFile(processedPath);
    return processedPath;
};




//   export default {
//     parseAadhaarData,
//     extractText,
//   };
  


