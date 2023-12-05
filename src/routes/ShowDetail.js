import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as cheerio from "cheerio";
import Header from "../components/Header";
import Detail from "../components/Detail";

function ShowDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState([]);
  const getShow = async () => {
    const html = await axios.get(
      `https://www.kopis.or.kr/por/db/pblprfr/pblprfrView.do?menuId=MNU_00020&mt20Id=${id}`
    );
    return html.data;
  };
  const parsingShow = async () => {
    const html = await getShow();
    const $ = cheerio.load(html);

    const name = $("h4")[0].children[0].data;
    const img = [];
    $(".detailArea")[0]
      .children.filter((item) => item.nodeType === 1)
      .map((item) =>
        item.attribs.src === undefined
          ? null
          : img.push("https://www.kopis.or.kr" + item.attribs.src)
      );
    const img_bg = img[0];
    const date = $("dd")[0].children[0].data;
    const location = $("dd")[1].children[1].children[0].data;
    const time = $("dd")[2].children[0].data;
    const price = [$("dd")[4].children[1].children[1].children[0].data];
    const partner = $("dd")[7]
      .children.filter((item) => item.nodeType === 1)
      .map((item) => item.children[0].data);
    const address = $("dd")[11].children[0].data;
    const homepage = $("dd")[12]?.children[3]?.attribs?.href || null;

    function getStatus(dateString) {
      const [startDate, endDate] = dateString.match(/\d{4}\.\d{2}\.\d{2}/g);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (today >= start && today <= end) {
        return "공연 진행 중";
      } else if (today < start) {
        const daysDifference = Math.ceil(
          (start - today) / (1000 * 60 * 60 * 24)
        );
        return `D-${daysDifference}`;
      } else {
        return "공연 종료";
      }
    }
    const ing = getStatus(date);

    setShow({
      ing: ing,
      name: name,
      img_bg: img_bg,
      img: img,
      date: date,
      address: address,
      price: price,
      partner: partner,
      homepage: homepage,
      location: location,
      time: time,
    });
    setLoading(false);
  };
  useEffect(() => {
    parsingShow();
  }, []);
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
            ing={show.ing}
            name={show.name}
            title={null}
            content={null}
            img_bg={show.img_bg}
            img={show.img}
            date={show.date}
            address={show.address}
            price={show.price}
            partner={show.partner}
            tell={null}
            insta={show.insta}
            homepage={show.homepage}
            isfestival={false}
            location={show.location}
            time={show.time}
          />
        </div>
      )}
    </div>
  );
}
export default ShowDetail;
