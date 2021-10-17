import {Alert} from "../../model/alert.model";

export class SetSuccessAlert {
  public static readonly type = '[UI] Set success alert';
  constructor(public payload: { successAlert: Alert }) { }
}
export class SetErrorAlert {
  public static readonly type = '[UI] Set error alert';
  constructor(public payload: { errorAlert: Alert }) { }
}

