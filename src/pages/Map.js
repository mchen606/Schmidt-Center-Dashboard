import MapView from '../components/MapView.js';
import { Fragment } from 'react';
import AQIWidget from '../components/AQI-Widget.js';
function Map() {
  return (
    <>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Air Quality Map</h1>
        </div>
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
          {/* Map Column*/}
          <div className='px-4 sm:px-0 w-3/4'>
            <MapView />
          </div>
          {/* Filters Column */}
          <div className='mx-6 sm:px-0 w-1/5 self-center'>
            <AQIWidget />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}

export default Map;
