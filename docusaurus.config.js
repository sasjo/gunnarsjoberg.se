// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gunnar Sjöberg',

  // github-pages
  url: 'https://sasjo.github.io',
  baseUrl: '/gunnarsjoberg.se/',

  // Own domain
  // url: 'https://gunnarsjoberg.se',
  // baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // GitHub pages deployment config.
  organizationName: 'sasjo',
  projectName: 'gunnarsjoberg.se',
  trailingSlash: false,

  i18n: {
    path: 'i18n',
    defaultLocale: 'sv',
    locales: ['sv'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          archiveBasePath: '/arkiv',
          tagsBasePath: '/taggar',
          showReadingTime: true,
          blogSidebarTitle: 'Senast publicerat',
          blogSidebarCount: 0,
          postsPerPage: 10,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Gunnar Sjöberg',
        items: [
          {
            to: '/arkiv',
            label: 'Arkiv',
            position: 'left',
          },
          {
            to: '/taggar',
            label: 'Taggar',
            position: 'left',
          }
        ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Gunnar Sjöberg`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
