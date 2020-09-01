import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";

const AuthPage = () => {
  const { request } = useHttp();
  const [form, setForm] = useState({ name: '', password: '' });

  const changeForm = event => {
    console.log(form)
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/users', 'POST', {...form});
      console.log(data)
    } catch (e) {}
  }

  return (
    <div>
      <form action="" method='post'>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" name="name" onChange={changeForm}/>
        <label htmlFor="password">Password:</label>
        <input id="password" type="text" name="password" onChange={changeForm}/>
        <button type="button" onClick={registerHandler}>Submit</button>
      </form>
    </div>
)
};

export default AuthPage;