import { MAKE_REQ, OPEN_POPUP, REQ_ADD_SUCC, REQ_DELETE_SUCC, REQ_GETALL_FAIL, REQ_GETALL_SUCC, REQ_GETBYCODE_SUCC, REQ_UPDATE_SUCC } from "../../redux/ActionType"

export interface DomainStates {
    isloading: boolean;
    domainlist: any[]; 
    domainobj: any;
    errormessage: string | null;
}
export const initialstate = {
    isloading: false,
    domainlist: [],
    domainobj: {},
    errormessage: null
    
}

export const DomainReducer = (state :DomainStates= initialstate, action:any) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isloading: true
            }
        case REQ_GETALL_SUCC:
            return {
                ...state,
                isloading: false,
                domainlist: action.payload
            }
        case REQ_GETBYCODE_SUCC:
            return {
                ...state,
                domainobj: action.payload
            }
        case REQ_GETALL_FAIL:
            return {
                ...state,
                isloading: false,
                domainlist: [],
                errormessage: action.payload
            }
        case OPEN_POPUP:
            return {
                ...state,
                domainobj: {}
            }
        case REQ_ADD_SUCC:
            const _inputdata = { ...action.payload };
            const _maxid = Math.max(...state.domainlist.map(o => o.id));
            _inputdata.id = _maxid + 1;
            return {
                ...state,
                domainlist: [...state.domainlist, action.payload]
            }
        case REQ_UPDATE_SUCC:
            const _data = { ...action.payload };
            const _finaldata = state.domainlist.map(item => {
                return item.id === _data.id ? _data : item
            });
            return {
                ...state,
                domainlist: _finaldata
            }
        case REQ_DELETE_SUCC:
            const _filterdata = state.domainlist.filter((data) => {
                return data.id !== action.payload
            })
            return {
                ...state,
                domainlist: _filterdata
            }
        default: return state;
    }
}
