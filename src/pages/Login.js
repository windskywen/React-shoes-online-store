import React from 'react';
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

 export default function Login(props){
    
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = async data => {
        try {
            const { email, password } = data;
            const res = await axios.post('/auth/login', { email, password })
            const jwToken = res.data;
            console.log(jwToken);
            global.auth.setToken(jwToken)
            toast.success('Login success')
            props.history.push('/')
        } catch (error){
            const message = error.response.message;
            toast.error(message)
    }}

    return(
        <div className="login-wrapper">
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.email && 'is-danger'}`}
                            type="text" 
                            placeholder="Email" 
                            name="email"
                            ref={register({
                                required: 'email is required',
                                pattern: {
                                    value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                                    message: 'invalid email'
                                }
                            })}
                        />
                        {
                            errors.email && (<p className="helper has-text-danger">{errors.email.message}</p>)
                        }
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.password && 'is-danger'}`}
                            type="text" 
                            placeholder="Password" 
                            name="password"
                            ref={register({
                                required: 'password is required',
                                minLength: {
                                    value: 6,
                                    message: 'cannot be less than 6 digits'
                                }
                            })}
                        />
                        {
                            errors.password && (<p className="helper has-text-danger">{errors.password.message}</p>)
                        }
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Login</button>
                </div>
            </form>
        </div>
    )
}
