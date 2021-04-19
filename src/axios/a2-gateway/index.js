import axios from 'axios'
import { a2baseUrl, interfaceUrl } from '@/axios'

//获取管理员列表
export function getAdmin(params) {
    let path = '/pdgj/zzsy/htgl/userInfo/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}
//获取user列表
export function getUser(params) {
    let path = '/pdgj/zzsy/htgl/staffInfo/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}
//user列表同步
export function tosameUser(params) {
    let path = '/pdgj/zzsy/htgl/staffInfo/updateStaff'
    return axios.post(a2baseUrl + path, {
        
    })
}
//获取停车场列表
export function getCarpark(params) {
    let path = '/pdgj/zzsy/htgl/parkingInfo/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}
//停车场列表同步
export function tosameCarpark(params) {
    let path = '/pdgj/zzsy/htgl/parkingInfo/updateStaff'
    return axios.post(a2baseUrl + path, {
        
    })
}

//获取操作记录列表
export function getOperation(params) {
    let path = '/pdgj/zzsy/htgl/useLog/queryPageList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//获取智能柜规格数据列表
export function getQuantity(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterInfo/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//新增/编辑 智能柜规格数据列表
export function addQuantity(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterInfo/saveInfo'
    return axios.post(a2baseUrl + path, {
        id: params.id,
        updateName: params.updateName,
        counterType: params.counterType,
        specs: params.specs,
        boxNum: params.boxNum,
        remark: params.remark,
    })
}

//删除智能柜规格数据列表
export function deleteQuantity(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterInfo/deleteInfo'
    return axios.post(a2baseUrl + path, {
        id: params.id
    })
}


//获取区域列表
export function getArea(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterArea/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//获取区域员工列表
export function getAreaPerson(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterArea/queryStaffList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//新增/编辑 区域数据列表
export function addArea(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterArea/save'
    return axios.post(a2baseUrl + path, {
        id: params.id,
        area: params.area,
        areaDetail: params.areaDetail,
        parking: params.parking,
        remarks: params.remarks,
        staffName: params.staffName,
        staffNo: params.staffNo,
        telephone: params.telephone,
        state: params.state,
        staffList: params.staffList
    })
}

//删除区域列表
export function deleteArea(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounterArea/delete'
    return axios.post(a2baseUrl + path, {
        id: params.id
    })
}


//获取智能柜列表
export function getMechine(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounter/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//获取智能柜线路列表
export function getMechineLine(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounter/queryLineList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//新增/编辑 智能柜数据列表
export function addMechine(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounter/save'
    return axios.post(a2baseUrl + path, {
        id: params.id,
        code: params.code,
        parking: params.parking,
        area: params.area,
        hostId: params.hostId,
        hostNum: params.hostNum,
        assistId: params.assistId,
        assistNum: params.assistNum,
        remark: params.remark,
        lineList: params.lineList
    })
}

//删除智能柜列表
export function deleteMechine(params) {
    let path = '/pdgj/zzsy/htgl/ticketCounter/delete'
    return axios.post(a2baseUrl + path, {
        id: params.id
    })
}


// 获取单个二维码
export function addOneQrInfo(params) {
    let path = '/pdgj/zzsy/htgl/qrInfo/addOneQrInfo'
    return axios.post(a2baseUrl + path, {
        content: params.content
    })
}

// 获取批量二维码
export function bathAddQrInfo(params) {
    let path = '/pdgj/zzsy/htgl/qrInfo/bathAddQrInfo'
    return axios.post(a2baseUrl + path, {
        content: params.startCode,
        endContent: params.endCode
    })
}

//获取基础信息列表
export function getBase(params) {
    let path = '/pdgj/zzsy/htgl/gallInfo/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//新增/编辑 基础信息据列表
export function addBase(params) {
    let path = '/pdgj/zzsy/htgl/gallInfo/save'
    return axios.post(a2baseUrl + path, {
        id: params.id,
        gallNo: params.gallNo,
        place: params.place,
        state: params.state,
        createName: params.createName,
        createBy: params.createBy
    })
}


//批量新增 基础信息据列表
export function addBathBase(params) {
    let path = '/pdgj/zzsy/htgl/gallInfo/bathAdd'
    return axios.post(a2baseUrl + path, 
        params.list
    )
}

//删除基础信息列表
export function deleteBase(params) {
    let path = '/pdgj/zzsy/htgl/gallInfo/delete'
    return axios.post(a2baseUrl + path, {
        id: params.id
    })
}

//获取出入库列表
export function getStock(params) {
    let path = '/pdgj/zzsy/htgl/gallOperate/queryList'
    return axios.post(a2baseUrl + path, {
        
    })
}

//新增/编辑 出入库列表
export function addStock(params) {
    let path = '/pdgj/zzsy/htgl/gallOperate/save'
    return axios.post(a2baseUrl + path, {
        
    })
}


//user列表导出
var exportUser =""
var exportCarpark = ""
var exportOperation = ""
var exportMechine = ""
var exportBase = ""
var exportStock = ""
let pathUser = '/pdgj/zzsy/htgl/staffInfo/exportExcel'
let pathCarpark = '/pdgj/zzsy/htgl/parkingInfo/exportExcel'
let pathOperation = '/pdgj/zzsy/htgl/useLog/exportExcel'
let pathMechine = '/pdgj/zzsy/htgl/ticketCounter/exportExcel'
let pathBase = '/pdgj/zzsy/htgl/gallInfo/exportExcel'
let pathStock = '/pdgj/zzsy/htgl/gallOperate/exportExcel'
exportUser =  a2baseUrl + pathUser
exportCarpark =  a2baseUrl + pathCarpark
exportOperation = a2baseUrl + pathOperation
exportMechine = a2baseUrl + pathMechine
exportBase = a2baseUrl +  pathBase
exportStock = a2baseUrl +  pathStock
export default {
    exportUser,
    exportCarpark,
    exportOperation,
    exportMechine,
    exportBase,
    exportStock
}
