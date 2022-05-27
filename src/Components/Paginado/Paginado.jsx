import React from "react";
import styles from "./paginado.module.css";

export default function Paginado({ productsPerPage, allProducts, paginate }) {
  const pageNumb = [];

  for (let i = 1; i <= Math.ceil(allProducts / productsPerPage); i++) {
    pageNumb.push(i);
  }

  return (
    <nav>
      <ul className={styles.paginado}>
        {pageNumb &&
          pageNumb.map((number) => (
            <li className="number" key={number}>
              <button
                className={number > 25 ? styles.displaynone : styles.buttonpag}
                onClick={() => paginate(number)}
              >
                {number <= 25 ? number : ""}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
