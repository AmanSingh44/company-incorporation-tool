import { BAD_REQUEST } from "../constants/http.js";
import { AddShareholdersDTO, CreateCompanyDTO } from "../types/company.types.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";


export const companyValidator=catchErrors(
    async(req,res,next)=>{
        const body=req.body as CreateCompanyDTO

          appAssert(body.name, BAD_REQUEST, "Company name is required");
          appAssert(body.shareholderCount, BAD_REQUEST, "Shareholder count required");
          appAssert(body.totalCapital, BAD_REQUEST, "Total capital required");

          next();
    }
)


export const shareholdersValidator = catchErrors(async (req, res, next) => {
  const body = req.body as AddShareholdersDTO[];
 
  // Check that body is an array
  appAssert(Array.isArray(body), BAD_REQUEST, "Request body must be an array");

  // Validate each shareholder
  body.forEach((shareholder, index) => {
    appAssert(
      shareholder.firstName,
      BAD_REQUEST,
      `Shareholder #${index + 1}: firstName is required`
    );
    appAssert(
      shareholder.lastName,
      BAD_REQUEST,
      `Shareholder #${index + 1}: lastName is required`
    );
    appAssert(
      shareholder.nationality,
      BAD_REQUEST,
      `Shareholder #${index + 1}: nationality is required`
    );
  });

  next();
});