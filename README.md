# get-release-branch-version
Gets the version number of a release branch such as release/1.2.3

This action should only be run on release branches such as in:

```yaml
on:
  create:
    branches: 'release/*'
```

It will output the version number of the release branch:

Ex: Creating a **release/1.2.3** branch would output:

| output                    | value    |
|--------------------------:|---------:|
|                    major  |        1 |
|                    minor  |        2 |
|                    patch  |        3 |
| manifestSafeVersionString | 01.02.03 |
