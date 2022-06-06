import Style from './taskReport.module.scss';
import { ReactComponent as AngryIcon } from '../../../assets/images/homeModule/shareFeeling/angry.svg';
import { ReactComponent as SorrowIcon } from '../../../assets/images/homeModule/shareFeeling/sorrow.svg';
import { ReactComponent as LeftArrow } from '../../../assets/images/leftArrow.svg';

const TaskReport = ({ handleClick }) => {

    const handleDone = () => {
        handleClick();
    }

    return (
        <div>
            <div className='d-flex justify-content-between mb-2'>
                <span><LeftArrow height={30} width={30} fill={"white"} /> Report</span>
                <span onClick={handleDone} className='cursor-pointer'>Done</span>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h5>Comparison Report</h5>
                <span className='mt-2'>Name: Katrina Naylor</span>
                <span className='mt-5 pt-2'>Pre-Mood Assessment</span>

                <div className={`d-flex ${Style.emojiContainer}`}>
                    <div className={`${Style.emojiBox}`}>
                        <AngryIcon height={45} width={45} />
                        <span >Angry</span>
                    </div>
                    <div className={`${Style.emojiBox}`}>
                        <SorrowIcon height={45} width={45} />
                        <span>Confused</span>
                    </div>
                    <div className={`${Style.emojiBox}`}>
                        <AngryIcon height={45} width={45} />
                        <span>Sad</span>
                    </div>
                </div>

                <span className='mt-5 pt-2'>Post-Mood Assessment</span>
                <div className={`d-flex ${Style.emojiContainer}`}>
                    <div className={`${Style.emojiBox}`}>
                        <AngryIcon height={45} width={45} />
                        <span>Happy</span>
                    </div>
                    <div className={`${Style.emojiBox}`}>
                        <SorrowIcon height={45} width={45} />
                        <span>Sleeping</span>
                    </div>
                    <div className={`${Style.emojiBox}`}>
                        <AngryIcon height={45} width={45} />
                        <span>Blushing</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskReport;