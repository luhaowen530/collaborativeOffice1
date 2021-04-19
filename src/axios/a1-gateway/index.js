import axios from 'axios'
import { baseUrl, interfaceUrl } from '@/axios'

/* 获取门户第二页数据
* service：接口地址
* WEEK_NUM: 当前周数
*/
export function getGatewayData(params) {
    return axios.post(baseUrl + interfaceUrl, {
        service: params.service,
        WEEK_NUM: params.WEEK_NUM
    }, {})
}