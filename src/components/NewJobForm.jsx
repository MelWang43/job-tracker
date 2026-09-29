import {useState} from 'react'

function NewJobForm(){
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");

    function handleJobTitleChanged(e){
        const raw = e.target.value;
        setJobTitle(raw);
    }
    function handleCompanyNameChanged(e){
        const raw = e.target.value;
        setCompanyName(raw);
    }

    async function handleAddNewJob(e){
        e.preventDefault();

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
    }
    
    return <>
        <div className="job-form">
            <h1>Add new job</h1>
            
            <input placeholder="Job Title" value={jobTitle} onChange={handleJobTitleChanged}></input>
            <input placeholder="Company Name" value={companyName} onChange={handleCompanyNameChanged}></input>

            <button onClick={handleAddNewJob}>Submit</button>
            <button>Cancel</button>
        </div>
    </>
}

export default NewJobForm