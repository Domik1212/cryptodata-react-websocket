import { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import axios from 'axios';

export interface CryptoData {
  rank: number;
  symbol: string;
  name: string;
  priceUsd: number;
  volumeUsd24Hr: number;
  id: string;
}

export interface CryptoPrices {
  [key: string]: number;
}

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrices>({});
  const [changedCryptoPrices, setChangedCryptoPrices] = useState<CryptoPrices>({});

  const previousMessageData = useRef<string | null>(null);

  const { lastMessage } = useWebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,solana');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (lastMessage !== null && lastMessage.data !== previousMessageData.current) {
      const newData = JSON.parse(lastMessage.data);

      const changedValues: CryptoPrices = {};
      Object.keys(newData).forEach((key) => {
        if (cryptoPrices[key] !== newData[key]) {
          const change = newData[key] > cryptoPrices[key] ? 1 : -1;
          changedValues[key] = change;
        }
      });
      setChangedCryptoPrices(() => changedValues);

      setCryptoPrices(prevPrices => ({
        ...prevPrices,
        ...newData
      }));
      previousMessageData.current = lastMessage.data;
    }
  }, [lastMessage]);

  return { data, setData, cryptoPrices, changedCryptoPrices };
};
