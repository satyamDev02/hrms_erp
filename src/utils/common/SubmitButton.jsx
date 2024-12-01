import React from 'react'
import { Link } from 'react-router-dom';
import { TfiClose } from "react-icons/tfi";
import { CiCircleChevRight } from "react-icons/ci";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const SubmitButton = ({ loading, navigate, nextSubmit, showNext, id }) => {
    return (
        <div id='submitBtn_next_main'>
            <div id='submitBtn' >
                <div className='div'>
                    {loading ?
                        <div id='svg_submit_loading'>
                            <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                                <circle fill="#fff" stroke="none" cx="10" cy="50" r="7" >
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
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
                                <circle fill="#fff" stroke="none" cx="35" cy="50" r="7">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 10 ; 0 -10; 0 10"
                                        repeatCount="indefinite"
                                        begin="0.2" />
                                    <animate
                                        attributeName="opacity"
                                        dur="1s"
                                        values="0;1;0"
                                        repeatCount="indefinite"
                                        begin="0.2" />
                                </circle>
                                <circle fill="#fff" stroke="none" cx="60" cy="50" r="7">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 5 ; 0 -5; 0 5"
                                        repeatCount="indefinite"
                                        begin="0.3" />
                                    <animate
                                        attributeName="opacity"
                                        dur="1s"
                                        values="0;1;0"
                                        repeatCount="indefinite"
                                        begin="0.2" />
                                </circle>
                                <circle fill="#fff" stroke="none" cx="85" cy="50" r="7">
                                    <animateTransform
                                        attributeName="transform"
                                        dur="1s"
                                        type="translate"
                                        values="0 5 ; 0 -5; 0 5"
                                        repeatCount="indefinite"
                                        begin="0.4" />
                                    <animate
                                        attributeName="opacity"
                                        dur="1s"
                                        values="0;1;0"
                                        repeatCount="indefinite"
                                        begin="0.2" />
                                </circle>
                            </svg>
                        </div>
                        :
                        <button type="submit" >
                            {id ? "Update" : "Submit"}
                        </button>
                    
                    }
                    {!loading ?
                        <span><CiCircleChevRight /></span>
                        :
                        ''
                    }
                </div>
                <div className="lineBar"></div>
                <Link to={navigate} className="x">
                    <span>
                        {" "}
                        <TfiClose />
                    </span>
                </Link>
            </div>
            {showNext &&
                <div className="form">
                    <p>Next Page</p>
                    <span className='not_active'><IoIosArrowDropleft /></span>
                    <button type="button" onClick={nextSubmit}>
                        <IoIosArrowDropright />
                    </button>
                </div>
            }
        </div>
    )
}

export default SubmitButton
