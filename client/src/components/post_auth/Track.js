import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Cardio, Cooldown, Mobility, Strength, Warmup } from './helper_components/workouts'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../css/post_auth/Track.css'
import '../../css/post_auth/FormPages.css'
import '../../css/post_auth/General.css'

let warmupBool = false;
let cooldownBool = false;
let mobilityBool = false;

export const Track = () => {

    const { isAuth, logout, authUser } = useContext(Context)

    const [templates, setTemplates] = useState({});
    const [errorClass, setErrorClass] = useState('hide');
    const [successClass, setSuccessClass] = useState('hide');
    const [rejectClass, setRejectClass] = useState('hide');
    const [workoutData, setWorkoutData] = useState({
        title: '',
        hours: '',
        minutes: '',
        date: '',
        status: 'complete',
        notes: '',
        warmup: [],
        cooldown: [],
        mobility: [],
        main: []
    });
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

    const updateTrainingTypesState = (trainingType, removeIndex = false) => {
        if (trainingType === 'strength' || trainingType === 'cardio') {
            
            if (removeIndex === false) {
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
                return (<Warmup updateTrainingTypesState={updateTrainingTypesState} workoutData={workoutData} updateWorkoutData={updateWorkoutData} templates={templates} key={1} />)
            }
            if (trainingType.name === 'strength') {
                return (<Strength updateTrainingTypesState={updateTrainingTypesState} workoutData={workoutData} updateWorkoutData={updateWorkoutData} index={trainingType.index} templates={templates} key={trainingType.index} />)
            }
            if (trainingType.name === 'cardio') {
                return (<Cardio updateTrainingTypesState={updateTrainingTypesState} workoutData={workoutData} updateWorkoutData={updateWorkoutData} index={trainingType.index} templates={templates} key={trainingType.index} />)
            }
            if (trainingType.name === 'cooldown') {
                return (<Cooldown updateTrainingTypesState={updateTrainingTypesState} workoutData={workoutData} updateWorkoutData={updateWorkoutData} templates={templates} key={2} />)
            }
            if (trainingType.name === 'mobility') {
                return (<Mobility  updateTrainingTypesState={updateTrainingTypesState} workoutData={workoutData} updateWorkoutData={updateWorkoutData} templates={templates} key={3} />)
            }
        }
        if (trainingType.index) {
            if (trainingType.training.length > 0) {
                return trainingType.training.map(trainingType => renderTrainingType(trainingType))
            }
        }
    }

    const updateWorkoutData = (target) => {
        let updatedExercise = '';
        
        if (/warmup/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0]);
            const exerciseSearch = workoutData.warmup.filter(exercise => exercise.id === id);

            if (/name/.test(target.id)) {
                                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: target.value,
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/weight-units/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].weightUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: target.value,
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/weight/.test(target.id)) {
                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].weight = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: '',
                                weight: target.value,
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/vol-units/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].volUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: target.value,
                                sets: '',
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/vol/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].vol = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: target.value,
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/sets/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: target.value,
                            }
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/remove/.test(target.id)) {
                if (exerciseSearch.length > 0) {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: [
                            ...workoutData.warmup.filter(exercise => exercise.id !== id)
                        ],
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                } 
            }

            if (updatedExercise) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: [
                        ...workoutData.warmup.filter(exercise => exercise.id !== id),
                        updatedExercise
                    ],
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main
                })
            }
            return workoutData
        }

        if (/strength/.test(target.id)) {
            const containerId = parseInt(target.dataset.secondaryIndex)
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseTypeSearch = workoutData.main.filter(exerciseType => exerciseType.id === containerId);

            if (exerciseTypeSearch.length > 0) {

                const exerciseSearch = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id === id);
                let updatedExerciseType = null;

                if (/remove/.test(target.id)) {
                    if (exerciseTypeSearch[0].exercises.length < 2) {
                        setWorkoutData({
                            title: workoutData.title,
                            hours: workoutData.hours,
                            minutes: workoutData.minutes,
                            date: workoutData.date,
                            status: workoutData.status,
                            notes: workoutData.notes,
                            warmup: workoutData.warmup, 
                            cooldown: workoutData.cooldown,
                            mobility: workoutData.mobility,
                            main: workoutData.main.filter(exerciseType => exerciseType.id !== containerId)
                        })
                    } else {
                        const updatedExercises = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id !== id);
                        exerciseTypeSearch[0].exercises = updatedExercises;
                        setWorkoutData({
                            title: workoutData.title,
                            hours: workoutData.hours,
                            minutes: workoutData.minutes,
                            date: workoutData.date,
                            status: workoutData.status,
                            notes: workoutData.notes,
                            warmup: workoutData.warmup, 
                            cooldown: workoutData.cooldown,
                            mobility: workoutData.mobility,
                            main: [
                                ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                                exerciseTypeSearch[0]
                            ]
                        })
                    }
                    
                } else if (exerciseSearch.length > 0) {
                    if (/name/.test(target.id)) {
                        exerciseSearch[0].name = target.value;
                    } else if (/weight-units/.test(target.id)) {
                        exerciseSearch[0].weightUnits = target.value;
                    } else if (/weight/.test(target.id)) {
                        exerciseSearch[0].weight = target.value;
                    } else if (/vol-units/.test(target.id)) {
                        exerciseSearch[0].volUnits = target.value;
                    } else if (/vol/.test(target.id)) {
                        exerciseSearch[0].vol = target.value;
                    } else if (/final/.test(target.id)) {
                        exerciseSearch[0].finalRest = target.value;
                    } else if (/rest-units/.test(target.id)) {
                        exerciseSearch[0].restUnits = target.value;
                    } else if (/sets/.test(target.id)) {
                        exerciseSearch[0].sets = target.value;
                    } else if (/rest/.test(target.id)) {
                        exerciseSearch[0].setRest = target.value;
                    }

                    const updatedExercise = exerciseSearch[0];
                    let updatedExerciseArray = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id !== updatedExercise.id);
                    updatedExerciseArray.push(updatedExercise);
                    exerciseTypeSearch[0].exercises = updatedExerciseArray;
                    updatedExerciseType = exerciseTypeSearch[0];
                } else {
                    exerciseTypeSearch[0].exercises.push({
                        id: id,
                        name: /name/.test(target.id) ? target.value : '',
                        weight: (/weight/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                        weightUnits: /weight-units/.test(target.id) ? target.value : '',
                        vol: (/vol/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                        volUnits: /vol-units/.test(target.id) ? target.value : '',
                        sets: /sets/.test(target.id) ? target.value : '',
                        setRest: (/rest/.test(target.id) && !(/final/.test(target.id)) && !(/units/.test(target.id))) ? target.value : '',
                        finalRest: (/rest-final/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                        restUnits: /rest-units/.test(target.id) ? target.value : ''
                    });                    

                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup, 
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: [
                            ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                            exerciseTypeSearch[0]
                        ]
                    })
                }

                if (updatedExerciseType) {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup, 
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: [
                            ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                            updatedExerciseType
                        ]
                    })
                }

            } else if (!(/remove/.test(target.id))) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main,
                        {
                            id: containerId,
                            type: 'strength',
                            exercises: [
                                {
                                    id: id,
                                    name: /name/.test(target.id) ? target.value : '',
                                    weight: (/weight/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                                    weightUnits: /weight-units/.test(target.id) ? target.value : '',
                                    vol: (/vol/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                                    volUnits: /vol-units/.test(target.id) ? target.value : '',
                                    sets: /sets/.test(target.id) ? target.value : '',
                                    setRest: (/rest/.test(target.id) && !(/final/.test(target.id)) && !(/units/.test(target.id))) ? target.value : '',
                                    finalRest: (/rest-final/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                                    restUnits: /rest-units/.test(target.id) ? target.value : ''
                                }
                            ]
                        }
                    ]
                })
                return workoutData;
            }
            return workoutData
        }

        if (/cardio/.test(target.id)) {
            const containerId = parseInt(target.dataset.secondaryIndex)
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseTypeSearch = workoutData.main.filter(exerciseType => exerciseType.id === containerId);

            if (exerciseTypeSearch.length > 0) {

                const exerciseSearch = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id === id);
                let updatedExerciseType = null;

                if (/remove/.test(target.id)) {
                    if (exerciseTypeSearch[0].exercises.length < 2) {
                        setWorkoutData({
                            title: workoutData.title,
                            hours: workoutData.hours,
                            minutes: workoutData.minutes,
                            date: workoutData.date,
                            status: workoutData.status,
                            notes: workoutData.notes,
                            warmup: workoutData.warmup, 
                            cooldown: workoutData.cooldown,
                            mobility: workoutData.mobility,
                            main: workoutData.main.filter(exerciseType => exerciseType.id !== containerId)
                        })
                    } else {
                        const updatedExercises = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id !== id);
                        exerciseTypeSearch[0].exercises = updatedExercises;
                        setWorkoutData({
                            title: workoutData.title,
                            hours: workoutData.hours,
                            minutes: workoutData.minutes,
                            date: workoutData.date,
                            status: workoutData.status,
                            notes: workoutData.notes,
                            warmup: workoutData.warmup, 
                            cooldown: workoutData.cooldown,
                            mobility: workoutData.mobility,
                            main: [
                                ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                                exerciseTypeSearch[0]
                            ]
                        })
                    }
                    
                } else if (exerciseSearch.length > 0) {
                    if (/name/.test(target.id)) {
                        exerciseSearch[0].name = target.value;
                    } else if (/distance-units/.test(target.id)) {
                        exerciseSearch[0].distanceUnits = target.value;
                    } else if (/distance/.test(target.id)) {
                        exerciseSearch[0].distance = target.value;
                    } else if (/pace-min/.test(target.id)) {
                        exerciseSearch[0].paceMin = target.value;
                    } else if (/pace-sec/.test(target.id)) {
                        exerciseSearch[0].paceSec = target.value;
                    }

                    const updatedExercise = exerciseSearch[0];
                    let updatedExerciseArray = exerciseTypeSearch[0].exercises.filter(exercise => exercise.id !== updatedExercise.id);
                    updatedExerciseArray.push(updatedExercise);
                    exerciseTypeSearch[0].exercises = updatedExerciseArray;
                    updatedExerciseType = exerciseTypeSearch[0];
                } else {
                    exerciseTypeSearch[0].exercises.push({
                        id: id,
                        name: /name/.test(target.id) ? target.value : '',
                        distance: (/distance/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                        distanceUnits: /distance-units/.test(target.id) ? target.value : '',
                        paceMin: /pace-min/.test(target.id) ? target.value : '',
                        paceSec: /pace-sec/.test(target.id) ? target.value : '',
                    });           

                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup, 
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: [
                            ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                            exerciseTypeSearch[0]
                        ]
                    })
                }

                if (updatedExerciseType) {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup, 
                        cooldown: workoutData.cooldown,
                        mobility: workoutData.mobility,
                        main: [
                            ...workoutData.main.filter(exerciseType => exerciseType.id !== containerId),
                            updatedExerciseType
                        ]
                    })
                }

            } else if (!(/remove/.test(target.id))) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main,
                        {
                            id: containerId,
                            type: 'cardio',
                            exercises: [
                                {
                                    id: id,
                                    name: /name/.test(target.id) ? target.value : '',
                                    distance: (/distance/.test(target.id) && !(/units/.test(target.id))) ? target.value : '',
                                    distanceUnits: /distance-units/.test(target.id) ? target.value : '',
                                    paceMin: /pace-min/.test(target.id) ? target.value : '',
                                    paceSec: /pace-sec/.test(target.id) ? target.value : '',
                                }
                            ]
                        }
                    ]
                })
                return workoutData;
            }
            return workoutData
        }
        
        if (/cooldown/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = workoutData.cooldown.filter(exercise => exercise.id === id);

            if (/name/.test(target.id)) {
                                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: target.value,
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/weight-units/.test(target.id)) {
                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].weightUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: target.value,
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/weight/.test(target.id)) {
                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].weight = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: '',
                                weight: target.value,
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/vol-units/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].volUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: target.value,
                                sets: '',
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/vol/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].vol = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: target.value,
                                volUnits: '',
                                sets: '',
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }
                
            } else if (/sets/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown,
                            {
                                id: id,
                                name: '',
                                weight: '',
                                weightUnits: '',
                                vol: '',
                                volUnits: '',
                                sets: target.value,
                            }
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/remove/.test(target.id)) {
                
                if (exerciseSearch.length > 0) {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: [
                            ...workoutData.cooldown.filter(exercise => exercise.id !== id)
                        ],
                        mobility: workoutData.mobility,
                        main: workoutData.main
                    })
                    return workoutData;
                } 

            }

            if (updatedExercise) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup, 
                    cooldown: [
                        ...workoutData.cooldown.filter(exercise => exercise.id !== id),
                        updatedExercise
                    ],
                    mobility: workoutData.mobility,
                    main: workoutData.main
                })
            }
            return workoutData
        }

        if (/mobility/.test(target.id)) {
            const id = parseInt(target.id.match(/\d+/)[0])
            const exerciseSearch = workoutData.mobility.filter(exercise => exercise.id === id);

            if (/name/.test(target.id)) {
                                
                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].name = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: workoutData.cooldown,
                        mobility: [
                            ...workoutData.mobility,
                            {
                                id: id,
                                name: target.value,
                                time: '',
                                timeUnits: '',
                                sets: ''
                            }
                        ],
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/time-units/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].timeUnits = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: workoutData.cooldown,
                        mobility: [
                            ...workoutData.mobility,
                            {
                                id: id,
                                name: '',
                                time: '',
                                timeUnits: target.value,
                                sets: ''
                            }
                        ],
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/time/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].time = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: workoutData.cooldown,
                        mobility: [
                            ...workoutData.mobility,
                            {
                                id: id,
                                name: '',
                                time: target.value,
                                timeUnits: '',
                                sets: ''
                            }
                        ],
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/sets/.test(target.id)) {

                if (exerciseSearch.length > 0) {
                    exerciseSearch[0].sets = target.value;
                    updatedExercise = exerciseSearch[0];
                } else {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: workoutData.cooldown,
                        mobility: [
                            ...workoutData.mobility,
                            {
                                id: id,
                                name: '',
                                time: '',
                                timeUnits: '',
                                sets: target.value
                            }
                        ],
                        main: workoutData.main
                    })
                    return workoutData;
                }

            } else if (/remove/.test(target.id)) {
                
                if (exerciseSearch.length > 0) {
                    setWorkoutData({
                        title: workoutData.title,
                        hours: workoutData.hours,
                        minutes: workoutData.minutes,
                        date: workoutData.date,
                        status: workoutData.status,
                        notes: workoutData.notes,
                        warmup: workoutData.warmup,
                        cooldown: workoutData.cooldown,
                        mobility: [
                            ...workoutData.mobility.filter(exercise => exercise.id !== id)
                        ],
                        main: workoutData.main
                    })
                    return workoutData;
                } 
            }

            if (updatedExercise) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: [
                        ...workoutData.mobility.filter(exercise => exercise.id !== id),
                        updatedExercise
                    ],
                    main: workoutData.main
                })
            }
            return workoutData
        }

        if (/info/.test(target.id)) {

            if (/title/.test(target.id)) {
                setWorkoutData({
                    title: target.value,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            } else if (/hours/.test(target.id)) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: target.value,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            } else if (/minutes/.test(target.id)) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: target.value,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            } else if (/date/.test(target.id)) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: target.value,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            } else if (/status/.test(target.id)) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: target.value,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            } else if (/notes/.test(target.id)) {
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: target.value,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: workoutData.main   
                })
            }
            return workoutData
        }

        if (/warmup/.test(target.type)){
            setWorkoutData({
                title: workoutData.title,
                hours: workoutData.hours,
                minutes: workoutData.minutes,
                date: workoutData.date,
                status: workoutData.status,
                notes: workoutData.notes,
                warmup: [
                    ...workoutData.warmup,
                    ...target.exercises
                ],
                cooldown: workoutData.cooldown,
                mobility: workoutData.mobility,
                main: workoutData.main   
            })
        }

        if (/strength/.test(target.type)){
            let addition = workoutData.main.filter( exerciseType => exerciseType.id === target.secondaryId )[0];
            if (addition) {
                for (let i in target.exercises) {
                    addition.exercises.push(target.exercises[i]);
                }
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main.filter( exerciseType => exerciseType.id !== target.secondaryId ),
                        addition
                    ]   
                })
            } else {
                addition = target;
                addition.id = addition.secondaryId;
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main,
                        {
                            id: addition.id,
                            name: addition.name,
                            type: addition.type,
                            date: addition.date,
                            exercises: addition.exercises
                        }
                    ]   
                })
            }
            
        }

        if (/cardio/.test(target.type)){
            let addition = workoutData.main.filter( exerciseType => exerciseType.id === target.secondaryId )[0];
            if (addition) {
                for (let i in target.exercises) {
                    addition.exercises.push(target.exercises[i]);
                }
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main.filter( exerciseType => exerciseType.id !== target.secondaryId ),
                        addition
                    ]   
                })
            } else {
                addition = target;
                addition.id = addition.secondaryId;
                setWorkoutData({
                    title: workoutData.title,
                    hours: workoutData.hours,
                    minutes: workoutData.minutes,
                    date: workoutData.date,
                    status: workoutData.status,
                    notes: workoutData.notes,
                    warmup: workoutData.warmup,
                    cooldown: workoutData.cooldown,
                    mobility: workoutData.mobility,
                    main: [
                        ...workoutData.main,
                        {
                            id: addition.id,
                            name: addition.name,
                            type: addition.type,
                            date: addition.date,
                            exercises: addition.exercises
                        }
                    ]   
                })
            }
            
        }

        if (/cooldown/.test(target.type)){
            setWorkoutData({
                title: workoutData.title,
                hours: workoutData.hours,
                minutes: workoutData.minutes,
                date: workoutData.date,
                status: workoutData.status,
                notes: workoutData.notes,
                warmup: workoutData.warmup,
                cooldown: [
                    ...workoutData.cooldown,
                    ...target.exercises
                ],
                mobility: workoutData.mobility,
                main: workoutData.main   
            })
        }

        if (/mobility/.test(target.type)){
            setWorkoutData({
                title: workoutData.title,
                hours: workoutData.hours,
                minutes: workoutData.minutes,
                date: workoutData.date,
                status: workoutData.status,
                notes: workoutData.notes,
                warmup: workoutData.warmup,
                cooldown: workoutData.cooldown,
                mobility: [
                    ...workoutData.mobility,
                    ...target.exercises
                ],
                main: workoutData.main   
            })
        }
        

    }

    const saveSession = () => {
        if (workoutData.date === '') {
            setRejectClass('')
            setTimeout(() => {
                setRejectClass('hide');
            }, 5000)
        } else {
            axios({
                method: 'POST',
                data: workoutData,
                withCredentials: true,
                url: `http://localhost:5000/users/${authUser}?resource=logs`
            })
            .then((res) => {
                res.config.data = "hidden";
                console.log(res);
                setErrorClass('hide');
                setSuccessClass('');
                setWorkoutData({
                    title: '',
                    hours: '',
                    minutes: '',
                    date: '',
                    status: 'complete',
                    notes: '',
                    warmup: [],
                    cooldown: [],
                    mobility: [],
                    main: []
                })
                setActiveTrainingTypes([
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
                ])
                setTimeout(() => {
                    setSuccessClass('hide');
                }, 5000)
            })
            .catch(() => {
                console.log('failed to save');
                setErrorClass('');
            });
        }
    }

    const fetchTemplates = () => { //To be used to update template add list
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=templates`
        })
        .then((res) => {
            setTemplates(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect( () => {
        fetchTemplates();
    }, []);

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
                                <input type="text" id="info-title" name="info-title" placeholder="Title" maxLength={36} onBlur={ e => updateWorkoutData(e.target)}/><br className="mobile-only" />
                                <input className="exercise-secondary" type="number" id="info-hours" name="info-hours" placeholder="Hours" onBlur={ e => updateWorkoutData(e.target)}/><br className="mobile-only" />
                                <input className="exercise-secondary" type="number" id="info-minutes" name="info-minutes" placeholder="Minutes" max={59} onBlur={ e => updateWorkoutData(e.target)}/><br className="mobile-only" />
                                <input type="date" id="info-date" name="info-date" placeholder="Date" onBlur={ e => updateWorkoutData(e.target)}/>
                                <select name="info-status" id="info-status" onBlur={ e => updateWorkoutData(e.target)}>
                                    <option value="complete">Complete</option>
                                    <option value="partial">Partial</option>
                                    <option value="not-done">Not Done</option>
                                </select><br className="mobile-only" /><br className="mobile-only" />
                                <button id="save-button" onClick={ e => {e.preventDefault(); saveSession()}}>SAVE SESSION TO LOG</button><div className={`${successClass}`} style={{backgroundColor: '#00FF0088'}}><p>WORKOUT SAVED!</p></div><div className={`${rejectClass}`} style={{backgroundColor: '#FF0000AA'}}><p>NOT SAVED: DATE REQUIRED</p></div><div className={`${errorClass}`} style={{backgroundColor: '#FF0000AA'}}><p>ERROR: WORKOUT NOT SAVED</p></div><br />
                                <textarea id="info-session-notes" name="info-session-notes" rows="4" cols="150" placeholder="Notes" onBlur={ e => updateWorkoutData(e.target)}></textarea>
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