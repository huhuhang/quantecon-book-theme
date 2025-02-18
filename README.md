# quantecon-book-theme

A Jupyter Book Theme for QuantEcon Book Style Projects

## Usage

To use this theme in [Jupyter Book](https://github.com/executablebooks/jupyter-book):

1. Install the theme

  `pip install git+https://github.com/QuantEcon/quantecon-book-theme.git`

2. Add the theme to your `_config.yml` file:

  ```yaml
  sphinx:
      config:
          html_theme: quantecon_book_theme
  ```

## Updating Fixtures for Tests

### Updating test regression files on layout changes

It is advisable to update the test files for file regression checks when releavant layout files change.

For example, at present we have a sidebar file-regression check to validate html across tests.
The file which it compares against is `tests/test_build/test_build_book.html`.

If updating the sidebar html, then one of the easier steps to update this test file is:

1. Delete the file `tests/test_build/test_build_book.html`.
2. Run `pytest` in your command line, which will then generate a new file. Check if the file is at par with your expectations, contains elements which you added/modified.

Now future pytests will test against this file, and the subsequent tests should pass.

## Contributing Guide

The docs for the contributing guide of this repository: <https://github.com/QuantEcon/quantecon-book-theme/blob/master/docs/contributing/index.md>

## Set up your development environment

First we'll install the necessary tools that you can use to begin making changes.
Follow these steps:

1. Get the source code of this project using git:

   ```bash
   git clone https://github.com/executablebooks/quantecon-book-theme
   cd quantecon-book-theme
   ```

2. Ensure you have Python 3.7 or newer!
3. Install `tox`.
   `tox` is a tool for managing virtual environments for test suites or common jobs that are run with a repository.
   It ensures that your environment is consistent each time you build the docs or run tests.

   ```console
   conda install tox
   ```

4. Install `pre-commit`.
   We use [pre-commit](https://pre-commit.com) to ensure that the code meets certain standards any time a commit is made.

   ```console
   conda install pre-commit
   ```

   Next, [follow the `pre-commit` installation instructions](https://pre-commit.com/#install).

   Finally, install the local dependencies for pre-commit.
   Run the following command in the same folder as the repository:

   ```console
   pre-commit install
   ```

   :::{margin}
   You can also run pre-commit via `tox`:

   ```console
   tox -e py38-pre-commit -- --all
   ```

   or manually run all `pre-commit` jobs for this repository:

   ```console
   pre-commit run --all-files
   ```

   :::

The rest of these instructions use `tox` to automate the installation and commands necessary to do many common things.

## Build the documentation

Now that you've installed the necessary tools, try building the documentation for this theme locally.
To do so, run the following `tox` command:

```console
tox -e docs-update
```

This will build the documentation using the latest version of the theme and put the outputs in `docs/_build/html`.
You may then preview them by opening one of the HTML files.

## Update the theme's assets (CSS/JS)

Now that you've previewed the documentation, try making changes to this theme's assets and see how they affect the documentation builds.
This is an easy way to preview the effect that your changes will make.

First, **make your changes in `src/quantecon_book_theme/assets/`**.
This folder contains all of the SCSS and Javascript that are used in this site.
For example, edit one of the `scss` files to add or modify a rule.

Next, **compile the changes**.
Run the following command:

```console
tox -e compile
```

This uses the [Sphinx Theme Builder](https://sphinx-theme-builder.readthedocs.io/) to compile our SCSS/JS files and bundle them with our theme at `src/quantecon_book_theme/theme/quantecon_book_theme/static`.
These compiled assets are **not included** in our git repository, but they **are included** in distributions of the theme.
