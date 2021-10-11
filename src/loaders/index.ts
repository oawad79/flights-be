import {Container} from "typedi";
import Logger from "./logger";
export {default as Logger} from "./logger";

Container.set('logger', Logger);
