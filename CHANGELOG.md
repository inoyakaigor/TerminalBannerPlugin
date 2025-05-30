Changelog
===============================================================================
# 1.0.0
### 💥Breaking changes
* Use Nodejs's built-in function for styling text; bump the minimum supported version to v20.12.0

### Minor changes
#### New
* Add optional parameters to put empty line before and after banner
* Functions that returns a tag and a branch now return undefined in case of error
#### Maintaining
* Add test file and script to run it
* Update Node.js version in publish yml;
* Update README;
* Update author's personal data
* Reformat CHANGELOG

# 0.2.0
Now banner will shows only in development mode. Current git tag, branch and folder getting right before showing the banner so if you change branch this will be inside the banner

# 0.1.4
Fixes of CI/CD pipeline. No significant code changes

# 0.1.0
Fix crash in case when git executable unavailable

# 0.0.2
Some internal refactoring and automathic publishing in NPM

# 0.0.1
Initial release
