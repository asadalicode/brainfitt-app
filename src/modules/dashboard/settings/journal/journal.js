import { useEffect, useState } from 'react';
import Style from './journal.module.scss';
import settingCommonStyle from '../common.module.scss';
import { ReactComponent as EditPen } from '../../../../assets/images/edit.svg';
import { ReactComponent as AddRoundedIcon } from '../../../../assets/images/addRoundedIcon.svg';
import { ReactComponent as LeftArrow } from '../../../../assets/images/leftArrow.svg';
import AddNote from './addNote/addNote';
import { getNoteAPICall } from '../settingService/settingService';

const Journal = ({ handleBackArrow }) => {
    const [isAddNote, setIsAddNote] = useState(false);
    const [journalArray, setJournalArray] = useState([]);


    useEffect( ()=>{
        getJournalArray()
    },[isAddNote])
    
    const getJournalArray = async () => {
        setJournalArray(await getNoteAPICall())
    }

    const handleAddNote = (value) => {
        setIsAddNote(value)
        handleBackArrow?.(!value);
        !value&&getJournalArray()
    }

    return (
        <>
            <div className={`d-flex justify-content-center mb-3 ${Style.header}`}>
                {isAddNote &&
                    <span className={`cursor-pointer ${Style.backArrow}`}
                        onClick={() => handleAddNote(false)}
                    >
                        <LeftArrow width={35} height={30} fill={"white"} />
                    </span>
                }
                <h5>
                    {isAddNote ? 'Add Note' : 'Journal'}
                </h5>
            </div>

            <div className={`${settingCommonStyle.contentContainer}`}>
                {
                    !isAddNote
                        ? <>
                            <span className='d-flex justify-content-end mb-4 cursor-pointer'
                                onClick={() => handleAddNote(true)}
                            >
                                <AddRoundedIcon height={20} />
                                Add Note
                            </span>
                            {
                                journalArray.length ?
                                journalArray?.map((item) =>
                                    <JournalCard
                                        key={Math.random()}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ):
                                <div className={"d-flex justify-content-center"} >No Note avalilable </div>
                            }
                        </>
                        : <AddNote 
                            setIsAddNote={setIsAddNote}
                        />


                }

            </div>
        </>
    )
}
export default Journal;
const JournalCard = ({ title, description }) => {

    return (
        <div className={`${Style.journalCard} mb-3`}>
            <div className='d-flex'>
                <div className='d-flex align-items-center mb-1'>
                    <div className={`${Style.avatar} d-flex justify-content-center align-items-center`}>
                        <EditPen height={25} width={25} fill="rgba(206, 205, 205, 0.7)" />
                    </div>
                </div>
                <div className={`${Style.infoContainer}`}>
                    <p className={`mb-0 text-truncate ${Style.title}`}>{title}</p>
                    <p className={`${Style.description}`}>{description}</p>
                </div>
            </div>
        </div>
    )
}