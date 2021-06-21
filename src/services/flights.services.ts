import {Service} from 'typedi';
import {Flight} from "../types/flights.types";

@Service('flightsService')
export default class FlightsService {

    async getFlights(): Promise<Flight[]> {
        return [
            {
                id: "1",
                description: "Flight from Memphis to Dallas"
            },
            {
                id: "2",
                description: "Flight from Dallas to Memphis"
            }
        ];
    }

    async getFlightDetailsById(flightId: string): Promise<Flight> {
        return {
            id: flightId,
            description: "Flight from Memphis to Dallas"
        };
    }
}
