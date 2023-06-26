"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Categories from "../components/Categories";
import SingleMeal from "../components/SingleMeal";

const getCategories = async () => {
  const { data } = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return data.categories;
};

const getMeals = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryKey[1]}`
  );
  return data?.meals || [];
};

const getQuriedMeals = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${queryKey[1]}`
  );

  return data?.meals || [];
};

const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  console.log(query)
  console.log(selectedCategory) 
  console.log(searchText)

  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery(["categories"], getCategories);

  const {
    data: queriedData,
    isLoading: queriedDataIsLoading,
    isError: queriedDataIsError,
  } = useQuery(["mealsByQuery", query], getQuriedMeals,{
    enabled: query !== "",
  });

  const {
    data,
    isLoading,
    isError,
  } = useQuery(["mealsByCategory", selectedCategory], getMeals, 
  { enabled: query === "" }
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory("");
      } else {
        setQuery("");
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);

    return () => {
      setQuery("");
      clearTimeout(timeout);
    };
  }, [searchText, categories]);

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <Navbar />
      <div className="my-10 w-[900px] overflow-hidden flex flex-col">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <Categories
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          categoryIsLoading={categoryIsLoading}
          categoryIsError={categoryIsError}
          categoryError={categoryError}
          categories={categories}
          setQuery={setQuery}
        />
        <div className="flex flex-wrap gap-6 items-center">
          {!isLoading &&
            !isError &&
            data &&
            data.map((meal) => <SingleMeal key={meal.idMeal} meal={meal} />)}
          
          {!queriedDataIsLoading &&
            !queriedDataIsError &&
            queriedData &&
            queriedData.map((meal) => (
              <SingleMeal key={meal.idMeal} meal={meal} />
            ))}
            
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
