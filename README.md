# NEEDLE

## 每次添加新职业需要？

- 修改所有`UPDATE HERE`的代码
- 添加一个新文件夹，文件夹名为新职业。其中包含
    - css文件。其中至少包含同名class的样式，颜色要注意同步
    - js文件。其中至少包含onclick方法

## 想到的新职业

- 侦探：**线索** + 2
- 干扰者：**现身前**，相邻的格子需要调查两次。
    - 如果多个干扰者同时干扰了同一格，效果并不会叠加
- 疯子：如果你上一次调查使得一名邪恶势力现身，你失去所有**线索**
- 警长：周围的格子都现身后，将你现在的**线索**翻倍

## box的children

在box生成时就隐形存在。

- 0：提示框。仅当box的`class.length>1`时悬停展示
- 1：干扰标记说明。仅当受到**干扰者**效果影响时悬停展示。
- 2：干扰标记❓。当受到**干扰者**效果影响后展示。在排除干扰后恢复隐形。

## boxArray中对象的额外字段

- `jammed`：是否处于干扰状态。true: 表现为出现一个❓
- `jamUnshow`：当对象为干扰者才会持有。true: 该干扰者还没现身