import React from "react";
import axios from "axios";
import theme from "../theme";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {Goods} from "../features/goods/goodsSlice";
import {Loader} from "../components/Loader";

const Card = styled.div`
  overflow: hidden;
  height: 100vh;

  @media (max-width: ${theme.media.tab}) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}
`;
const ImageWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  pointer-events: none;
`;
const Image = styled.img`
  position: absolute;

  width: 350px;

  @media (max-width: ${theme.media.tab}) {
    width: 240px;
  }
`;
const Circle = styled.div`
  width: 450px;
  height: 450px;
  margin: auto;

  background: ${theme.colors.pink};
  border-radius: 50%;

  @media (max-width: ${theme.media.tab}) {
    width: 224px;
    height: 224px;
    }
`;

function CardPage() {
  const {id} = useParams();
  const [goods, setGoods] = React.useState<Goods>();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}products/${id}`);
        setGoods(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProduct();
  }, [id])

  if (!goods) {
    return <Loader/>;
  }

  return (
    <Card>
      <ImageWrapper>
        <Circle/>
        <Image src={`${goods.imageUrl}`} alt="item"/>
      </ImageWrapper>
    </Card>
  );
}

export default CardPage;
