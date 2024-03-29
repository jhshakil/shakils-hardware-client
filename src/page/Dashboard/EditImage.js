import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const EditImage = () => {
    const { register, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    const imageStorageKey = 'd4926ea4d5adb9f79094a31d6e141835'
    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const userData = { img }
                    const url = `https://shakils-hardware-server.vercel.app/picture/${user.email}`;
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        }, body: JSON.stringify(userData)
                    }).then(res => res.json()).then(result => {
                        return toast.success('Update successfully');
                    })
                }
            })
    }

    return (
        <div>
            <div className=''>
                <label htmlFor="edit-image" className="btn my-8">Edit Photo</label>
                <input type="checkbox" id="edit-image" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <label htmlFor="edit-image" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Picture</span>
                                </label>
                                <input type="file"
                                    className="input input-bordered w-full"
                                    {...register("image")}
                                />
                            </div>
                            <input className='btn btn-natural my-4 block m-auto w-full font-bold' type="submit" value='Update' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EditImage;