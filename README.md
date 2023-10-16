# get-release-branch-version
Gets the version number of a release branch such as release/1.2.3

This action should only be run on release branches. Here is a suggested usage with a check:

```yaml
name: Get release branch
on: create

jobs:
  get-release:
    name: Get the release branch version number
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 1
      - uses: valadas/get-release-branch-version@v1
        id: branchVersion
      - name: Dump the version info
        env:
          MAJOR: ${{ steps.branchVersion.outputs.major }}
          MINOR: ${{ steps.branchVersion.outputs.minor }}
          PATCH: ${{ steps.branchVersion.outputs.patch }}
          MANIFEST_SAFE_VERSION_STRING: ${{ steps.branchVersion.outputs.manifestSafeVersionString }}
        run: "echo major: $MAJOR minor: $MINOR patch: $PATCH manifestSafeVersionString: $MANIFEST_SAFE_VERSION_STRING"
```

Obviously replace the **Dump step** with something more useful for your process.

It will output the version number of the release branch:

Ex: Creating a **release/1.2.3** branch would output:

| output                    | value    |
|--------------------------:|---------:|
|                    major  |        1 |
|                    minor  |        2 |
|                    patch  |        3 |
| manifestSafeVersionString | 01.02.03 |
