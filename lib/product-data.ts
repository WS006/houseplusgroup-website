// Static product data — sourced from Storyblok CMS and embedded for reliable SSR
// Last synced: 2026-04-24

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductData {
  name: string;
  category: 'solar' | 'appliances' | 'electronics';
  description: string;
  applications: string;
  specs: ProductSpec[];
  features: string[];
  coverImage: string;
  badge?: string;
}

export const PRODUCT_DATA: Record<string, ProductData> = {
  'solar-panel-500w': {
    name: '500W Monocrystalline Solar Panel',
    category: 'solar',
    badge: 'Best Seller',
    description: 'High-efficiency monocrystalline solar panel with 21.5% conversion rate, engineered for residential, commercial and off-grid installations worldwide.',
    applications: 'Rooftop solar systems, off-grid cabins, commercial solar farms, agricultural irrigation.',
    specs: [
      { key: 'Model', value: 'HP-SP500' },
      { key: 'Peak Power', value: '500W' },
      { key: 'Cell Type', value: 'Monocrystalline PERC' },
      { key: 'Efficiency', value: '21.5%' },
    ],
    features: [
      'Anti-reflective tempered glass surface for maximum light absorption',
      'Anodised aluminium alloy frame — corrosion-resistant and lightweight',
      'IP68-rated junction box with bypass diodes for shading protection',
    ],
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85',
  },
  'solar-inverter-3kw': {
    name: '3kW Pure Sine Wave Solar Inverter',
    category: 'solar',
    badge: 'CE Certified',
    description: 'Pure sine wave output inverter with built-in MPPT charge controller. Supports both grid-tie and off-grid operation for flexible deployment.',
    applications: 'Residential solar systems, small commercial installations, backup power solutions.',
    specs: [
      { key: 'Model', value: 'HP-INV3000' },
      { key: 'Rated Power', value: '3000W' },
      { key: 'Output Waveform', value: 'Pure Sine Wave' },
      { key: 'MPPT Efficiency', value: '≥99%' },
    ],
    features: [
      'Built-in MPPT charge controller with 99%+ tracking efficiency',
      'LCD display with real-time monitoring of voltage, current and power',
      'Multi-protection: over-voltage, over-current, short-circuit, thermal',
    ],
    coverImage: 'https://images.unsplash.com/photo-1620216503901-515bb5c34c30?w=900&q=85',
  },
  'lithium-battery-5kwh': {
    name: '5kWh LiFePO4 Lithium Battery',
    category: 'solar',
    badge: 'New',
    description: 'Long-cycle LiFePO4 battery pack with integrated BMS. Designed for solar energy storage with 6000+ charge cycles and a 10-year design life.',
    applications: 'Home solar energy storage, commercial backup power, off-grid systems.',
    specs: [
      { key: 'Model', value: 'HP-LFP5K' },
      { key: 'Capacity', value: '5kWh' },
      { key: 'Chemistry', value: 'LiFePO4' },
      { key: 'Cycle Life', value: '6000+ cycles' },
    ],
    features: [
      'Integrated BMS with cell balancing and temperature management',
      'Wide operating temperature range: -20°C to +60°C',
      'Stackable design — expandable to 30kWh with parallel connection',
    ],
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85',
  },
  'lead-acid-battery-100ah': {
    name: '100Ah Deep Cycle Lead-Acid Battery',
    category: 'solar',
    description: 'Maintenance-free VRLA deep-cycle battery suitable for solar storage, UPS and marine applications. Reliable performance in demanding environments.',
    applications: 'Solar energy storage, UPS backup, marine and RV applications.',
    specs: [
      { key: 'Model', value: 'HP-LA100' },
      { key: 'Capacity', value: '100Ah' },
      { key: 'Voltage', value: '12V' },
      { key: 'Type', value: 'VRLA AGM' },
    ],
    features: [
      'Valve-regulated sealed design — zero maintenance required',
      'Deep discharge recovery capability for extended service life',
      'Vibration-resistant construction for mobile and marine use',
    ],
    coverImage: 'https://images.unsplash.com/photo-1619641151040-af3bf8325790?w=900&q=85',
  },
  'charge-controller-60a': {
    name: 'MPPT Solar Charge Controller 60A',
    category: 'solar',
    description: 'Advanced MPPT algorithm with 99.5% tracking efficiency. LCD display, multi-protection, supports 12V/24V/48V battery systems.',
    applications: 'Off-grid solar systems, RV solar charging, remote monitoring stations.',
    specs: [
      { key: 'Model', value: 'HP-MPPT60' },
      { key: 'Max Charge Current', value: '60A' },
      { key: 'MPPT Efficiency', value: '99.5%' },
      { key: 'System Voltage', value: '12V/24V/48V Auto' },
    ],
    features: [
      'Advanced MPPT algorithm with 99.5% maximum power point tracking',
      'Backlit LCD display showing PV voltage, battery voltage and charge current',
      'Comprehensive protection: overcharge, over-discharge, short-circuit, reverse polarity',
    ],
    coverImage: 'https://images.unsplash.com/photo-1558444458-5f75bc94476c?w=900&q=85',
  },
  'solar-street-light-200w': {
    name: '200W All-in-One Solar Street Light',
    category: 'solar',
    description: 'Integrated solar panel, lithium battery and LED light in a single unit. Motion sensor, remote control, IP65 waterproof for outdoor installation.',
    applications: 'Street lighting, car parks, pathways, industrial yards, rural electrification.',
    specs: [
      { key: 'Model', value: 'HP-SSL200' },
      { key: 'LED Power', value: '200W' },
      { key: 'Battery', value: '60Ah LiFePO4' },
      { key: 'IP Rating', value: 'IP65' },
    ],
    features: [
      'All-in-one design — no external wiring required for installation',
      'PIR motion sensor with adjustable sensitivity and delay time',
      'Remote control for brightness adjustment and scheduling',
    ],
    coverImage: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?w=900&q=85',
  },
  'solar-fan-20w': {
    name: 'DC Solar Fan 20W',
    category: 'solar',
    description: 'Brushless DC motor fan powered directly by solar panel. Ideal for ventilation in off-grid cabins, greenhouses and livestock shelters.',
    applications: 'Greenhouse ventilation, livestock shelters, off-grid cabins, solar-powered workshops.',
    specs: [
      { key: 'Model', value: 'HP-SF20' },
      { key: 'Power', value: '20W' },
      { key: 'Voltage', value: '12V/24V DC' },
      { key: 'Airflow', value: '1200 m³/h' },
    ],
    features: [
      'Brushless DC motor for silent, efficient and long-lasting operation',
      'Direct solar panel connection — no battery required in daylight',
      'Corrosion-resistant ABS housing for outdoor and humid environments',
    ],
    coverImage: 'https://images.unsplash.com/photo-1565151443325814491ebe?w=900&q=85',
  },
  'solar-power-bank-20000mah': {
    name: '20000mAh Solar Power Bank',
    category: 'solar',
    description: 'Dual USB + USB-C output with 18W PD fast charge. Waterproof casing with built-in solar charging panel for outdoor and emergency use.',
    applications: 'Outdoor activities, camping, emergency backup power, travel charging.',
    specs: [
      { key: 'Model', value: 'HP-SPB20K' },
      { key: 'Capacity', value: '20000mAh' },
      { key: 'Output', value: 'USB-A ×2 + USB-C' },
      { key: 'Fast Charge', value: '18W PD' },
    ],
    features: [
      '18W USB-C PD fast charging for smartphones and tablets',
      'Built-in solar panel for emergency top-up in outdoor environments',
      'IPX4 waterproof and dustproof construction',
    ],
    coverImage: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=900&q=85',
  },
  'air-fryer-5-8l': {
    name: '5.8L Digital Air Fryer',
    category: 'appliances',
    badge: 'Top Rated',
    description: 'Large-capacity digital air fryer with 8 preset programmes, touch panel and 360° rapid air circulation technology for healthier, oil-free cooking.',
    applications: 'Home kitchens, catering, hospitality, food service businesses.',
    specs: [
      { key: 'Model', value: 'HP-AF58' },
      { key: 'Capacity', value: '5.8L' },
      { key: 'Power', value: '1700W' },
      { key: 'Temperature Range', value: '80–200°C' },
    ],
    features: [
      'Oil-free cooking with up to 80% less fat than traditional frying',
      'Digital touch screen with 8 one-touch preset programmes',
      '360° rapid air circulation for even, crispy results',
    ],
    coverImage: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=900&q=85',
  },
  'induction-cooktop-2000w': {
    name: '2000W Induction Cooktop',
    category: 'appliances',
    description: 'Slim ceramic glass induction cooktop with 10 power levels, child lock and automatic pan detection. CE and RoHS certified for global markets.',
    applications: 'Home kitchens, hotel rooms, catering, student accommodation.',
    specs: [
      { key: 'Model', value: 'HP-IC2000' },
      { key: 'Power', value: '2000W' },
      { key: 'Power Levels', value: '10' },
      { key: 'Surface', value: 'Schott Ceran Glass' },
    ],
    features: [
      'Schott Ceran glass surface — scratch-resistant and easy to clean',
      'Automatic pan detection — powers off when no cookware is detected',
      'Child lock and 3-hour auto shut-off for safety',
    ],
    coverImage: 'https://images.unsplash.com/photo-1624452085375-343547842776?w=900&q=85',
  },
  'electric-kettle-1-5l': {
    name: '1.5L Stainless Steel Electric Kettle',
    category: 'appliances',
    description: 'BPA-free stainless steel interior with 1500W rapid boil, 360° cordless base and auto shut-off with boil-dry protection.',
    applications: 'Home use, office kitchens, hotel rooms, hospitality.',
    specs: [
      { key: 'Model', value: 'HP-EK15' },
      { key: 'Capacity', value: '1.5L' },
      { key: 'Power', value: '1500W' },
      { key: 'Material', value: 'BPA-free Stainless Steel' },
    ],
    features: [
      'BPA-free stainless steel interior for clean, safe water heating',
      '1500W rapid boil — 1.5L in under 3 minutes',
      '360° cordless base with auto shut-off and boil-dry protection',
    ],
    coverImage: 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=900&q=85',
  },
  'toaster-2-slice': {
    name: '2-Slice Stainless Steel Toaster',
    category: 'appliances',
    description: 'Wide-slot toaster with 7 browning settings, removable crumb tray, cancel/reheat/defrost functions and stainless steel housing.',
    applications: 'Home kitchens, hotel breakfast service, office pantries.',
    specs: [
      { key: 'Model', value: 'HP-TS2' },
      { key: 'Slots', value: '2 Wide Slots' },
      { key: 'Power', value: '850W' },
      { key: 'Settings', value: '7 Browning Levels' },
    ],
    features: [
      '7 browning settings for precise toast control',
      'Extra-wide slots accommodate thick-cut bread and bagels',
      'Removable crumb tray for easy cleaning',
    ],
    coverImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=900&q=85',
  },
  'headphone-over-ear': {
    name: 'Over-Ear Headphone with Microphone',
    category: 'electronics',
    badge: 'Popular',
    description: 'Foldable over-ear headphone with 40mm drivers, built-in microphone and 3.5mm universal jack. Ideal for gaming, calls and music.',
    applications: 'Gaming, remote work calls, music listening, multimedia.',
    specs: [
      { key: 'Model', value: 'HP-HE01' },
      { key: 'Driver Size', value: '40mm' },
      { key: 'Frequency Response', value: '20Hz–20kHz' },
      { key: 'Connector', value: '3.5mm Universal Jack' },
    ],
    features: [
      '40mm neodymium drivers for rich, detailed sound reproduction',
      'Omnidirectional built-in microphone for clear voice communication',
      'Foldable design with padded headband for comfortable extended wear',
    ],
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
  },
  'bluetooth-earphone-tws': {
    name: 'True Wireless Bluetooth Earphones (TWS)',
    category: 'electronics',
    badge: 'New',
    description: 'Bluetooth 5.3 TWS earbuds with active noise cancellation, 6-hour playtime plus 24-hour charging case, IPX5 water resistance.',
    applications: 'Sports and fitness, commuting, remote work, everyday listening.',
    specs: [
      { key: 'Model', value: 'HP-TWS01' },
      { key: 'Bluetooth', value: '5.3' },
      { key: 'Playtime', value: '6h + 24h (case)' },
      { key: 'Water Resistance', value: 'IPX5' },
    ],
    features: [
      'Bluetooth 5.3 with low-latency mode for gaming and video',
      'Active noise cancellation (ANC) with transparency mode',
      'IPX5 sweat and water resistance for sports use',
    ],
    coverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=85',
  },
  'smart-watch': {
    name: 'Smart Watch with Heart Rate Monitor',
    category: 'electronics',
    description: '1.7" colour touch screen, heart rate + SpO2 monitoring, 20+ sport modes, 7-day battery life, IP68 waterproof.',
    applications: 'Fitness tracking, health monitoring, everyday smart notifications.',
    specs: [
      { key: 'Model', value: 'HP-SW01' },
      { key: 'Display', value: '1.7" TFT Colour Touch' },
      { key: 'Battery Life', value: '7 days' },
      { key: 'Water Resistance', value: 'IP68' },
    ],
    features: [
      'Continuous heart rate and SpO2 blood oxygen monitoring',
      '20+ sport modes with automatic activity recognition',
      'IP68 waterproof — safe for swimming and showering',
    ],
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85',
  },
  'portable-ssd-1tb': {
    name: '1TB USB-C Portable SSD',
    category: 'electronics',
    description: 'Read up to 1050 MB/s, write up to 1000 MB/s. Shock-resistant aluminium casing, USB 3.2 Gen 2 interface, pocket-sized.',
    applications: 'Video editing, data backup, creative professionals, field data collection.',
    specs: [
      { key: 'Model', value: 'HP-SSD1T' },
      { key: 'Capacity', value: '1TB' },
      { key: 'Read Speed', value: '1050 MB/s' },
      { key: 'Interface', value: 'USB 3.2 Gen 2 (USB-C)' },
    ],
    features: [
      'Read up to 1050 MB/s for rapid large file transfers',
      'Shock-resistant aluminium alloy casing — drop-tested to 2m',
      'Compact pocket-sized form factor — 50g lightweight',
    ],
    coverImage: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=900&q=85',
  },
  'micro-sd-128gb': {
    name: '128GB Micro SD Card (Class 10 / A2)',
    category: 'electronics',
    description: 'UHS-I U3 A2 rated micro SD card. Up to 100 MB/s read, 90 MB/s write. Waterproof, temperature-proof, X-ray-proof.',
    applications: 'Smartphones, action cameras, drones, dashcams, tablets.',
    specs: [
      { key: 'Model', value: 'HP-SD128' },
      { key: 'Capacity', value: '128GB' },
      { key: 'Read Speed', value: '100 MB/s' },
      { key: 'Rating', value: 'UHS-I U3 A2 Class 10' },
    ],
    features: [
      'A2 app performance rating for smooth app loading on Android devices',
      'Waterproof, temperature-proof and X-ray-proof construction',
      'Includes full-size SD adapter for camera and laptop compatibility',
    ],
    coverImage: 'https://images.unsplash.com/photo-1558478551-1a378f63ad28?w=900&q=85',
  },
  'usb-c-cable-2m': {
    name: 'Fast Charging USB-C Cable 2m',
    category: 'electronics',
    description: '100W USB-C to USB-C braided cable. Supports PD 3.0, QC 4.0 and 480 Mbps data transfer. 2-metre length with durable nylon braid.',
    applications: 'Laptop charging, smartphone fast charging, data transfer.',
    specs: [
      { key: 'Model', value: 'HP-CC2M' },
      { key: 'Length', value: '2m' },
      { key: 'Max Power', value: '100W' },
      { key: 'Data Transfer', value: '480 Mbps' },
    ],
    features: [
      '100W power delivery — charges laptops, tablets and phones at full speed',
      'Supports PD 3.0 and QC 4.0 fast charging protocols',
      'Braided nylon jacket with aluminium connectors — 10,000+ bend cycles',
    ],
    coverImage: 'https://images.unsplash.com/photo-1619193100632-68046777174b?w=900&q=85',
  },
};

export const CATEGORY_CONFIG = {
  solar: {
    label: 'Solar Energy Systems',
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    icon: '☀️',
  },
  appliances: {
    label: 'Home Appliances',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    icon: '🏠',
  },
  electronics: {
    label: '3C Electronics',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    icon: '📱',
  },
} as const;
