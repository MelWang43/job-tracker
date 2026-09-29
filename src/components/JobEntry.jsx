
function JobEntry({job}){
    return <>
        <h3>{job.title}</h3>
        <span>{job.companyName}</span>
        <p>{job.description}</p>
        
    </>
}

export default JobEntry