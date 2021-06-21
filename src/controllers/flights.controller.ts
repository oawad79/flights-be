import {Inject, Service} from "typedi";
import { Request, Response } from 'express';
import FlightsService from '../services/flights.services';
import Logger from '../loaders/logger';

@Service()
export default class FlightsController {

    constructor(
        @Inject('flightsService') private flightsService : FlightsService)
    {}

    getFlights = async (req: Request, res: Response) => {
        Logger.debug(`Entering getFlights...`);

        try {
            const flightsList = await this.flightsService.getFlights();
            res.send(flightsList);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}


