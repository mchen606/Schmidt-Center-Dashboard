import { useState } from 'react';
import { render } from 'react-dom';
import dataImg from '../resources/images/data.png';
const displayChart = require('./displayChart');
export function HandleInputForm() {
  // const canvasObj = canvasRef.current;
  // const ctx = canvasObj.getContext('2d');
  const [inputs, setInputs] = useState({
    sensorid: '',
    startdate: '',
    enddate: '',
    temperature: false,
    aqi: false,
    humidity: false,
    pm_1: false,
    pm_25: false,
    pm_10: false
  });

  const handleChange = (e) => {
    setInputs((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    setInputs((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.checked
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert('This was submitted: ' + JSON.stringify(inputs));
    const rootElement = document.getElementById('chart-display');
    const Display = () => displayChart.ShowChart(inputs);
    render(<Display />, rootElement);
    //displayChart.showChart(inputs.sensorid, inputs.startdate, inputs.enddate);
    //getRequestedData(inputs.sensorid, inputs.startdate, inputs.enddate);
  };

  return (
    <>
      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-4 md:gap-6'>
          <div className='md:col-span-2'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Compare Sensors
              </h3>
              <img src={dataImg} alt={'dataImg'} />
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form
              onSubmit={handleSubmit}
              className='user-inputs'
              method='post'
              name='user-input'
            >
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <div className='user-input'>
                      <label htmlFor='sensor-id'> Sensor: </label>
                      <select
                        name='sensorid'
                        id='sensor-id'
                        onChange={handleChange}
                        required
                        value={inputs.sensorid}
                      >
                        <optgroup label='North'>
                          <option value='102898'>
                            PGCPS_Schmidt_CenterBldg (outside)
                          </option>
                          <option value='104786'>
                            PGCPS_Schmidt_Orme (outside)
                          </option>
                          <option value='102830'>
                            PGCPS_LargoIntl_Rm125 (outside)
                          </option>
                          <option value='102890'>PGCPS_GwynnPHS_Temp3</option>
                          <option value='131815'>Riverdale Park</option>
                        </optgroup>
                        <optgroup label='Central'></optgroup>
                        <optgroup label='Rural'></optgroup>
                        <optgroup label='Inner'>
                          <option value='114799'>Cheverly (outside)</option>
                          <option value='57841'>
                            CheverlyAQM_W3_1 (outside)
                          </option>
                          <option value='52833'>
                            CheverlyAQM_W1_2 (outside)
                          </option>
                          <option value='53677'>
                            CheverlyAQM_W1_1 (outside)
                          </option>
                          <option value='53663'>
                            CheverlyAQM_W1_3 (outside)
                          </option>
                          <option value='53775'>
                            CheverlyAQM_W2_2 (outside)
                          </option>
                          <option value='54259'>
                            CheverlyAQM_W2_3 (outside)
                          </option>
                        </optgroup>
                        <optgroup label='South'></optgroup>
                      </select>
                    </div>
                    <div className='user-input'>
                      <label htmlFor='start-date'> Start Date: </label>
                      <input
                        type='date'
                        id='start-date'
                        name='startdate'
                        value={inputs.startdate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='user-input'>
                      <label htmlFor='end-date'> End Date: </label>
                      <input
                        type='date'
                        id='end-date'
                        name='enddate'
                        value={inputs.enddate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <fieldset>
                    <legend className='text-base font-medium text-gray-900'>
                      Choose fields to compare
                    </legend>
                    <p className='text-gray-500'>
                    </p>
                    <div className='mt-4 space-y-4'>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='temperature'
                            name='temperature'
                            value={inputs.temperature}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='temperature'
                            className='font-medium text-gray-700'
                          >
                            Temperature
                          </label>
                          <p className='text-gray-500'>
                            Get notified when someones posts a comment on a
                            posting.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='humidity'
                            name='humidity'
                            value={inputs.humidity}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='humidity'
                            className='font-medium text-gray-700'
                          >
                            Humidity
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate applies for a job.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='aqi'
                            name='aqi'
                            value={inputs.aqi}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='aqi'
                            className='font-medium text-gray-700'
                          >
                            AQI (Air Quality Index)
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='pm_1'
                            name='pm_1'
                            value={inputs.pm_1}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='pm_1'
                            className='font-medium text-gray-700'
                          >
                            PM_1.0 (Atmospheric Particulate Matter: 1.0
                            micrometers or less)
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='pm_25'
                            name='pm_25'
                            value={inputs.pm_25}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='pm_25'
                            className='font-medium text-gray-700'
                          >
                            PM_2.5 (Atmospheric Particulate Matter: 2.5
                            micrometers or less)
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            type='checkbox'
                            id='pm_10'
                            name='pm_10'
                            value={inputs.pm_10}
                            onChange={handleCheckboxChange}
                            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='pm_10'
                            className='font-medium text-gray-700'
                          >
                            PM_10.0 (Atmospheric Particulate Matter: 10.0
                            micrometers or less)
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
                    value='Submit'
                    id='submit'
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Generate Graph
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='chart-display' id='chart-display'></div>
    </>
  );
}

export default HandleInputForm;
