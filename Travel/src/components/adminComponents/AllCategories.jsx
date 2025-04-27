import { getEnv } from "../../helpers/getEnv.js";
import { useFetch } from "../../hooks/userFetch.js";
import { FiSearch, FiEdit2, FiTrash2, FiChevronDown } from "react-icons/fi";
import Loading from "../Loading.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData } from "../../helpers/handleDelete.js";
import { showToast } from "../../helpers/showToast.js";

const CategoriesManagement = ({editClicked, setEditClicked}) => {
  
  const [refreshData, setRefreshData] = useState(false)
  const [query, setQuery] = useState();
  let [searchData, setSearchData] = useState();
  const {data: categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
    method : 'get',
    credentials: 'include'
  },[refreshData])

  let categories = categoryData?.category;

  useEffect(()=>{
    if (categories) {
      setSearchData(undefined);
    }

  },[categories])

  const handleDelete = (id) =>{
    const respnse = deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)
    if (respnse) {
      setRefreshData(!refreshData)
      showToast('success','Data deleted')

    }
    else{
      showToast('error','Data not deleted.')
    }
  }

    // search
  
    const getInput = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(query);
  
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/search/${query}`,
        {
          method: "get",
          credentials: "include",
        }
      );
  
      const data = await response.json();
      if (data?.category.length > 0) {
        setSearchData(data?.category);
        categories = [];
      }
    };

  
  
  if(loading) return <Loading/>
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">All Categories</h1>
        
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <form onSubmit={handleSubmit}>
                <input
                  name="q"
                  onInput={getInput}
            type="text"
            placeholder="Search categories..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          </form>
        </div>

       
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">SLUG</th>
              
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200 w-full">


            {searchData
                    ? searchData.map((category) =><tr key={category._id} className="">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {category.name}
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400">
                      {category.slug}
                    </td>
                    
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2 gap-4">
                        <button className="text-green-500 hover:text-green-300" onClick={()=>setEditClicked(true)}>
                          <Link to={`/admin-categories/edit/${category._id}`} >
                          <FiEdit2 className="h-5 w-5" />
                          </Link>
                        </button>
                        <button
                        onClick={()=>handleDelete(category._id)} className="text-red-400 hover:text-red-600">
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr> ):
            
            categories && categories.length > 0 ? categories.map(category => 
              <tr key={category._id} className="">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                  {category.name}
                  
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">
                  {category.slug}
                </td>
                
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2 gap-4">
                    <button className="text-green-500 hover:text-green-300" onClick={()=>setEditClicked(true)}>
                      <Link to={`/admin-categories/edit/${category._id}`} >
                      <FiEdit2 className="h-5 w-5" />
                      </Link>
                    </button>
                    <button
                    onClick={()=>handleDelete(category._id)} className="text-red-400 hover:text-red-600">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ) : <></>}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManagement;