import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, url, publishedAt, name }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <li className={styles.card}>
      <figure className={styles.image}>
        <img src={image} alt={title} />
        <div className={styles.date}>{formatDate(publishedAt)}</div>
        <div className={styles.source}>{name}</div>
      </figure>
      <h3 className={styles.header}>
        <a href={url}>{title}</a>
      </h3>
      <div className={styles.footer}>{description}</div>
    </li>
  );
};

export default Card;
