# Tapas Marketing

### Process

Checkout a branch from `master`.

#### 1. dev/project_name
For development. 
When this branch update, `travis` will auto deploy to CDN under the URL `http://hostname/dev/project_name/[hash:8]`

#### 2. feature/project_name
For production.
When this branch update, `travis` will auto deploy to CDN under the URL `http://hostname/project_name`

### CLI

``` shell
# dev
npm start
# build
npm run build
```
