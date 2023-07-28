# 简介
- angle-react-app 致力于打造基于egg + react + typescript + webpack 的一键话工程体系，在这里，你可以直接基于该脚手架，愉快的写前端代码以及中间层代码，而不用关心繁琐的打包配置。
# 如何用
- 基于当前的版本，还没有做成npm包的形式，需要克隆仓库到本地使用。
# 如何开发
- 首先，需要修改package.json中的name和hostPrefix字段，修改为你项目的名字，请注意此处的hostPrefix字段，如果没有设置，则默认使用angle，后续在浏览器进行请求的时候，需要带上该前缀，如:www.angle.com/angle/xxx
- 开发过程中，需要用到nginx和switch-host，请提前下载安装，具体配置如下：
  - nginx:
  ```
    location /angle/ {
			proxy_pass http://127.0.0.1:13810/;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
  ```
  - switch-host:
  ```
  127.0.0.1 www.angle.com
  ```
- 增加前端模块，需要放置在client/modules路径下，并且必须以index.tsx文件作为模块的起始文件
# 运行
- npm i / npm install / yarn
- 开发模式
  - npm run start
- 生产模式
  - npm run build
# 请我喝杯奶茶
-  <img src="https://images.gitee.com/uploads/images/2020/0523/002043_e0b03bdb_1537777.png" width="300" alt="扫码打赏">