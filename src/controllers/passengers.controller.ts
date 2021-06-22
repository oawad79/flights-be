import {Get, JsonController, Param} from "routing-controllers";
import Logger from "../loaders/logger";
import {Inject, Service} from "typedi";
import PassengersService from "../services/passengers.services";
import {OpenAPI} from "routing-controllers-openapi";

@Service()
@JsonController()
export default class PassengersController {

    constructor(
        @Inject('passengersService') private passengersService: PassengersService
    )
    {}

    // @Get('/passengers/:id')
    // getPassengersByFlightId(@Param('id') id: string) {
    //
    //     return [];
    // }

    // @Get('/passengers')
    // getPassengers() {
    //     Logger.info(`In Get Passengers`);
    //     return this.passengersService.getPassengers();
    // }

    @Get('/passengers')
    @OpenAPI({ summary: 'Return a list of users' })
    getPassengers = async () => {
        Logger.info(`In Get Passengers`);
        return await this.passengersService.getPassengers();
    }
}