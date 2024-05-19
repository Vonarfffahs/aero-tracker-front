import FlightEditPage from "./pages/FlightEditPage";
import FlightListPage from "./pages/FlightListPage";
import FlightPage from "./pages/FlightPage";
import HomePage from "./pages/HomePage";
import PassengerEditPage from "./pages/PassengerEditPage";
import PassengerListPage from "./pages/PassengerListPage";
import PassengerPage from "./pages/PassengerPage";
import Registration from "./pages/RegistrationPage";
import { FLIGHT_EDIT_ROUTE, FLIGHT_LIST_ROUTE, FLIGHT_ROUTE, HOME_ROUTE, PASSENGER_EDIT_ROUTE, PASSENGER_LIST_ROUTE, PASSENGER_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <HomePage />
    },
    {
        path: PASSENGER_LIST_ROUTE,
        Component: <PassengerListPage />
    },
    {
        path: PASSENGER_ROUTE + '/:id',
        Component: <PassengerPage />
    },
    {
        path: PASSENGER_EDIT_ROUTE + '/:id',
        Component: <PassengerEditPage />
    },
    {
        path: FLIGHT_LIST_ROUTE,
        Component: <FlightListPage />
    },
    {
        path: FLIGHT_ROUTE + '/:id',
        Component: <FlightPage />
    },
    {
        path: FLIGHT_EDIT_ROUTE + '/:id',
        Component: <FlightEditPage />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration />
    }
];