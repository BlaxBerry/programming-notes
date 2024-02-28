---
prev: false
next: false
---

# Git 基础

![](/static/skill-images/git.webp)

## 下载安装

```shell
# 通过 Homebrew 下载
brew install git
```

## 设置

```shell
git config --list
```

全局配置

```shell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

配置一个本地 Git 仓库

```shell
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 分支管理

| 主要分支 | 说明                                                                                           |
| :------: | ---------------------------------------------------------------------------------------------- |
|  master  | 主分支，用于存储稳定版本的代码                                                                 |
| develop  | 用于整合各个功能分支                                                                           |
| feature  | 用于开发一个单独的新功能，开发完成后需要合并回 develop 分支                                    |
| release  | 用于进行如版本号调整、文档更新等发布前的准备工<br/>开发完成后需要合并回 master 与 develop 分支 |
|  hotfix  | 用于紧急修复在生产环境中发现的问题<br/>开发完成后需要合并回 master 与 develop 分支             |

---

### Git Flow

![](https://miro.medium.com/v2/resize:fit:1400/1*Ojyj0zyXm3OY3fjoxWvjGA.png)

1. 从 master 主分支拉取到 develop 分支
2. 从 develop 分支拉取到 feature 分支进行具体功能开发
3. 开发完成后创建 Pull Request，审核通过后将该 feature 分支合并到 develop 分支
4. 将集成了多个开发内容的 develop 开发分支合并到 release 分支进行发布前的微调整
5. 将准备工作完成后的 release 分支后合并到 master 主分支与 develop 分支
6. 基于 master 主分支进行发布

::: tip 线上发生 Bug 时：

1. 从 master 主分支拉取到 hotfix 分支进行紧急修改
2. 修改完成后创建 Pull Request 供其他人审核
3. 审核通过后将 hotfix 分支合并到 master 主分支与 develop 分支
4. 重新基于 master 主分支进行发布

:::

---

### GitHub Flow

GitHub Flow 是 Git Flow 的简化版本，适合用于开发快速、多次部署的 Web 应用程序

![](https://habrastorage.org/getpro/habr/upload_files/8aa/ef5/e12/8aaef5e1215f13b6799feea012e10702.png)

1. 从 master 主分支拉取到 feature 分支进行具体功能开发
2. 开发完成后创建 Pull Request，审核通过后将该 feature 分支合并到 master 分支
3. 基于 master 主分支进行发布

::: tip 线上发生 Bug 时：

1. 从 master 主分支拉取到 hotfix 分支进行紧急修改
2. 修改完成后创建 Pull Request 供其他人审核
3. 审核通过后将 hotfix 分支合并到 master 主分支
4. 重新基于 master 主分支进行发布

:::
