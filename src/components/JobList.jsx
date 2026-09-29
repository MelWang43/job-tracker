import {useState} from 'react'
import JobEntry from './JobEntry';
import NewJobForm from './NewJobForm';
function JobList(){
    const [jobs, setJobs] = useState([]);
    return <>
        {jobs.map((job) => {<JobEntry key={job.id} job={job}></JobEntry>}
            )}
        
        <button>Add</button>

        <NewJobForm/>
    </>
}

export default JobList