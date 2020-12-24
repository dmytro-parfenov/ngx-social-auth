# Deployment steps

 - Update `projects/ngx-social-auth/CHANGELOG.md` according to the future version
 - Run `lib:version:major` | `lib:version:minor` | `lib:version:patch` depends on changes have done
 - Add version tag for the commit with new version. Example `0.0.1`
 - Run `docs:lib` to build docs site will be stored in `docs`
 - Add version tag for the commit with new docs site. Example `docs-0.0.1`
 - Run `build:lib:prod` to build library will be stored in `dist/ngx-social-auth2`
 - Go to `cd dist/ngx-social-auth2` and run `npm publish` for publish library to npm registry
 - Run `build:demo:prod-gh-pages` to build demo app for GitHub Pages will be stored in `dist/ngx-social-auth-demo`
 - Add version tag for the appropriate commit with actual demo app. Example `demo-0.0.1`  
 - Go to `cd dist/ngx-social-auth-demo` and use files to update [ngx-social-auth-demo](https://github.com/dmytro-parfenov/ngx-social-auth-demo) repository that provides a fresh demo for the latest version of library 
