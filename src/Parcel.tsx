import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Dispatch } from 'redux'

import { getInfo } from "./redux/operation"
import { saveTtn, clearTtn } from "./redux/slice"
import { CounterState, PostData } from "./redux/store"


const Parcel: React.FunctionComponent = () => {
    const dispatch: Dispatch = useDispatch()

    const [ttn, setTtn] = useState<number[]>([])
    const [status, setStatus] = useState<string>('')
      const [formData, setFormData] = React.useState<number>(0);



    const savedRequests = useSelector((state: CounterState) => state.counter.value)

    useEffect(() => {
        setTtn(savedRequests)
        
    }, [savedRequests])
    
    const clearList = () => {
        dispatch(clearTtn())
    }

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
        
        dispatch(getInfo(
            {
                "apiKey": process.env.SECRET_KEY,
                "modelName": "TrackingDocument",
                "calledMethod": "getStatusDocuments",
                "methodProperties": {
                    "Documents" : [
                                    {
                                    "DocumentNumber":formData,
                                    }
                                ]
                                
                }
            }
        )).then((res: {payload: {data:PostData[]}}) => setStatus(res.payload.data[0].Status)
        )
        dispatch(saveTtn(Number(formData)))
  }    

 const validateInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
     const inputElement = event.target;
     inputElement.value = inputElement.value.replace(/\D/g, '');
     const inputValue = inputElement.value;

  if (inputValue.length > 14) {
    inputElement.value = inputValue.slice(0, 14);
     } 
}



    return (
    <>
        <form className='get' onSubmit={handleSubmit}>
            <input type="text" name="ttn" className='input' value={formData} onChange={handleInputChange}/>
            <button className='get-btn' type="submit" >Get status TTN</button>
        </form>
        <div className='info'>
            <div className='details'>
                    <strong className='details-text'>Дані посилки</strong>
                    <p>{status}</p>
            </div>
            <div className='history'>
                <strong className='history-text'>Історія</strong>
                    <button onClick={clearList}>clear</button>
                    
                <ul className='history-list'>
                    {ttn.map(num => <li key={num}>{num}</li>)}
                </ul>
            </div>
        </div>
    </>
    )
}

export default Parcel