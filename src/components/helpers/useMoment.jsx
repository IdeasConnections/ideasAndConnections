import moment from "moment/moment"
export const getCurrentDateTimeStamp = (timeFormat) =>{
    return moment().format(timeFormat)
}