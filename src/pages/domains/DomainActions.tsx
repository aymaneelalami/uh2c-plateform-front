import axios from "axios";
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "../../redux/Action"
import { toast } from "react-toastify";

export interface Domain{
    id:     string;
    key:    string;
    name:   string;
    type:   string;
}

export const GetAllDomains = () => {
    return (dispatch:any) => {
        dispatch(makeRequest());
        setTimeout(()=>{
            axios.get("http://localhost:8080/domains").then(res => {
                const _list = res.data;
                dispatch(getAllRequestSuccess(_list));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        },1000)
       
    }
}

export const GetDomainbycode = (code:string) => {
    return (dispatch:any) => {
        //dispatch(makeRequest());
        axios.get("http://localhost:8080/domains/"+code).then(res => {
            const _obj = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(_err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const CreateDomain = (data : any) => {
    return (dispatch:any) => {
        axios.post("http://localhost:8080/domains", data).then(_res => {
            // console.log(typeof _res.data.id,  _res.data.id);
            // console.log(typeof data,  data);
            dispatch(AddRequest(_res.data));
            toast.success('Domain created successfully.')
        }).catch(err => {
            toast.error('Failed to create comany due to :' + err.message)
        });
    }
}

export const UpdateDomain = (data : any) => {
    return (dispatch:any) => {
        axios.put("http://localhost:8080/domains/"+data.id, data).then(_res => {
            dispatch(UpdateRequest(data));
            toast.success('Domain updated successfully.')
        }).catch(err => {
            toast.error('Failed to update comany due to :' + err.message)
        });
    }
}

export const RemoveDomain = (code:string) => {
    return (dispatch:any) => {
        axios.delete("http://localhost:8080/domains/"+code).then(_res => {
            dispatch(RemoveRequest(code));
            toast.success('Domain Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove comany due to :' + err.message)
        });
    }
}


