import { useState, useEffect, useRef } from "react";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Projects",
  "Visualizations",
  "Skills",
  "Publications",
  "Contact",
];
const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const PROJECTS = [
  {
    id: "01",
    title: "Gallatin County Housing Price Prediction",
    description:
      "Multi-method regression analysis of 17,954 single-family home sales in Gallatin County, MT. Evaluated simple and multiple linear regression, forward subset selection, Ridge/Lasso regularization, PCR, non-linear models, Self-Organizing Maps, and Random Forest classification to identify key price drivers — location and school quality emerged as the strongest predictors.",
    tags: ["Python", "Random Forest", "PCR", "Ridge/Lasso", "EDA"],
    year: "2024",
    link: publicAsset("/Mini_Project_2_report.pdf"),
    pdfLabel: "View Report",
    repoLink: null,
    codeNote: "Code available upon request.",
    impact:
      "Compared complementary regression and machine-learning approaches to identify the strongest drivers of local home prices.",
    accent: true,
  },
  {
    id: "02",
    title: "Mining User Forums to Evaluate Software Quality-in-Use",
    description:
      "NLP pipeline for evaluating software quality-in-use (QIU) of reactive transport modeling (RTM) software by systematically analyzing 3,941 forum threads from four RTM user communities. Applied unigram/trigram analysis and a manually validated ISO/IEC 25019:2023-grounded keyword dictionary to quantify QIU subcharacteristic frequencies. Usability dominated at 68% of threads.",
    tags: ["R", "NLP", "quanteda", "Web Scraping", "Mixed-effects Modeling"],
    year: "2026",
    link: publicAsset(
      "/Hastings_et_al._2026_-_Mining_User_Forums_to_Evaluate_QIU.pdf",
    ),
    pdfLabel: "View Paper",
    repoLink: "https://doi.org/10.5281/zenodo.18132283",
    repoLabel: "Zenodo",
    codeNote: null,
    impact:
      "Analyzed 3,941 threads across four communities and found usability represented 68% of observed quality-in-use discussions.",
    accent: false,
  },
  {
    id: "03",
    title:
      "Green Infrastructure Microbial Response to Pulse Precipitation Events",
    description:
      "Examined plant diversity and soil physiochemistry as drivers of microbial community physiology and soil nitrogen dynamics following simulated precipitation pulses in semi-arid stormwater green infrastructure (SGI) bioswales and a montane meadow. Water pulses elevated soil moisture and pH, stimulated ecoenzyme activity, and increased organic matter and N pools — but microbial growth remained static and N assimilation into biomass was limited. Found that SGI ecological function is broadly comparable to neighboring natural vegetated systems when soil media and water availability are similar.",
    tags: [
      "R",
      "Piecewise SEM",
      "Causal Inference",
      "Soil Ecology",
      "Ecoenzymes",
    ],
    year: "2024",
    link: "https://www.mdpi.com/2073-4441/16/13/1931",
    pdfLabel: "View Paper",
    repoLink: "https://github.com/HastingsY/GIRF-Pulse-Experiment",
    repoLabel: "GitHub",
    codeNote: null,
    impact:
      "Connected precipitation pulses, soil conditions, and microbial processes to assess the ecological function of green infrastructure.",
    accent: false,
  },
  {
    id: "04",
    title: "Barriers to Use: User Survey of Environmental Research Software",
    description:
      "Designed and distributed an ISO/IEC 25019:2023-aligned questionnaire to 45 environmental scientists to empirically identify QIU barriers in research software. Found that Accessibility, Suitability, and Experience subcharacteristics represent the most significant adoption barriers — associated with steep learning curves, programming environment requirements, and reliance on third-party tools.",
    tags: [
      "R",
      "Survey Design",
      "Qualtrics",
      "Non-parametric Stats",
      "Data Analysis",
    ],
    year: "2026",
    link: publicAsset(
      "/Hastings_et_al._2026_-_Barriers_to_Use_perspectives_on_environmental_research_software.pdf",
    ),
    pdfLabel: "View Paper",
    repoLink: "https://doi.org/10.5281/zenodo.15492847",
    repoLabel: "Zenodo",
    codeNote: null,
    impact:
      "Surveyed 45 environmental scientists to identify accessibility, suitability, and experience as major software adoption barriers.",
    accent: false,
  },
];

const SKILLS = [
  { category: "Languages", items: ["R", "Python", "SQL"] },
  {
    category: "Modeling",
    items: [
      "Random Forest",
      "Regression",
      "PCR",
      "Causal Inference",
      "Non-parametric Tests",
    ],
  },
  {
    category: "NLP",
    items: ["Text Mining", "Lexicon Development", "n-gram Analysis"],
  },
  {
    category: "Data Work",
    items: [
      "Web Scraping (rvest & BeautifulSoup)",
      "API Integration",
      "Data Cleaning",
      "Exploratory Analysis",
    ],
  },
  {
    category: "Research",
    items: ["Survey Design", "Qualtrics", "Reproducible Workflows"],
  },
  {
    category: "Visualization",
    items: ["ggplot2", "matplotlib", "plotly", "ArcGIS", "Draw.io"],
  },
  {
    category: "Collaboration",
    items: ["Git", "GitHub", "GitLab", "Zenodo", "Overleaf"],
  },
  {
    category: "Documentation",
    items: ["R Markdown", "Jupyter Notebook", "LaTeX"],
  },
];

