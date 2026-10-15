import { useEffect } from 'react';
import ApiCalculator from './components/ApiCalculator.jsx';
import { applyPageSeo } from './pageSeo.js';
import { EXPORT_BUILDER_URL, HOME_URL } from './lib/site.js';

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
              <span className="gcPageTitleCurrent">API on-demand calculator</span>
            </h1>
          </div>
          <div className="gcPageMeta">
            <div className="gcHeaderLinks">
              <a className="gcHeaderLink" href={EXPORT_BUILDER_URL}>Export Builder</a>
            </div>
          </div>
        </div>
      </header>

      <main className="gcContentArea">
        <ApiCalculator />
      </main>
    </div>
  );
}
