import React, { useState } from 'react';

export const RecentWorkout = ( { workout } ) => {

    const getDate = () => {
        const date = `${workout.date.split('-')[1]}-${workout.date.split('-')[2]}-${workout.date.split('-')[0]}`;
        return date;
    }

    const getDuration = () => {
        let minutes = parseInt(workout.minutes) % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;  
        const duration = `${parseInt(workout.hours) + parseInt(parseInt(workout.minutes) / 60)}:${minutes}`
        return duration;
    }


    return (
        <>
        <div className="recent-workout">
            <h2>{`${workout.title ? workout.title : `Workout On ${getDate()}`}`}</h2>

            {
                (() => {
                    if (workout.warmup.length) return (
                        <div>
                        <h3>WARMUP</h3>
                        {workout.warmup.map( exercise => (
                                <p>{
                                    `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                }</p>
                            ) 
                        )}
                        </div>
                    );
                })()
            }

            {
                (() => {
                    if (workout.main.length) return (
                        <>
                        {workout.main.map( exerciseType => {
                            return (
                                <div>
                                    <h3>{exerciseType.type.toUpperCase()}</h3>
                                    { (() => {
                                                if (exerciseType.type === 'strength') {
                                                    return exerciseType.exercises.map( exercise => (
                                                            <p>{
                                                                `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}${exercise.setRest ? `, ${exercise.setRest} ${exercise.restUnits ? exercise.restUnits : ''} rest between sets` : ''}${exercise.finalRest ? `, ${exercise.finalRest} ${exercise.restUnits ? exercise.restUnits : ''} final rest` : ''}`
                                                            }</p>
                                                        )
                                                    )
                                                } else if (exerciseType.type === 'cardio') {
                                                    return exerciseType.exercises.map( exercise => (
                                                        <p>{
                                                            `${exercise.name ? `${exercise.name}` : ''}${exercise.distance ? `, ${exercise.distance}` : ''}${exercise.distanceUnits ? ` ${exercise.distanceUnits}` : ''}${exercise.paceMin ? `, ${parseInt(exercise.paceMin) + parseInt(parseInt(exercise.paceSec ? exercise.paceSec : 0) / 60)}` : ''}${exercise.paceSec ? `:${exercise.paceSec % 60}` : ':00'}${exercise.distanceUnits ? ` per ${exercise.distanceUnits === 'mi' ? 'mi' : 'km'}` : ''}`
                                                        }</p>
                                                    )
                                                )
                                                }
                                                
                                            })()
                                    }
                                </div>
                            )
                        })}
                        </>
                    );
                })()
            }
            
            {
                (() => {
                    if (workout.cooldown.length) return (
                        <div>
                            <h3>COOLDOWN</h3>
                            {workout.cooldown.map( exercise => (
                                    <p>{
                                        `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                    }</p>
                                ) 
                            )}
                        </div>
                    );
                })()
            }

            {
                (() => {
                    if (workout.mobility.length) return (
                        <div>
                            <h3>MOBILITY</h3>
                            {workout.mobility.map( exercise => (
                                <p>{
                                    `${exercise.name ? `${exercise.name}` : ''}${exercise.time ? `, ${exercise.time}` : ''}${exercise.timeUnits ? ` ${exercise.timeUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                }</p>
                            ) 
                        )}
                        </div>
                    );
                })()
            }

            <br /><p>{`${workout.status.toUpperCase()}, ${getDate()}${workout.hours || workout.minutes ? `, Duration Of ${getDuration()}` : '' }.`}<br />
                {
                    (() => {if (workout.notes) return (<><strong>NOTES: </strong> {`${workout.notes}`}</>)})()
                } 
            </p>
        </div>
        </>
    )
}