# 部署和运维日志

## 测试服务器

2019.05.06（一）

服务器：sh001
登录：ssh sh001

安装：nodejs 8.x
安装 node 版本管理器 nvm
切换版本到 8.9.4：nvm install v8.9.4

nginx 启动需要 sudo 权限
测试：sudo nginx -t
更新：sudo nginx -s reload

切换 npm 淘宝源
切换：npm config set registry https://registry.npm.taobao.org
检查：npm config get registry

## 测试部署

建立 test 分支即可

测试域名：https://test.xxx.cn

## 线上部署

打 tag

例子：`v0.1.0`（注意：前缀需要有 `v`）

线上域名：https://m.xxx.cn

## 线上回滚

建新分支：roll/${需要回滚的版本名}

例子：`roll/v0.2.0`（注意：前缀是 `v`）

## 线上运维

node001_vpc、node002_vpc

用户：gitlab-runner

代码目录：/data/code/fe

日志目录：/data/logs/fe

```bash
ssh $堡垒机 # 登录堡垒机
su gitlab-runner # 切换 runner 用户
pm2 ls # 列出当前的 pm2 实例
pm2 logs # 输出实时 log
```
