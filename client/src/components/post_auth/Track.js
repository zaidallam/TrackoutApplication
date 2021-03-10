import React from 'react'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link } from 'react-router-dom'
import '../../css/post_auth/Track.css'
import '../../css/post_auth/FormPages.css'
import '../../css/post_auth/General.css'

export const Track = () => {
    return (
        <>
        <div className="form-page grid-2 page-container" id="track">
            <NavBar selected="track"/>
            <section className="content-section grid-1 fade-in">
                <nav className="mobile-hide">
                    <ul>
                        <li className="red-text"><Link to="/">Log Out</Link></li>
                    </ul>
                </nav>
                <h2>TRACK</h2>
                <div className="input-form">
                    <select defaultValue="" name="type-select" id="type-select">
                        <option value="" disabled hidden>Choose a Training Type</option>
                        <option value="Warmup">Warmup</option>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Mobility">Mobility</option>
                        <option value="Cooldown">Cooldown</option>
                    </select>
                    <button>
                        ADD
                    </button>
                    <form>
                        <fieldset className="type-fieldset warmup-fieldset">
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

                        <fieldset className="type-fieldset warmup-fieldset">
                            <legend>WARMUP</legend>
                            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-warmup">
                                <option value="" disabled  hidden>Choose Template</option>
                                <option value="New">New</option>
                                <optgroup label="Templates">
                                    <option value="example">Example</option>
                                </optgroup>
                            </select>
                            <button>
                                ADD
                            </button><br /><br className="mobile-only" />
                            <input className="exercise-name" type="text" id="warmup-1" name="warmup-1" placeholder="Exercise Name" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="warmup-1-weight" name="warmup-1-weight" placeholder="Weight" />
                            <select defaultValue="" name="warmup-1-weight-units" id="warmup-1-weight-units">
                                <option value=""></option>
                                <option value="lb">lb</option>
                                <option value="kg">kg</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="warmup-1-vol" name="warmup-1-vol" placeholder="Volume" />
                            <select defaultValue="" name="warmup-1-vol-units" id="warmup-1-vol-units">
                                <option value=""></option>
                                <option value="Reps">Reps</option>
                                <option value="Seconds">Seconds</option>
                                <option value="Minutes">Minutes</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="warmup-1-sets" name="warmup-1-sets" placeholder="Sets" />
                            <button className="remove-exercise">REMOVE</button><br className="mobile-only" />
                        </fieldset>

                        <fieldset className="type-fieldset strength-fieldset">
                            <legend>STRENGTH</legend>
                            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-strength">
                                <option value="" disabled  hidden>Choose Template</option>
                                <option value="New">New</option>
                                <optgroup label="Templates">
                                    <option value="example">Example</option>
                                </optgroup>
                            </select>
                            <button>
                                ADD
                            </button><br /><br className="mobile-only" />
                            <input className="exercise-name" type="text" id="strength-1" name="strength-1" placeholder="Exercise Name" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="strength-1-weight" name="strength-1-weight" placeholder="Weight" />
                            <select defaultValue="" name="strength-1-weight-units" id="strength-1-weight-units">
                                <option value=""></option>
                                <option value="lb">lb</option>
                                <option value="kg">kg</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="strength-1-vol" name="strength-1-vol" placeholder="Volume" />
                            <select defaultValue="" name="strength-1-vol-units" id="strength-1-vol-units">
                                <option value=""></option>
                                <option value="Reps">Reps</option>
                                <option value="Seconds">Seconds</option>
                                <option value="Minutes">Minutes</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="strength-1-sets" name="strength-1-sets" placeholder="Sets" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="strength-1-Rest" name="strength-1-Rest" placeholder="Set Rest" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="strength-1-Rest Final" name="strength-1-Rest Final" placeholder="End Rest" />
                            <select defaultValue="" name="strength-1-Rest-units" id="strength-1-Rest-units">
                                <option value=""></option>
                                <option value="Reps">Reps</option>
                                <option value="Seconds">Seconds</option>
                                <option value="Minutes">Minutes</option>
                            </select>
                            <button className="remove-exercise">REMOVE</button><br className="mobile-only" />
                        </fieldset>

                        <fieldset className="type-fieldset cardio-fieldset">
                            <legend>CARDIO</legend>
                            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-cardio">
                                <option value="" disabled  hidden>Choose Template</option>
                                <option value="New">New</option>
                                <optgroup label="Templates">
                                    <option value="example">Example</option>
                                </optgroup>
                            </select>
                            <button>
                                ADD
                            </button><br /><br className="mobile-only" />
                            <input className="exercise-name" type="text" id="cardio-1" name="cardio-1" placeholder="Exercise Name" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cardio-1-distance" name="cardio-1-distance" placeholder="Distance" />
                            <select defaultValue="" name="cardio-1-distance-units" id="cardio-1-distance-units">
                                <option value=""></option>
                                <option value="mi">mi</option>
                                <option value="km">km</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cardio-1-pace-min" name="cardio-1-pace-min" placeholder="Pace Min" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cardio-1-pace-sec" name="cardio-1-pace-sec" placeholder="Pace Sec" />
                            <button className="remove-exercise">REMOVE</button><br className="mobile-only" />
                        </fieldset>

                        <fieldset className="type-fieldset mobility-fieldset">
                            <legend>MOBILITY</legend>
                            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-mobility">
                                <option value="" disabled  hidden>Choose Template</option>
                                <option value="New">New</option>
                                <optgroup label="Templates">
                                    <option value="example">Example</option>
                                </optgroup>
                            </select>
                            <button>
                                ADD
                            </button><br /><br className="mobile-only" />
                            <input className="exercise-name" type="text" id="mobility-1" name="mobility-1" placeholder="Exercise Name" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="mobility-1-time" name="mobility-1-time" placeholder="Time" />
                            <select defaultValue="" name="mobility-1-time-units" id="mobility-1-time-units">
                                <option value=""></option>
                                <option value="mi">Seconds</option>
                                <option value="km">Minutes</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="mobility-1-pace-sets" name="mobility-1-pace-sets" placeholder="Sets" />
                            <button className="remove-exercise">REMOVE</button><br className="mobile-only" />
                        </fieldset>

                        <fieldset className="type-fieldset cooldown-fieldset">
                            <legend>COOLDOWN</legend>
                            <select defaultValue="" className="add-exercise" name="add-exercise" id="add-exercise-cooldown">
                                <option value="" disabled  hidden>Choose Template</option>
                                <option value="New">New</option>
                                <optgroup label="Templates">
                                    <option value="example">Example</option>
                                </optgroup>
                            </select>
                            <button>
                                ADD
                            </button><br /><br className="mobile-only" />
                            <input className="exercise-name" type="text" id="cooldown-1" name="cooldown-1" placeholder="Exercise Name" /><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cooldown-1-weight" name="cooldown-1-weight" placeholder="Weight" />
                            <select defaultValue="" name="cooldown-1-weight-units" id="cooldown-1-weight-units">
                                <option value=""></option>
                                <option value="lb">lb</option>
                                <option value="kg">kg</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cooldown-1-vol" name="cooldown-1-vol" placeholder="Volume" />
                            <select defaultValue="" name="cooldown-1-vol-units" id="cooldown-1-vol-units">
                                <option value=""></option>
                                <option value="Reps">Reps</option>
                                <option value="Seconds">Seconds</option>
                                <option value="Minutes">Minutes</option>
                            </select><br className="mobile-only" />
                            <input className="exercise-secondary" type="number" id="cooldown-1-sets" name="cooldown-1-sets" placeholder="Sets" />
                            <button className="remove-exercise">REMOVE</button><br className="mobile-only" />
                        </fieldset>

                    </form>
                </div> 
            </section>
            <NavBarMobile />
        </div>
        </>
    )
}