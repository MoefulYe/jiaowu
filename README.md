# 安装手册

## 安装包管理器

详见<https://pnpm.io/installation>

## 下载依赖

```bash
pnpm install
```

## 构建

```bash
pnpm build
```

## 让nginx托管构建产物

### 下载nginx

```bash
apt install nginx
```

### 更改配置文件

```nginx_conf
# /etc/ngnix/nginx.conf
#...
server {
...
        location / {
                #前端产物目录
                root /path/to/your/front/end/dist;
                index index.html;
        }

        location ^~/api/ {
                #由于后端服务和前端服务分离部署所以需要反向代理后端服务
                proxy_pass https://ip-of-your-backend-service:port/path;
                proxy_set_header Host $host;
        }
}
#...
```

## 部署成功

本项目亦提供安装脚本进行快速安装
请在本项目的根目录下输入

```bash
bash ./install.sh
```
