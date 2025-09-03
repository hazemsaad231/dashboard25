import { TfiArrowCircleLeft } from "react-icons/tfi";
import { useContext } from "react";
import { Context } from "../Context/context";



const Side = ()=>{
    
    const{ userData}:any = useContext(Context)




    return(
        <>
        <div className="flex lg:ml-60 p-2 bg-gray-100 rounded-xl">
        <div className="flex justify-end items-center gap-3">
              <div>
                <TfiArrowCircleLeft size={25} className="mt-2" />
              </div>
            <div className="flex gap-3">
                <h1 className="font-bold text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">welcome <span className="text-green-700">{userData.firstName}</span></h1>
            </div>
        </div>
      
        </div>
        
       
        </>

    )
}

export default Side ;