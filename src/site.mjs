const siteUrl = "https://www.hopefulheartsltd.com";

const contact = {
  phoneDisplay: "+353 87 277 9096",
  phoneHref: "+353872779096",
  agencyPhoneDisplay: "+353 83 339 8580",
  agencyPhoneHref: "+353833398580",
  primaryEmail: "info@hopefulheartsltd.com",
  secondaryEmail: "hopefulheartsscs@gmail.com",
  agencyEmail: "hr@hopefulheartsltd.com",
  address: "21 Lakeview, The Fair Green, Cavan, H12 DX93",
  availability: "Flexible times, subject to availability",
};

const mapAddress = encodeURIComponent(contact.address);
const mapEmbedUrl = `https://www.google.com/maps?q=${mapAddress}&amp;z=15&amp;output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&amp;destination=${mapAddress}&amp;travelmode=driving`;
const whatsappUrl = `https://wa.me/353872779096?text=${encodeURIComponent("Hello Hopeful Hearts, I would like to make an enquiry.")}`;

const navigation = [
  ["/", "Home"],
  ["/about-us/", "About"],
  ["/services/", "Services"],
  ["/agency-services/", "Agency services"],
  ["/contact/", "Contact"],
];

const services = [
  {
    name: "Supervised Family Access Service",
    copy:
      "We facilitate supervised visits between people using our service and their families in a controlled, safe environment.",
  },
  {
    name: "Supervised Access Transport for Children",
    copy:
      "We provide transport for people who would otherwise be unable to attend an arranged family access visit.",
  },
  {
    name: "Community Outreach Support Service",
    copy:
      "Person-centred community support helps individuals develop appropriate social skills as they take part in their communities.",
  },
  {
    name: "Emergency Outreach Support Service",
    copy:
      "Urgent community support is available for individuals facing sudden, unplanned changes in their circumstances, including at short notice.",
  },
  {
    name: "Other Emergency Support Service",
    copy:
      "We support our funders by providing urgent assistance to children facing sudden, unplanned changes, while maintaining the quality of our service regardless of notice period.",
  },
];

const faqs = [
  {
    question: "What qualifications and training do Hopeful Hearts Ltd team members have?",
    answer:
      "All Hopeful Hearts Ltd team members are fully trained and experienced healthcare and social care professionals. They maintain a high level of professionalism, understand their duties of care, and work diligently to provide person-centred, effective and safe support.",
  },
  {
    question: "How does Hopeful Hearts Ltd handle discharges from its service?",
    answer:
      "All discharges are conducted in consultation with the individual and, where appropriate, their representatives. Discharges are planned and carried out safely, with the individual’s wellbeing in mind.",
  },
  {
    question: "What kind of training do Hopeful Hearts Ltd team members receive?",
    answer:
      "Team training includes Children First, Person-Centred Planning, Positive Behaviour Support, Managing Challenging Behaviour, Manual Handling, Safeguarding, Risk Assessment, Basic First Aid, Fire Safety Awareness, Hand Hygiene, Infection Control, Food Hygiene, Intimate Care, Personal Protective Equipment and Autism Awareness. This training helps team members meet the assessed needs of each individual.",
  },
  {
    question: "How can I make a complaint to Hopeful Hearts Ltd?",
    answer:
      "Complaints can be made verbally or in writing to the Complaints Officer. The Complaints Officer is identified in the easy-read guide for individuals, and a complaints form is available to everyone using Hopeful Hearts Ltd services.",
  },
];

function navLinks(route, className = "site-nav") {
  return `<nav class="${className}" aria-label="Primary navigation">
    <ul>
      ${navigation
        .map(([href, label]) => {
          const active = href === route;
          return `<li><a href="${href}"${active ? ' aria-current="page"' : ""}>${label}</a></li>`;
        })
        .join("")}
    </ul>
  </nav>`;
}

