import React, { useState } from 'react';
import {
  Search, Filter, Star, Clock, Users,
  BookOpen, Zap, X, Plus, Check
} from 'lucide-react';

const FormIA = () => {
  // États pour gérer l'interface utilisateur
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [comparedFormations, setComparedFormations] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Données simulées des formations
  const formations = [
    {
      id: 1,
      title: "Formation React.js Complète",
      provider: "Udemy",
      price: 79,
      originalPrice: 149,
      duration: 42,
      format: "En ligne",
      level: "Intermédiaire",
      rating: 4.7,
      reviewCount: 1247,
      students: 15420,
      category: "Informatique",
      certification: true,
      matchScore: 95
    },
    {
      id: 2,
      title: "Marketing Digital 2025",
      provider: "Coursera",
      price: 129,
      originalPrice: 199,
      duration: 28,
      format: "Hybride",
      level: "Débutant",
      rating: 4.5,
      reviewCount: 892,
      students: 8430,
      category: "Marketing",
      certification: true,
      matchScore: 87
    },
    {
      id: 3,
      title: "Data Science avec Python",
      provider: "DataCamp",
      price: 45,
      originalPrice: 89,
      duration: 35,
      format: "En ligne",
      level: "Avancé",
      rating: 4.8,
      reviewCount: 2156,
      students: 23100,
      category: "Informatique",
      certification: true,
      matchScore: 91
    },
    {
      id: 4,
      title: "Gestion de Projet Agile",
      provider: "OpenClassrooms",
      price: 180,
      originalPrice: 250,
      duration: 60,
      format: "Présentiel",
      level: "Intermédiaire",
      rating: 4.3,
      reviewCount: 654,
      students: 4200,
      category: "Management",
      certification: true,
      matchScore: 82
    }
  ];

  // Filtrage des formations
  const filteredFormations = formations.filter(formation => {
    const matchesSearch = !searchQuery ||
      formation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formation.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat.length === 0 ||
      selectedFormat.includes(formation.format);
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'budget' && formation.price <= 50) ||
      (priceRange === 'moyen' && formation.price > 50 && formation.price <= 200) ||
      (priceRange === 'premium' && formation.price > 200);
    return matchesSearch && matchesFormat && matchesPrice;
  });

  // Ajout/retrait de formations à la comparaison
  const toggleComparison = (formation) => {
    const isAlreadyCompared = comparedFormations.find(f => f.id === formation.id);
    if (isAlreadyCompared) {
      setComparedFormations(comparedFormations.filter(f => f.id !== formation.id));
    } else if (comparedFormations.length < 3) {
      setComparedFormations([...comparedFormations, formation]);
    }
  };

  // Sélection des formats
  const toggleFormat = (format) => {
    if (selectedFormat.includes(format)) {
      setSelectedFormat(selectedFormat.filter(f => f !== format));
    } else {
      setSelectedFormat([...selectedFormat, format]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FormIA</h1>
                <p className="text-sm text-gray-600">Trouvez votre formation en 10 minutes</p>
              </div>
            </div>
            {comparedFormations.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Comparer ({comparedFormations.length})
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Format</h3>
                <div className="space-y-2">
                  {['En ligne', 'Présentiel', 'Hybride'].map(format => (
                    <label key={format} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFormat.includes(format)}
                        onChange={() => toggleFormat(format)}
                        className="mr-2"
                      />
                      {format}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Budget</h3>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="all">Tous les prix</option>
                  <option value="budget">≤ 50€</option>
                  <option value="moyen">50-200€</option>
                  <option value="premium">{'> 200€'}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Résultats */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredFormations.length} formations trouvées</p>
        </div>

        {/* Grille des formations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFormations.map(formation => {
            const isCompared = comparedFormations.find(f => f.id === formation.id);
            const canCompare = comparedFormations.length < 3 || isCompared;
            return (
              <div key={formation.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {formation.provider}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        {formation.matchScore}% match
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {formation.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center mb-4 space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{formation.rating}</span>
                    <span className="ml-1 text-gray-500 text-sm">({formation.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formation.students.toLocaleString()}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formation.duration}h</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{formation.format}</span>
                  </div>
                </div>
                {formation.certification && (
                  <div className="mb-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      Certification incluse
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{formation.price}€</span>
                    {formation.originalPrice && (
                      <span className="text-gray-500 line-through">{formation.originalPrice}€</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleComparison(formation)}
                      disabled={!canCompare && !isCompared}
                      className={`p-2 rounded-lg ${
                        isCompared
                          ? 'bg-blue-100 text-blue-600'
                          : canCompare
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompared ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de comparaison */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Comparaison des formations</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 font-medium">Critère</th>
                    {comparedFormations.map(formation => (
                      <th key={formation.id} className="text-center p-3 min-w-48">
                        <div className="font-semibold">{formation.title}</div>
                        <div className="text-sm text-gray-500">{formation.provider}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Prix</td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">{formation.price}€</div>
                        {formation.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formation.originalPrice}€
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Durée</td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">{formation.duration}h</td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Format</td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">{formation.format}</td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Note</td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span>{formation.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">Match IA</td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">
                        <span className="text-green-600 font-medium">{formation.matchScore}%</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t">
                    <td className="p-3"></td>
                    {comparedFormations.map(formation => (
                      <td key={formation.id} className="p-3 text-center">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                          Choisir
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormIA;