import { useState, useEffect, useRef } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Projects', 'Visualizations', 'Skills', 'Publications', 'Contact']

const PROJECTS = [
  {
    id: '01',
    title: 'Gallatin County Housing Price Prediction',
    description:
      'Multi-method regression analysis of 17,954 single-family home sales in Gallatin County, MT. Evaluated simple and multiple linear regression, forward subset selection, Ridge/Lasso regularization, PCR, non-linear models, Self-Organizing Maps, and Random Forest classification to identify key price drivers — location and school quality emerged as the strongest predictors.',
    tags: ['Python', 'Random Forest', 'PCR', 'Ridge/Lasso', 'EDA'],
    year: '2024',
    link: '/Mini_Project_2_report.pdf',
    pdfLabel: 'View Report',
    accent: true,
  },
  {
    id: '02',
    title: 'Mining User Forums to Evaluate Software Quality-in-Use',
    description:
      'NLP pipeline for evaluating software quality-in-use (QIU) of reactive transport modeling (RTM) software by systematically analyzing 3,941 forum threads from four RTM user communities. Applied unigram/trigram analysis and a manually validated ISO/IEC 25019:2023-grounded keyword dictionary to quantify QIU subcharacteristic frequencies. Usability dominated at 68% of threads.',
    tags: ['R', 'NLP', 'quanteda', 'Web Scraping', 'Mixed-effects Modeling'],
    year: '2026',
    link: '/Hastings_et_al._2026_-_Mining_User_Forums_to_Evaluate_QIU.pdf',
    pdfLabel: 'View Paper',
    accent: false,
  },
  {
    id: '03',
    title: 'Green Infrastructure Microbial Response to Pulse Precipitation Events',
    description:
      'Examined plant diversity and soil physiochemistry as drivers of microbial community physiology and soil nitrogen dynamics following simulated precipitation pulses in semi-arid stormwater green infrastructure (SGI) bioswales and a montane meadow. Water pulses elevated soil moisture and pH, stimulated ecoenzyme activity, and increased organic matter and N pools — but microbial growth remained static and N assimilation into biomass was limited. Found that SGI ecological function is broadly comparable to neighboring natural vegetated systems when soil media and water availability are similar.',
    tags: ['R', 'Piecewise SEM', 'Causal Inference', 'Soil Ecology', 'Ecoenzymes'],
    year: '2024',
    link: 'https://www.mdpi.com/2073-4441/16/13/1931',
    pdfLabel: 'View Paper',
    accent: false,
  },
  {
    id: '04',
    title: 'Barriers to Use: User Survey of Environmental Research Software',
    description:
      'Designed and distributed an ISO/IEC 25019:2023-aligned questionnaire to 45 environmental scientists to empirically identify QIU barriers in research software. Found that Accessibility, Suitability, and Experience subcharacteristics represent the most significant adoption barriers — associated with steep learning curves, programming environment requirements, and reliance on third-party tools.',
    tags: ['R', 'Survey Design', 'Qualtrics', 'Non-parametric Stats', 'Data Analysis'],
    year: '2026',
    link: '/Hastings_et_al._2026_-_Barriers_to_Use_perspectives_on_environmental_research_software.pdf',
    pdfLabel: 'View Paper',
    accent: false,
  },
]

const SKILLS = [
  { category: 'Languages', items: ['R', 'Python', 'SQL'] },
  { category: 'ML / Stats', items: ['Random Forest', 'Regression', 'PCR', 'Causal Inference', 'Non-parametric Tests'] },
  { category: 'NLP', items: ['Text Mining', 'Lexicon Dev.', 'Sentiment Analysis', 'n-gram Analysis'] },
  { category: 'Data Collect.', items: ['Web Scraping (rvest & BeautifulSoup)', 'Survey Design', 'Qualtrics', 'API Integration'] },
  { category: 'Visualization', items: ['ggplot2', 'matplotlib', 'plotly', 'Draw.io'] },
  { category: 'Version Control', items: ['Zenodo', 'Git', 'GitHub', 'GitLab'] },
  { category: 'Documentation', items: ['R Markdown', 'Jupyter Notebook', 'LaTeX'] },
]

