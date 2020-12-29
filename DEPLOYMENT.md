# Deployment steps

- Run `lib:version:major` | `lib:version:minor` | `lib:version:patch` depends on changes have done
- Update `projects/ngx-social-auth/CHANGELOG.md` according to the future version
- Add version tag for the commit with new version. Example `0.0.1`
- Run `docs:lib` to build docs site will be stored in `docs`
- Add version tag for the commit with new docs site. Example `docs-0.0.1`
- Add version tag for the appropriate commit with actual demo app. Example `demo-0.0.1`
- Push all commits and tags to the `master` branch  
- Run `publish:lib` for publishing library to npm registry
- Run `deploy:demo` for publishing demo to firebase