function header(route) {
  return `<header class="site-header" data-site-header>
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Hopeful Hearts, home" translate="no">
        <img src="/assets/hopeful-hearts-mark.png" alt="" width="375" height="375" fetchpriority="high">
        <span class="brand-fallback" aria-hidden="true"><strong>Hopeful Hearts</strong><small>Family support &amp; social care</small></span>
      </a>
      ${navLinks(route)}
      <a class="button button-small button-primary header-cta" href="/contact/">Get in touch</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" data-menu-toggle>
        <span>Menu</span><span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-navigation" data-mobile-menu aria-hidden="true">
      <div class="container mobile-menu-inner">
        ${navLinks(route, "mobile-nav")}
        <div class="mobile-menu-contact">
          <a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a>
          <a href="mailto:${contact.primaryEmail}">${contact.primaryEmail}</a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="footer-logo" href="/" aria-label="Hopeful Hearts, home">
          <img src="/assets/hopeful-hearts-mark.png" alt="Hopeful Hearts" width="375" height="375" loading="lazy">
        </a>
        <p>Supporting families, strengthening relationships and restoring hope.</p>
      </div>
      <div>
        <h2>Explore</h2>
        <ul class="footer-links">
          ${navigation.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul class="footer-links footer-contact">
          <li><a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></li>
          <li><a href="mailto:${contact.primaryEmail}">${contact.primaryEmail}</a></li>
          <li><a href="mailto:${contact.secondaryEmail}">${contact.secondaryEmail}</a></li>
          <li><address>${contact.address}</address></li>
        </ul>
      </div>
      <div class="partner-block">
        <h2>Our partner</h2>
        <img class="partner-logo footer-partner-logo" src="/assets/tusla-logo.png" alt="Tusla — An Ghníomhaireacht um Leanaí agus an Teaghlach, Child and Family Agency" width="484" height="484" loading="lazy">
      </div>
    </div>
    <div class="container footer-base">
      <p>&copy; ${new Date().getFullYear()} Hopeful Hearts Ltd.</p>
      <p>${contact.availability}</p>
    </div>
  </footer>`;
}

function contactCta({ title = "Let’s talk about the support you need.", copy = "Contact Hopeful Hearts for a calm, confidential conversation about our services." } = {}) {
  return `<section class="contact-cta section" aria-labelledby="contact-cta-title">
    <div class="container contact-cta-inner">
      <div>
        <p class="eyebrow light">Get in touch</p>
        <h2 id="contact-cta-title">${title}</h2>
        <p>${copy}</p>
      </div>
      <div class="contact-cta-actions">
        <a class="button button-light" href="/contact/">Contact us</a>
        <a class="text-link light-link" href="tel:${contact.phoneHref}">Call ${contact.phoneDisplay}</a>
      </div>
    </div>
  </section>`;
}

function whatsappWidget() {
  return `<a class="whatsapp-widget" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Hopeful Hearts on WhatsApp (opens in a new tab)">
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M26.7 5.2A14.7 14.7 0 0 0 3.6 22.9L1.5 30.5l7.8-2a14.7 14.7 0 0 0 17.4-23.3ZM16 27.9c-2.2 0-4.4-.6-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.3 12.3 0 1 1 16 27.9Zm6.8-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8a11.2 11.2 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8l.6-.7.4-.7c.1-.2 0-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6H11c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.4s1.5 3.9 1.7 4.2c.2.3 2.9 4.5 7.1 6.3 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"/>
    </svg>
  </a>`;
}

function locationSection() {
  return `<section class="section location-section" aria-labelledby="location-title">
    <div class="container location-layout">
      <div class="location-copy">
        <p class="eyebrow">Find us in Cavan</p>
        <h2 id="location-title">Visit Hopeful Hearts.</h2>
        <p>Our registered address is:</p>
        <address>${contact.address}</address>
        <p class="location-note">Use the map to explore the area, or open Google Maps for turn-by-turn directions.</p>
        <a class="button button-secondary" href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Get directions <span class="sr-only">(opens in a new tab)</span></a>
      </div>
      <div class="map-frame">
        <iframe title="Google map showing Hopeful Hearts at ${contact.address}" src="${mapEmbedUrl}" width="800" height="520" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </div>
  </section>`;
}

