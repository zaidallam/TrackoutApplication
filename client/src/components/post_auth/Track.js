import React, { useState, useContext } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Cardio, Cooldown, Mobility, Strength, Warmup } from './helper_components/workouts'
import { Link, Redirect } from 'react-router-dom'
import '../../css/post_auth/Track.css'
import '../../css/post_auth/FormPages.css'
import '../../css/post_auth/General.css'

let warmupBool = false;
let cooldownBool = false;
let mobilityBool = false;

export const Track = () => {

    const { isAuth, logout } = useContext(Context)

    const [selectedTrainingType, setSelectedTrainingType] = useState('');
    const [activeTrainingTypes, setActiveTrainingTypes] = useState([
        {
            name: 'warmup',
            status: false
        },
        {
            name: 'main',
            index: 0,
            training: [

            ]
        },
        {
            name: 'cooldown',
            status: false
        },
        {
            name: 'mobility',
            status: false
        }
    ]);

    const updateTrainingTypesState = (trainingType, removeIndex = true) => {
        if (trainingType === 'strength' || trainingType === 'cardio') {
            
            if (removeIndex === true) {
                let newTrainingType = {}; 

                if (trainingType === 'strength') {
                    newTrainingType = {
                        index: activeTrainingTypes[1].index,
                        name: 'strength',
                        status: true
                    }
                }
                if (trainingType === 'cardio') {
                    newTrainingType = {
                        index: activeTrainingTypes[1].index,
                        name: 'cardio',
                        status: true
                    }
                }

                setActiveTrainingTypes([
                    {
                        name: 'warmup',
                        status: warmupBool
                    },
                    {
                        name: 'main',
                        index: activeTrainingTypes[1].index + 1,
                        training: [
                            ...activeTrainingTypes[1].training,
                            newTrainingType
                        ]
                    },
                    {
                        name: 'cooldown',
                        status: cooldownBool
                    },
                    {
                        name: 'mobility',
                        status: mobilityBool
                    }
                ]);

            } else {

                let newTrainingArray = activeTrainingTypes[1].training.filter( exercise => exercise.index !== removeIndex) ;

                setActiveTrainingTypes([
                    {
                        name: 'warmup',
                        status: warmupBool
                    },
                    {
                        name: 'main',
                        index: activeTrainingTypes[1].index,
                        training: newTrainingArray
                    },
                    {
                        name: 'cooldown',
                        status: cooldownBool
                    },
                    {
                        name: 'mobility',
                        status: mobilityBool
                    }
                ])
            }
            
        } else {

            if (trainingType === 'warmup') {
                warmupBool = true;
            }
            if (trainingType === 'cooldown') {
                cooldownBool = true;
            }
            if (trainingType === 'mobility') {
                mobilityBool = true;
            }
            if (trainingType === 'xwarmup') {
                warmupBool = false;
            }
            if (trainingType === 'xcooldown') {
                cooldownBool = false;
            }
            if (trainingType === 'xmobility') {
                mobilityBool = false;
            }


            setActiveTrainingTypes([
                {
                    name: 'warmup',
                    status: warmupBool
                },
                {
                    name: 'main',
                    index: activeTrainingTypes[1].index,
                    training: activeTrainingTypes[1].training
                },
                {
                    name: 'cooldown',
                    status: cooldownBool
                },
                {
                    name: 'mobility',
                    status: mobilityBool
                }
            ])
        }
    }

    const renderTrainingType = (trainingType) => {
                
        if (trainingType.status) {
            if (trainingType.name === 'warmup') {
                return (<Warmup updateTrainingTypesState={updateTrainingTypesState} key={1} />)
            }
            if (trainingType.name === 'strength') {
                return (<Strength updateTrainingTypesState={updateTrainingTypesState} index={trainingType.index} key={trainingType.index} />)
            }
            if (trainingType.name === 'cardio') {
                return (<Cardio updateTrainingTypesState={updateTrainingTypesState} index={trainingType.index} key={trainingType.index} />)
            }
            if (trainingType.name === 'cooldown') {
                return (<Cooldown updateTrainingTypesState={updateTrainingTypesState} key={2} />)
            }
            if (trainingType.name === 'mobility') {
                return (<Mobility updateTrainingTypesState={updateTrainingTypesState} key={3} />)
            }
        }
        if (trainingType.index) {
            if (trainingType.training.length > 0) {
                return trainingType.training.map(trainingType => renderTrainingType(trainingType))
            }
        }
    }

    if(isAuth) {
        return (
            <>
            <div className="form-page grid-2 page-container" id="track">
                <NavBar selected="track"/>
                <section className="content-section grid-1 fade-in">
                    <nav className="mobile-hide">
                        <ul>
                            <li className="red-text"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                    <h2>TRACK</h2>
                    <div className="input-form">
                        <select defaultValue="" name="type-select" id="type-select" onChange={e => setSelectedTrainingType(e.target.value)}>
                            <option value="" disabled hidden>Choose a Training Type</option>
                            <option value="warmup">Warmup</option>
                            <option value="strength">Strength</option>
                            <option value="cardio">Cardio</option>
                            <option value="cooldown">Cooldown</option>
                            <option value="mobility">Mobility</option>
                        </select>
                        <button onClick={() => updateTrainingTypesState(selectedTrainingType)}>
                            ADD
                        </button>
                        <form>
                            <fieldset className="type-fieldset info-fieldset">
                                <legend>WORKOUT INFO</legend>
                                <input type="text" id="info-title" name="info-title" placeholder="Title" /><br className="mobile-only" />
                                <input className="exercise-secondary" type="number" id="info-hours" name="info-hours" placeholder="Hours" /><br className="mobile-only" />
                                <input className="exercise-secondary" type="number" id="info-minutes" name="info-minutes" placeholder="Minutes" /><br className="mobile-only" />
                                <input type="date" id="info-date" name="info-date" placeholder="Date" />
                                <select name="info-status" id="info-status">
                                    <option value="complete">Complete</option>
                                    <option value="partial">Partial</option>
                                    <option value="not-done">Not Done</option>
                                </select><br className="mobile-only" /><br className="mobile-only" />
                                <button id="save-button">SAVE SESSION TO LOG</button>
                            </fieldset>

                            {activeTrainingTypes.map(trainingType => renderTrainingType(trainingType))}

                        </form>
                    </div> 
                </section>
                <NavBarMobile />
            </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}