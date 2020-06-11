### 项目说明
+ 创建gruntfile.js文件 安装开发中使用的插件sass，babel等
+ 配置grunt.initConfig中选项，并且使用loadGruntTasks加载所有插件，创建任务
+ 利用browserSync搭建开发服务器，并且使用 watch插件检测文件变化执行相应的任务，结合browserSync做到实时更新
+ 创建开发任务与上线打包任务，分别再不同时期使用（打包任务由于插件原因没有完成）
+ 把指令放到package.json scripts任务，方便团队协同开发