function layout({ route, title, description, body }) {
  const canonical = `${siteUrl}${route === "/" ? "/" : route}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#1f1053">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${canonical}">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_IE">
  <meta property="og:site_name" content="Hopeful Hearts Ltd">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}/assets/hopeful-hearts-og-brand.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Hopeful Hearts — Supporting families. Restoring hope.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${siteUrl}/assets/hopeful-hearts-og-brand.jpg">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Hopeful Hearts Ltd","url":"${siteUrl}","telephone":"${contact.phoneDisplay}","email":"${contact.primaryEmail}","address":{"@type":"PostalAddress","streetAddress":"21 Lakeview, The Fair Green","addressLocality":"Cavan","postalCode":"H12 DX93","addressCountry":"IE"}}</script>
  ${route === "/contact/" ? '<link rel="preconnect" href="https://www.google.com"><link rel="preconnect" href="https://maps.gstatic.com" crossorigin>' : ""}
  <link rel="stylesheet" href="/styles.css">
  <script src="/client.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  ${header(route)}
  <main id="main-content">${body}</main>
  ${footer()}
  ${whatsappWidget()}
</body>
</html>`;
}

function serviceIndex(items = services) {
  return `<ol class="service-index">
    ${items
      .map(
        (service) => `<li>
          <span class="service-marker" aria-hidden="true"></span>
          <div>
            <h3>${service.name}</h3>
            <p>${service.copy}</p>
          </div>
          <a class="service-link" href="/contact/" aria-label="Ask about ${service.name}">Ask about this service <span aria-hidden="true">→</span></a>
        </li>`,
      )
      .join("")}
  </ol>`;
}

