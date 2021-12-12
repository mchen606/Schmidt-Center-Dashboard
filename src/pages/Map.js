import MapView from '../components/MapView.js';
import { Fragment } from 'react';
import WeatherWidget from '../components/Weather-Widget.js';

function Map() {
  return ( 
    <>
      <header className='bg-white shadow'>
      <h1 className='text-3xl font-bold text-gray-600 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>Air Quality Map</h1>   
      </header>
      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex'>
          {/* Map Column*/}
          <div className='px-4 sm:px-0 w-3/4'>
            <MapView />
          </div>
          {/* Filters Column */}
          <div className='px-6 w-1/4 py-36'>
            <div>
              <WeatherWidget  />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}

export default Map;