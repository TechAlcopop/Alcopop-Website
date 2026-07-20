import { useEffect, useState, useRef } from "react";
import styles from "../styles/Compare.module.css";
import axios from "axios";
import { FaSearch } from 'react-icons/fa'; 

const images = [
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/yogxxjyjopsrh7i6iadm.png", 
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/w07sczfuh6khgafknncg.png",
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/nzhdp8dfmj1fk3xuwnci.png",
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/sukvgk9vzttlac8twkrm.png",
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/oa8siamgi1woie4thtet.png",
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/zvp1qi09i1uaayx9opht.png",
  "https://res.cloudinary.com/dj0ysu3nb/image/upload/v1745821700/xcprty5kvzonrer65kyk.png",
];

const dummyData = [
  'Apple iPhone',
  'Samsung Galaxy',
  'Dell Laptop',
  'Nike Shoes',
  'Adidas Hoodie',
  'Sony Headphones',
  'Canon Camera',
  'LG Monitor',
  'HP Printer',
  'Beats Earbuds',
];

const Compare = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState({});
  const [perPage, setPerPage] = useState(window.innerWidth <= 800 ? 8 : 9);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
 

  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(window.innerWidth <= 800 ? 8 : 9);
    };
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const fetchAlcohol = async () => {
    try {

       const log_key = process.env.REACT_APP_API_KEY;

      const res = await axios.get("http://localhost:5003/api/all", {
        headers: {
          "x-api-key": log_key,
        },
      });

      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchAlcohol();
}, []);





  const handleFilter = (category) => {
    setCurrentPage(1);
    const filtered = products.filter((item) => item.category === category);
    setFilteredProducts(filtered);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(images[(startIndex + i) % images.length]);
    }
    return visible;
  };

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  var currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleImageLoad = (url) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

   useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const lower = query.toLowerCase();
      console.log(products)
      const filtered = products.filter(item =>
        item.name.toLowerCase().includes(lower)
      );
      console.log(filtered);
      setSuggestions(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

   const handleSubmit = e => {
    e.preventDefault();
    currentProducts=suggestions;
    console.log(currentProducts);
  };

  return (
    <>
      <div className={styles.container}>
        {getVisibleImages().map((src) => (
          <div key={src} className={styles.imageWrapper}>
            <img
              src={src}
              alt="grid-images"
              className={`${styles.image} ${styles.fade}`}
            />
          </div>
        ))}
      </div>
      {/* Search Bar */}
      <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <FaSearch className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Search for products"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {loading && <div className={styles.spinner} />}
      </div>
      <button type="submit" className={styles.goButton}>GO</button>

      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={styles.suggestionItem}
              onClick={() => setQuery(s.name)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </form>

      <div className={styles.CompareContainer}>
        {/* Sidebar */}
        <nav className={styles.sidebar}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <button
                className={styles.toggle}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                <span>Whisky</span>
                <span className={styles.icon}>{open ? "–" : "+"}</span>
              </button>
              {open && (
                <ul className={styles.nested}>
                  <li className={styles.item2} onClick={() => handleFilter("Blended Scotch")}>Blended Scotch</li>
                  <li className={styles.item2} onClick={() => handleFilter("Single Malt")}>Single Malt</li>
                  <li className={styles.item2} onClick={() => handleFilter("Bourbon")}>Bourbon</li>
                  <li className={styles.item2} onClick={() => handleFilter("Tennessee")}>Tennessee</li>
                </ul>
              )}
            </li>
            <li className={styles.item} onClick={() => handleFilter("Vodka")}>Vodka</li>
            <li className={styles.item} onClick={() => handleFilter("Gin")}>Gin</li>
            <li className={styles.item} onClick={() => handleFilter("Rum")}>Rum</li>
            <li className={styles.item} onClick={() => handleFilter("Wine")}>Wine</li>
            <li className={styles.item} onClick={() => handleFilter("Beer")}>Beer</li>
            <li className={styles.item} onClick={() => handleFilter("RTD")}>RTD</li>
            <li className={styles.item} onClick={() => handleFilter("Brandy")}>Brandy</li>
          </ul>
        </nav>

         

        {/* Products */}
        <div className={styles.productCont}>
          {currentProducts.map((alco, idx) => (
            <div className={styles.product} key={idx}>
              <div className={styles.imageCont}>
                {!loadedImages[alco.image] && (
                  <div className={styles.skeleton}></div>
                )}
                <img
                  src={alco.image}
                  alt={alco.name}
                  style={{ display: loadedImages[alco.image] ? "block" : "none" }}
                  onLoad={() => handleImageLoad(alco.image)}
                />
              </div>
              <div className={styles.productDetails}>
                <div>
                  <p>{alco.name}</p>
                </div>
                <div>
                  <span>₹ {alco.price}</span> <span>{alco.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Compare;
