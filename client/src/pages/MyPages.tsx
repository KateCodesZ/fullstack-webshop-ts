import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

export default function MyPages() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inställningar');

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h1 className="text-xl font-bold text-marianblue mb-4">Mina sidor</h1>
              <nav className="space-y-1">
                <NavItem
                  active={activeTab === 'medlemskap'}
                  onClick={() => setActiveTab('medlemskap')}
                >
                  Mitt medlemskap
                </NavItem>
                <NavItem
                  active={activeTab === 'erbjudanden'}
                  onClick={() => setActiveTab('erbjudanden')}
                >
                  Mina erbjudanden
                </NavItem>
                <NavItem
                  active={activeTab === 'köp'}
                  onClick={() => setActiveTab('köp')}
                >
                  Mina köp
                </NavItem>
                <NavItem
                  active={activeTab === 'inställningar'}
                  onClick={() => setActiveTab('inställningar')}
                >
                  Mina inställningar
                </NavItem>
              </nav>
              <button
                className="mt-6 flex items-center text-gray-700 hover:text-mahogany transition-colors text-sm"
                onClick={() => { logout(); navigate('/'); }}
              >
                <span className="mr-2">→</span>
                Logga ut
              </button>
            </div>
          </div>
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-marianblue mb-4">
                {activeTab === 'medlemskap' && 'Mitt medlemskap'}
                {activeTab === 'erbjudanden' && 'Mina erbjudanden'}
                {activeTab === 'köp' && 'Mina köp'}
                {activeTab === 'mastercard' && 'Mitt Åhléns Mastercard'}
                {activeTab === 'inställningar' && 'Mina inställningar'}
              </h2>
              {/* Content would go here based on activeTab */}
              <div className="text-gray-700 text-sm">
                {activeTab === 'inställningar' && (
                  <div>
                    <p>Här kan du ändra dina inställningar.</p>
                    <div className="mt-4">
                      <span className="font-semibold text-gray-700">E-post:</span> {user.email}
                    </div>
                  </div>
                )}
                {activeTab === 'medlemskap' && (
                  <div>Medlemskapsinformation visas här...</div>
                )}
                {activeTab === 'erbjudanden' && (
                  <div>Dina erbjudanden visas här...</div>
                )}
                {activeTab === 'köp' && (
                  <div>Dina köp visas här...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable navigation item component
function NavItem({ children, active, onClick }: {
  children: React.ReactNode,
  active: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
        active
          ? 'bg-ahlens-100 text-ahlens-800 font-medium'
          : 'text-gray-600 hover:bg-floralwhite'
      }`}
    >
      {children}
    </button>
  );
}
