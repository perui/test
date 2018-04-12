// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  keycloak: {
    url: 'http://local.jobtechsweden.se/auth',
    realm: 'jobtechdev',
    clientId: 'job-tech-dev'
  },

  serviceProviderUrl: 'http://local.jobtechsweden.se/sp/api',
  useKeycloak: true,

  googleAnalytics: 'UA-114390036-2'

};
