import { ILaunchItem, Launchtype } from "../typings/ILaunch";

export class LaunchItem implements ILaunchItem{
    name: string;    
    type: Launchtype;
    value: number;

    constructor(name: string, type: Launchtype, value: number){
        this.name = name
        this.type = type
        this.value = value
    }
    
}