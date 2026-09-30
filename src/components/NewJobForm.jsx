import {useState} from 'react'
import '../css/NewJobForm.css'

function NewJobForm({isActive, onCancel, onAdd}){
    const [jobTitle, setJobTitle] = useState("");
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [companyName, setCompanyName] = useState("");
    const [isCompanyValid, setIsCompanyValid] = useState(true);

    function handleJobTitleChanged(e){
        const raw = e.target.value;
        setJobTitle(raw);

        if(raw){
            setIsTitleValid(true);
        }
    }
    function handleCompanyNameChanged(e){
        const raw = e.target.value;
        setCompanyName(raw);

        if(raw){
            setIsCompanyValid(true);
        }
    }
    function validateFields(){
        let valid = true;
        if(!jobTitle){
            setIsTitleValid(false);
            valid = false
        }

        if(!companyName){
            setIsCompanyValid(false);
            valid = false;
        }

        if(valid === false) return false;

        setIsTitleValid(true)
        setIsCompanyValid(true);

        return true;
    }

    function handleCancelClicked(e){
        e.preventDefault();

        Close()
    }

    function Close(){
        setJobTitle("");
        setCompanyName("")
        setIsTitleValid(true)
        setIsCompanyValid(true);

        onCancel();
    }
    async function handleAddNewJob(e){
        e.preventDefault();

        if(!validateFields()){
            return;
        }
        const response = await fetch("http://localhost:3000/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobTitle,
                companyName
            })
        });

        const data = await response.json();
        console.log(data);
        onAdd();
        Close();
    }
    
    return <>
        <div className={`darken-bg ${isActive === true ? 'active' : ''}`}>
            <div className="job-form">
                <h1>Add new job</h1>
                
                <div className='validated-input'>
                <input className={`${isTitleValid ? '' : 'invalid'}`} placeholder="Job Title" value={jobTitle} onChange={handleJobTitleChanged}></input>
                {isTitleValid === false && <span style={{color: 'var(--red)'}}>Required field</span>}
                </div>
                
                <div className='validated-input'>
                <input className={`${isCompanyValid ? '' : 'invalid'}`} placeholder="Company Name" value={companyName} onChange={handleCompanyNameChanged}></input>
                {isCompanyValid === false && <span style={{color: 'var(--red)'}}>Required field</span>}
                </div>
                <div className="button-container">
                    <button onClick={handleAddNewJob}>Submit</button>
                    <button onClick={handleCancelClicked}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}

export default NewJobForm