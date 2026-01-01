import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';

import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';
import { useEffect } from 'react';

import GalleryImg1 from '../../assets/images/products/01.png'
import GalleryImg2 from '../../assets/images/products/02.png'



export default () => {
    useEffect(() => {
        if( !document.querySelector(".uppy-Root") ){
            new Uppy().use(Dashboard, { inline: true, target: '#uppy-dashboard' });
        }
    }, [])
    return (
        <section className='pt-3'>
            <div id='uppy-dashboard'></div>

            <div className='mt-3'>
                <div className='d-flex gap-2 flex-wrap'>
                    <div className='col-3'>
                        <div className='rounded' style={{ height: "200px",  border: "1px solid #f0f0f0ff", padding: "1px" }}>
                            <img src={GalleryImg1} className='w-100 h-100 cursor-pointer rounded' />
                        </div>
                        <p className='p-1 pb-0 mb-0'>lorem Ipsum wnadfg.png</p>
                        <p className='px-1 text-secondary'>23Kb
                            <span className="badge bg-primary-subtle text-primary ms-2" style={{ cursor: "pointer" }} >
                                Primary
                            </span>
                            <span className=" text-danger text-decoration-underline ms-2" style={{ cursor: "pointer" }} >
                                Delete
                            </span>
                        </p>
                    </div>

                    <div className='col-3'>
                        <div className='rounded' style={{ height: "200px",  border: "1px solid #f0f0f0ff", padding: "1px" }}>
                            <img src={GalleryImg2} className='w-100 h-100 cursor-pointer rounded' />
                        </div>
                        <p className='p-1 pb-0 mb-0'>lorem Ipsum wnadfg.png</p>
                        <p className='px-1 text-secondary'>23Kb
                            <span className=" text-danger text-decoration-underline ms-2" style={{ cursor: "pointer" }} >
                                Delete
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}