const PUBLICATIONS = [
  {
    id: 'P1',
    title: 'Applying Software Quality in Use Standards to Improve Scientific Software Selection',
    venue: 'Works in Progress in Embedded Computing (WIPIEC) Journal',
    doi: null,
    year: '2023',
    pdfLink: 'https://wipiec.digitalheritage.me/index.php/wipiecjournal/article/view/42',
    doiLink: null,
  },
  {
    id: 'P2',
    title: 'Green Infrastructure Microbial Community Response to Simulated Pulse Precipitation Events in the Semi-Arid Western United States',
    venue: 'Water · MDPI (Vol. 16, No. 13)',
    doi: '10.3390/w16131931',
    year: '2024',
    pdfLink: 'https://www.mdpi.com/2073-4441/16/13/1931',
    doiLink: 'https://doi.org/10.3390/w16131931',
  },
  {
    id: 'P3',
    title: 'Mining User Forums to Evaluate Quality-in-Use of Environmental Software',
    venue: 'IEEE SoutheastCon 2026',
    doi: '10.1109/SOUTHEASTCON63549.2026.11476204',
    year: '2026',
    pdfLink: '/Hastings_et_al._2026_-_Mining_User_Forums_to_Evaluate_QIU.pdf',
    doiLink: 'https://doi.org/10.1109/SOUTHEASTCON63549.2026.11476204',
  },
  {
    id: 'P4',
    title: 'Barriers to Use: Perspectives on Environmental Research Software',
    venue: 'ICSOFT 2026 — 21st International Conference on Software Technologies',
    doi: '10.5220/0015086680000408',
    year: '2026',
    pdfLink: '/Hastings_et_al._2026_-_Barriers_to_Use_perspectives_on_environmental_research_software.pdf',
    doiLink: 'https://doi.org/10.5220/0015086680000408',
  },
  {
    id: 'P5',
    title: 'From Standards to Practice: A Position on Challenges in Operationalizing Software Quality-in-Use',
    venue: 'Proceedings of the 21st International Conference on Evaluation of Novel Approaches to Software Engineering (ENASE)',
    doi: '10.5220/0014925900004015',
    year: '2026',
    pdfLink: null,
    doiLink: 'https://doi.org/10.5220/0014925900004015',
  },
  {
    id: 'P6',
    title: 'Software Quality-in-Use: A Systematic Literature Review',
    venue: '2026 Intermountain Engineering, Technology and Computing (IETC)',
    doi: '10.1109/IETC69527.2026.11568664',
    year: '2026',
    pdfLink: null,
    doiLink: 'https://doi.org/10.1109/IETC69527.2026.11568664',
  },
]

