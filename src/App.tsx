import axios from 'axios';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    house_no: '',
    street: '',
    pin_code: '110001',
    city: '',
    state: '',
  })
  const [data, setData] = useState([])
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }

  const submitForm = async (e: any) => {
    e.preventDefault()
    if(validate()){
      getRestaurant(formData.pin_code)
    }else{
      alert('fill all the field and pin code not less than 6 digits')
    }
  }
  const getRestaurant = async (pincode: String) => {
    const res = await axios.get(`http://localhost:5050/get_restaurant/${pincode}`)

    if(res.data.status === 'success'){
      if(res.data.data.length === 0) {
        alert('no data found')
      }
      setData(res.data.data)
    }else{
      alert('something went wrong')
    }
  }

  const validate = () => {
    if(isEmpty(formData.house_no) || isEmpty(formData.city) || isEmpty(formData.pin_code) || isEmpty(formData.state) || isEmpty(formData.street) || formData.pin_code.length < 6){
      return false
    }else{
      return true
    }
  }

  return (
    <div className="App"> 
      <form className='address_form' onSubmit={submitForm}>
        <h1>Fill Address Details</h1>
        <input type="text" name="house_no" placeholder='House number *' value={formData.house_no} 
        onChange={handleChange} />
        <input type="text" name="street" placeholder='Street *' value={formData.street} onChange={handleChange} />
        <input type='text' name='pin_code'  placeholder='Pin Code *' maxLength={6} value={formData.pin_code} onChange={handleChange} />
        <input type="text" name="city"  placeholder='City *' value={formData.city} onChange={handleChange} />
        <input type="text" name="state"  placeholder='State *' value={formData.state} onChange={handleChange} />
        <button type="submit">Search Restaurants</button> 
      </form>
      <div>
      {data?.map((item : any, i) => <p key={i}>{i + 1} {'->'} {item.name}</p>)}
      </div>
    </div>
  );
}

export default App;
