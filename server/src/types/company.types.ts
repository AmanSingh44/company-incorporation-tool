export interface CreateCompanyDTO {
  name: string;
  shareholderCount: number;
  totalCapital: number;
}

export interface AddShareholdersDTO{
    firstName:string;
    lastName:string;
    nationality:string;
}