# koishi-plugin-api-service

[![npm](https://img.shields.io/npm/v/koishi-plugin-api-service?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-api-service)

通过 HTTP 请求给 Bot 联系人发消息

- 支持 `GET` `POST` `PUT` `PATCH` 方法
- 支持手动关闭 API 而无需停用插件
- 支持设置接口 Token

## 安装

```shell
yarn add https://github.com/uyloal/koishi-plugin-api-service
```

## 配置项

| 字段    | 类型   | 是否必须 | 描述             |
| ------- | ------ | -------- | ---------------- |
| path    | string | 必须     | 请求路径         |
| enable  | string | 可选     | 是否开启 API     |
| secrets | string | 可选     | 用于接口权限验证 |

## 接口参数

| 字段    | 类型   | 是否必须 | 描述                                                               |
| ------- | ------ | -------- | ------------------------------------------------------------------ |
| sid     | string | 必须     | Bot 唯一标志符，格式为 \<platform>:\<selfId>, eg: onebot:123456789 |
| to      | string | 必须     | 接受消息的账号，eg: 123456789                                      |
| message | string | 可选     | 待发送的消息，eg: 测试文本\n 测试文本 2                            |

## 示例

以下示例除 `message` 字段外，都需要自行替换相关数据。

### 未设置 `secrets`

```bash

curl -X "POST" "http://127.0.0.1:5140/send" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "sid": "onebot:123456789",
  "to": "987654321",
  "message": "测试文本\\n测试文本 2 "
}'

```

### 已设置 `secrets`

```bash

curl -X "POST" "http://127.0.0.1:5140/send" \
     -H 'Authorization: uDfvZWYXdwg5gNfZ' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "sid": "onebot:123456789",
  "to": "987654321",
  "message": "测试文本\\n 测试文本 2 "
}'

```
