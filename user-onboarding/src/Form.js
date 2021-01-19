import React, {useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const Form = (props) => {
    const [form, setForm] = useState({
        user: '',
        email: '',
        password: '',
        terms: false,
        role: '',
    });

    const change = event => {
        const {checked, value, name, type} = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
        console.log(updatedValue);
        setForm({...form, [name] : updatedValue});

    }
    return (
        <form>
            <h3>Sign Up Form</h3>
            <label>Name: 
                <input onChange={change} value={form.user} name='user' type='text'/>
            </label>

            <label>Email:
                <input onChange={change} value={form.email} name='email' type='email'/>
            </label>

            <label>Password:
                <input onChange={change} value={form.password} name='password' type='password'/>
            </label>

            <label>Do you agree with the terms of service?
                <input onChange={change} value={form.terms} name='terms' type='checkbox'/>
            </label>

            <label>Role:
                <select onChange={change} value={form.role} name="role">
                    <option value="">--Select One--</option>
                    <option value="1">Student</option>
                    <option value="2">Educator</option>
                    <option value="3">Software Engineer</option>
                    <option value="4">UX Designer</option>
                    <option value="5">Others</option>

                </select>
            </label>
            <button>Submit</button>
        </form>
    );
}

export default Form;