import * as types from "../actions/index";
let data = {
  general_info: {},
  business_info: {},
  work_references: {},
  bank_detail: {},
  tech_capability: {}
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @author Idowu
 * @implements Modified `types.UPDATE_VENDOR`
 * @implements By adding `{...state, data: action.data}`
 * @summary Fixed issues with the purchase requisition
 * @summary a bug that keeps showing loader upon page routing
 */
export default function vendor(state = data, action) {
  switch (action.type) {
    case types.ADD_VENDOR:
      return action;
    case types.UPDATE_VENDOR:
      return { ...state, data: action.data };
    case types.FETCH_VENDOR:
      return action.data;
    case types.RECIEVE_GENERAL_INFO_DATA:
      return {
        ...state,
        general_info: { ...state.general_info, ...action.data }
      };
    case types.RECIEVE_BUSINESS_INFO_DATA:
      return {
        ...state,
        business_info: { ...state.business_info, ...action.data }
      };
    case types.RECIEVE_BANK_DETAIL_DATA:
      return {
        ...state,
        bank_detail: { ...state.bank_detail, ...action.data }
      };
    case types.RECIEVE_WORK_REFERENCE_DATA:
      return {
        ...state,
        work_references: { ...state.work_references, ...action.data }
      };
    default:
      return state;
  }
}
