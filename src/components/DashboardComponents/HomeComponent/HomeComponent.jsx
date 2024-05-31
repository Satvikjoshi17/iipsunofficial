import React from 'react';
import ShowItems from "../ShowItems/ShowItems";
import { shallowEqual, useSelector } from "react-redux";
import { selectHomeComponentData } from "./selectors"; // Update the path

import './HomeComponent.css';

const HomeComponent = () => {
  // Use the selector to get the data for HomeComponent
  const { isLoading, userFolders, userFiles, currentFolder } = useSelector(
    selectHomeComponentData,
    shallowEqual
  );

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <div> 
          <h1 className="display-1 my-5 text-center text-info"> Please wait Loading... </h1>
         
          <main className="spinner-container">
            <svg className="sp" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000" />
                  <stop offset="40%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000" />
                  <stop offset="60%" stopColor="#000" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <mask id="mask1">
                  <rect x="0" y="0" width="128" height="128" fill="url(#grad1)" />
                </mask>
                <mask id="mask2">
                  <rect x="0" y="0" width="128" height="128" fill="url(#grad2)" />
                </mask>
              </defs>
              <g fill="none" strokeLinecap="round" strokeWidth="16">
                <circle className="sp__ring" r="56" cx="64" cy="64" stroke="#ddd" />
                <g stroke="hsl(223,90%,50%)">
                  <path className="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" stroke="hsl(343,90%,50%)" strokeDasharray="43.98 307.87" />
                  <g transform="translate(42,42)">
                    <g className="sp__worm2" transform="translate(-42,0)">
                      <path className="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" strokeDasharray="43.98 175.92" />
                    </g>
                  </g>
                </g>
                <g stroke="hsl(283,90%,50%)" mask="url(#mask1)">
                  <path className="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" strokeDasharray="43.98 307.87" />
                  <g transform="translate(42,42)">
                    <g className="sp__worm2" transform="translate(-42,0)">
                      <path className="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" strokeDasharray="43.98 175.92" />
                    </g>
                  </g>
                </g>
                <g stroke="hsl(343,90%,50%)" mask="url(#mask2)">
                  <path className="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" strokeDasharray="43.98 307.87" />
                  <g transform="translate(42,42)">
                    <g className="sp__worm2" transform="translate(-42,0)">
                      <path className="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" strokeDasharray="43.98 175.92" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </main>
          <h3 className=' my-5 text-center text-info'>Refresh the Page if subjects are not visible</h3>
        </div>
      ) : (
        <>
          <ShowItems title={"Choose Course"} type={"folder"} items={userFolders} />
          {currentFolder !== "root" ? (
            <ShowItems title={"Notes"} type={"file"} items={userFiles.filter((file) => file.data.data === null)} />
          ) : (
            <h1></h1>
          )}
        </>
      )}
    </div>
  );
};

export default HomeComponent;