function homePage() {
  return layout({
    route: "/",
    title: "Hopeful Hearts | Family Support & Social Care in Cavan",
    description:
      "Hopeful Hearts Ltd supports families and vulnerable individuals through supervised family access, community outreach, transport and urgent support.",
    body: `<section class="home-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Family support &amp; social care in Cavan</p>
          <h1>Restoring hope.<br><em>Supporting families.</em></h1>
          <p class="hero-lead">Hopeful Hearts Ltd focuses on reuniting families and empowering vulnerable individuals with safe, person-centred support.</p>
          <div class="button-row">
            <a class="button button-primary" href="/services/">Explore our services</a>
            <a class="button button-secondary" href="/contact/">Get in touch</a>
          </div>
          <p class="hero-contact"><span>Prefer to call?</span> <a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></p>
        </div>
        <div class="hero-visual">
          <div class="hero-visual-top">
            <img src="/assets/hopeful-hearts-mark.png" alt="Hopeful Hearts hands reaching upward brand mark" width="375" height="375" fetchpriority="high">
          </div>
          <blockquote>“We all need somebody to believe in us.”</blockquote>
          <div class="connection-motif" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
      </div>
    </section>

    <section class="section purpose-section" aria-labelledby="purpose-title">
      <div class="container editorial-split">
        <div>
          <p class="eyebrow">Here to help</p>
          <h2 id="purpose-title">A safe setting for connection, care and possibility.</h2>
        </div>
        <div class="prose-large">
          <p>Our primary goal is to restore hope to the people who use our services. We provide the possibility of reconciliation for families separated by a range of circumstances.</p>
          <a class="text-link" href="/about-us/">Learn about Hopeful Hearts <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section class="section services-preview" aria-labelledby="services-title">
      <div class="container">
        <div class="section-heading split-heading">
          <div><p class="eyebrow">How we can help</p><h2 id="services-title">Support shaped around real family needs.</h2></div>
          <p>Our services support individuals, families and referring organisations with calm, practical care.</p>
        </div>
        ${serviceIndex(services.slice(0, 4))}
        <div class="section-end"><a class="button button-secondary" href="/services/">View every service</a></div>
      </div>
    </section>

    <section class="section agency-teaser-section" aria-labelledby="agency-teaser-title">
      <div class="container agency-teaser-layout">
        <div>
          <p class="eyebrow light">For care organisations</p>
          <h2 id="agency-teaser-title">Relief staffing and resident transport.</h2>
        </div>
        <div class="agency-teaser-copy">
          <p>Hopeful Hearts also provides HCA and Social Care Worker relief staffing across Cavan, Monaghan, Louth and Westmeath, alongside resident appointment transport throughout Ireland.</p>
          <div class="button-row">
            <a class="button button-light" href="/agency-services/">Explore agency services</a>
            <a class="text-link light-link" href="mailto:${contact.agencyEmail}">Email the agency team <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section approach-section" aria-labelledby="approach-title">
      <div class="container approach-grid">
        <div class="approach-intro">
          <p class="eyebrow">Our approach</p>
          <h2 id="approach-title">Professional support, grounded in respect.</h2>
          <p>We work to create the conditions in which relationships can develop safely and each person can be treated as an individual.</p>
        </div>
        <div class="principles">
          <article><span class="principle-mark" aria-hidden="true"></span><h3>Safety first</h3><p>A controlled, nurturing setting supports safe contact and considered care.</p></article>
          <article><span class="principle-mark" aria-hidden="true"></span><h3>Person-centred</h3><p>Support responds to each person’s story, circumstances and assessed needs.</p></article>
          <article><span class="principle-mark" aria-hidden="true"></span><h3>Positive relationships</h3><p>We encourage healthy family bonds and appropriate social and parenting skills.</p></article>
        </div>
      </div>
    </section>

    <section class="section values-teaser" aria-labelledby="values-title">
      <div class="container values-teaser-inner">
        <p class="eyebrow">What guides us</p>
        <h2 id="values-title">Passion. Integrity. Respect.</h2>
        <p>We put care into our work, act honestly and recognise the dignity and unique journey of every person we support.</p>
        <a class="text-link" href="/about-us/#values">Read about our values <span aria-hidden="true">→</span></a>
      </div>
    </section>

    <section class="partner-section section" aria-labelledby="partner-title">
      <div class="container partner-layout">
        <div><p class="eyebrow">Working in partnership</p><h2 id="partner-title">Connected support for children and families.</h2></div>
        <div class="partner-card"><span>Our partner</span><img class="partner-logo" src="/assets/tusla-logo.png" alt="Tusla — An Ghníomhaireacht um Leanaí agus an Teaghlach, Child and Family Agency" width="484" height="484" loading="lazy"></div>
      </div>
    </section>
    ${contactCta()}`,
  });
}

