### git删除远程分支
> git push origin --delete `branch-name`
### 删除本地分支
> git branch -d <branch_name> `-D 删除当前正在使用的分支  -d 删除除当前分支以外的分支`
### 恢复已删除的分支
> git branch <branch_name> <hash_val>
### 查看日志
> git reflog
### 查看分支
> git branch -a  `-a代表查看远程分支`