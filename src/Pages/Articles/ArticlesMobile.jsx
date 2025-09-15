import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Articles.css";
import articlesData from '../../constants/articles';
import articlesDataEn from '../../constants/articlesEn';
import articlesDataHe from '../../constants/articlesHe';

// Mobile Article Card Component
const MobileArticleCard = ({ article, index, language }) => {
  const navigate = useNavigate();

  // Smart icon selection based on content
  const getArticleIcon = (title) => {
    const titleLower = title.toLowerCase();
    const iconMap = {
      // Arabic keywords
      'مكمل': '🌿',
      'مكملات': '🌿',
      'طبيعي': '🌿',
      'طبيعية': '🌿',
      'وزن': '⚖️',
      'فقدان': '⚖️',
      'تمثيل': '🔥',
      'معدل': '🔥',
      'هرمون': '⚡',
      'هرمونات': '⚡',
      'شهية': '🍽️',
      'شبع': '🍽️',
      'بركة': '🖤',
      'حبة': '🖤',
      'سوداء': '🖤',
      'هضم': '🌱',
      'جهاز': '🌱',
      'صحة': '💊',
      'مناعة': '💊',
      'طاقة': '⚡',
      'تغذية': '🥗',
      'غذائي': '🥗',
      // English keywords
      'supplement': '🌿',
      'natural': '🌿',
      'weight': '⚖️',
      'loss': '⚖️',
      'metabolism': '🔥',
      'hormone': '⚡',
      'appetite': '🍽️',
      'digestion': '🌱',
      'health': '💊',
      'immune': '💊',
      'energy': '⚡',
      'nutrition': '🥗',
      'black': '🖤',
      'seed': '🖤'
    };

    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (titleLower.includes(keyword)) {
        return icon;
      }
    }
    return '📄'; // Default icon
  };

  const handleCardClick = () => {
    navigate("/article", {
      state: { index: index }
    });
  };

  return (
    <div 
      className="article-card animate-in" 
      onClick={handleCardClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="article-icon-container">
        <span className="article-icon">
          {getArticleIcon(article.title)}
        </span>
      </div>
      
      <div className="article-content">
        <h3 className="article-title">
          {article.title}
        </h3>
        
        <p className="article-description">
          {article.content[0]}
        </p>
        
        <button className="article-read-more">
          {language === 'ar' ? 'اقرأ المزيد' : 
           language === 'he' ? 'קרא עוד' : 
           'Read More'}
        </button>
      </div>
    </div>
  );
};

// Mobile Articles Component
const ArticlesMobile = ({ id }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      if (i18n.language === "ar") {
        setData(articlesData);
      } else if (i18n.language === "he") {
        setData(articlesDataHe);
      } else {
        setData(articlesDataEn);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [i18n.language]);

  if (loading) {
    return (
      <div id={id} className="articles-modern-container">
        <div className="articles-loading">
          {i18n.language === 'ar' ? 'جاري التحميل...' : 
           i18n.language === 'he' ? 'טוען...' : 
           'Loading...'}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div id={id} className="articles-modern-container">
      {/* Header Section */}
      <div className="articles-header">
        <h2 className="articles-main-title">
          {i18n.options.resources[i18n.language].articles.title}
        </h2>
        <p className="articles-subtitle">
          {i18n.options.resources[i18n.language].articles.secondTitle}
        </p>
      </div>

      {/* Articles Grid - Mobile Optimized */}
      <div className="articles-grid">
        {data.slice(0, 6).map((article, index) => (
          <MobileArticleCard
            key={article.id}
            article={article}
            index={index}
            language={i18n.language}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesMobile;