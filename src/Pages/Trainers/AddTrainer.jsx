import { useState } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import AddNewTrainerForm from './AddNewTrainerForm.jsx';
import './AddTrainer.scss';

const AddTrainers = () => {

    const { id } = useParams();
    const [showAlert, setShowAlert] = useState(false);
    const formNames = ['Basic Details', 'Contacts', 'Experience', 'Education', 'Documents'];
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [filledForms, setFilledForms] = useState({
        'Basic Details': false,
        'Contacts': false,
        'Experience': false,
        'Education': false,
        'Documents': false,
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        const currentForm = formNames[activeFormIndex];

        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));

        if (activeFormIndex < formNames.length - 1) {
            setActiveFormIndex(activeFormIndex + 1);
        }

        event.preventDefault();
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 4300);
    };

    return (
        <>
            {/* {showAlert ? <div><Confetti /> <div id='showAlert'><p>Form Submit Successfully</p></div> </div> : ''} */}
            <div className="employee-form">
                <div className="top-bar">
                    <h2><div className='span'><HiUserPlus />
                    </div>
                        {id ? "Edit Trainer" : "Add Trainer"}</h2>
                    <Link to={"/trainers"} className="close_nav">
                        <TfiClose />
                    </Link>
                    <div className="">
                        <span className="1"></span>
                        <span className="2"></span>
                        <span className="3"></span>
                        <span className="4"></span>
                        <span className="5"></span>
                        <span className="6"></span>
                        <span className="7"></span>
                        <span className="8"></span>
                        <span className="9"></span>
                        <span className="10"></span>
                    </div>
                </div>
                <div className="form-content">
                    <AddNewTrainerForm onSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
};

export default AddTrainers;


// 

