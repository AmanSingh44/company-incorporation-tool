import { BAD_REQUEST, CREATED, OK } from "../constants/http.js";
import { prisma } from "../lib/prisma.js";
import { addShareholders, createCompany, getAllCompanies, getCompany } from "../services/company.service.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";


export const createCompanyHandler=catchErrors(
    async(req,res)=>{
        const request=(req.body)
        const company=await createCompany(request)

        return res.status(CREATED).json({
            success:true,
            company
        })
    }

)

export const addShareholdersHandler=catchErrors(
    async(req,res)=>{
        const companyId = Array.isArray(req.params.companyId)
            ? req.params.companyId[0]
            : req.params.companyId;
        const shareholders=req.body
        appAssert(companyId,BAD_REQUEST,"Missing Company ID")
        const company = await prisma.company.findUnique({ where: { id: companyId }, include:{shareholders:true} });
        appAssert(company, BAD_REQUEST, "Company not found");

        const existingCount = company.shareholders.length;
        const remainingSlots = company.shareholderCount - existingCount;

        appAssert(
            remainingSlots > 0,
            BAD_REQUEST,
            "All shareholder slots are already filled"
        );

        appAssert(
            Array.isArray(shareholders),
            BAD_REQUEST,
            "Request body must be an array"
        );

        appAssert(
            shareholders.length === company.shareholderCount,
            BAD_REQUEST,
            `Number of shareholders must be exactly ${company.shareholderCount}`
        );
        const result=await addShareholders(companyId, shareholders)

        return res.status(CREATED).json({
            success:true,
            result
        })
    }
)

export const getCompaniesHandler=catchErrors(
    async(req,res)=>{
        const companies=await getAllCompanies()
        
        return res.status(OK).json({
            success:true,
            companies
        })
    }
)

export const getCompanyHandler=catchErrors(
    async(req,res)=>{
        const companyId = Array.isArray(req.params.companyId)
            ? req.params.companyId[0]
            : req.params.companyId;
        appAssert(companyId,BAD_REQUEST,"Missing Company ID")
        
        const company=await getCompany(companyId)
        return res.status(OK).json({
            success:true,
            company
        })
        
    }
)