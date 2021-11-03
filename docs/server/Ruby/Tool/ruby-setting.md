---
title: ruby工具
---

### 下载安装

-   [官网](https://rubyinstaller.org/downloads/) 或 scoop直接安装

```shell
ruby -v

# Ruby自带一个叫做RubyGems的系统，用来安装基于Ruby的软件
gem update --system # 该命令请翻墙一下
gem -v # 查看版本
```

-   更新源

```shell
# 删除替换原gem源
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
# 打印是否替换成功
gem sources -l
https://gems.ruby-china.com
# 确保只有 gems.ruby-china.com
```

-   配置文件 `~/.gemrc`

    

### 基于Ruby的服务

-   Sass

