"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Categories from "../components/Categories";

const getCategories = async () => {
  const { data } = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return data.categories;
};

const getMeals = async ({queryKey}) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${queryKey[1]}`
  );
  console.log(data)
  return data?.meals || [];
}

const page = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(selectedCategory)

  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useQuery(["categories"], getCategories);

  const {
    data: meals,
    isLoading,
    isError,
  } = useQuery(["mealsByCategory", selectedCategory], getMeals)

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
        />
       {/* {
        !isLoading && !isError && meals && meals.map((meal) => (
          <p>{meal.strMeal}</p>
        ))
       } */}
      </div>
      <Footer />
    </div>
  );
};

export default page;
