import React, {useState} from 'react'

export const Log = ( { workout } ) => {

    const getDate = () => {
        const date = `${workout.date.split('-')[1]}-${workout.date.split('-')[2]}-${workout.date.split('-')[0]}`;
        return date;
    }
    
    const getDay = () => {
        const dateString = getDate();
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const d = new Date(dateString);
        const dayName = days[d.getDay()];
        return dayName;
    }

    const getWorkoutTypes = () => {

        const types = [];
        if (workout.main.filter(exerciseType => exerciseType.type === 'strength').length > 0) types.push('STRENGTH');
        if (workout.main.filter(exerciseType => exerciseType.type === 'cardio').length > 0) types.push('CARDIO');
        if (workout.mobility.length > 0) types.push('MOBILITY');

        if (types.length === 1) return types[0]
        if (types.length === 2) {
            const returnString = `${types[0]}, ${types[1]}`
            return returnString
        } else {
            const returnString = `${types[0]}, ${types[1]}, ${types[2]}`
            return returnString
        }

    }
    
    const getStatus = () => workout.status.toUpperCase()

    const getDuration = () => {
        let minutes = parseInt(workout.minutes) % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;  
        const duration = `${parseInt(workout.hours) + parseInt(parseInt(workout.minutes) / 60)}:${minutes}`
        return duration;
    }

    return (
        <>
        <div className="log-container grid-1">
            <div class="title-container"><p className="log-title">{workout.title ? workout.title : `WORKOUT ON ${getDate()}`}</p></div>
            <div className="log-content flex-row">
                <p className="log-day">{getDay()}</p>
                <p className="log-date">{getDate()}</p>
                <p className="log-duration">{getDuration()}</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-workout-type">{getWorkoutTypes()}</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-status">STATUS: {getStatus()}</p>
            </div>
        </div>
        </>
    )
}