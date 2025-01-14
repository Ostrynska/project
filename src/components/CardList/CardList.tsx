import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import cardImage from '../../assets/images/broken-image.png';
import styles from './CardList.module.css';
import ReactPaginate from 'react-paginate';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
}

const CardList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [articlesPerPage] = useState<number>(8);

  const API_KEY = '743c242b48f04ba397a3232a5838dad6';
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            page: currentPage + 1,
            pageSize: articlesPerPage,
          },
        });

        const filteredArticles = response.data.articles.filter((article: Article) => {
          return article.title !== '[Removed]' && article.description !== '[Removed]' && article.title !== null;
        });

        const updatedArticles = filteredArticles.map((article: Article) => {
          article.title = article.title.split(' - ')[0];
          return article;
        });

        setArticles(updatedArticles);
        setTotalArticles(response.data.totalResults);

      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, articlesPerPage]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {articles.length > 0 && <>
        <ul className={styles.list}>
          {articles.map((article, index) => (
            <Card
              key={index}
              title={article.title}
              description={article.description}
              image={article.urlToImage || cardImage}
              url={article.url}
              publishedAt={article.publishedAt}
              name={article.source.name || ''}
            />
          ))}
        </ul>
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
          forcePage={currentPage}
        />
      </>}

      {articles.length === 0 && <div>No articles found</div>}
    </div>
  );
};

export default CardList;
