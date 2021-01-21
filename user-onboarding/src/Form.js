import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import NewUsers from './NewUsers';

const validationSchema = yup.object({
    user: yup.string().required('username is required'),
    email: yup.string().email('Must be a valid email').required('email is required'),
    terms: yup.boolean().oneOf([true], 'You must agree to the terms'),
    role: yup.string().oneOf(['1', '2', '3', '4', '5'], 'You need to make atleast one selection'),
    password: yup.string().required('password is required')
    .min(8, "Minimum 8 characters required")
    .matches(/(?=.*[a-z])/, 'one lowercase required!')
    .matches(/(?=.*[A-Z])/, 'one uppercase required!')
    .matches(/(?=.*[0-9])/, 'one numeric character required'),
})

const Form = (props) => {
    const [form, setForm] = useState({
        user: '',
        email: '',
        password: '',
        terms: false,
        role: '',
    });

    const [errors, setErrors] = useState({
        user: '',
        email: '',
        password: '',
        terms: '',
        role: '',
    });

    const [disabled, setDisabled] = useState(true);
    const [newUsers, setNewUsers] = useState([]);

    //This will set or clear the errors value in the state based on whether the validation test passes or not
    const setFormErrors = (name, value) => {
        yup.reach(validationSchema, name).validate(value)
        .then(() => setErrors({...errors, [name] : ''}))
        .catch(err => {
            setErrors({...errors, [name]: err.errors})
        })
    }

    const change = event => {
        const {checked, value, name, type} = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        setFormErrors(name, updatedValue);
        setForm({...form, [name] : updatedValue});

    }

    const submit = (evt) => {
        //This will prevent form refresh
        evt.preventDefault();
        const newUser = {
            user: form.user.trim(),
            email: form.email,
            password: form.password, 
            terms: form.terms,
            role: form.role,
        }
        axios.post('https://reqres.in/api/users', newUser)
        .then((response) => {
            console.log(response.data);
            setForm({user: '', email: '', password: '', terms: false, role: ''})
            setNewUsers([...newUsers, response.data]);
        })
        .catch((err) => console.log(err))
    }

    //This will enable the submit button when the required validation tests are passed
    useEffect(() => {
        validationSchema.isValid(form)
        .then(valid => setDisabled(!valid))
    }, [form])

    return (
        <div className='form'>
            <form onSubmit={submit}>
                <label>Name: 
                    <input onChange={change} value={form.user} name='user' type='text'/>
                </label>
                
                <label>Email:
                    <input onChange={change} value={form.email} name='email' type='email'/>
                </label>

                <label>Password:
                    <input onChange={change} value={form.password} name='password' type='text'/>
                </label>

                <label>Do you agree with the terms of service?
                    <input onChange={change} checked={form.terms} name='terms' type='checkbox'/>
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
                <div className="errorsContainer">
                    {errors.user && <p>{errors.user}</p>}
                    {errors.terms && <p>{errors.terms}</p>}
                    {errors.role && <p>{errors.role}</p>}
                    {errors.email && <p>{errors.email}</p>}
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button disabled={disabled}>Submit</button>
            </form>
            <NewUsers users={newUsers}/>
        </div>
    );
}

export default Form;