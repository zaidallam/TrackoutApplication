import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../Context';
import axios from 'axios';

export const NewTemplateWindow = ( { setActive, fetchTemplates, resetList } ) => {
    
    const { authUser } = useContext(Context); 

    const today = new Date();
    const [templateData, setTemplateData] = useState({
        name: '',
        type: '',
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
        exercises: []
    });

    const updateTemplateExercises = (target) => {
        let updatedExercise = '';
        
        if (/warmup-cooldown/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = templateData.exercises.filter(exercise => exercise.id === id);

            if (/remove/.test(target.id)) {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises.filter( exercise => exercise.id !== id )
                    ]
                })
                return templateData;
            }
            
            if (exerciseSearch.length) {
                if (/name/.test(target.id)) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/weight-units/.test(target.id)) {
                    exerciseSearch[0].weightUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/weight/.test(target.id)) {
                    exerciseSearch[0].weight = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/vol-units/.test(target.id)) {
                    exerciseSearch[0].volUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/vol/.test(target.id)) {
                    exerciseSearch[0].vol = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/sets/.test(target.id)) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                }
            } else {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises,
                        {
                            id: id,
                            name: /name/.test(target.id) ? target.value : 'BITCH',
                            weight: (/weight/.test(target.id) && !(/units/.test(target.value))) ? target.value : '',
                            weightUnits: /weight-units/.test(target.id) ? target.value : '',
                            vol: (/vol/.test(target.id) && !(/units/.test(target.value))) ? target.value : '',
                            volUnits: /vol-units/.test(target.id) ? target.value : '',
                            sets: /sets/.test(target.id) ? target.value : '',
                        }
                    ]
                });
                return templateData;
            }

            setTemplateData({
                name: templateData.name,
                type: templateData.type,
                date: templateData.date,
                exercises: [
                    ...templateData.exercises.filter( exercise => exercise.id !== id ),
                    updatedExercise
                ]
            })
        }

        if (/strength/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = templateData.exercises.filter(exercise => exercise.id === id);

            if (/remove/.test(target.id)) {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises.filter( exercise => exercise.id !== id )
                    ]
                })
                return templateData;
            }
            
            if (exerciseSearch.length) {
                if (/name/.test(target.id)) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/weight-units/.test(target.id)) {
                    exerciseSearch[0].weightUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/weight/.test(target.id)) {
                    exerciseSearch[0].weight = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/vol-units/.test(target.id)) {
                    exerciseSearch[0].volUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/vol/.test(target.id)) {
                    exerciseSearch[0].vol = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/final/.test(target.id)) {
                    exerciseSearch[0].finalRest = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/rest-units/.test(target.id)) {
                    exerciseSearch[0].restUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/rest/.test(target.id)) {
                    exerciseSearch[0].setRest = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/sets/.test(target.id)) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                }
            } else {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises,
                        {
                            id: id,
                            name: /name/.test(target.id) ? target.value : '',
                            weight: (/weight/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                            weightUnits: /weight-units/.test(target.id) ? target.value : '',
                            vol: (/vol/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                            volUnits: /vol-units/.test(target.id) ? target.value : '',
                            sets: /sets/.test(target.id) ? target.value : '',
                            setRest: (/rest/.test(target.id) && !(/final/.test(target.id)) && !(/units/.test(target.id))) ? target.value : '',
                            finalRest: /final/.test(target.id) ? target.value : '',
                            restUnits: /rest-units/.test(target.id) ? target.value : ''
                        }
                    ]
                });
                return templateData;
            }

            setTemplateData({
                name: templateData.name,
                type: templateData.type,
                date: templateData.date,
                exercises: [
                    ...templateData.exercises.filter( exercise => exercise.id !== id ),
                    updatedExercise
                ]
            })
        }

        if (/cardio/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = templateData.exercises.filter(exercise => exercise.id === id);

            if (/remove/.test(target.id)) {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises.filter( exercise => exercise.id !== id )
                    ]
                })
                return templateData;
            }

            if (exerciseSearch.length) {
                if (/name/.test(target.id)) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/distance-units/.test(target.id)) {
                    exerciseSearch[0].distanceUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/distance/.test(target.id)) {
                    exerciseSearch[0].distance = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/pace-min/.test(target.id)) {
                    exerciseSearch[0].paceMin = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/pace-sec/.test(target.id)) {
                    exerciseSearch[0].paceSec = target.value;
                    updatedExercise = exerciseSearch[0];
                } 
            } else {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises,
                        {
                            id: id,
                            name: /name/.test(target.id) ? target.value : '',
                            distance: (/distance/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                            distanceUnits: /distance-units/.test(target.id) ? target.value : '',
                            paceMin: /pace-min/.test(target.id) ? target.value : '',
                            paceSec: /pace-sec/.test(target.id) ? target.value : '',
                        }
                    ]
                });
                return templateData;
            }

            setTemplateData({
                name: templateData.name,
                type: templateData.type,
                date: templateData.date,
                exercises: [
                    ...templateData.exercises.filter( exercise => exercise.id !== id ),
                    updatedExercise
                ]
            })
        }

        if (/mobility/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = templateData.exercises.filter(exercise => exercise.id === id);

            if (/remove/.test(target.id)) {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises.filter( exercise => exercise.id !== id )
                    ]
                })
                return templateData;
            }
            
            if (exerciseSearch.length) {
                if (/name/.test(target.id)) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/time-units/.test(target.id)) {
                    exerciseSearch[0].timeUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/time/.test(target.id)) {
                    exerciseSearch[0].time = target.value;
                    updatedExercise = exerciseSearch[0];
                } else if (/sets/.test(target.id)) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                }
            } else {
                setTemplateData({
                    name: templateData.name,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: [
                        ...templateData.exercises,
                        {
                            id: id,
                            name: /name/.test(target.id) ? target.value : '',
                            time: (/time/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                            timeUnits: /time-units/.test(target.id) ? target.value : '',
                            sets: /sets/.test(target.id) ? target.value : ''
                        }
                    ]
                });
                return templateData;
            }

            setTemplateData({
                name: templateData.name,
                type: templateData.type,
                date: templateData.date,
                exercises: [
                    ...templateData.exercises.filter( exercise => exercise.id !== id ),
                    updatedExercise
                ]
            })
        }

    }

    const saveTemplate = () => {
        if (templateData.exercises.length) {
            axios({
                method: 'POST',
                data: templateData,
                withCredentials: true,
                url: `localhost:5000/users/${authUser}?resource=templates`
            })
            .then((res) => {
                setActive(false);
                fetchTemplates();
                resetList()
            })
            .catch((err) => {
                setActive(false);
            });
        }
    }
    
    return (
        <>
        <div className='template-view-window-container fade-in'>
            <img src="../assets/ExitButtonWhite.svg" className="mobile-only fade-in" alt="Exit" id="exit-button-mobile" onClick={ () => setActive(false) }/>
            <div className="template-view-window">
                <img src="../assets/ExitButton.svg" className="mobile-hide" alt="Exit" id="exit-button" onClick={ () => setActive(false) }/>
                <h2>NEW TEMPLATE</h2>
                <label htmlFor="template-title">TITLE:</label>
                <input type="text" id="template-title" name="template-title" placeholder="Title" maxLength={36} onBlur={ e => setTemplateData({
                    name: e.target.value,
                    type: templateData.type,
                    date: templateData.date,
                    exercises: templateData.exercises
                })}/>
                <button onClick={ saveTemplate }>SAVE TEMPLATE</button><br />
                <label htmlFor="template-type">TYPE:</label>
                <select name="template-type" id="template-type" onChange={ e => setTemplateData({
                    name: templateData.name,
                    type: e.target.value,
                    date: templateData.date,
                    exercises: []
                })}>
                    <option value="" hidden defaultValue>Choose a Training Type</option>
                    <option value="warmup-cooldown">Warmup/Cooldown</option>
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="mobility">Mobility</option>
                </select><br className="mobile-only" />
                <div className='form-page'>
                    <RenderTemplateType type={templateData.type} updateTemplateExercises={updateTemplateExercises} />
                </div>
            </div>
        </div>
        </>
    )
}

