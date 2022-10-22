export interface Message {
  id: string
  // 应用模块
  appModule?: string
  // 模板id
  templateId?: string
  // 业务类型
  businessType: string
  // 业务Code
  businessCode: string
  // 发送人
  sender: string
  // 接收人
  receiver: string
  // 标题
  title: string
  // 内容
  content: string
  // 扩展数据
  extDataMap?: Record<string, unknown>
  // 通道
  channel: string
  channelLabel?: string
  // 状态
  status: string
  statusLabel?: string
  // 结果
  result?: string
  // 定时
  scheduleTime?: string
  // 创建时间
  createTime: string
  // 更新时间
  updateTime: string
}
