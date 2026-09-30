import {useState, useEffect} from 'react'
import '../css/JobEntry.css'
function JobEntry({job, onDelete}){
    const [hasSpawned, setHasSpawned] = useState(false);
    
    useEffect(() => {
        if(!hasSpawned){
                
            setHasSpawned(true)
        }
    }, [])

    function handleDeleteClicked(e){
        e.preventDefault()
        onDelete();
        DeleteJob();
    }

    async function DeleteJob(){
        const response = await fetch("http://localhost:3000/api/jobs/" + job.id, {
            method: "DELETE",
            
        });

        const data = await response.json();
        console.log(data);
    }
    return <>
        <div className={`job-entry ${hasSpawned ? 'spawned' : ''}`}>
            <h3>{job.title}</h3>
            <span>{job.company_name}</span>
            
            <p>Status: <span className={`status-text ${job.status}`}>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span></p>

            <button className='btn-overlay' onClick={handleDeleteClicked}>X</button>
        </div>
        
    </>
}

export default JobEntry