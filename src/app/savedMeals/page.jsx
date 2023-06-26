"use client";

import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSingleMeal } from "../meals/[id]/page";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Page = () => {
  const [savedMealsId, setSavedMealsId] = useState([]);

  const queries = savedMealsId.map((id) => ({
    queryKey: ["singleMeal", id],
    queryFn: getSingleMeal,
  }));

  const result = useQueries({ queries });

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      setSavedMealsId(JSON.parse(localStorage.getItem("savedMeals")));
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <Navbar />
      <div className="my-10 w-[900px] overflow-hidden flex flex-col">
      {/* <Title variant="primary" className={classes.pageTitle}>My Saved Meal List</Title> */}
      <div className=" flex justify-start min-h-[60vh] items-start gap-4">
        {savedMealsId.length <= 0 && <p>You have no saved meals</p>}
        {result &&
          result.map(({ data, isLoading }, index) => {
            if (isLoading) {
              return <p>Loading...</p>;
            }

            return (
              <Link href={`/meals/${data.idMeal}`} className="bg-slate-800 gap-4 p-4 rounded-lg flex flex-col" key={data.idMeal}>
                <p className="text-slate-300">{data.strMeal}</p>
                <div className="flex flex-col text-[0.875rem] text-slate-700">
                <p>Category: {data.strCategory}</p>
                <p>Area: {data.strArea}</p>
                </div>
              </Link>
            );
          })}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
