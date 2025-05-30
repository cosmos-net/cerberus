import { INestedRecord } from '@helpers/interfaces/nested-record-interface.helper';

export interface IOptions {
  withArchived?: boolean;
  relations?: INestedRecord;
}
