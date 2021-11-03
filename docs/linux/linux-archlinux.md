---
title: archlinux
---

[下载](https://wiki.archlinux.org/)
[国内镜像](http://mirrors.163.com/archlinux/iso/2021.06.01/)

## 安装

### 进入配置环境

-   虚拟机安装
-   真假安装 win 有直接制作 U 盘启动,
    -   linux:`dd bs=4M if=xxx.iso of=/dev/dexxxx(U盘位置) status=progress(看到输出信息) && sync`
-   配置好后选择 option -> 高级 -> 从 BIOS 转 UEFI

### 配置与测试

-   检测是否为`UEFI`模式：`ls /sys/firmware/efi/efivars`
-   真机如果没网通过 `wifi-menu` 链接 wifi
-   检测是否联网:`ping www.baidu.com`
-   设置时钟：`timedatectl set-ntp true`
-   设置源:`/etc/pacman.d/mirrorlist`(把国内或是块的放到前面)
-   查看磁盘:`lsblk`
-   分区:`cfdisk`图形界面配置
    -   进入`gpt`
    -   上下贯标定位在`Free space`上,限制下面`new`按钮输入大小(10G、300M)等
    -   新建根目录 sda1、家目录 sda2、EFI 目录 sda3(新建需选择进入 type,选择 EFI System)、生下的建 swap(type,选择 Linux swap)
    -   设置完成进入 write - yes 回车
    -   `lsblk|fdisk`查看状态
-   格式化
    -   格式化根目录：`mkfs.ext4 /dev/sda1`
    -   格式化家目录：`mkfs.ext4 /dev/sda2`
    -   格式化 EFI：`mkfs.vfat /dev/sda3`
    -   格式化 swap：`mkswap -f /dev/sda4`
        -   `swapon /dev/sda4`
-   挂载目录
    -   mkdir /mnt/home
    -   mkdir -p /mnt/boot/EFI
    -   挂载根目录：`mount /dev/sda1 /mnt`
    -   挂载家目录：`mount /dev/sda2 /mnt/home`
    -   挂载 EFI：`mount /dev/sda3 /mnt/boot`
-   安装软件
    -   基础软件：`pacstrap /mnt base`
    -   开发相关包：`pacstrap /mnt base-devel`
    -
    -   (新)基础软件：`pacstrap /mnt base base-devel linux linux-firmware` #base-devel 在 AUR 包的安装是必须的
    -   (新)功能性软件:`pacstrap /mnt dhcpcd iwd vim sudo bash-completion` #一个有线所需 一个无线所需 一个编辑器 一个提权工具 一个补全工具 iwd 也需要 dhcpcd
-   生成 fstab：`genfstab -U /mnt >> /mnt/etc/fstab`(保存挂载)
-   确认是否生成:`cat /mnt/etc/fstab`
-   将系统切换到刚刚安装的环境：`arch-chroot /mnt`

### 进入系统配置

-   配置时区：`ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`
-   设置时间:`hwclock --systohc`
-   安装 VIM：`pacman -S vim`
-   设置语言: `vim /etc/locale.gen` 打开`zh_CN.UTF8 UTF8`,`en_US.UTF-8 UTF-8`
    -   查看 `locale-gen`
    -   生成 locale `bashlocale-gen`.这个好像没有用
    -   设置到配置文件中：`echo "LANG='zh_CN.UTF-8'"` > /etc/locale.conf
-   安装一下网络相关的包:(可省略)
    -   `pacman -S iw wpa_supplicant dialog`
    -   测试联网：`ping www.baidu.com`
-   设置 root 密码
    -   直接`passwd`
-   安装微码
    -   `pacman -S intel-ucode` #Intel
    -   `pacman -S amd-ucode ` #AMD
-   安装引导程序：`pacman -S grub efibootmgr`
    -   执行 `grub-install --target=x86_64-efi --efi-directory=/boot/EFI --bootloader-id=grub`
    -   (新) `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB`
    -   `vim /etc/default/grub` 去掉`GRUB_CMDLINE_LINUX_DEFAULT`的 quite，并且把 3 改成，后期方便排错
    -   配置 `grub-mkconfig -o /boot/grub/grub.cfg`
    -   `mkdir -p /boot/EFI/BOOT`
    -   `mv /boot/EFI/GRUB/grubx64.efi /boot/EFI/BOOT/BOOTX64.EFI`
-   退出 exit 环境：`exit`
-   卸载/mnt：`umount -R /mnt`
-   重启 reboot

## 进入系统

### 开启网络

-   `echo "interface=eth0" >> /etc/rc.conf`
-   执行:`dhcpcd`
-   `systemctl enable dhcpcd.servece` 设置开机自启

### 新建用户

-   `useradd -m -g uesrs -G wheel lzoxun`:指定组为了提权
-   `EDITOR=vim visudo`:编辑 sudo 配置文件,将 wheel 的注释去掉
    -   %wheel ALL=(ALL) ALL:
        -   1、
        -   2、
        -   3、这个组里的成员可以执行任意命令

### 安装 KDE 桌面

-   必要工具:`pacman -S plasma-meta konsole dolphin bash-completion`
    -   桌面环境
    -   终端
    -   文件管理器
    -   命令行补全工具
-   开启 sddm（开机欢迎界面）
    -   `systemctl enable sddm`
-   设置源
    -   `vim /etc/pacman.conf`
    -   开启 multilib
    -   添加
        [archlinuxcn]
        SigLevel = Optional TrustAll
        Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
    -   `pacman -Syyu` 更新
-   安装必要工具
    -   识别第三方 ntfs 移动盘:`ntfs-3g`
    -   开源字体
        -   `pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei`
        -   `sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra`谷歌字体
        -   `sudo pacman -S wqy-microhei wqy-microhei-lite wqy-zenhei wqy-bitmapfont noto-fonts-cjk`
    -   浏览器
        -   `firefox chromium`
    -   yay(aur 用户上传的包)
        -   `sudo pacman -S archlinuxcn-keyring`
        -   再装`yay`
    -   kde
-   设置中文
    -   setting -> system settings -> Regional settings 添加中文，拉倒最前 apply，重启
    -   .pam_environment 添加`LC_ALL=zh_CN.UTF-8`更完全的汉化
-   安装输入法

    -   输入法: `sudo pacman -S fcitx5-im`
    -   安装引擎: `sudo pacman -S fcitx5-chinese-addons`
    -   安装词库: `sudo pacman -S fcitx5-pinyin-moegirl`或搜狗
    -   安装皮肤: `sudo pacman -S fcitx5-material-color`
    -   到设置语言的地方进入输入法进行添加
        xxxx
    -   开机启动，键盘添加拼音

### 美化

-   安装主题 `Layan`
-   欢迎屏幕 `miku`
-   任务栏插件
-   系统设置-显示监控-混成器 选 2.0
-   latte-dock

## 软件包

-   查看版本:`neofetch`
-   加网速:`proxychains-ng`
    -   配置文件 `/etc/proxychains.conf`
    -   通过代理打开系统设置:`proxychains systemsettings5`

## 问题

### 虚拟机全屏

```shell
# sudo pacman -S open-vm-tools
# sudo pacman -S gtkmm
# sudo pacman -S xf86-video-vmware
# sudo pacman -S xf86-input-vmmouse
# systemctl enable vmtoolsd
```

###

-   命令行打开图像界面文件夹
-   截图软件 flameshot
-   wine 测试

## 新机

### 我的程序

-   `yay -S konsole dolphin bash-completion`
-   `yay -S copyq chromium visual-studio-code-bin filezilla latte-dock cifs-utils netease-cloud-music flameshot`
-   `yay -S lazygit ranger tmux neofetch fzf node-fanyi conky`
-   需要添加配置程序
    -   `autojump`
    -   `nvm`

### 我的 kde 快捷键

-   应用程序

    -   `Meta(win建) + Shift + P` : copyq 剪切板保存工具
    -   `Meta + Shift + C` : vscode
    -   `Meta + Shift + O`: 文件窗口 dolphin
    -   `Meta + Shift + T`: 终端 konsole
    -   `Meta + Shift + F`: FTP filezilla
    -   `Meta + Shift + W`: 网易云

-   系统

    -   `Alt + F1`：菜单
    -   `Alt + F2`：系统设置
    -   `Meta + F` : Krunner 全局搜索
    -   `Meta + .`: Emoji 图标
    -   `Ctrl + Esc` : 系统服务

-   其他
    -   latte Dock(Alt + 1~9)

#
