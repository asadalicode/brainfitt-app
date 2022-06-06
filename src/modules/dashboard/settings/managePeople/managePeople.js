import { useEffect, useState } from 'react';
import settingCommonStyle from '../common.module.scss';
import Style from './managePeople.module.scss';
import { ReactComponent as AddPeople } from '../../../../assets/images/dashboardModule/settings/addPeople.svg';
import { ReactComponent as RemovePeople } from '../../../../assets/images/dashboardModule/settings/removePeople.svg';
import PersonCard from './personCard/personCard';
import Profile from '../profile/profile';
import { ReactComponent as LeftArrow } from '../../../../assets/images/leftArrow.svg';
import { getActiveSubscribePlanAPICall, getUserAPICall, removeUserAPICall } from '../settingService/settingService';
import { getBoostPlanAPICall } from '../../../home/homeService/homeService.js';
import { Spinner } from '../../../../shared/components/spinner/spinner';
import CustomButton from '../../../../shared/components/customButton/customButton';

// let people = [
//     { name: 'User 1', phoneNumber: '031234567890' },
//     { name: 'User 2', phoneNumber: '031234567890' },
//     { name: 'User 3', phoneNumber: '031234567890' },
// ];

const ManagePeople = ({ handleBackArrow }) => {

    const [managePeople, setManagePeople] = useState(0);
    const [title, setTitle] = useState('Manage People');
    const [people, setPeople] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isActivePlan, setIsActivePlan] = useState(false);
    const [isDisableRemoveBtn, setIsDisableRemoveBtn] = useState(true);
    const [isLoadingOnRemove, setIsLoadingOnRemove] = useState(true);
    let _selectedIds=[];

     useEffect( ()=>{
        getPeople()
    },[])

    const getPeople = async () => {
        let _ActivePlan =  await getActiveSubscribePlanAPICall()
        let _Plan = await getBoostPlanAPICall()
        let _getCreatedUser = await getUserAPICall()

        if(_ActivePlan?.data?.plan_id === 1 || _ActivePlan?.data?.parent_id !== 0 || !_ActivePlan?.success){
            setIsActivePlan(false)
            setIsDisableRemoveBtn(false)
        }else{
                let _active = _Plan.paymentPlanList.find(a => a.id === _ActivePlan?.data?.plan_id)
                if(!_getCreatedUser?.length){
                    setIsDisableRemoveBtn(false)
                }
                if(_getCreatedUser?.length < _active?.allowUser){
                    setIsActivePlan(true)
                }else{
                    setIsActivePlan(false)
                }
        }
        setIsLoading(false)
        setPeople(_getCreatedUser)
    }
    const fetchPeopleIds = (ids, check) =>{
        let _tempSelectedIds = _selectedIds
        if(check){
            _tempSelectedIds.push(ids)
        }else{
            _tempSelectedIds = _tempSelectedIds.filter(id=>id!=ids)
            _selectedIds=[]
            _selectedIds=_tempSelectedIds
        }
        // setIsDisableBtn(_tempSelectedIds.length ? false : true)
    }
    const handleRemovePeople = async () =>{
        setIsLoadingOnRemove(false)
        await removeUserAPICall({
            users:_selectedIds
        })
        await getPeople()
        setIsLoadingOnRemove(true)
    }
    const handleManagePeople = (value) => {
        setManagePeople(value);
        handleHeaderData(value);
        setIsDisableRemoveBtn(true)
    }
    const handleHeaderData = async (value) => {
        let _title = '';
        let _showBackArrow;
        switch (value) {
            case 0:
                _showBackArrow = true;
                _title = 'Manage People';
                await getPeople()
                break;
            case 1:
                _showBackArrow = false;
                _title = 'Add People';
                setSelectedPeople('')
                setIsUpdate(false)
                break;
            default:
                _showBackArrow = false;
                _title = 'Remove People';
        }
        handleBackArrow?.(_showBackArrow);
        setTitle(_title);
    }
    return (
        <>
            <div className={`d-flex justify-content-center align-items-center mb-3 ${Style.header}`}>
                {
                    managePeople !== 0 &&
                    <span onClick={() => handleManagePeople(0)} className={`cursor-pointer ${Style.backArrow}`}>
                        <LeftArrow height={35} fill={"white"} />
                    </span>
                }
                <h5>
                    {title}
                </h5>
            </div>
            <div className={`${settingCommonStyle.contentContainer}`}>
                {
                    managePeople === 0 &&
                    <>
                        <div className={`d-flex justify-content-between`}>
                            <div onClick={() => handleManagePeople(1)} style={{ pointerEvents: isActivePlan ? "auto" : "none"}} className={`d-flex flex-column cursor-pointer ${Style.managePeople}`}>
                                <AddPeople height={30} opacity={0.6} fill={isActivePlan ? '#fff' :'#000'}/>
                                <span className={`mt-3 ${isActivePlan ? '' :'text-dark'}`}>Add People</span>
                            </div>
                            <div onClick={() => handleManagePeople(2)} style={{ pointerEvents: isDisableRemoveBtn ? "auto" : "none"}} className={`d-flex flex-column cursor-pointer ${Style.managePeople}`}>
                                <RemovePeople height={30} opacity={0.6} fill={isDisableRemoveBtn ? '#fff' :'#000'}/>
                                <span className={`mt-3 ${isDisableRemoveBtn ? '' :'text-dark'}`}>Remove People</span>
                            </div>
                        </div>
                    </>
                }
                {(managePeople === 0 || managePeople === 2) ?
                    <>
                        {/* {
                            managePeople === 2 &&
                            <span className='d-flex justify-content-end cursor-pointer' onClick={handleRemovePeople}>Remove</span>
                        } */}

                        {
                            managePeople === 2 &&
                            <span className='d-flex justify-content-end cursor-pointer' >{isLoadingOnRemove?
                                <CustomButton buttonStyle={'bg-transparent text-white'} /*disabled={isDisableBtn}*/ handleButtonClick={handleRemovePeople}>Remove</CustomButton>:
                                <span className='d-flex justify-content-end cursor-pointer'><Spinner isWhite/></span>
                            }</span>
                        }


                        {!isLoading ? 
                            ( people?.length ? 
                                people?.map((item) =>
                                <div key={Math.random()} className='mt-4'>
                                    <PersonCard
                                        editPeople={managePeople === 2 ? false : true}
                                        setManagePeople={setManagePeople}
                                        setSelectedPeople={setSelectedPeople}
                                        setIsUpdate={setIsUpdate}
                                        person={item}
                                        removePeople={managePeople === 2 ? true : false}
                                        fetchPeopleIds={fetchPeopleIds}
                                    />
                                </div>
                            ):
                            <div className={"d-flex justify-content-center align-items-center h-50"} >
                                {isActivePlan ? 
                                    "No User avalilable":
                                    "You are unable to create users"
                                }
                                 </div>
                            ):
                            <div className={"d-flex justify-content-center h-50"} ><Spinner isWhite/> </div>
                        }
                    </>
                    : managePeople === 1 ?
                        <Profile
                            handleManagePeople={handleManagePeople}
                            selectedPeople={selectedPeople}
                            isUpdate={isUpdate}
                        />
                        : <></>
                }
            </div>

        </>
    );
}
export default ManagePeople;