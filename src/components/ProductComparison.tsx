/**
 * HousePlus Product Comparison Component
 * 
 * ISSUE: Missing product comparison tables — buyers can't compare specs
 * FIX: Interactive comparison table with key spec differences highlighted
 */

import React, { useState } from 'react';
import Link from 'next/link';

interface ProductSpec {
  name: string;
  model: string;
  power: string;
  efficiency: string;
  voltage: string;
  dimensions: string;
  weight: string;
  warranty: string;
  price: string;
  certifications: string;
  bestFor: string;
}

// === Product slug mapping: model code → URL slug ===
const modelToSlug: Record<string, string> = {
  'HP-SP500': 'monocrystalline-solar-panel-500w',
  'HP-SP300': 'polycrystalline-solar-panel-300w',
  'HP-SP200F': 'flexible-solar-panel-200w',
  'HP-SI3K': 'solar-inverter-3kw',
  'HP-SI5K': 'solar-inverter-5kw',
  'HP-SI10K': 'solar-inverter-10kw',
  'HP-LB5K': 'lifepo4-battery-5kwh',
  'HP-LB10K': 'lifepo4-battery-10kwh',
  'HP-LB15K': 'lifepo4-battery-15kwh',
};

const solarPanels: ProductSpec[] = [
  {
    name: '500W Monocrystalline',
    model: 'HP-SP500',
    power: '500W',
    efficiency: '21.5%',
    voltage: '41.5V (Vmp)',
    dimensions: '2278 × 1134 × 35 mm',
    weight: '27.5 kg',
    warranty: '12yr product / 25yr power',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, IEC 61215, IEC 61730',
    bestFor: 'Residential & commercial rooftops',
  },
  {
    name: '300W Polycrystalline',
    model: 'HP-SP300',
    power: '300W',
    efficiency: '17.2%',
    voltage: '36.2V (Vmp)',
    dimensions: '1956 × 992 × 40 mm',
    weight: '22.0 kg',
    warranty: '12yr product / 25yr power',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, IEC 61215',
    bestFor: 'Off-grid & budget installations',
  },
  {
    name: '200W Flexible',
    model: 'HP-SP200F',
    power: '200W',
    efficiency: '19.0%',
    voltage: '18.0V (Vmp)',
    dimensions: '1450 × 670 × 3 mm',
    weight: '5.2 kg',
    warranty: '10yr product / 20yr power',
    price: 'Contact for quote',
    certifications: 'CE, RoHS',
    bestFor: 'RVs, boats, curved surfaces',
  },
];

const inverters: ProductSpec[] = [
  {
    name: '3KW Off-Grid Inverter',
    model: 'HP-SI3K',
    power: '3KW',
    efficiency: '97.5%',
    voltage: '230V AC',
    dimensions: '380 × 260 × 95 mm',
    weight: '7.2 kg',
    warranty: '24 months',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, IEC 62109',
    bestFor: 'Home off-grid solar systems',
  },
  {
    name: '5KW Hybrid Inverter',
    model: 'HP-SI5K',
    power: '5KW',
    efficiency: '98.0%',
    voltage: '230V AC',
    dimensions: '430 × 300 × 110 mm',
    weight: '11.5 kg',
    warranty: '24 months',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, IEC 62109',
    bestFor: 'Residential hybrid solar+storage',
  },
  {
    name: '10KW Three-Phase Inverter',
    model: 'HP-SI10K',
    power: '10KW',
    efficiency: '98.5%',
    voltage: '400V AC (3-phase)',
    dimensions: '520 × 380 × 180 mm',
    weight: '22.0 kg',
    warranty: '24 months',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, IEC 62109',
    bestFor: 'Commercial & industrial solar',
  },
];

const batteries: ProductSpec[] = [
  {
    name: '5KWh LiFePO4 Battery',
    model: 'HP-LB5K',
    power: '5KWh',
    efficiency: '99%',
    voltage: '51.2V DC',
    dimensions: '440 × 410 × 180 mm',
    weight: '45 kg',
    warranty: '5 years / 6000 cycles',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, UN38.3',
    bestFor: 'Home energy storage backup',
  },
  {
    name: '10KWh LiFePO4 Battery',
    model: 'HP-LB10K',
    power: '10KWh',
    efficiency: '99%',
    voltage: '51.2V DC',
    dimensions: '440 × 410 × 350 mm',
    weight: '85 kg',
    warranty: '5 years / 6000 cycles',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, UN38.3',
    bestFor: 'Residential solar self-consumption',
  },
  {
    name: '15KWh LiFePO4 Battery',
    model: 'HP-LB15K',
    power: '15KWh',
    efficiency: '99%',
    voltage: '51.2V DC',
    dimensions: '440 × 410 × 520 mm',
    weight: '120 kg',
    warranty: '5 years / 6000 cycles',
    price: 'Contact for quote',
    certifications: 'CE, RoHS, UN38.3',
    bestFor: 'Commercial energy storage systems',
  },
];

const categoryData: Record<string, ProductSpec[]> = {
  'solar-panels': solarPanels,
  'inverters': inverters,
  'batteries': batteries,
};

