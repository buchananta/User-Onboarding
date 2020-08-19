import React, {useState} from 'react';
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



function Form({inputChange}) {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const onInputChange = (event) => {
    const {name, value} = event.target;
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
    setFormData({...formData, [name]: value})
  }

  formSchema.isValid(formData).then(valid => {
    setDisabled(!valid);
  })

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
      <button disabled={disabled} onClick={submitData} >Submit</button>
    </form>
  )
}


export default Form;