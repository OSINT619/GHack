import React, { useState } from 'react';
import { Copy, Search } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { operators, categories } from './dorks';
import { motion } from 'framer-motion';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [targetDomain, setTargetDomain] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [copied, setCopied] = useState<string>('');

  const handleCopy = (id: string) => {
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const buildQuery = (operator: string) => {
    if (!operator) return '';
    
    let query = operator.query;
    if (operator.requiresDomain && targetDomain) {
      query = query.replace('target.com', targetDomain);
    }
    if (operator.requiresKeyword && searchKeyword) {
      query = query.replace('KEYWORD', searchKeyword);
    }
    return query;
  };

  const filteredOperators = operators
    .filter(op => !selectedCategory || op.category === selectedCategory)
    .filter(op => {
      const searchLower = searchKeyword.toLowerCase();
      return !searchKeyword ||
        op.title.toLowerCase().includes(searchLower) ||
        op.description.toLowerCase().includes(searchLower) ||
        op.query.toLowerCase().includes(searchLower) ||
        op.category.toLowerCase().includes(searchLower);
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Google Dork Search Tool
        </h1>
        
        <div className="bg-gray-100 rounded-2xl neu-shadow p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Domain
              </label>
              <input
                type="text"
                placeholder="example.com"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 neu-shadow-inner focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Keywords
              </label>
              <input
                type="text"
                placeholder="Enter search term..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 neu-shadow-inner focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 neu-shadow-inner focus:outline-none transition-all duration-300"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Query Builder
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Build your own dork query..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 neu-shadow-inner focus:outline-none transition-all duration-300"
              />
              <CopyToClipboard text={customQuery} onCopy={() => handleCopy('custom')}>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl neu-button">
                  {copied === 'custom' ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(customQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl neu-button"
              >
                Search
              </a>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Found {filteredOperators.length} operators
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredOperators.map(operator => {
            const query = buildQuery(operator);
            return (
              <motion.div
                key={operator.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-gray-100 rounded-2xl neu-shadow p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{operator.title}</h2>
                  <span className="px-4 py-1 bg-gray-100 neu-shadow text-sm rounded-full text-gray-600">
                    {operator.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{operator.description}</p>
                <div className="bg-gray-100 neu-shadow-inner p-4 rounded-xl flex justify-between items-center">
                  <code className="text-sm text-gray-800 break-all">{query}</code>
                  <div className="flex gap-3 ml-4 shrink-0">
                    <CopyToClipboard text={query} onCopy={() => handleCopy(operator.id)}>
                      <button className="p-3 rounded-lg neu-button">
                        {copied === operator.id ? (
                          <span className="text-green-600 text-sm">Copied!</span>
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                    </CopyToClipboard>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg neu-button"
                    >
                      <Search size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;