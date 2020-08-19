import React, {useState} from 'react';
import axios from 'axios'; 
//skeleton for various data
const defaultFormData = {
  'username': '',
  'email': '',
  'password': '',
  'tos': false,
}



function Form({inputChange}) {
  const [formData, setFormData] = useState(defaultFormData);
  const [disabled, setDisabled] = useState(true);

  const onInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  const submitData = (event) => {
    event.preventDefault();
    createAccount(formData);  
  }

  const createAccount = (accountData) => {
    axios.post('https://reqres.in/api/users', accountData)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  return (
    <form>
      <label>Username:&nbsp; 
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={onInputChange}
        />
      </label>
      <button disabled={false} onClick={submitData} >Submit</button>
    </form>
  )
}


export default Form;