const VISUALIZATIONS = [
  {
    id: 'V1',
    title: 'Random Forest: Top 15 Most Important Features',
    caption:
      'Feature importance rankings from the Random Forest model predicting Gallatin County home prices. Bathrooms and lot size dominate by a wide margin; geographic encoding (Big Sky, latitude/longitude) and school rating follow, confirming that location and amenities drive price more than structural age or bedroom count.',
    project: 'Gallatin County Housing Price Prediction',
    tags: ['Python', 'Random Forest', 'Feature Importance'],
    src: '/random_forest_most_important_features.png',
    alt: 'Horizontal bar chart of the top 15 most important features in a random forest model predicting home prices, led by bathrooms and lot size.',
  },
  {
    id: 'V2',
    title: 'Correlation Heatmap: Housing Feature Relationships',
    caption:
      'Full pairwise Pearson correlation matrix across all 25 numeric and one-hot encoded features in the Gallatin County housing dataset. Strong positive correlations emerge between city and school encodings (collinear by geography), while bathrooms and living area correlate most with price.',
    project: 'Gallatin County Housing Price Prediction',
    tags: ['Python', 'EDA', 'Correlation', 'Heatmap'],
    src: '/housing_correlation_with_heatmap.png',
    alt: 'Annotated correlation heatmap of 25 housing features, colored from dark (negative) to light (positive) with numeric coefficients in each cell.',
  },
  {
    id: 'V3',
    title: '2D PCA with Feature Loadings',
    caption:
      'Principal component biplot for Gallatin County housing data. PC1 (26% variance) separates homes along a size/amenity axis; PC2 (20%) captures geographic north–south gradient driven by latitude. Red arrows reveal that longitude and latitude pull orthogonally, while bathrooms, lot size, and year built cluster together.',
    project: 'Gallatin County Housing Price Prediction',
    tags: ['Python', 'PCA', 'Dimensionality Reduction', 'Biplot'],
    src: '/housing_PCA.png',
    alt: '2D PCA scatter plot of housing observations with red feature loading arrows, showing PC1 and PC2 axes and labeled feature vectors.',
  },
  {
    id: 'V4',
    title: 'Party Activity Trends, 2009–2014',
    caption:
      '30-day moving average of parties per day scraped from the New York Social Diary website (newyorksocialdiary.com) between 2009 and 2014. Event data was extracted using BeautifulSoup and parsed to compute daily party counts. Peak activity is annotated in the 2010–2011 window; a low-activity period emerges in 2014.',
    project: 'New York Social Diary Web Scraping',
    tags: ['Python', 'BeautifulSoup', 'Web Scraping', 'Time Series'],
    src: '/party_trends.png',
    alt: 'Line chart of 30-day moving average party frequency from 2009 to 2014 scraped from the New York Social Diary, with annotated peak and low activity regions.',
  },
  {
    id: 'V5',
    title: 'Treatment Similarity Network Across Sampling Periods',
    caption:
      'Similarity network comparing plant treatment groups across sampling periods in a stormwater green infrastructure study. Node color encodes treatment × vegetation combination; edge weight reflects multivariate genomic similarity. Reveals how plant diversity treatments diverge and converge in microbial community composition over time.',
    project: 'Green Infrastructure Genomic Diversity · In Preparation',
    tags: ['R', 'Network Analysis', 'Multivariate', 'Genomics'],
    src: '/similarity_plot.jpeg',
    alt: 'Circular network diagram with nodes colored by soil treatment group and sampling period, and edges scaled by multivariate similarity.',
  },
  {
    id: 'V6',
    title: 'Bivariate Choropleth: Female Renters Across U.S. Counties',
    caption:
      'County-level bivariate map jointly encoding the percentage of female residents and the percentage of renters. The two-variable color scheme reveals geographic clustering — dense urban counties in the South and East show high renter rates regardless of gender composition, while rural Western counties skew toward low-female, low-renter profiles.',
    project: 'Geographic Data Analysis',
    tags: ['ArcGIS', 'Choropleth', 'Bivariate Map', 'Spatial Analysis'],
    src: '/Layout.jpg',
    alt: 'Bivariate choropleth map of the United States showing percentage of female residents and percentage of renters by county using a blue-green color matrix.',
  },
  {
    id: 'V8',
    title: 'Gradient Boosting Regressor: Actual vs. Predicted Financial Loss',
    caption:
      'Model validation scatter plot from a Gradient Boosting Regressor predicting financial loss from cybersecurity incidents (in millions USD), produced as part of a team class project. Illustrates the actual vs. predicted evaluation framework against a perfect prediction reference line.',
    project: 'Cybersecurity Incident Financial Loss Analysis',
    tags: ['Python', 'Gradient Boosting', 'Regression', 'Model Validation'],
    src: '/actual_vs_predicted_financial_loss_due_to_cyber_incidents.png',
    alt: 'Scatter plot of actual versus predicted financial loss in millions of dollars from a gradient boosting regressor, with a dashed red perfect prediction line.',
  },
  {
    id: 'V7',
    title: 'Piecewise SEM: Nitrogen Cycling Causal Structure',
    caption:
      'Piecewise structural equation model (September 2020) tracing causal pathways from precipitation-driven soil moisture through organic matter, microbial biomass C:N, ecoenzyme activity (LAP, AP, BG, POX), and proteolysis to inorganic nitrogen pools in semi-arid SGI bioswales. Path width encodes coefficient magnitude. Results show organic matter content — mediated by ecoenzyme expression and C:N:P stoichiometry — as the primary proximate driver of soil N concentrations.',
    project: 'Green Infrastructure Microbial Response · M.S. Geography, University of Utah',
    tags: ['R', 'Draw.io', 'Piecewise SEM', 'Causal Inference'],
    src: '/causal_diagram.png',
    alt: 'Directed acyclic graph showing causal pathways between soil moisture, organic matter, microbial biomass, soil enzymes, and inorganic nitrogen in September 2020.',
  },
]

