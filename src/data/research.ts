export interface ResearchRow {
  t: string;
  ab: string;
  tags: string[];
  yr: string;
  st: string;
}

export const RESEARCH: ResearchRow[] = [
  {
    t: 'Orbital Mechanics, Space Debris Remediation, and Software Architectures for the ORCAS Mission Profile',
    ab: 'Full research report surveying the propagation models, remediation approaches and system architectures that the ORCAS mission profile is built on.',
    tags: ['Literature review', 'Architecture', 'Remediation'],
    yr: '2026',
    st: 'Report',
  },
  {
    t: 'ORCAS — B.Tech major project report',
    ab: 'The complete project record: requirements, system design, the SGP4 and machine-learning pipelines, validation methodology and results.',
    tags: ['System design', 'Validation', 'SGP4'],
    yr: '2026',
    st: 'Thesis',
  },
  {
    t: 'ICSSIT 2026 conference presentation',
    ab: 'Twelve-slide talk delivered online at the 7th International Conference on Smart Systems and Inventive Technology, covering the method chain from SGP4 through B-plane projection to probability of collision.',
    tags: ['Talk', 'IEEE SMC'],
    yr: 'Jul 2026',
    st: 'Presented',
  },
];