const RenderTemplateType = ( { type, updateTemplateExercises } ) => {
    if (type === 'warmup-cooldown') {
        return (<WarmupCooldown updateTemplateExercises={updateTemplateExercises}/>);
    }
    if (type === 'strength') {
        return (<Strength updateTemplateExercises={updateTemplateExercises}/>);
    }
    if (type === 'cardio') {
        return (<Cardio updateTemplateExercises={updateTemplateExercises}/>);
    }
    if (type === 'mobility') {
        return (<Mobility updateTemplateExercises={updateTemplateExercises}/>);
    }
    if (type === '') {
        return (<></>)
    }
}

export const WarmupCooldown = ( { updateTemplateExercises } ) => {
    
    const [exercises, setExercises] = useState({index: 0, array: []});

    const addTemplate = () => {
        setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset warmup-cooldown-fieldset input-form type-fieldset">
            <legend>WARMUP/COOLDOWN</legend>
            <button onClick={ e => {e.preventDefault(); addTemplate()}}>
                ADD EXERCISE
            </button><br /><br className="mobile-only" />            

            {exercises.array.map(exercise => (<NewExercise type={'warmup-cooldown'} updateTemplateExercises={updateTemplateExercises} removeExercise={removeExercise} index={exercise} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Strength = ( { updateTemplateExercises, sourceTemplates } ) => {
    
    const [exercises, setExercises] = useState({index: 0, array: []});

    const addTemplate = () => {
        setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset strength-fieldset input-form type-fieldset">
            <legend>STRENGTH</legend>
            <button onClick={ e => {e.preventDefault(); addTemplate()}}>
                ADD EXERCISE
            </button><br /><br className="mobile-only" />
            
            {exercises.array.map(exercise => (<NewExercise type={'strength'} updateTemplateExercises={updateTemplateExercises} removeExercise={removeExercise} index={exercise} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Cardio = ( { updateTemplateExercises, sourceTemplates } ) => {
    
    const [exercises, setExercises] = useState({index: 0, array: []});

    const addTemplate = () => {
        setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset cardio-fieldset input-form type-fieldset">
            <legend>CARDIO</legend>
            <button onClick={ e => {e.preventDefault(); addTemplate()}}>
                ADD EXERCISE
            </button><br /><br className="mobile-only" />
            
            {exercises.array.map(exercise => (<NewExercise type={'cardio'} updateTemplateExercises={updateTemplateExercises} removeExercise={removeExercise} index={exercise} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Mobility = ( { updateTemplateExercises, sourceTemplates } ) => {
    
    const [exercises, setExercises] = useState({index: 0, array: []});

    const addTemplate = (name) => {
        setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
    }
    
    return (
        <>
        <fieldset className="type-fieldset mobility-fieldset input-form type-fieldset">
            <legend>MOBILITY</legend>
            <button onClick={ e => {e.preventDefault(); addTemplate()}}>
                ADD EXERCISE
            </button><br /><br className="mobile-only" />
            

            {exercises.array.map(exercise => (<NewExercise type={'mobility'} updateTemplateExercises={updateTemplateExercises} removeExercise={removeExercise} index={exercise} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const NewExercise = ( { type, index, removeExercise, updateTemplateExercises } ) => {
    if (type === 'warmup-cooldown') {
        return (
            <>
            <input className="exercise-name" type="text" id={`warmup-cooldown-${index}-name`} name={`warmup-cooldown-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-cooldown-${index}-weight`} name={`warmup-cooldown-${index}-weight`} placeholder="Weight" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`warmup-cooldown-${index}-weight-units`} id={`warmup-cooldown-${index}-weight-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-cooldown-${index}-vol`} name={`warmup-cooldown-${index}-vol`} placeholder="Volume" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`warmup-cooldown-${index}-vol-units`} id={`warmup-cooldown-${index}-vol-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-cooldown-${index}-sets`} name={`warmup-cooldown-${index}-sets`} placeholder="Sets" onBlur={ e => updateTemplateExercises(e.target) }/>
            <button className="remove-exercise"  id={`warmup-cooldown-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateTemplateExercises(e.target)} }>REMOVE</button><br/><br className="mobile-only" />
            </>
        )
    }

    if (type === 'strength') {
        return (
            <>
            <input className="exercise-name" type="text" id={`strength-${index}-name`} name={`strength-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateTemplateExercises(e.target) } /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-weight`} name={`strength-${index}-weight`} placeholder="Weight" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`strength-${index}-weight-units`} id={`strength-${index}-weight-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-vol`} name={`strength-${index}-vol`} placeholder="Volume" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`strength-${index}-vol-units`} id={`strength-${index}-vol-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-sets`} name={`strength-${index}-sets`} placeholder="Sets" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-rest`} name={`strength-${index}-rest`} placeholder="Set Rest" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-rest-final`} name={`strength-${index}-rest-final`} placeholder="End Rest" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`strength-${index}-rest-units`} id={`strength-${index}-rest-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select>
            <button className="remove-exercise" id={`strength-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateTemplateExercises(e.target)} }>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cardio') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cardio-${index}-name`} name={`cardio-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-distance`} name={`cardio-${index}-distance`} placeholder="Distance" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`cardio-${index}-distance-units`} id={`cardio-${index}-distance-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="mi">mi</option>
                <option value="km">km</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-pace-min`} name={`cardio-${index}-pace-min`} placeholder="Pace Min" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-pace-sec`} name={`cardio-${index}-pace-sec`} placeholder="Pace Sec" onBlur={ e => updateTemplateExercises(e.target) }/>
            <button className="remove-exercise" id={`cardio-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateTemplateExercises(e.target)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cooldown') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cooldown-${index}-name`} name={`cooldown-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateTemplateExercises(e.target) } /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-weight`} name={`cooldown-${index}-weight`} placeholder="Weight" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`cooldown-${index}-weight-units`} id={`cooldown-${index}-weight-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-vol`} name={`cooldown-${index}-vol`} placeholder="Volume" onBlur={ e => updateTemplateExercises(e.target) }/>
            <select defaultValue="" name={`cooldown-${index}-vol-units`} id={`cooldown-${index}-vol-units`} onBlur={ e => updateTemplateExercises(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-sets`} name={`cooldown-${index}-sets`} placeholder="Sets" onBlur={ e => updateTemplateExercises(e.target) }/>
            <button className="remove-exercise" id={`cooldown-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateTemplateExercises(e.target)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'mobility') {
        return (
            <>
            <input className="exercise-name" type="text" id={`mobility-${index}-name`} name={`mobility-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateTemplateExercises(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-time`} name={`mobility-${index}-time`} placeholder="Time" onBlur={ e => updateTemplateExercises(e.target) } />
            <select defaultValue="" name={`mobility-${index}-time-units`} id={`mobility-${index}-time-units`} onBlur={ e => updateTemplateExercises(e.target) } >
                <option value=""></option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-pace-sets`} name={`mobility-${index}-pace-sets`} placeholder="Sets" onBlur={ e => updateTemplateExercises(e.target) } />
            <button className="remove-exercise" id={`mobility-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateTemplateExercises(e.target)} }>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }
}



export const Template = ( { template, deleteConfirmStyle, setDeleteConfirmStyle, setDeleteFailStyle, setSourceTemplates, sourceTemplates, resetList } ) => {

    const [templateEntry, setTemplateEntry] = useState([]);

    const getDate = () => {
        const date = `${template.date.split('-')[1]}-${template.date.split('-')[2]}-${template.date.split('-')[0]}`;
        return date;
    }
    
    const getDay = () => {
        const dateString = getDate();
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const d = new Date(dateString);
        const dayName = days[d.getDay()];
        return dayName;
    }

    return (
        <>
        <div className="template-container grid-1" onClick={ () => { setTemplateEntry([template]) } }>
            <p className="template-title">{template.name}</p>
            <div className="template-content">
                <p className="template-duration">CREATED: {getDay()}, {getDate()} </p>
            </div>
            <div className="template-content flex-row">
                <p className="template-workout-type">{template.type.toUpperCase()}</p>
            </div>
        </div>

        { templateEntry.map( template => <TemplateWindow  template={template} setTemplateEntry={setTemplateEntry} getDate={getDate} getDay={getDay} key={template._id} deleteConfirmStyle={deleteConfirmStyle} setDeleteConfirmStyle={setDeleteConfirmStyle} setDeleteFailStyle={setDeleteFailStyle} sourceTemplates={sourceTemplates} setSourceTemplates={setSourceTemplates} resetList={resetList}/> )}
        
        </>
    )
}

export const TemplateWindow = ( { template, setTemplateEntry, getDate, getDay, deleteConfirmStyle, setDeleteConfirmStyle, setDeleteFailStyle, sourceTemplates, setSourceTemplates, resetList } ) => {

    const { authUser } = useContext(Context);
    
    const deleteTemplate = () => {
        axios({
            method: 'DELETE',
            data: {_id: template._id},
            withCredentials: true,
            url: `localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            setTimeout( () => setDeleteConfirmStyle('hide'), 5000); 
            setSourceTemplates(sourceTemplates.filter( entry => entry._id !== template._id));
            resetList();
        })
        .catch(() => {
            setDeleteFailStyle('');
            setTimeout( () => setDeleteFailStyle('hide'), 5000); 
        });
    }

    return (
        <>
        <div className='template-view-window-container fade-in'>
            <img src="../assets/ExitButtonWhite.svg" className="mobile-only fade-in" alt="Exit" id="exit-button-mobile" onClick={ () => setTemplateEntry([]) }/>
            <div className="template-view-window">
                <img src="../assets/ExitButton.svg" className="mobile-hide" alt="Exit" id="exit-button" onClick={ () => setTemplateEntry([]) }/>
                <h2>{template.name}</h2>
                <p>{template.type.toUpperCase()}. Created on {getDay()}, {getDate()}</p><br />

                <p><strong>Template Exercises:</strong></p>

                { template.exercises.map( exercise => {
                    if (template.type === 'warmup-cooldown') {
                        return (
                            <p>{
                                `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                            }</p>
                        )
                    }
                    if (template.type === 'strength') {
                        return (
                            <p>{
                                `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}${exercise.setRest ? `, ${exercise.setRest} ${exercise.restUnits ? exercise.restUnits : ''} rest between sets` : ''}${exercise.finalRest ? `, ${exercise.finalRest} ${exercise.restUnits ? exercise.restUnits : ''} final rest` : ''}`
                            }</p>
                        )
                    }
                    if (template.type === 'cardio') {
                        return (
                            <p>{
                                `${exercise.name ? `${exercise.name}` : ''}${exercise.distance ? `, ${exercise.distance}` : ''}${exercise.distanceUnits ? ` ${exercise.distanceUnits}` : ''}${exercise.paceMin ? `, ${parseInt(exercise.paceMin) + parseInt(parseInt(exercise.paceSec ? exercise.paceSec : 0) / 60)}` : ''}${exercise.paceSec ? `:${exercise.paceSec % 60}` : ':00'}${exercise.distanceUnits ? ` per ${exercise.distanceUnits === 'mi' ? 'mi' : 'km'}` : ''}`
                            }</p>
                        )
                    }
                    if (template.type === 'mobility') {
                        return (
                            <p>{
                                `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                            }</p>
                        )
                    }
                }) }

            </div>
            
            <div className="delete-template flex-row">
                <button className="fade-in" onClick={ () => setDeleteConfirmStyle('')}>DELETE TEMPLATE</button>
                <p className={deleteConfirmStyle}>ARE YOU SURE?</p>
                <button className={deleteConfirmStyle} onClick={ () => {deleteTemplate(); setTemplateEntry([])} }>YES</button>
                <button className={deleteConfirmStyle} onClick={ () => setDeleteConfirmStyle('hide') }>NO</button>
            </div>

        </div>
        </>
    )
}