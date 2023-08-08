import React, {useEffect, ChangeEvent} from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Dispatch } from 'redux'
import { useState } from "react"

import { requestCity, requestRandomCity } from "../requests/requests"
import { getStreet } from "../redux/operation"
import { PostData } from "../redux/store"

const Offices: React.FunctionComponent = () => {
    const dispatch: Dispatch = useDispatch()
    const [address, setAddress] = useState<PostData[]>([]);
      const [formData, setFormData] = useState<string>('');


    useEffect(() => {
        dispatch(getStreet(requestRandomCity(process.env.SECRET_KEY)))
            .then((res: { payload: { data: PostData[] } }) => setAddress(res.payload.data))
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData( event.target.value );
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getStreet(requestCity(process.env.SECRET_KEY, "Address", "getWarehouses", formData)))
            .then((res: { payload: { data: PostData[] } }) => setAddress(res.payload.data))
  }    

    return (
        <div className='details'>
            <strong className='details-text'>Відділення Нової пошти</strong>
            <form className="city-form" onSubmit={handleSubmit}>
                <input type="text" name="city" onChange={handleInputChange} value={formData} placeholder="Введіть назву міста" />
                <button type="submit">Пошук</button>
            </form>
            <ul>
                {address.map((el) => <li key={el.Description}><strong>{el.CityDescription}</strong>, {el.Description}</li>)}

            </ul>
        </div>
    )
}

export default Offices