import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
function Search({ setQueryData, setIsLoading, queryTag }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const [dataObject, setDataObject] = useState({
    web: {},
    news: {},
    images: {},
    videos: {},
  });

  const options1 = {
    method: "GET",
    url: `https://bing-web-search1.p.rapidapi.com/search`,
    params: {
      q: query,
      mkt: "en-us",
      count: "30",
      safeSearch: "Off",
      textFormat: "Raw",
      freshness: "Day",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "84e38c3800msh21836a930da63acp12cdc3jsncb694f24e89e",
      "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
    },
  };

  const options2 = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: query,
      count: "50",
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Off",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "84e38c3800msh21836a930da63acp12cdc3jsncb694f24e89e",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  const options3 = {
    method: "GET",
    url: "https://bing-image-search1.p.rapidapi.com/images/search",
    params: { q: query, count: "50" },
    headers: {
      "X-RapidAPI-Key": "84e38c3800msh21836a930da63acp12cdc3jsncb694f24e89e",
      "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
    },
  };

  const options4 = {
    method: "GET",
    url: "https://bing-video-search1.p.rapidapi.com/videos/search",
    params: { q: query, count: "50" },
    headers: {
      "X-RapidAPI-Key": "84e38c3800msh21836a930da63acp12cdc3jsncb694f24e89e",
      "X-RapidAPI-Host": "bing-video-search1.p.rapidapi.com",
    },
  };
  const eraseQuery = (event) => {
    window.document.getElementById("searchInput").value=""
  };
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };
  const imagesHandler = (event) => {
    setQueryData(dataObject.images);
    // router.push(`/${queryTag}?query=${query}`, undefined, { shallow: true });
  };
  const newsHandler = (event) => {
    setQueryData(dataObject.news);
    // router.push(`/${queryTag}?query=${query}`, undefined, { shallow: true });
  };
  const videosHandler = (event) => {
    setQueryData(dataObject.videos);
    // router.push(`/${queryTag}?query=${query}`, undefined, { shallow: true });
  };
  const webHandler = (event) => {
    setQueryData(dataObject.web);
    // router.push(`/${queryTag}?query=${query}`, undefined, { shallow: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading((prev) => !prev);

    let resData = null;

    axios
      .request(options1)
      .then(async function (response) {
        resData = await response.data;
        setDataObject((prev) => {
          return { ...prev, web: resData.webPages.value };
        });
        await setQueryData(resData.webPages.value);
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(options2)
      .then(async function (response) {
        resData = await response.data;
        setDataObject((prev) => {
          return { ...prev, news: resData.value };
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(options3)
      .then(async function (response) {
        resData = await response.data;
        setDataObject((prev) => {
          return { ...prev, images: resData.value };
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    axios
      .request(options4)
      .then(async function (response) {
        resData = await response.data;
        setDataObject((prev) => {
          return { ...prev, videos: resData.value };
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    setIsLoading((prev) => !prev);

    router.push(`/${queryTag}?query=${query}`, undefined, { shallow: true });
    if (router.query.queryTag !== "search"){
      window.document.getElementById("web").click();
      setQuery("")
    }
  };

  return (
    <>
      <div className="flex sm:justify-around justify-between items-center mt-4 w-3/5 pb-4">
        <form onSubmit={submitHandler} className="w-2/3">
          <input
            placeholder="   Search....."
            id="searchInput"
            type="text"
            name="searchBar"
            className="dark:bg-gray-700 w-4/5 hover:drop-shadow-xl rounded-l-full h-8 pl-2"
            onChange={changeHandler}
          />
          <p className="inline-block bg-white cursor-pointer dark:bg-gray-700 pt-1 pb-1" onClick={eraseQuery}>
            ❌
          </p>
          <button
            id="search"
            type="submit"
            name="mia"
            className="dark:bg-gray-700 bg-white rounded-r-full h-8"
          >
            🔎
          </button>
        </form>
        <Link href="/search" className="flex px-4">
          <a id="web" className=" hover:underline px-1" onClick={webHandler}>
            Web 🤔 
          </a>
        </Link>
        <Link href="/news" className="flex px-4 ">
          <a className=" hover:underline " onClick={newsHandler}>
            News 📰 
          </a>
        </Link>
        <Link href="/images" className="flex px-4 ">
          <a className=" hover:underline px-1" onClick={imagesHandler}>
            Images 📸
          </a>
        </Link>
        <Link href="/videos" className="flex px-4 ">
          <a className=" hover:underline" onClick={videosHandler}>
            Videos 🎥
          </a>
        </Link>
      </div>
    </>
  );
}
export default Search;
