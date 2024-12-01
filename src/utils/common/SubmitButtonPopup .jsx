import React from 'react'
import { Link } from 'react-router-dom';
import { TfiClose } from "react-icons/tfi";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const SubmitButtonPopup = ({ loading, id }) => {
    return (
        <div id=''>
            <div id='' >
                <div className=' buttons'>
                    {loading ?
                        <button id='svg_submit_loading_popup' disabled type="submit" >
                            <div className="svg_loading">
                                <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                                    <circle fill="#fff" stroke="none" cx="10" cy="50" r="3" >
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 15 ; 0 -15; 0 15"
                                            from="0 50 48"
                                            to="360 50 52"
                                            repeatCount="indefinite"
                                            begin="0.1" />
                                        <animate
                                            attributeName="opacity"
                                            dur="1s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.2" />
                                    </circle>
                                    <circle fill="#fff" stroke="none" cx="20" cy="50" r="3">
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 10 ; 0 -10; 0 10"
                                            repeatCount="indefinite"
                                            begin="0.2" />
                                        <animate
                                            attributeName="opacity"
                                            dur="2s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.2" />
                                    </circle>
                                    <circle fill="#fff" stroke="none" cx="30" cy="50" r="3">
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 5 ; 0 -5; 0 5"
                                            repeatCount="indefinite"
                                            begin="0.3" />
                                        <animate
                                            attributeName="opacity"
                                            dur="2s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.3" />
                                    </circle>
                                    <circle fill="#fff" stroke="none" cx="40" cy="50" r="3">
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 5 ; 0 -5; 0 5"
                                            repeatCount="indefinite"
                                            begin="0.4" />
                                        <animate
                                            attributeName="opacity"
                                            dur="2s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.4" />
                                    </circle>
                                    <circle fill="#fff" stroke="none" cx="50" cy="50" r="3">
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 5 ; 0 -5; 0 5"
                                            repeatCount="indefinite"
                                            begin="0.5" />
                                        <animate
                                            attributeName="opacity"
                                            dur="2s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.5" />
                                    </circle>
                                    <circle fill="#fff" stroke="none" cx="60" cy="50" r="3">
                                        <animateTransform
                                            attributeName="transform"
                                            dur="2s"
                                            type="translate"
                                            values="0 5 ; 0 -5; 0 5"
                                            repeatCount="indefinite"
                                            begin="0.6" />
                                        <animate
                                            attributeName="opacity"
                                            dur="2s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.6" />
                                    </circle>
                                </svg>
                            </div>
                        </button>
                        :
                        <button type="submit" className="submit-btn">
                            {id ? "Update" : "Submit"}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    }
                </div>

            </div>

        </div>
    )
}

export default SubmitButtonPopup 