// ─── Components ─────────────────────────────────────────────────────────────

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', fontSize: '13px' }}
        className="tracking-widest"
      >
        {num}
      </span>
      <div style={{ width: '40px', height: '1px', background: 'var(--color-border)' }} />
      <span
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-subtle)', fontSize: '13px' }}
        className="uppercase tracking-widest"
      >
        {label}
      </span>
    </div>
  )
}

function VizCard({
  viz,
  onExpand,
}: {
  viz: (typeof VISUALIZATIONS)[0]
  onExpand: () => void
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
        width: '100%',
      }}
    >
      <button
        onClick={onExpand}
        aria-label={`Expand: ${viz.title}`}
        style={{
          all: 'unset',
          cursor: 'zoom-in',
          display: 'block',
          background: 'var(--color-surface-2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={viz.src}
          alt={viz.alt}
          style={{
            width: '100%',
            height: '260px',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-bg)',
            background: 'var(--color-accent)',
            padding: '2px 8px',
          }}
        >
          expand ↗
        </div>
      </button>

      <div style={{ padding: '18px 22px 22px', flex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '7px',
          }}
        >
          {viz.id} — {viz.project}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--color-heading)',
            lineHeight: '1.35',
            marginBottom: '9px',
          }}
        >
          {viz.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--color-subtle)',
            lineHeight: '1.65',
            marginBottom: '14px',
          }}
        >
          {viz.caption}
        </p>
        <div className="flex flex-wrap gap-2">
          {viz.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-subtle)',
                border: '1px solid var(--color-border)',
                padding: '2px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function VizCarousel() {
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)
  const perPage = 2
  const total = VISUALIZATIONS.length
  const maxIndex = total - perPage

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div>
      {/* Track */}
      <div style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div
            style={{
              display: 'flex',
              transform: `translateX(calc(-${index * (100 / perPage)}%))`,
              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              gap: '0px',
            }}
          >
            {VISUALIZATIONS.map((viz, i) => (
              <div
                key={viz.id}
                style={{
                  minWidth: `${100 / perPage}%`,
                  borderRight: i < total - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <VizCard viz={viz} onExpand={() => setExpanded(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between" style={{ marginTop: '16px' }}>
        {/* Dot indicators */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === index ? 'var(--color-accent)' : 'var(--color-border)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.2s ease, background 0.2s ease',
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
              fontFamily: 'var(--font-mono)',
              fontSize: '32px',
              background: 'none',
              border: 'none',
              color: index === 0 ? 'var(--color-border)' : 'var(--color-accent)',
              width: '52px',
              height: '52px',
              cursor: index === 0 ? 'default' : 'pointer',
              transition: 'border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (index !== 0) {
                const el = e.currentTarget as HTMLButtonElement
                el.style.color = 'var(--color-heading)'
                el.style.transform = 'scale(1.2)'
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.color = index === 0 ? 'var(--color-border)' : 'var(--color-accent)'
              el.style.transform = 'scale(1)'
            }}
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '32px',
              background: 'none',
              border: 'none',
              color: index >= maxIndex ? 'var(--color-border)' : 'var(--color-accent)',
              width: '52px',
              height: '52px',
              cursor: index >= maxIndex ? 'default' : 'pointer',
              transition: 'color 0.15s, transform 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              if (index < maxIndex) {
                const el = e.currentTarget as HTMLButtonElement
                el.style.color = 'var(--color-heading)'
                el.style.transform = 'scale(1.2)'
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.color = index >= maxIndex ? 'var(--color-border)' : 'var(--color-accent)'
              el.style.transform = 'scale(1)'
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
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={VISUALIZATIONS[expanded].src}
            alt={VISUALIZATIONS[expanded].alt}
            style={{
              maxWidth: '92vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '16px',
              maxWidth: '640px',
              textAlign: 'center',
              lineHeight: '1.6',
            }}
          >
            {VISUALIZATIONS[expanded].title}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(null) }}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: hovered ? 'var(--color-surface-2)' : 'var(--color-surface)',
        borderLeft: project.accent ? `3px solid var(--color-accent)` : '1px solid var(--color-border)',
        padding: '28px 32px',
        transition: 'background 0.18s ease',
        position: 'relative',
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-muted)',
          }}
        >
          {project.id} — {project.year}
        </span>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-heading)',
          fontSize: '20px',
          marginBottom: '10px',
          lineHeight: '1.3',
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          color: 'var(--color-subtle)',
          fontSize: '14px',
          lineHeight: '1.65',
          marginBottom: '20px',
        }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.accent ? 'var(--color-accent)' : 'var(--color-subtle)',
              background: project.accent ? 'var(--color-accent-dim)' : 'transparent',
              border: `1px solid ${project.accent ? 'var(--color-accent-dim)' : 'var(--color-border)'}`,
              padding: '2px 8px',
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
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          border: '1px solid var(--color-accent-dim)',
          padding: '5px 14px',
          display: 'inline-block',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--color-accent-dim)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
      >
        {project.pdfLabel} ↗
      </a>
    </div>
  )
}

