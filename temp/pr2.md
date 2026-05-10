## 概述
将设置页 Skills 从文件上传入口改为网格内技能卡片 + 开关：卡片展示名称与简介，`Switch` 控制启用；网格末位提供虚线「New Skill」；删除按钮常态隐藏，悬停或聚焦时显现，兼顾可删与版面克制。

## 改动说明
- `frontend/features/settings/SettingsPanel.tsx`，重写 Skills 区域为 Responsive 网格，`Card` / `CardContent` 承载单项技能，`Switch` 置于卡片右上，`TrashIcon` 配合 `opacity-0`、`hover`、`focus-visible` 控制删除露出
- 以「New Skill」虚线按钮（`PlusIcon` + 文案）替代原文件上传式扩展路径，与技能卡片同级排布
- 沿用 `shared/ui` 下 `Card`、`Switch` 等组件，与设置页其余区块视觉一致

## 实现目的
- 心智对齐「启用某能力」：列表 + 开关优于单一上传动作
- 结构可扩展：网格卡片便于后续增加字段或编辑入口
- 删除可发现、低误触：弱化为悬停/聚焦显式；新建入口与同区卡片并列，路径清晰
- 模块内交互一致，减少与 System Prompt 等区块的割裂感
