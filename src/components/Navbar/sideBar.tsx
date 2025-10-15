import { TfiArrowCircleLeft } from "react-icons/tfi";
import { useContext } from "react";
import { Context } from "../Context/context";



const Side = ()=>{
    
    const{ userData}:any = useContext(Context)




    return(
        <>
        <div className="flex lg:mr-60 px-4 py-2">
        <div className="flex justify-between items-center w-full gap-3 ">
              <div className="flex items-center gap-4">
                <TfiArrowCircleLeft size={25} className="mt-2" />
                <h1 className="font-bold text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl">  مرحبا  <span className="text-green-700">{userData.firstName}</span></h1>
              </div>
   
                <a href="/"><img src='/logo2.jpeg' alt="" className="w-24 h-24 rounded-lg" /></a>
            </div>
        </div>
      
    
        
       
        </>

    )
}

export default Side ;