export default function ProductComparison() {
  const [activeCategory, setActiveCategory] = useState('solar-panels');

  const products = categoryData[activeCategory] || solarPanels;

  // Category-specific intro text
  const categoryIntros: Record<string, string> = {
    'solar-panels': 'Compare key specifications across our solar panel range to find the best fit for your project. All panels are CE/RoHS certified with OEM/ODM customisation available.',
    'inverters': 'Compare our solar inverters — from 3KW off-grid to 10KW three-phase. All inverters carry IEC 62109 safety certification and support OEM/ODM customisation.',
    'batteries': 'Compare LiFePO4 battery storage options from 5KWh to 15KWh. All batteries are UN38.3 certified for safe transport and offer 6000+ cycle lifespan.',
  };

  // Category-specific column highlight criteria
  const highlightCriteria: Record<string, string> = {
    'solar-panels': '500W',
    'inverters': '10KW',
    'batteries': '15KWh',
  };

  // Category-specific H2 headings
  const categoryHeadings: Record<string, string> = {
    'solar-panels': 'Product Comparison — Find the Right Solar Panel',
    'inverters': 'Solar Inverter Comparison — Choose the Right Inverter',
    'batteries': 'Battery Storage Comparison — Find the Right LiFePO4 Battery',
  };

  return (
    <div className="comparison-section">
      <h2>{categoryHeadings[activeCategory] || categoryHeadings['solar-panels']}</h2>
      <p className="comparison-intro">
        {categoryIntros[activeCategory] || categoryIntros['solar-panels']}
      </p>

      {/* Category tabs */}
      <div className="comparison-tabs">
        <button
          className={activeCategory === 'solar-panels' ? 'active' : ''}
          onClick={() => setActiveCategory('solar-panels')}
        >
          Solar Panels
        </button>
        <button
          className={activeCategory === 'inverters' ? 'active' : ''}
          onClick={() => setActiveCategory('inverters')}
        >
          Inverters
        </button>
        <button
          className={activeCategory === 'batteries' ? 'active' : ''}
          onClick={() => setActiveCategory('batteries')}
        >
          Batteries
        </button>
      </div>

      {/* Comparison table */}
      <div className="table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Specification</th>
              {products.map((p) => (
                <th key={p.model}>{p.name}<br/><span className="model-tag">{p.model}</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="spec-label">Peak Power</td>
              {products.map((p) => (
                <td key={p.model} className={p.power === highlightCriteria[activeCategory] ? 'highlight' : ''}>{p.power}</td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Cell Efficiency</td>
              {products.map((p) => (
                <td key={p.model} className={parseFloat(p.efficiency) > 20 ? 'highlight' : ''}>{p.efficiency}</td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Max Power Voltage</td>
              {products.map((p) => (<td key={p.model}>{p.voltage}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Dimensions</td>
              {products.map((p) => (<td key={p.model} className="small">{p.dimensions}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Weight</td>
              {products.map((p) => (<td key={p.model}>{p.weight}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Warranty</td>
              {products.map((p) => (<td key={p.model} className="small">{p.warranty}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Certifications</td>
              {products.map((p) => (<td key={p.model} className="small">{p.certifications}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Best For</td>
              {products.map((p) => (<td key={p.model} className="small">{p.bestFor}</td>))}
            </tr>
            <tr>
              <td className="spec-label">Wholesale Price</td>
              {products.map((p) => (<td key={p.model} className="price-cell">{p.price}</td>))}
            </tr>
            <tr>
              <td className="spec-label"></td>
              {products.map((p) => (
                <td key={p.model}>
                  <Link href={`/en/products/${modelToSlug[p.model] || p.model.toLowerCase()}`} className="btn-compare">
                    View Details →
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .comparison-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 20px;
        }
        .comparison-section h2 {
          font-size: 24px;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .comparison-intro {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 24px;
        }
        .comparison-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .comparison-tabs button {
          padding: 10px 20px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          font-size: 14px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }
        .comparison-tabs button.active {
          background: #0ea5e9;
          color: white;
          border-color: #0ea5e9;
        }
        .table-wrap {
          overflow-x: auto;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }
        .comparison-table th {
          background: #f8fafc;
          padding: 16px 12px;
          text-align: center;
          font-size: 14px;
          color: #1e293b;
          border-bottom: 2px solid #e2e8f0;
        }
        .model-tag {
          font-size: 11px;
          color: #0ea5e9;
          font-family: monospace;
        }
        .comparison-table td {
          padding: 12px;
          text-align: center;
          font-size: 14px;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }
        .spec-label {
          text-align: left !important;
          font-weight: 600;
          color: #334155 !important;
          background: #f8fafc;
        }
        td.highlight {
          background: #f0fdf4;
          font-weight: 700;
          color: #15803d !important;
        }
        td.small { font-size: 12px; }
        .price-cell { font-weight: 600; color: #0ea5e9; }
        .btn-compare {
          display: inline-block;
          padding: 6px 16px;
          background: #0ea5e9;
          color: white !important;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
        }
        .btn-compare:hover { background: #0284c7; }
        @media (max-width: 768px) {
          .comparison-tabs { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
