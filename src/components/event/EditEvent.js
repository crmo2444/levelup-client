import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, editEvent, getSingleEvent } from "../../managers/EventManager.js"
import { getGames } from '../../managers/GameManager.js'


export const EditEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [event, setEvent] = useState([])
    const [updateEvent, setUpdateEvent] = useState({})
    let {eventId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
        getSingleEvent(eventId).then(data => setEvent(data))
        console.log(eventId)
    }, [])

    useEffect(
        () => {
            setUpdateEvent({
                game: event.game,
                description: event.description,
                date: event.date,
                time: event.time
            })
        },
        [event]
    )

    const changeEventState = (evt) => {
        // TODO: Complete the onChange function
        const copy = {...updateEvent}
        copy[evt.target.name] = evt.target.value
        setUpdateEvent(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                     <select name="game"
                                    proptype="int"
                                    value={updateEvent.game}
                                    onChange={changeEventState}>
                                        <option value="0">Select a game...</option>
                                        {games.map(game => (
                                            <option key={game.id} value={game.id} name={`game--${game.id}`}>
                                                {game.title}
                                            </option>
                                        ))}
                                </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={updateEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={updateEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="int" name="time" required autoFocus className="form-control"
                        value={updateEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(updateEvent.game),
                        description: updateEvent.description,
                        date: updateEvent.date,
                        time: updateEvent.time
                    }

                    // Send POST request to your API
                    editEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}