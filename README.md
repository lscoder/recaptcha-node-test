# Google ReCaptcha

#### Prerequisites
- Node (https://github.com/creationix/nvm)
- Foreman (https://github.com/ddollar/foreman)

#### Starting the application
```
$ cd reCaptcha
$ npm install
$ cp .env_sample .env
# Set the right `RECAPTCHA_SECRET` on .env
# Set the right client key on index.html (`data-sitekey`)
$ foreman start dev
```