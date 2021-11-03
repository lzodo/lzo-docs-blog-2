// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "WEB - 前端开发",
  tagline: "Don't always learn secretly",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  //baseUrl: '/blog/',
  // noIndex: true, //配置baseUrl这个设置成true
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // themes: ['@docusaurus/theme-classic', '@docusaurus/theme-live-codeblock'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "我的WEB文档",
        logo: {
          alt: "",
          src: "img/photo.jpg",
        },
        items: [
          {
            to: "docs/other-weblinks",
            activeBasePath: "docs",
            label: "文档",
            position: "right",
          },
          // { to: "blog", label: "博客", position: "right" },
          {
            href: "https://github.com/liaozhongxun",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "文档",
            items: [
              {
                label: "收藏网址",
                to: "docs/other-weblinks",
              },
              {
                label: "Markdown",
                to: "docs/other/other-markdown",
              },
            ],
          },
          {
            title: "外部链接",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/liaozhongxun",
              },
              {
                label: "码云",
                href: "https://gitee.com/lzo-gitee",
              },
              {
                label: "码云WEB",
                href: "https://lzo-gitee.gitee.io",
              },
              {
                label: "码云 WEB static BasePath",
                href: "https://lzo-gitee.gitee.io/gitee-static/images/home.png",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "博客",
                to: "blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
