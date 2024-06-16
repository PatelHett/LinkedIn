import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const readFileAsDataURL = (file:File | Blob):Promise<string> =>{
  return new Promise((resolve)=>{
    const fileReader = new FileReader(); 
    fileReader.onloadend = ()=>{
        if(typeof fileReader.result === 'string') return resolve(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  })
}

