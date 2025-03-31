interface GoogleOperator {
  id: string;
  title: string;
  description: string;
  query: string;
  category: string;
  requiresDomain?: boolean;
  requiresKeyword?: boolean;
}

export const operators: GoogleOperator[] = [
  {
    id: 'site',
    title: 'Site Search',
    description: 'Search within a specific website or domain.',
    query: 'site:target.com',
    category: 'Basic',
    requiresDomain: true
  },
  {
    id: 'filetype',
    title: 'File Type Search',
    description: 'Find specific types of files.',
    query: 'filetype:pdf site:target.com',
    category: 'Files',
    requiresDomain: true
  },
  {
    id: 'inurl',
    title: 'URL Content Search',
    description: 'Find pages with specific terms in the URL.',
    query: 'inurl:KEYWORD site:target.com',
    category: 'URL',
    requiresDomain: true,
    requiresKeyword: true
  },
  {
    id: 'intext',
    title: 'Page Content Search',
    description: 'Find pages containing specific text.',
    query: 'intext:"KEYWORD" site:target.com',
    category: 'Content',
    requiresDomain: true,
    requiresKeyword: true
  },
  {
    id: 'intitle',
    title: 'Title Search',
    description: 'Find pages with specific terms in their title.',
    query: 'intitle:"KEYWORD" site:target.com',
    category: 'Content',
    requiresDomain: true,
    requiresKeyword: true
  },
  {
    id: 'cache',
    title: 'Cached Page',
    description: 'View Google\'s cached version of a page.',
    query: 'cache:target.com',
    category: 'Basic',
    requiresDomain: true
  },
  {
    id: 'allinurl',
    title: 'All Terms in URL',
    description: 'Find pages with all terms in the URL.',
    query: 'allinurl:KEYWORD site:target.com',
    category: 'URL',
    requiresDomain: true,
    requiresKeyword: true
  },
  {
    id: 'viewerframe',
    title: 'Camera Search',
    description: 'Find exposed camera systems.',
    query: 'inurl:"viewerframe?mode" site:target.com',
    category: 'Security',
    requiresDomain: true
  },
  {
    id: 'powered-by',
    title: 'Technology Stack',
    description: 'Reveal technology stack information.',
    query: 'intext:"powered by" site:target.com',
    category: 'Information',
    requiresDomain: true
  },
  {
    id: 'last-modified',
    title: 'Last Modified Date',
    description: 'Find pages showing last modification date.',
    query: 'intext:"Last modified" site:target.com',
    category: 'Information',
    requiresDomain: true
  },
  {
    id: 'admin-pages',
    title: 'Admin Pages',
    description: 'Find administrative pages.',
    query: 'inurl:admin site:target.com',
    category: 'Security',
    requiresDomain: true
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policies',
    description: 'Find privacy policy documents.',
    query: 'intext:"privacy policy" site:target.com',
    category: 'Legal',
    requiresDomain: true
  },
  {
    id: 'excel-files',
    title: 'Excel Files',
    description: 'Find Microsoft Excel files.',
    query: 'filetype:xls OR filetype:xlsx site:target.com',
    category: 'Files',
    requiresDomain: true
  },
  {
    id: 'directory-listing',
    title: 'Directory Listings',
    description: 'Find exposed directory listings.',
    query: 'intitle:"index of" site:target.com',
    category: 'Security',
    requiresDomain: true
  },
  {
    id: 'login-pages',
    title: 'Login Pages',
    description: 'Find login and authentication pages.',
    query: '(inurl:login OR inurl:signin) site:target.com',
    category: 'Security',
    requiresDomain: true
  }
];

export const categories = Array.from(
  new Set(operators.map(op => op.category))
).sort();