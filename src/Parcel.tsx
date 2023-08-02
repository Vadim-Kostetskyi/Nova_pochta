const Parcel = () => {
    return (
    <>
        <div className='get'>
            <input type="text" className='input' />
            <button className='get-btn'>Get status TTN</button>
        </div>
        <div className='info'>
            <div className='details'>
                <p className='details-text'>Дані посилки</p>
            </div>
            <div className='history'>
                <strong className='history-text'>Історія</strong>
                <ul className='history-list'>
                <li className='history-item'>20400048799002</li>
                </ul>
            </div>
        </div>
    </>
    )
}

export default Parcel