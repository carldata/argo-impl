import { Action } from "@ngrx/store";
import { IProject } from "../../../model/project";

export interface ProjectsLoadedAction extends Action {
  payload: IProject[];
}