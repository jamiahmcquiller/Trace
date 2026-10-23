import { useState } from "react"

const A = "/assets"

type Screen =
  | "sign-in"
  | "create-account"
  | "home"
  | "map"
  | "replay"
  | "feed-history"
  | "filters"
  | "results"
  | "details"
  | "alerts"
  | "activity"
  | "profile"
  | "incident-notification"
  | "notification-settings"
  | "radius-settings"
  | "safety-zones"
  | "share-incident"
  | "incident-audio"
  | "my-alerts"
  | "location-search"
type Category = "All" | "Theft" | "Assault" | "Vehicle Crime" | "Burglary" | "Other"
type View = "map" | "list"

const categories: Category[] = [
  "All",
  "Theft",
  "Assault",
  "Vehicle Crime",
  "Burglary",
  "Other",
]

const incidents = [
  {
    id: "DEMO-001",
    category: "Theft" as Category,
    title: "Theft · Sample report",
    place: "Near Thompson Library",
    time: "Oct 14, 2026 · 2:15 PM",
    distance: "≈ 0.1 mi",
  },
  {
    id: "DEMO-002",
    category: "Vehicle Crime" as Category,
    title: "Vehicle crime · Sample report",
    place: "Near University Pavilion",
    time: "Oct 14, 2026 · 1:40 PM",
    distance: "≈ 0.2 mi",
  },
]

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <img src={`${A}/phase-logo.png`} alt="" />
      <strong>PHASE</strong>
    </div>
  )
}

function Header({
  back,
  onBack,
  navigate,
}: {
  back?: string
  onBack?: () => void
  navigate?: (screen: Screen) => void
}) {
  if (back) {
    return (
      <header className="subheader">
        <button
          className="back-button"
          onClick={onBack}
          aria-label={`Back to ${back}`}
        >
          <img src={`${A}/1aa39.svg`} alt="" />
          <span>{back}</span>
        </button>
        <Brand compact />
      </header>
    )
  }

  return (
    <header className="app-header">
      <Brand />
      <div className="header-actions">
        <button
          className="icon-button"
          onClick={() => navigate?.("alerts")}
          aria-label="Open alerts"
        >
          <img src={`${A}/6a748.svg`} alt="" />
        </button>
        <button
          className="icon-button"
          onClick={() => navigate?.("profile")}
          aria-label="Open profile"
        >
          <img src={`${A}/d7544.svg`} alt="" />
        </button>
      </div>
    </header>
  )
}

