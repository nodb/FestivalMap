import React, { useState } from "react";
import styles from "./Detail.module.css";

function Detail({
  ing,
  name,
  title,
  content,
  img_bg,
  img,
  date,
  address,
  price,
  partner,
  tell,
  insta,
  homepage,
  isfestival,
  location,
  time,
}) {
  const backgroundStyle = {
    background: `url(${img_bg}) no-repeat center top`,
    backgroundSize: "cover",
  };

  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderRadio, setSliderRadio] = useState(0);
  const [largeSliderPosition, setLargeSliderPosition] = useState(0);
  const [largeSliderRadio, setLargeSliderRadio] = useState(0);
  const [popup, setPopup] = useState(false);

  const prev = () => {
    if (sliderPosition < 0) {
      setSliderPosition((prevPosition) => prevPosition + 21);
      setSliderRadio((prevPosition) => prevPosition - 1);
    }
  };

  const next = () => {
    if (sliderPosition > (img.length - 3) * -21) {
      setSliderPosition((prevPosition) => prevPosition - 21);
      setSliderRadio((prevPosition) => prevPosition + 1);
    }
  };

  const handleImgClick = (index) => {
    setPopup(!popup);
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    if (index) {
      setLargeSliderPosition(index * -100);
      setLargeSliderRadio(index);
    }
  };

  const prevLarge = () => {
    if (largeSliderPosition < 0) {
      setLargeSliderPosition((prevPosition) => prevPosition + 100);
      setLargeSliderRadio((prevPosition) => prevPosition - 1);
    }
  };

  const nextLarge = () => {
    if (largeSliderPosition > (img.length - 1) * -100) {
      setLargeSliderPosition((prevPosition) => prevPosition - 100);
      setLargeSliderRadio((prevPosition) => prevPosition + 1);
    }
  };

  const radioClick = (index) => {
    setLargeSliderPosition(index * -100);
    setLargeSliderRadio(index);
  };
  console.log(partner);
  return (
    <div>
      <div className={styles.bg}>
        <div style={backgroundStyle} className={styles.background}></div>
      </div>
      <div className={styles.contents}>
        <div className={styles.contents_box}>
          <h1>{name}</h1>
          <div className={styles.progress}>{ing}</div>
          <div className={styles.date}>{date}</div>
          <div className={styles.link}>
            {insta ? (
              <ul className={styles.insta}>
                <a href={`https://www.instagram.com/${insta}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1b263b"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </ul>
            ) : null}
            {homepage ? (
              <ul>
                <a href={homepage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#1b263b"
                  >
                    <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
                  </svg>
                </a>
              </ul>
            ) : null}
          </div>
        </div>
        <section>
          <article>
            {isfestival ? (
              <div>
                <div className={styles.img_box}>
                  <div
                    className={styles.slider}
                    style={{
                      transform: `translate3d(${sliderPosition}rem, 0px, 0px)`,
                    }}
                  >
                    {img.map((i, index) => (
                      <div className={styles.inner} key={index}>
                        <img
                          className={styles.img}
                          src={i}
                          id={index}
                          onClick={() => handleImgClick(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.button_box}>
                  <button className={styles.prev} id="prev" onClick={prev}>
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591zm-.289 7.563v-5.446l-3.522 2.719z"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </button>
                  {img.length >= 4 ? (
                    <div className={styles.imgchk}>
                      {img.map((i, index) =>
                        index < img.length - 2 ? (
                          <div
                            key={index}
                            id={`imgchk_${index}`}
                            style={{
                              fontSize:
                                sliderRadio === index ? "1.5rem" : "1rem",
                            }}
                          >
                            {sliderRadio === index ? "🟣" : "⚪"}
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : null}
                  <button className={styles.next} id="next" onClick={next}>
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591zm.289 7.563v-5.446l3.522 2.719z"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : null}
            <ul className={styles.info}>
              <li className={styles.info_li}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgb(226, 226, 226)"
                >
                  <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
                </svg>
                <span>{date}</span>
              </li>
              {time ? (
                <li className={styles.info_li}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgb(226, 226, 226)"
                  >
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                  </svg>
                  <span className={styles.info_span} id={styles.time}>
                    {time}
                  </span>
                </li>
              ) : null}

              <li className={styles.info_li}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgb(226, 226, 226)"
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <div className={styles.info_span} id={styles.address}>
                  {address}
                  {location ? ", " + location : null}
                </div>
              </li>
              <li className={styles.info_li}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgb(226, 226, 226)"
                >
                  <path d="M24 7h-2.121l.989-4h-3.368l-.969 4h-3.869l-1.018-4h-3.269l-.996 4h-3.838l-.973-4h-3.439l.973 4h-2.102v2h2.588l2.92 12h3.552l2.899-11.562 2.979 11.562h3.482l2.965-12h2.615v-2zm-17.972 2h2.853l-1.443 5.792-1.41-5.792zm10.618 5.792l-1.474-5.792h2.876l-1.402 5.792z" />
                </svg>
                <span className={styles.info_span} id={styles.price}>
                  {price.map((p) => (
                    <div>{p}</div>
                  ))}
                </span>
              </li>
              {partner.length !== 0 ? (
                <li className={styles.info_li}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgb(226, 226, 226)"
                  >
                    <path d="M4.967 15c-2.743 0-4.967-2.238-4.967-5 0-2.761 2.224-5 4.967-5h5.033v10h-5.033zm7.04 7.475c-.52-.424-.902-.994-1.095-1.637l-1.151-3.827h-5.125l1.905 5.883c.214.659.828 1.106 1.521 1.106h3.439c.358 0 .677-.225.797-.562.12-.337.015-.713-.263-.939l-.028-.024zm-.007-17.475v10c3.164.509 7.161 1.992 12 5v-20c-4.964 3.085-8.876 4.502-12 5z" />
                  </svg>
                  <span className={styles.info_span}>{partner}</span>
                </li>
              ) : null}
              {tell ? (
                <li className={styles.info_li}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgb(226, 226, 226)"
                  >
                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                  </svg>
                  <span className={styles.info_span}>{tell}</span>
                </li>
              ) : null}
            </ul>
            {title ? (
              <ul className={styles.title} id={styles.title}>
                {title.map((t) => (
                  <li>{t}</li>
                ))}
              </ul>
            ) : null}
            {content ? (
              <ul className={styles.content} id={styles.content}>
                {content.map((t) => (
                  <li>{t}</li>
                ))}
              </ul>
            ) : null}
            {!isfestival ? (
              <div>
                {img.map((i, index) => (
                  <div className={styles.img_outer}>
                    <img className={styles.img} src={i} id={styles.index} />
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        </section>
        {popup ? (
          <div className={styles.popup}>
            <div className={styles.large_img_box}>
              <div
                className={styles.large_slider}
                style={{
                  transform: `translate3d(${largeSliderPosition}vw, 0px, 0px)`,
                }}
              >
                {img.map((i, index) => (
                  <div className={styles.large_inner} key={index}>
                    <img className={styles.large_img} src={i} />
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.close}
              id={styles.close}
              onClick={handleImgClick}
            >
              <svg
                height="1.5rem"
                width="1.5rem"
                style={{ enableBackground: "new 0 0 512 512" }}
                version="1.1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
              </svg>
            </button>
            <button
              className={styles.large_prev}
              id={styles.large_prev}
              onClick={prevLarge}
            >
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591zm-.289 7.563v-5.446l-3.522 2.719z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
            <button
              className={styles.large_next}
              id={styles.large_next}
              onClick={nextLarge}
            >
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591zm.289 7.563v-5.446l3.522 2.719z"
                  fill-rule="nonzero"
                />
              </svg>
            </button>
            <div className={styles.large_imgchk}>
              {img.map((i, index) => (
                <button
                  key={index}
                  className={styles.large_imgchk_button}
                  id={`large_imgchk_${index}`}
                  style={{
                    fontSize: largeSliderRadio === index ? "1.5rem" : "1rem",
                  }}
                  onClick={() => radioClick(index)}
                >
                  {largeSliderRadio === index ? "🟣" : "⚪"}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;
