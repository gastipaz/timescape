import { createContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({children}) {

    const [date, setDate] = useState(new Date())
    const [placeEvent, setPlaceEvent] = useState({})
    const [events, setEvents] = useState([]);
    const [createEvent, setCreateEvent] = useState(false);
    const [saved, setSaved] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([]);
    const defaultImage = "https://sertacentroamerica.com/costarica/wp-content/uploads/sites/3/2021/05/placeholder-106.png";

    return (
        <DataContext.Provider value={{ 
            placeEvent, setPlaceEvent, events, setEvents, createEvent, 
            setCreateEvent, date, setDate, defaultImage, saved, setSaved,
            filteredEvents, setFilteredEvents}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;