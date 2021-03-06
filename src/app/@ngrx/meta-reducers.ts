import { ActionReducer, MetaReducer } from '@ngrx/store';

// console.log all actions and state
// export is needed for aot compilation
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
