import { useEffect, useState } from 'react';
import SimpleAccordion from '../../../../shared/components/accordian/accordian';
import settingCommonStyle from '../common.module.scss';
import { getFAQsAPICall } from '../settingService/settingService';

const QuestionAnswer = () => {
    const[questions, setQuestions]=useState([])
    useEffect(()=>{
        getFAQs()
    },[])
    const getFAQs = async () => {
        setQuestions(await getFAQsAPICall())
    }
    return (
        <div>
            <div className={`d-flex justify-content-center mb-4`}>
                <h5>
                    Q & A
                </h5>
            </div>
            <div className={`${settingCommonStyle.contentContainer}`}>
                {
                    <>
                        <span >Questions</span>
                        <div className='mt-3'>
                            {
                                questions?.map((question) =>
                                    <SimpleAccordion
                                        key={Math.random()}
                                        title={question.question}
                                        description={question.answer}
                                    />
                                )
                            }
                        </div>
                    </> 
                }

            </div>
        </div>
    );
}
export default QuestionAnswer;