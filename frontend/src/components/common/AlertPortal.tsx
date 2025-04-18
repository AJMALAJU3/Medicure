import gsap from 'gsap';
import React from 'react';
import ReactDOM from 'react-dom';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/axiosInstance';


interface AlertPortalProps {
    message: string;
    onClose: () => void;
}

const AlertPortal: React.FC<AlertPortalProps> = ({ message, onClose }) => {
    const navigate = useNavigate()

    const logOut = async () => {
        await api.get('/api/auth/logout')
        navigate('/user/auth')
    }

    useGSAP(() => {
        gsap.from('.anim', {
            y: -100,
            ease: 'elastic',
            duration: 1
        })
    })

    return ReactDOM.createPortal(
        <div
            className='anim flex w-screen justify-center bg-black'
            style={alertStyle}
        >

            <div
                className="absolute z-50 flex flex-col w-3/4 h-24 overflow-hidden bg-[#ffdddd] shadow-lg max-w-96 rounded-xl border-t-2 border-red-500"
            >
                <div className='flex w-full justify-between items-center'>
                    <p
                            className="mt-1.5 flex pl-2 text-xl font-bold text-red-600 leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 flex-shrink-0 mr-2 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                    ></path>
                </svg>
                        Alert !
                    </p>
                <button className="pr-3 cursor-pointer focus:outline-none" onClick={onClose}>
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="#dc2626"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>

                </div>
                <div className="w-full mx-2.5 overflow-hidden">
                    
                    <p className="overflow-hidden leading-5 break-all max-h-10 text-red-600">
                        {message}
                    </p>
                    <p className='text-end mr-12 text-red-600 cursor-pointer ' onClick={logOut}>yes</p>
                </div>
                
            </div>

        </div>,
        document.getElementById('alert-root') as HTMLElement
    );
};

const alertStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    zIndex: 1000,
};

export default AlertPortal;
