import { parseTime } from '@/utils'
export function getNeedValue(data,tcpFlags,tcpString,tosString) {
  let needData = {
    name: '',
    sourceIP: '',
    sourcePort: '',
    purposeIP: '',
    purposePort: '',
    sourceAs: '',
    targetAs: '',
    inputIfIndex: '',
    outputIfIndex: '',
    region: '',
    tcpFlags: tcpFlags,
    tcpString: tcpString,
    tosString: tosString,
    desc: ''
  }
  if (data.name) {
    needData.name = data.name
  }
  if(data.sourceIp) {
    needData.sourceIP = data.sourceIp
  }
  if(data.sourcePort) {
    needData.sourcePort = data.sourcePort
  }
  if(data.targetIp) {
    needData.purposeIP = data.targetIp
  }
  if(data.targetPort) {
    needData.purposePort = data.targetPort
  }
  if(data.sourceAs) {
    needData.sourceAs = data.sourceAs
  }
  if(data.targetAs) {
    needData.targetAs = data.targetAs
  }
  if(data.inputIfIndex) {
    needData.inputIfIndex = data.inputIfIndex
  }
  if(data.outputIfIndex) {
    needData.outputIfIndex = data.outputIfIndex
  }
  if(data.protocol) {
    needData.region = data.protocol
  }
  if(data.regex) {
    needData.desc = data.regex
  }
  if(data.startDate) {
    needData.startDate = parseTime(data.startDate)
  }
  if(data.endDate) {
    needData.endDate = parseTime(data.endDate)
  }
  return needData
}