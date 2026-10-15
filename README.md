# CX as Code API calculator

**Live app:** [https://cxascode.github.io/apicalculator/](https://cxascode.github.io/apicalculator/)

Estimate monthly **API on-demand** allocation from the [Genesys Cloud fair use policy](https://help.genesys.cloud/articles/genesys-cloud-fair-use-policy/) by billable user type, license tier, and user count.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy with GitHub Pages

This repo includes `.github/workflows/pages.yml`.

1. Push to GitHub.
2. Go to **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main`, or run the workflow manually from **Actions**.

For a custom domain or root deployment, set `VITE_BASE_PATH=/` in the workflow or repository variables.

## Related tools

- **[CX as Code Explorer](https://cxascode.github.io/)** — provider resource catalog and dependencies
- **[Export Builder](https://cxascode.github.io/exportbuilder/)** — `genesyscloud_tf_export` workflows

## License

MIT — see [LICENSE](LICENSE).