function aboutPage() {
  return layout({
    route: "/about-us/",
    title: "About Hopeful Hearts | Family Reconciliation & Support",
    description:
      "Learn about the objective, vision, mission and values that guide Hopeful Hearts Ltd in supporting families and vulnerable individuals.",
    body: `<section class="page-hero about-hero">
      <div class="container page-hero-grid">
        <div>
          <p class="eyebrow">About Hopeful Hearts</p>
          <h1>We are here to help.</h1>
        </div>
        <div class="page-hero-copy"><p>Our primary goal is to restore hope to those who use our services. We focus on creating the possibility of reconciliation for families separated by a range of circumstances.</p></div>
      </div>
    </section>

    <section class="section objective-section" aria-labelledby="objective-title">
      <div class="container objective-grid">
        <p class="vertical-label">Our objective</p>
        <div>
          <h2 id="objective-title">Fostering bonds, ensuring safety, rebuilding families.</h2>
          <div class="two-column-copy">
            <p>Our objective is to provide a safe and nurturing setting where children can develop or renew healthy relationships with their biological parents.</p>
            <p>We are committed to maintaining everyone’s safety while encouraging and reinforcing positive social and parenting skills. Our ultimate goal is to reunite families and help them live together again whenever possible.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section vision-mission" aria-label="Our vision and mission">
      <div class="container vm-grid">
        <article class="vision-panel">
          <p class="eyebrow">Our vision</p>
          <h2>Restore hope in every person who uses our service.</h2>
          <p>Our vision is to rekindle hope in every individual and family that comes to us, guiding them towards a brighter future.</p>
        </article>
        <article class="mission-panel">
          <p class="eyebrow light">Our mission</p>
          <h2>Providing a safe haven and empowering individuals.</h2>
          <p>Our mission is to offer a safe haven to people who have experienced trauma due to divorce, separation, family dysfunction or other life challenges. We support children and vulnerable adults with diverse needs, helping them to overcome their circumstances.</p>
        </article>
      </div>
    </section>

    <section class="section values-section" id="values" aria-labelledby="about-values-title">
      <div class="container">
        <div class="section-heading narrow-heading"><p class="eyebrow">Our values</p><h2 id="about-values-title">The principles behind every interaction.</h2></div>
        <div class="values-grid">
          <article><span class="value-mark" aria-hidden="true"></span><h3>Passion</h3><p>We put our hearts into our work so that each individual receives the best possible support and care.</p></article>
          <article><span class="value-mark" aria-hidden="true"></span><h3>Integrity</h3><p>Honesty, transparency and ethical behaviour are central to our work. We treat every individual with respect and value their dignity and worth.</p></article>
          <article><span class="value-mark" aria-hidden="true"></span><h3>Respect</h3><p>Everyone is unique. We recognise each person’s story, experiences and needs, and tailor our services with respect for their individual journey.</p></article>
        </div>
      </div>
    </section>
    ${contactCta({ title: "Start a conversation with our team.", copy: "If you are seeking support for a family member, individual or referring organisation, we are here to listen." })}`,
  });
}

function servicesPage() {
  return layout({
    route: "/services/",
    title: "Services | Hopeful Hearts Family Support & Outreach",
    description:
      "Explore Hopeful Hearts services: supervised family access, access transport, community outreach and urgent support for children and families.",
    body: `<section class="page-hero services-hero">
      <div class="container page-hero-grid">
        <div><p class="eyebrow">Our services</p><h1>Practical support for families and individuals.</h1></div>
        <div class="page-hero-copy"><p>We are committed to a high standard of service for everyone we support, working in partnership with our funders to respond to diverse needs with care and clarity.</p></div>
      </div>
    </section>

    <section class="section full-services" aria-labelledby="service-list-title">
      <div class="container">
        <div class="section-heading split-heading"><div><p class="eyebrow">How we can help</p><h2 id="service-list-title">Five connected areas of support.</h2></div><p>Each service is grounded in individual needs, safe practice and clear communication.</p></div>
        ${serviceIndex()}
      </div>
    </section>

    <section class="editorial-image-section family-service-image" aria-label="Family connection">
      <div class="container editorial-image-frame">
        <img src="/assets/family-connection-dock.jpg" alt="A parent holding a young child while sitting together beside the water" width="971" height="532" loading="lazy">
      </div>
    </section>

    <section class="section important-section" aria-labelledby="important-title">
      <div class="container important-layout">
        <div class="important-heading"><p class="eyebrow">Important information</p><h2 id="important-title">Understanding supervised family access.</h2></div>
        <div class="info-list">
          <article><h3>Supervised access</h3><p>In some situations, a court may decide that an access order requires supervision. This means an adult other than the parent having access must be present throughout the time the parent and child are together.</p></article>
          <article><h3>Family support centres in Ireland</h3><p>In Ireland, the Child and Family Agency (Tusla) is responsible for providing a safe place for children of separated parents to meet with one or both parents, including when recommended by a court. A professional supervises the visit in a safe environment, and the level of supervision depends on the court order.</p></article>
          <article><h3>Positive parental relationships</h3><p>At Hopeful Hearts, we believe it is important for children’s development to maintain a positive relationship with both parents, even when they do not live together.</p></article>
        </div>
      </div>
    </section>
    ${contactCta({ title: "Need to discuss a service or referral?", copy: "Tell us what support you are looking for and we will help you understand the most relevant next step." })}`,
  });
}

