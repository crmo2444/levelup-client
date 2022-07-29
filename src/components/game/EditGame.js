import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { editGame, getGames, getGameTypes, getSingleGame } from '../../managers/GameManager.js'


export const EditGame = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [gameTypes, setGameTypes] = useState([])
    const [singleGame, setSingleGame] = useState([])
    const [updateGame, setUpdateGame] = useState({})
    let {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
        getGameTypes().then(data => setGameTypes(data))
        getSingleGame(gameId).then(data => setSingleGame(data))
    }, [])

    useEffect(
        () => {
            setUpdateGame({
                skillLevel: singleGame.skill_level,
                numberOfPlayers: singleGame.number_of_players,
                title: singleGame.title,
                maker: singleGame.maker,
                gameTypeId: singleGame.game_type
            })
        },
        [singleGame]
    )

    const changeGameState = (evt) => {
        // TODO: Complete the onChange function
        const copy = {...updateGame}
        copy[evt.target.name] = evt.target.value
        setUpdateGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={updateGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={updateGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="int" name="numberOfPlayers" required autoFocus className="form-control"
                        value={updateGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="int" name="skillLevel" required autoFocus className="form-control"
                        value={updateGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                     <select name="gameTypeId"
                                    proptype="int"
                                    value={updateGame.gameTypeId}
                                    onChange={changeGameState}>
                                        <option value="0">Select a game type...</option>
                                        {gameTypes.map(gameType => (
                                            <option key={gameType.id} value={gameType.id} name={`gameTypeId--${gameType.id}`}>
                                                {gameType.label}
                                            </option>
                                        ))}
                                </select>
                </div>
            </fieldset>
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: updateGame.maker,
                        title: updateGame.title,
                        number_of_players: parseInt(updateGame.numberOfPlayers),
                        skill_level: parseInt(updateGame.skillLevel),
                        game_type: parseInt(updateGame.gameTypeId)
                    }

                    // Send POST request to your API
                    editGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}