import { Outlet } from "react-router-dom"

import Navbar from "./navbar"
import Side from './sideBar'
const Master2 = ()=>{

    return(

<div className="h-svh">

    <div className="flex flex-row">
    <Navbar/>
    <div className="w-full">
    <Side/>
    <div ><Outlet/></div>
    
    </div>
    </div>

</div>

    )
}

export default Master2