function agencyServicesPage() {
  return layout({
    route: "/agency-services/",
    title: "Agency Staffing & Resident Transport | Hopeful Hearts",
    description:
      "Healthcare Assistant and Social Care Worker relief staffing across Cavan, Monaghan, Louth and Westmeath, plus resident appointment transport throughout Ireland.",
    body: `<section class="page-hero agency-hero">
      <div class="container agency-hero-grid">
        <div>
          <p class="eyebrow light">Agency staffing &amp; resident transport</p>
          <h1>Professional support for care services.</h1>
          <p class="agency-hero-lead">Hopeful Hearts provides vetted HCA and Social Care Worker relief personnel for healthcare and residential settings, together with nationwide resident appointment transport.</p>
          <div class="button-row">
            <a class="button button-light" href="mailto:${contact.agencyEmail}">Discuss staffing needs</a>
            <a class="button button-outline-light" href="tel:${contact.agencyPhoneHref}">Call ${contact.agencyPhoneDisplay}</a>
          </div>
        </div>
        <aside class="agency-proof" aria-label="Agency service summary">
          <p><span>Regional staffing</span>Cavan, Monaghan, Louth &amp; Westmeath</p>
          <p><span>Resident transport</span>Available throughout Ireland</p>
          <p><span>2026 recognition</span>Best Family Reconciliation &amp; Community Support Service – Ulster, Irish Enterprise Awards</p>
        </aside>
      </div>
    </section>

    <section class="section agency-intro" aria-labelledby="agency-intro-title">
      <div class="container editorial-split">
        <div><p class="eyebrow">Grounded in experience</p><h2 id="agency-intro-title">Led by practitioners who understand care settings.</h2></div>
        <div class="prose-large">
          <p>Established in 2024, Hopeful Hearts has expanded its community-focused support into professional agency staffing and nationwide residential transport. The service is overseen by an experienced, qualified Social Care Worker and shaped around staffing pressures, operational realities and HIQA auditing requirements.</p>
          <p>Our aim is to provide dependable people and clear documentation, while fitting respectfully into each organisation’s existing team and care environment.</p>
        </div>
      </div>
    </section>

    <section class="editorial-image-section agency-care-image" aria-label="Care in practice">
      <div class="container editorial-image-frame">
        <img src="/assets/care-support-window.jpg" alt="A care professional supporting an older woman seated beside a window" width="1171" height="770" loading="lazy">
      </div>
    </section>

    <section class="section agency-tiers-section" aria-labelledby="agency-tiers-title">
      <div class="container">
        <div class="section-heading narrow-heading"><p class="eyebrow">Relief staffing</p><h2 id="agency-tiers-title">Two specialist staffing pathways.</h2></div>
        <div class="agency-tier-grid">
          <article>
            <p class="tier-label">Healthcare Assistants</p>
            <h3>Dependable HCA relief services</h3>
            <p>Support for elderly care, nursing environments and specialised physical disability units.</p>
            <ul class="detail-list">
              <li>Minimum QQI Level 5 qualification in Healthcare</li>
              <li>Practical certification in Patient Moving &amp; Handling</li>
              <li>Training in Safeguarding Vulnerable Adults and Infection Control</li>
              <li>Local professionals prepared to work within existing teams</li>
            </ul>
          </article>
          <article>
            <p class="tier-label">Social Care Workers</p>
            <h3>Specialised social care relief</h3>
            <p>Therapeutic relief staff for children’s residential services, foster care support and disability units.</p>
            <ul class="detail-list">
              <li>Degree-qualified Social Care professionals</li>
              <li>Experience supporting complex emotional needs and behaviour support plans</li>
              <li>MAPA, CPI or Crisis Prevention framework certification</li>
              <li>Vetting under Tusla’s Children First safeguarding guidelines</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="section agency-coverage-section" aria-labelledby="coverage-title">
      <div class="container agency-coverage-layout">
        <div>
          <p class="eyebrow">Local staff. Nationwide transport.</p>
          <h2 id="coverage-title">Clear coverage for different operational needs.</h2>
        </div>
        <div class="coverage-list">
          <article><h3>Regional relief staffing</h3><p>Temporary HCA and SCW deployments focus on Cavan, Monaghan, Louth and Westmeath to support responsive shift fulfilment.</p></article>
          <article><h3>All-Ireland resident transport</h3><p>Resident appointment transport is available nationwide for journeys to hospitals, clinics and specialist medical hubs.</p></article>
          <article><h3>A collaborative transport model</h3><p>The Hopeful Hearts driver manages the agency care vehicle, route planning, parking and travel logistics. The client provides one internal team member to act as the resident’s clinical escort during transit.</p></article>
        </div>
      </div>
    </section>

    <section class="section compliance-section" aria-labelledby="compliance-title">
      <div class="container compliance-layout">
        <div class="compliance-heading">
          <p class="eyebrow light">Compliance passport</p>
          <h2 id="compliance-title">Audit-ready information before an assignment begins.</h2>
          <p>Hopeful Hearts states that each worker’s digital compliance file is checked internally and supplied to the facility before deployment.</p>
        </div>
        <ul class="compliance-list">
          <li><strong>Enhanced Garda Vetting</strong><span>Processed directly through Hopeful Hearts Ltd.</span></li>
          <li><strong>Professional references</strong><span>Three independently verified references and a full timeline gap analysis.</span></li>
          <li><strong>Training validation</strong><span>Certified checks of mandatory medical, fire safety and social care training records.</span></li>
        </ul>
      </div>
    </section>

    <section class="section onboarding-section" aria-labelledby="onboarding-title">
      <div class="container">
        <div class="section-heading split-heading"><div><p class="eyebrow">Partnering with management</p><h2 id="onboarding-title">A clear 3-step onboarding process.</h2></div><p>From regular roster gaps to urgent relief and transport scheduling, the process begins with understanding the organisation’s operational needs.</p></div>
        <ol class="onboarding-list">
          <li><span>01</span><div><h3>Consultation</h3><p>Management reviews roster gaps, behavioural requirements and transportation needs.</p></div></li>
          <li><span>02</span><div><h3>Agreement</h3><p>A standard Service Level Agreement and invoice schedule are put in place.</p></div></li>
          <li><span>03</span><div><h3>Deployment</h3><p>The organisation receives access to the booking line for block-booking, transport scheduling or crisis relief staff.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="section agency-contact-section" aria-labelledby="agency-contact-title">
      <div class="container agency-contact-layout">
        <div><p class="eyebrow">Agency enquiries</p><h2 id="agency-contact-title">Plan staffing or resident transport with our team.</h2><p>Contact the agency team directly to discuss coverage, scheduling, current rates, service terms and operational requirements.</p></div>
        <div class="agency-contact-actions">
          <a class="button button-primary" href="mailto:${contact.agencyEmail}">Email the agency team</a>
          <a class="text-link" href="mailto:${contact.agencyEmail}">${contact.agencyEmail}</a>
          <a class="text-link" href="tel:${contact.agencyPhoneHref}">${contact.agencyPhoneDisplay}</a>
        </div>
      </div>
    </section>
    ${contactCta({ title: "Discuss staffing or resident transport.", copy: `Contact the agency team on ${contact.phoneDisplay} or ${contact.agencyPhoneDisplay} to discuss coverage, scheduling and the next steps.` })}`,
  });
}

