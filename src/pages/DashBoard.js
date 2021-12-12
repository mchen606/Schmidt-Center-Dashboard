import { Fragment } from 'react';
import HandleInputForm from '../components/dashboard';
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
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
            <div className='px-4 sm:px-0'>
              <HandleInputForm />
            </div> 
          </div>
        </main> 
    </>
  )
}
export default DashBoard;