function SkillGroup({ group }: { group: (typeof SKILLS)[0] }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <div className="flex gap-8 items-baseline">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-muted)',
            width: '80px',
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
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-text)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PublicationRow({ pub }: { pub: (typeof PUBLICATIONS)[0] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr',
        gap: '16px 24px',
        borderTop: '1px solid var(--color-border)',
        padding: '24px 0',
        alignItems: 'start',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-muted)',
          paddingTop: '3px',
        }}
      >
        {pub.id}
      </span>
      <div>
        <p
          style={{
            color: 'var(--color-text)',
            fontSize: '15px',
            marginBottom: '8px',
            lineHeight: '1.5',
          }}
        >
          {pub.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-accent)',
            }}
          >
            {pub.venue}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-muted)',
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
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              border: '1px solid var(--color-accent-dim)',
              padding: '3px 10px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--color-accent-dim)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
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
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-subtle)',
              textDecoration: 'none',
              border: '1px solid var(--color-border)',
              padding: '3px 10px',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--color-subtle)'
              el.style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--color-border)'
              el.style.color = 'var(--color-subtle)'
            }}
          >
            DOI ↗
          </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--color-nav-scrolled)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 0.25s, border-color 0.25s',
        padding: '0 48px',
      }}
    >
      <div
        style={{ maxWidth: '1100px', margin: '0 auto', height: '60px' }}
        className="flex items-center justify-between"
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-accent)',
            letterSpacing: '0.05em',
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
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-subtle)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--color-text)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--color-subtle)')
              }
            >
              {link}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'var(--color-subtle)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              transition: 'border-color 0.15s, color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--color-subtle)'
              el.style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--color-border)'
              el.style.color = 'var(--color-subtle)'
            }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'var(--color-subtle)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
            }}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
            }}
          >
            {open ? '✕' : '≡'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '16px 48px 24px',
          }}
          className="md:hidden flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--color-subtle)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Subtle animated grid in hero
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let animId: number

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx!.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const step = 40
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      ctx.strokeStyle = isLight ? 'rgba(100,110,150,0.12)' : 'rgba(74,80,104,0.18)'
      ctx.lineWidth = 1

      for (let x = 0; x < w + step; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h + step; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Animated accent dot
      const t = frame * 0.008
      const cx = w * 0.72 + Math.sin(t * 1.3) * 30
      const cy = h * 0.42 + Math.cos(t) * 20
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180)
      grad.addColorStop(0, isLight ? 'rgba(0,122,82,0.08)' : 'rgba(79,255,176,0.12)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, 180, 0, Math.PI * 2)
      ctx.fill()

      frame++
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '80px 48px 60px',
          overflow: 'hidden',
        }}
      >
        {/* Topographic map background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?w=1800&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: theme === 'dark' ? 0.45 : 0.18,
            filter: theme === 'dark'
              ? 'sepia(0.8) hue-rotate(110deg) saturate(5) brightness(0.7)'
              : 'sepia(0.6) hue-rotate(110deg) saturate(4) brightness(1.05)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        {/* Gradient fade to page bg at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, var(--color-bg) 100%)`,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
            <div className="flex items-center gap-3 mb-8">
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    boxShadow: '0 0 12px var(--color-accent)',
                    animation: 'pulse 2.4s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--color-accent)',
                    letterSpacing: '0.12em',
                  }}
                >
                  OPEN TO OPPORTUNITIES
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(42px, 5vw, 68px)',
                  color: 'var(--color-heading)',
                  lineHeight: '1.08',
                  marginBottom: '6px',
                }}
              >
                Yvette D. Hastings
              </h1>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(18px, 2vw, 28px)',
                  color: 'var(--color-subtle)',
                  lineHeight: '1.2',
                  marginBottom: '28px',
                }}
              >
                Data Scientist · M.S. Computer Science &amp; Geography
              </h2>

              <p
                style={{
                  color: 'var(--color-subtle)',
                  fontSize: '15px',
                  lineHeight: '1.75',
                  maxWidth: '460px',
                  marginBottom: '40px',
                }}
              >
                I analyze complex datasets to uncover patterns and drive decisions — working across
                environmental science, real estate, and software usability domains. My M.S. in
                Computer Science from Montana State University focused on NLP and statistical analysis
                for empirical software engineering research. My M.S. in Geography from the University
                of Utah applied statistical and causal analysis to investigate nitrogen cycling
                dynamics in soil systems. Both programs included coursework applying ML and statistical
                methods to diverse datasets.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-bg)',
                    background: 'var(--color-accent)',
                    padding: '10px 24px',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
                >
                  View Projects
                </a>
                <a
                  href="#publications"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '10px 24px',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.borderColor = 'var(--color-subtle)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.borderColor = 'var(--color-border)')
                  }
                >
                  Publications ↓
                </a>
                <a
                  href="/Hastings_Resume_data_scientist.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '10px 24px',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.borderColor = 'var(--color-subtle)')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.borderColor = 'var(--color-border)')
                  }
                >
                  Resume ↗
                </a>
              </div>
            </div>

          {/* Right: stats panel */}
          <div>
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '32px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1px',
                  background: 'var(--color-border)',
                  marginBottom: '1px',
                }}
              >
                {[
                  { val: '6', label: 'first-author pubs' },
                  { val: '3,941', label: 'forum threads analyzed' },
                  { val: '45', label: 'survey respondents' },
                  { val: '17,954', label: 'home sales modeled' },
                ].map(({ val, label }) => (
                  <div key={label} style={{ background: 'var(--color-surface)', padding: '24px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        color: 'var(--color-heading)',
                        lineHeight: '1',
                        marginBottom: '4px',
                      }}
                    >
                      {val}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: 'var(--color-surface)',
                  padding: '20px 24px',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-muted)',
                    marginBottom: '10px',
                  }}
                >
                  PRIMARY TOOLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {['R', 'Python', 'Google Colab', 'VS Code', 'Jupyter Notebook', 'RStudio'].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-accent-dim)',
                        padding: '2px 8px',
                        background: 'var(--color-accent-dim)',
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
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              background:
                'linear-gradient(to bottom, transparent, var(--color-muted))',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        style={{
          padding: '100px 48px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel num="02" label="Selected Projects" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
              gap: '1px',
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
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
          padding: '100px 48px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel num="03" label="Visualizations" />

          <VizCarousel />
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section
        id="skills"
        style={{
          padding: '100px 48px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel num="04" label="Technical Skills" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '80px',
              alignItems: 'start',
            }}
            className="skills-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: 'var(--color-heading)',
                  lineHeight: '1.2',
                  marginBottom: '16px',
                }}
              >
                Tools &amp; Technologies
              </h2>
              <p style={{ color: 'var(--color-subtle)', fontSize: '14px', lineHeight: '1.7' }}>
                Five years building across the full data stack — from feature engineering to production
                inference systems and interactive dashboards.
              </p>
            </div>
            <div>
              {SKILLS.map((g) => (
                <SkillGroup key={g.category} group={g} />
              ))}
              <div style={{ borderTop: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Publications ─────────────────────────────────────────────────── */}
      <section
        id="publications"
        style={{
          padding: '100px 48px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel num="05" label="Publications" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '80px',
              alignItems: 'start',
            }}
            className="pubs-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: 'var(--color-heading)',
                  lineHeight: '1.2',
                  marginBottom: '16px',
                }}
              >
                Research Output
              </h2>
              <p style={{ color: 'var(--color-subtle)', fontSize: '14px', lineHeight: '1.7' }}>
                First-author peer-reviewed work.
              </p>
            </div>
            <div>
              {PUBLICATIONS.map((p) => (
                <PublicationRow key={p.id} pub={p} />
              ))}
              <div style={{ borderTop: '1px solid var(--color-border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: '100px 48px 120px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel num="06" label="Contact" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'start',
            }}
            className="contact-grid"
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  color: 'var(--color-heading)',
                  lineHeight: '1.15',
                  marginBottom: '20px',
                }}
              >
                Let's build something together.
              </h2>
              <p style={{ color: 'var(--color-subtle)', fontSize: '15px', lineHeight: '1.7' }}>
                Open to data science and analytics roles across industry and research. I respond within 48 hours.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Email', value: 'yvettehastings6@gmail.com', href: 'mailto:yvettehastings6@gmail.com' },
                { label: 'GitHub', value: 'github.com/HastingsY', href: 'https://github.com/HastingsY' },
                { label: 'LinkedIn', value: 'linkedin.com/in/yvette-hastings-2a47231b', href: 'https://www.linkedin.com/in/yvette-hastings-2a47231b/' },
                { label: 'Google Scholar', value: 'scholar.google.com/citations?user=W4FhoM8AAAAJ', href: 'https://scholar.google.com/citations?user=W4FhoM8AAAAJ&hl=en' },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid var(--color-border)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--color-subtle)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--color-border)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--color-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {value} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: '24px 48px',
        }}
      >
        <div
          style={{ maxWidth: '1100px', margin: '0 auto' }}
          className="flex items-center justify-center"
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-muted)',
            }}
          >
            © 2026 Yvette D. Hastings
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollLine {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
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
          section { padding-left: 24px !important; padding-right: 24px !important; }
          nav > div { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </div>
  )
}
