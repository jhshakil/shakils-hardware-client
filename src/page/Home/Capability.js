import React from 'react';
import bannerImage from '../../image/banner/capability.jpg'

const Capability = () => {
    return (
        <div className="hero min-h-min bg-gradient-to-r from-primary to-secondary text-white">
            <div className="hero-content py-0 justify-between flex-col lg:flex-row">
                <img src={bannerImage} className="max-w-lg mt-4 lg:mt-0 w-3/4 lg:w-full" alt='images' />
                <div className='p-8'>
                    <h1 className="text-3xl lg:text-5xl font-bold">Our Capability</h1>
                    <p className="py-6">We produce many categories of product. Per Day we produce 150000+ product in our factory and delivered this product timely and quickly</p>
                    {/* <button className="btn btn-natural font-bold">About Us</button> */}
                </div>
            </div>
        </div>
    );
};

export default Capability;