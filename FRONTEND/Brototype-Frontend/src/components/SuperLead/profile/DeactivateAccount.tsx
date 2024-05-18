

const DeactivateAccount = () => {
    return (
        <>
        
        <section className="mt-0  w-full p-3 sm:p-5 ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative overflow-hidden border bg-white shadow-md sm:rounded-lg">
            <h1 className="font-roboto m-3 mb-0 ml-8 font-semibold">Delete Account</h1>
              <div className="flex flex-col m-5 h-16 bg-orange-100">
                 <p className="text-sm font-serif m-4 mt-3 mb-0 text-orange-400">Are you sure you want to delete your account?</p>
                         <p className="text-sm font-serif m-4 mt-1 mb-0 text-orange-400">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <div className="flex items-center m-5">
          <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="link-checkbox" className="ms-2 text-xs font-medium  text-gray-900 dark:text-gray-300">I confirm my account deactivation <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline"/></label>
          
      </div>
        <button type="button" className=" m-5 mt-0 focus:outline-none text-white hover:text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-1.5 mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Deactivate Account</button>
          </div>
      
      
      
        </div>
        
      </section>
      </>
    )
}

export default DeactivateAccount;
