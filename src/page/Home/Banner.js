import React from 'react';
import bannerImage from '../../image/banner/banner.jpg'

const Banner = () => {
    return (
        <div class="hero min-h-min bg-gradient-to-r from-primary to-secondary text-white">
            <div class="hero-content py-0 flex-col justify-between lg:flex-row-reverse">
                <img src={bannerImage} class="max-w-lg" alt='Banner' />
                <div className='p-8'>
                    <h1 class="text-5xl font-bold">Box Office News!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;