const PUBLICATIONS = [
  {
    id: "P1",
    title:
      "Applying Software Quality in Use Standards to Improve Scientific Software Selection",
    venue: "Works in Progress in Embedded Computing (WIPIEC) Journal",
    doi: null,
    year: "2023",
    status: "Published",
    pdfLink:
      "https://wipiec.digitalheritage.me/index.php/wipiecjournal/article/view/42",
    doiLink: null,
  },
  {
    id: "P2",
    title:
      "Green Infrastructure Microbial Community Response to Simulated Pulse Precipitation Events in the Semi-Arid Western United States",
    venue: "Water · MDPI (Vol. 16, No. 13)",
    doi: "10.3390/w16131931",
    year: "2024",
    status: "Published",
    pdfLink: "https://www.mdpi.com/2073-4441/16/13/1931",
    doiLink: null,
  },
  {
    id: "P3",
    title:
      "Mining User Forums to Evaluate Quality-in-Use of Environmental Software",
    venue: "IEEE SoutheastCon 2026",
    doi: "10.1109/SOUTHEASTCON63549.2026.11476204",
    year: "2026",
    status: "Published",
    pdfLink: publicAsset(
      "https://doi.org/10.1109/SOUTHEASTCON63549.2026.11476204",
    ),
    doiLink: null,
  },
  {
    id: "P4",
    title: "Barriers to Use: Perspectives on Environmental Research Software",
    venue:
      "ICSOFT 2026 — 21st International Conference on Software Technologies",
    doi: "10.5220/0015086680000408",
    year: "2026",
    status: "Published",
    pdfLink: publicAsset(
      "https://www.scitepress.org/PublicationsDetail.aspx?ID=lHvmmbwVaZs=&t=1",
    ),
    doiLink: null,
  },
  {
    id: "P5",
    title:
      "From Standards to Practice: A Position on Challenges in Operationalizing Software Quality-in-Use",
    venue:
      "Proceedings of the 21st International Conference on Evaluation of Novel Approaches to Software Engineering (ENASE)",
    doi: "10.5220/0014925900004015",
    year: "2026",
    status: "Published",
    pdfLink:
      "https://www.scitepress.org/Link.aspx?doi=10.5220/0014925900004015",
    doiLink: null,
  },
  {
    id: "P6",
    title: "Software Quality-in-Use: A Systematic Literature Review",
    venue: "2026 Intermountain Engineering, Technology and Computing (IETC)",
    doi: "10.1109/IETC69527.2026.11568664",
    year: "2026",
    status: "Published",
    pdfLink: "https://doi.org/10.1109/IETC69527.2026.11568664",
    doiLink: null,
  },
];

