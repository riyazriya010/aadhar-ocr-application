import { IUserController } from "../interface/controller/userController.interface";
import { ControllerResponse } from "../interface/controller/userController.types";
import { parseAadhaarData, extractText } from "../integrations/extractData";

export class UserController implements IUserController {
  getextractdata = async (httpRequest: any): Promise<ControllerResponse> => {
    try {
      // console.log("Request received", httpRequest);

      if (!httpRequest.files || httpRequest.files.length < 2) {
        throw new Error("Two images (front and back) are required.");
      }

      const [frontImage, backImage] = httpRequest.files;
      console.log()
      console.log()
      console.log("Front Image Path :::", frontImage.path);
      console.log("Back Image Path :::", backImage.path);

      // const frontText = await this.extractText(frontImage.path);
      // const backText = await this.extractText(backImage.path);

      const frontText = await extractText(frontImage.path);
      const backText = await extractText(backImage.path);

      console.log()
      console.log()
      console.log("Front Image Text  ::::", frontText);
      console.log()
      console.log("Back Image Text  ::::", backText);

      // const extractedData = this.parseAadhaarData(frontText, backText);
      const extractedData = await parseAadhaarData(frontText, backText);

      console.log()
      console.log()
      console.log("parseAadhaarData   ::::", extractedData);

      return {
        headers: { "Content-Type": "application/json" },
        statusCode: 201,
        body: extractedData,
      };
    } catch (error: any) {
      console.error("Error in getextractdata:", error.message);
      return {
        headers: { "Content-Type": "application/json" },
        statusCode: 500,
        body: { error: error.message || "An unknown error occurred." },
      };
    }
  };


}


