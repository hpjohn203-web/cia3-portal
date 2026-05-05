export const GLOSSARY = [
  // Financial Management
  { term: 'Budget Variance', definition: 'The difference between budgeted and actual amounts. Favorable when revenue exceeds budget or costs are below budget; unfavorable when the reverse is true.', topic: 'Financial Management' },
  { term: 'Working Capital', definition: 'Current assets minus current liabilities. Measures a company\'s short-term liquidity and operational efficiency.', topic: 'Financial Management' },
  { term: 'Net Present Value (NPV)', definition: 'The sum of present values of all future cash flows minus the initial investment. A positive NPV indicates a project adds value.', topic: 'Financial Management' },
  { term: 'Internal Rate of Return (IRR)', definition: 'The discount rate that makes the NPV of a project equal to zero. Used to rank capital investment projects.', topic: 'Financial Management' },
  { term: 'Payback Period', definition: 'The time required to recover the initial cost of an investment from its net cash inflows. Simple measure of investment risk.', topic: 'Financial Management' },
  { term: 'Return on Investment (ROI)', definition: 'Net income divided by average total assets (or invested capital), expressed as a percentage. Measures efficiency of investment.', topic: 'Financial Management' },
  { term: 'Break-Even Point', definition: 'The sales volume at which total revenues equal total costs, resulting in zero profit or loss. Calculated as Fixed Costs ÷ Contribution Margin per unit.', topic: 'Financial Management' },
  { term: 'Accrual Accounting', definition: 'Revenue is recognized when earned and expenses when incurred, regardless of when cash is received or paid. Required under GAAP.', topic: 'Financial Management' },
  { term: 'Leverage', definition: 'The use of borrowed capital (debt) to increase potential return on investment. Financial leverage amplifies both gains and losses.', topic: 'Financial Management' },
  { term: 'Contribution Margin', definition: 'Revenue minus variable costs. Represents the portion of sales revenue that contributes to covering fixed costs and generating profit.', topic: 'Financial Management' },

  // IT Management
  { term: 'ERP (Enterprise Resource Planning)', definition: 'Integrated software that manages and automates core business processes — finance, HR, manufacturing, supply chain — in a unified system.', topic: 'IT Management' },
  { term: 'IT General Controls', definition: 'Controls that apply to all IT systems broadly: access management, change management, data backup, and operations. They support application-level controls.', topic: 'IT Management' },
  { term: 'Application Controls', definition: 'Controls embedded within specific software applications to ensure completeness, accuracy, and validity of data processing. Include input, processing, and output controls.', topic: 'IT Management' },
  { term: 'Disaster Recovery Plan (DRP)', definition: 'A documented plan to restore IT systems and data after a disruptive event. Focuses on technology recovery; part of the broader Business Continuity Plan.', topic: 'IT Management' },
  { term: 'Business Continuity Plan (BCP)', definition: 'A plan to maintain essential business operations during and after a disruption. Broader than a DRP — covers people, processes, and facilities.', topic: 'IT Management' },
  { term: 'Encryption', definition: 'Converting data into a coded form using an algorithm so that only authorized parties with the decryption key can read it. Protects data confidentiality.', topic: 'IT Management' },
  { term: 'Penetration Testing', definition: 'A simulated cyberattack performed by authorized testers to identify exploitable vulnerabilities in systems, networks, or applications before malicious actors do.', topic: 'IT Management' },
  { term: 'Change Management (IT)', definition: 'A formal process for requesting, reviewing, approving, and implementing changes to IT systems to minimize disruption and maintain system integrity.', topic: 'IT Management' },
  { term: 'Database Management System (DBMS)', definition: 'Software that enables creation, maintenance, and control of a database. Examples: Oracle, SQL Server, MySQL. Ensures data integrity, security, and concurrent access.', topic: 'IT Management' },
  { term: 'Cloud Computing', definition: 'Delivery of computing services (servers, storage, databases, networking) over the internet. Models include IaaS, PaaS, and SaaS.', topic: 'IT Management' },

  // Risk & Control
  { term: 'Inherent Risk', definition: 'The level of risk that exists in the absence of any controls or management actions. The baseline risk exposure before mitigation.', topic: 'Risk & Control' },
  { term: 'Residual Risk', definition: 'The level of risk remaining after management has implemented controls. Residual Risk = Inherent Risk − Risk Reduction from Controls.', topic: 'Risk & Control' },
  { term: 'Risk Appetite', definition: 'The amount and type of risk an organization is willing to accept in pursuit of its objectives. Set by the board and senior management.', topic: 'Risk & Control' },
  { term: 'Key Risk Indicator (KRI)', definition: 'A forward-looking metric that signals potential future risk exposure. Used to monitor risk levels against established thresholds.', topic: 'Risk & Control' },
  { term: 'Enterprise Risk Management (ERM)', definition: 'An organization-wide framework for identifying, assessing, and managing risks across all business units. Aligned with COSO ERM and ISO 31000.', topic: 'Risk & Control' },
  { term: 'Segregation of Duties', definition: 'Dividing tasks and privileges among multiple people so no single individual controls all aspects of a critical transaction — reducing fraud and error risk.', topic: 'Risk & Control' },
  { term: 'Control Deficiency', definition: 'A weakness in a control\'s design or operation that reduces the likelihood of preventing or detecting misstatements or fraud on a timely basis.', topic: 'Risk & Control' },
  { term: 'Three Lines Model', definition: 'IIA framework where: Line 1 = operations (owns risk), Line 2 = risk/compliance (oversees risk), Line 3 = internal audit (provides independent assurance).', topic: 'Risk & Control' },
  { term: 'COSO Framework', definition: 'Internal control framework by the Committee of Sponsoring Organizations. Five components: Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring.', topic: 'Risk & Control' },
  { term: 'COBIT', definition: 'Control Objectives for Information and Related Technologies. A framework for IT governance and management, aligning IT goals with business objectives.', topic: 'Risk & Control' },

  // Business Process
  { term: 'Business Process Reengineering (BPR)', definition: 'Radical redesign of core business processes to achieve dramatic improvements in cost, quality, speed, or service. Focuses on fundamental rethinking, not incremental improvement.', topic: 'Business Process' },
  { term: 'Total Quality Management (TQM)', definition: 'An organization-wide approach to continuous quality improvement involving all employees. Focuses on customer satisfaction and process excellence.', topic: 'Business Process' },
  { term: 'Six Sigma', definition: 'A data-driven methodology aiming to reduce defects to fewer than 3.4 per million opportunities. Uses DMAIC (Define, Measure, Analyze, Improve, Control) cycle.', topic: 'Business Process' },
  { term: 'Key Performance Indicator (KPI)', definition: 'A measurable value demonstrating how effectively an organization is achieving its key business objectives. Can be financial or non-financial.', topic: 'Business Process' },
  { term: 'Benchmarking', definition: 'Comparing an organization\'s performance metrics to industry best practices or competitors to identify performance gaps and improvement opportunities.', topic: 'Business Process' },
  { term: 'Supply Chain Management', definition: 'The oversight of materials, information, and finances as they move from supplier to manufacturer to wholesaler to retailer to consumer.', topic: 'Business Process' },
  { term: 'Balanced Scorecard', definition: 'A strategic performance management tool measuring performance across four perspectives: Financial, Customer, Internal Processes, and Learning & Growth.', topic: 'Business Process' },

  // Governance
  { term: 'Corporate Governance', definition: 'The system of rules, practices, and processes by which a company is directed and controlled. Balances interests of shareholders, management, and other stakeholders.', topic: 'Governance' },
  { term: 'Audit Committee', definition: 'A subcommittee of the board of directors responsible for overseeing financial reporting, internal controls, external audit, and internal audit functions.', topic: 'Governance' },
  { term: 'Fiduciary Duty', definition: 'A legal and ethical obligation to act in the best interest of another party. Directors owe fiduciary duties of care and loyalty to shareholders.', topic: 'Governance' },
  { term: 'Whistleblower Policy', definition: 'Organizational policy protecting employees who report misconduct, fraud, or violations from retaliation. Required under SOX for publicly listed companies.', topic: 'Governance' },
  { term: 'Sarbanes-Oxley Act (SOX)', definition: 'U.S. federal law (2002) establishing requirements for financial reporting and internal controls for public companies. Key sections: 302 (CEO/CFO certification), 404 (internal control assessment).', topic: 'Governance' },
  { term: 'Tone at the Top', definition: 'The ethical climate and culture established by senior leadership that influences employee behavior throughout the organization. A key component of COSO\'s Control Environment.', topic: 'Governance' },
];