function BottomNav({
  active,
  navigate,
}: {
  active: "home" | "map" | "replay" | "alerts" | "profile"
  navigate: (screen: Screen) => void
}) {
  const items = [
    {
      key: "home",
      label: "Home",
      icon: active === "home" ? "79683.svg" : "efeae.svg",
      screen: "home",
    },
    {
      key: "map",
      label: "Map",
      icon: active === "map" ? "3ebda.svg" : "b94b2.svg",
      screen: "map",
    },
    {
      key: "replay",
      label: "Replay",
      mark: "▶",
      screen: "replay",
    },
    {
      key: "alerts",
      label: "Notifications",
      icon: "157b0.svg",
      screen: "alerts",
    },
    { key: "profile", label: "Me", icon: "f58f1.svg", screen: "profile" },
  ] as const

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => (
        <button
          key={item.key}
          className={
            active === item.key ? "nav-item nav-item--active" : "nav-item"
          }
          onClick={() => navigate(item.screen)}
          aria-current={active === item.key ? "page" : undefined}
        >
          {"icon" in item ? (
            <img src={`${A}/${item.icon}`} alt="" />
          ) : (
            <span className="nav-replay-mark">{item.mark}</span>
          )}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function Filters({
  selected,
  onSelect,
}: {
  selected: Category
  onSelect: (category: Category) => void
}) {
  return (
    <div className="filters" aria-label="Crime category filters">
      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? "chip chip--selected" : "chip"}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

function CampusMap({
  compact = false,
  showTwo = false,
  onMarker,
  onSecondMarker,
}: {
  compact?: boolean
  showTwo?: boolean
  onMarker?: () => void
  onSecondMarker?: () => void
}) {
  return (
    <div
      className={`campus-map ${compact ? "campus-map--compact" : ""}`}
      aria-label="Illustrative map of the UM-Flint test area"
    >
      <div className="map-block map-block--campus" />
      <div className="map-block map-block--west" />
      <div className="map-block map-block--south1" />
      <div className="map-block map-block--south2" />
      <div className="map-block map-block--south3" />
      <img className="road road--river" src={`${A}/45870.svg`} alt="" />
      <img className="road road--saginaw" src={`${A}/67ceb.svg`} alt="" />
      <img className="road road--harrison" src={`${A}/67ceb.svg`} alt="" />
      <img className="road road--kearsley" src={`${A}/d7d02.svg`} alt="" />
      <img className="road road--first" src={`${A}/d7d02.svg`} alt="" />
      <img className="road road--boulevard" src={`${A}/bd124.svg`} alt="" />
      <img className="road road--campus" src={`${A}/7b2c3.svg`} alt="" />
      <div className="building building--pavilion">
        <span>
          University
          <br />
          Pavilion
        </span>
      </div>
      <div className="building building--library">
        <span>
          Thompson
          <br />
          Library
        </span>
      </div>
      <div className="building building--french" />
      <div className="building building--murchie">
        <span>
          Murchie
          <br />
          Science
        </span>
      </div>
      <span className="map-label map-label--river">Flint River</span>
      <span className="map-label map-label--campus">UM-FLINT</span>
      <span className="map-label map-label--kearsley">E KEARSLEY ST</span>
      <span className="map-badge">UM-FLINT · TEST AREA</span>
      <span className="north">N ↑</span>
      <div className="accuracy">
        <img src={`${A}/78409.svg`} alt="" />
      </div>
      <div className="current-location">
        <img src={`${A}/e5093.svg`} alt="" />
      </div>
      <button
        className="marker marker--one"
        onClick={onMarker}
        aria-label="Open theft incident DEMO-001"
      >
        <img src={`${A}/52516.svg`} alt="" />
        <span>1</span>
      </button>
      {showTwo && (
        <button
          className="marker marker--two"
          onClick={onSecondMarker}
          aria-label="Vehicle crime incident DEMO-002"
        >
          <img src={`${A}/52516.svg`} alt="" />
          <span>2</span>
        </button>
      )}
      <div className="zoom" aria-hidden="true">
        <span>+</span>
        <i />
        <span>−</span>
      </div>
      <span className="map-disclosure">Demo location · Campus test area</span>
    </div>
  )
}

function PrototypeLabel() {
  return (
    <p className="prototype-label">
      <span />
      Prototype data · Not live or verified
    </p>
  )
}

function IncidentCard({
  compact = false,
  incident = incidents[0],
  onOpen,
}: {
  compact?: boolean
  incident?: typeof incidents[number]
  onOpen: () => void
}) {
  return (
    <button
      className={`incident-card ${compact ? "incident-card--compact" : ""}`}
      onClick={onOpen}
    >
      {compact && (
        <span className="category-icon">
          <img src={`${A}/02ea7.svg`} alt="" />
        </span>
      )}
      <span className="incident-copy">
        {!compact && (
          <span className="eyebrow">
            {incident.category.toUpperCase()} · {incident.id}
          </span>
        )}
        <strong>{incident.title}</strong>
        {!compact && <span>{incident.place}</span>}
        <small>
          {incident.time} · {incident.distance}
        </small>
      </span>
      <img className="chevron" src={`${A}/22de5.svg`} alt="" />
    </button>
  )
}

function HomeFeedCard({
  incident,
  onOpen,
  onFeedback,
  onShare,
}: {
  incident: {
    id: string
    category: string
    time: string
    headline: string
    place: string
    distance: string
    media?: boolean
  }
  onOpen: () => void
  onFeedback: () => void
  onShare: () => void
}) {
  return (
    <article className="home-feed-card">
      <div className="home-feed-meta">
        <span>{incident.category.toUpperCase()} · SAMPLE</span>
        <small>{incident.time}</small>
      </div>
      <div className="home-feed-main">
        <div>
          <h3>{incident.headline}</h3>
          <p>
            {incident.distance} · {incident.place}
          </p>
        </div>
        {incident.media && (
          <button className="home-feed-thumbnail" onClick={onOpen}>
            <span>▶</span>
            <small>Sample</small>
          </button>
        )}
      </div>
      <div className="home-feed-actions">
        <button onClick={onOpen}>View Details</button>
        <button onClick={onFeedback}>Feedback</button>
        <button onClick={onShare}>Share</button>
      </div>
    </article>
  )
}

function Home({
  navigate,
  chooseCategory,
  openLocationSearch,
  onOpenFilters,
  matchCount,
  onOpenIncident,
}: {
  navigate: (screen: Screen) => void
  chooseCategory: (category: Category) => void
  openLocationSearch: (backTo: Screen) => void
  onOpenFilters: (backTo: Screen) => void
  matchCount: number
  onOpenIncident: (id: string, backTo: Screen) => void
}) {
  const [feedTab, setFeedTab] = useState("For You")
  const [nationwide, setNationwide] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [feedbackId, setFeedbackId] = useState("")
  const feed = [
    { id: "theft", category: "Theft", time: "18 min ago", headline: "Reported theft near campus", place: "Thompson Library area", distance: "≈ 0.1 mi", media: true },
    { id: "traffic", category: "Traffic", time: "34 min ago", headline: "Traffic response near a downtown intersection", place: "Saginaw and Kearsley area", distance: "≈ 0.3 mi" },
    { id: "fire", category: "Fire", time: "1 hr ago", headline: "Fire response reported near a commercial area", place: "Downtown Flint test area", distance: "≈ 0.6 mi" },
    { id: "medical", category: "Medical emergency", time: "2 hrs ago", headline: "Medical emergency call near campus", place: "UM-Flint sample boundary", distance: "≈ 0.2 mi" },
    { id: "suspicious", category: "Suspicious activity", time: "Yesterday", headline: "Suspicious activity call in a public parking area", place: "Downtown parking test area", distance: "≈ 0.4 mi" },
    { id: "robbery", category: "Robbery", time: "Yesterday", headline: "Robbery report submitted near a commercial space", place: "Downtown commercial test area", distance: "≈ 0.7 mi" },
  ]
  const visibleFeed =
    feedTab === "For You"
      ? feed.slice(0, 3)
      : feedTab === "Recent"
        ? [...feed].reverse().slice(0, 4)
        : feed.slice(3)

  return (
    <div className="screen">
      <Header navigate={navigate} />
      <main className="content home-content">
        <section className="welcome">
          <h1>Stay Aware. Stay Informed.</h1>
          <p>Explore nearby incidents, with a little more context.</p>
        </section>
        <div className="location-row">
          <div>
            <strong>
              {nationwide ? "Nationwide sample browsing" : "University of Michigan–Flint"}
            </strong>
            <small>{nationwide ? "Illustrative regions" : "Flint, MI"}</small>
          </div>
          <div className="home-location-actions">
            <button onClick={() => openLocationSearch("home")}>Change</button>
            <button
              className={
                nationwide
                  ? "nationwide-button nationwide-button--active"
                  : "nationwide-button"
              }
              onClick={() => setNationwide((current) => !current)}
            >
              Nationwide
            </button>
          </div>
        </div>
        <button
          className="search home-search-button"
          onClick={() => openLocationSearch("home")}
        >
          <img src={`${A}/bd0fd.svg`} alt="" />
          <span>Search an address, city, ZIP, or place</span>
        </button>
        <div className="home-grid">
          <div className="map-column">
            <CampusMap
              showTwo
              onMarker={() => navigate("details")}
              onSecondMarker={() => chooseCategory("Vehicle Crime")}
            />
            <PrototypeLabel />
          </div>
          <div className="incidents-column">
            <div className="home-feed-toolbar">
              <div className="home-feed-tabs">
                {["For You", "Recent", "Nearby"].map((tab) => (
                  <button
                    key={tab}
                    className={feedTab === tab ? "is-selected" : ""}
                    onClick={() => setFeedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                className="home-filter-button"
                onClick={() => onOpenFilters("home")}
              >
                Filter
              </button>
            </div>
            <div className="section-heading">
              <h2>{feedTab} Incidents</h2>
              <p>Illustrative samples · Not live or verified</p>
            </div>
            {matchCount ? (
              visibleFeed.slice(0, matchCount).map((incident) => (
                <HomeFeedCard
                  key={incident.id}
                  incident={incident}
                  onOpen={() => onOpenIncident(incident.id, "home")}
                  onFeedback={() =>
                    setFeedbackId(feedbackId === incident.id ? "" : incident.id)
                  }
                  onShare={() => setShareOpen(true)}
                />
              ))
            ) : (
              <NoResults />
            )}
            {feedbackId && (
              <div className="home-feedback-state">
                Community feedback for this sample is unverified and
                non-official.
              </div>
            )}
            <button
              className="primary-button"
              onClick={() => chooseCategory("Theft")}
            >
              View Theft Results <span>→</span>
            </button>
          </div>
        </div>
      </main>
      <BottomNav active="home" navigate={navigate} />
      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </div>
  )
}

function NoResults({ query }: { query?: string }) {
  return (
    <div className="no-results">
      <span className="no-results-icon">
        <img src={`${A}/bd0fd.svg`} alt="" />
      </span>
      <h2>No results</h2>
      <p>
        {query
          ? `No sample incidents match “${query}”.`
          : "No sample incidents match this filter."}
      </p>
      <small>Try another category or return to Theft.</small>
    </div>
  )
}

function MapMarker({
  className,
  label,
  count,
  onClick,
}: {
  className: string
  label: string
  count?: string
  onClick: () => void
}) {
  return (
    <button
      className={`phase-map-marker ${className}`}
      onClick={onClick}
      aria-label={count ? `${count} sample ${label} records` : `Open sample ${label} incident`}
    >
      <span>{count || label.slice(0, 1)}</span>
      <small>{label}</small>
    </button>
  )
}

function PointOfInterest({
  className,
  name,
  category,
  mark,
  onSelect,
}: {
  className: string
  name: string
  category: string
  mark: string
  onSelect: () => void
}) {
  return (
    <button
      className={`poi-marker ${className}`}
      onClick={onSelect}
      aria-label={`Select ${name}, ${category}`}
    >
      <span>{mark}</span>
      <small>{name}</small>
    </button>
  )
}

function MapTab({
  navigate,
  chooseCategory,
  onOpenIncident,
  onOpenFilters,
  openLocationSearch,
  matchCount,
  selectedLocation,
}: {
  navigate: (screen: Screen) => void
  chooseCategory: (category: Category) => void
  onOpenIncident: (id: string, backTo: Screen) => void
  onOpenFilters: (backTo: Screen) => void
  openLocationSearch: (backTo: Screen) => void
  matchCount: number
  selectedLocation: string
}) {
  const [mode, setMode] = useState<"Incidents" | "Offenders">("Incidents")
  const [sheetExpanded, setSheetExpanded] = useState(true)
  const [filter, setFilter] = useState("All")
  const [saved, setSaved] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [clusterOpen, setClusterOpen] = useState(false)
  const [mapMessage, setMapMessage] = useState("")
  const [zoom, setZoom] = useState(1)
  const [selectedPoi, setSelectedPoi] = useState<{
    name: string
    category: string
  } | null>(null)
  const filters = ["All", "24 Hours", "Theft", "Fire", "Medical", "More Filters"]
  const nearbyIncidents = [
    {
      id: "shooting",
      category: "Reported shooting",
      time: "Sample time · 4:10 PM",
      place: "Near MTA Downtown Transit Center area",
      distance: "≈ 0.5 mi from UM-Flint",
    },
    {
      id: "theft",
      category: "Theft",
      time: "Sample time · 2:15 PM",
      place: "Near Thompson Library",
      distance: "≈ 0.1 mi from UM-Flint",
    },
    {
      id: "vehicle",
      category: "Vehicle-related incident",
      time: "Sample time · 1:40 PM",
      place: "Near a downtown public parking area",
      distance: "≈ 0.4 mi from UM-Flint",
    },
  ]

  const selectFilter = (next: string) => {
    if (next === "More Filters") {
      onOpenFilters("map")
      return
    }
    setFilter(next)
    setClusterOpen(false)
    if (next === "Theft") chooseCategory("Theft")
  }

  return (
    <div className="screen map-tab-screen">
      <header className="map-tab-header">
        <div className="map-location-heading">
          <span>Selected test location</span>
          <strong>{selectedLocation}</strong>
        </div>
        <button
          className={saved ? "map-header-action is-saved" : "map-header-action"}
          onClick={() => setSaved((current) => !current)}
          aria-pressed={saved}
          aria-label="Save current sample location"
        >
          <span>{saved ? "✓" : "+"}</span>
          {saved ? "Saved" : "Save"}
        </button>
        <button
          className="map-header-action"
          onClick={() => openLocationSearch("map")}
          aria-label="Search another location"
        >
          <img src={`${A}/bd0fd.svg`} alt="" />
          Search
        </button>
        <div className="map-mode-toggle">
          {(["Incidents", "Offenders"] as const).map((option) => (
            <button
              key={option}
              className={mode === option ? "is-selected" : ""}
              onClick={() => {
                setMode(option)
                setClusterOpen(false)
                setMapMessage("")
              }}
              aria-pressed={mode === option}
            >
              {option}
            </button>
          ))}
        </div>
      </header>

      <main className="map-workspace">
        <div className={`map-tab-map map-tab-map--zoom-${zoom}`}>
          <CampusMap />
          <span className="blue-location-dot" aria-label="Illustrative current location" />
          <PointOfInterest
            className="poi-campus"
            name="UM-Flint campus"
            category="University"
            mark="U"
            onSelect={() =>
              setSelectedPoi({
                name: "University of Michigan–Flint campus",
                category: "University campus",
              })
            }
          />
          <PointOfInterest
            className="poi-transit"
            name="MTA transit area"
            category="Transit"
            mark="T"
            onSelect={() =>
              setSelectedPoi({
                name: "MTA Downtown Transit Center area",
                category: "Public transit facility",
              })
            }
          />
          <PointOfInterest
            className="poi-parking"
            name="Public parking"
            category="Parking"
            mark="P"
            onSelect={() =>
              setSelectedPoi({
                name: "Downtown public parking area",
                category: "Public parking",
              })
            }
          />
          <PointOfInterest
            className="poi-market"
            name="Farmers' Market area"
            category="Commercial"
            mark="C"
            onSelect={() =>
              setSelectedPoi({
                name: "Flint Farmers' Market area",
                category: "Commercial and public space",
              })
            }
          />
          <PointOfInterest
            className="poi-intersection"
            name="Saginaw & Kearsley"
            category="Intersection"
            mark="+"
            onSelect={() =>
              setSelectedPoi({
                name: "Saginaw Street and Kearsley Street area",
                category: "Downtown intersection",
              })
            }
          />
          <PointOfInterest
            className="poi-riverfront"
            name="Riverfront area"
            category="Public space"
            mark="R"
            onSelect={() =>
              setSelectedPoi({
                name: "Flint Riverfront public-space area",
                category: "Public space",
              })
            }
          />
          {mode === "Incidents" ? (
            <>
              <MapMarker
                className="marker-theft"
                label="Theft"
                onClick={() => onOpenIncident("theft", "map")}
              />
              <MapMarker
                className="marker-transit-incident"
                label="Sample incident"
                onClick={() => onOpenIncident("shooting", "map")}
              />
              <MapMarker
                className="marker-fire"
                label="Fire"
                count="2"
                onClick={() => {
                  setClusterOpen(true)
                  setSheetExpanded(true)
                }}
              />
              <MapMarker
                className="marker-medical"
                label="Medical"
                count="4"
                onClick={() => {
                  setClusterOpen(true)
                  setSheetExpanded(true)
                }}
              />
              <MapMarker
                className="marker-cluster"
                label="Incidents"
                count="9+"
                onClick={() => {
                  setClusterOpen(true)
                  setSheetExpanded(true)
                }}
              />
            </>
          ) : (
            <>
              <MapMarker
                className="marker-offender marker-offender--one"
                label="Record"
                onClick={() => setMapMessage("Illustrative public-record area selected. No person is identified.")}
              />
              <MapMarker
                className="marker-offender marker-offender--two"
                label="Records"
                count="2"
                onClick={() => setMapMessage("Two fictional record markers in this sample area.")}
              />
            </>
          )}
        </div>

        {selectedPoi && (
          <div className="poi-selection-card" role="status">
            <span>POINT OF INTEREST</span>
            <strong>{selectedPoi.name}</strong>
            <small>{selectedPoi.category} · Approximate map placement</small>
            <button onClick={() => setSelectedPoi(null)}>Close</button>
          </div>
        )}

        <div className="map-floating-controls">
          <button
            onClick={() => setMapMessage("Report Issue opened for this sample map.")}
            aria-label="Report a map issue"
          >
            <span>!</span>
            Report
          </button>
          <button
            onClick={() => {
              setZoom(1)
              setMapMessage("Recentered on the UM-Flint test location.")
            }}
            aria-label="Recenter sample map"
          >
            <span>◎</span>
          </button>
          <div>
            <button
              onClick={() => setZoom((current) => Math.min(2, current + 1))}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={() => setZoom((current) => Math.max(0, current - 1))}
              aria-label="Zoom out"
            >
              −
            </button>
          </div>
        </div>

        {(mapMessage || saved) && (
          <div className="map-toast" role="status">
            {mapMessage || "UM-Flint sample location saved."}
          </div>
        )}

        <section
          className={
            sheetExpanded
              ? "incident-sheet incident-sheet--expanded"
              : "incident-sheet"
          }
        >
          <button
            className="sheet-handle-button"
            onClick={() => setSheetExpanded((current) => !current)}
            aria-label={sheetExpanded ? "Collapse incident feed" : "Expand incident feed"}
            aria-expanded={sheetExpanded}
          >
            <span />
          </button>
          <div className="sheet-heading">
            <div>
              <h2>{mode === "Incidents" ? "Incidents Nearby" : "Illustrative Records"}</h2>
              <p>
                {clusterOpen
                  ? "Cluster selected · 4 sample incidents"
                  : mode === "Incidents"
                    ? "12 fictional samples in the test area"
                    : "No real people or live offender data"}
              </p>
            </div>
            <button onClick={() => setSheetExpanded((current) => !current)}>
              {sheetExpanded ? "Collapse" : "Expand"}
            </button>
          </div>

          {sheetExpanded && (
            <div className="sheet-body">
              <div className="map-feed-filters">
                {filters.map((option) => (
                  <button
                    key={option}
                    className={filter === option ? "chip chip--selected" : "chip"}
                    onClick={() => selectFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {filtersOpen && (
                <div className="map-filter-panel">
                  <strong>More Filters</strong>
                  <button onClick={() => setFilter("All")}>Any distance</button>
                  <button onClick={() => setFilter("24 Hours")}>Today only</button>
                  <button onClick={() => setFiltersOpen(false)}>Done</button>
                </div>
              )}
              {mode === "Incidents" ? (
                <section className="nearby-campus-feed">
                  <div className="nearby-campus-heading">
                    <h3>Incidents Near Campus</h3>
                    <span>Illustrative samples</span>
                  </div>
                  {nearbyIncidents.slice(0, matchCount).map((incident) => (
                    <article className="nearby-incident-card" key={incident.id}>
                      <span
                        className={
                          incident.id === "shooting"
                            ? "incident-severity incident-severity--amber"
                            : "incident-severity"
                        }
                      >
                        {incident.category.slice(0, 1)}
                      </span>
                      <div>
                        <strong>{incident.category}</strong>
                        <small>{incident.time}</small>
                        <p>{incident.place}</p>
                        <em>{incident.distance}</em>
                      </div>
                      <button
                        onClick={() => onOpenIncident(incident.id, "map")}
                      >
                        View Details
                      </button>
                    </article>
                  ))}
                  {!matchCount && (
                    <div className="compact-empty-state">
                      <strong>No Results</strong>
                      <p>No sample map incidents match the applied filters.</p>
                    </div>
                  )}
                  <button
                    className="nearby-share-action"
                    onClick={() => setShareOpen(true)}
                  >
                    Share safe sample metadata
                  </button>
                </section>
              ) : (
                <div className="offender-disclaimer">
                  <strong>Illustrative records only</strong>
                  <p>
                    Markers demonstrate a separate map state. They do not
                    identify real people, addresses, or current locations.
                  </p>
                </div>
              )}
              <PrototypeLabel />
            </div>
          )}
        </section>
      </main>
      <BottomNav active="map" navigate={navigate} />
      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </div>
  )
}

function LocationSearch({
  navigate,
  backTo,
  onOpenMap,
}: {
  navigate: (screen: Screen) => void
  backTo: Screen
  onOpenMap: (location: string) => void
}) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState("University of Michigan–Flint")
  const [category, setCategory] = useState("School")
  const [refreshing, setRefreshing] = useState(false)
  const [history, setHistory] = useState([
    "Downtown Flint",
    "University of Michigan–Flint",
  ])
  const [followed, setFollowed] = useState([
    { name: "University of Michigan–Flint", category: "School" },
    { name: "Downtown Flint test area", category: "Other" },
  ])
  const suggestions = [
    "University of Michigan–Flint",
    "Downtown Flint",
    "Flint Farmers' Market area",
    "MTA Downtown Transit Center area",
  ].filter((name) => !query || name.toLowerCase().includes(query.toLowerCase()))

  const selectLocation = (name: string) => {
    setSelected(name)
    setQuery(name)
    setHistory((current) => [name, ...current.filter((item) => item !== name)])
  }

  return (
    <div className="screen">
      <SectionHeader title="Search Location" backTo={backTo} navigate={navigate} />
      <main className="content location-search-page">
        <div className="location-search-form">
          <label className="search">
            <img src={`${A}/bd0fd.svg`} alt="" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Address, city, ZIP, or place name"
              autoFocus
            />
          </label>
          <button
            onClick={() => {
              if (query.trim()) selectLocation(query.trim())
            }}
          >
            Search
          </button>
        </div>
        <p className="search-disclosure">
          Prototype search only. No live geocoding or GPS service is connected.
        </p>
        {!!query && (
          <section className="location-search-section">
            <div className="section-heading">
              <h2>Suggestions</h2>
              <p>Mock results for the Flint test area</p>
            </div>
            {suggestions.length ? (
              <div className="suggestion-list">
                {suggestions.map((name) => (
                  <button key={name} onClick={() => selectLocation(name)}>
                    <img src={`${A}/36a7f.svg`} alt="" />
                    <span>
                      <strong>{name}</strong>
                      <small>Flint, Michigan · Approximate sample place</small>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <NoResults query={query} />
            )}
          </section>
        )}

        <section className="location-search-section">
          <div className="section-title-row">
            <h2>Current Location</h2>
            <button
              className="text-button"
              onClick={() => {
                setRefreshing(true)
                setSelected("University of Michigan–Flint")
              }}
            >
              {refreshing ? "Refreshed" : "Refresh"}
            </button>
          </div>
          <div className="current-location-card">
            <span className="blue-location-dot-static" />
            <div>
              <strong>{selected}</strong>
              <small>Approximate prototype location · Not live GPS</small>
            </div>
            <button onClick={() => onOpenMap(selected)}>Open Map</button>
          </div>
        </section>

        <section className="location-search-section">
          <div className="section-title-row">
            <h2>Followed Locations</h2>
            <button
              className="text-button"
              onClick={() => {
                if (!followed.some((place) => place.name === selected)) {
                  setFollowed([...followed, { name: selected, category }])
                }
              }}
            >
              Save Current
            </button>
          </div>
          <div className="preset-categories">
            {["Home", "Work", "School", "Other"].map((option) => (
              <button
                key={option}
                className={category === option ? "chip chip--selected" : "chip"}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="followed-locations">
            {followed.map((place) => (
              <button key={place.name} onClick={() => onOpenMap(place.name)}>
                <span>{place.category.slice(0, 1)}</span>
                <div>
                  <strong>{place.name}</strong>
                  <small>{place.category} · Saved sample location</small>
                </div>
                <img src={`${A}/22de5.svg`} alt="" />
              </button>
            ))}
          </div>
        </section>

        <section className="location-search-section">
          <div className="section-title-row">
            <h2>Search History</h2>
            <button className="text-button" onClick={() => setHistory([])}>
              Clear
            </button>
          </div>
          {history.length ? (
            <div className="search-history">
              {history.map((item) => (
                <button key={item} onClick={() => selectLocation(item)}>
                  <span>↗</span>
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <div className="compact-empty-state">
              <strong>No recent searches</strong>
              <p>Your sample location history will appear here.</p>
            </div>
          )}
        </section>
      </main>
      <BottomNav active="map" navigate={navigate} />
    </div>
  )
}

function Results({
  category,
  setCategory,
  navigate,
}: {
  category: Category
  setCategory: (category: Category) => void
  navigate: (screen: Screen) => void
}) {
  const [view, setView] = useState<View>("map")
  const matches = incidents.filter(
    (incident) => category === "All" || incident.category === category,
  )
  return (
    <div className="screen">
      <Header back="Home" onBack={() => navigate("home")} />
      <main className="content results-content">
        <section className="results-intro">
          <h1>Nearby incidents</h1>
          <p>
            <img src={`${A}/b6c07.svg`} alt="" />
            University of Michigan–Flint, Flint, MI <button>· Change</button>
          </p>
        </section>
        <Filters selected={category} onSelect={setCategory} />
        {view === "map" && (
          <CampusMap
            onMarker={matches.length ? () => navigate("details") : undefined}
          />
        )}
        <PrototypeLabel />
        <div className="view-toggle" aria-label="View options">
          <button
            className={view === "map" ? "chip chip--selected" : "chip"}
            onClick={() => setView("map")}
          >
            Map
          </button>
          <button
            className={view === "list" ? "chip chip--selected" : "chip"}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
        <div className="results-heading">
          <h2>
            {category}{" "}
            <em>
              · {matches.length} {matches.length === 1 ? "result" : "results"}
            </em>
          </h2>
          <span>⇵ &nbsp;Newest first</span>
        </div>
        <div
          className={`result-list ${
            view === "list" ? "result-list--expanded" : ""
          }`}
        >
          {matches.length ? (
            matches.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onOpen={() => navigate("details")}
              />
            ))
          ) : (
            <NoResults />
          )}
        </div>
      </main>
      <BottomNav active="map" navigate={navigate} />
    </div>
  )
}

function Details({
  navigate,
  incidentId = "theft",
  backTo = "results",
}: {
  navigate: (screen: Screen) => void
  incidentId?: string
  backTo?: Screen
}) {
  const samples: Record<
    string,
    {
      category: string
      title: string
      time: string
      place: string
      distance: string
      description: string
      reference: string
    }
  > = {
    theft: {
      category: "Theft",
      title: "Theft · Sample report",
      time: "Oct 14, 2026 · 2:15 PM",
      place: "Near Thompson Library",
      distance: "≈ 0.1 mi",
      description: "Sample theft report near Thompson Library.",
      reference: "DEMO-001",
    },
    vehicle: {
      category: "Vehicle incident",
      title: "Vehicle-related incident · Sample report",
      time: "Oct 14, 2026 · 1:40 PM",
      place: "Downtown Flint sample area",
      distance: "≈ 0.4 mi",
      description: "Fictional vehicle-related dispatch sample.",
      reference: "DEMO-VC-002",
    },
    fire: {
      category: "Fire response",
      title: "Fire response · Sample report",
      time: "Oct 13, 2026 · 6:20 PM",
      place: "Commercial test area",
      distance: "≈ 0.7 mi",
      description: "Fictional fire-response notification sample.",
      reference: "DEMO-FR-003",
    },
    medical: {
      category: "Medical call",
      title: "Medical call · Sample report",
      time: "Oct 13, 2026 · 11:05 AM",
      place: "Near UM-Flint sample boundary",
      distance: "≈ 0.3 mi",
      description: "Fictional medical-call notification sample.",
      reference: "DEMO-MD-004",
    },
    shooting: {
      category: "Reported shooting",
      title: "Reported shooting · Sample incident",
      time: "Oct 14, 2026 · 4:10 PM",
      place: "Near MTA Downtown Transit Center area",
      distance: "≈ 0.5 mi",
      description:
        "Sample dispatch-derived incident used to demonstrate how PHASE displays a serious incident near a transit location used by students.",
      reference: "DEMO-MTA-005",
    },
    traffic: {
      category: "Traffic",
      title: "Traffic response · Sample incident",
      time: "Oct 14, 2026 · 1:05 PM",
      place: "Saginaw and Kearsley test area",
      distance: "≈ 0.3 mi",
      description: "Fictional traffic-response sample for the PHASE prototype.",
      reference: "DEMO-TR-006",
    },
    suspicious: {
      category: "Suspicious activity",
      title: "Suspicious activity · Sample incident",
      time: "Oct 13, 2026 · 7:35 PM",
      place: "Downtown parking test area",
      distance: "≈ 0.4 mi",
      description: "Unverified suspicious-activity sample used for interface testing.",
      reference: "DEMO-SA-007",
    },
    robbery: {
      category: "Robbery report",
      title: "Robbery report · Sample incident",
      time: "Oct 13, 2026 · 5:10 PM",
      place: "Downtown commercial test area",
      distance: "≈ 0.7 mi",
      description: "Fictional robbery-report sample. No real event is represented.",
      reference: "DEMO-RB-008",
    },
  }
  const sample = samples[incidentId] || samples.theft

  return (
    <div className="screen">
      <Header
        back={
          backTo === "alerts"
            ? "Alerts"
            : backTo === "map"
              ? "Map"
              : backTo === "home"
                ? "Home"
                : backTo === "replay" || backTo === "feed-history"
                  ? "Replay"
                  : "Theft results"
        }
        onBack={() => navigate(backTo)}
      />
      <main className="content details-content">
        <section className="detail-heading">
          <div>
            <span className="category-badge">
              <img src={`${A}/1df60.svg`} alt="" />
              {sample.category.toUpperCase()}
            </span>
            <small>Prototype data · Not live or verified</small>
          </div>
          <h1>{sample.title}</h1>
          <p>{sample.time.replace(" · ", " at ")}</p>
        </section>
        <div className="detail-layout">
          <section className="detail-location">
            <CampusMap compact onMarker={() => undefined} />
            <div className="reported-location">
              <img src={`${A}/36a7f.svg`} alt="" />
              <div>
                <strong>{sample.place}</strong>
                <small>University of Michigan–Flint · {sample.distance}</small>
              </div>
            </div>
          </section>
          <section className="report-card">
            <h2>Report information</h2>
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{sample.category}</dd>
              </div>
              <div>
                <dt>Timestamp</dt>
                <dd>{sample.time}</dd>
              </div>
              <div>
                <dt>Approx. location</dt>
                <dd>UM-Flint test area</dd>
              </div>
              <div>
                <dt>Description</dt>
                <dd>{sample.description}</dd>
              </div>
              <div>
                <dt>Reference</dt>
                <dd>{sample.reference}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  {incidentId === "shooting"
                    ? "Illustrative sample — not a verified event"
                    : "Illustrative only"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
        <div className="caution">
          <img src={`${A}/5d9a5.svg`} alt="" />
          <p>
            Illustrative report and marker only. Not a live or verified
            incident.
          </p>
        </div>
        <div className="detail-actions">
          <button
            className="primary-button"
            onClick={() => navigate("share-incident")}
          >
            Share Incident
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("incident-audio")}
          >
            Listen to Approved Sample
          </button>
        </div>
        <section className="about">
          <strong>About this sample</strong>
          <p>
            Campus test location, not actual GPS. Distances and incident markers
            are illustrative.
          </p>
        </section>
      </main>
      <BottomNav active="map" navigate={navigate} />
    </div>
  )
}

function EmptySection({
  type,
  navigate,
}: {
  type: "alerts" | "profile"
  navigate: (screen: Screen) => void
}) {
  const alerts = type === "alerts"
  return (
    <div className="screen">
      <Header navigate={navigate} />
      <main className="content utility-page">
        <span className="utility-icon">
          <img src={`${A}/${alerts ? "6a748.svg" : "d7544.svg"}`} alt="" />
        </span>
        <h1>{alerts ? "Alerts" : "Profile"}</h1>
        <p>
          {alerts
            ? "No prototype alerts right now."
            : "Prototype profile settings live here."}
        </p>
        <div className="utility-card">
          <strong>
            {alerts ? "Stay aware, without the noise." : "PHASE prototype"}
          </strong>
          <p>
            {alerts
              ? "Alert preferences are illustrative and do not send notifications."
              : "No real account, location, or personal data is stored."}
          </p>
        </div>
        <button className="primary-button" onClick={() => navigate("home")}>
          Return Home
        </button>
      </main>
      <BottomNav active={type} navigate={navigate} />
    </div>
  )
}

function SectionHeader({
  title,
  backTo,
  navigate,
}: {
  title: string
  backTo: Screen
  navigate: (screen: Screen) => void
}) {
  return (
    <header className="subheader settings-header">
      <button
        className="back-button"
        onClick={() => navigate(backTo)}
        aria-label={`Back to ${backTo}`}
      >
        <img src={`${A}/1aa39.svg`} alt="" />
        <span>Back</span>
      </button>
      <strong>{title}</strong>
    </header>
  )
}

function AlertsHeader({
  active,
  navigate,
  onInbox,
  unreadCount,
}: {
  active: "Alerts" | "Activity"
  navigate: (screen: Screen) => void
  onInbox?: () => void
  unreadCount?: number
}) {
  return (
    <header className="alerts-top-header">
      <div className="alerts-tabs">
        <button
          className={active === "Alerts" ? "is-active" : ""}
          onClick={() => navigate("alerts")}
        >
          Alerts
        </button>
        <button
          className={active === "Activity" ? "is-active" : ""}
          onClick={() => navigate("activity")}
        >
          Activity
        </button>
      </div>
      <div className="alerts-header-actions">
        <button
          onClick={() => navigate("notification-settings")}
          aria-label="Open notification settings"
        >
          <span className="gear-symbol">SET</span>
        </button>
        <button
          onClick={onInbox || (() => navigate("my-alerts"))}
          aria-label={
            unreadCount
              ? `Mark ${unreadCount} sample alerts as read`
              : "Open alert history"
          }
        >
          <span className="inbox-symbol">▣</span>
          {!!unreadCount && <small>{unreadCount}</small>}
        </button>
      </div>
    </header>
  )
}

function PremiumInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Multi-location alert information"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="modal-handle" />
        <h2>Multi-location alerts</h2>
        <p>
          This prototype demonstrates alerts for multiple saved safety zones.
          No subscription, payment, or live notifications are enabled.
        </p>
        <button className="primary-button" onClick={onClose}>
          Got It
        </button>
      </section>
    </div>
  )
}

function AlertsScreen({
  navigate,
  onOpenAlert,
  onOpenFilters,
  matchCount,
  readAlerts,
  setReadAlerts,
  cleared,
  setCleared,
}: {
  navigate: (screen: Screen) => void
  onOpenAlert: (id: string) => void
  onOpenFilters: (backTo: Screen) => void
  matchCount: number
  readAlerts: string[]
  setReadAlerts: (ids: string[]) => void
  cleared: boolean
  setCleared: (cleared: boolean) => void
}) {
  const [premiumOpen, setPremiumOpen] = useState(false)
  const sampleAlerts = [
    {
      id: "theft",
      group: "Today",
      category: "Theft",
      headline: "Reported theft near campus",
      location: "Near UM-Flint test area",
      time: "15 minutes ago",
      meta: "4 shares",
      tone: "amber",
    },
    {
      id: "vehicle",
      group: "Today",
      category: "Vehicle",
      headline: "Vehicle-related incident reported downtown",
      location: "Downtown Flint sample area",
      time: "1 hour ago",
      meta: "2 updates",
      tone: "lime",
    },
    {
      id: "fire",
      group: "Earlier",
      category: "Fire",
      headline: "Fire response reported near a commercial area",
      location: "South Saginaw Street test area",
      time: "Yesterday",
      meta: "3 shares",
      tone: "amber",
    },
    {
      id: "medical",
      group: "Earlier",
      category: "Medical",
      headline: "Medical emergency call near campus",
      location: "UM-Flint sample boundary",
      time: "Oct 13",
      meta: "",
      tone: "slate",
    },
  ]
  const visibleAlerts = sampleAlerts.slice(0, matchCount)
  const unreadCount = visibleAlerts.filter(
    (alert) => !readAlerts.includes(alert.id),
  ).length

  const openAlert = (id: string) => {
    if (!readAlerts.includes(id)) setReadAlerts([...readAlerts, id])
    onOpenAlert(id)
  }

  return (
    <div className="screen">
      <AlertsHeader
        active="Alerts"
        navigate={navigate}
        unreadCount={cleared ? 0 : unreadCount}
        onInbox={() => {
          if (unreadCount) setReadAlerts(visibleAlerts.map((alert) => alert.id))
          else setCleared(true)
        }}
      />
      <main className="alerts-feed">
        <section className="alerts-premium-banner">
          <span>＋</span>
          <div>
            <strong>Multi-location alerts</strong>
            <p>Monitor multiple fictional safety zones.</p>
          </div>
          <button onClick={() => setPremiumOpen(true)}>Learn More</button>
        </section>
        <button
          className="alerts-filter-action"
          onClick={() => onOpenFilters("alerts")}
        >
          Filter Sample Alerts
        </button>

        {!cleared && !unreadCount && (
          <div className="all-read-state">
            <span>✓</span>
            <div>
              <strong>All sample alerts read</strong>
              <p>Use the inbox control again to preview the empty state.</p>
            </div>
          </div>
        )}

        {cleared || !matchCount ? (
          <div className="alerts-empty-state">
            <span className="feature-icon">
              <img src={`${A}/6a748.svg`} alt="" />
            </span>
            <h1>No alerts</h1>
            <p>
              {matchCount
                ? "There are no sample alerts to display. PHASE is not connected to live dispatch or GPS services."
                : "No fictional sample alerts match the applied filters."}
            </p>
            <button
              className="secondary-button"
              onClick={() => {
                if (!matchCount) onOpenFilters("alerts")
                else {
                  setCleared(false)
                  setReadAlerts([])
                }
              }}
            >
              {matchCount ? "Restore Sample Alerts" : "Adjust Filters"}
            </button>
          </div>
        ) : (
          ["Today", "Earlier"].map((group) => (
            <section className="alert-feed-group" key={group}>
              <div className="alert-group-heading">
                <h2>{group}</h2>
                <span>
                  {
                    visibleAlerts.filter((alert) => alert.group === group)
                      .length
                  }
                </span>
              </div>
              {visibleAlerts
                .filter((alert) => alert.group === group)
                .map((alert) => {
                  const isUnread = !readAlerts.includes(alert.id)
                  return (
                    <button
                      key={alert.id}
                      className={
                        isUnread
                          ? "notification-row notification-row--unread"
                          : "notification-row"
                      }
                      onClick={() => openAlert(alert.id)}
                    >
                      <span
                        className={`notification-thumb notification-thumb--${alert.tone}`}
                      >
                        {alert.category.slice(0, 1)}
                      </span>
                      <span className="notification-row-copy">
                        <span>
                          <strong>{alert.category}</strong>
                          <small>{alert.time}</small>
                        </span>
                        <b>{alert.headline}</b>
                        <span className="alert-location">
                          {alert.location}
                        </span>
                        {alert.meta && <em>{alert.meta}</em>}
                      </span>
                      {isUnread && (
                        <span className="notification-unread" aria-label="Unread" />
                      )}
                    </button>
                  )
                })}
            </section>
          ))
        )}
        <p className="alerts-data-disclosure">
          Illustrative sample data only · Not live or verified
        </p>
      </main>
      <BottomNav active="alerts" navigate={navigate} />
      {premiumOpen && <PremiumInfoModal onClose={() => setPremiumOpen(false)} />}
    </div>
  )
}

function ActivityScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="screen">
      <AlertsHeader active="Activity" navigate={navigate} />
      <main className="alerts-feed activity-feed">
        <div className="section-heading">
          <h2>Recent prototype activity</h2>
          <p>Your interactions with fictional PHASE samples.</p>
        </div>
        <div className="activity-row">
          <span>✓</span>
          <div>
            <strong>Notification preferences saved</strong>
            <small>Today · Prototype setting</small>
          </div>
        </div>
        <div className="activity-row">
          <span>↗</span>
          <div>
            <strong>Sample incident summary shared</strong>
            <small>Yesterday · Nothing was transmitted</small>
          </div>
        </div>
        <div className="activity-row">
          <span>＋</span>
          <div>
            <strong>Campus safety zone added</strong>
            <small>Oct 13 · Illustrative boundary</small>
          </div>
        </div>
      </main>
      <BottomNav active="alerts" navigate={navigate} />
    </div>
  )
}

function IncidentNotification({
  navigate,
}: {
  navigate: (screen: Screen) => void
}) {
  return (
    <div className="screen">
      <SectionHeader
        title="Incident Notification"
        backTo="alerts"
        navigate={navigate}
      />
      <main className="content feature-page">
        <div className="notification-hero">
          <span className="category-badge">
            <img src={`${A}/1df60.svg`} alt="" />
            THEFT
          </span>
          <span>Just now</span>
          <h1>Sample incident near Thompson Library</h1>
          <p>
            A synthetic theft report matched your Campus safety zone and
            notification radius.
          </p>
        </div>
        <CampusMap compact onMarker={() => navigate("details")} />
        <div className="notification-facts">
          <div>
            <span>Safety zone</span>
            <strong>Campus</strong>
          </div>
          <div>
            <span>Notification radius</span>
            <strong>0.5 mi</strong>
          </div>
          <div>
            <span>Reported</span>
            <strong>2:15 PM</strong>
          </div>
        </div>
        <button
          className="primary-button"
          onClick={() => navigate("details")}
        >
          View Incident Details
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("notification-settings")}
        >
          Adjust Alert Preferences
        </button>
        <PrototypeLabel />
      </main>
      <BottomNav active="alerts" navigate={navigate} />
    </div>
  )
}

function NotificationSettings({
  navigate,
}: {
  navigate: (screen: Screen) => void
}) {
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Theft: true,
    Assault: true,
    "Vehicle Crime": true,
    Burglary: false,
    Other: false,
  })
  const [frequency, setFrequency] = useState("Immediate")
  const [alertRadius, setAlertRadius] = useState("0.5")
  const [quietHours, setQuietHours] = useState(true)
  const [quietStart, setQuietStart] = useState("22:00")
  const [quietEnd, setQuietEnd] = useState("07:00")
  const [saved, setSaved] = useState(false)

  return (
    <div className="screen">
      <SectionHeader
        title="Notification Settings"
        backTo="alerts"
        navigate={navigate}
      />
      <main className="content feature-page">
        <section className="feature-section">
          <div className="settings-card">
            <button
              className="setting-row setting-row--primary"
              onClick={() => {
                setNotificationsOn((current) => !current)
                setSaved(false)
              }}
              aria-pressed={notificationsOn}
            >
              <span>
                <strong>Enable notifications</strong>
                <small>Sample alerts for saved safety zones</small>
              </span>
              <span
                className={
                  notificationsOn ? "switch switch--on" : "switch"
                }
              >
                <i />
              </span>
            </button>
          </div>
        </section>
        <section className="feature-section">
          <div className="section-heading">
            <h2>Crime categories</h2>
            <p>Choose which sample incidents can trigger an alert.</p>
          </div>
          <div className="settings-card">
            {Object.entries(enabled).map(([category, active]) => (
              <button
                key={category}
                className="setting-row"
                onClick={() => {
                  setSaved(false)
                  setEnabled((current) => ({
                    ...current,
                    [category]: !current[category],
                  }))
                }}
                aria-pressed={active}
              >
                <span>{category}</span>
                <span className={active ? "switch switch--on" : "switch"}>
                  <i />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="feature-section">
          <div className="section-heading">
            <h2>Alert frequency</h2>
            <p>Control how often prototype notifications appear.</p>
          </div>
          <div className="segmented-control">
            {["Immediate", "Daily summary", "Off"].map((option) => (
              <button
                key={option}
                className={frequency === option ? "is-selected" : ""}
                onClick={() => {
                  setSaved(false)
                  setFrequency(option)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
        <section className="feature-section">
          <div className="section-heading">
            <h2>Notification radius</h2>
            <p>
              Controls which incidents can trigger alerts, not what appears on
              the map.
            </p>
          </div>
          <div className="radius-options" aria-label="Notification radius">
            {["0.25", "0.5", "1", "2"].map((option) => (
              <button
                key={option}
                className={
                  alertRadius === option ? "chip chip--selected" : "chip"
                }
                onClick={() => {
                  setSaved(false)
                  setAlertRadius(option)
                }}
              >
                {option} mi
              </button>
            ))}
          </div>
        </section>
        <section className="feature-section">
          <div className="section-heading">
            <h2>Quiet hours</h2>
            <p>Pause immediate prototype alerts during a chosen period.</p>
          </div>
          <div className="settings-card quiet-hours-card">
            <button
              className="setting-row"
              onClick={() => {
                setQuietHours((current) => !current)
                setSaved(false)
              }}
              aria-pressed={quietHours}
            >
              <span>Use quiet hours</span>
              <span className={quietHours ? "switch switch--on" : "switch"}>
                <i />
              </span>
            </button>
            {quietHours && (
              <div className="quiet-hours-inputs">
                <label>
                  <span>From</span>
                  <input
                    type="time"
                    value={quietStart}
                    onChange={(event) => {
                      setQuietStart(event.target.value)
                      setSaved(false)
                    }}
                  />
                </label>
                <label>
                  <span>Until</span>
                  <input
                    type="time"
                    value={quietEnd}
                    onChange={(event) => {
                      setQuietEnd(event.target.value)
                      setSaved(false)
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        </section>
        <button
          className="primary-button"
          onClick={() => setSaved(true)}
        >
          Save Preferences
        </button>
        {saved && (
          <div className="confirmation" role="status">
            Preferences saved for this prototype.
          </div>
        )}
      </main>
      <BottomNav active="alerts" navigate={navigate} />
    </div>
  )
}

function RadiusSettings({ navigate }: { navigate: (screen: Screen) => void }) {
  const [radius, setRadius] = useState("1")
  const [saved, setSaved] = useState(false)

  return (
    <div className="screen">
      <SectionHeader
        title="Search Radius"
        backTo="home"
        navigate={navigate}
      />
      <main className="content feature-page">
        <div className="feature-heading">
          <span className="feature-icon">
            <img src={`${A}/36a7f.svg`} alt="" />
          </span>
          <div>
            <h1>{radius} mile search radius</h1>
            <p>Controls incidents shown on the map and in results.</p>
          </div>
        </div>
        <div className="radius-preview">
          <CampusMap compact />
          <span className={`radius-ring radius-ring--${radius}`} />
        </div>
        <div className="radius-options" aria-label="Search radius">
          {["0.5", "1", "2", "5"].map((option) => (
            <button
              key={option}
              className={radius === option ? "chip chip--selected" : "chip"}
              onClick={() => {
                setRadius(option)
                setSaved(false)
              }}
            >
              {option} mi
            </button>
          ))}
        </div>
        <section className="sample-notice">
          <strong>Search radius</strong>
          <p>
            This does not change your notification radius. Alert distance is
            configured separately in Notification Settings.
          </p>
        </section>
        <button className="primary-button" onClick={() => setSaved(true)}>
          Update Map Preview
        </button>
        {saved && (
          <div className="confirmation" role="status">
            Map preview updated to {radius} mi.
          </div>
        )}
      </main>
      <BottomNav active="map" navigate={navigate} />
    </div>
  )
}

function SafetyZones({
  navigate,
  zones,
  setZones,
}: {
  navigate: (screen: Screen) => void
  zones: string[]
  setZones: (zones: string[]) => void
}) {
  const [draft, setDraft] = useState("")
  const [editing, setEditing] = useState<number | null>(null)

  return (
    <div className="screen">
      <SectionHeader
        title="Manage Safety Zones"
        backTo="profile"
        navigate={navigate}
      />
      <main className="content feature-page">
        <div className="feature-heading">
          <span className="feature-icon">
            <img src={`${A}/36a7f.svg`} alt="" />
          </span>
          <div>
            <h1>Saved boundaries</h1>
            <p>Add multiple places used by prototype alerts.</p>
          </div>
        </div>
        <div className="zone-list">
          {zones.map((zone, index) => (
            <div className="zone-card" key={`${zone}-${index}`}>
              <span className="zone-number">{index + 1}</span>
              {editing === index ? (
                <input
                  value={zone}
                  aria-label={`Edit ${zone}`}
                  onChange={(event) => {
                    const next = [...zones]
                    next[index] = event.target.value
                    setZones(next)
                  }}
                />
              ) : (
                <div>
                  <strong>{zone}</strong>
                  <small>0.5 mi notification boundary</small>
                </div>
              )}
              <button
                className="text-button"
                onClick={() => setEditing(editing === index ? null : index)}
              >
                {editing === index ? "Done" : "Edit"}
              </button>
              <button
                className="remove-button"
                onClick={() => setZones(zones.filter((_, i) => i !== index))}
                aria-label={`Remove ${zone}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="add-zone">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Name a new safety zone"
          />
          <button
            className="primary-button"
            onClick={() => {
              if (!draft.trim()) return
              setZones([...zones, draft.trim()])
              setDraft("")
            }}
          >
            Add Zone
          </button>
        </div>
        {!zones.length && (
          <div className="no-results">
            <h2>No saved zones</h2>
            <p>Add a place to create a sample notification boundary.</p>
          </div>
        )}
      </main>
      <BottomNav active="profile" navigate={navigate} />
    </div>
  )
}

function ShareIncident({ navigate }: { navigate: (screen: Screen) => void }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    Category: true,
    "Approximate location": true,
    Timestamp: true,
    Description: false,
  })
  const [channel, setChannel] = useState("Messages")
  const [shared, setShared] = useState(false)
  const shareChannels = [
    { name: "Contacts", mark: "C" },
    { name: "Messages", mark: "M" },
    { name: "Mail", mark: "@" },
    { name: "Facebook", mark: "f" },
    { name: "X", mark: "X" },
    { name: "Instagram", mark: "I" },
  ]

  return (
    <div className="screen">
      <SectionHeader
        title="Share Incident"
        backTo="details"
        navigate={navigate}
      />
      <main className="content feature-page">
        <section className="share-summary">
          <span className="category-badge">
            <img src={`${A}/1df60.svg`} alt="" />
            THEFT
          </span>
          <h1>Theft · Sample report</h1>
          <p>Choose which synthetic report fields to include.</p>
        </section>
        <div className="settings-card">
          {Object.entries(selected).map(([field, active]) => (
            <button
              key={field}
              className="setting-row"
              onClick={() =>
                setSelected((current) => ({
                  ...current,
                  [field]: !current[field],
                }))
              }
              aria-pressed={active}
            >
              <span>{field}</span>
              <span className={active ? "check-box check-box--on" : "check-box"}>
                {active ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
        <section className="feature-section">
          <div className="section-heading">
            <h2>Share with</h2>
            <p>Select a simulated destination.</p>
          </div>
          <div className="share-channels">
            {shareChannels.map((option) => (
              <button
                key={option.name}
                className={channel === option.name ? "is-selected" : ""}
                onClick={() => {
                  setChannel(option.name)
                  setShared(false)
                }}
                aria-pressed={channel === option.name}
              >
                <span className={`channel-mark channel-mark--${option.name.toLowerCase()}`}>
                  {option.mark}
                </span>
                <strong>{option.name}</strong>
              </button>
            ))}
          </div>
          {channel === "Contacts" && (
            <div className="contact-preview">
              <span>AM</span>
              <div>
                <strong>Alex Morgan</strong>
                <small>Sample emergency contact</small>
              </div>
              <span className="check-box check-box--on">✓</span>
            </div>
          )}
        </section>
        <section className="sample-notice">
          <strong>Privacy reminder</strong>
          <p>
            Exact GPS, personal details, and raw dispatch information are never
            included in this prototype.
          </p>
        </section>
        <button className="primary-button" onClick={() => setShared(true)}>
          Share via {channel}
        </button>
        {shared && (
          <div className="share-confirmation" role="status">
            <strong>Share ready</strong>
            <p>
              A simulated incident summary was prepared for {channel}. Nothing
              was sent.
            </p>
            <button
              className="secondary-button"
              onClick={() => navigate("details")}
            >
              Done
            </button>
          </div>
        )}
      </main>
      <BottomNav active="map" navigate={navigate} />
    </div>
  )
}

function DispatchHeader({
  onBack,
  onShare,
  onRestricted,
}: {
  onBack: () => void
  onShare: () => void
  onRestricted: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="dispatch-header">
      <button onClick={onBack} aria-label="Back to incident list">
        <img src={`${A}/1aa39.svg`} alt="" />
      </button>
      <strong>Dispatch Audio</strong>
      <button
        className="overflow-button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open prototype actions"
        aria-expanded={open}
      >
        ⋯
      </button>
      {open && (
        <div className="overflow-menu">
          <button
            onClick={() => {
              setOpen(false)
              onShare()
            }}
          >
            Share sample
          </button>
          <button
            onClick={() => {
              setOpen(false)
              onRestricted()
            }}
          >
            Preview restricted state
          </button>
        </div>
      )}
    </header>
  )
}

function DispatchAudioPlayer({
  playing,
  setPlaying,
  progress,
  setProgress,
  expanded,
  setExpanded,
}: {
  playing: boolean
  setPlaying: (playing: boolean) => void
  progress: number
  setProgress: (progress: number) => void
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}) {
  const bars = [10, 17, 25, 14, 31, 20, 38, 27, 16, 34, 22, 30, 18, 26, 13, 21]

  return (
    <section className="dispatch-player">
      <div className="player-source">
        <div>
          <span>PHASE Sample Dispatch</span>
          <strong>Sample Recording</strong>
        </div>
        <span>00:15</span>
      </div>
      <div className="player-main">
        <button
          className="play-button"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "Pause sample audio" : "Play sample audio"}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
        <div
          className={playing ? "waveform waveform--playing" : "waveform"}
          aria-label="Illustrative audio waveform"
        >
          {bars.map((height, index) => (
            <i
              key={`${height}-${index}`}
              className={
                index <= progress
                  ? `wave-bar wave-bar--${index + 1} is-played`
                  : `wave-bar wave-bar--${index + 1}`
              }
            />
          ))}
        </div>
      </div>
      <input
        className="audio-seek"
        type="range"
        min="0"
        max="15"
        value={progress}
        onChange={(event) => setProgress(Number(event.target.value))}
        aria-label="Sample audio progress"
      />
      <div className="player-time">
        <span>00:{String(progress).padStart(2, "0")}</span>
        <span>00:15</span>
      </div>
      <div className="transcript-preview">
        <div>
          <strong>Transcript preview</strong>
          <span>Fictional sample</span>
        </div>
        <p>
          “Sample unit requested near the UM-Flint test area for a reported
          vehicle concern…”
          {expanded &&
            " The caller information has been removed. The activity is unverified and this excerpt is not an official incident report."}
        </p>
        <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? "Collapse transcript" : "Expand transcript"}
        </button>
      </div>
    </section>
  )
}

function MetadataRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="metadata-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function FeedbackButtons({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="feedback-group">
      <strong>{label}</strong>
      <div>
        {options.map((option) => (
          <button
            key={option}
            className={value === option ? "is-selected" : ""}
            onClick={() => onChange(option)}
            aria-pressed={value === option}
          >
            <span>{value === option ? "✓" : ""}</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function ShareModal({
  onClose,
}: {
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Share sample incident"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="modal-handle" />
        <h2>Share Incident</h2>
        <p>
          Share only the fictional summary and approximate UM-Flint sample
          location.
        </p>
        <button
          className="primary-button"
          onClick={() => setCopied(true)}
        >
          {copied ? "Sample link copied" : "Copy sample link"}
        </button>
        <button className="secondary-button" onClick={onClose}>
          Cancel
        </button>
      </section>
    </div>
  )
}

function IncidentAudio({ navigate }: { navigate: (screen: Screen) => void }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(4)
  const [expanded, setExpanded] = useState(false)
  const [restricted, setRestricted] = useState(false)
  const [reality, setReality] = useState("Unverified")
  const [accuracy, setAccuracy] = useState("Needs review")
  const [update, setUpdate] = useState("")
  const [attachment, setAttachment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div className="screen dispatch-screen">
      <DispatchHeader
        onBack={() => navigate("results")}
        onShare={() => setShareOpen(true)}
        onRestricted={() => {
          setPlaying(false)
          setRestricted((current) => !current)
        }}
      />
      <main className="content dispatch-content">
        <section className="dispatch-headline">
          <div>
            <span className="approved-badge">SAMPLE DISPATCH CALL</span>
            <button onClick={() => setShareOpen(true)}>Share Incident</button>
          </div>
          <h1>Police response requested for reported vehicle theft</h1>
          <p>
            Dispatch request only · Activity is not a confirmed crime or
            verified incident.
          </p>
        </section>

        {restricted ? (
          <div className="restricted-card">
            <strong>Sample recording restricted</strong>
            <p>
              Audio and transcript are unavailable when a source is not
              approved for this audience. No caller information is shown.
            </p>
            <button
              className="secondary-button"
              onClick={() => setRestricted(false)}
            >
              Return to Approved Sample
            </button>
          </div>
        ) : (
          <DispatchAudioPlayer
            playing={playing}
            setPlaying={setPlaying}
            progress={progress}
            setProgress={setProgress}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}

        <section className="incident-metadata-card">
          <div className="section-title-row">
            <h2>Sample Incident Details</h2>
            <span>DEMO-VC-002</span>
          </div>
          <MetadataRow label="Date & time" value="Oct 14, 2026 · 3:42 PM" />
          <MetadataRow label="Category" value="Reported vehicle theft" />
          <MetadataRow
            label="Approximate location"
            value="Near UM-Flint test area"
          />
          <div className="audio-map-thumb">
            <CampusMap compact />
          </div>
          <button
            className="map-action"
            onClick={() => navigate("map")}
          >
            <img src={`${A}/36a7f.svg`} alt="" />
            View on map
          </button>
          <small>
            Sample location only · Not actual GPS or a live incident marker.
          </small>
        </section>

        <section className="incident-summary-card">
          <div className="section-title-row">
            <h2>Incident Summary</h2>
            <span>AI SAMPLE</span>
          </div>
          <p>
            A fictional caller reported that a vehicle may have been taken near
            the UM-Flint campus test area. A sample police response was
            requested. No crime or response is confirmed.
          </p>
          <div className="summary-disclaimer">
            Illustrative sample summary. Not an official report or verified
            incident.
          </div>
        </section>

        <section className="community-card">
          <div className="section-title-row">
            <div>
              <h2>Community Feedback</h2>
              <p>Prototype input only · Not official verification</p>
            </div>
          </div>
          <FeedbackButtons
            label="Is this activity real?"
            options={["Confirmed", "Unverified"]}
            value={reality}
            onChange={(value) => {
              setReality(value)
              setSubmitted(false)
            }}
          />
          <FeedbackButtons
            label="Is the summary accurate?"
            options={["Accurate", "Needs review"]}
            value={accuracy}
            onChange={(value) => {
              setAccuracy(value)
              setSubmitted(false)
            }}
          />
          <label className="feedback-update">
            <strong>Have an update?</strong>
            <textarea
              value={update}
              onChange={(event) => {
                setUpdate(event.target.value)
                setSubmitted(false)
              }}
              placeholder="Add a safe, non-identifying sample update"
            />
          </label>
          <div className="attachment-actions">
            {["Photo", "Video"].map((type) => (
              <button
                key={type}
                className={attachment === type ? "is-selected" : ""}
                onClick={() => {
                  setAttachment(attachment === type ? "" : type)
                  setSubmitted(false)
                }}
                aria-pressed={attachment === type}
              >
                <span>＋</span>
                {type}
              </button>
            ))}
            <small>No real media is uploaded.</small>
          </div>
          <button
            className="primary-button"
            onClick={() => setSubmitted(true)}
          >
            Submit Feedback
          </button>
          {submitted && (
            <div className="confirmation" role="status">
              Sample feedback submitted. It does not officially verify this
              activity.
            </div>
          )}
        </section>
      </main>
      <BottomNav active="map" navigate={navigate} />
      {shareOpen && <ShareModal onClose={() => setShareOpen(false)} />}
    </div>
  )
}

function ProfileSettings({
  navigate,
}: {
  navigate: (screen: Screen) => void
}) {
  const [panel, setPanel] = useState<"privacy" | "account" | null>(null)

  return (
    <div className="screen">
      <Header navigate={navigate} />
      <main className="content feature-page">
        <div className="profile-heading">
          <span className="profile-avatar">
            <img src={`${A}/d7544.svg`} alt="" />
          </span>
          <div>
            <h1>Profile & Settings</h1>
            <p>Prototype user · No real account</p>
          </div>
        </div>
        <div className="profile-menu">
          <button onClick={() => navigate("notification-settings")}>
            <span>
              <strong>Notification Settings</strong>
              <small>Categories, frequency, and alert radius</small>
            </span>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
          <button onClick={() => navigate("safety-zones")}>
            <span>
              <strong>Saved Places & Safety Zones</strong>
              <small>Add, edit, or remove boundaries</small>
            </span>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
          <button onClick={() => navigate("radius-settings")}>
            <span>
              <strong>Search Radius</strong>
              <small>Change map and results distance</small>
            </span>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
          <button onClick={() => setPanel("privacy")}>
            <span>
              <strong>Privacy</strong>
              <small>Location and sharing controls</small>
            </span>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
          <button onClick={() => setPanel("account")}>
            <span>
              <strong>Account Controls</strong>
              <small>Prototype sign out and data options</small>
            </span>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
        </div>
        {panel && (
          <section className="inline-panel">
            <div>
              <strong>
                {panel === "privacy" ? "Privacy controls" : "Account controls"}
              </strong>
              <button onClick={() => setPanel(null)}>Close</button>
            </div>
            {panel === "privacy" ? (
              <p>
                Approximate locations only. This prototype does not request or
                store device GPS.
              </p>
            ) : (
              <>
                <p>No account or personal data exists in this prototype.</p>
                <button
                  className="secondary-button"
                  onClick={() => navigate("sign-in")}
                >
                  Simulate Sign Out
                </button>
              </>
            )}
          </section>
        )}
      </main>
      <BottomNav active="profile" navigate={navigate} />
    </div>
  )
}

function MyAlerts({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="screen">
      <SectionHeader
        title="My Alerts"
        backTo="alerts"
        navigate={navigate}
      />
      <main className="content feature-page">
        <div className="section-heading">
          <h2>Alert history</h2>
          <p>Fictional samples from your saved safety zones.</p>
        </div>
        <button
          className="alert-card"
          onClick={() => navigate("incident-notification")}
        >
          <span className="alert-copy">
            <small>THEFT · TODAY</small>
            <strong>Sample incident near Thompson Library</strong>
            <span>Campus zone · 2:15 PM</span>
          </span>
          <img src={`${A}/22de5.svg`} alt="" />
        </button>
        <button
          className="alert-card"
          onClick={() => navigate("results")}
        >
          <span className="alert-copy">
            <small>VEHICLE CRIME · OCT 14</small>
            <strong>Sample report near University Pavilion</strong>
            <span>Campus zone · 1:40 PM</span>
          </span>
          <img src={`${A}/22de5.svg`} alt="" />
        </button>
      </main>
      <BottomNav active="alerts" navigate={navigate} />
    </div>
  )
}

function AdvancedFilters({
  navigate,
  backTo,
  onConfirm,
}: {
  navigate: (screen: Screen) => void
  backTo: Screen
  onConfirm: (count: number) => void
}) {
  const risks = ["All Risks", "High Risk", "Medium Risk", "Low Risk"]
  const dates = ["24 Hours", "48 Hours", "7 Days", "14 Days"]
  const categories = [
    "All Categories",
    "Assault Report",
    "Break-In",
    "Disturbance",
    "Domestic Dispute",
    "Fatality Report",
    "Fire",
    "Fraud Report",
    "Medical Emergency",
    "Missing Person",
    "Other Incidents",
    "Property Damage",
    "Robbery Report",
    "Sex-Related Incident",
    "Stolen Vehicle",
    "Substance Use",
    "Suspicious Activity",
    "Theft Report",
    "Traffic",
    "Weapons",
  ]
  const [risk, setRisk] = useState("All Risks")
  const [date, setDate] = useState("24 Hours")
  const [category, setCategory] = useState("All Categories")
  const supportedCounts: Record<string, number> = {
    "All Categories": 6,
    Fire: 1,
    "Medical Emergency": 1,
    "Robbery Report": 1,
    "Suspicious Activity": 1,
    "Theft Report": 1,
    Traffic: 1,
    "Stolen Vehicle": 1,
  }
  const count = supportedCounts[category] ?? 0

  const clearAll = () => {
    setRisk("All Risks")
    setDate("24 Hours")
    setCategory("All Categories")
  }

  return (
    <div className="screen">
      <SectionHeader title="Filters" backTo={backTo} navigate={navigate} />
      <main className="content advanced-filters-page">
        <div className="filters-summary">
          <div>
            <strong>Advanced Filters</strong>
            <span>{count} matching sample {count === 1 ? "incident" : "incidents"}</span>
          </div>
          <button onClick={clearAll}>Clear All</button>
        </div>
        <section className="advanced-filter-section">
          <h2>Risk Level</h2>
          <div>
            {risks.map((option) => (
              <button
                key={option}
                className={risk === option ? "is-selected" : ""}
                onClick={() => setRisk(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
        <section className="advanced-filter-section">
          <h2>Date</h2>
          <div>
            {dates.map((option) => (
              <button
                key={option}
                className={date === option ? "is-selected" : ""}
                onClick={() => setDate(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
        <section className="advanced-filter-section">
          <h2>Incident Category</h2>
          <div className="category-filter-grid">
            {categories.map((option) => (
              <button
                key={option}
                className={category === option ? "is-selected" : ""}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
        {!count && (
          <div className="compact-empty-state filter-no-results">
            <strong>No Results</strong>
            <p>No fictional sample records match this filter combination.</p>
          </div>
        )}
        <button
          className="filter-confirm"
          onClick={() => {
            onConfirm(count)
            navigate(backTo)
          }}
        >
          Confirm · {count} {count === 1 ? "Match" : "Matches"}
        </button>
      </main>
    </div>
  )
}

function ReplayFeedCard({
  feed,
  playing,
  onToggle,
  onIncident,
  onHistory,
}: {
  feed: {
    name: string
    area: string
    count: number
    incidents: { time: string; description: string; id: string }[]
  }
  playing: boolean
  onToggle: () => void
  onIncident: (id: string) => void
  onHistory: () => void
}) {
  return (
    <article className="replay-feed-card">
      <div className="replay-feed-heading">
        <div>
          <strong>{feed.name}</strong>
          <span>{feed.area}</span>
        </div>
        <button
          className={playing ? "is-playing" : ""}
          onClick={onToggle}
          aria-label={playing ? `Pause ${feed.name}` : `Play ${feed.name}`}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      </div>
      <p className="replay-count">
        {feed.count} illustrative incidents · No live dispatch access
      </p>
      <div className="latest-incidents">
        <div>
          <h3>Latest Incidents</h3>
          <button onClick={onHistory}>History</button>
        </div>
        {feed.incidents.map((incident) => (
          <button key={`${incident.time}-${incident.description}`} onClick={() => onIncident(incident.id)}>
            <span>{incident.time}</span>
            <strong>{incident.description}</strong>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
        ))}
      </div>
    </article>
  )
}

function ReplayScreen({
  navigate,
  openLocationSearch,
  onOpenIncident,
  onOpenHistory,
}: {
  navigate: (screen: Screen) => void
  openLocationSearch: (backTo: Screen) => void
  onOpenIncident: (id: string, backTo: Screen) => void
  onOpenHistory: (feed: string) => void
}) {
  const feeds = [
    {
      name: "Flint City Fire",
      area: "Flint sample area",
      count: 3,
      incidents: [
        { time: "3:18 PM", description: "Sample commercial fire response", id: "fire" },
        { time: "1:42 PM", description: "Illustrative alarm response", id: "fire" },
      ],
    },
    {
      name: "Genesee County EMS",
      area: "County sample area",
      count: 2,
      incidents: [
        { time: "2:05 PM", description: "Sample medical assistance call", id: "medical" },
        { time: "11:20 AM", description: "Illustrative EMS response", id: "medical" },
      ],
    },
    {
      name: "Sample EMS Dispatch",
      area: "UM-Flint test area",
      count: 2,
      incidents: [
        { time: "12:44 PM", description: "Campus-area sample medical call", id: "medical" },
      ],
    },
    {
      name: "Sample Fire Dispatch",
      area: "Downtown Flint test area",
      count: 1,
      incidents: [
        { time: "10:12 AM", description: "Downtown sample fire response", id: "fire" },
      ],
    },
  ]
  const [playing, setPlaying] = useState<Record<string, boolean>>({})
  const allPlaying = feeds.every((feed) => playing[feed.name])

  return (
    <div className="screen">
      <header className="replay-header">
        <Brand compact />
        <h1>Replay</h1>
        <button
          className={allPlaying ? "is-playing" : ""}
          onClick={() =>
            setPlaying(
              Object.fromEntries(feeds.map((feed) => [feed.name, !allPlaying])),
            )
          }
        >
          {allPlaying ? "Pause All" : "Play All"}
        </button>
      </header>
      <main className="content replay-page">
        <section className="trending-alerts">
          <div>
            <strong>Trending Alerts</strong>
            <span>Fictional samples</span>
          </div>
          {[
            "Reported theft near campus",
            "Fire response in a commercial test area",
            "Medical assistance call near UM-Flint",
          ].map((headline, index) => (
            <button
              key={headline}
              onClick={() =>
                onOpenIncident(index === 0 ? "theft" : index === 1 ? "fire" : "medical", "replay")
              }
            >
              <span>{index + 1}</span>
              {headline}
            </button>
          ))}
        </section>
        <button
          className="replay-location"
          onClick={() => openLocationSearch("replay")}
        >
          <img src={`${A}/36a7f.svg`} alt="" />
          <span>
            <small>Replay location</small>
            <strong>University of Michigan–Flint</strong>
          </span>
          <img src={`${A}/22de5.svg`} alt="" />
        </button>
        <div className="replay-feeds">
          {feeds.map((feed) => (
            <ReplayFeedCard
              key={feed.name}
              feed={feed}
              playing={!!playing[feed.name]}
              onToggle={() =>
                setPlaying((current) => ({
                  ...current,
                  [feed.name]: !current[feed.name],
                }))
              }
              onIncident={(id) => onOpenIncident(id, "replay")}
              onHistory={() => onOpenHistory(feed.name)}
            />
          ))}
        </div>
      </main>
      <BottomNav active="replay" navigate={navigate} />
    </div>
  )
}

function FeedHistory({
  navigate,
  feedName,
  onOpenIncident,
}: {
  navigate: (screen: Screen) => void
  feedName: string
  onOpenIncident: (id: string, backTo: Screen) => void
}) {
  return (
    <div className="screen">
      <SectionHeader title="Feed History" backTo="replay" navigate={navigate} />
      <main className="content feature-page">
        <div className="section-heading">
          <h2>{feedName}</h2>
          <p>Older fictional sample entries · No live recordings</p>
        </div>
        {[
          ["Oct 13 · 4:20 PM", "Illustrative response entry", "fire"],
          ["Oct 12 · 9:14 AM", "Sample dispatch history item", "medical"],
          ["Oct 11 · 6:05 PM", "Archived prototype event", "theft"],
        ].map(([time, description, id]) => (
          <button
            className="history-entry"
            key={time}
            onClick={() => onOpenIncident(id, "feed-history")}
          >
            <span>{time}</span>
            <strong>{description}</strong>
            <img src={`${A}/22de5.svg`} alt="" />
          </button>
        ))}
      </main>
      <BottomNav active="replay" navigate={navigate} />
    </div>
  )
}

function AuthField({
  label,
  placeholder,
  password = false,
  hint,
}: {
  label: string
  placeholder: string
  password?: boolean
  hint?: string
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-input">
        <input
          type={password && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          aria-label={label.replace(" *", "")}
        />
        {password && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </span>
      {hint && <small>{hint}</small>}
    </label>
  )
}

function AuthScreen({
  mode,
  navigate,
}: {
  mode: "sign-in" | "create-account"
  navigate: (screen: Screen) => void
}) {
  const isSignIn = mode === "sign-in"

  return (
    <div className="auth-screen">
      <header className="auth-brand">
        <Brand />
      </header>
      <main className="auth-content">
        <section className="auth-heading">
          <h1>{isSignIn ? "Welcome back." : "Create your account."}</h1>
          <p>
            {isSignIn
              ? "Sign in to your PHASE experience."
              : "A more informed day starts here."}
          </p>
        </section>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            navigate("home")
          }}
        >
          {!isSignIn && (
            <AuthField label="Full name *" placeholder="Your full name" />
          )}
          <AuthField label="Email *" placeholder="you@example.com" />
          <AuthField
            label="Password *"
            placeholder={isSignIn ? "Enter your password" : "Create a password"}
            password
            hint={isSignIn ? undefined : "Use at least 8 characters."}
          />
          {!isSignIn && (
            <AuthField
              label="Confirm password *"
              placeholder="Re-enter your password"
              password
            />
          )}
          {isSignIn && (
            <button type="button" className="forgot-link">
              Forgot Password?
            </button>
          )}
          <button type="submit" className="auth-submit">
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="auth-switch">
          {isSignIn ? "New to PHASE?" : "Already have an account?"}
          <button
            onClick={() =>
              navigate(isSignIn ? "create-account" : "sign-in")
            }
          >
            {isSignIn ? "Create Account" : "Sign In"}
          </button>
        </p>
      </main>
      <footer className="auth-footer">
        Prototype only · No real accounts are created.
      </footer>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("sign-in")
  const [category, setCategory] = useState<Category>("Theft")
  const [zones, setZones] = useState(["Campus", "Downtown route"])
  const [readAlerts, setReadAlerts] = useState<string[]>([])
  const [alertsCleared, setAlertsCleared] = useState(false)
  const [detailIncident, setDetailIncident] = useState("theft")
  const [detailBack, setDetailBack] = useState<Screen>("results")
  const [locationSearchBack, setLocationSearchBack] = useState<Screen>("map")
  const [filtersBack, setFiltersBack] = useState<Screen>("home")
  const [historyFeed, setHistoryFeed] = useState("Flint City Fire")
  const [filterMatchCount, setFilterMatchCount] = useState(6)
  const [mapLocation, setMapLocation] = useState(
    "University of Michigan–Flint, Flint, MI",
  )

  const navigate = (next: Screen) => {
    if (next === "home" || next === "map" || next === "results") {
      setDetailIncident("theft")
      setDetailBack("results")
    }
    setScreen(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openSampleIncident = (id: string, backTo: Screen) => {
    setDetailIncident(id)
    setDetailBack(backTo)
    setScreen("details")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openLocationSearch = (backTo: Screen) => {
    setLocationSearchBack(backTo)
    setScreen("location-search")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openFilters = (backTo: Screen) => {
    setFiltersBack(backTo)
    setScreen("filters")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openFeedHistory = (feed: string) => {
    setHistoryFeed(feed)
    setScreen("feed-history")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openMapLocation = (location: string) => {
    setMapLocation(
      location.includes("Flint, MI") ? location : `${location}, Flint, MI`,
    )
    setScreen("map")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const chooseCategory = (next: Category) => {
    setCategory(next)
    navigate("results")
  }

  if (screen === "sign-in" || screen === "create-account")
    return <AuthScreen mode={screen} navigate={navigate} />
  if (screen === "home")
    return (
      <Home
        navigate={navigate}
        chooseCategory={chooseCategory}
        openLocationSearch={openLocationSearch}
        onOpenFilters={openFilters}
        onOpenIncident={openSampleIncident}
        matchCount={filterMatchCount}
      />
    )
  if (screen === "map")
    return (
      <MapTab
        navigate={navigate}
        chooseCategory={chooseCategory}
        onOpenIncident={openSampleIncident}
        onOpenFilters={openFilters}
        openLocationSearch={openLocationSearch}
        matchCount={filterMatchCount}
        selectedLocation={mapLocation}
      />
    )
  if (screen === "location-search")
    return (
      <LocationSearch
        navigate={navigate}
        backTo={locationSearchBack}
        onOpenMap={openMapLocation}
      />
    )
  if (screen === "filters")
    return (
      <AdvancedFilters
        navigate={navigate}
        backTo={filtersBack}
        onConfirm={setFilterMatchCount}
      />
    )
  if (screen === "replay")
    return (
      <ReplayScreen
        navigate={navigate}
        openLocationSearch={openLocationSearch}
        onOpenIncident={openSampleIncident}
        onOpenHistory={openFeedHistory}
      />
    )
  if (screen === "feed-history")
    return (
      <FeedHistory
        navigate={navigate}
        feedName={historyFeed}
        onOpenIncident={openSampleIncident}
      />
    )
  if (screen === "results")
    return (
      <Results
        category={category}
        setCategory={setCategory}
        navigate={navigate}
      />
    )
  if (screen === "details")
    return (
      <Details
        navigate={navigate}
        incidentId={detailIncident}
        backTo={detailBack}
      />
    )
  if (screen === "alerts")
    return (
      <AlertsScreen
        navigate={navigate}
        onOpenAlert={(id) => openSampleIncident(id, "alerts")}
        onOpenFilters={openFilters}
        matchCount={filterMatchCount}
        readAlerts={readAlerts}
        setReadAlerts={setReadAlerts}
        cleared={alertsCleared}
        setCleared={setAlertsCleared}
      />
    )
  if (screen === "activity") return <ActivityScreen navigate={navigate} />
  if (screen === "incident-notification")
    return <IncidentNotification navigate={navigate} />
  if (screen === "notification-settings")
    return <NotificationSettings navigate={navigate} />
  if (screen === "radius-settings")
    return <RadiusSettings navigate={navigate} />
  if (screen === "safety-zones")
    return (
      <SafetyZones navigate={navigate} zones={zones} setZones={setZones} />
    )
  if (screen === "share-incident")
    return <ShareIncident navigate={navigate} />
  if (screen === "incident-audio")
    return <IncidentAudio navigate={navigate} />
  if (screen === "my-alerts") return <MyAlerts navigate={navigate} />
  return <ProfileSettings navigate={navigate} />
}
