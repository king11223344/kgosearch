import Loading from "./Loading";
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
function Results({ isLoading, queryTag, queryData }) {

  if (isLoading) return <Loading />;


  switch (queryTag) {
    case "search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 pt-2  sm:px-36">
          {queryData?.map(({ name, snippet, url }, index) => (
            <div key={index} className="md:w-2/5 w-full ">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm ">
                  {url?.length > 30 ? url.substring(0, 30) : url}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {name}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {queryData?.map(({ name, image, description, url }, index) => (
            <div key={index} className="md:w-2/5 w-full ">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg  dark:text-blue-300 text-blue-700">
                  <img
                    src={image?.thumbnail.contentUrl}
                    alt={name}
                    loading="lazy"
                    className="inline p-2"
                  />
                  {name}
                </p>
                <div className="flex gap-4">
                 
                    {url}
                  
                </div>
              </a>
            </div>
          ))}
        </div>
      );
    case "images":
      return (
        <div className=" flex flex-wrap justify-center items-center">
          {queryData?.map(({ contentUrl, name, webSearchUrl }, index) => (
            <a
              className="w-1/2 lg:w-1/4 sm:p-3 p-5"
              href={webSearchUrl}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={contentUrl} alt={name} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{name}</p>
            </a>
          ))}
        </div>
      );
    case "videos":
      return (
        <div className="flex flex-wrap">
          {queryData?.map(({contentUrl, thumbnailUrl, name},index) => (
            <div key={index} className="p-2">
              <ReactPlayer url={contentUrl} controls width="355px" height="200px"/>
            </div>
          ))}
        </div>
      );
    default:
      return <h1>Invalid request</h1>;
  }
 
}
export default Results;
