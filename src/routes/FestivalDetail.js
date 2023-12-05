import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as cheerio from "cheerio";
import Header from "../components/Header";
import Detail from "../components/Detail";

function FestivalDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [festival, setFestival] = useState([]);
  const getFestival = async () => {
    const html = await axios.get(
      `https://korean.visitkorea.or.kr/kfes/detail/fstvlDetail.do?fstvlCntntsId=${id}`
    );
    return html.data;
  };
  const parsingFestival = async () => {
    const html = await getFestival();
    const $ = cheerio.load(html);
    const ing = $(".time_num").text();
    const name = $("h2").text();
    const title = [];
    $("div .slide_content")[0].children.map((item) => {
      if (item.type === "text") {
        title.push(item.data);
      }
    });
    const content = [];
    $("div .slide_content")[1].children.map((item) => {
      if (item.type === "text") {
        content.push(item.data);
      }
    });

    const img = [];
    img.push($("head > meta:nth-child(14)").attr("content"));
    const bg = $(".visula_bg").attr("style");
    const img_bg = bg.slice(bg.indexOf("(") + 1, bg.indexOf(")"));
    $(
      "img[onerror=\"this.src='/kfes/resources/img/default_detail_02.png';\"]"
    ).each((index, element) => {
      img.push($(element).attr("src"));
    });

    const date = $(".data + p").text();
    const address = $(".location + p").text();
    const price = [];
    $(".price + p")[0].children.map((item) => {
      if (item.type === "text") {
        price.push(item.data);
      }
    });
    const partner = $(".partner + p").text();
    const tell = $(".tell + a").text();
    const insta = $(".instar + a").text();
    const homepage = $(".homepage_link_btn").attr("href");

    setFestival({
      ing: ing,
      name: name,
      title: title,
      content: content,
      img_bg: img_bg,
      img: img,
      date: date,
      address: address,
      price: price,
      partner: partner,
      tell: tell,
      insta: insta,
      homepage: homepage,
    });
    setLoading(false);
  };
  useEffect(() => {
    parsingFestival();
  }, []);
  console.log(festival);
  // console.log(festival);
  return (
    <div>
      <Header />
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <Detail
            ing={festival.ing}
            name={festival.name}
            title={festival.title}
            content={festival.content}
            img_bg={festival.img_bg}
            img={festival.img}
            date={festival.date}
            address={festival.address}
            price={festival.price}
            partner={festival.partner}
            tell={festival.tell}
            insta={festival.insta}
            homepage={festival.homepage}
            isfestival={true}
            location={null}
            time={null}
          />
        </div>
      )}
    </div>
  );
}
export default FestivalDetail;
