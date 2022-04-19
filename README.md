# NEEDLE

## 每次添加新职业时

- 修改所有`UPDATE HERE`的信息
- 添加一个新文件夹，文件夹名为新职业。其中包含
    - css文件。其中至少包含同名class的样式，颜色要注意同步
    - js文件。其中至少包含onclick方法

## box元素

整个游戏的逻辑基本上靠boxArray中的每个元素属性来支撑，所以有必要逐一记录和说明

- `i`，`j`：坐标
- `shown`：角色是否现身
- `roleid`：角色的身份下标
- `signs`：存储所有标志
- `infos`：存储所有说明
- `killerTimer`：【杀手】的倒计时
- `sheriffRemain`：【警长】效果触发的剩余格子数
- `copiesDir`：【替身】所指示的方位下标

## 职业

### 光明势力 ☀️

- <font color="#898989">市民</font>：没有任何效果
- <font color="#66bb6a">目标</font>：这就是你要找的人
- <font color="#512da8">侦探</font>：**线索** + 2
- <font color="#5d4037">警长</font>：周围的格子都现身后，将你现在的**线索**翻倍
    - 与侦探的互动：如果调查侦探的同时完成了警长的条件。会先翻倍，后+2
    - 与志愿者的互动：如果两个同时触发，会先翻倍，后+2
- <font color="#303F9F">占卜师</font>：现身时，随机占卜一个2x2的区域，得知每个人的势力
    - 探测区域不会重复
- <font color="#FBC02D">志愿者</font>：每当你使用最后一个**线索**在相邻的格子上调查，**线索**立刻 + 2
### 黑暗势力 🌑
- <font color="#ef9a9a">疯子</font>：如果你上一次调查使得一名邪恶势力现身，你的**线索**会变为1
- <font color="#81d4fa">干扰者</font>：**现身前**，相邻的格子需要调查两次
    - 如果多个干扰者同时干扰了同一格，效果并不会叠加
- <font color="#ffe082">杀手</font>：现身后，你的后三次调查如果使目标现身，反而输掉游戏
- <font color="#80CBC4">替身</font>：目标将要现身时，会和目标交换位置并代替他现身。如果是这样，标出目标的方位
    - 如果游戏设置了多个替身，那么效果触发时会随机抽取其中一个。之后效果触发时，会把旧的方位指示去掉

### 新奇的点子

- 调查过的角色也可以恢复成空白，增加单局时长
- 分享机制：将整个过程制作成动图。意味着所有由玩家和Random控制的操作全部log
- 做动画：0.5s的popup，同时看清数据的变化（极难）
- 告诉玩家因为什么而死
- 视觉黑点消除、缩放自适应