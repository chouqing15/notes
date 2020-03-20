# 存在create-react-app 却在npm中找不到
使用 `npm uninstall -g create-react-app` 时找不到 `create-react-app` ，使用 `npm list -g --depth 0` 查找全局模块也没有
解决办法如下：
- 使用 `sudo find / -type d -name <文件名>` 我这里是create-react-app
！[image text](../static/find_file.png)
- 找到了文件的位置`open <路径>`, 发现在nvm管理中的另一个node版本里面。
- `nvm use <版本号>`, 进入指定node版本在执行npm uninstall -g create-react-app 即可