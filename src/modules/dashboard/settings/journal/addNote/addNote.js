import { useEffect, useState } from 'react';
import CustomButton from '../../../../../shared/components/customButton/customButton';
import InputField from '../../../../../shared/components/inputField/inputField';
import { addNoteAPICall } from '../../settingService/settingService';

const AddNote = ({setIsAddNote}) => {
    const [noteData, setnoteData]=useState({title: '',note: ''})
    const [isVisible, setIsvisible]=useState(true)
    const [isLoading, setIsLoading]=useState(false)

    useEffect(()=>{
        handleRequiredField()
    },[noteData])
    
    const handleChange = (name, value) => {
        setnoteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleRequiredField = () => {
        const {title, note}=noteData
        if(title && note){
            setIsvisible(false)
        }else{
            setIsvisible(true)
        }
    }
    const onSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        await addNoteAPICall(noteData);
        setIsAddNote(false)
      };
    return (
        <form className='mt-3' type="submit" onSubmit={onSubmit}>
            <InputField
                label={"Title"}
                placeholder={"Title"}
                onChange={(e)=>handleChange('title', e)}
            />
            <InputField
                label={"Note"}
                placeholder={"Note"}
                inputType={'textarea'}
                onChange={(e)=>handleChange('note', e)}
            />
            <div className='d-flex justify-content-center ' >
                <CustomButton
                  type="submit"
                  disabled={isVisible}
                  isLoading={isLoading}
                  buttonStyle={`mt-3 white-btn ${
                    isVisible ? 'text-muted': 'text-dark'
                  }`}
                >
                    Add Note
                </CustomButton>
            </div>
        </form>
    );
}
export default AddNote;