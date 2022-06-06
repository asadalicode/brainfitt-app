import { useEffect, useState } from 'react';
import Style from './personCard.module.scss';
import { ReactComponent as Avatar } from '../../../../../assets/images/dashboardModule/settings/avatar.svg';
import { ReactComponent as CheckIcon } from '../../../../../assets/images/check.svg';
import environment from '../../../../../environment';

const PersonCard = ({ person, editPeople, setManagePeople, setSelectedPeople, setIsUpdate, removePeople = false, fetchPeopleIds }) => {
    const [checkBoxValue, setCheckBoxValue] = useState(false);

    const handleCheckValue =()=>{
        setCheckBoxValue((prev)=>!prev);
        fetchPeopleIds(person.id, !checkBoxValue)
    }

    const onEdit = (person) => {
        setSelectedPeople(person)
        setManagePeople(1)
        setIsUpdate(true)
    }

    return (
        <div className={`${Style.profileContainer}  box-border cursor-pointer d-flex justify-content-between`}
        >
            <div className='d-flex align-items-center'>
                {
                    removePeople &&
                    <div onClick={handleCheckValue} className={`${Style.checkBox} me-4`}>
                        {
                            checkBoxValue &&
                            <CheckIcon className={Style.checkIcon} width={18} />
                        }
                    </div>
                }
                <div className={`${Style.avatar} d-flex justify-content-center align-items-center`}>
                    {person.imageUrl?<img src={environment.serverUrl + person.imageUrl} className="rounded-circle" height={'100%'} width={'100%'} alt="profile"/>:
                    <Avatar height={50} width={50} fill="rgba(206, 205, 205, 0.6)" />}
                    
                </div>
                <div className={`${Style.userInfo} d-flex flex-column justify-content-center`}>
                    <h5 className={`mb-0 ${Style.username}`}>{person.firstName} {person.lastName}</h5>
                    <span className={`${Style.mobileNumber}`}>{person.mobileNumber}</span>
                </div>
            </div>
            {
                editPeople &&
                <div className={`d-flex flex-column justify-content-between ${Style.rightBox}`}>
                    <span className='align-self-end cursor-pointer' onClick={() => onEdit(person)}>Edit</span>
                </div>
            }
        </div>
    );
}
export default PersonCard;