function faqAccordion() {
  return `<div class="faq-list" data-accordion>
    ${faqs
      .map(
        ({ question, answer }, index) => `<article class="faq-item">
          <h3>
            <button type="button" aria-expanded="${index === 0}" aria-controls="faq-panel-${index + 1}" id="faq-button-${index + 1}" data-faq-button>
              <span>${question}</span><span class="faq-icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="faq-answer" id="faq-panel-${index + 1}" role="region" aria-labelledby="faq-button-${index + 1}" aria-hidden="${index !== 0}">
            <div><p>${answer}</p></div>
          </div>
        </article>`,
      )
      .join("")}
  </div>`;
}

function contactPage() {
  return layout({
    route: "/contact/",
    title: "Contact Hopeful Hearts | Family Support in Cavan",
    description:
      "Contact Hopeful Hearts Ltd in Cavan by phone, email or enquiry form, and read answers to frequently asked questions about our support.",
    body: `<section class="page-hero contact-hero">
      <div class="container page-hero-grid">
        <div><p class="eyebrow">Contact Hopeful Hearts</p><h1>A calm first step starts with a conversation.</h1></div>
        <blockquote class="contact-quote">“All kids need is a little help, a little hope and somebody who believes in them.”<cite>— Magic Johnson</cite></blockquote>
      </div>
    </section>

    <section class="section contact-section" aria-labelledby="contact-form-title">
      <div class="container contact-layout">
        <aside class="contact-details" aria-labelledby="contact-details-title">
          <p class="eyebrow">Contact details</p>
          <h2 id="contact-details-title">Hopeful Hearts Ltd</h2>
          <dl>
            <div><dt>Telephone</dt><dd><a href="tel:${contact.phoneHref}">${contact.phoneDisplay}</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:${contact.primaryEmail}">${contact.primaryEmail}</a><a href="mailto:${contact.secondaryEmail}">${contact.secondaryEmail}</a></dd></div>
            <div><dt>Address</dt><dd><address>${contact.address}</address></dd></div>
            <div><dt>Availability</dt><dd>${contact.availability}</dd></div>
          </dl>
        </aside>
        <div class="form-panel">
          <p class="eyebrow">Send an enquiry</p>
          <h2 id="contact-form-title">Tell us how we can help.</h2>
          <p class="form-intro">Fields marked <span aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required.</p>
          <form class="contact-form" novalidate data-contact-form>
            <div class="form-grid">
              <div class="field"><label for="first-name">First name <span aria-hidden="true">*</span></label><input id="first-name" name="firstName" type="text" autocomplete="given-name" required aria-describedby="first-name-error"><p class="field-error" id="first-name-error"></p></div>
              <div class="field"><label for="last-name">Last name <span aria-hidden="true">*</span></label><input id="last-name" name="lastName" type="text" autocomplete="family-name" required aria-describedby="last-name-error"><p class="field-error" id="last-name-error"></p></div>
            </div>
            <div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" inputmode="email" autocomplete="email" spellcheck="false" required aria-describedby="email-error"><p class="field-error" id="email-error"></p></div>
            <div class="field"><label for="message">Message <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="7" required aria-describedby="message-hint message-error"></textarea><p class="field-hint" id="message-hint">Please do not include sensitive personal or medical information.</p><p class="field-error" id="message-error"></p></div>
            <button class="button button-primary submit-button" type="submit">Submit enquiry</button>
            <div class="form-status" role="status" aria-live="polite" tabindex="-1" data-form-status></div>
          </form>
        </div>
      </div>
    </section>

    ${locationSection()}

    <section class="section faq-section" aria-labelledby="faq-title">
      <div class="container faq-layout">
        <div class="faq-heading"><p class="eyebrow">Frequently asked questions</p><h2 id="faq-title">Helpful information before you get in touch.</h2><p>If your question is not answered here, contact us directly and we will help where we can.</p></div>
        ${faqAccordion()}
      </div>
    </section>`,
  });
}

export const pages = {
  "/": homePage(),
  "/about-us/": aboutPage(),
  "/services/": servicesPage(),
  "/agency-services/": agencyServicesPage(),
  "/contact/": contactPage(),
};

export const notFoundPage = layout({
  route: "/404/",
  title: "Page Not Found | Hopeful Hearts",
  description: "The page you requested could not be found. Return to the Hopeful Hearts home page or contact our team.",
  body: `<section class="page-hero compact"><div class="container narrow"><p class="eyebrow">Page not found</p><h1>Let’s get you back to Hopeful Hearts.</h1><p class="page-hero-copy">The page you requested is not available.</p><a class="button button-primary" href="/">Return home</a></div></section>`,
});
