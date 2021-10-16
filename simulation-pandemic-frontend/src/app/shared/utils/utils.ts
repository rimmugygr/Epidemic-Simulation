import {ActivatedRoute} from "@angular/router";
import {PageMode} from "../model/page-mode.model";
import {FORM_MODE} from "../model/form-mode.model";

export const getPageMode = (route: ActivatedRoute): PageMode => {

  const id = route.snapshot.params.id;
  const isEdit = route.snapshot.url[0].path === 'edit';

  if (id) {

    if (isEdit) {
      return { formMode: FORM_MODE.EDIT, id };
    } else {
      return { formMode: FORM_MODE.DETAILS, id };
    }

  } else {
    return { formMode: FORM_MODE.CREATE };
  }
};
