import React, {useState, useContext} from 'react'
import { Context } from '../../../Context'
import axios from 'axios'


export const Warmup = ( { updateTrainingTypesState } ) => {
    
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

            {exercises.array.map(exercise => (<NewExercise type={'warmup'} index={exercise} removeExercise={removeExercise}  key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Strength = ( { updateTrainingTypesState, index } ) => {
    
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
            
            {exercises.array.map(exercise => (<NewExercise type={'strength'} index={exercise} removeExercise={removeExercise}  key={exercise} />))}

        </fieldset>

            
        </>
    )
}

export const Cardio = ( { updateTrainingTypesState, index } ) => {
    
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
            
            {exercises.array.map(exercise => (<NewExercise type={'cardio'} index={exercise} removeExercise={removeExercise}  key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Cooldown = ( { updateTrainingTypesState } ) => {
    
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
            
            {exercises.array.map(exercise => (<NewExercise type={'cooldown'} index={exercise} removeExercise={removeExercise}  key={exercise} />))}

        </fieldset>
        </>
    )
}

export const Mobility = ( { updateTrainingTypesState } ) => {
    
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
                <option value="New">New</option>
                <optgroup label="Templates">
                    <option value="example">Example</option>
                </optgroup>
            </select>
            <button onClick={ e => {e.preventDefault(); addTemplate(templateChoice)}}>
                ADD
            </button><br /><br className="mobile-only" />
            

            {exercises.array.map(exercise => (<NewExercise type={'mobility'} index={exercise} removeExercise={removeExercise}  key={exercise} />))}

        </fieldset>
        </>
    )
}

export const NewExercise = ( { type, index, removeExercise } ) => {
    if (type === 'warmup') {
        return (
            <>
            <input className="exercise-name" type="text" id={`warmup-${index}`} name={`warmup-${index}`} placeholder="Exercise Name" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-weight`} name={`warmup-${index}-weight`} placeholder="Weight" />
            <select defaultValue="" name={`warmup-${index}-weight-units`} id={`warmup-${index}-weight-units`}>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-vol`} name={`warmup-${index}-vol`} placeholder="Volume" />
            <select defaultValue="" name={`warmup-${index}-vol-units`} id={`warmup-${index}-vol-units`}>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`warmup-${index}-sets`} name={`warmup-${index}-sets`} placeholder="Sets" />
            <button className="remove-exercise" id={`warmup-${index}-remove`} onClick={ e => {e.preventDefault(); removeExercise(index)}}>REMOVE</button><br/><br className="mobile-only" />
            </>
        )
    }

    if (type === 'strength') {
        return (
            <>
            <input className="exercise-name" type="text" id={`strength-${index}`} name={`strength-${index}`} placeholder="Exercise Name" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-weight`} name={`strength-${index}-weight`} placeholder="Weight" />
            <select defaultValue="" name={`strength-${index}-weight-units`} id={`strength-${index}-weight-units`}>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-vol`} name={`strength-${index}-vol`} placeholder="Volume" />
            <select defaultValue="" name={`strength-${index}-vol-units`} id={`strength-${index}-vol-units`}>
                <option value=""></option>
                <option value="Reps">Reps</option>
                <option value="Seconds">Seconds</option>
                <option value="Minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-sets`} name={`strength-${index}-sets`} placeholder="Sets" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-Rest`} name={`strength-${index}-Rest`} placeholder="Set Rest" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`strength-${index}-Rest Final`} name={`strength-${index}-Rest Final`} placeholder="End Rest" />
            <select defaultValue="" name={`strength-${index}-Rest-units`} id={`strength-${index}-Rest-units`}>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select>
            <button className="remove-exercise" onClick={ e => {e.preventDefault(); removeExercise(index)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cardio') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cardio-${index}`} name={`cardio-${index}`} placeholder="Exercise Name" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-distance`} name={`cardio-${index}-distance`} placeholder="Distance" />
            <select defaultValue="" name={`cardio-${index}-distance-units`} id={`cardio-${index}-distance-units`}>
                <option value=""></option>
                <option value="mi">mi</option>
                <option value="km">km</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-pace-min`} name={`cardio-${index}-pace-min`} placeholder="Pace Min" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cardio-${index}-pace-sec`} name={`cardio-${index}-pace-sec`} placeholder="Pace Sec" />
            <button className="remove-exercise" onClick={ e => {e.preventDefault(); removeExercise(index)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }

    if (type === 'cooldown') {
        return (
            <>
            <input className="exercise-name" type="text" id={`cooldown-${index}`} name={`cooldown-${index}`} placeholder="Exercise Name" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-weight`} name={`cooldown-${index}-weight`} placeholder="Weight" />
            <select defaultValue="" name={`cooldown-${index}-weight-units`} id={`cooldown-${index}-weight-units`}>
                <option value=""></option>
                <option value="lb">lb</option>
                <option value="kg">kg</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-vol`} name={`cooldown-${index}-vol`} placeholder="Volume" />
            <select defaultValue="" name={`cooldown-${index}-vol-units`} id={`cooldown-${index}-vol-units`}>
                <option value=""></option>
                <option value="reps">Reps</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`cooldown-${index}-sets`} name={`cooldown-${index}-sets`} placeholder="Sets" />
            <button className="remove-exercise" onClick={ e => {e.preventDefault(); removeExercise(index)}}>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }
    if (type === 'mobility') {
        return (
            <>
            <input className="exercise-name" type="text" id={`mobility-${index}`} name={`mobility-${index}`} placeholder="Exercise Name" /><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-time`} name={`mobility-${index}-time`} placeholder="Time" />
            <select defaultValue="" name={`mobility-${index}-time-units`} id={`mobility-${index}-time-units`}>
                <option value=""></option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
            </select><br className="mobile-only" />
            <input className="exercise-secondary" type="number" id={`mobility-${index}-pace-sets`} name={`mobility-${index}-pace-sets`} placeholder="Sets" />
            <button className="remove-exercise" onClick={ e => {e.preventDefault(); removeExercise(index)} }>REMOVE</button><br /><br className="mobile-only" />
            </>
        )
    }
}