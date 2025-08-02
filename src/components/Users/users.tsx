import{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Load from '../Load/load';
import { Dialog, DialogPanel } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {

  const [data, setData] = useState([]);
  
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 6;
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
      <div>  
        {loading ? (
          <Load />
        ) : (
          <div className="m-4">
            <ToastContainer limit={1} />
            <div className="flex justify-between w-[100%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[80%] m-auto p-2">
              <h1 className="font-bold text-gray-200 text-lg m-2">Users List</h1>
              <Link to="/dashboard/addUser" className="bg-yellow-500 px-2 text-white text-sm rounded-lg flex items-center gap-1">
                <FaUserPlus size={20} />
                ADD USER
              </Link>
            </div>
            <hr className="w-[90%] m-auto h-2 bg-gray-300 my-3"  />

            <div className='overflow-x-auto w-full m-auto'>
              <table className="border-collapse m-auto">
                <thead>
                  <tr className="text-gray-400 font-serif">
                    <th className="px-5">Image</th>
                    <th className="px-2">First Name</th>
                    <th className="px-2">Last Name</th>
                    <th className="px-2">Email</th>
                    <th className="px-2" >Age</th>
                    <th className="px-2">Phone</th>
                    <th className="px-2">Birth Date</th>
                    <th className="px-5"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((el: any) => (
                    <tr key={el.id} className="text-gray-400 font-serif">
                      <td className="px-5"><img src={el.image} alt="img" className="w-16 h-16 rounded-xl" /></td>
                      <td className="px-4">{el.firstName}</td>
                      <td className="px-4">{el.lastName}</td>
                      <td className="px-2">{el.email}</td>
                      <td className="px-4">{el.age}</td>
                      <td className="px-2">{el.phone}</td>
                      <td className="px-4">{el.birthDate}</td>
                      <td>
                        <div className="flex gap-6 text-yellow-500 cursor-pointer p-5">
                          <MdDelete size={24} onClick={() => open(el.id)} />
                          <Link to={`/dashboard/addUser/${el.id}`}><FaEdit size={24} /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center m-2 mt-8">
              <button
                onClick={() => setCurrent(current > 1 ? current - 1 : current)}
                className="px-1 py-2 mx-1 text-white bg-yellow-500 rounded"
                disabled={current === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index + 1)}
                  className={`px-1 py-2 mx-1 rounded ${current === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrent(current < totalPages ? current + 1 : current)}
                className="px-1 py-2 mx-1 text-white bg-yellow-500 rounded"
                disabled={current === totalPages}
              >
                Next
              </button>
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
