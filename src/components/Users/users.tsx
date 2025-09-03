import{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Load from '../Load/load';
import { Dialog, DialogPanel } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import style from "./users.module.css"
const Users = () => {

  const [data, setData] = useState([]);
  const [AllData, setAllData] = useState([]);
  
  const [current, setCurrent] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); 
  const lastIndex = current * itemsPerPage;
  const startIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(startIndex, lastIndex);

  
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const open = (id: any) => {
    setIsOpen(true);
    setUserId(id);
  };

  const close = () => {
    setIsOpen(false);
  };

  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setData(response.data.users);
      setAllData(response.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


 
  const Delete = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      toast('Delete is successful!');
      getData(); // تحديث البيانات بعد الحذف
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
  <ToastContainer limit={1} />
  
      <div>  
        {loading ? (
          <Load />
        ) : (
          <div className="lg:ml-60 p-4 bg-gray-100 min-h-screen pt-4">
          
            <div className="flex justify-between items-center py-8 md:py-4 p-4">
              <h1 className="font-bold text-2xl m-2">Users</h1>
              <Link to="/dashboard/addUser">
                <button className='bg-black text-white p-2 rounded-lg font-bold'>+ New user</button>
              </Link>
            </div>

            <div className='bg-white rounded-xl'>
              <div className="flex justify-between items-center p-2">
<div className="relative">
  <input
  type="text"
  className="w-64 h-10 rounded-full pl-10 pr-4 bg-gray-100 focus:bg-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
  placeholder="Search..."
 onChange={(e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== '') {
   const filteredData = AllData.filter((item: any) =>
        item.firstName.toLowerCase().startsWith(searchTerm)
      );
      setData(filteredData);
    } else {
   setData(AllData); 
    }
  }}
/>
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
    <CiSearch size={20} />
  </span>
</div>

              </div>
              <div className='overflow-x-auto'>
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-gray-100 font-serif h-12">
                    <th className={style.th}>Image</th>
                    <th className={style.th}>First Name</th>
                    <th className={style.th}>Last Name</th>
                    <th className={style.th}>Email</th>
                    <th className={style.th} >Age</th>
                    <th className={style.th}>Phone</th>
                    <th className={style.th}>Birth Date</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentData.map((el: any) => (
                    <tr key={el.id} className="font-serif">
                      <td className={style.td}><img src={el.image} alt="img" className="w-16 h-16 rounded-xl m-auto" /></td>
                      <td className={style.td}>{el.firstName}</td>
                      <td className={style.td}>{el.lastName}</td>
                      <td className={style.td}>{el.email}</td>
                      <td className={style.td}>{el.age}</td>
                      <td className={style.td}>{el.phone}</td>
                      <td className={style.td}>{el.birthDate}</td>
                      <td className={style.td}>
                        <div className="flex gap-6 text-green-700 cursor-pointer p-5">
                          <MdDelete size={24} onClick={() => open(el.id)} />
                          <Link to={`/dashboard/addUser/${el.id}`}><FaEdit size={24} /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
 <div className="flex justify-end  gap-4 p-2">



<div className="flex text-sm md:text-md">
  <p className="flex items-center gap-2">
    Rows per page: 
    <select
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrent(1); // عشان يرجع لأول صفحة بعد تغيير العدد
      }}
      className="border rounded p-1"
    >
      {[6, 10, 15, 20].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </p>
</div>



<div>
 <button
                >
                  {startIndex+1}-{lastIndex} of {data.length}
                </button>
</div>
               


<div>
  <button
                onClick={() => setCurrent(current > 1 ? current - 1 : current)}
                disabled={current === 1}
              >
                <IoIosArrowBack size={24} />
              </button>

          

              <button
                onClick={() => setCurrent(current < totalPages ? current + 1 : current)}
                disabled={current === totalPages}
              >
                <IoIosArrowForward  size={24}/>
              </button>
</div>

            
            </div>
         


            </div>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <DialogPanel className="w-max max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out">
                    <p className="mt-2 text-sm">Are you sure you want to delete this user?</p>
                    <div className="mt-4 flex gap-4">
                      <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                        onClick={() => { close(); Delete(); }}
                      >
                        Delete
                      </button>
                      <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                        onClick={close}
                      >
                        Close
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>

          </div>
        )}
      </div>
    </>
  );
}

export default Users;
