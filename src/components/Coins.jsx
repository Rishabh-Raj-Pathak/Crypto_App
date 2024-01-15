import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text, Link } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Coins = () => {

  const [coins,setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("inr")

  const currencySymbol = currency==="inr"?"₹" : currency==="eur"?"€":"$"

  useEffect(() => {

      const fetchCoin = async () => {

        try{
          const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

          setCoins(data);
          setLoading(false);
          console.log(data);
        } catch(error){
            setLoading(false);
            setError(true);
        }
        
      };
      fetchCoin();
  },[currency, page]);

  if(error) return <ErrorComponent/>

  return <Container maxW={"container.xl"}>
    {loading ? <Loader/> : <>

    <HStack wrap={"wrap"}>
      {
        coins.map((i) => (
            <CoinCard name={i.name} img={i.image} symbol={i.symbol} price={i.current_price
            } key={i.id} currencySymbol={currencySymbol}/>
        ))
      }
    </HStack>


    </>}
  </Container>
}
const CoinCard = ({id, name,img,symbol,price,currencySymbol }) => (

  <Link to={`/coins/${id}`} target={"_blank"}>
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"}
    css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }}
    >
      <Image 
      src={img} 
      w={"10"} 
      h={"10"} 
      objectFit={"contain"} 
      alt={"altern"}
      />
      <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>

);




export default Coins;
