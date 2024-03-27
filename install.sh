set -e

# 安装pnpm
echo "安装pnpm"
curl -fsSL https://get.pnpm.io/install.sh | sh -
echo "安装pnpm完成"

# 安装依赖
echo "下载依赖"
pnpm install
echo "下载依赖完成"

# 构建
echo "构建"
pnpm build
echo "构建完成"

# 读取前端dist安放目录
read -p "请输入前端dist安放目录: " distDir
mv dist $distDir
echo "前端dist安放完成"

# 如果没有安装nginx则安装nginx
echo "安装nginx"
apt install nginx
echo "安装nginx完成"

# 读入后端接口地址
read -p "请输入后端接口地址: " backendUrl
# 读入nginx监听端口
read -p "请输入nginx监听端口: " nginxPort

# 更改nginx配置文件
# 备份原有配置文件
mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
# 写入新的配置文件
echo "user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
}

http {

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
        access_log /var/log/nginx/access.log;
        gzip on;
        gzip_static on;
server {
        listen ${nginxPort} ssl default_server;
        listen [::]:${nginxPort} ssl default_server;
        keepalive_timeout 70;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  AES128-SHA:AES256-SHA:RC4-SHA:DES-CBC3-SHA:RC4-MD5;
        ssl_certificate  /etc/openssl/server.pem;
        ssl_certificate_key  /etc/openssl/server.key;
        ssl_session_cache  shared:SSL:10m;
        ssl_session_timeout  10m;
        server_name _;
        location / {
                root ${distDir};
                index index.html;
        }

        location ^~/api/ {
                proxy_pass ${backendUrl};
        }
}
}
" > /etc/nginx/nginx.conf

