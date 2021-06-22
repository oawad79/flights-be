import {Service} from "typedi";
import {Passenger} from "@/types/passenger.types";

@Service('passengersService')
export default class PassengersService {
    async getPassengers(): Promise<Passenger[]> {
        return [
            {
                id: "1",
                name: "Osama"
            },
            {
                id: "2",
                name: "Sami"
            }
        ];
    }
}