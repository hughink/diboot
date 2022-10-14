import type { MockMethod } from 'vite-plugin-mock'
import crudTemplate from '../_util/crud-template'
import type { Message } from '@/views/system/message/type'
import { Random } from 'mockjs'
import { JsonResult } from '../_util'
import type { ApiRequest } from '../_util'

const dataList: Message[] = Array.from({ length: 100 }).map((_, index) => {
  const id = String(100 - index)
  const method = Random.pick(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
  return {
    id,
    requestUri: Random.url('http', 'localhost').split('localhost')[1],
    requestMethod: method,
    appModule: Random.pick(['SYS', 'CRM', 'OA']),
    templateId: Random.id(),
    businessType: Random.pick(['Customer', 'Contract', 'OrderForm']),
    businessId: Random.id(),
    sender: Random.pick(['张三', '李四', null]),
    receiver: Random.pick(['张三', '李四', null]),
    title: Random.pick(['这是一条系统发送的消息通知', null]),
    content: '发送内容测试',
    channel: Random.pick(['EMAIL', 'SMS', 'SYS']),
    channelLabel: Random.pick(['邮件', '短信', 'WebSocket', '系统消息']),
    status: Random.pick(['PENDING', 'FAILED', 'DELIVERY', 'READ']),
    statusLabel: Random.pick(['发送中', '发送异常', '已送达', '未读', '已读']),
    result: Random.pick(['待发送', '已发送']),
    scheduleTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
    updateTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
  } as Message
})

const crud = crudTemplate({
  baseApi: '/message',
  dataList
})

export default [
  crud.api.getList,
  crud.api.getById,
  {
    url: `${crud.baseUrl}/own`,
    timeout: Random.natural(50, 300),
    method: 'get',
    response: () => {
      return JsonResult.OK([])
    }
  },
  {
    url: `${crud.baseUrl}/read`,
    timeout: Random.natural(50, 300),
    method: 'patch',
    response: ({ body }: ApiRequest<string[]>) => {
      const ids = body
      return JsonResult.OK()
    }
  }
] as MockMethod[]
