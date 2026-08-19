export interface SkillGroup {
  g: string;
  hint: string;
  items: [string, number][];
}

export const SKILLS: SkillGroup[] = [
  {
    g: 'Orbital & scientific computing',
    hint: 'Propagation, coordinate frames, and the numerics underneath them.',
    items: [
      ['SGP4 / SDP4 propagation', 5],
      ['Skyfield & SPICE kernels', 4],
      ['Coordinate transforms (ECI/ECEF/geodetic)', 4],
      ['NumPy & SciPy & Pandas', 5],
      ['Monte Carlo & uncertainty quantification', 4],
    ],
  },
  {
    g: 'Machine learning',
    hint: 'Applied, with validation — cross-validation and residual analysis, not just a fit.',
    items: [
      ['scikit-learn', 5],
      ['Random Forest & ensembles', 5],
      ['TensorFlow & PyTorch', 3],
      ['LSTM / time-series forecasting', 4],
      ['Feature engineering', 4],
    ],
  },
  {
    g: 'Languages',
    hint: 'Python is the working language; the rest are fluent enough to ship in.',
    items: [
      ['Python', 5],
      ['JavaScript / TypeScript', 4],
      ['C / C++', 3],
      ['Java', 3],
      ['SQL', 3],
    ],
  },
  {
    g: 'Web & 3D',
    hint: 'Where the data becomes something you can look at.',
    items: [
      ['React & React-Three-Fiber', 4],
      ['three.js / WebGL', 4],
      ['FastAPI & Node.js', 4],
      ['Tailwind CSS', 4],
      ['D3 & Chart.js', 3],
    ],
  },
  {
    g: 'Visualisation & tooling',
    hint: 'The unglamorous half of research software.',
    items: [
      ['Matplotlib & Seaborn', 5],
      ['PyVista & Cartopy', 4],
      ['Git & Docker', 4],
      ['Jupyter & LaTeX', 5],
      ['AWS & GCP & Linux', 3],
    ],
  },
];
