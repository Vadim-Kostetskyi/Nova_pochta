import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Dispatch } from 'redux'

import { getInfo } from "../redux/operation"
import { saveTtn, clearTtn } from "../redux/slice"
import { CounterState, PostData } from "../redux/store"
import { requestData } from "../requests/requests"



const Parcel: React.FunctionComponent = () => {
    const dispatch: Dispatch = useDispatch()

    const [ttn, setTtn] = useState<number[]>([])
    const [status, setStatus] = useState<string>('')
    const [formData, setFormData] = useState<number>(0);
    const [historyHidden, setHistoryHidden] = useState(true);
    const [dataHidden, setDataHidden] = useState(false);

    const savedRequests = useSelector((state: CounterState) => state.counter.value)

    useEffect(() => {
        setTtn(savedRequests)
        
    }, [savedRequests])
    
    const clearList = () => {
        dispatch(clearTtn())
    }

    const handleToggleHistory = () => {        
        setHistoryHidden((prevState) => !prevState);
    };
     const handleToggleData = () => {        
        setDataHidden((prevState) => !prevState);
    };



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         const inputElement = event.target;
     inputElement.value = inputElement.value.replace(/\D/g, '');
     const inputValue = inputElement.value;

  if (inputValue.length > 14) {
    inputElement.value = inputValue.slice(0, 14);
     } 
        setFormData(Number(event.target.value));
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const inputValue = event.currentTarget.ttn.value
        
        if ((inputValue.length) !== 14 || inputValue.slice(0, 4) !== '2040') {
            
            alert("Введіть 14 цифр у форматі 2040**********");
            return
        } 
        dispatch(getInfo(requestData(process.env.SECRET_KEY, "TrackingDocument", 'getStatusDocuments', formData)))
            .then((res: { payload: { data: PostData[] } }) => setStatus(res.payload.data[0].Status))

        dispatch(saveTtn(Number(formData)))
  }    
    return (
    <>
        <form className='get' onSubmit={handleSubmit}>
                <input type="text" name="ttn" className='input' value={formData || ''} onChange={handleInputChange}/>
                <button className='get-btn' type="submit" >Get status TTN</button>
                 
        </form>
        <div className='info'> 
            <div className='details'>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <strong className='details-text'>Дані посилки</strong>
                    <svg className={`icon-hide ${dataHidden ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleToggleData}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>

                    </div>
                    <p className={`history-box ${dataHidden ? 'hidden' : ''}`}>{status}</p>
            </div>
                <div className='history'>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <strong className='history-text'>Історія</strong>
                    <svg className={`icon-hide ${historyHidden ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleToggleHistory}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    </div>
                        <div className={`history-box ${historyHidden ? 'hidden' : ''}`}>
                            <div className="history-header">
                                
                                <button onClick={clearList} className="history-clear">clear</button>
                            </div>
                            <ul className='history-list'>
                                {ttn.map(num => <li key={num}>{num}</li>)}
                            </ul>
                    </div>
                </div>
        </div>
    </>
    )
}

export default Parcel