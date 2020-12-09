import React from 'react';
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

 export default function Register(props){
    
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = async data => {
        try {
            const { nickname, email, password } = data;
            const res = await axios.post('/auth/register', { nickname, email, password, type: 0 })
            const jwToken = res.data;
            console.log(jwToken);
            global.auth.setToken(jwToken);
            toast.success('Register successfully');
            props.history.push('/');
        } catch (error){
            const message = error.response.data.message;
            toast.error(message);
        }
    };

    return(
        <div className="login-wrapper">
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.nickname && 'is-danger'}`}
                            type="text" 
                            placeholder="nickname" 
                            name="nickname"
                            ref={register({
                                required: 'nickname is required',
                                }
                            )}
                        />
                        {
                            errors.nickname && (<p className="helper has-text-danger">{errors.nickname.message}</p>)
                        }
                    </div>
                </div>
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
                    <button className="button is-fullwidth is-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
