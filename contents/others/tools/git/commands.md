# Git 常用命令

## 从远程仓库拉取

### git fetch

仅从远程仓库拉取最新的更改，但不会自动合并到本地的工作目录或当前分支

后续需使用`git merge`、`git rebase`

---

### git pull

从远程仓库拉取最新的更改，并将这些更改自动合并到本地的当前的分支

实际上是`git fetch`和`git merge`的组合
