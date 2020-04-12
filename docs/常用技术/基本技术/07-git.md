git安装
==



 - 使用的是linux系统，所以安装方法：终端中输入：sudo apt-get install git，老一点的版本则需要运行命令：sudo apt-get install git-core，也可以源码安装则需要进行make instal 。

 - 初始设置：刚安装完成则需要进行初始设置才能使用，终端输入：
	 - git config --global user.name ”YOU Nmae“
	 - git config --global user.email "email@example.com"

git的基本命令
==

 1. 创建版本库：
	 2. 先创建一个空目录：mkdir /git/learn_git
	 2. 进入该目录：cd /git/learn_git
	 2. 初始化该目录：git init
 2. 提交项目
	 3. 需要先把文件加入到git暂存区：git add 文件名
	 3. 查看git状态：git status
	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjEzODEzNTUw?x-oss-process=image/format,png)
	 3. 提交项目：git commit -m "提交要写的信息"
	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjEzOTQ4NzU0?x-oss-process=image/format,png)
	 3. 查看提交日志：git log
	 ![查看git日志](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjE0NzI0NjYx?x-oss-process=image/format,png)
 3. 版本回退：
	 4. 通过HEAD^ 一个^回退一个版本，命令：git reset --hard HEAD^
		 ![git版本回退图片](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjE1MTQwMTIz?x-oss-process=image/format,png)
	 4. 通过commit的id回退，命令：git reset --hard  ad509b2a（只需要头几位就行，越多越容易找到，可以回到你知道id的版本）
	![通过commit的id回退](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjIwOTAxNjQ3?x-oss-process=image/format,png)
	 4. 查询通过回退的版本号（commit id），命令：git reflog
	 ![查找回退的版本](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjIxMDE2MTE5?x-oss-process=image/format,png)

	 4. 查看工作区和版本库里面最新版本的区别：git diff  HEAD -- 文件名

	 4. 撤销修改，撤销用户刚刚的修改，并没有执行git add，命令:git checkout -- 文件名
	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjI1NDM1Njk5?x-oss-process=image/format,png)
	 4. 撤销假如暂存区，撤销刚刚执行过git add，命令：git  reset HEAD 文件名
	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzExMjI1ODQyMzQ0?x-oss-process=image/format,png)
	 4. 删除文件，先删除本地的 rm 文件名，然后如果从库中删除则需要执行 命令：git rm 文件名，如果删错了，则可以执行命令：git checkout -- 文件名

     远程仓库
     ==



     1. 创建连接：

     	 2. 创建SSH key。在用户目录下面查看.ssh目录，如果里面没有则需要创建SSH key，执行命令：ssh-keygen -t rsa -C "email@example.com"，生成两个文件id-rsa.pub和id_rsa，id_rsa是公钥，然后登录github输入公钥的内容进行连接。
     	 2. 添加仓库。
     	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDc0NTE2Mzg?x-oss-process=image/format,png)
     	 点击之后会出现下图所示。
     	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDc1MzAxMzkx?x-oss-process=image/format,png)
     	 点击创建。
     	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDg0MTIzNTAz?x-oss-process=image/format,png)
     		 加入密钥id_rsa.pub，key输入生成的id_rsa.pub中的内容。

     	 2. 连接远程仓库，输入命令：git remote add origin git@github.com:用户名/项目名.git
     	 2. 删除远程连接仓库，输入命令：git remote rm origin
     	 2. 第一次推送，输出命令：git remote -u origin master
     	 2. 克隆所需要git，执行命令：git clone git@github.com:用户名/项目名.git
     	 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDkwOTIxNTY4?x-oss-process=image/format,png)


     分支管理
     ==

      1. 创建分支执行命令：git branch dev
      2. 查看当前分支，*代表当前分支
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDkzMDAzOTM5?x-oss-process=image/format,png)
      3. 切换分支执行命令：git checkout  dev
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDkzMTUyMTQz?x-oss-process=image/format,png)
      4. 合并分支执行命令：git mege dev
     	![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDkzNjQ4NTI5?x-oss-process=image/format,png)
     	当切换到其他分支，在提交的时候master分支并没有发生变化，但是在合并之后就会发生变化。
      5. 删除分支，执行命令：git branch -d dev
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDkzOTUyMTE?x-oss-process=image/format,png)
      6. 添加冲突，先创建分支dev 在dev分支中修改readme.txt然后提交 再切会master 然后再修改readme.txt在提交，然后合并，就会遇到冲突，然后在单独修改冲突文件，重新再提交冲文件即可。
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDk1MjU2NjEx?x-oss-process=image/format,png)
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMDk1NDU3OTkw?x-oss-process=image/format,png)
      7. 保存dev分支的提交记录，执行命令：git  merge --no-ff -m '合并信息' dev
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTAxMDI3ODMz?x-oss-process=image/format,png)
      8. Bug分支，当在进行开发中遇到紧急修复Bug，可以先把当前分支储藏起来执行命令:git stash，然后创建其他分支修复，修复后进行合并，然后再转换到该分支上执行命令:git stash pop，来进行回复。
      9. 多人协作：
     	 10. 查看远程仓库的默认信息，执行的命令：git remote -v
     	 10. 推送分支执行的命令：git push origin 分支名称
     	 10. 抓取分支执行的命令：git clone git@github.com:用户名/项目名.git
     	 10. 当你的同事在dev分支中开发时，就需要建立远程origin的dev分支到本地，创建命令：git checkout -b dev origin/dev
      10. 当要提交时，如果遇到提交失败，则可以看看相关信息，然后pull下来，看是否需要创建远程origin的分支，进行pull下来会提示有冲突，当冲突修改之后在进行上传。

      标签管理
      ==

       1. 创建标签，先要切换到你要打标签的分支上，然后在输入打标签的命令：git tag 标签名
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTUzMTMyMzI0?x-oss-process=image/format,png)
       2. 在某次commit上打标签，则需要该commit的id，执行命令：git tag 标签名 commit_id
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTUzNTUyNDYx?x-oss-process=image/format,png)
       3. 可以查看某个标签上的信息，执行命令：git show  标签名
      ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTUzODE3NDY0?x-oss-process=image/format,png)
       4.  也可以添加标签的附带信息，执行命令：git tag -a 标签名 -m '附加信息'
      		 ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTU0NDQzOTEz?x-oss-process=image/format,png)
       5. 删除标签执行命令：git tag -d 标签名
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTU0OTAwNzU4?x-oss-process=image/format,png)
       6. 标签可以推到服务器，执行代码：git push origin 标签名
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTU1NTM2NDM0?x-oss-process=image/format,png)
       7. 删除远程的标签，需要先删除本地的标签，再删除远程标签，执行删除远程标签的命令：git push origin :refs/tags/标签名
       ![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMzEyMTYwMDE4ODIx?x-oss-process=image/format,png)