const VISUALIZATIONS = [
  {
    id: "V1",
    title: "Random Forest: Top 15 Most Important Features",
    caption:
      "Feature importance rankings from the Random Forest model predicting Gallatin County home prices. Bathrooms and lot size dominate by a wide margin; geographic encoding (Big Sky, latitude/longitude) and school rating follow, confirming that location and amenities drive price more than structural age or bedroom count.",
    project: "Gallatin County Housing Price Prediction",
    tags: ["Python", "Random Forest", "Feature Importance"],
    src: publicAsset("/random_forest_most_important_features.png"),
    alt: "Horizontal bar chart of the top 15 most important features in a random forest model predicting home prices, led by bathrooms and lot size.",
  },
  {
    id: "V2",
    title: "Correlation Heatmap: Housing Feature Relationships",
    caption:
      "Full pairwise Pearson correlation matrix across all 25 numeric and one-hot encoded features in the Gallatin County housing dataset. Strong positive correlations emerge between city and school encodings (collinear by geography), while bathrooms and living area correlate most with price.",
    project: "Gallatin County Housing Price Prediction",
    tags: ["Python", "EDA", "Correlation", "Heatmap"],
    src: publicAsset("/housing_correlation_with_heatmap.png"),
    alt: "Annotated correlation heatmap of 25 housing features, colored from dark (negative) to light (positive) with numeric coefficients in each cell.",
  },
  {
    id: "V3",
    title: "2D PCA with Feature Loadings",
    caption:
      "Principal component biplot for Gallatin County housing data. PC1 (26% variance) separates homes along a size/amenity axis; PC2 (20%) captures geographic north–south gradient driven by latitude. Red arrows reveal that longitude and latitude pull orthogonally, while bathrooms, lot size, and year built cluster together.",
    project: "Gallatin County Housing Price Prediction",
    tags: ["Python", "PCA", "Dimensionality Reduction", "Biplot"],
    src: publicAsset("/housing_PCA.png"),
    alt: "2D PCA scatter plot of housing observations with red feature loading arrows, showing PC1 and PC2 axes and labeled feature vectors.",
  },
  {
    id: "V4",
    title: "Party Activity Trends, 2009–2014",
    caption:
      "30-day moving average of parties per day scraped from the New York Social Diary website (newyorksocialdiary.com) between 2009 and 2014. Event data was extracted using BeautifulSoup and parsed to compute daily party counts. Peak activity is annotated in the 2010–2011 window; a low-activity period emerges in 2014.",
    project: "New York Social Diary Web Scraping",
    tags: ["Python", "BeautifulSoup", "Web Scraping", "Time Series"],
    src: publicAsset("/party_trends.png"),
    alt: "Line chart of 30-day moving average party frequency from 2009 to 2014 scraped from the New York Social Diary, with annotated peak and low activity regions.",
  },
  {
    id: "V5",
    title: "Treatment Similarity Network Across Sampling Periods",
    caption:
      "Similarity network comparing plant treatment groups across sampling periods in a stormwater green infrastructure study. Node color encodes treatment × vegetation combination; edge weight reflects multivariate genomic similarity. Reveals how plant diversity treatments diverge and converge in microbial community composition over time.",
    project: "Green Infrastructure Genomic Diversity · In Preparation",
    tags: ["R", "Network Analysis", "Multivariate", "Genomics"],
    src: publicAsset("/similarity_plot.jpeg"),
    alt: "Circular network diagram with nodes colored by soil treatment group and sampling period, and edges scaled by multivariate similarity.",
  },
  {
    id: "V6",
    title: "Bivariate Choropleth: Female Renters Across U.S. Counties",
    caption:
      "County-level bivariate map jointly encoding the percentage of female residents and the percentage of renters. The two-variable color scheme reveals geographic clustering — dense urban counties in the South and East show high renter rates regardless of gender composition, while rural Western counties skew toward low-female, low-renter profiles.",
    project: "Geographic Data Analysis",
    tags: ["ArcGIS", "Choropleth", "Bivariate Map", "Spatial Analysis"],
    src: publicAsset("/Layout.jpg"),
    alt: "Bivariate choropleth map of the United States showing percentage of female residents and percentage of renters by county using a blue-green color matrix.",
  },
  {
    id: "V8",
    title: "Gradient Boosting Regressor: Actual vs. Predicted Financial Loss",
    caption:
      "Model validation scatter plot from a Gradient Boosting Regressor predicting financial loss from cybersecurity incidents (in millions USD), produced as part of a team class project. Illustrates the actual vs. predicted evaluation framework against a perfect prediction reference line.",
    project: "Cybersecurity Incident Financial Loss Analysis",
    tags: ["Python", "Gradient Boosting", "Regression", "Model Validation"],
    src: publicAsset(
      "/actual_vs_predicted_financial_loss_due_to_cyber_incidents.png",
    ),
    alt: "Scatter plot of actual versus predicted financial loss in millions of dollars from a gradient boosting regressor, with a dashed red perfect prediction line.",
  },
  {
    id: "V7",
    title: "Piecewise SEM: Nitrogen Cycling Causal Structure",
    caption:
      "Piecewise structural equation model (September 2020) tracing causal pathways from precipitation-driven soil moisture through organic matter, microbial biomass C:N, ecoenzyme activity (LAP, AP, BG, POX), and proteolysis to inorganic nitrogen pools in semi-arid SGI bioswales. Path width encodes coefficient magnitude. Results show organic matter content — mediated by ecoenzyme expression and C:N:P stoichiometry — as the primary proximate driver of soil N concentrations.",
    project:
      "Green Infrastructure Microbial Response · M.S. Geography, University of Utah",
    tags: ["R", "Draw.io", "Piecewise SEM", "Causal Inference"],
    src: publicAsset("/causal_diagram.png"),
    alt: "Directed acyclic graph showing causal pathways between soil moisture, organic matter, microbial biomass, soil enzymes, and inorganic nitrogen in September 2020.",
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-accent)",
          fontSize: "13px",
        }}
        className="tracking-widest"
      >
        {num}
      </span>
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--color-border)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-subtle)",
          fontSize: "13px",
        }}
        className="uppercase tracking-widest"
      >
        {label}
      </span>
    </div>
  );
}

