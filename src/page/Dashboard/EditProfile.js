import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const EditProfile = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { data: profile, refetch } = useQuery('profile', () =>
        fetch(`https://shakils-hardware-server.vercel.app/profile?email=${user.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()))
    const onSubmit = async data => {
        const name = data.name;
        const location = data.location;
        const education = data.education;
        const linkedin = data.linkedin;
        const number = data.number;
        const userData = { name, location, education, linkedin, number }
        const url = `https://shakils-hardware-server.vercel.app/profile/${user.email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify(userData)
        }).then(res => res.json()).then(result => {
            console.log(result);
            toast.success('Update successfully');
            navigate('/dashboard')
            return refetch()
        })
    };
    return (
        <div className='mb-8'>
            <label htmlFor="edit-profile" className="btn modal-button">Edite Profile</label>
            <input type="checkbox" id="edit-profile" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="edit-profile" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                defaultValue={profile?.name}
                                placeholder="Enter Your Name"
                                className="input input-bordered w-full"
                                {...register("name")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text"
                                defaultValue={profile?.location}
                                placeholder="Enter Your Location"
                                className="input input-bordered w-full"
                                {...register("location")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input type="text"
                                defaultValue={profile?.education}
                                placeholder="Enter Your Education"
                                className="input input-bordered w-full"
                                {...register("education")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Linkedin Profile</span>
                            </label>
                            <input type="text"
                                defaultValue={profile?.linkedin}
                                placeholder="Enter Your Linkedin Profile"
                                className="input input-bordered w-full"
                                {...register("linkedin")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Number</span>
                            </label>
                            <input type="number"
                                defaultValue={profile?.number}
                                placeholder="Enter Your Number"
                                className="input input-bordered w-full"
                                {...register("number")}
                            />
                        </div>
                        <input className='btn btn-natural my-4 block m-auto w-full font-bold' type="submit" value='Update' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;