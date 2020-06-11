### 项目说明
+ 创建gulpfile.js文件 安装自动化构建所需要的gulp插件如sass、babel等
+ 创建任务，如编译es6和sass等
+ 利用browserSync搭建开发服务器，并且使用gulp watch检测文件变化实时执行相关任务并且更新浏览器
+ 由于上线前需要打包压缩项目代码需要根据不同需求打包到不同文件夹
+ 通过gulp-useref 和gulp-if插件判断文件类型根据相关压缩插件压缩文件并且合并起来
+ 根据gulp parallel 与series 先执行转译任务，再执行压缩任务
+ 创建开发任务与上线打包任务，分别再不同时期使用
+ 把指令放到package.json scripts任务，方便团队协同开发