function VizCard({
  viz,
  onExpand,
}: {
  viz: (typeof VISUALIZATIONS)[0];
  onExpand: () => void;
}) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
        width: "100%",
      }}
    >
      <button
        onClick={onExpand}
        aria-label={`Expand: ${viz.title}`}
        style={{
          all: "unset",
          cursor: "zoom-in",
          display: "block",
          background: "var(--color-surface-2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={viz.src}
          alt={viz.alt}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.02)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
          }
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--color-bg)",
            background: "var(--color-accent)",
            padding: "2px 8px",
          }}
        >
          expand ↗
        </div>
      </button>

      <div style={{ padding: "18px 22px 22px", flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "7px",
          }}
        >
          {viz.id} — {viz.project}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            color: "var(--color-heading)",
            lineHeight: "1.35",
            marginBottom: "9px",
          }}
        >
          {viz.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "var(--color-subtle)",
            lineHeight: "1.65",
            marginBottom: "14px",
          }}
        >
          {viz.caption}
        </p>
        <div className="flex flex-wrap gap-2">
          {viz.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-subtle)",
                border: "1px solid var(--color-border)",
                padding: "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const WEBPIQUE_IMAGES = [
  "PIQUE compare.png",
  "PIQUE compare 1.png",
  "PIQUE compare 2.png",
  "PIQUE project.png",
  "PIQUE project 1.png",
  "PIQUE project 2.png",
  "PIQUE project 3.png",
  "PIQUE project 4.png",
  "PIQUE project 5.png",
  "PIQUE single file.png",
  "PIQUE single file 1.png",
  "PIQUE single file 2.png",
];

