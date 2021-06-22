import {Inject, Service} from "typedi";
import FlightsService from '../services/flights.services';
import Logger from '../loaders/logger';
import {Get, JsonController, Req, Res} from "routing-controllers";

@Service()
@JsonController()
export default class FlightsController {

    constructor(
        @Inject('flightsService') private flightsService: FlightsService) {
    }

    @Get('/flights')
    getFlights = async () => {
        Logger.debug(`Entering getFlights...`);
        return await this.flightsService.getFlights();
    }

    // @Get('/flights')
    // async getFlights(@Req() req: Request, @Res() res: Response) {
    //     Logger.debug(`Entering getFlights...`);
    //
    //     try {
    //         const flightsList = await this.flightsService.getFlights();
    //         res.status(200).send(flightsList);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    //
    // }
}


