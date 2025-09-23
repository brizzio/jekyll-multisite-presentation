# Jekyll Multisite Example

This repository demonstrates how to run **multiple Jekyll sites** from a single GitHub repository and deploy them to **GitHub Pages**. Each site can live in its own folder (e.g., `demo`, `docs`) and be built independently with its own `baseurl`.

## Features

- ✅ Supports multiple Jekyll sites in one repo  
- ✅ Automatic build and deployment via GitHub Actions  
- ✅ Each site is served under its folder name as `baseurl`  
- ✅ Prebuilt sites are pushed to `gh-pages`, ensuring full control over the deployed HTML  
- ✅ Compatible with GitHub Pages hosting  

## Structure

/demo # Example Jekyll site
/docs # Documentation site
/_site # Generated sites ready for GitHub Pages
.github/workflows/deploy.yml # CI/CD workflow


## How it works

1. Each top-level folder containing `_config.yml` is detected as a Jekyll site.  
2. Sites are built locally with the correct `baseurl` based on the folder name.  
3. `_site` directory is pushed to `gh-pages`.  
4. GitHub Pages serves the sites at `https://<username>.github.io/<repo>/<folder>/`.  
