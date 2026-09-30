import {useEffect, useState} from 'react'
import JobEntry from './JobEntry';
import NewJobForm from './NewJobForm';
import '../css/JobList.css'

function JobList(){
    const [jobs, setJobs] = useState([]);
    const [isAddingJob, setIsAddingJob] = useState(false);

    useEffect(() => {
        loadJobs();
    }, [])

    async function loadJobs(){
        const response = await fetch("http://localhost:3000/api/jobs");

        if(!response.ok){
            console.error("Failed to load jobs");
            return;
        }
        const data = await response.json();
        setJobs([])
        setJobs(data);
        console.log(data);
    }

    function handleOpenForm(e){
        if(!isAddingJob){
            setIsAddingJob(true);
        }
    }

    function updateJobList(){
        loadJobs();
    }
    

    return <>
        <div className='job-list'>
            {jobs.map((job) => (<JobEntry key={job.id} job={job} onDelete={updateJobList}></JobEntry>))}
        </div>
        <button onClick={handleOpenForm}>Add</button>

        <NewJobForm isActive={isAddingJob} onCancel={() => (setIsAddingJob(false))} onAdd={updateJobList}/>
    </>
}

export default JobList