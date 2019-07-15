import React from "react";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <div className="ctr-404">
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>
      You just hit a route that doesn&#39;t exist... the sadness.{" "}
      <span role="img" aria-label="sad face">
        😢
      </span>
    </p>
  </div>
);

export default NotFoundPage;
