import {TiledAction} from "../home/service/TiledService";
import {Action} from "redux";
import {Data} from "../DataTypes";

export interface DataAction extends Action<'data'> {
    data: Data<false>;
}

export type StoreAction = TiledAction | DataAction;