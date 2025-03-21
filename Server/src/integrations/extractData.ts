import Tesseract from "tesseract.js";

export const extractText = async (imagePath: string): Promise<string | any> => {
    try {
      const { data } = await Tesseract.recognize(imagePath, "eng");
      console.log()
      console.log()
      console.log('extract text :::',data)
      return data.text;
    } catch (err: any) {
      console.error("Error extracting text from image:", err);
      return "Error extracting text";
    }
  }

  
export const parseAadhaarData = async (frontText: string, backText: string): Promise<any> => {
    console.log()
      console.log()
      console.log('frontText :::',frontText)
      console.log('backText :::',backText)
    const aadhaarRegex = /\b(\d{4}\s\d{4}\s\d{4})\b/;
    const dobRegex = /DOB[:\s]+(\d{2}\/\d{2}\/\d{4})/;
    const genderRegex = /\b(MALE|FEMALE|OTHER)\b/i;
    const nameRegex = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/m;
    const pincodeRegex = /\b\d{6}\b/;

    let aadhaarNumber =
      frontText.match(aadhaarRegex)?.[1] ||
      backText.match(aadhaarRegex)?.[1] ||
      "Not found";
    const dob = frontText.match(dobRegex)?.[1] || "Not found";
    const gender = frontText.match(genderRegex)?.[1] || "Not found";
    const name = frontText.match(nameRegex)?.[0] || "Not found";

    const lines = backText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    let address = "Not found";
    let structuredAddress: any = {};

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes("address")) {
        address = lines.slice(i + 1).join(" ");
        break;
      }
    }

    const addressParts = address.split(",");

    const unwantedPatterns = /(\bS\/O\b|\bD\/O\b|\bW\/O\b|\b[0-9]+\/[0-9]+:)/gi;

    structuredAddress = {
      // doorNo: addressParts[1]?.trim() || "Not found",
      doorNo: addressParts[1]?.replace(unwantedPatterns, "").trim() || "Not found",
      street:
        addressParts[2]
          ?.trim()
          .replace(/EE ed RS S/g, "")
          .replace(/\s+/g, " ")
          .trim() || "Not found",
      village: addressParts[3]?.trim() || "Not found",
      taluk: addressParts[4]?.trim() || "Not found",
      block: addressParts[5]?.trim() || "Not found",
      postOffice: addressParts[6]?.trim() || "Not found",
      district: addressParts[7]?.replace(/DIST:\s*/i, "").trim() || "Not found",
      state: addressParts[8]?.trim() || "Not found",
      pincode: backText.match(pincodeRegex)?.[0] || "Not found",
    };

    const fields = [
      aadhaarNumber,
      dob,
      gender,
      name,
      structuredAddress.doorNo,
      structuredAddress.street,
      structuredAddress.village,
      structuredAddress.pincode,
    ]
    console.log()
    console.log()
    console.log(' fields  :::',fields)

    const missingFields = [
      aadhaarNumber,
      dob,
      gender,
      name,
      structuredAddress.doorNo,
      structuredAddress.street,
      structuredAddress.village,
      structuredAddress.pincode,
    ].filter((value) => value === "Not found").length;

    if (missingFields > 2) {
      throw new Error("Upload a valid Aadhaar image");
    }

    return { aadhaarNumber, dob, gender, name, address: structuredAddress };
  }



//   export default {
//     parseAadhaarData,
//     extractText,
//   };
  


