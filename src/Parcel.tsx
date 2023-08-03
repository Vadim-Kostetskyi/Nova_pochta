import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import type { Dispatch } from 'redux'
import { useSelector } from "react-redux"

import { getInfo } from "./redux/operation"
import { saveTtn, clearTtn } from "./redux/slice"
import { CounterState } from "./redux/store"


const Parcel: React.FunctionComponent = () => {
    const dispatch: Dispatch = useDispatch()

    const [ttn, setTtn] = useState<number[]>([])

    const savedRequests = useSelector((state: CounterState) => state.counter.value)

    useEffect(() => {
        setTtn(savedRequests)
        
    }, [savedRequests])

       
    
    const getInfoByTtn: any = (ev: any) => {
        ev.preventDefault()
        const ttn = ev.currentTarget.ttn.value

        const onlyNumbers = ttn.replace(/\D/g, '');
        
        if (onlyNumbers.length !== 12) {
            alert("Введіть 12 цифр");
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
                                        "DocumentNumber":ttn,
                                        "Phone":"380600000000"
                                    },
                                    {
                                        "DocumentNumber":"20400048799001",
                                        "Phone":"380600000000"
                                    }
                                ]
                }
            }
        ))
        dispatch(saveTtn(ttn))
    }
    const clearList = () => {
        dispatch(clearTtn())
    }

 function validateInput(event: React.ChangeEvent<HTMLInputElement>) {
     const inputElement = event.target;
     inputElement.value = inputElement.value.replace(/\D/g, '');
     const inputValue = inputElement.value;

  if (inputValue.length > 12) {
    inputElement.value = inputValue.slice(0, 12);
     } 
}



    return (
    <>
        <form className='get' onSubmit={getInfoByTtn}>
            <input type="text" name="ttn" className='input' onInput={validateInput} />
            <button className='get-btn' type="submit" >Get status TTN</button>
        </form>
        <div className='info'>
            <div className='details'>
                <strong className='details-text'>Дані посилки</strong>
            </div>
            <div className='history'>
                <strong className='history-text'>Історія</strong>
                    <button onClick={clearList}>clear</button>
                    
                <ul className='history-list'>
                    {ttn.map(num => <li>{num}</li>)}
                </ul>
            </div>
        </div>
    </>
    )
}

export default Parcel