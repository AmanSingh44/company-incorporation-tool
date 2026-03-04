import "dotenv/config"

const getEnv=(key:string,defaultValue?:string):string=>{
    const value=process.env[key]||defaultValue

    if(value===undefined){
        throw new Error(`Missing environment variable ${key}`)
    }
    
    return value
}



export const PORT=getEnv("PORT")
export const APP_ORIGIN=getEnv("APP_ORIGIN")
export const DATABASE_URL=getEnv("DATABASE_URL")
export const ADMIN_KEY=getEnv("ADMIN_KEY")