import { useEffect } from 'react';
import ApiCalculator from './components/ApiCalculator.jsx';
import { applyPageSeo } from './pageSeo.js';
import { HOME_URL } from './lib/site.js';

export default function App() {
  useEffect(() => {
    applyPageSeo();
  }, []);

  return (
    <div className="gcShell">
      <header className="gcPageHeader">
        <div className="gcPageTitleRow">
          <div className="gcPageTitleGroup">
            <h1 className="gcPageTitle">
              <a className="gcSiteHomeLink" href={HOME_URL}>Home</a>
              <span className="gcPageTitleSeparator" aria-hidden="true">/</span>
              <span className="gcPageTitleCurrent">API calculator</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="gcContentArea">
        <div className="gcCard gcPageIntro">
          <h2 className="gcPageIntroTitle">Fair use allocation</h2>
          <p>
            Integrations, automation, Terraform, and bulk admin all call the Genesys Cloud APIs.
            Your monthly <strong>API on-demand</strong> allowance comes from the{' '}
            <a href="https://help.genesys.cloud/articles/genesys-cloud-fair-use-policy/">
              fair use policy
            </a>
            —by billable user type, license tier, and user count, not a single flat cap. Model your
            license mix here to estimate allocation before you design workloads or hit throttling.
          </p>
        </div>
        <ApiCalculator />
      </main>
    </div>
  );
}
