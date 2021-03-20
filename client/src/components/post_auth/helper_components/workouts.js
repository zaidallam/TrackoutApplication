import React, {useState, useContext} from 'react'
import { Context } from '../../../Context'
import axios from 'axios'


export const Warmup = ( { updateTrainingTypesState, updateWorkoutData } ) => {
    
    const { authUser } = useContext(Context);
    const [templates, setTemplates] = useState({});
    const [templateChoice, setTemplateChoice] = useState('');
    const [exercises, setExercises] = useState({index: 1, array: [1]});

    const fetchTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addTemplate = (name) => {
        if (name) {
            if (name === 'new') {
                setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
            } else {
                //to be used to load proper template
            }
        }
        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
        if (exercises.array.length < 2) {
            updateTrainingTypesState('xwarmup');
        }
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset warmup-fieldset">
            <legend>WARMUP</legend>
            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-warmup" onChange={ e => {e.preventDefault(); setTemplateChoice(e.target.value)}}>
                <option value="" disabled hidden>Choose Template</option>
                <option value="new">New Exercise</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />            

            {exercises.array.map(exercise => (<NewExercise type={'warmup'} index={exercise} removeExercise={removeExercise} updateWorkoutData={updateWorkoutData} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Strength = ( { updateTrainingTypesState, updateWorkoutData, index } ) => {
    
    const { authUser } = useContext(Context);
    const [templates, setTemplates] = useState({});
    const [templateChoice, setTemplateChoice] = useState('');
    const [exercises, setExercises] = useState({index: 1, array: [1]});

    const retrieveTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addTemplate = (name) => {
        if (name) {
            if (name === 'new') {
                setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
            } else {
                //to be used to load proper template
            }
        }
        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
        if (exercises.array.length < 2) {
            updateTrainingTypesState('strength', index);
        }
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset strength-fieldset">
            <legend>STRENGTH</legend>
            <select defaultValue="" className="add-exercise" name="add-exercise" onChange={ e => {e.preventDefault(); setTemplateChoice(e.target.value)}}>
                <option value="" disabled  hidden>Choose Template</option>
                <option value="new">New Exercise</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />
            
            {exercises.array.map(exercise => (<NewExercise type={'strength'} index={exercise} removeExercise={removeExercise} updateWorkoutData={updateWorkoutData} secondaryIndex={index} key={exercise} />))}

        </fieldset>

            
        </>
    )
}

export const Cardio = ( { updateTrainingTypesState, updateWorkoutData, index } ) => {
    
    const { authUser } = useContext(Context);
    const [templates, setTemplates] = useState({});
    const [templateChoice, setTemplateChoice] = useState('');
    const [exercises, setExercises] = useState({index: 1, array: [1]});

    const retrieveTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addTemplate = (name) => {
        if (name) {
            if (name === 'new') {
                setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
            } else {
                //to be used to load proper template
            }
        }
        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
        if (exercises.array.length < 2) {
            updateTrainingTypesState('cardio', index);
        }
    }
    
    
    return (
        <>
        <fieldset className="type-fieldset cardio-fieldset">
            <legend>CARDIO</legend>
            <select defaultValue="" className="add-exercise" name="add-exercise" onChange={ e => {e.preventDefault(); setTemplateChoice(e.target.value)}}>
                <option value="" disabled  hidden>Choose Template</option>
                <option value="new">New Exercise</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />
            
            {exercises.array.map(exercise => (<NewExercise type={'cardio'} index={exercise} secondaryIndex={index} removeExercise={removeExercise} updateWorkoutData={updateWorkoutData} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Cooldown = ( { updateTrainingTypesState, updateWorkoutData } ) => {
    
    const { authUser } = useContext(Context);
    const [templates, setTemplates] = useState({});
    const [templateChoice, setTemplateChoice] = useState('');
    const [exercises, setExercises] = useState({index: 1, array: [1]});

    const retrieveTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addTemplate = (name) => {
        if (name) {
            if (name === 'new') {
                setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
            } else {
                //to be used to load proper template
            }
        }
        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
        if (exercises.array.length < 2) {
            updateTrainingTypesState('xcooldown');
        }
    }
    
    return (
        <>
        <fieldset className="type-fieldset cooldown-fieldset">
            <legend>COOLDOWN</legend>
            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-cooldown" onChange={ e => {e.preventDefault(); setTemplateChoice(e.target.value)}}>
                <option value="" disabled hidden>Choose Template</option>
                <option value="new">New Exercise</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />
            
            {exercises.array.map(exercise => (<NewExercise type={'cooldown'} index={exercise} removeExercise={removeExercise} key={exercise} updateWorkoutData={updateWorkoutData} />))}

        </fieldset>
        </>
    )
}

export const Mobility = ( { updateTrainingTypesState, updateWorkoutData } ) => {
    
    const { authUser } = useContext(Context);
    const [templates, setTemplates] = useState({});
    const [templateChoice, setTemplateChoice] = useState('');
    const [exercises, setExercises] = useState({index: 1, array: [1]});

    const retrieveTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addTemplate = (name) => {
        if (name) {
            if (name === 'new') {
                setExercises({index: exercises.index + 1, array: [...exercises.array, (exercises.index + 1)]});
            } else {
                //to be used to load proper template
            }
        }
        
    }

    const removeExercise = (id) => {
        setExercises({index: exercises.index, array: exercises.array.filter(exercise => exercise !== id)});
        if (exercises.array.length < 2) {
            updateTrainingTypesState('xmobility');
        }
    }
    
    return (
        <>
        <fieldset className="type-fieldset mobility-fieldset">
            <legend>MOBILITY</legend>
            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-mobility" onChange={ e => {e.preventDefault(); setTemplateChoice(e.target.value)}}>
                <option value="" disabled  hidden>Choose Template</option>
                <option value="new">New Exercise</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />
            

            {exercises.array.map(exercise => (<NewExercise type={'mobility'} index={exercise} removeExercise={removeExercise} updateWorkoutData={updateWorkoutData} key={exercise} />))}

        </fieldset>
        </>
    )
}

export const NewExercise = ( { type, index, secondaryIndex, removeExercise, updateWorkoutData } ) => {
    if (type === 'warmup') {
        return (
            <>
            <input className="exercise-name" type="text" id={`warmup-${index}-name`} name={`warmup-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-weight`} name={`warmup-${index}-weight`} placeholder="Weight" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`warmup-${index}-weight-units`} id={`warmup-${index}-weight-units`} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-vol`} name={`warmup-${index}-vol`} placeholder="Volume" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`warmup-${index}-vol-units`} id={`warmup-${index}-vol-units`} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-sets`} name={`warmup-${index}-sets`} placeholder="Sets" onBlur={ e => updateWorkoutData(e.target) }/>
            <button className="remove-exercise"  id={`warmup-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateWorkoutData(e.target)} }>REMOVE</button><br/><br className="mobile-only" />
            </>
        )
    }

    if (type === 'strength') {
        return (
            <>
            <input className="exercise-name" type="text" id={`strength-${index}-${secondaryIndex}-name`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-name`} placeholder="Exercise Name" onBlur={ e => updateWorkoutData(e.target) } /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-${secondaryIndex}-weight`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-weight`} placeholder="Weight" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`strength-${index}-${secondaryIndex}-weight-units`} id={`strength-${index}-${secondaryIndex}-weight-units`} data-secondary-index={secondaryIndex} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-${secondaryIndex}-vol`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-vol`} placeholder="Volume" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`strength-${index}-${secondaryIndex}-vol-units`} id={`strength-${index}-${secondaryIndex}-vol-units`} data-secondary-index={secondaryIndex} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-${secondaryIndex}-sets`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-sets`} placeholder="Sets" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-${secondaryIndex}-rest`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-rest`} placeholder="Set Rest" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-${secondaryIndex}-rest-final`} data-secondary-index={secondaryIndex} name={`strength-${index}-${secondaryIndex}-rest-final`} placeholder="End Rest" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`strength-${index}-${secondaryIndex}-rest-units`} id={`strength-${index}-${secondaryIndex}-rest-units`} data-secondary-index={secondaryIndex} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select>
            <button className="remove-exercise" id={`strength-${index}-${secondaryIndex}-remove`} data-secondary-index={secondaryIndex} onClick={ e => {e.preventDefault(); removeExercise(index); updateWorkoutData(e.target)} }>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cardio') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cardio-${index}-${secondaryIndex}-name`} data-secondary-index={secondaryIndex} name={`cardio-${index}-${secondaryIndex}-name`} placeholder="Exercise Name" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-${secondaryIndex}-distance`} data-secondary-index={secondaryIndex} name={`cardio-${index}-${secondaryIndex}-distance`} placeholder="Distance" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`cardio-${index}-${secondaryIndex}-distance-units`} id={`cardio-${index}-${secondaryIndex}-distance-units`} data-secondary-index={secondaryIndex} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="mi">mi</option>
                <option value="km">km</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-${secondaryIndex}-pace-min`} data-secondary-index={secondaryIndex} name={`cardio-${index}-${secondaryIndex}-pace-min`} placeholder="Pace Min" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-${secondaryIndex}-pace-sec`} data-secondary-index={secondaryIndex} name={`cardio-${index}-${secondaryIndex}-pace-sec`} placeholder="Pace Sec" onBlur={ e => updateWorkoutData(e.target) }/>
            <button className="remove-exercise" id={`cardio-${index}-${secondaryIndex}-remove`} data-secondary-index={secondaryIndex} onClick={ e => {e.preventDefault(); removeExercise(index); updateWorkoutData(e.target)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cooldown') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cooldown-${index}-name`} name={`cooldown-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateWorkoutData(e.target) } /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-weight`} name={`cooldown-${index}-weight`} placeholder="Weight" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`cooldown-${index}-weight-units`} id={`cooldown-${index}-weight-units`} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-vol`} name={`cooldown-${index}-vol`} placeholder="Volume" onBlur={ e => updateWorkoutData(e.target) }/>
            <select defaultValue="" name={`cooldown-${index}-vol-units`} id={`cooldown-${index}-vol-units`} onBlur={ e => updateWorkoutData(e.target) }>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-sets`} name={`cooldown-${index}-sets`} placeholder="Sets" onBlur={ e => updateWorkoutData(e.target) }/>
            <button className="remove-exercise" id={`cooldown-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateWorkoutData(e.target)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'mobility') {
        return (
            <>
            <input className="exercise-name" type="text" id={`mobility-${index}-name`} name={`mobility-${index}-name`} placeholder="Exercise Name" onBlur={ e => updateWorkoutData(e.target) }/><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-time`} name={`mobility-${index}-time`} placeholder="Time" onBlur={ e => updateWorkoutData(e.target) } />
            <select defaultValue="" name={`mobility-${index}-time-units`} id={`mobility-${index}-time-units`} onBlur={ e => updateWorkoutData(e.target) } >
                <option value=""></option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-pace-sets`} name={`mobility-${index}-pace-sets`} placeholder="Sets" onBlur={ e => updateWorkoutData(e.target) } />
            <button className="remove-exercise" id={`mobility-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index); updateWorkoutData(e.target)} }>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }
}


