import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { EditEvent } from "../components/event/EditEvent"
import { EditGame } from "../components/game/EditGame"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId" element={<EditEvent />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:gameId" element={<EditGame />} />
                <Route path="/games" element={<GameList />} />
            </Route>
        </Routes>
    </>
}