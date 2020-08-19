import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import * as yup from 'yup';
import formSchema from '../validation/formSchema';
//skeleton for various data
const defaultFormData = {
  'username': '',
  'email': '',
  'password': '',
  'tos': false,
}



function Form() {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  //check form for errors, and setFormErrors as necessary
  const throwErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
 }

  const onInputChange = (event) => {
    const {name, value} = event.target;
      throwErrors(name, value);
      setFormData({...formData, [name]: value})
  }

  const onCheckboxChange = (event) => {
    const {name, checked} = event.target;
    throwErrors(name, checked);
    setFormData({...formData, [name]: checked})
  }
  //catch changes and validate. Disable/Enable submit button accordingly
  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
    setDisabled(!valid);
    })
  }, [formData])

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
      <label>E-mail:&nbsp; 
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={onInputChange}
        />
      </label>
      <label>Password:&nbsp; 
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={onInputChange}
        />
      </label>
      <label>I agree to the Terms of Service:&nbsp; 
        <input
          type='checkbox'
          name='tos'
          checked={formData.tos}
          onChange={onCheckboxChange}
        />
      </label>
      <div className='errors'>
        <p>{formErrors.username}</p>
        <p>{formErrors.email}</p>
        <p>{formErrors.password}</p>
        <p>{formErrors.tos}</p>
      </div>
      <button disabled={disabled} onClick={submitData} >Submit</button>

    </form>
  )
}


export default Form;