import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../store';
import { fetchArticles, setCurrentPage } from '../../features/articlesSlice';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';
import Card from '../Card/Card';
import cardImage from '../../assets/images/broken-image.png';
import styles from './CardList.module.css';

const CardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, totalArticles, currentPage, articlesPerPage } = useSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    dispatch(setCurrentPage(selectedPage.selected));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {articles.length > 0 ? (
        <>
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
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div>No articles found</div>
      )}
    </>
  );
};

export default CardList;
