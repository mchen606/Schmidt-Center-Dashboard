import { Fragment } from 'react';
import MyForm from '../components/drawCanvas';
//import DisplayOnSubmit from '../helpers/drawCanvas.js';
function DashBoard() {
  return (
       <>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-600">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg">
                
               </div>
            </div>
            {/* /End replace */}
          </div>
          <MyForm />
        </main>
    </>
  )
}
export default DashBoard;