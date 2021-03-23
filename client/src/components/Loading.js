import React, { useContext } from 'react'
import { Context } from '../Context'

export const Loading = () => {
    
    const { isLoading } = useContext(Context)

    if (isLoading) {
        return (
            <div id="loading-overlay">
                <div><img alt="" src="./assets/selector.svg"/></div>
            </div>
        )
    } else {
        return <></>
    }
}
