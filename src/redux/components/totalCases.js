import React, { useEffect, useState } from 'react';
import { useMediaPredicate } from "react-media-hook";
import './totalCases.css'

const TotalCases = React.memo(props => {
    const breakPoint = useMediaPredicate("(min-width: 769px)");
    const {totalCaseStats} = props
    const [caseCount, setCaseCount] = useState([]);
    useEffect(() =>{
        setCaseCount(totalCaseStats?.response)
    },[totalCaseStats]);
    return (
        <div className='total-cases-container'>
            {caseCount && 
            <div className="card-container">
                <CaseCards title='Total Confirmed Cases' count={caseCount[0]?.cases?.total}/>
                <CaseCards title='Total deaths' count={caseCount[0]?.deaths?.total}/>
                <CaseCards title='Active Cases' count={caseCount[0]?.cases?.active}/>
                <CaseCards title='Recoverd Cases' count={caseCount[0]?.cases?.recovered}/>
                {breakPoint && (<CaseCards title='Critical Cases' count={caseCount[0]?.cases?.critical}/>)}
            </div>
            }
        </div>
    );
});

export default TotalCases;

const CaseCards = (props) =>{
    const {title, count} = props;
    return(<div className='cases-container'>
        <h6>{title}</h6>
        <p>{count}</p>
    </div>)
}
