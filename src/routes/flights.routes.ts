import { Router } from 'express';
import FlightsController from '../controllers/flights.controller';
import { validateQuery } from "../middlewares";
import {Container} from "typedi";

const flights = Router();

const flightsController = Container.get(FlightsController);

flights.get('/', validateQuery([]), flightsController.getFlights);


export default flights;