import { TfiArrowCircleLeft } from "react-icons/tfi";
import { useContext } from "react";
import { Context } from "./context";



const Side = ()=>{
    
    const{ userData}:any = useContext(Context)




    return(
        <>
        <div className="flex mt-4 ">
        <div className="flex justify-center items-center gap-4 bg-gray-900 w-full text-white">
              <div>
                <TfiArrowCircleLeft size={25} className="mt-2" />
              </div>
            <div className="flex gap-3">
                <h1 className="font-bold text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">welcome <span className="text-blue-500">{userData.firstName}</span></h1>
            </div>
        </div>
      
        </div>
        
       
        </>

    )
}

export default Side ;