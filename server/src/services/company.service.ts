import { prisma } from "../lib/prisma.js";
import { AddShareholdersDTO, CreateCompanyDTO } from "../types/company.types.js";


export const createCompany = async (data: CreateCompanyDTO) => {
  const company=await prisma.company.create({ 
    data:{
        name:data.name,
        shareholderCount:data.shareholderCount,
        totalCapital:data.totalCapital
    }
   });
  return company
};

export const addShareholders=async(
    companyId:string,
    shareholders:AddShareholdersDTO[]
)=>{
    const result=await prisma.shareholder.createMany({
        data: shareholders.map(s => ({ ...s, companyId })),
    })

    return result
}

export const getAllCompanies=async()=>{
    return prisma.company.findMany()
}

export const getCompany=async(companyId:string)=>{
    return prisma.company.findUnique({
    where: { id:companyId },
    include: { shareholders: true },
  });
}
