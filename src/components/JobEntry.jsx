import {useState, useEffect} from 'react'
import '../css/JobEntry.css'
function JobEntry({job, onDelete}){
    const [hasSpawned, setHasSpawned] = useState(false);
    const [status, setStatus] = useState(job.status);
    
    useEffect(() => {
        if(!hasSpawned){
                
            setHasSpawned(true)
        }
    }, [])

    function handleDeleteClicked(e){
        e.preventDefault()
        
        DeleteJob();
    }

    async function DeleteJob(){
        const response = await fetch("http://localhost:3000/api/jobs/" + job.id, {
            method: "DELETE",
            
        });

        const data = await response.json();
        console.log("Deleted", data);
        onDelete();
    }

    async function onStatusChange(e){
        const newStatus = e.target.value;
        setStatus(newStatus)

        const response = await fetch("http://localhost:3000/api/jobs/" + job.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobTitle: job.jobTitle,
                companyName: job.companyName,
                status: newStatus
                
            })
        });

        const data = await response.json();
        console.log("Updated", data)
    }

    function getRelativeTime(){
        const timestamp = new Date(job.applied_date).getTime();
        const now = Date.now();

        const seconds = Math.floor((now - timestamp) / 1000);

        if (seconds < 0) {
            return "in the future";
        }

        const units = [
            ["year", 365 * 24 * 60 * 60],
            ["month", 30 * 24 * 60 * 60],
            ["day", 24 * 60 * 60],
            ["hour", 60 * 60],
            ["minute", 60],
            ["second", 1],
        ];

        for (const [unit, secondsPerUnit] of units) {
            const value = Math.floor(seconds / secondsPerUnit);

            if (value >= 1) {
            return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
            }
        }

        return "just now";
    }

    function getDateString(date){
        const newDate = new Date(date)
        return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    return <>
        <div className={`job-entry ${hasSpawned ? 'spawned' : ''}`}>
            <h3>{job.title}</h3>
            <span>{job.company_name}</span>
            <p></p>
            {/* <p>Status: <span className={`status-text ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span></p> */}
            <div className="status-container">
                <div className={`status-text ${status}`}></div>
                <label for="status-list" >Status: </label>
                <select id="status-list" name="status" value={status} onChange={onStatusChange} className="status-select">
                    <option value="applied" className='applied'>Applied</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="rejected">Rejected</option>
                    <option value="accepted">Accepted</option>
                </select>
            </div>
            <button className='top-right-overlay' onClick={handleDeleteClicked}>X</button>

            <div className='bottom-right-overlay'>
                <span className='tooltip'>Applied {getRelativeTime()}
                    <span className='tooltip-text'>Applied on {getDateString(job.applied_date)}</span>
                </span>
            </div>
        </div>
        
    </>
}

export default JobEntry