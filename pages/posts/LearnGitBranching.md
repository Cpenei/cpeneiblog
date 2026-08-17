---
title: "关于LearnGitBranching网站学习的个人题解"
date: 2025-02-02T14:08:54+08:00
draft: false
description: ""
---

### 直接复制粘贴的，markdown格式没改完，,

关于LearnGitBranching网站的一些个人解法文章列表

2023-07-01 16:05:04   
网址： https://learngitbranching.js.org/?locale=zh_CN

tips：  
解释一些快捷调试本网站的语句：  
reset //重置所有已执行命令（被重置后所有命令数会重新开始计数）  
hide goal //隐藏右边图标栏  
goal //打开右边图标栏  
levels //打开选关界面  
objective //打开提示对话框

## 主要

### STAGE 1 基础篇
######  --循序渐进地介绍Git主要命令
#### 1.1 Git Commit
提示和图标很明显，所以直接提交两遍就好

    git commit
    git commit
   

#### 1.2 Git Branch
学习了 创建分支 git branch 分支名   
和切换分支 git checkout 分支名  
所以审题后，第一想法是创建后切换到bugFix完成要求  
第一解：

```
git branch bugFix  
git checkout bugFix
```
      
      

根据提示后优化的第二解（一行）：
```
git checkout -b bugFix
//这是新建并同时切换到该分支的意思
```
#### 1.3 Git Merge 分支与合并
在 Git 中合并两个分支时会产生一个特殊的提交记录，它有两个 parent 节点。翻译成自然语言相当于：“我要把这两个 parent 节点本身及它们所有的祖先都包含进来。”  
解法按照题干要求一步一步来就好(第一解）：

解释
```
git branch bugFix
git checkout bugFix
git commit 
git checkout mian
git commit
git merge bugFix
```
压缩一下就是优化第二解（5条/5条）：

解释
```
git checkout -b bugFix
gi commit
git checkout main
git commit 
git merge bugFix
```
#### 1.4 Git Rebase
进入一面关底！有没有点兴奋呢（   
第二种合并分支的方法是 git rebase。Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。 Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。  
审题，按步骤来得解：

解释
```
git checkout -b bugfix 
/*后文将均使用git checkout -b A的形式来取代git branch A 和 git checkout A两条语句*/
git commit
git checkout main
git commit
git checkout bugFix
git rebase main
```
### STAGE 1 ALL CLEAR!!!
休息一下，坐和放宽，让我们进入二面。

### STAGE 2 高级篇
介绍Git的120%酷炫的特性并在提交树上使用和白井黑子相同的能力吧！（迫真）  
#### 2.1分离HEAD  
HEAD 是一个对当前所在分支的符号引用 —— 也就是指向你正在其基础上进行工作的提交记录。  
HEAD 总是指向当前分支上最近一次提交记录。大多数修改提交树的 Git 命令都是从改变 HEAD 的指向开始的。  
HEAD 通常情况下是指向分支名的（如 bugFix）。  
如果想看 HEAD 指向，可以通过 cat .git/HEAD 查看， 如果 HEAD 指向的是一个引用，还可以用 git symbolic-ref HEAD 查看它的指向。但是该程序不支持这两个命令）  
言归正传，以下是解法：
```
 git checkout C4
 ```
是不是很简单？接下来要加大难度了，跟上！  
#### 2.2相对引用1（^)
相对引用非常给力，这里我介绍两个简单的用法：  
使用 ^ 向上移动 1 个提交记录 使用 ~&lt;num&gt; 向上移动多个提交记录，如 ~3  

解释  

解1：  
```git checkout bugFix^ ```  
解2：  
```git checkout C4^  //前两个是移动到上个父级节点```  
解3：  
```git checkout bugFix~1```  
解4：  
```git checkout C4~1 ```  
解5：  
```git checkout bugFix~```  
解6：  
```git checkout C4~
//后四个是移动到前n(n=1)个父级节点
```
#### 2.3相对引用2（~）
“如果你想在提交树中向上移动很多步的话，敲那么多 ^ 貌似也挺烦人的，Git 当然也考虑到了这一点，于是又引入了操作符 ~ 。    
该操作符后面可以跟一个数字（可选，不跟数字时与 ^ 相同，向上移动一次），指定向上移动多少次.  
你现在是相对引用的专家了，现在用它来做点实际事情。  
我(指网站作者）使用相对引用最多的就是移动分支。可以直接使用 -f 选项让分支指向另一个提交。例如:  
git branch -f main HEAD~3  
上面的命令会将 main 分支强制指向 HEAD 的第 3 级 parent 提交。”  

接下来是题目分析: 可以观察到，题目要求： 将当前分支（HEAD)判定在C1点上 main从C4移动到C6 bugFix从C5到C0  
还记得前文作者在引入时提到的“git branch -f A B"可以将A分支强行指向B吗？ 逃课小寄巧+1 da⭐ze 

所以直接将它们移过去就好了，以下是解：
```
git branch -f main C6 //将main移动到C6
git branch -f bugFix C0//将bugFix移动到C0
git checkout C1 //使当前分支位于C1
```
顺带一提，好像这里语序先后可以不用在意？ 对于以上的C0,C1点你可以使用相对引用来表示他们；但是C6不能直接用已有可用分支来表示他们，即不能用已知可用节点运用相对引用来表示他们的子节点  
#### 2.4撤销变更
git reset A~n 撤销A节点的更改并回退到A的第n个父节点（用于本地） git revert 本质上在要撤销的节点后面增添了与要撤销的节点性质相反的子节点，达到撤销该节点的目的（用于远程）  
题目分析： 题干提醒得很明显了，local节点顾名思义是本地节点，所以对应用reset指令撤销更改；pushed就是推送节点即远程节点，对应用revert指令撤销更改   
解：
```
git reset local~1 
//撤销local节点的更改并回退到上一个父节点（本地）
git checkout pushed //切换当前节点对象为pushed节点
git revert pushed//撤销pushed节点（远程）
```
以上，全解。  
### STAGE 2 ALL CLEAR!!!  
别着急去打则，再接再厉！

### STAGE 3 移动提交记录
进入三面，播放BGM:幽雅に咲かせ、墨染の桜　～ Border of Life(手动滑稽)  
你可能会说：你说得对，但是这是我们东方妖妖梦六面西行寺幽幽子的关底曲啊？  
你先别急，但是我们接下来会学一些和cherry相关的符（命）卡（令）来
和uuz大人一起成为幻想乡偶像吧（  
##### 3.1 Git Cherry-pick 樱符「完全墨染的樱花 -开花-」
我承认以上都是我看见cherry后无端联想瞎扯来引起你们阅读兴趣的，我自裁先（  
git cherry-pick &lt;提交号&gt;...  
如果你想将一些提交复制到当前所在的位置（HEAD）下面的话， Cherry-pick 是最直接的方式了。  
例子的话，参考网站演示，比博客的效果会好上一点  
值得一提的是，git cherry-pick 后面可以接很多节点 将你想要移动的节点按顺序输在后面，他们也会按顺序建立新的附节点（即git cherry-pick A B C后就会在ABC的父节点下按顺序接一排A',B',C'节点）  
因此这张符卡也很好解：  
```
git cherry-pick C3 side^ C7 
//目标图要哪个节点要什么顺序，后面跟着输就好
```
#### 3.2交互式 rebase --真的很方便！！！
当你知道你所需要的提交记录（并且还知道这些提交记录的哈希值）时, 用 cherry-pick 再好不过了 —— 没有比这更简单的方式了。 但是如果你不清楚你想要的提交记录的哈希值呢? 幸好 Git 帮你想到了这一点, 我们可以利用交互式的 rebase —— 如果你想从一系列的提交记录中找到想要的记录, 这就是最好的方法了。  
交互式 rebase 指的是使用带参数 --interactive 的 rebase 命令, 简写为 -i  
如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。  
当 rebase UI界面打开时, 你能做3件事:  
调整提交记录的顺序（通过鼠标拖放来完成） 删除你不想要的提交（网站通过切换 pick 的状态来完成，关闭就意味着你不想要这个提交记录） 合并提交。 遗憾的是由于某种逻辑的原因，网站课程不支持此功能，因此网站不会详细介绍这个操作。简而言之，它允许你把多个提交记录合并成一个。  
想必打交（指使用交互功能）大家都会吧（确信） 网站给到的教程也很方便 以下是3.2的解，观察目标图，发现在原节点链上的变化是去掉了C2，C4和C5交换了位置 因此我们这样解决它：  
```
git rebase -i main~4
//打开对于C5~C2的交互窗口
然后手动C4和C5换位置，C2删掉（即网站给的切换状态键Omit点一下变灰掉） 
```
综上
### STAGE 3 ALL CLEAR!!!
### STAGE4 杂项
##### --Git 技术、技巧与贴士大集合
#### 4.1本地栈式提交：只取一个提交记录  
没有看懂题目的要求（   
自己试试然后就过了，采用了rebase -i和branch -f
```
git rebase -i C4~3
//选取包含C4的三个节点进行rebase可视化操作
然后取消掉C2,C3,仅保留C4在队首
git branch -f main C4’ 强制把main移动到C4'上
```
解决。 等会试试cherry-pick的解法  

4.2提交的技巧1：反复利用rebase -i  
技巧精髓如上。  
审题，“先用 git rebase -i 将提交重新排序，然后把我们想要修改的提交记录挪到最前；然后用 git commit --amend 来进行一些小修改；接着再用 git rebase -i 来将他们调回原来的顺序；最后我们把 main 移到修改的最前端（用你自己喜欢的方法），就大功告成啦！”思路基本上都给了。  
但是git commit --amend题目没给解释，以下是chatGPT3.5给出解释：git commit --amend是一个用于修改最新一次提交的命令，执行后打开一个文本编辑器提供对当前节点的修改。大抵懂了就着手解题。
解：

```
git rebase -i HEAD~2 //提示写了就直接照做
手动交换C2和C3节点顺序
git commit --amend //模拟修改过程，得到C2''
git rebase caption~2 //再次交换顺序排回去
手动交换C2''和C3'的顺序
git branch -f main caption//把main移动到caption
```
#### 4.3 提交的技巧2：  
rebase的冲突，看uuz的樱符如何解决
审题后，写出了两行代码后不知所措（  
```
git checkout newImage
git commit --amend
```
跑去回顾了cherry-pick的用法（uuz大人对不起QAQ  
摸鱼了大概二三十分钟后回来突发奇想：  
```
git checkout main
/*绕过了C2' 提交已经存在于你的改动集里，已忽略！ 的问题*/
git cherry-pick C2' C3
```
然后过了 适当摸鱼有助激发灵感？（什，这就是摸鱼的借口吗（  
#### 4.4Git Tags 操纵永远程度的能力（不是
相信通过前面课程的学习你已经发现了：分支很容易被人为移动，并且当有新的提交时，它也会移动。分支很容易被改变，大部分分支还只是临时的，并且还一直在变。  
你可能会问了：有没有什么可以永远指向某个提交记录的标识呢，比如软件发布新的大版本，或者是修正一些重要的 Bug 或是增加了某些新特性，有没有比分支更好的可以永远指向这些提交的方法呢？  
当然有了！Git 的 tag 就是干这个用的啊，它们可以（在某种程度上 —— 因为标签可以被删除后重新在另外一个位置创建同名的标签）永久地将某个特定的提交命名为里程碑，然后就可以像分支一样引用了。  
更难得的是，它们并不会随着新的提交而移动。你也不能切换到某个标签上面进行修改提交，它就像是提交树上的一个锚点，标识了某个特定的位置。  
经过初步学习，我们知道它的用法是:git tag &lt;tag名称&gt; &lt;对象分支&gt; 题干很简单，告诉你对XX标记XX就行：  
```
git tag v0 C1
git tag v1 C2
git checkout C2
```
#### 4.5Git Describe    锚点?传送锚点？wc,op(我是梗小鬼
git describe 的语法是：
`git describe &lt;ref&gt;`

&lt;ref&gt; 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会使用你目前所在的位置（HEAD）。  
它输出的结果是这样的：
`&lt;tag&gt;_&lt;numCommits&gt;_g&lt;hash&gt;`  
tag 表示的是离 ref 最近的标签， numCommits 是表示这个 ref 与 tag 相差有多少个提交记录， hash 表示的是你所给定的 ref 所表示的提交记录哈希值的前几位。  
当 ref 提交记录上有某个标签时，则只输出标签名称  
这个关卡为体会为主，体验够了输入git commit结束关卡就好，不需要过多解2333  

### STAGE 4 ALL CLEAR!!!

### STAGE 5 高级话题
--只为成为真正的勇士！
#### 5.1多次rebase
题目没有给过多有用信息，但是你可能猜到这次与情景中的有序提交有关。  
初见审题，先把分支整理一下，合并到只剩下两条：  

```
git rebase C2 C3
git branch -f bugFix C3'
git rebase C6 C7
git branch -f another C7'
然后把右边分支接到C3'的下面，再移动对应分支到指示点：
git rebase C3' another 
git branch -f side C6'
git branch -f main another
```
当然，这还不是最优解，毕竟（7/4）
先过了再说，回头研究优化解（
标准答案解参考如下（
```

git rebase main bugFix
git rebase bugFix side
git rebase side another
git rebase another main
```
####5.2 两个parent节点  
操作符 ^ 与 ~ 符一样，后面也可以跟一个数字。  
但是该操作符后面的数字与 ~ 后面的不同，并不是用来指定向上返回几代，而是指定合并提交记录的某个 parent 提交。还记得前面提到过的一个合并提交有两个 parent 提交吧，所以遇到这样的节点时该选择哪条路径就不是很清晰了。  
Git 默认选择合并提交的“第一个” parent 提交，在操作符 ^ 后跟一个数字可以改变这一默认行为。  
链式操作：e.g.:  
`git checkout HEAD~;git checkout HEAD^2;git checkout HEAD~2`  
以上等效于  
`git checkout HEAD~^2~2`  
题干同样明了，让我们用相对引用的方式在C2上得到bugWork节点   
解1：

```
git branch bugWork //创建bugWork节点
git branch -f bugWork main~^2~1
/*将bugWork移动到main的上一级的第二个父节点的上一个节点（即C2)*/
```

解2： 那么，为什么不直接在C2上创建bugWork节点呢？
```
git branch bugWork main~^2~1
```
这就是最优解了。  
#### 5.3纠缠不清的分支
来到五面关底,但是它的终符很水。 没给过多描述？没关系。 掏出你的『樱符』-cherry-pick吧！见招拆招！  
 解1：

```
git checkout one  
git cherry-pick C4 C3 C2
git checkout two
git cherry-pick C5 C4' C3' C2'
git branch -f three C2
```
终符击破！  
顺带一提，这次的提示里面给出了一条新的控制台命令show solution来查阅标准答案 让我们和标准答案比较一下

```
git checkout one
git cherry-pick C4 C3 C2
git checkout two
git cherry-pick C5 C4 C3 C2
git branch -f three C2
```
我的答案的哈希值比它更精准！赢！（x  
### STAGE 5 ALL CLEAR!!!

### 远程-EXTRA
BGM:秘匿されたフォーシーズンズ~The Concealed Four Seasons  
### EX1 Push & Pull —— Git 远程仓库！  
是时候分享你的代码了，让编码变得社交化吧  
#### EX1.1 Git Clone  
从技术上来讲，git clone 命令在真实的环境下的作用是在本地创建一个远程仓库的拷贝（比如从 github.com）。 但在教程中使用这个命令会有一些不同 —— 它会在远程创建一个你本地仓库的副本。显然这和真实命令的意思刚好相反，但是它帮咱们把本地仓库和远程仓库关联到了一起，在教程中就凑合着用吧。  
本关同样以体验为主，可以自己尝试  
解如下！  
只要 `git clone `就可以了!  
#### EX2.1 远程分支
这下真有o了，但是它是origin即对远程仓库的默认名称的缩写。  
仍然体验为主。
```
git commit 
git checkout o/main
git commit
```
#### EX1.3 Git Fetch
git fetch 完成了仅有的但是很重要的两步:  
从远程仓库下载本地仓库中缺失的提交记录 更新远程分支指针(如 o/main) git fetch 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态。  
如果你还记得上一节课程中我们说过的，远程分支反映了远程仓库在你最后一次与它通信时的状态，git fetch 就是你与远程仓库通信的方式了！希望我说的够明白了，你已经了解 git fetch 与远程分支之间的关系了吧。  
git fetch 通常通过互联网（使用 http:// 或 git:// 协议) 与远程仓库通信。  
还是体验 所以 `git fetch`就好  
#### EX1.4 Git Pull
实际上，由于先抓取更新再合并到本地分支这个流程很常用，因此 Git 提供了一个专门的命令来完成这两个操作。它就是我们要讲的 git pull。  
也就是说，git pull是git fetch和git merge的缩写。  
本关运行 ``git pull `命令就可以了！  
#### EX1.5 模拟团队合作
按照题意一步一步来

```
git clone //先在本地克隆远程仓库
git fakeTeamwork main 2//按照图表在远程模拟2次更改
git commit//按照图标在本地进行一次提交
git pull//在本地拉取远程更改 
``` 
#### EX1.6 Git Push
git push 负责将你的变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录。一旦 git push 完成, 你的朋友们就可以从这个远程仓库下载你分享的成果了！  
你可以将 git push 想象成发布你成果的命令。它有许多应用技巧，稍后我们会了解到，但是咱们还是先从基础的开始吧……  
解： 非常简单，看图写写就好
```
git commit
git commit
git push
```
#### EX1.7 偏离的提交历史
情景非常真实，泪目了（  
git pull 就是 fetch 和 merge 的简写  
git pull --rebase 就是 fetch 和 rebase 的简写！  
按照明确的工作流，解如下：  

```
git clone
git fakeTeamwork
git commit
git pull --rebase
git push
```
#### EX1.8 锁定的main
由已知得：  

```
git branch feature 
//本地创建feature分支  
git reset o/main //重置main
git push //推送新的
```
### EXTRA 1 ALL CLEAR!!!
### EXTRA 2 关于 origin 和它的周边—Git远程仓库高级操作
做一名仁慈的独裁者一定会很有趣……  
#### EX2.1推送主分支
关卡描述看似很难？照样击破它！  
首先我们注意到，远程有C8，但本地没C8  
所以先想办法把C8拉过来,顺带一提，这里不能直接pull --rebase,可以用fetch  
拉过本地后把其他的C拉到C8下按顺序排好  
最后推送到远端  
解一：
```
git fetch
git checkout o/main
git cherry-pick side1 C3 side2 C5 C6 side3
git branch -f main C7'
git branch -f side1 C2'
git branch -f side2 C4'
git branch -f side3 C7'
git checkout main
git push
```
初见过于依赖cherry-pick的后果是(9/6)比较繁琐  
让我们show sloution一下  

```
git fetch
git rebase o/main side1
git rebase side1 side2
git rebase side2 side3
git rebase side3 main
git push
```
标准答案用的是rebase解(6/6)  
#### EX2.2合并远程仓库
在开发社区里，有许多关于 merge 与 rebase 的讨论。以下是关于 rebase 的优缺点：  
优点:  
Rebase 使你的提交树变得很干净, 所有的提交都在一条线上  
缺点:  
Rebase 修改了提交树的历史  
解：用merge替换上题的rebase 初见解（10/6）：

```
git fetch
git checkout side1
git merge C8
git merge C4
git merge C7
git branch -f side1 C2
git branch -f main C11
git push
git checkout main
git push
```
优化一下(8/6):

```
git checkout C2 
git merge C8
git merge C4 
git merge C7
git branch -f main C11
git checkout main
git push
```
剩下的优化下次一定，能跑就行.jpg
### EX2.3 远程跟踪分支
你可以让任意分支跟踪 o/main, 然后该分支会像 main 分支一样得到隐含的 push 目的地以及 merge 的目标。 这意味着你可以在分支 totallyNotMain 上执行 git push，将工作推送到远程仓库的 main 分支上。  
有两种方法设置这个属性，第一种就是通过远程分支切换到一个新的分支，执行:  
`git checkout -b totallyNotMain o/main  `
就可以创建一个名为 totallyNotMain 的分支，它跟踪远程分支 o/main。  

另一种设置远程追踪分支的方法就是使用：git branch -u 命令，执行：  
`git branch -u o/main foo`
这样 foo 就会跟踪 o/main 了。如果当前就在 foo 分支上, 还可以省略 foo：
`git branch -u o/main  `

我们要做到不切换到main的前提完成本关，因此得采取一些特殊技巧
  
```
git checkout -b side
git branch -u o/main side
git pull
git checkout C1
git commit
git checkout side
git cherry-pick C3
git push
//（8/4）压代码？下次一定，没checkout main就是胜利
```
#### EX2.4Git push 的参数
很好! 既然你知道了远程跟踪分支，我们可以开始揭开 git push、fetch 和 pull 的神秘面纱了。我们会逐个介绍这几个命令，它们在理念上是非常相似的。  
首先来看 git push。在远程跟踪课程中，你已经学到了 Git 是通过当前所在分支的属性来确定远程仓库以及要 push 的目的地的。这是未指定参数时的行为，我们可以为 push 指定参数，语法是：  
`git push &lt;remote&gt; &lt;place&gt;`
&lt;place&gt; 参数是什么意思呢？我们稍后会深入其中的细节, 先看看例子, 这个命令是:  
`git push origin main  `
把这个命令翻译过来就是：  
切到本地仓库中的“main”分支，获取所有的提交，再到远程仓库“origin”中找到“main”分支，将远程仓库中没有的提交记录都添加上去，搞定之后告诉我。  
我们通过“place”参数来告诉 Git 提交记录来自于 main, 要推送到远程仓库中的 main。它实际就是要同步的两个仓库的位置。  
需要注意的是，因为我们通过指定参数告诉了 Git 所有它需要的信息, 所以它就忽略了我们所切换分支的属性！  

以上为网站作者废话 以下两行解决：
```
git push origin main
git push origin foo
```
#### EX2.5Git push 参数 2
来看看git的离谱操作：如果来源和去向分支的名称不同,同样可以做到  
要同时为源和目的地指定 &lt;place&gt; 的话，只需要用冒号 : 将二者连起来就可以了：  
`git push origin &lt;source&gt;:&lt;destination&gt;`
这个参数实际的值是个 refspec，“refspec” 是一个自造的词，意思是 Git 能识别的位置（比如分支 foo 或者 HEAD~1）  

以上还是废话 非常简单！  
```
git push origin C6^:foo
git push origin foo:main
```

### EX2.6Git fetch 的参数
git fetch 的参数和 git push 极其相似。他们的概念是相同的，只是方向相反罢了（因为现在你是下载，而非上传）  
 解：
```
git fetch origin foo:main
git fetch origin main^:foo
git checkout foo
git merge main
```
#### EX2.7没有 source 的 source
古怪的 &lt;source&gt;   
Git 有两种关于 &lt;source&gt; 的用法是比较诡异的，即你可以在 git push 或 git fetch 时不指定任何 source，方法就是仅保留冒号和 destination 部分，source 部分留空。  
`git push origin :side git fetch origin :bugFix`  
如果 push 空 到远程仓库会如何呢？它会删除远程仓库中的分支！  
 如果 fetch 空 到本地，会在本地创建一个新分支。  
这个关卡很容易 —— 只要删除一个远程的分支, 再用 git fetch 在本地创建一个新分支就可以了！   
解如下：
```
git push origin :foo
git fetch origin :bar
```
#### EX2.8Git pull 的参数
终于来到最后一关辣！  
既然你已经掌握关于 git fetch 和 git push 参数的方方面面了，关于 git pull 几乎没有什么可以讲的了 :)  
因为 git pull 到头来就是 fetch 后跟 merge 的缩写。你可以理解为用同样的参数执行 git fetch，然后再 merge 你所抓取到的提交记录。  
以下命令在 Git 中是等效的:  
`git pull origin foo `相当于：  
`git fetch origin foo; git merge o/foo`
还有...  
`git pull origin bar~1:bugFix `相当于：  
`git fetch origin bar~1:bugFix; git merge bugFix`
看到了? git pull 实际上就是 fetch + merge 的缩写, git pull 唯一关注的是提交最终合并到哪里（也就是为 git fetch 所提供的 destination 参数）  

好啦, 该结束了！请按照目标窗口中的状态进行操作。你需要下载一些提交，然后创建一些新分支，再合并这些分支到其它分支, 但这用不了几个命令 :P  
```
//以下是初见笨方法(10/2)
git fetch origin main:C2
git fetch origin main:side
git checkout foo
git merge main
git checkout side
git merge C5
git branch -f main C6
git branch -f side C2
git branch -f foo C3
git checkout main
```
2333

//优化解：
```
git pull origin bar:foo
git pull origin main:side
```
至此，终符击破！！！！！！！！！！！！  

### STAGE EX2 ALL CLEAR!!!!!!!!!!!!  

Congratulations！ 感谢你看到这里（虽然说可能这里没几个人会看） 谢谢苗爷指导，各位的陪伴和自己没有中途而废

