import { BAD_REQUEST, FORBIDDEN } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";


export const adminOnly=catchErrors(
    async(req,res,next)=>{
        const adminKey=req.headers["admin-key"] 

        appAssert(adminKey, BAD_REQUEST,"Admin key is required")
        appAssert(
            adminKey === process.env.ADMIN_KEY,
            FORBIDDEN,
            "Invalid admin key"
        );

        next()
     }
)