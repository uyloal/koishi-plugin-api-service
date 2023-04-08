"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = 'api-service';
const descriptions = {
    path: 'API 路径',
    enable: '是否开启 API ',
    secrets: '用于 API 权限验证',
};
exports.Config = koishi_1.Schema.object({
    path: koishi_1.Schema.string().required().description(descriptions.path),
    enable: koishi_1.Schema.boolean().default(false).description(descriptions.enable),
    secrets: koishi_1.Schema.string().description(descriptions.secrets),
});
function apply(ctx, config) {
    ctx.router.all(config.path, async (koa, next) => {
        if (!config.enable) {
            koa.status = 400;
            koa.body = {
                success: false,
                message: 'API 未启用',
            };
        }
        else {
            let authorization = koa.request.headers.authorization;
            if (config.secrets && authorization !== config.secrets) {
                koa.status = 403;
                koa.body = {
                    success: false,
                    message: '无权限',
                };
            }
            else {
                let data;
                switch (koa.method.toUpperCase()) {
                    case 'GET':
                        data = koa.request.query;
                        break;
                    case 'POST':
                    case 'PUT':
                    case 'PATCH':
                        data = koa.request.body;
                        break;
                    default:
                        koa.status = 405;
                        koa.body = {
                            success: false,
                            message: `不允许的请求方法：${koa.method}`,
                        };
                        return;
                }
                if (data?.sid && data?.to) {
                    const bot = ctx.bots.find((bot) => bot.sid == data?.sid);
                    if (bot) {
                        try {
                            const user = await (await bot.getFriendList()).find((f) => f.userId === data?.to);
                            if (!user)
                                throw new Error(`@${data.to} 不是 <${data.sid}> 的好友`);
                            const result = await bot.sendPrivateMessage(data.to, data.message ?? '空的消息');
                            koa.body = {
                                success: true,
                                message: '发送成功',
                                result,
                            };
                        }
                        catch (e) {
                            koa.status = 400;
                            koa.body = {
                                success: false,
                                message: e?.message ?? '发送失败',
                            };
                        }
                    }
                    else {
                        koa.status = 400;
                        koa.body = {
                            success: false,
                            message: `Bot\<${data.sid}\> 不存在`,
                        };
                    }
                }
                else {
                    koa.status = 400;
                    koa.body = {
                        success: false,
                        message: `缺少必要参数`,
                    };
                }
            }
        }
    });
}
exports.apply = apply;