function WebPiqueCarousel() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const previous = () =>
    setIndex((currentIndex) =>
      currentIndex === 0 ? WEBPIQUE_IMAGES.length - 1 : currentIndex - 1,
    );
  const next = () =>
    setIndex((currentIndex) =>
      currentIndex === WEBPIQUE_IMAGES.length - 1 ? 0 : currentIndex + 1,
    );

  return (
    <div className="webpique-carousel">
      <div className="webpique-image-frame">
        <button
          type="button"
          className="webpique-image-button"
          onClick={() => setExpanded(true)}
          aria-label={`Expand WebPIQUE screenshot ${index + 1}`}
        >
          <img
            src={publicAsset(`/${WEBPIQUE_IMAGES[index]}`)}
            alt={`WebPIQUE Visualizer screenshot ${index + 1} of ${WEBPIQUE_IMAGES.length}`}
          />
          <span className="webpique-expand-label">expand ↗</span>
        </button>
        <button
          type="button"
          className="webpique-carousel-button webpique-carousel-previous"
          onClick={previous}
          aria-label="Previous WebPIQUE screenshot"
        >
          ←
        </button>
        <button
          type="button"
          className="webpique-carousel-button webpique-carousel-next"
          onClick={next}
          aria-label="Next WebPIQUE screenshot"
        >
          →
        </button>
      </div>
      <div className="webpique-carousel-dots" aria-label="WebPIQUE screenshots">
        {WEBPIQUE_IMAGES.map((image, imageIndex) => (
          <button
            key={image}
            type="button"
            className={imageIndex === index ? "active" : ""}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show WebPIQUE screenshot ${imageIndex + 1}`}
            aria-current={imageIndex === index ? "true" : undefined}
          />
        ))}
      </div>
      {expanded && (
        <div
          className="webpique-lightbox"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`WebPIQUE screenshot ${index + 1}`}
        >
          <img
            src={publicAsset(`/${WEBPIQUE_IMAGES[index]}`)}
            alt={`Expanded WebPIQUE Visualizer screenshot ${index + 1}`}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="webpique-lightbox-close"
            onClick={() => setExpanded(false)}
            aria-label="Close expanded WebPIQUE screenshot"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function EnvironmentalDashboardCard() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="webpique-callout environmental-dashboard-card">
      <div className="webpique-copy">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "7px",
          }}
        >
          Research visualization tool
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            color: "var(--color-heading)",
            marginBottom: "6px",
          }}
        >
          Environmental Monitoring Dashboard
        </h3>
        <p
          style={{
            color: "var(--color-subtle)",
            fontSize: "13px",
            lineHeight: "1.6",
            marginBottom: "12px",
          }}
        >
          Built in R Shiny to help researchers monitor landscape infrastructure,
          inspect sensor observations, explore hydrologic trends, and compare
          estimated irrigation water use and cost across monitored sites.
        </p>
        <p
          style={{
            color: "var(--color-muted)",
            fontSize: "12px",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          For more information about the tool design, see my{" "}
          <a
            href="https://hastingsy.github.io/Design_Portfolio/projects"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)" }}
          >
            design portfolio ↗
          </a>
          .
        </p>
      </div>
      <button
        type="button"
        className="environmental-dashboard-image"
        onClick={() => setExpanded(true)}
        aria-label="Expand Environmental Monitoring Dashboard screenshot"
      >
        <img
          src={publicAsset("/LLdashboard_final.png")}
          alt="Environmental monitoring dashboard with a landscape map, sensor status, hydrologic chart, and irrigation analysis plots."
        />
        <span className="webpique-expand-label">expand ↗</span>
      </button>
      {expanded && (
        <div
          className="webpique-lightbox"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Environmental Monitoring Dashboard screenshot"
        >
          <img
            src={publicAsset("/LLdashboard_final.png")}
            alt="Expanded Environmental Monitoring Dashboard screenshot"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="webpique-lightbox-close"
            onClick={() => setExpanded(false)}
            aria-label="Close expanded dashboard screenshot"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function VizCarousel() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [perPage, setPerPage] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 640 ? 1 : 2,
  );
  const total = VISUALIZATIONS.length;
  const maxIndex = total - perPage;

  useEffect(() => {
    const onResize = () => setPerPage(window.innerWidth <= 640 ? 1 : 2);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIndex((currentIndex) => Math.min(currentIndex, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      {/* Track */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              transform: `translateX(calc(-${index * (100 / perPage)}%))`,
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              gap: "0px",
            }}
          >
            {VISUALIZATIONS.map((viz, i) => (
              <div
                key={viz.id}
                className="viz-slide"
                style={{
                  minWidth: `${100 / perPage}%`,
                  borderRight:
                    i < total - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <VizCard viz={viz} onExpand={() => setExpanded(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: "16px" }}
      >
        {/* Dot indicators */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === index ? "var(--color-accent)" : "var(--color-border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.2s ease, background 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "32px",
              background: "none",
              border: "none",
              color:
                index === 0 ? "var(--color-border)" : "var(--color-accent)",
              width: "52px",
              height: "52px",
              cursor: index === 0 ? "default" : "pointer",
              transition:
                "border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              if (index !== 0) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "var(--color-heading)";
                el.style.transform = "scale(1.2)";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color =
                index === 0 ? "var(--color-border)" : "var(--color-accent)";
              el.style.transform = "scale(1)";
            }}
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "32px",
              background: "none",
              border: "none",
              color:
                index >= maxIndex
                  ? "var(--color-border)"
                  : "var(--color-accent)",
              width: "52px",
              height: "52px",
              cursor: index >= maxIndex ? "default" : "pointer",
              transition: "color 0.15s, transform 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              if (index < maxIndex) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = "var(--color-heading)";
                el.style.transform = "scale(1.2)";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.color =
                index >= maxIndex
                  ? "var(--color-border)"
                  : "var(--color-accent)";
              el.style.transform = "scale(1)";
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {expanded !== null && (
        <div
          onClick={() => setExpanded(null)}
          role="dialog"
          aria-modal="true"
          aria-label={VISUALIZATIONS[expanded].title}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={VISUALIZATIONS[expanded].src}
            alt={VISUALIZATIONS[expanded].alt}
            style={{
              maxWidth: "92vw",
              maxHeight: "80vh",
              objectFit: "contain",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "16px",
              maxWidth: "640px",
              textAlign: "center",
              lineHeight: "1.6",
            }}
          >
            {VISUALIZATIONS[expanded].title}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(null);
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        background: hovered ? "var(--color-surface-2)" : "var(--color-surface)",
        borderLeft: project.accent
          ? `3px solid var(--color-accent)`
          : "1px solid var(--color-border)",
        padding: "28px 32px",
        transition: "background 0.18s ease",
        position: "relative",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-muted)",
          }}
        >
          {project.id} — {project.year}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-heading)",
          fontSize: "20px",
          marginBottom: "10px",
          lineHeight: "1.3",
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          color: "var(--color-subtle)",
          fontSize: "14px",
          lineHeight: "1.65",
          marginBottom: "20px",
        }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: project.accent
                ? "var(--color-accent)"
                : "var(--color-subtle)",
              background: project.accent
                ? "var(--color-accent-dim)"
                : "transparent",
              border: `1px solid ${project.accent ? "var(--color-accent-dim)" : "var(--color-border)"}`,
              padding: "2px 8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--color-accent)",
          textDecoration: "none",
          border: "1px solid var(--color-accent-dim)",
          padding: "5px 14px",
          display: "inline-block",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "var(--color-accent-dim)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "transparent")
        }
      >
        {project.pdfLabel} ↗
      </a>
      {project.repoLink && (
        <a
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--color-subtle)",
            textDecoration: "none",
            border: "1px solid var(--color-border)",
            padding: "5px 14px",
            display: "inline-block",
            marginLeft: "8px",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            const element = e.currentTarget as HTMLElement;
            element.style.borderColor = "var(--color-subtle)";
            element.style.color = "var(--color-text)";
          }}
          onMouseLeave={(e) => {
            const element = e.currentTarget as HTMLElement;
            element.style.borderColor = "var(--color-border)";
            element.style.color = "var(--color-subtle)";
          }}
        >
          {project.repoLabel} ↗
        </a>
      )}
      <p
        style={{
          color: "var(--color-muted)",
          fontSize: "12px",
          lineHeight: "1.6",
          marginTop: "18px",
          marginBottom: 0,
        }}
      >
        <strong style={{ color: "var(--color-subtle)" }}>
          Selected impact:
        </strong>{" "}
        {project.impact}
      </p>
      {project.codeNote && (
        <p
          style={{
            color: "var(--color-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          {project.codeNote}
        </p>
      )}
    </div>
  );
}

function SkillGroup({ group }: { group: (typeof SKILLS)[0] }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div className="flex gap-8 items-baseline">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-muted)",
            width: "80px",
            flexShrink: 0,
          }}
        >
          {group.category}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {group.items.map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--color-text)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicationRow({ pub }: { pub: (typeof PUBLICATIONS)[0] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: "16px 24px",
        borderTop: "1px solid var(--color-border)",
        padding: "24px 0",
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-muted)",
          paddingTop: "3px",
        }}
      >
        {pub.id}
      </span>
      <div>
        <p
          style={{
            color: "var(--color-text)",
            fontSize: "15px",
            marginBottom: "8px",
            lineHeight: "1.5",
          }}
        >
          {pub.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-accent)",
            }}
          >
            {pub.venue}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-muted)",
            }}
          >
            {pub.year}
          </span>
        </div>
        <div className="flex gap-3">
          {pub.pdfLink && (
            <a
              href={pub.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-accent)",
                textDecoration: "none",
                border: "1px solid var(--color-accent-dim)",
                padding: "3px 10px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--color-accent-dim)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
            >
              PDF ↓
            </a>
          )}
          {pub.doiLink && (
            <a
              href={pub.doiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-subtle)",
                textDecoration: "none",
                border: "1px solid var(--color-border)",
                padding: "3px 10px",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-subtle)";
                el.style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-border)";
                el.style.color = "var(--color-subtle)";
              }}
            >
              DOI ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav({
  theme,
  toggleTheme,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--color-nav-scrolled)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        transition: "background 0.25s, border-color 0.25s",
        padding: "0 48px",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", height: "60px" }}
        className="flex items-center justify-between"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--color-accent)",
            letterSpacing: "0.05em",
          }}
        >
          Yvette D. Hastings
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--color-subtle)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-subtle)")
              }
            >
              {link}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              cursor: "pointer",
              color: "var(--color-subtle)",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              transition: "border-color 0.15s, color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--color-subtle)";
              el.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--color-border)";
              el.style.color = "var(--color-subtle)";
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              cursor: "pointer",
              color: "var(--color-subtle)",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text)",
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
            }}
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-border)",
            padding: "16px 48px 24px",
          }}
          className="mobile-menu md:hidden flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--color-subtle)",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Subtle animated grid in hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const step = 40;
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
      ctx.strokeStyle = isLight
        ? "rgba(100,110,150,0.12)"
        : "rgba(74,80,104,0.18)";
      ctx.lineWidth = 1;

      for (let x = 0; x < w + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated accent dot
      const t = frame * 0.008;
      const cx = w * 0.72 + Math.sin(t * 1.3) * 30;
      const cy = h * 0.42 + Math.cos(t) * 20;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
      grad.addColorStop(
        0,
        isLight ? "rgba(0,122,82,0.08)" : "rgba(79,255,176,0.12)",
      );
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      frame++;
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 48px 60px",
          overflow: "hidden",
        }}
      >
        {/* Topographic map background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?w=1800&fit=crop&auto=format')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: theme === "dark" ? 0.45 : 0.18,
            filter:
              theme === "dark"
                ? "sepia(0.8) hue-rotate(110deg) saturate(5) brightness(0.7)"
                : "sepia(0.6) hue-rotate(110deg) saturate(4) brightness(1.05)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        {/* Gradient fade to page bg at bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, var(--color-bg) 100%)`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    boxShadow: "0 0 12px var(--color-accent)",
                    animation: "pulse 2.4s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--color-accent)",
                    letterSpacing: "0.12em",
                  }}
                >
                  OPEN TO OPPORTUNITIES
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(42px, 5vw, 68px)",
                  color: "var(--color-heading)",
                  lineHeight: "1.08",
                  marginBottom: "6px",
                }}
              >
                Data Scientist
              </h1>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 2vw, 28px)",
                  color: "var(--color-subtle)",
                  lineHeight: "1.2",
                  marginBottom: "28px",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>Yvette D. Hastings</span>
                {" · M.S. Computer Science & Geography"}
              </h2>

              <p
                style={{
                  color: "var(--color-subtle)",
                  fontSize: "15px",
                  lineHeight: "1.75",
                  maxWidth: "460px",
                  marginBottom: "40px",
                }}
              >
                I turn complex datasets into clear evidence for better
                decisions, combining statistical modeling, machine learning,
                NLP, and visualization across environmental science, real
                estate, and software usability domains. My work connects
                rigorous research methods with practical questions about people,
                systems, and the environments they shape.
              </p>

              <div className="flex flex-wrap gap-4">
                <a className="hero-action" href="#projects">
                  View Projects
                </a>
                <a className="hero-action" href="#publications">
                  Publications ↓
                </a>
                <a
                  className="hero-action"
                  href={publicAsset("/Hastings_Resume_data_scientist.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↗
                </a>
              </div>
            </div>

            {/* Right: stats panel */}
            <div>
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  padding: "32px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    background: "var(--color-border)",
                    marginBottom: "1px",
                  }}
                >
                  {[
                    { val: "6", label: "first-author pubs" },
                    { val: "3,941", label: "forum threads analyzed" },
                    { val: "45", label: "survey respondents" },
                    { val: "17,954", label: "home sales modeled" },
                  ].map(({ val, label }) => (
                    <div
                      key={label}
                      style={{
                        background: "var(--color-surface)",
                        padding: "24px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "28px",
                          color: "var(--color-heading)",
                          lineHeight: "1",
                          marginBottom: "4px",
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "var(--color-surface)",
                    padding: "20px 24px",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--color-muted)",
                      marginBottom: "10px",
                    }}
                  >
                    PRIMARY TOOLS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "R",
                      "Python",
                      "Google Colab",
                      "VS Code",
                      "Jupyter Notebook",
                      "RStudio",
                    ].map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-accent)",
                          border: "1px solid var(--color-accent-dim)",
                          padding: "2px 8px",
                          background: "var(--color-accent-dim)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background:
                "linear-gradient(to bottom, transparent, var(--color-muted))",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        style={{
          padding: "100px 48px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel num="02" label="Selected Projects" />

          <div
            className="project-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(460px, 100%), 1fr))",
              gap: "1px",
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
            }}
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Visualizations ───────────────────────────────────────────────── */}
      <section
        id="visualizations"
        style={{
          padding: "100px 48px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel num="03" label="Selected Visualizations" />

          <VizCarousel />

          <div
            style={{
              marginTop: "28px",
              padding: "22px 24px",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 1.15fr)",
              alignItems: "center",
              gap: "24px",
            }}
            className="webpique-callout"
          >
            <div className="webpique-copy">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "7px",
                }}
              >
                Research visualization tool
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  color: "var(--color-heading)",
                  marginBottom: "6px",
                }}
              >
                WebPIQUE Visualizer
              </h3>
              <p
                style={{
                  color: "var(--color-subtle)",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                Designed and developed an interactive visualization tool for
                exploring software quality metrics from the PIQUE framework.
                Built with React, Vite, D3.js, and TypeScript, it helps users
                load, analyze, and visualize complex JSON datasets.
              </p>
              <p
                style={{
                  color: "var(--color-muted)",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  marginTop: "12px",
                  marginBottom: 0,
                }}
              >
                For more information about the tool design, see my{" "}
                <a
                  href="https://hastingsy.github.io/Design_Portfolio/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-accent)" }}
                >
                  design portfolio ↗
                </a>
                .
              </p>
              <a
                href="https://github.com/MSUSEL/WebPIQUE_visualizer"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "18px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  border: "1px solid var(--color-accent-dim)",
                  padding: "7px 14px",
                }}
              >
                View on GitHub ↗
              </a>
            </div>
            <WebPiqueCarousel />
          </div>

          <EnvironmentalDashboardCard />
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        style={{
          padding: "100px 48px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel num="04" label="Technical Skills" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="skills-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  color: "var(--color-heading)",
                  lineHeight: "1.2",
                  marginBottom: "16px",
                }}
              >
                Tools &amp; Technologies
              </h2>
              <p
                style={{
                  color: "var(--color-subtle)",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                Applied data science across research and real-world datasets,
                from data collection and feature engineering through statistical
                modeling, reproducible analysis, and research visualization.
              </p>
            </div>
            <div>
              {SKILLS.map((g) => (
                <SkillGroup key={g.category} group={g} />
              ))}
              <div style={{ borderTop: "1px solid var(--color-border)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Publications ─────────────────────────────────────────────────── */}
      <section
        id="publications"
        style={{
          padding: "100px 48px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel num="05" label="Publications" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="pubs-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  color: "var(--color-heading)",
                  lineHeight: "1.2",
                  marginBottom: "16px",
                }}
              >
                Research Output
              </h2>
              <p
                style={{
                  color: "var(--color-subtle)",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
                First-author peer-reviewed work.
              </p>
            </div>
            <div>
              {PUBLICATIONS.map((p) => (
                <PublicationRow key={p.id} pub={p} />
              ))}
              <div style={{ borderTop: "1px solid var(--color-border)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: "100px 48px 120px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel num="06" label="Contact" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  color: "var(--color-heading)",
                  lineHeight: "1.15",
                  marginBottom: "20px",
                }}
              >
                Let's build something together.
              </h2>
              <p
                style={{
                  color: "var(--color-subtle)",
                  fontSize: "15px",
                  lineHeight: "1.7",
                }}
              >
                Open to data science and analytics roles across industry and
                research. I respond within 48 hours.
              </p>
            </div>

            <div className="contact-icons">
              {[
                {
                  label: "Email",
                  icon: EmailIcon,
                  href: "mailto:yvettehastings6@gmail.com",
                },
                {
                  label: "GitHub",
                  icon: GitHubIcon,
                  href: "https://github.com/HastingsY",
                },
                {
                  label: "LinkedIn",
                  icon: LinkedInIcon,
                  href: "https://www.linkedin.com/in/yvette-hastings-2a47231b/",
                },
                {
                  label: "Google Scholar",
                  icon: SchoolIcon,
                  href: "https://scholar.google.com/citations?user=W4FhoM8AAAAJ&hl=en",
                },
              ].map(({ label, icon, href }) => (
                (() => {
                  const Icon = icon;
                  return (
                    <a
                      key={label}
                      className="contact-icon-link"
                      href={href}
                      target={label === "Email" ? undefined : "_blank"}
                      rel={label === "Email" ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      title={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  );
                })()
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "24px 48px",
        }}
      >
        <div
          style={{ maxWidth: "1100px", margin: "0 auto" }}
          className="flex items-center justify-center"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-muted)",
            }}
          >
            © 2026 Yvette D. Hastings
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
              padding: "2px 7px",
            }}
          >
            {pub.status}
          </span>
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollLine {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }

        .hero-action {
          display: inline-block;
          padding: 10px 24px;
          border: 1px solid var(--color-accent);
          background: var(--color-accent);
          color: var(--color-bg);
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .hero-action:hover {
          opacity: 0.85;
        }

        .hero-action:active {
          opacity: 0.7;
          transform: translateY(1px);
        }

        .contact-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .contact-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid var(--color-border);
          color: var(--color-accent);
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s ease, border-color 0.15s ease,
            color 0.15s ease, transform 0.15s ease;
        }

        .contact-icon-link:hover,
        .contact-icon-link:focus-visible {
          background: var(--color-accent-dim);
          border-color: var(--color-accent);
          color: var(--color-heading);
          transform: translateY(-2px);
        }

        .contact-icon-link:active {
          transform: translateY(0);
        }

        .webpique-carousel {
          min-width: 0;
        }

        .environmental-dashboard-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 1.15fr);
          align-items: center;
          gap: 24px;
          margin-top: 20px;
          padding: 22px 24px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
        }

        .environmental-dashboard-image {
          all: unset;
          position: relative;
          display: block;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
          cursor: zoom-in;
        }

        .environmental-dashboard-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: top;
          transition: transform 0.3s ease;
        }

        .environmental-dashboard-image:hover img {
          transform: scale(1.02);
        }

        .webpique-image-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          background: var(--color-surface-2);
          border: 1px solid var(--color-border);
        }

        .webpique-image-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .webpique-image-button {
          all: unset;
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          cursor: zoom-in;
        }

        .webpique-image-button img {
          transition: transform 0.3s ease;
        }

        .webpique-image-button:hover img {
          transform: scale(1.02);
        }

        .webpique-expand-label {
          position: absolute;
          right: 10px;
          bottom: 10px;
          padding: 2px 8px;
          background: var(--color-accent);
          color: var(--color-bg);
          font-family: var(--font-mono);
          font-size: 10px;
        }

        .webpique-lightbox {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.9);
          cursor: zoom-out;
        }

        .webpique-lightbox img {
          max-width: 92vw;
          max-height: 88vh;
          object-fit: contain;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
        }

        .webpique-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: none;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 16px;
          cursor: pointer;
        }

        .webpique-carousel-button {
          position: absolute;
          top: 50%;
          width: 30px;
          height: 30px;
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          color: var(--color-heading);
          font-family: var(--font-mono);
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          transform: translateY(-50%);
          opacity: 0.9;
        }

        .webpique-carousel-button:hover {
          background: var(--color-accent);
          color: var(--color-bg);
        }

        .webpique-carousel-previous { left: 10px; }
        .webpique-carousel-next { right: 10px; }

        .webpique-carousel-dots {
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 10px;
        }

        .webpique-carousel-dots button {
          width: 6px;
          height: 6px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: var(--color-border);
          cursor: pointer;
        }

        .webpique-carousel-dots button.active {
          width: 18px;
          border-radius: 3px;
          background: var(--color-accent);
        }

        @media (max-width: 960px) {
          .hero-grid,
          .skills-grid,
          .pubs-grid,
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          nav { padding-left: 24px !important; padding-right: 24px !important; }
          section { padding: 72px 24px !important; }
          section#about { min-height: auto; padding-top: 104px !important; padding-bottom: 72px !important; }
          nav > div { padding-left: 0 !important; padding-right: 0 !important; }
          .mobile-menu { padding: 16px 0 24px !important; }
          .hero-grid { gap: 40px !important; }
          .hero-grid h1 { font-size: clamp(36px, 11vw, 52px) !important; }
          .hero-grid h2 { font-size: 20px !important; }
          .hero-grid p { font-size: 14px !important; margin-bottom: 28px !important; }
          .project-grid { grid-template-columns: 1fr !important; }
          .project-grid > div { min-width: 0; }
          .project-grid > div > div { padding: 22px 20px !important; }
          .viz-slide { min-width: 100% !important; }
          .viz-slide img { height: 190px !important; }
          .skills-grid, .pubs-grid, .contact-grid { gap: 40px !important; }
          .webpique-callout, .environmental-dashboard-card { grid-template-columns: 1fr !important; align-items: start !important; gap: 18px !important; }
        }
      `}</style>
    </div>
  );
}
